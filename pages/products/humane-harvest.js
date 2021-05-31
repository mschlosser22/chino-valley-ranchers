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
    id: '../../content/products/humane-harvest.json',
    initialValues: file,
    label: 'Products Page',
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
        <title>Chino Valley Ranchers | Products</title>
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
    fileRelativePath: 'content/products/humane-harvest.json',
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
        fileRelativePath: 'content/products/humane-harvest.json',
        data: (await import('../../content/products/humane-harvest.json')).default,
      }
    },
  }

}