import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { whyOrganicBlock } from '../../components/why-organic/WhyOrganic'
import { ourMissionBlock } from '../../components/why-organic/OurMission'
import { organicMattersBlock } from '../../components/why-organic/OrganicMatters'
import { ourCommitmentBlock } from '../../components/why-organic/OurCommitment'
import { studiesBlock } from '../../components/why-organic/Studies'


export default function whyOrganic({ file, isPreview}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/why-organic/index.json',
    initialValues: file,
    label: 'Why Organic',
    fields: [
      {
        name: 'seo',
        name: 'seo',label: 'SEO stuff',
        component: 'text'
      }
    ],
    onSubmit() {
      cms.alerts.success('Saved!')
    },
  }

  console.log(formConfig)

  // Registers a JSON Tina Form
  //const [data, form] = useGithubJsonForm(file, formConfig)
  const [, form] = useGithubJsonForm(file, formConfig)
  usePlugin(form)

  useGithubToolbarPlugins()

  console.log(`SEO Stuff: ${file.data.seo}`)
  //console.log(file)

  return (

    <>
    <div className={`relative`}>
      <Head>
        <title>Chino Valley Ranchers | Why Organic</title>
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
  whyOrganic: whyOrganicBlock,
  ourMission: ourMissionBlock,
  organicMatters: organicMattersBlock,
  ourCommitment: ourCommitmentBlock,
  studies: studiesBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/why-organic/index.json',
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
        fileRelativePath: 'content/why-organic/index.json',
        data: (await import('../../content/why-organic/index.json')).default,
      }
    },
  }

}