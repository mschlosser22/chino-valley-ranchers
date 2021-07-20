import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'
import { propTypes } from 'react-markdown'
import { Button } from '../../components/button/Button'

export function OrganicFeed(props) {

    const scrollPositionOverHalf = (progress) => {
        if((progress * 100) >= 50) {
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

    return (
        <Controller>
        <div>
            <div className="relative lg:pt-16 lg:-mt-11 -mt-24 pt-20 bg-no-repeat bg-contain" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
                <div className="relative bg-repeat-y pb-32 mt-4 bg-contain" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center lg:pt-20 pb-8  max-w-5xl mx-auto px-8 lg:px-0">
                            <h1 id="ourFeed" className="text-2xl lg:text-5xl text-chinored font-ultra uppercase tracking-wide lg:leading-tight lg:mb-20 mb-6 lg:px-12">
                                <InlineTextarea name="heading" />
                            </h1>
                            <img src="/images/redSeperator.png" className="mx-auto lg:pl-12 lg:w-3/5 lg:pb-6"></img>
                        </div>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-12 gap-0 lg:px-0 px-8">
                            <div className="col-span-12 sm:col-span-4 lg:col-span-3 lg:w-56 w-32 md:mx-0 mx-auto hidden lg:block">

                                <div className="egggBuild flex justify-center lg:-mt-20 relative">
                                    <Scene duration={400} triggerElement="#ourFeed">
                                        {(progress, event) => (
                                            <>
                                            <Spring
                                            style="perspective: 400px"
                                            config={{
                                                mass: 1, tension: 120, friction: 14
                                            }}
                                            opacity={ scrollPositionOverHalf(progress) ? `${progress}` : '0' }
                                            top={ scrollPositionOverHalf(progress) ? `-${progress * 4}rem` : '0rem' }

                                        >
                                            {styles => (

                                                <animated.div style={styles} className="absolute w-full h-full transform rotate-2">
                                                    <img src="/images/SVG/burst.svg" />
                                                </animated.div>
                                            )}
                                        </Spring>
                                        <Spring
                                            style="perspective: 400px"
                                            config={{
                                                mass: 1, tension: 120, friction: 14
                                            }}
                                            left={ scrollPositionOverHalf(progress) == false && scrollPositionEven(progress) ? '1.5rem' : '0rem'}
                                        >
                                            {styles => (

                                                <animated.div style={styles} className="absolute px-6 w-full h-full transform rotate-2">
                                                    <img src="/images/SVG/egg.svg" />
                                                </animated.div>
                                            )}
                                        </Spring>
                                        </>
                                        )}
                                    </Scene>
                                </div>

                            </div>
                            <div className="lg:col-span-9 sm:col-span-8 col-span-12">
                                <h3 className="lg:text-3xl text-xl lg:text-center tracking-wider font-ultra pb-6 pt-4 lg:pt-0">
                                    <InlineTextarea name="headingRight" />
                                </h3>
                                <p className="lg:text-left text-black lg:text-2xl font-lato font-medium text-xl">
                                    <InlineTextarea name="descriptionRight" />
                                </p>
                            </div>
                            <div className="lg:col-span-9 sm:col-span-8 col-span-12 pt-12 lg:mx-12">
                                <h3 className="lg:text-3xl text-xl lg:text-center tracking-wider font-ultra pb-6">
                                    <InlineTextarea name="headingLeft" />
                                </h3>
                                <p className="lg:text-left text-black lg:text-2xl font-lato font-medium text-xl">
                                    <InlineTextarea name="descriptionLeft" />
                                </p>
                            </div>
                            <div className="lg:col-span-3 sm:col-span-4 col-span-12 lg:w-56 w-32 md:mx-0 mx-auto pt-4">
                                <img src="/images/usdaOrganic.png" className=""></img>
                            </div>
                        </div>
                        <div className="mt-12 mb-28 text-center">
                            <Button button={propTypes.button} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Controller>
    )
}

export const organicFeedBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OrganicFeed {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Organic Feed Component',
        defaultItems: [],
        fields: [
            {
                name: "heading",
                label: "Heading",
                component: "text"
            },
            {
                name: "headingRight",
                label: "Heading Right",
                component: "text"
            },
            {
                name: "descriptionRight",
                label: "Description Right",
                component: "textarea"
            },
            {
                name: "headingLeft",
                label: "Heading Left",
                component: "text"
            },
            {
                name: "descriptionLeft",
                label: "Description Left",
                component: "textarea"
            },
            {
                name: "button",
                label: "Button",
                component: "group",
                fields: [
                    {
                        name: "text",
                        label: "Text",
                        component: "text"
                    },
                    {
                        name: "link",
                        label: "Link",
                        component: "group",
                        fields: [
                            {
                                name: "url",
                                label: "URL",
                                component: "text"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}