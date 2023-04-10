import Head from "next/head";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { useForm, usePlugin, useCMS, usePlugins } from "tinacms";
import { InlineForm, InlineBlocks } from "react-tinacms-inline";
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
  createGithubDeleteAction,
} from "react-tinacms-github";
import { HtmlFieldPlugin } from "react-tinacms-editor";

import { Nav } from "../components/Nav";
import { Footer } from "../components/footer/Footer";
import { heroBlock } from "../components/hero/Hero";
import { featuredArticleBlock } from "../components/news/FeatureArticle";
import getNewsArticles from "../utils/getNewsArticles";
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
import { DateFieldPlugin } from "react-tinacms-date";

export default function NewsArticle({ file, isPreview }) {
  const cms = useCMS();

  const deleteAction = createGithubDeleteAction();

  usePlugins([HtmlFieldPlugin, DateFieldPlugin]);

  const formConfig = {
    id: "../content/news/index.json",
    initialValues: file,
    label: "News Page",
    actions: [deleteAction],
    fields: [
      {
        name: "title",
        label: "Title",
        component: "text",
      },
      {
        name: "image",
        label: "Image",
        component: "group",
        fields: [
          {
            name: "src",
            label: "src",
            component: "image",
            parse: (media) => `/images/${media.filename}`,
            uploadDir: () => "/images",
          },
          {
            name: "alt",
            label: "Alt",
            component: "text",
          },
        ],
      },
      {
        name: "author",
        label: "Author",
        component: "text",
      },
      {
        name: "content",
        label: "Content",
        component: "html",
      },
      {
        name: "excerpt",
        label: "Meta Excerpt",
        component: "html",
      },
      {
        name: "keywords",
        label: "Meta Keywords",
        component: "list",
        field: {
          component: "text",
        },
      },
      {
        name: "date",
        label: "Publish Date",
        component: "date",
        dateFormat: "MMMM DD YYYY",
        timeFormat: false,
      },
    ],
    onSubmit() {
      cms.alerts.success("Saved!");
    },
  };

  // Registers a JSON Tina Form
  //const [data, form] = useGithubJsonForm(file, formConfig)
  const [, form] = useGithubJsonForm(file, formConfig);
  usePlugin(form);

  useGithubToolbarPlugins();

  return (
    <>
      <div className={`relative`}>
        <Head>
          <title>
            {file.data.title ? file.data.title : "News"} | Chino Valley Ranchers
          </title>
          <meta
            name="description"
            content={
              file.data.excerpt
                ? file.data.excerpt.replace(/(<([^>]+)>)/gi, "")
                : "One way to change up your breakfast is to try a different omelette sauce. Whether you want cheesy, creamy, sweet, or spicy, we've got five easy-to-make omelette sauce recipes sure to take your breakfast to the next level."
            }
          ></meta>
          <meta
            name="keywords"
            content={
              file.data.keywords && file.data.keywords.length > 0
                ? file.data.keywords.join()
                : "chino valley ranchers,cvr,omelette,eggs,breakfast ideas,recipes"
            }
          ></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />

        <InlineForm form={form}>
          <div
            className="relative bg-repeat-y bg-contain mt-4"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
            }}
          >
            <article className="prose lg:prose-xl pt-20 lg:pt-48 pb-24 max-w-5xl mx-auto text-left px-8 lg:px-0">
              {file.data.image ? (
                <img
                  src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${file.data.image.src}`}
                  alt={file.data.image.alt}
                  className="max-5xl"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/article1.jpg"
                  alt="placeholder image"
                  className="max-5xl"
                />
              )}
              <h1 className="text-3xl lg:text-7xl !text-chinored font-ultra uppercase !tracking-wide !lg:mb-8">
                {file.data.title}
              </h1>
              <div className="pt-4 flex gap-2">
                <FacebookShareButton
                  url={`https://www.chinovalleyranchers.com/news/${file.data.slug}`}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={`https://www.chinovalleyranchers.com/news/${file.data.slug}`}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <EmailShareButton
                  url={`https://www.chinovalleyranchers.com/news/${file.data.slug}`}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <LinkedinShareButton
                  url={`https://www.chinovalleyranchers.com/news/${file.data.slug}`}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <PinterestShareButton
                  url={`https://www.chinovalleyranchers.com/news/${file.data.slug}`}
                >
                  <PinterestIcon size={32} round={true} />
                </PinterestShareButton>
                <RedditShareButton
                  url={`https://www.chinovalleyranchers.com/news/${file.data.slug}`}
                >
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
                <WhatsappShareButton
                  url={`https://www.chinovalleyranchers.com/news/${file.data.slug}`}
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: file.data.content }}
              ></div>
            </article>
          </div>
        </InlineForm>
      </div>
      <Footer />
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const fg = require("fast-glob");
  const contentDir = "content/news/";
  const files = await fg(`${contentDir}**/*.json`);

  return {
    fallback: false,
    paths: files
      .filter((file) => !file.endsWith("index.json"))
      .map((file) => {
        const path = file.substring(contentDir.length, file.length - 5);
        return { params: { slug: path } };
      }),
  };
}

export const getStaticProps = async function ({
  params,
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: `content/news/${params.slug}.json`,
      parse: parseJson,
      //isPreview: true,
      /*file: {
      fileRelativePath: `content/news/${params.slug}`,
      data: (await import(`../../content/news/${params.slug}`)).default,
    },*/
    });
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: `content/news/${params.slug}`,
        data: (await import(`../content/news/${params.slug}`)).default,
      },
    },
  };
};
