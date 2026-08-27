import Head from "next/head";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/footer/Footer";

/**
 * Custom 404.
 *
 * The catch-all route in pages/[slug].js now returns notFound for any URL that
 * is not a real post, so this page is what visitors and crawlers actually land
 * on. Next's default 404 is unbranded and offers no way back into the site.
 */
export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Chino Valley Ranchers</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="font-din tracking-widest uppercase text-gray-500 mb-4">
            Error 404
          </p>
          <h1 className="font-ultra text-3xl md:text-4xl uppercase text-chinored mb-6">
            We couldn&rsquo;t find that page
          </h1>
          <p className="text-lg text-gray-700 mb-10">
            The link may be out of date, or the page may have moved. Here are a
            few good places to pick things back up.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <a className="px-5 py-2 bg-chinored text-white font-din tracking-wider uppercase">
                Home
              </a>
            </Link>
            <Link href="/news">
              <a className="px-5 py-2 bg-chinored text-white font-din tracking-wider uppercase">
                Latest News
              </a>
            </Link>
            <Link href="/recipes">
              <a className="px-5 py-2 bg-chinored text-white font-din tracking-wider uppercase">
                Recipes
              </a>
            </Link>
            <Link href="/store-locator">
              <a className="px-5 py-2 bg-chinored text-white font-din tracking-wider uppercase">
                Find a Store
              </a>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
