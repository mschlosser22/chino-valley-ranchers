import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'


export default function StoreLocator({ file, isPreview}) {

  return (
    <>
    <div className={`relative`}>
      <Head>
        <title>Chino Valley Ranchers | Store Locator</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="//destinilocators.com/chinovalleyranchers/site/install/"></script>
      </Head>

      <Nav />
      <div className="h-24 w-full"></div>

    </div>
    <Footer />
    </>
  )
}