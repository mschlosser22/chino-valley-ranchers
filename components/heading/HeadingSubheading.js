import { InlineText, InlineTextarea, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'

export function HeadingSubheading(props) {

    return (
        <BlocksControls index={props.index}>
            <div className="mb-12 lg:mb-24 px-8 xl:px-0">
                <h4 className="font-ultra uppercase text-chinoyellow text-3xl lg:text-6xl tracking-wide mb-4"><InlineText name="heading" /></h4>
                <p className="font-lato text-gray-900 tracking-wide mb-8 lg:mb-8 text-xl lg:text-3xl text-white text-left"><InlineTextarea name="subheading" /></p>
            </div>
        </BlocksControls>
    )
}

export const headingSubheadingBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <HeadingSubheading />
      </BlocksControls>
    ),
    template: {
        label: 'Heading/Subheading',
        defaultItem: {
            heading: 'Some Heading here.',
            subheading: 'Some subheading here.'
        },
        fields: [

        ],
    },
}