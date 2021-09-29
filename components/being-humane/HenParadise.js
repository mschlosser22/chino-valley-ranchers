import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'

import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'

export function HenParadise(props) {

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
        <div className="relative lg:pt-16 pt-6 z-40 lg:-mt-12 -mt-32 bg-no-repeat bg-cover overflow-hidden" style={{ backgroundImage: `url('/images/dirt-background.png')` }}>
            <div className="max-w-5xl mx-auto">

                {/* Page Heading */}
                <div className="lg:text-left z-50 pt-12 lg:py-16 max-w-4xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase lg:mb-12 mb-6 text-center">
                        <InlineTextarea name="heading" />
                    </h1>
                    <div id="chickens">
                    {props.list.map((item, index) =>
                        <p className="font-lato text-gray-900 tracking-wide mb-8 lg:mb-8 text-xl lg:text-3xl">
                            {item.description}
                        </p>
                    )}
                    </div>
                </div>

                <div className="flex relative">
                    <Scene duration={400} triggerElement="#chickens">
                        {(progress, event) => (
                            <>
                            <Spring
                                style="perspective: 400px"
                                config={{
                                    mass: 1, tension: 80, friction: 14
                                }}
                                left={ scrollPositionOverHalf(progress) ? `${progress * 4}rem` : '-45rem' }
                            >
                                {styles => (
                                    <animated.div style={styles} className="relative">
                                        <img src="/images/chicken-left.png" />
                                    </animated.div>
                                )}
                            </Spring>
                            </>
                        )}
                    </Scene>

                    <Scene duration={600} triggerElement="#chickens">
                        {(progress, event) => (
                            <>
                            <Spring
                                style="perspective: 400px"
                                config={{
                                    mass: 1, tension: 60, friction: 14
                                }}
                                bottom={ scrollPositionOverHalf(progress) ? `0rem` : '-30rem' }
                            >
                                {styles => (
                                    <animated.div style={styles} className="relative">
                                        <img src="/images/chicken-middle.png" className="relative top-24" />
                                    </animated.div>
                                )}
                            </Spring>
                            </>
                        )}
                    </Scene>

                    <div>
                        <Scene duration={400} triggerElement="#chickens">
                            {(progress, event) => (
                                <>
                                <Spring
                                    style="perspective: 400px"
                                    config={{
                                        mass: 1, tension: 40, friction: 10
                                    }}
                                    right={ scrollPositionOverHalf(progress) ? `${progress * 4}rem` : '-45rem' }
                                    bottom={ scrollPositionOverHalfAlt(progress) ? `0rem` : '-7rem' }
                                    opacity={ scrollPositionOverHalfAlt(progress) ? `1` : '0' }
                                >
                                    {styles => (
                                        <animated.div style={styles} className="relative">
                                            <img src="/images/chicken-bubble.png" />
                                        </animated.div>
                                    )}
                                </Spring>
                                </>
                            )}
                        </Scene>

                        <Scene duration={400} triggerElement="#chickens">
                            {(progress, event) => (
                                <>
                                <Spring
                                    style="perspective: 400px"
                                    config={{
                                        mass: 1, tension: 40, friction: 10
                                    }}
                                    right={ scrollPositionOverHalf(progress) ? `${progress * 4}rem` : '-45rem' }
                                >
                                    {styles => (
                                        <animated.div style={styles} className="relative">
                                            <img src="/images/chicken-right.png" />
                                        </animated.div>
                                    )}
                                </Spring>
                                </>
                            )}
                        </Scene>

                    </div>
                </div>

                </div>
            </div>

        </div>
    </Controller>
    )

}

export const henParadiseBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <HenParadise {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Hen Paradise Component',
        defaultItems: [],
        fields: [
            {
                name: "heading",
                label: "Heading",
                component: "text"
            },
            {
                name: "list",
                label: "Paragraphs",
                component: "group-list",
                fields: [
                    {
                        name: "description",
                        label: "Paragraph",
                        component: "textarea"
                    }
                ]
            }
        ]
    }
}