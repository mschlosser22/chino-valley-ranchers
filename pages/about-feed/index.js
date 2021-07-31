import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { aboutFeedBlock } from '../../components/about-feed/AboutFeed'
import { nutritiousFeedBlock } from '../../components/about-feed/NutritiousFeed'
import { differenceFeedBlock } from '../../components/about-feed/DifferenceFeed'
import { organicFeedBlock } from '../../components/about-feed/OrganicFeed'
import { wayItsMadeBlock } from '../../components/about-feed/WayItsMade'


export default function Products({ file, isPreview}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/about-feed/index.json',
    initialValues: file,
    label: 'About Feed Page',
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

  // Registers a JSON Tina Form
  //const [data, form] = useGithubJsonForm(file, formConfig)
  const [, form] = useGithubJsonForm(file, formConfig)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <>
    <div className={`relative`}>
      <Head>
        <title>{file.data.meta.title ? file.data.meta.title : 'About Feed'} | Chino Valley Ranchers</title>
        <meta name="description" content={file.data.meta.description ? file.data.meta.description : 'Chino Valley Ranchers'}></meta>
        <meta name="keywords" content={file.data.meta.keywords ? file.data.meta.keywords : 'Chino Valley Ranchers'}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
      </InlineForm>
    </div>
    <Footer />
    </>
  )
}

const PAGE_BLOCKS = {
  hero: heroBlock,
  aboutFeed: aboutFeedBlock,
  nutritiousFeed: nutritiousFeedBlock,
  differenceFeed: differenceFeedBlock,
  organicFeed: organicFeedBlock,
  wayItsMade: wayItsMadeBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/about-feed/index.json',
    parse: parseJson,
    isPreview: true
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/about-feed/index.json',
        data: (await import('../../content/about-feed/index.json')).default,
      }
    },
  }

}