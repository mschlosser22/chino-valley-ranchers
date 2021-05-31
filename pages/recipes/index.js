import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { promises as fs } from 'fs'
import path from 'path'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { recipesBlock } from '../../components/recipes/Recipes'

import { RecipesWrapper } from '../../context/recipes'

export default function Recipes({ file, isPreview, recipes}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/recipes/index.json',
    initialValues: file,
    label: 'Recipes Page',
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
        <title>Chino Valley Ranchers | Recipes</title>
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
  hero: heroBlock,
  recipes: recipesBlock
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
    fileRelativePath: 'content/recipes/index.json',
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
        fileRelativePath: 'content/recipes/index.json',
        data: (await import('../../content/recipes/index.json')).default,
      },
      recipes: await Promise.all(recipes)
    },
  }

}