import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import useSWR from 'swr'
import { useState } from 'react'
import { promises as fs } from 'fs'
import path from 'path'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { contentBlock } from '../../components/heading/HeadingPaperEdge'
import { productsBlock } from '../../components/products/ProductsList'
import { contentWithImageBlock } from '../../components/content/ContentWithImage'
import { contentSingleColumnBlock } from '../../components/content/ContentSingleColumn'
import { contentSingleColumnTwoBlock } from '../../components/content/ContentSingleColumnTwo'

import { ProductsWrapper } from '../../context/products'

export default function Products({ file, isPreview, products }) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/products/index.json',
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
          {/*
          <Hero image={data.image} heading={data.heading} />
          <HeadingPaperEdge content={data.content} />

          <ContentWithImage content={data.contentWithImage} />
          <ContentSingleColumn content={data.contentSingleColumn} />
          <ContentSingleColumnTwo content={data.contentSingleColumnTwo} />
          */}
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
  contentSingleColumnTwo: contentSingleColumnTwoBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

    // Get Products Directory
    const productsDirectory = path.join(process.cwd(), 'content/products')
    // Get Filenames from Products Directory
    const tempfilenames = await fs.readdir(productsDirectory)
    // Remove the index file from Products Filenames
    const filenames = tempfilenames.filter(file => file != "index.json" )
    // Get the file contents for each product
    const products = filenames.map(async (filename) => {
      const filePath = path.join(productsDirectory, filename)
      const fileContents = await fs.readFile(filePath, 'utf8')

      // Generally you would parse/transform the contents
      // For example you can transform markdown to HTML here

      return {
        filename,
        content: fileContents,
      }
  })

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/products/index.json',
    parse: parseJson,
    isPreview: true,
    products: await Promise.all(products)
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/products/index.json',
        data: (await import('../../content/products/index.json')).default,
      },
      products: await Promise.all(products)
    },
  }

}