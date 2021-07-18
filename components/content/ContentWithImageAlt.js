import Image from 'next/image'
import { InlineText, InlineTextarea, InlineBlocks, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'

import { Button } from '../button/Button'
import { Paragraph } from './paragraph/Paragraph'
import { Spring, animated } from 'react-spring'
import { ScrollPercentage } from 'react-scroll-percentage'

export function ContentWithImageAlt(props) {

    return(

        <div className="w-full relative -mt-24 -mb-24 z-20 bg-cover bg-no-repeat" style={{ backgroundImage: `url('/images/bg-orange-egg-ripped.png')` }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-12 pt-24 sm:pt-36 pb-12 sm:pb-24">

                    <div className="col-span-12 sm:col-span-8 text-center text-left px-8 xl:px-0 xl:pr-8">
                        <h3 className="text-3xl sm:text-4xl lg:text-7xl text-white font-ultra uppercase tracking-wide mb-12"><InlineTextarea name="heading" /></h3>
                        <div className="pb-16">
                            <InlineBlocks name="blocks" blocks={CONTENT_WITH_IMAGE_BLOCKS} />
                        </div>

                        <Button button={props.data.button} />
                    </div>
                    <div className="col-span-12 sm:col-span-4 relative flex flex-col-reverse sm:block">
                        {/* Image */}
                        <div className="overflow-hidden w-full h-full relative max-w-xs mx-auto sm:max-w-full sm:flex sm:flex-col sm:justify-end md:block pasture-raised-image-container">
                            <InlineImage
                                name="image.src"
                                parse={media => media.id}
                                uploadDir={() => '/images/'}
                                alt="image.alt"
                            />
                        </div>
                        {/* Callout Image */}
                        <ScrollPercentage>
                            {({ percentage, ref, entry }) => (
                                <div ref={ref} className="relative sm:absolute sm:top-1/2 md:-top-24 sm:right-0 flex justify-center sm:block pt-12 sm:pt-0 px-10 lg:px-0">
                                    <Spring
                                        style="perspective: 400px"
                                        config={{
                                            mass: 1, tension: 210, friction: 20
                                        }}
                                        from={{ transform: `rotateZ(-0deg)` }}
                                        to={[
                                            { transform: `rotateZ(${(percentage.toPrecision(2)) * 25}deg)` }
                                        ]}
                                    >
                                        {styles => (
                                            <animated.div style={styles}><img src={props.data.calloutImage.src} alt={props.data.calloutImage.alt} /></animated.div>
                                        )}
                                    </Spring>
                                </div>

                            )}
                        </ScrollPercentage>

                    </div>

                </div>
            </div>
        </div>

    )

}

export const contentWithImageAltBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <ContentWithImageAlt data={data} />
      </BlocksControls>
    ),
    template: {
        label: 'Content With Image',
        defaultItem: {
        },
        fields: [
            {
                name: 'heading',
                label: 'Heading',
                component: 'textarea'
            },
            {
                name: 'button',
                label: 'Button',
                component: 'group',
                fields: [
                    {
                        name: 'link',
                        label: "Link",
                        component: 'group',
                        fields: [
                            {
                                name: 'url',
                                label: 'src',
                                component: 'text'
                            }
                        ]
                    },
                    {
                        name: 'text',
                        label: 'Button Text',
                        component: 'text'
                    }
                ]
            },
            {
                name: 'image',
                label: 'Image',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'src',
                        component: 'image'
                    },
                    {
                        name: 'alt',
                        label: 'Alt Text',
                        component: 'text'
                    }
                ]
            },
            {
                name: 'calloutImage',
                label: 'Callout Image',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'src',
                        component: 'text'
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

const paragraph_template = {
    label: 'Paragraph',
    defaultItem: {
        text: [
            'Some default paragraph text here'
        ]
    },
    /*
     ** Define fields to render
     ** in a Settings Modal form
     */
    fields: [

    ],
  }

const CONTENT_WITH_IMAGE_BLOCKS = {
    text: {
      Component: Paragraph,
      template: paragraph_template,
    },
}