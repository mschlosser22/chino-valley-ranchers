/** @type {import('next-sitemap').IConfig} */

const NEWS_API =
  "http://cvr-env.eba-i8pyhtve.us-east-1.elasticbeanstalk.com/items/news_two";

/**
 * Blog posts are served by the catch-all route in pages/[slug].js, which renders
 * on demand from the content API. next-sitemap only sees routes that exist at
 * build time, so none of the ~476 posts were ever listed -- the sitemap carried
 * 60 URLs (recipes, products, top-level pages) and no blog content at all.
 *
 * Recipes do not need this: pages/recipes/[slug].js uses getStaticPaths, so
 * next-sitemap already picks all 31 of them up on its own.
 *
 * additionalPaths runs at build time and its results are merged into the same
 * sitemap, so posts are indexed alongside everything else rather than in a
 * separate file.
 */
async function fetchPostPaths(config) {
  const posts = await fetchPostsWithRetry();

  const paths = [];
  const seen = new Set();

  for (const post of posts) {
    // A post with no slug has no URL, so it cannot go in the sitemap.
    if (!post || !post.slug) continue;

    // The API has returned duplicate slugs before. Two entries for one URL is
    // an invalid sitemap, so keep the first and drop the rest.
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);

    // Posts live at the site root, not under /news/.
    const loc = `/${post.slug}`;

    // Prefer the edit date, fall back to the publish date. Omitting lastmod is
    // better than sending a wrong one.
    const stamp = post.date_updated || post.date;
    const lastmod = toIsoOrNull(stamp);

    paths.push({
      loc,
      changefreq: "monthly",
      // Posts sit below the top-level pages next-sitemap generates at 0.7.
      priority: 0.6,
      ...(lastmod ? { lastmod } : {}),
    });
  }

  return paths;
}

/**
 * The content API is plain HTTP with no HTTPS and has been intermittent, so one
 * failed request should not block a deploy. Three tries with a short backoff.
 *
 * If all three fail we throw, which fails the build. That is deliberate: the
 * alternative is generating a sitemap that silently drops all 476 posts back to
 * the 60 we started with, which nobody would notice for months. A failed deploy
 * is loud and recoverable; a silently truncated sitemap is neither.
 */
async function fetchPostsWithRetry(attempts = 3) {
  let lastError;

  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(`${NEWS_API}?limit=-1&fields=slug,date,date_updated`);

      if (!res.ok) {
        throw new Error(`Content API returned HTTP ${res.status}`);
      }

      const body = await res.json();
      const posts = (body && body.data) || [];

      if (!posts.length) {
        throw new Error("Content API returned zero posts");
      }

      return posts;
    } catch (err) {
      lastError = err;
      console.warn(
        `[next-sitemap] post fetch attempt ${i}/${attempts} failed: ${err.message}`
      );
      if (i < attempts) {
        await new Promise((r) => setTimeout(r, 2000 * i));
      }
    }
  }

  throw new Error(
    `[next-sitemap] could not load blog posts after ${attempts} attempts ` +
      `(${lastError && lastError.message}). Refusing to publish a sitemap ` +
      `missing every blog post.`
  );
}

function toIsoOrNull(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.chinovalleyranchers.com",
  generateRobotsTxt: true,
  // The admin route and the TinaCMS OAuth callback are not content.
  exclude: ["/cvr-admin", "/github/*"],
  additionalPaths: fetchPostPaths,
};
