import { propTypes } from 'react-markdown'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'


export function OrganicMatters(props) {
    return (
        <div>
            <div className="relative -mt-12 pt-36 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/bg-gray-stripes-alt.png')` }}>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-12">
                        <div className="lg:col-span-8 col-span-12">
                            <h1 className="text-2xl lg:text-5xl text-chinoblue font-ultra uppercase tracking-wider lg:leading-tight lg:mx-0 mx-8 lg:pb-6 pb-4">
                                <InlineTextarea name="heading" />
                            </h1>
                            <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 lg:pr-16 pr-0">
                                <InlineTextarea name="description" />
                            </p>
                        </div>
                        <div className="lg:col-span-4 col-span-12 lg:-mt-12 mx-auto">
                            <img src={props.imageRight.src} className="w-64 lg:w-full" alt={props.imageRight.alt} />
                            <img src={props.imageRightAlt.src} className="lg:-ml-16 lg:-mt-2 -mt-0 -ml-0 w-52 lg:w-full" alt={props.imageRightAlt.alt} />
                        </div>
                    </div>
                    <div className="lg:mt-16 mt-12 lg:pb-12 pb-6 ">
                        <h3 className="text-chinored lg:text-4xl text-3xl lg:mx-0 mx-8 uppercase font-ultra ">
                            <InlineTextarea name="listHeading" />
                        </h3>
                    </div>
                    <div className="w-full pb-24">
                        {props.list.map((item, index) =>
                            <div key={index} className="grid grid-cols-12 gap-6 pt-8">
                                <div className="lg:col-span-4 col-span-12">
                                    <h4 className="text-2xl uppercase black font-ultra lg:mx-0 mx-8">
                                        <InlineWysiwyg name="item.title" format="markdown" sticky>
                                            <ReactMarkdown>{item.title}</ReactMarkdown>
                                        </InlineWysiwyg>
                                    </h4>
                                </div>
                                <div className="lg:col-span-8 col-span-12">
                                    <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 lg:pr-16 pr-0">
                                        <InlineWysiwyg name="item.description" format="markdown" sticky>
                                            <ReactMarkdown>{item.description}</ReactMarkdown>
                                        </InlineWysiwyg>
                                    </p>
                                </div>
                                <hr className="solid border-chinodarkgray col-span-12"></hr>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}

export const organicMattersBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OrganicMatters {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Organic Matters Component',
        defaultItem: {

        },
        fields: [
            {
                name: "heading",
                label: 'Heading',
                component: "textarea"
            },
            {
                name: "description",
                label: 'Description',
                component: "textarea"
            },
            {
                name: "imageRight",
                label: 'Image Right',
                component: "group",
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
                name: "imageRightAlt",
                label: 'Image Right Bottom',
                component: "group",
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
                        component: "markdown"
                    },
                    {
                        name: "description",
                        label: "Description",
                        component: "textarea"
                    }
                ]
            }
        ],
    }}