import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'

import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'

import { Button } from '../../components/button/Button'

export function Studies(props) {
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
                <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wider text-center lg:px-0 px-8 stat">
                    <InlineWysiwyg name="stat" format="markdown" sticky>
                        <ReactMarkdown>{props.stat}</ReactMarkdown>
                    </InlineWysiwyg>
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
                <h1 className="font-ultra lg:text-6xl text-3xl lg:text-center text-left lg:mx-0 mx-8 text-chinored uppercase tracking-wide lg:pb-4 pb-8">
                    <InlineWysiwyg name="heading" format="markdown" sticky>
                        <ReactMarkdown>{props.heading}</ReactMarkdown>
                    </InlineWysiwyg>
                </h1>
                <div className="max-w-3xl mx-auto lg:mb-24 mb-16">
                    {props.list.map((item, index) =>
                        <div>
                            {console.log(item)}
                            <p className="font-lato lg:text-2xl tracking-wider text-left lg:mx-0 mx-8 text-chinodarkblue">
                                {item.description}
                            </p>
                            <img src="/images/blueSeperator.jpg" className="py-8 lg:px-0 px-8" />
                        </div>
                    )}
                    <div className="px-8 lg:px-0"><Button button={props.button} /></div>
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
    ),
    template: {
        label: 'Studies Component',
        defaultItems: [

        ],
        fields: [
            {
                name: 'stat',
                label: 'Stat',
                component: 'markdown'
            },
            {
                name: 'heading',
                label: 'Heading',
                component: 'markdown'
            },
            {
                name: 'list',
                label: 'List',
                component: 'group-list',
                fields: [
                    {
                        name: 'description',
                        label: 'Description',
                        component: 'textarea'
                    }
                ]
            }
        ]
    }
}