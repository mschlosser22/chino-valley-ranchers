import { useState } from 'react'
import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'

import { useProductsContext } from '../../context/products'
import { Button } from '../../components/button/Button'

export function MoreProducts(props) {

    const products = [
        {
            name: 'Organic Omega-3',
            description: 'Our Organic Omega-3 eggs come from hens raised in free roaming environments and fed a special organic diet that contains flax seed—a grain naturally high in Omega-3 fatty acids. Each egg contains 225 mg of Omega-3, also known as alpha-linoleic acid (ALA). ALA has been shown to have positive health effects in humans, especially for cardiovascular health.',
            photo: {
                src: '/images/organic-omega-3.png',
                alt: 'Organic Eggs'
            },
            button: {
                link: '/products/organic-omega-3',
                text: 'Learn More'
            }
        },
        {
            name: 'Organic Omega-3 Soy Free',
            description: 'Our Organic Omega-3 eggs come from hens raised in free roaming environments and fed a special soy-free diet that contains flax seed—a grain naturally high in Omega-3 fatty acids. Each egg contains 225 mg of Omega-3, also known as alpha-linoleic acid (ALA). ALA has been shown to have positive health effects in humans, especially for cardiovascular health.',
            photo: {
                src: '/images/organic-omega-3-soy-free.png',
                alt: 'Organic Eggs'
            },
            button: {
                link: '/products/organic-omega-3-soy-free',
                text: 'Learn More'
            }
        }
    ]

    return (
        <>
        <div className="relative pt-8 -mt-12 pb-12 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
            <div className="max-w-7xl mx-auto">

                {/* Page Heading */}
                <div className="text-center z-50 pt-20 pb-8 lg:py-24 max-w-5xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-4"><InlineTextarea name="heading" /></h1>
                    <p className="font-lato lg:text-3xl tracking-wide"><InlineTextarea name="subheading" /></p>
                </div>

            </div>
        </div>

        <div className="relative -mt-12">
            {products.map((product, index) => (
                        <div key={index} className="relative bg-repeat-y bg-cover" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
                            <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-12 lg:gap-8 pb-24 lg:pb-32 px-8 xl:px-0 overflow-hidden">
                                    <div className="col-span-12 lg:col-span-5">
                                        <h3 className="font-ultra text-2xl lg:text-5xl text-center lg:text-left text-gray-900 mb-2 lg:mb-12 tracking-wide uppercase">{product.name}</h3>
                                        <p className="font-lato text-gray-900 tracking-wide mb-8 lg:mb-24 text-xl lg:text-3xl text-center lg:text-left">{product.description}</p>
                                    </div>
                                    <div className="col-span-12 lg:col-span-7 relative h-[128px] lg:h-full">
                                        <div className="lg:absolute z-0 min-h-full w-full mb-8 lg:mb-0">
                                            <Image
                                                src={product.photo.src}
                                                className="h-full w-full object-cover"
                                                objectFit="contain"
                                                layout="fill"
                                                alt={product.photo.alt}
                                            />
                                        </div>

                                        {/* Button */}
                                        <div className="lg:absolute lg:bottom-0 lg:right-0 text-center">
                                            <Button button={product.button} />
                                        </div>
                                    </div>
                                    {/* Border */}
                                    <div className="col-span-12 pt-24 lg:pt-8 lg:relative lg:bottom-0">
                                        <Image
                                            src="/images/product-border.png"
                                            height={7}
                                            width={1337}
                                            alt="Border"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
            ))}

        </div>
        </>
    )

}

export const moreProductsBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <MoreProducts {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'More Product List',
        defaultItem: {},
        fields: [
            {
                name: 'heading',
                label: 'Heading',
                component: 'text'
            },
            {
                name: 'subheading',
                label: 'Subheading',
                component: 'textarea'
            },
            {
                name: 'photo',
                label: 'Image',
                component: 'group',
                fields: [
                    {
                        name: 'src',
                        label: 'src',
                        component: 'text'
                    },
                    {
                        name: 'alt',
                        label: 'Alt Text',
                        component: 'text'
                    }
                ]
            },
            {
                name: 'button',
                label: 'Button',
                component: 'group',
                fields: [
                    {
                        name: 'link',
                        label: 'Link',
                        component: 'text'
                    },
                    {
                        name: 'text',
                        label: 'Text',
                        component: 'text'
                    }
                ]
            }
        ],
    },
}