import Head from "next/head";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { InlineForm, InlineBlocks } from "react-tinacms-inline";
import { Nav } from "../components/Nav";
import { Footer } from "../components/footer/Footer";

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  WhatsappIcon,
} from "react-share";

export async function getServerSideProps({params}) {
  // Fetch data from external API
  const res = await fetch(`http://cvr-env.eba-i8pyhtve.us-east-1.elasticbeanstalk.com/items/news?filter[slug][_eq]=${params.slug}`);
  const articles = await res.json();
  console.log('ARTICLES', articles)

  return { props: { article: articles.data[0] } }
}

export default function NewsArticle({ article }) {

  return (
    <>
      <div className={`relative`}>
        <Head>
          <title>
            {article.title ? article.title : "News"} | Chino Valley Ranchers
          </title>
          <meta
            name="description"
            content={
              article.excerpt
                ? article.excerpt.replace(/(<([^>]+)>)/gi, "")
                : "One way to change up your breakfast is to try a different omelette sauce. Whether you want cheesy, creamy, sweet, or spicy, we've got five easy-to-make omelette sauce recipes sure to take your breakfast to the next level."
            }
          ></meta>
          <meta
            name="keywords"
            content={
              article.keywords && article.keywords.length > 0
                ? article.keywords.join()
                : "chino valley ranchers,cvr,omelette,eggs,breakfast ideas,recipes"
            }
          ></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />


          <div
            className="relative bg-repeat-y bg-contain mt-4"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
            }}
          >
            <article className="prose lg:prose-xl pt-20 lg:pt-48 pb-24 max-w-5xl mx-auto text-left px-8 lg:px-0">
              {article.image ? (
                <img
                  src={`https://res.cloudinary.com/dmfgntgym/image/fetch/c_fill,h_450/f_auto/q_auto:eco/http://cvr-env.eba-i8pyhtve.us-east-1.elasticbeanstalk.com/assets/${article.image}`}
                  alt={article.imageAlt ? article.imageAlt : "placeholder image"}
                  className="max-5xl"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/http://cvr-env.eba-i8pyhtve.us-east-1.elasticbeanstalk.com/assets/ec8a2445-ec51-4a80-87ba-ae894661fe79"
                  alt="placeholder image"
                  className="max-5xl"
                />
              )}
              <h1 className="text-3xl lg:text-7xl !text-chinored font-ultra uppercase !tracking-wide !lg:mb-8">
                {article.title}
              </h1>
              <div className="pt-4 flex gap-2">
                <FacebookShareButton
                  url={`https://www.chinovalleyranchers.com/news/${article.slug}`}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`https://www.chinovalleyranchers.com/news/${article.slug}`}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <EmailShareButton
                  url={`https://www.chinovalleyranchers.com/news/${article.slug}`}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <LinkedinShareButton
                  url={`https://www.chinovalleyranchers.com/news/${article.slug}`}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <PinterestShareButton
                  url={`https://www.chinovalleyranchers.com/news/${article.slug}`}
                >
                  <PinterestIcon size={32} round={true} />
                </PinterestShareButton>
                <RedditShareButton
                  url={`https://www.chinovalleyranchers.com/news/${article.slug}`}
                >
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
                <WhatsappShareButton
                  url={`https://www.chinovalleyranchers.com/news/${article.slug}`}
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>
            </article>
          </div>

      </div>
      <Footer />
    </>
  );
}