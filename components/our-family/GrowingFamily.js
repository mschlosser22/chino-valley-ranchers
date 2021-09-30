import { propTypes } from 'react-markdown'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from '../../components/tinacms/InlineWYSIWYG'


export function GrowingFamily(props) {
    return (
        <div>
            <div className="relative -mt-12 pt-20 lg:pt-36 bg-no-repeat bg-cover pb-12 lg:pb-24" style={{ backgroundImage: `url('/images/bg-gray-stripes-alt.png')` }}>
                <div className="max-w-5xl mx-auto">

                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <h1 className="text-2xl lg:text-5xl text-chinoblue font-ultra uppercase tracking-wider lg:leading-tight lg:mx-0 mx-8 lg:pb-6 pb-4">
                                <InlineTextarea name="heading" />
                            </h1>
                        </div>
                    </div>

                    {props.list.map((item, index) =>
                        <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold px-8 lg:px-0">
                            {item.description}
                        </p>
                    )}

                </div>
            </div>
        </div>
    )
}

export const growingFamilyBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <GrowingFamily {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Growing Family Component',
        defaultItem: {

        },
        fields: [
            {
                name: "heading",
                label: 'Heading',
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
    }}