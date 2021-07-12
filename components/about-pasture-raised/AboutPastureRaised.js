import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { WhatItTakes } from '../../components/about-pasture-raised/WhatItTakes'


export function AboutPastureRaised(props) {

    //const {content} = props


    return(
     <div>
        <div className="relative pt-8 lg:-mt-12 -mt-32 bg-no-repeat" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
          <div className="relative bg-repeat-y pb-44 mt-4" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
            <div className="max-w-6xl mx-auto">

                {/* Page Heading */}
                <div className="text-center z-50 pt-20 pb-8 lg:py-24 max-w-5xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6"><InlineTextarea name="heading" /></h1>
                    <p className="font-lato lg:text-3xl tracking-wide"><InlineTextarea name="subheading" /></p>
                </div>

                           <div className="max-w-5xl mx-auto">
                               <div className="grid grid-cols-12 gap-8">
                                   <div className="md:col-span-4 col-span-12 mx-auto lg:mx-0 relative">
                                        <img src="/images/darnGoodEgg-Img.png" alt="" className="mb-12 w-48 md:w-full"></img>
                                    </div>
                                    <div className="md:col-span-8 col-span-12">
                                        <img src="/images/orangeSeperator.jpg" className="md:mt-16 mb-12 col-span-12"></img>
                                        <p className="text-black lg:2xl lg:mx-4 mx-8 text-center md:text-left font-lato font-medium text-xl leading-relaxed">There’s nothing better than eggs that come from pasture raised hens who are free to roam about during the day in wide-open fields. They eat what is natural to them, including grass, seed, bugs and worms. They have all the shade, water, organic feed and freedom to roam about. The chickens are happier and healthier, which is why Chino Valley Ranchers pasture raised eggs are so delicious and nutritious.</p>
                                        <img src="/images/orangeSeperator.jpg" className="mt-12 mb-12 col-span-12"></img>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <p className="text-lg lg:text-3xl text-chinoblue font-ultra tracking-wide text-center transform -rotate-2">free range & <br /><span>ready to roam</span></p>
                                    <img src="/images/freeRangeArrow.png" className="w-24 pt-6 pb-4"></img>
                                </div>
                                <div style={{ backgroundImage: `url('/images/blue-board.jpg')` }} className="bg-cover w-full">
                                    <div className="p-8">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <iframe src={props.video.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        </div>
     </div>

    )

}

export const aboutPastureRaisedBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <AboutPastureRaised {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'About Pasture Raised Component',
        defaultItem: {
            heading: 'Some Headline Here',
            subheading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            image: '/images/bg-paper-edge.png'
        },
        fields: [

        ],
    },
}