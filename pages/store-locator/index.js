import Head from 'next/head'
import Script from 'next/script'
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
        <title>Store Locator | Chino Valley Ranchers</title>
        <meta name="description" content="Healthy And Delicious Organic Eggs Since 1953"></meta>
        <meta name="keywords" content="chino valley ranchers, store locator"></meta>
        <link rel="icon" href="/favicon.ico" />
        <script src="//destinilocators.com/chinovalleyranchers/site/install/"></script>
      </Head>

      <Nav />

    </div>
    <Footer />
    </>
  )
}