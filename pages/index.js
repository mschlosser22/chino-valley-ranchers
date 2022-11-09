import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS, usePlugins } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../components/Nav'
import { Footer } from '../components/footer/Footer'
import { heroVideoBlock } from '../components/hero/HeroVideo'
import { eggSliderBlock } from '../components/slider/EggSlider'
import { inspectionSliderBlock } from '../components/slider/InspectionSlider'
import { feedVideoBlock } from '../components/video/FeedVideo'
import { contentWithImageAltBlock } from '../components/content/ContentWithImageAlt'
import { imageWithContentBlock } from '../components/content/ImageWithContent'
import { ourFamilyBlock } from '../components/content/OurFamily'
import { recipesAndVideosBlock } from '../components/video/RecipesAndVideos'
// import { CtaCommercial, ctaCommercialBlock } from '../components/cta/CtaCommercial'
// import { CtaSpecialDelivery, ctaSpecialDelivery } from '../components/cta/CtaSpecialDelivery'
import { CtaScratch, ctaScratchBlock } from '../components/cta/CtaScratch'
import { youtubeBlockComet } from '../components/video/YouTubeComet'
import { ChrisCanCookBlock } from '../components/chriscancook/ChrisCanCook'

export default function Products({ file, isPreview }) {

  const cms = useCMS()

  const formConfig = {
    id: '../content/index.json',
    initialValues: file,
    label: 'Home Page',
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
    <div>
      <Head>
        <title>{file.data.title ? file.data.title : 'Chino Valley Ranchers'}</title>
        <meta name="description" content={file.data.meta && file.data.meta.excerpt ? file.data.meta.excerpt.replace(/(<([^>]+)>)/gi, "") : "Chino Valley Ranchers"}></meta>
        <meta name="keywords" content={file.data.meta && file.data.meta.keywords && file.data.meta.keywords.length > 0 ? file.data.meta.keywords.join() : "chino valley ranchers,cvr,omelette,eggs,breakfast ideas,recipes" }></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`relative`}>
        {/* <CtaCommercial /> */}
        {/* <CtaSpecialDelivery /> */}
        <CtaScratch/>
        <Nav />

        <InlineForm form={form}>
          <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
        </InlineForm>
      </div>
    </div>
    <Footer />
    </>
  )
}

const PAGE_BLOCKS = {
  heroVideo: heroVideoBlock,
  eggSlider: eggSliderBlock,
  inspectionSlider: inspectionSliderBlock,
  feedVideo: feedVideoBlock,
  contentWithImageAlt: contentWithImageAltBlock,
  imageWithContent: imageWithContentBlock,
  ourFamily: ourFamilyBlock,
  recipesAndVideos: recipesAndVideosBlock,
  // ctaCommercial: ctaCommercialBlock,
  // ctaSpecialDelivery: ctaSpecialDeliveryBlock,
  // ctaScratch: ctaScratchBlock,
  youtubeVideoComet: youtubeBlockComet,
  chrisCanCook: ChrisCanCookBlock,
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/index.json',
    parse: parseJson,
    isPreview: true,
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/index.json',
        data: (await import('../content/index.json')).default,
      }
    },
  }

}