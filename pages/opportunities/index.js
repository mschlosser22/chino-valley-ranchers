import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useForm, usePlugin, useCMS } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'

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
      <div className='bg-repeat-y bg-contain' style={{
              backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
            }}>
      <div className='max-w-7xl mx-auto px-8 z-50'>
            <div className='text-center pb-24 flex flex-col justify-between gap-6'>
                <div className="lg:text-xl text-xl lg:text-center tracking-wider font-ultra pt-4 lg:pt-0 uppercase">Become part of a winning team dedicated to excellence in the egg industry!</div>
                <div className='text-black lg:text-lg font-lato font-medium text-xl'>
                    As a leader in sustainable egg production since 1953, we take pride in providing high-quality food to our customers. We are seeking motivated individuals who share our commitment to ethical practices, exceptional product quality, and customer satisfaction. Join us today and be a part of the Chino Valley Ranchers difference!
                </div>
                <div className='text-black lg:text-lg font-lato font-medium text-xl font-bold'>
                    View our current open opportunities below.
                </div>
            </div>

            <div className='max-w-5xl mx-auto grid lg:grid-cols-1 gap-8 text-center lg:text-left pb-20'>
                <div className='text-center'>
                    <h2 className="text-xl lg:text-3xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6 lg:px-0 px-8 break-words">Available Positions</h2>
                    <div className='flex flex-col gap-3 text-center lg:text-left'>
                        <a href='https://employers.indeed.com/jobs/view?id=2d82fd976a20&employerJobId=aXJpOi8vYXBpcy5pbmRlZWQuY29tL0VtcGxveWVySm9iL2U0ODNmMTI0LTQ3MzUtNDQwZC04YzM4LWRmMWEyZjlhY2QxZg%3D%3D&from=%3Ffrom%3Dgnav-empcenter' target='_blank' className='text-chinored uppercase font-bold text-xl hover:underline'>Shipping/Receiving - 2nd Shift, Colton, CA - Job Details | Indeed.com</a>
                        <a href='https://employers.indeed.com/jobs/view?id=97e62e318a06&employerJobId=aXJpOi8vYXBpcy5pbmRlZWQuY29tL0VtcGxveWVySm9iL2I1MWJiYzQxLTRkMDEtNDE2Ni04MDQyLTJjYTE1ZmZlZjFlYQ%3D%3D&from=%3Ffrom%3Dgnav-empcenter' target='_blank' className='text-chinored uppercase font-bold text-xl hover:underline'>Class B Driver, Colton, CA - Job Details | Indeed.com</a>
                    </div>
                </div>
                <div className='hidden'>
                    <h2 className="text-xl lg:text-3xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6 lg:px-0 px-8 break-words">Submit Application</h2>
                    <form className='flex flex-col gap-2'>
                        <input type='text' placeholder='First Name' className='border border-black rounded p-2' />
                        <input type='text' placeholder='Last Name' className='border border-black rounded p-2' />
                        <input type='tel' placeholder='Phone Number' className='border border-black rounded p-2' />
                        <input type='email' placeholder='Email Address' className='border border-black rounded p-2' />
                        <select className='border border-black rounded p-2'>
                            <option value={'Shipping/Receiving - 2nd Shift, Colton, CA - Job Details'}>Shipping/Receiving - 2nd Shift, Colton, CA - Job Details</option>
                            <option value={'Class B Driver, Colton, CA - Job Details'}>Class B Driver, Colton, CA - Job Details</option>
                        </select>
                        <label className='uppercase text-gray-600'>Upload your resume</label>
                        <input type='file' className='pb-8' />
                        <div className='text-center'>
                            <button className='bg-chinored text-white uppercase font-bold py-2 rounded-lg text-4xl w-48'>Submit</button>
                        </div>

                    </form>
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