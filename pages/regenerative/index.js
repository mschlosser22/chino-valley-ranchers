import Head from 'next/head'
import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer';
import { RegenerativeHero } from '../../components/regenerative/Hero';
import { heroBlock } from '../../components/hero/Hero'
import { beingHumaneBlock } from '../../components/being-humane/BeingHumane'
import { henParadiseBlock } from '../../components/being-humane/HenParadise'
import { qualityFeedBlock } from '../../components/being-humane/QualityFeed'
import { eggTermDefBlock } from '../../components/being-humane/EggTermDef'
import { contentSingleColumnBlock } from '../../components/content/ContentSingleColumn'
import { WhatIs } from '../../components/regenerative/WhatIs';
import { Content } from '../../components/regenerative/Content';

export default function Products() {

  return (
    <>
    <div className={`relative`}>
      <Head>
        <title>{'Regenerative | Chino Valley Ranchers'}</title>
        <meta name="description" content={"Chino Valley Ranchers"}></meta>
        <meta name="keywords" content={"chino valley ranchers,cvr,omelette,eggs,breakfast ideas,recipes" }></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div>
        <RegenerativeHero />
        <WhatIs />
        <Content />
      </div>

    </div>
    <Footer />
    </>
  )
}