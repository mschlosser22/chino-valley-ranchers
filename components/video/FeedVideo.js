import Image from 'next/image'
import { useRef } from 'react'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Spring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

export function FeedVideo(props) {

    const { ref, inView, entry } = useInView({
        threshold: 0,
    });

    const parallax = useRef(null)

    const handleAsyncTo = async (next, cancel) => {
        await next({ opacity: 1, color: '#ffaaee' })
        await next({ opacity: 0, color: 'rgb(14,26,19)' })
    }

    return(
        <>
        <div className="w-full relative -mt-16 -mb-12 z-10 pb-24 bg-cover bg-no-repeat bg-fixed" style={{ backgroundImage: `url('/images/dirt-bg.png')`}}>
            <Parallax ref={parallax} pages={1}>

                <ParallaxLayer
                    offset={0}
                    speed={10}
                    factor={1}
                    className="z-0"
                    style={{
                        backgroundAttachment: 'fixed',
                      backgroundImage: `url('/images/chicken-feet.png')`
                    }}
                />

            </Parallax>
            <div className="max-w-5xl mx-auto pt-12 pb-24 lg:pt-28 relative">

                <div className="grid grid-cols-12 relative z-30">
                    <div className="col-span-12">
                        {/* Heading */}
                        <div className="text-3xl sm:text-6xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide mb-8 text-center pt-12 lg:pt-0">
                            <InlineTextarea name="heading" />
                        </div>
                    </div>
                    {/* Video */}
                    <div className="col-span-12 z-40 sm:px-4 lg:px-0">
                        <div className="border-8 border-white rounded">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe src={props.video.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="col-span-12 relative lg:-mt-6">
                        <div className="max-w-xl mx-auto">
                            <div ref={ref} className="bg-cover bg-no-repeat px-8 pt-8 pb-12 text-center flex items-center text-xl leading-body lg:text-3xl lg:leading-body text-white font-lato font-bold tracking-wide" style={{ backgroundImage: `url('/images/content-bg.png')`}}>
                                <InlineTextarea name="content" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="hidden xl:block xl:absolute -right-32 bottom-24 2xl:-right-52 2xl:bottom-48 z-40">
                    {inView}
                    <Spring
                        style="perspective: 400px"
                        config={{
                            mass: 1, tension: 120, friction: 14
                        }}
                        from={{ transform: `rotateZ(0deg)` }}
                        to={[
                            //{ transform: `rotateZ(-15deg)` },
                            { transform: `rotateZ(15deg)` },
                            { transform: `rotateZ(0deg)` }
                        ]}
                    >
                        {styles => (
                            <animated.div style={styles}><img src={props.image.src} alt={props.image.alt} /></animated.div>
                        )}
                    </Spring>
                </div>
            </div>
        </div>
        </>
    )

}

export const feedVideoBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <FeedVideo {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Feed Video',
        defaultItem: {

        },
        fields: [
            {
                name: 'classes',
                label: 'Tailwind CSS Classes',
                component: 'text'
            },
            {
                name: 'heading',
                label: 'Heading',
                component: 'text'
            },
            {
                name: 'video',
                label: 'Video',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'src',
                        component: 'text'
                    },
                    {
                        name: 'props',
                        label: 'Props',
                        component: 'text'
                    }
                ]
            },
            {
                name: 'content',
                label: 'Content',
                component: 'textarea'
            },
            {
                name: 'image',
                label: 'Image',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'Image',
                        component: 'image'
                    },
                    {
                        name: 'alt',
                        label: 'Alt Text',
                        component: 'text'
                    }
                ]
            }
        ],
    },
}