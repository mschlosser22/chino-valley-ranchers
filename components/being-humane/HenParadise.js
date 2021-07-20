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
                <div className="lg:text-center z-50 pt-12 lg:py-16 max-w-4xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase lg:mb-12 mb-6">Hello Hen Paradise!</h1>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold">At Chino Valley Ranchers we strive to provide an environment that allows our chickens to live and act in their natural ways. They have unlimited access to sunlight, premium grain feed, and plenty of fresh air and water. In fact, their fresh water is drawn from our own wells.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold">Our cage free hen houses are specially built to give the birds freedom to roam the floor, and also are equipped with special roosting and nesting areas. All of our hen houses are environmentally controlled to maintain comfortable temperatures.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal font-bold">Besides enjoying the interior amenities of the cage free houses, our free range and organic chickens are free to go outside—for sunning, socializing or dust bathing—anytime they want.</p>
                </div>

                <div className="flex relative" id="chickens">
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

        ]
    }
}