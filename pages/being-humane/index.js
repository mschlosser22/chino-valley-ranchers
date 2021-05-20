import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { beingHumaneBlock } from '../../components/being-humane/BeingHumane'

export default function Products({ file, isPreview}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/being-humane/index.json',
    initialValues: file,
    label: 'Being Humane Page',
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
        <title>Chino Valley Ranchers | Being Humane</title>
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
  beingHumane: beingHumaneBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/being-humane/index.json',
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
        fileRelativePath: 'content/being-humane/index.json',
        data: (await import('../../content/being-humane/index.json')).default,
      }
    },
  }

}