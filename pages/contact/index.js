import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { contentBlock } from '../../components/heading/HeadingPaperEdge'
import { contactFormBlock } from '../../components/contact/ContactForm'

export default function Products({ file, isPreview}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/contact/index.json',
    initialValues: file,
    label: 'Contact Page',
    fields: [
      {
        name: "email",
        label: "Email",
        component: "text"
      },
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
      <title>{file.data.title ? file.data.title : 'Contact'} | Chino Valley Ranchers</title>
        <meta name="description" content={file.data.meta && file.data.meta.description ? file.data.meta.description : 'Chino Valley Ranchers'}></meta>
        <meta name="keywords" content={file.data.meta && file.data.meta.keywords ? file.data.meta.keywords : 'Chino Valley Ranchers'}></meta>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://www.google.com/recaptcha/api.js?render=6Lcjx-ocAAAAAKcLYl8Q2oiB2G6IbcnVKF16yXWX"></script>
      </Head>

      <Nav />

      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} email={file.data.email} />
      </InlineForm>
    </div>
    <Footer />
    </>
  )
}

const PAGE_BLOCKS = {
  hero: heroBlock,
  content: contentBlock,
  contactForm: contactFormBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/contact/index.json',
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
        fileRelativePath: 'content/contact/index.json',
        data: (await import('../../content/contact/index.json')).default,
      }
    },
  }

}