import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { Spring, animated, interpolate } from 'react-spring'
import { Controller, Scene } from 'react-scrollmagic'
import { Button } from '../../components/button/Button'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'

export function WayItsMade(props) {
    return (
    <Controller>
    <div>
        <div className="relative lg:pt-56 pt-36 -mt-56 pb-28 bg-repeat-y bg-cover" style={{ backgroundImage: `url('/images/bg-paper-white2.png')` }}>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-12 lg:gap-8 pt-20 md:mx-auto px-8">
                    <div className="md:col-span-5 col-span-12">
                        <h1 id="eggsMade" className="text-2xl lg:text-5xl text-chinoblue lg:leading-tight font-ultra uppercase tracking-wide mb-6">
                            <InlineTextarea name="heading" />
                        </h1>
                    </div>
                    <div className="md:col-span-7 col-span-12">
                        <p className=" text-black lg:leading-normal lg:text-2xl font-lato font-medium text-xl">
                            <InlineTextarea name="descriptionTop" />
                        </p>
                    </div>
                    <div className="md:col-span-5 col-span-12 lg:-mt-6 my-4 lg:my-0 mx-auto">
                    <Scene duration={400} triggerElement="#eggsMade">
                                        {(progress, event) => (
                                            <Spring
                                            style="perspective: 400px"
                                            config={{
                                                mass: 1, tension: 120, friction: 14
                                            }}
                                            from={{ transform: 'rotate(-10deg) scale(0.8)', }}
                                            to={{ transform: `rotate(${(progress * 10) -10}deg) scale(${(progress + 9) / 10})` }}
                                        >
                                            {styles => (

                                                <animated.div style={styles}>
                                                    <img src="/images/bowl-of-eggs.png"></img>
                                                </animated.div>
                                            )}
                                        </Spring>
                                        )}
                                    </Scene>
                    </div>
                    <div className="md:col-span-7 col-span-12">
                        <p className="text-black lg:leading-normal lg:text-2xl font-lato font-medium text-xl">
                            <InlineTextarea name="descriptionBottom" />
                        </p>
                    </div>
                    <div className="col-span-12 lg:py-4 py-12">
                        <h3 className="text-black font-ultra text-xl lg:text-3xl text-center lg:text-left">
                            <InlineTextarea name="listHeading" />
                        </h3>
                    </div>

                    {props.list.map((item, index) =>
                        <div key={index} className="col-span-12 grid grid-cols-12">
                            <div className="lg:col-span-5 col-span-12 lg:mx-auto">
                                <h1 className="text-2xl md:text-4xl text-chinored uppercase font-ultra tracking-wide">
                                    <InlineWysiwyg name="title" format="markdown" sticky>
                                        <ReactMarkdown>{item.title}</ReactMarkdown>
                                    </InlineWysiwyg>
                                </h1>
                            </div>
                            <div className="lg:col-span-7 col-span-12 lg:my-0 my-6">
                                <p className="text-black lg:text-2xl font-lato font-medium text-xl">
                                    <InlineWysiwyg name="description" format="markdown" sticky>
                                        <ReactMarkdown>{item.description}</ReactMarkdown>
                                    </InlineWysiwyg>
                                </p>
                            </div>
                            <hr className="solid col-span-12 border-chinodarkgray" />
                        </div>

                    )}

                </div>
                <div className="text-center pt-16">
                    <Button button={props.button} />
                </div>
            </div>
        </div>
    </div>
    </Controller>
    )
}

export const wayItsMadeBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <WayItsMade {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Way Its Made Component',
        defaultItems: [],
        fields: [
            {
                name: "heading",
                label: "Heading",
                component: "text"
            },
            {
                name: "descriptionTop",
                label: "Description Top",
                component: "textarea"
            },
            {
                name: "descriptionBottom",
                label: "Description Bottom",
                component: "textarea"
            },
            {
                name: "listHeading",
                label: "List Heading",
                component: "text"
            },
            {
                name: "list",
                label: "List",
                component: "group-list",
                fields: [
                    {
                        name: "title",
                        label: "Title",
                        component: "text"
                    },
                    {
                        name: "description",
                        label: "Description",
                        component: "textarea"
                    }
                ]
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