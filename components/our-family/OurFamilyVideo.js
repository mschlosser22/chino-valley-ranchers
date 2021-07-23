import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'

export function OurFamilyVideo(props) {

    return (
        <div>
            <div className="relative -mt-12 pt-8 lg:pt-20 pb-12 bg-no-repeat bg-cover min-h-[56px]" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}></div>
            <div className="relative bg-contain" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
                <div className="max-w-5xl mx-auto pb-36">

                    <div style={{ backgroundImage: `url('/images/blue-board.jpg')` }} className="bg-cover w-full">
                        <div className="p-8">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe src={props.video.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Page Heading */}
                    <div className="lg:text-left z-50 pt-12 lg:pt-16 max-w-5xl mx-auto px-8 lg:px-0">
                        <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase lg:mb-12 mb-6">
                            <InlineTextarea name="headingOne" />
                        </h1>
                        {props.descriptionListOne.map((item, index) =>
                            <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold">
                                {item.description}
                            </p>
                        )}
                    </div>

                    {/* Page Heading */}
                    <div className="lg:text-left z-50 pt-12 lg:pt-16 max-w-5xl mx-auto px-8 lg:px-0">
                        <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase lg:mb-12 mb-6">
                            <InlineTextarea name="headingTwo" />
                        </h1>
                        {props.descriptionListTwo.map((item, index) =>
                            <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold">
                                {item.description}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>

    )
}

export const ourFamilyVideoBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OurFamilyVideo {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Our Family Video Component',
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
                name: "headingOne",
                label: "Heading One",
                component: "text"
            },
            {
                name: "descriptionListOne",
                label: "Description List One",
                component: "group-list",
                fields: [
                    {
                        name: "description",
                        label: "Description",
                        component: "textarea"
                    }
                ]
            },
            {
                name: "headingTwo",
                label: "Heading Two",
                component: "text"
            },
            {
                name: "descriptionListTwo",
                label: "Description List Two",
                component: "group-list",
                fields: [
                    {
                        name: "description",
                        label: "Description",
                        component: "textarea"
                    }
                ]
            },
        ],
    },
}