import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { WhatItTakes } from '../../components/about-pasture-raised/WhatItTakes'

import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'


export function AboutPastureRaised(props) {

    const scrollPositionOverHalf = (progress) => {
        if((progress * 100) >= 25) {
            return true
        } else {
            return false
        }
    }

    const scrollPositionOverHalfAlt = (progress) => {
        if((progress * 100) >= 75) {
            return true
        } else {
            return false
        }
    }

    const scrollPositionEven = (progress) => {
        if( (Math.ceil(progress * 10)) % 2 == 0 ) {
            return false
        } else {
            return true
        }
    }


    return(
    <Controller>
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

                                <Scene duration={400} triggerElement="#chickens">
                                        {(progress, event) => (
                                            <>
                                            <Spring
                                                style="perspective: 400px"
                                                config={{
                                                    mass: 1, tension: 80, friction: 14
                                                }}
                                                from={
                                                    { transform: 'rotate(-5deg) scale(0.9)', }
                                                }
                                                to={[
                                                    { transform: `rotate(${(progress * 5) - 5}deg) scale(${(progress + 9) / 10})` }
                                                ]}

                                            >
                                                {styles => (
                                                    <animated.div style={styles} className="md:col-span-4 col-span-12 mx-auto lg:mx-0 relative">
                                                        <img src="/images/darnGoodEgg-Img.png" alt="" className="mb-12 w-48 md:w-full"></img>
                                                    </animated.div>
                                                )}
                                            </Spring>
                                            </>
                                        )}
                                    </Scene>

                                    <div className="md:col-span-8 col-span-12">
                                        <img src="/images/orangeSeperator.jpg" className="md:mt-16 mb-12 col-span-12"></img>
                                        <p className="text-black lg:2xl lg:mx-4 mx-8 text-center md:text-left font-lato font-medium text-xl leading-relaxed">
                                            <InlineTextarea name="description" />
                                        </p>
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
     </Controller>
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
            {
                name: "heading",
                label: "Heading",
                component: "text"
            },
            {
                name: "subheading",
                label: "Sub Heading",
                component: "textarea"
            },
            {
                name: "description",
                label: "Description",
                component: "textarea"
            },
            {
                name: "video",
                label: "Video",
                component: "group",
                fields: [
                    {
                        name: "src",
                        label: 'src',
                        component: 'text'
                    }
                ]
            }
        ],
    },
}