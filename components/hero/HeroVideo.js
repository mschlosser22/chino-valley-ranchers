import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'

import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'

export function HeroVideo(props) {

    return(

        <header className="relative overflow-hidden lg:overflow-visible z-0 w-full min-h-[400px] lg:min-h-screen flex items-center" role="banner">
            <div className="absolute h-[400px] lg:h-screen w-full">
                <video className="w-full h-screen absolute top-0 left-0 object-cover" src="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/Island%20-%204141.mp4" autoPlay loop playsInline muted></video>
            </div>

            <div className="max-w-7xl mx-auto z-40 text-center">
                <h1 className="text-3xl lg:text-7xl text-white font-ultra uppercase tracking-wide hero">
                    <InlineWysiwyg name="heading" format="markdown" sticky>
                        <ReactMarkdown>{props.heading}</ReactMarkdown>
                    </InlineWysiwyg>
                </h1>
            </div>
        </header>

    )

}

export const heroVideoBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <HeroVideo {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Hero',
        defaultItem: {
            heading: 'Some Headline Here',
            image: '/images/hero-products.jpg'
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
                name: 'heading',
                label: 'Heading',
                component: 'text'
            },
            {
                name: 'subheading',
                label: 'Subheading',
                component: 'text'
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
            }
        ],
    },
}