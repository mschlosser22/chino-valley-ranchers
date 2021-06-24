import { InlineText, InlineTextarea, InlineBlocks, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'
import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'

export function DifferenceFeed() {
    return (
      <Controller>
        <div>
          <div id="difference" className="relative lg:pt-8 pt-12 z-20 -mt-16 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/bg-orange-egg-ripped.png')` }}>
            <div className="pt-20 max-w-4xl mx-auto px-8 lg:px-0">
                <h1 className="text-2xl lg:text-5xl lg:w-2/3 w-full text-white font-ultra uppercase tracking-wider lg:mb-12 mb-6 text-center md:text-left">The Difference is in Our Feed</h1>
                <p className="text-black lg:text-xl lg:w-3/4 w-full mx-4 font-lato font-medium text-xl mx-8 md:mx-0 tracking-wide font-medium lg:pb-20">As a leading producer of organic eggs, we take great pride in providing you with a wide variety of options including omega-3, vegetarian, and soy free. We also ensure that our eggs have the highest nutritional values and the best taste. This is all possible thanks to our precision feed formulation. We begin with the finest grains, using only top grade corn, soybean, alfalfa, flax seed, and other select seeds, plus limestone meal for essential minerals. All of our organic grains come from non-genetically modified (non-GMO) seeds and are grown in certified organic fields that are free of pesticides, which means healthier food for your table.</p>
            </div>
            <div className="lg:flex block lg:justify-between max-w-5xl lg:pl-14 mx-auto">
                <div className="text-center lg:mt-0 lg:mb-0 mb-8 mt-8">
                    <a className="bg-chinored rounded-md font-din tracking-wider cursor-pointer mx-auto lg:text-xl text-md uppercase text-white px-6 py-2 mb-12">Discover The Difference</a>
                </div>
                <div className="lg:-mb-12 lg:ml-12 z-30 mb-12">
                    <img src="/images/2eggs.png" className="w-56 mx-auto"></img>
                </div>
            </div>

            <div>
              <Scene duration={400} triggerElement="#difference">
                {(progress, event) => (
                    <Spring
                        config={{
                            mass: 1, tension: 120, friction: 14
                        }}
                        top={ progress > 0 ? `${progress * 1}rem` : '-19rem' }
                    >
                        {styles => (

                            <animated.div style={styles} className="hidden lg:block absolute right-0 -top-96 h-80 w-96">
                                <img src="/images/SVG/hand.svg"  />
                            </animated.div>
                        )}
                    </Spring>
                )}
            </Scene>
            </div>

          </div>
        </div>
      </Controller>
    )
}

export const differenceFeedBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <DifferenceFeed {...data} />
      </BlocksControls>
    )}