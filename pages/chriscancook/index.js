import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { promises as fs } from 'fs'
import path from 'path'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroChrisBlock } from '../../components/hero/HeroChris'
import { recipesChrisBlock } from '../../components/recipes/RecipesChris'

import { RecipesWrapper } from '../../context/recipes'

import useCreateRecipeArticle from "../../hooks/useCreateRecipeArticle"

export default function Recipes({ file, isPreview, recipes}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/chriscancook/index.json',
    initialValues: file,
    label: 'Recipes Page',
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

  useCreateRecipeArticle(recipes)

  // Registers a JSON Tina Form
  //const [data, form] = useGithubJsonForm(file, formConfig)
  const [, form] = useGithubJsonForm(file, formConfig)
  usePlugin(form)

  useGithubToolbarPlugins()

  return (
    <>
    <div className={`relative`}>
      <Head>
      <title>{file.data.title ? file.data.title : 'Recipes'} | Chino Valley Ranchers</title>
        <meta name="description" content={file.data.meta && file.data.meta.description ? file.data.meta.description : 'Chino Valley Ranchers'}></meta>
        <meta name="keywords" content={file.data.meta && file.data.meta.keywords ? file.data.meta.keywords : 'Chino Valley Ranchers'}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <RecipesWrapper recipes={recipes}>
        <InlineForm form={form}>
          <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
        </InlineForm>
      </RecipesWrapper>
    </div>
    <Footer />
    </>
  )
}

const PAGE_BLOCKS = {
  hero: heroChrisBlock,
  recipes: recipesChrisBlock
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  // Get News Directory
  const recipesDirectory = path.join(process.cwd(), 'content/recipes')
  // Get Filenames from News Directory
  const tempfilenames = await fs.readdir(recipesDirectory)
  // Remove the index file from Products Filenames
  const filenames = tempfilenames.filter(file => file != "index.json" )
  // Get the file contents for each news article
  const recipes = filenames.map(async (filename) => {
    const filePath = path.join(recipesDirectory, filename)
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
    fileRelativePath: 'content/chriscancook/index.json',
    parse: parseJson,
    isPreview: true,
    recipes: await Promise.all(recipes)
    })
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/chriscancook/index.json',
        data: (await import('../../content/chriscancook/index.json')).default,
      },
      recipes: await Promise.all(recipes)
    },
  }

}