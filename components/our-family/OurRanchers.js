import Image from 'next/image'
import { InlineText, InlineTextarea, InlineBlocks, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'

import { HeadingSubheading } from '../../components/heading/HeadingSubheading'

export function OurRanchers({data, index}) {

    //const {content} = props

    return(

        <div className="relative pt-8 -mt-12 pb-24 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/blue-bg.png')` }}>
            <div className="max-w-5xl mx-auto pt-8 lg:pt-32 text-left">

                <h1 className="text-3xl lg:text-6xl text-white font-ultra uppercase lg:mb-12 mb-6">
                    <InlineTextarea name="heading" />
                </h1>

                <h2 className="text-2xl lg:text-5xl text-white font-ultra uppercase tracking-wider lg:leading-tight lg:mx-0 mx-8 lg:pb-6 pb-4">
                    <InlineTextarea name="subheading" />
                </h2>

                {data.list.map((item, index) =>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold text-white">
                        {item.description}
                    </p>
                )}

            </div>
        </div>

    )

}

export const ourRanchersBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OurRanchers data={data} />
      </BlocksControls>
    ),
    template: {
        label: 'Content Single Column',
        defaultItem: {
            content: [
                {
                    heading: "Some Heading",
                    subheading: "Some subheading"
                },
                {
                    heading: "Some Heading",
                    subheading: "Some subheading"
                },
                {
                    heading: "Some Heading",
                    subheading: "Some subheading"
                }
            ]
        },
        fields: [
            {
                name: "heading",
                label: "Heading",
                component: "textarea"
            },
            {
                name: "subheading",
                label: "Sub Heading",
                component: "textarea"
            },
            {
                name: "list",
                label: "List",
                component: "group-list",
                fields: [
                    {
                        name: "description",
                        label: "Description",
                        component: "textarea"
                    }
                ]
            }
        ],
    },
}

const content_template = {
    label: 'Heading Block',
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

const CONTENT_SINGLE_COLUMN_BLOCKS = {
    content: {
      Component: HeadingSubheading,
      template: content_template,
    },
}