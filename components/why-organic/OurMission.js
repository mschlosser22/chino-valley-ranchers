import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { Spring, animated, interpolate } from 'react-spring'
import { ScrollPercentage } from 'react-scroll-percentage'
import { useInView } from 'react-intersection-observer'
import { Controller, Scene } from 'react-scrollmagic'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'

export function OurMission(props) {

    return (
        <Controller>
        <div>
            <div className="relative bg-contain" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-12 gap-4">
                    <div className="lg:col-span-5 col-span-12">
                        <img src="/images/family-picture.jpg" className="mx-auto lg:w-full w-72" />
                    </div>
                    <div className="lg:col-span-7 col-span-12 lg:pb-20 pb-8">
                    <Scene duration={200}>
                        {(progress, event) => (

                                <Spring
                                    style="perspective: 400px"
                                    config={{
                                        mass: 1, tension: 120, friction: 14
                                    }}
                                    from={
                                        { transform: 'rotate(-5deg) scale(0.9)', }
                                    }
                                    to={[
                                        { transform: `rotate(${(progress * 5) - 5}deg) scale(${(progress + 9) / 10})` }
                                    ]}
                                >
                                    {styles => (

                                        <animated.div style={styles}>
                                            <img src="/images/family-owned-sign.png" />
                                        </animated.div>

                                    )}
                                </Spring>
                            )}
                    </Scene>

                        <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8">
                            {props.description}
                        </p>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wide pb-4 lg:mx-0 mx-8">California Organic:</h1>
                        <h3 className="font-ultra text-xl lg:text-3xl tracking-widest uppercase lg:mx-0 mx-8">The Natural Choice</h3>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <img src="/images/orangeSeperator-thick.png" className="lg:px-0 px-8" />
                        <p className="font-lato text-xl tracking-wide py-6 lg:mx-0 mx-14 lg:mx-0 mx-8"><span className="font-bold">For more than 30 years,</span> we’ve been a leading provider of honestly organic eggs dedicated to providing free range lifestyle for our chickens.</p>
                        <img src="/images/orangeSeperator-thick.png" className="lg:px-0 px-8" />
                    </div>
                </div>
                <div className="lg:pt-12 pt-8 lg:pb-24 pb-8 relative">
                    <Scene duration={200} triggerElement="#true-free-range">
                        {(progress, event) => (
                            <Spring
                                config={{
                                    mass: 1, tension: 120, friction: 14
                                }}
                                from={
                                    { top: '0rem', transform: 'rotate(0deg)'}
                                }
                                to={[
                                    { top: `${(progress * 2.5)}rem`, transform: `rotate(${progress * 5}deg)` }
                                ]}
                            >
                            {stylesNew => (
                                <animated.div className="relative" style={stylesNew}>
                                    <img id="true-free-range" src="/images/true-range-arrow.png" className="lg:pl-28 lg:w-96 w-56 lg:pb-4 lg:mx-0 mx-8" />
                                </animated.div>
                            )}
                            </Spring>
                        )}
                    </Scene>
                    <div style={{ backgroundImage: `url('/images/blue-board.jpg')` }} className="bg-cover w-full">
                        <div className="p-8">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe src={props.video.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <Scene duration={400} triggerElement="#chickens">
                {(progress, event) => (
                <div className="max-w-3xl mx-auto flex justify-between" id="chickens">
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
                                <img className="h-56 self-center" src="/images/SVG/chickens-middle.svg" />
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
                <div className="z-50 lg:pb-20 pb-12 pt-4 max-w-6xl mx-auto px-8 lg:px-0 text-center">
                    <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wider" id="stat">
                        <InlineWysiwyg name="heading" format="markdown" sticky>
                            <ReactMarkdown>{props.stat}</ReactMarkdown>
                        </InlineWysiwyg>
                    </h1>
                    <Scene duration={300} triggerElement="#chickens">
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
                    <p className="text-sm font-lato text-center">Source: Study: 82% of U.S Households Buy Organic Food Regularly,
                    <br />
                    Organic Trade Association, 2017.</p>
                </div>
            </div>
        </div>
        </div>

        </Controller>
    )
}

export const ourMissionBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OurMission {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Our Mission Component',
        defaultItem: {

        },
        fields: [
            {
                name: 'video',
                label: 'Video',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'src',
                        component: 'text'
                    }
                ]
            },
            {
                name: 'stat',
                label: 'Stat',
                component: 'textarea'
            }
        ],
    },
}