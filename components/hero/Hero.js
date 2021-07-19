import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'

export function Hero(props) {



    return(

        <div className="relative overflow-hidden lg:overflow-visible z-40 lg:z-0 w-full min-h-[400px] sm:min-h-[400px] lg:min-h-[516px] flex items-center hero-component">
            <div className="absolute w-full min-h-[400px] sm:min-h-[400px] lg:h-[600px]">
                <InlineImage
                    name="image"
                    parse={media => `/images/${media.filename}`}
                    uploadDir={() => "/images/"}
                    alt="Organic Eggs"
                >
                    {(props) => (
                        <div
                            style={{
                            height: 0,
                            paddingBottom: "100%"
                            }}
                        >
                            <Image
                            src={props.src}
                            alt={props.alt}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="hidden lg:initial"
                            />
                        </div>
                    )}
                </InlineImage>

            </div>

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

export const heroBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <Hero {...data} />
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