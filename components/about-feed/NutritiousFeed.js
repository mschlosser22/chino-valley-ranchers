import { InlineText, InlineTextarea, InlineBlocks, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'
import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'

export function NutritiousFeed() {
    return (
        <Controller>
        <div>
            <div className="relative lg:pt-40 lg:-mt-12 z-40 -mt-64 pt-24 pb-32  bg-cover" style={{ backgroundImage: `url('/images/dirt-alt.png')` }}>
            <div className=" pt-20 lg:pt-24 lg:mb-28 max-w-5xl mx-auto px-8 lg:px-0 lg:flex block justify-between">
                <h1 className="text-2xl lg:text-5xl text-chinoblue font-ultra uppercase tracking-wider lg:leading-tight lg:text-center mb-6">Using nutritious organic feed has many benefits, including:</h1>
                <img src="/images/chicken.jpg" className="lg:-mt-40 lg:w-72 w-56 mx-auto"></img>
            </div>
            <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-8">

                <div className="lg:col-span-5 col-span-12 relative">
                    <h1 className="text-xl md:text-3xl text-chinored uppercase font-ultra tracking-wide px-8 md:px-0 lg:pt-0 pt-4">Better For Our Chickens</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl font-lato font-medium text-xl px-8 md:px-0">We develop our feed specifically to help keep our chickens stay healthy, active and content.</p>
                </div>

                <hr className="solid col-span-12 border-chinodarkgray" />

                <div className="lg:col-span-5 col-span-12 relative">
                    <h1 className="text-xl md:text-3xl text-chinored uppercase font-ultra px-8 md:px-0 tracking-wide">Better For Our Eggs</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl font-lato font-medium text-xl px-8 md:px-0">Organic feed has a positive impact on the quality and nutritional value of our eggs.</p>
                </div>

                <hr className="solid border-chinodarkgray col-span-12" />

                <div className="lg:col-span-5 col-span-12 relative" id="betterForYou">
                    <h1 className="text-xl md:text-3xl text-chinored uppercase font-ultra tracking-wide px-8 md:px-0">Better For <br className="lg:block hidden"/>You</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl font-lato font-medium text-xl px-8 md:px-0">Our chickens don’t consume hormones, antibiotics, or animal by-products, which means you don’t either!</p>
                </div>
            </div>
            <Scene duration={400} triggerElement="#betterForYou">
                {(progress, event) => (
                    <Spring
                        style="perspective: 400px"
                        config={{
                            mass: 1, tension: 120, friction: 14
                        }}
                        from={
                            { transform: 'rotate(0deg)', bottom: '0rem' }
                        }
                        to={[
                            { transform: `rotate(-${progress * 10}deg)`, bottom: `${progress * 1.5}rem` }
                        ]}
                    >
                        {styles => (

                            <animated.div style={styles} className="w-36 ml-24 pt-2 lg:block hidden relative">
                                <img src="/images/yourFamilyArrow.png"></img>
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

export const nutritiousFeedBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <NutritiousFeed {...data} />
      </BlocksControls>
    )}