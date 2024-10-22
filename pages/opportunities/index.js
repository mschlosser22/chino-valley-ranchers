import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import JobApplicationForm from '../../components/JobApplicationForm'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { heroBlock } from '../../components/hero/Hero'
import { aboutFeedBlock } from '../../components/about-feed/AboutFeed'
import { nutritiousFeedBlock } from '../../components/about-feed/NutritiousFeed'
import { differenceFeedBlock } from '../../components/about-feed/DifferenceFeed'
import { organicFeedBlock } from '../../components/about-feed/OrganicFeed'
import { wayItsMadeBlock } from '../../components/about-feed/WayItsMade'
import { contentSingleColumnBlock } from '../../components/content/ContentSingleColumn'


export default function Products({ file, isPreview}) {

  const cms = useCMS()

  const formConfig = {
    id: '../../content/opportunities/index.json',
    initialValues: file,
    label: 'About Feed Page',
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
      <div className='pt-48'></div>
      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
      </InlineForm>
      <div className='bg-repeat-y bg-cover' style={{
              backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
            }}>
      <div className='max-w-7xl mx-auto px-8 z-50'>
            <div className='text-center pb-24 flex flex-col justify-between gap-6'>
                <div className="lg:text-xl text-xl lg:text-center tracking-wider font-ultra pt-4 lg:pt-0 uppercase">At Chino Valley Ranchers, our mission is to produce high-quality eggs while prioritizing animal welfare and environmental sustainability. Our mission is based on the following principles:</div>
                <div className='text-black lg:text-lg font-lato font-medium text-xl'>
                    <ul>
                        <li>Quality: We produce the freshest and highest-quality eggs possible.</li>
                        <li>Animal Welfare: We treat our hens with kindness and respect through personalized care.</li>
                        <li>Sustainability: We put back into the earth what we take out of it.</li>
                    </ul>
                </div>
                <div className='text-black lg:text-lg font-lato font-medium text-xl'>
                We are always on the lookout for top-tier talent to join our growing team of dedicated professionals. Become part of a winning team that has been a leader in egg production since 1953, providing high-quality food to our customers. We take pride in ethical practices, exceptional product quality, and customer satisfaction. Whether you are passionate about agriculture, animal welfare, or food production, we offer a variety of opportunities to contribute to our mission. Join us today and be a part of the Chino Valley Ranchers difference!
                </div>
                <div className='text-black lg:text-lg font-lato font-medium text-xl font-bold'>
                    View our current open opportunities below.
                </div>
                <div className='text-black lg:text-lg font-lato font-medium text-xl'>For general resume submissions please send them to <a href="mailto:info@chinovalleyranchers.com">info@chinovalleyranchers.com</a>.</div>
            </div>

            <div className='max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 text-center lg:text-left pb-20'>
                <div className='text-center'>
                    <h2 className="text-xl lg:text-3xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6 lg:px-0 px-8 break-words">Available Positions</h2>
                    <div className='flex flex-col gap-3 text-center lg:text-left'>
                    <a href="/cvr-maintenance-mechanic.pdf" download className="text-chinored hover:underline">
                      Maintenance Mechanic I - Egg Products
                    </a>
                      </div>
                </div>
                <div>
                    <h2 className="text-xl lg:text-3xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6 lg:px-0 px-8 break-words">Submit Application</h2>
                    <JobApplicationForm />

                </div>
            </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

const PAGE_BLOCKS = {
  hero: heroBlock,
  aboutFeed: aboutFeedBlock,
  nutritiousFeed: nutritiousFeedBlock,
  differenceFeed: differenceFeedBlock,
  organicFeed: organicFeedBlock,
  wayItsMade: wayItsMadeBlock,
  contentSingleColumn: contentSingleColumnBlock,
}

export const getStaticProps = async function({
  preview,
  previewData,
}) {

  if (preview) {
    return getGithubPreviewProps({
    ...previewData,
    fileRelativePath: 'content/opportunities/index.json',
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
        fileRelativePath: 'content/opportunities/index.json',
        data: (await import('../../content/opportunities/index.json')).default,
      }
    },
  }

}