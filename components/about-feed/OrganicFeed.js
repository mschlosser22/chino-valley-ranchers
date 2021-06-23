import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'

export function OrganicFeed() {
    return (
        <div>
            <div className="relative lg:pt-16 lg:-mt-11 -mt-24 pt-20 bg-no-repeat bg-contain" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
                <div className="relative bg-repeat-y pb-32 mt-4 bg-contain" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center lg:pt-20 pb-8  max-w-5xl mx-auto px-8 lg:px-0">
                            <h1 className="text-2xl lg:text-5xl text-chinored font-ultra uppercase tracking-wide lg:leading-tight lg:mb-20 mb-6 lg:px-12">Our feed formulations never contain hormones, animal proteins, steroids, or antibiotics.</h1>
                            <img src="/images/redSeperator.png" className="mx-auto lg:pl-12 lg:w-3/5 lg:pb-6"></img>
                        </div>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-12 gap-0 lg:px-0 px-8">
                            <div className="lg:col-span-3 sm:col-span-4 col-span-12 lg:w-56 w-32 md:mx-0 mx-auto">
                                <img src="/images/brightEgg.png" className="lg:-mt-20"></img>
                            </div>
                            <div className="lg:col-span-9 sm:col-span-8 col-span-12">
                                <h3 className="lg:text-3xl text-xl lg:text-center tracking-wider font-ultra pb-6 pt-4 lg:pt-0">Better Feed Creates Better Eggs</h3>
                                <p className="lg:text-center text-black lg:text-2xl font-lato font-medium text-xl">The best way to control quality of our eggs is to give our chickens the healthiest life possible. Aside from providing cage free environments, we mill our own feed onsite. As a result, we have healthy chickens that produce eggs with the highest nutritional value for our customers.</p>
                            </div>
                            <div className="lg:col-span-9 sm:col-span-8 col-span-12 pt-12 lg:mx-12">
                                <h3 className="lg:text-3xl text-xl lg:text-center tracking-wider font-ultra pb-6">Certified Organic Means Quality</h3>
                                <p className="lg:text-center text-black lg:text-2xl font-lato font-medium text-xl">We are certified organic by CCOF (California Certified Organic Farmers). All areas of production, from the feed mill to the processing plant, are inspected to ensure our compliance with the organic standards.</p>
                            </div>
                            <div className="lg:col-span-3 sm:col-span-4 col-span-12 lg:w-56 w-32 md:mx-0 mx-auto pt-4">
                                <img src="/images/usdaOrganic.png" className=""></img>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <a class="bg-chinored rounded-md font-din tracking-wider cursor-pointer mx-auto lg:text-2xl text-xl uppercase text-white px-6 py-2">Find Out More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const organicFeedBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OrganicFeed {...data} />
      </BlocksControls>
    )}