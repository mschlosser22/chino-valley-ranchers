import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { beingHumaneBlock } from '../../components/being-humane/BeingHumane'
import { henParadiseBlock } from '../../components/being-humane/HenParadise'
import { qualityFeedBlock } from '../../components/being-humane/QualityFeed'
import { eggTermDefBlock } from '../../components/being-humane/EggTermDef'
import { ourFamilyVideoBlock } from '../../components/our-family/OurFamilyVideo'
import { growingFamilyBlock } from '../../components/our-family/GrowingFamily'
import { ourRanchersBlock } from '../../components/our-family/OurRanchers'
import { ourSustainabilityBlock } from '../../components/our-family/OurSustainability'

export default function OurFamilyVideo({ file, isPreview}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/our-family/index.json',
    initialValues: file,
    label: 'Our Family Page',
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
        <title>Chino Valley Ranchers | Our Family</title>
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
  beingHumane: beingHumaneBlock,
  henParadise: henParadiseBlock,
  qualityFeed: qualityFeedBlock,
  eggTermDef: eggTermDefBlock,
  ourFamilyVideo: ourFamilyVideoBlock,
  growingFamily: growingFamilyBlock,
  ourRanchers: ourRanchersBlock,
  ourSustainability: ourSustainabilityBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/our-family/index.json',
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
        fileRelativePath: 'content/our-family/index.json',
        data: (await import('../../content/our-family/index.json')).default,
      }
    },
  }

}