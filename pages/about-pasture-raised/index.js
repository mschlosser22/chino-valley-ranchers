import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { aboutPastureRaisedBlock } from '../../components/about-pasture-raised/AboutPastureRaised'
import { whatItTakesBlock } from '../../components/about-pasture-raised/WhatItTakes'
import { contentSingleColumnBlock } from '../../components/content/ContentSingleColumn'
import { contentSingleColumnTwoBlock } from '../../components/content/ContentSingleColumnTwo'
import { pastureEggsFooterBlock } from '../../components/about-pasture-raised/PastureEggsFooter'

export default function Products({ file, isPreview}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/about-pasture-raised/index.json',
    initialValues: file,
    label: 'About Pasture Raised Page',
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
        <title>Chino Valley Ranchers | About Pasture Raised</title>
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
  aboutPastureRaised: aboutPastureRaisedBlock,
  whatItTakes: whatItTakesBlock,
  contentSingleColumn: contentSingleColumnBlock,
  contentSingleColumnTwo: contentSingleColumnTwoBlock,
  pastureEggsFooter: pastureEggsFooterBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/about-pasture-raised/index.json',
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
        fileRelativePath: 'content/about-pasture-raised/index.json',
        data: (await import('../../content/about-pasture-raised/index.json')).default,
      }
    },
  }

}