import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'

export function OurSustainability(props) {

    return (
        <div>
            <div class="relative -mt-12 pt-8 lg:pt-20 pb-12 bg-no-repeat bg-cover min-h-[56px]" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>

            </div>
            <div className="relative bg-contain" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
                <div className="max-w-5xl mx-auto pb-24">

                    <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wider lg:leading-tight lg:mx-0 mx-8 lg:pb-6 pb-4">
                        <InlineTextarea name="heading" />
                    </h1>

                    <InlineWysiwyg name="markdown" format="markdown" sticky>
                        <ReactMarkdown className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold sustainability">{props.markdown}</ReactMarkdown>
                    </InlineWysiwyg>

                </div>
            </div>
        </div>

    )
}

export const ourSustainabilityBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OurSustainability {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Our Sustainability Component',
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
                name: 'description',
                label: 'Description',
                component: 'textarea'
            },
            {
                name: 'callout',
                label: 'Callout',
                component: 'group',
                fields: [
                    {
                        name: 'heading',
                        label: 'Heading',
                        component: 'text'
                    },
                    {
                        name: 'subheading',
                        label: 'Sub Heading',
                        component: 'text'
                    },
                    {
                        name: 'description',
                        label: 'Description',
                        component: 'textarea'
                    }
                ]
            },
            {
                name: 'stat',
                label: 'Stat',
                component: 'textarea'
            },
            {
                name: 'source',
                label: 'Source',
                component: 'text'
            }
        ],
    },
}