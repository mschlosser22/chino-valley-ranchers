import Image from 'next/image'
import { InlineText, InlineTextarea, InlineBlocks, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'
import { useTransition, useSpring, animated, useChain, useSpringRef } from 'react-spring'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useScrollPercentage, ScrollPercentage } from 'react-scroll-percentage'

import { Button } from '../button/Button'
import { Paragraph } from './paragraph/Paragraph'

export function ImageWithContent(props) {

    const [left, setLeft] = useState('-50rem')
    const [bottom, setBottom] = useState('-50rem')
    const [signPostScale, setSignPostScale] = useState('0.75')
    const [shouldAnimate, setShouldAnimate] = useState(true)
    const [shouldAnimateSign, setShouldAnimateSign] = useState(true)

    const [ref, percentage] = useScrollPercentage({
        /* Optional options */
        threshold: 0,
        triggerOnce: true,
    })

    const determineLeft = (percentage) => {
        if (shouldAnimate) {
            if(percentage <= 45) {
                setLeft(`-${45 - percentage}rem`)
            } else {
                setLeft('0rem')
                setShouldAnimate(false)
            }
        } else {
            setLeft('0rem')
        }
        //`-${35 - percentage.toPrecision(2) * 100}rem`
    }

    const styles = useSpring({
        marginLeft: left,
    })

    const determineSign = (percentage) => {
        if (shouldAnimateSign) {
            if(percentage <= 35) {
                setBottom(`-${35 - percentage}rem`)
                //setZoom(percentage)
            } else {
                setBottom('0rem')
                setSignPostScale('1')
                setShouldAnimateSign(false)
            }
        } else {
            setBottom('0rem')
            //setZoom('1')
        }
    }

    const signPost = useSpringRef()
    const stylesSign = useSpring({
        bottom: bottom,
        //transform: `scale(${zoom})`,
        position: 'relative',
        ref: signPost
    })

    const signPostScaleRef = useSpringRef()
    const stylesSignScale = useSpring({
        transform: `scale(${signPostScale})`,
        ref: signPostScaleRef
    })

    useChain([signPost, signPostScaleRef])

    return(

        <div className="relative pt-20 -mt-24 pb-12 bg-no-repeat bg-contain" style={{ backgroundImage: `url('/images/blue-bg.jpg')` }}>
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-12 pt-12 lg:pt-36 pb-0 lg:pb-24 relative px-0 xl:px-0">

                    {/* Left */}
                    <div className="col-span-12 lg:col-span-6 relative">
                        <p className="font-lato lg:text-3xl sm:leading-body tracking-wide mb-8 px-8 xl:px-0"><InlineTextarea name="content" /></p>
                        <div className="w-full hidden lg:flex lg:block justify-center max-w-xs mx-auto lg:max-w-full" ref={ref}>
                            {/* Animation Test */}
                            <ScrollPercentage
                                as="div"
                                onChange={(percentage, entry) => determineLeft(percentage.toPrecision(2) * 100)}
                            >
                                    <animated.div style={styles}>
                                        <img src={props.data.leftImage.src} alt={props.data.leftImage.alt} />
                                    </animated.div>
                            </ScrollPercentage>
                            {/* End Animation Test */}
                        </div>

                        <div className="w-full lg:hidden justify-center mx-auto relative -mb-10">
                            <a
                                href="/about-pasture-raised"
                                className="block"
                            >
                                <img src={props.data.leftImageMobile.src} alt={props.data.leftImageMobile.alt} />
                            </a>
                        </div>
                    </div>
                    {/* Right */}
                    <div className="col-span-12 lg:col-span-6 hidden lg:flex lg:block justify-center">
                        <div className="max-w-xs mx-auto lg:max-w-full">
                            {/* Sign Post Animation */}
                            <ScrollPercentage
                                as="div"
                                onChange={(percentage, entry) => determineSign(percentage.toPrecision(2) * 100)}
                            >
                                <animated.div style={stylesSign}>
                                    <animated.div style={stylesSignScale}>
                                        <a
                                            href="/about-pasture-raised"
                                            className="block transition duration-300 ease-in-out transform hover:rotate-3 cursor pointer relative"
                                        >
                                            <img src={props.data.rightImage.src} alt={props.data.rightImage.alt} />
                                        </a>
                                    </animated.div>
                                </animated.div>
                            </ScrollPercentage>
                            {/* End Sign Post Animation */}
                        </div>
                    </div>
                    {/* Absolute Div */}
                    <div className="col-span-12 xl:absolute bottom-0 right-0 xl:bottom-36 hidden lg:grid grid-cols-3 justify-around pt-20 divide-x divide-red-500 text-center xl:max-w-4xl xl:mr-0 px-8 xl:px-0">
                        {props.data.absoluteContent.map((paragraph, index) => (
                            <p key={index} className="font-ultra text-xl lg:text-4xl tracking-wide px-2 lg:px-0 leading-none lg:leading-9">{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )

}

export const imageWithContentBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <ImageWithContent data={data} />
      </BlocksControls>
    ),
    template: {
        label: 'Image With Content',
        defaultItem: {
        },
        fields: [
            {
                name: 'content',
                label: 'Content',
                component: 'textarea'
            },
            {
                name: 'absoluteContent',
                label: 'Absolute Positioned Content',
                component: 'list',
                field: {
                        component: 'text'
                }
            },
            {
                name: 'leftImage',
                label: 'Image Left',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'src',
                        component: 'image',
                        parse: media => `/images/${media.filename}`,
                        uploadDir: () => '/images'
                    },
                    {
                        name: 'alt',
                        label: 'Alt Text',
                        component: 'text'
                    }
                ]
            },
            {
                name: 'rightImage',
                label: 'Image Right',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'src',
                        component: 'image',
                        parse: media => `/images/${media.filename}`,
                        uploadDir: () => '/images'
                    },
                    {
                        name: 'alt',
                        label: 'Alt Text',
                        component: 'text'
                    }
                ]
            }
        ]
    }
}