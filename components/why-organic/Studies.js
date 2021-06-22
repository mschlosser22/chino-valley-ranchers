import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'

export function Studies() {
    return (
        <Controller>
        <div>
            <div className="lg:pb-20 pb-12 mt-24 max-w-6xl mx-auto lg:text-center">
            <Scene duration={400} triggerElement="#chickensTwo">
                {(progress, event) => (
                <div className="max-w-3xl mx-auto flex justify-between" id="chickensTwo">
                    <Spring
                        style="perspective: 400px"
                        config={{
                            mass: 1, tension: 120, friction: 14
                        }}
                        from={
                            { left: '0rem', }
                        }
                        to={[
                            { left: `${progress}rem` }
                        ]}
                    >
                        {styles => (

                            <animated.div style={styles} className="h-56 flex relative">
                                <img className="h-28 self-end" src="/images/SVG/right-chickens.svg" />
                            </animated.div>

                        )}
                    </Spring>
                    <Spring
                        style="perspective: 400px"
                        config={{
                            mass: 1, tension: 120, friction: 14
                        }}
                        from={
                            { right: '0rem', }
                        }
                        to={[
                            { right: `${progress}rem` }
                        ]}
                    >
                        {styles => (

                            <animated.div style={styles} className="h-56 flex relative">
                                <img className="h-28 self-center" src="/images/SVG/left-chickens.svg" />
                            </animated.div>

                        )}
                    </Spring>
                    <Spring
                        style="perspective: 400px"
                        config={{
                            mass: 1, tension: 120, friction: 14
                        }}
                        from={
                            { transform: 'rotate(0)', }
                        }
                        to={[
                            { transform: `rotate(-${progress * 5}deg)` }
                        ]}
                    >
                        {styles => (

                            <animated.div style={styles} className="h-56 flex relative">
                                <img className="h-56 self-center" src="/images/SVG/chicken-middle-two.svg" />
                            </animated.div>

                        )}
                    </Spring>
                    <Spring
                        style="perspective: 400px"
                        config={{
                            mass: 1, tension: 120, friction: 14
                        }}
                        from={
                            { left: '0rem', }
                        }
                        to={[
                            { left: `${progress}rem` }
                        ]}
                    >
                        {styles => (

                            <animated.div style={styles} className="h-56 flex relative">
                                <img className="h-28 self-center" src="/images/SVG/right-chickens.svg" />
                            </animated.div>

                        )}
                    </Spring>
                    <Spring
                        style="perspective: 400px"
                        config={{
                            mass: 1, tension: 180, friction: 12
                        }}
                        from={
                            { right: '0rem', }
                        }
                        to={[
                            { right: `${progress}rem` }
                        ]}
                    >
                        {styles => (

                            <animated.div style={styles} className="h-56 flex relative">
                                <img className="h-28 self-end" src="/images/SVG/left-chickens.svg" />
                            </animated.div>

                        )}
                    </Spring>
                </div>
                )}
                </Scene>
                <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wider text-center lg:px-0 px-8">Studies have found that battery hens have a
                <span className="bg-chinodarkorange px-2 leading-snug mx-2">25X higher chance</span>
                of contracting Salmonella than cage-free hens.
                </h1>
                <div className="max-w-3xl mx-auto">
                <Scene duration={300} triggerElement="#chickensTwo">
                        {(progress, event) => (
                            <Spring
                                style="perspective: 400px"
                                config={{
                                    mass: 1, tension: 280, friction: 120
                                }}
                                from={
                                    { width: '0%', }
                                }
                                to={[
                                    { width: `${progress * 100}%` }
                                ]}
                            >
                                {styles => (

                                    <animated.div style={styles} className="relative mx-auto">
                                        <img src="/images/redSeperator.png" className="pt-6 pb-6 w-full" />
                                    </animated.div>

                                )}
                            </Spring>
                        )}
                    </Scene>
                </div>
                <h1 className="font-ultra lg:text-6xl text-3xl lg:text-center text-left lg:mx-0 mx-8 text-chinored uppercase tracking-wide lg:pb-16 pb-8">California Free Range <br className="lg:block hidden" />vs. The Other Guys</h1>
                <div className="max-w-3xl mx-auto lg:mb-24 mb-16">
                    <p className="font-lato lg:text-2xl tracking-wider lg:text-center text-left lg:mx-0 mx-8 text-chinodarkblue">Cage free farming is the standard in the humane treatment of chickens. As a result, we don’t believe that any other technique is acceptable. Other egg providers attempt to produce eggs on a mass scale, keeping their chickens in large buildings without direct access to the outdoors.</p>
                    <img src="/images/blueSeperator.jpg" className="py-8 lg:px-0 px-8" />
                    <p className="font-lato lg:text-2xl tracking-wider lg:text-center text-left lg:mx-0 mx-8 text-chinodarkblue">Chickens in these environments are stuffed into a cage with several other chickens, each with a space roughly the size of a sheet of notebook paper. There’s little room to stretch their wings or turn around. They’re uncomfortable and don’t get the exercise they need, unlike those that live outside the cage. Oftentimes they are too unhealthy to even stand up.</p>
                    <img src="/images/blueSeperator.jpg" className="py-8 lg:px-0 px-8" />
                    <p className="font-lato lg:text-2xl tracking-wider lg:text-center text-left lg:mx-0 mx-8 text-chinodarkblue lg:pb-24 pb-12">Research has shown that a comfortable low-stress environment throughout all stages of a chicken’s development makes for a happier and healthier life. We believe that free range environments are the best and produce the highest quality eggs.</p>
                    <a className="bg-chinored rounded-md font-din tracking-wider text-center cursor-pointer mx-auto lg:text-2xl text-lg uppercase text-white px-6 py-2 lg:text-center text-left lg:mx-0 mx-8">Find a store near you</a>
                </div>
            </div>
        </div>
        </Controller>
    )
}

export const studiesBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <Studies {...data} />
      </BlocksControls>
    )}