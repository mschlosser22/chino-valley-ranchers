import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { featuredArticleBlock } from '../../components/news/FeatureArticle'


export default function NewsArticle({ file, isPreview, }) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/news/index.json',
    initialValues: file,
    label: 'News Page',
    fields: [

    ],
    onSubmit() {
      cms.alerts.success('Saved!')
    },
  }

  // Registers a JSON Tina Form
  //const [data, form] = useGithubJsonForm(file, formConfig)
  const [, form] = useGithubJsonForm(file, formConfig)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <>
    <div className={`relative`}>
      <Head>
        <title>Chino Valley Ranchers | News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <InlineForm form={form}>
        <article className="prose lg:prose-xl pt-48 pb-24 max-w-5xl mx-auto text-left px-8 lg:px-0">
          {file.data.image ?
          <img src={file.data.image.src} alt={file.data.image.alt} className="max-5xl" />
          : <img src="/images/article1.jpg" alt="placeholder image" className="max-5xl" />
          }
          <h1 className="text-3xl lg:text-7xl !text-chinored font-ultra uppercase !tracking-wide !lg:mb-8">{file.data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: file.data.content }}></div>
        </article>
      </InlineForm>

    </div>
    <Footer />
    </>
  )
}

// This function gets called at build time
export async function getStaticPaths() {

  const fg = require("fast-glob")
  const contentDir = "content/news/"
  const files = await fg(`${contentDir}**/*.json`)

  return {
    fallback: false,
    paths: files
      .filter(file => !file.endsWith('index.json'))
      .map((file) => {
        const path = file.substring(contentDir.length, file.length - 5)
        return { params: { slug: path } }
      }),
  }

}

export const getStaticProps = async function({
  params,
  preview,
  previewData,
}) {


  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: `content/news/${params.slug}`,
    parse: parseJson,
    isPreview: true,
    file: {
      fileRelativePath: `content/news/${params.slug}`,
      data: (await import(`../../content/news/${params.slug}`)).default,
    },
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: `content/news/${params.slug}`,
        data: (await import(`../../content/news/${params.slug}`)).default,
      },
    },
  }

}