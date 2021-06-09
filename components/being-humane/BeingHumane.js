import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'

export function BeingHumane(props) {

    //const {content} = props
   

    return(
     <div>
        <div className="relative pt-8 lg:-mt-18 z-40 -mt-32 bg-no-repeat" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
          <div className="relative bg-repeat-y pb-44 mt-4" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
            <div className="max-w-6xl mx-auto">
                
                {/* Page Heading */}
                <div className="text-center z-50 pt-12 pb-8 lg:py-24 max-w-5xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6"><InlineTextarea name="heading" /></h1>
                    <p className="font-lato lg:text-2xl tracking-wide"><InlineTextarea name="subheading" /></p>
                </div>

                           <div className="max-w-5xl mx-auto">
                               <div className="grid grid-cols-12">
                                    <div className="lg:col-span-5 md:col-span-6 col-span-12">
                                        <img src="/images/humanePictureFrame1.png" className="mx-auto md:m-0" />
                                    </div>
                                    <div className="lg:col-span-7 md:col-span-6 col-span-12">
                                        <p className="lg:text-2xl text-xl font-lato leading-normal md:pt-8 pt-8 md:pl-8 md:mx-0 mx-6">Raising chickens without cages, as well as free range and organic upbringings, typify our philosophy of treating all hens with kindness and respect. Research has shown that a comfortable low-stress environment throughout all stages of a chicken’s development makes for a happier and healthier life.</p>
                                    </div>
                                    <div className="lg:col-span-7 md:col-span-6 col-span-12">
                                        <p className="lg:text-2xl text-xl font-lato lg:pl-12 pt-8 pb-8 md:pb-0 leading-normal md:mx-0 mx-6">A few decades ago we developed a number of consistent systems for both our Pullet Farm (where we raise our chickens) and our Egg Ranch (where the mature hens lay their eggs). For example, we keep the same feed and water system in place from the Brood-House to the Grow-House and finally to the Lay-House. This makes things easy for our birds and provides familiarity throughout their lives.</p>
                                    </div>
                                    <div className="lg:col-span-5 md:col-span-6 col-span-12 lg:-mt-20 lg:pl-16">
                                        <img src="/images/humanePictureFrame2.png" className="mx-auto md:m-0" />
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        </div>
     </div>
    
    )

}

export const beingHumaneBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <BeingHumane {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Being Humane Component',
        defaultItem: {
            heading: 'Some Headline Here',
            subheading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            image: '/images/bg-paper-edge.png'
        },
        fields: [

        ],
    },
}