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
        <title>{file.data.title ? file.data.title : 'Chino Valley Ranchers'}</title>
        <meta name="description" content={file.data.meta && file.data.meta.excerpt ? file.data.meta.excerpt.replace(/(<([^>]+)>)/gi, "") : "Chino Valley Ranchers"}></meta>
        <meta name="keywords" content={file.data.meta && file.data.meta.keywords && file.data.meta.keywords.length > 0 ? file.data.meta.keywords.join() : "chino valley ranchers,cvr,omelette,eggs,breakfast ideas,recipes" }></meta>
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