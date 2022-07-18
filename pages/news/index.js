import Head from 'next/head'
import { getGithubPreviewProps, parseJson, getGithubFile } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS, usePlugins } from 'tinacms'
import slugify from "slugify"
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { JsonCreatorPlugin } from 'gatsby-tinacms-json'

import { promises as fs } from 'fs'
import path from 'path'

import useCreateNewsArticle from "../../hooks/useCreateNewsArticle"
import getNewsArticles from "../../utils/getNewsArticles"

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { featuredArticleBlock } from '../../components/news/FeatureArticle'

import { NewsWrapper } from '../../context/news'
//import getNewsArticles from '../../utils/getNewsArticles'


export default function News({ file, isPreview, news, posts}) {

  const cms = useCMS()
  //cms.plugins.add(NewsPostCreatorPlugin)

  const formConfig = {
    id: '../../content/news/index.json',
    initialValues: file,
    label: 'News Page',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text'
      },
      {
        name: 'meta',
        label: 'Meta',
        component: 'group',
        fields: [
          {
            name: 'description',
            label: 'Description',
            component: 'textarea'
          },
          {
            name: 'keywords',
            label: 'Keywords',
            component: 'text',
            description: 'Comma seperated list.'
          }
        ]
      }
    ],
    onSubmit() {
      cms.alerts.success('Saved!')
    },
  }

  useCreateNewsArticle(news)

  // Registers a JSON Tina Form
  //const [data, form] = useGithubJsonForm(file, formConfig)
  const [, form] = useGithubJsonForm(file, formConfig)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <>
    <div className={`relative`}>
      <Head>
      <title>{file.data.title ? file.data.title : 'News'} | Chino Valley Ranchers</title>
        <meta name="description" content={file.data.meta && file.data.meta.description ? file.data.meta.description : 'Chino Valley Ranchers'}></meta>
        <meta name="keywords" content={file.data.meta && file.data.meta.keywords ? file.data.meta.keywords : 'Chino Valley Ranchers'}></meta>
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

  //const posts = await getNewsArticles(preview, previewData, "content/news")
  //console.log(posts)

  // Get News Directory
  const newsDirectory = path.join(process.cwd(), 'content/news')
  // Get Filenames from News Directory
  const tempfilenames = await fs.readdir(newsDirectory)
  // Remove the index file from Products Filenames
  const filenames = tempfilenames.filter(file => file != "index.json" )
  // Get the file contents for each news article
  const newsPreview = filenames.map(async (filename) => {

    const githubOptions = {
      working_repo_full_name: previewData?.working_repo_full_name,
      head_branch: previewData?.head_branch,
      github_access_token: previewData?.github_access_token,
    }

    try {
      let newsFile = await getGithubFile({
        ...githubOptions,
        fileRelativePath: `content/news/${filename}.json`,
        parse: parseJson
      })

      return {
        filename,
        content: newsFile,
      }
    } catch(err) {
      console.log(err)
    }

  })

  const news = filenames.map(async(filename, index) => {

    try {

      const filePath = path.join(newsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')

      return {
        filename,
        content: fileContents,
      }

    } catch(err) {
      console.log(err)
    }

  })

  if (preview) {
    return {
      props: {
        sourceProvider: null,
        error: null,
        preview: true,
        file: {
          fileRelativePath: 'content/news/index.json',
          data: (await import('../../content/news/index.json')).default,
        },
        news: await Promise.all(news),
      },
    }
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
      news: await Promise.all(news),
    },
  }

}