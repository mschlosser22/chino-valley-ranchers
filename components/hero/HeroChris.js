import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'
import chrisImage from '../../public/images/chris-flat.jpg'

export function HeroChris(props) {

    return(

        <div className="relative h-24 lg:h-auto pt-16 lg:mt-0">
            <Image
                src={chrisImage}
                alt="Chris Can Cook"
                layout='responsive'
                />

            {/*<div className="absolute w-full h-full lg:hidden bg-cover" style={{ backgroundImage: `url(${props.image_mobile.src})` }}>
            </div>*/}

            <div className="max-w-5xl mx-auto z-40 text-center">
                <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white font-ultra uppercase tracking-wide hero">
                    <InlineWysiwyg name="heading" format="markdown" sticky>
                        <ReactMarkdown>{props.heading}</ReactMarkdown>
                    </InlineWysiwyg>
                </h1>
            </div>
        </div>

    )

}

export const heroChrisBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <HeroChris {...data} />
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
                name: 'image',
                label: 'Image',
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
                        label: 'Alt',
                        component: 'text'
                    }
                ]
            },
            {
                name: 'heading',
                label: 'Heading',
                component: 'text'
            }
        ],
    },
}