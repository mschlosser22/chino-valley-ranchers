import Image from 'next/image'
import { InlineText, InlineTextarea, InlineBlocks, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'

import { Button } from '../../components/button/Button'
import { Paragraph } from '../../components/content/paragraph/Paragraph'

export function SizeOptions(props) {

    return(
        <div className="relative pb-20 bg-no-repeat bg-cover -mt-20" style={{ backgroundImage: `url('/images/dirt-bg-alt.png')` }}>
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-12 pt-48 pb-12 lg:pb-24 relative px-8 xl:px-0 gap-4">
                    {/* Heading */}
                    <div className="col-span-12 pb-12">
                        <h3 className="text-center text-chinored text-2xl lg:text-5xl font-ultra tracking-wide"><InlineTextarea name="heading" /></h3>
                    </div>
                    {/* Size Options */}
                    <div className="col-span-12 grid grid-cols-4 items-stretch">
                        {props.image && (
                            <div className="col-span-4"><img src={props.image.src} alt={props.image.alt} /></div>
                        )}
                        {props.sizes && props.sizes.map( (size, index) => (
                            <div key={index} className="col-span-4 lg:col-span-1 text-center lg:text-left text-gray-900 font-ultra text-lg lg:text-3xl pt-8 tracking-wide">
                                <h4>{size}</h4>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )

}

export const sizeOptionsBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <SizeOptions {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Size Options Component',
        defaultItem: {
        },
        fields: [
            {
                name: 'heading',
                label: 'Heading',
                component: 'text'
            },
            {
                name: 'sizes',
                label: 'Sizes',
                component: 'list',
                field: {
                    component: 'text'
                }
            }
        ]
    }
}