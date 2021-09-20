import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { contentBlock } from '../../components/heading/HeadingPaperEdge'
import { productsBlock } from '../../components/products/ProductsList'
import { contentWithImageBlock } from '../../components/content/ContentWithImage'
import { contentSingleColumnBlock } from '../../components/content/ContentSingleColumn'
import { contentSingleColumnTwoBlock } from '../../components/content/ContentSingleColumnTwo'
import { productDescriptionBlock } from '../../components/products/ProductDescription'
import { sizeOptionsBlock } from '../../components/products/SizeOptions'
import { moreProductsBlock } from '../../components/products/MoreProducts'

import { ProductsWrapper } from '../../context/products'


export default function Products({ file, isPreview, products }) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/products/nutri-fresh-fertile.json',
    initialValues: file,
    label: 'Products Page',
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
      {/* TODO - Inline Blocks */}
      <ProductsWrapper products={products}>
        <InlineForm form={form}>
          <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
        </InlineForm>
      </ProductsWrapper>
    </div>
    <Footer />
    </>
  )
}

const PAGE_BLOCKS = {
  hero: heroBlock,
  content: contentBlock,
  products: productsBlock,
  contentWithImage: contentWithImageBlock,
  contentSingleColumn: contentSingleColumnBlock,
  contentSingleColumnTwo: contentSingleColumnTwoBlock,
  productDescription: productDescriptionBlock,
  sizeOptions: sizeOptionsBlock,
  moreProducts: moreProductsBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/products/nutri-fresh-fertile.json',
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
        fileRelativePath: 'content/products/nutri-fresh-fertile.json',
        data: (await import('../../content/products/nutri-fresh-fertile.json')).default,
      }
    },
  }

}