import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { promises as fs } from 'fs'
import path from 'path'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { featuredArticleBlock } from '../../components/news/FeatureArticle'

import { NewsWrapper } from '../../context/news'


export default function News({ file, isPreview, news}) {

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

      <NewsWrapper news={news}>
        <InlineForm form={form}>
          <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
        </InlineForm>
      </NewsWrapper>

    </div>
    <Footer />
    </>
  )
}

const PAGE_BLOCKS = {
  hero: heroBlock,
  featuredArticle: featuredArticleBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  // Get News Directory
  const newsDirectory = path.join(process.cwd(), 'content/news')
  // Get Filenames from News Directory
  const tempfilenames = await fs.readdir(newsDirectory)
  // Remove the index file from Products Filenames
  const filenames = tempfilenames.filter(file => file != "index.json" )
  // Get the file contents for each news article
  const news = filenames.map(async (filename) => {
    const filePath = path.join(newsDirectory, filename)
    const fileContents = await fs.readFile(filePath, 'utf8')

    // Generally you would parse/transform the contents
    // For example you can transform markdown to HTML here

    return {
      filename,
      content: fileContents,
    }
  })

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/news/index.json',
    parse: parseJson,
    isPreview: true,
    news: await Promise.all(news)
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/news/index.json',
        data: (await import('../../content/news/index.json')).default,
      },
      news: await Promise.all(news)
    },
  }

}