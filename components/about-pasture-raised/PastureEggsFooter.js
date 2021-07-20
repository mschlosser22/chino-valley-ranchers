import { InlineText, InlineTextarea, InlineBlocks, InlineImage, BlocksControls, InlineGroup } from 'react-tinacms-inline'


export function PastureEggsFooter(props) {

    console.log(props)
    return (
        <div className="relative lg:pt-56 pt-36 -mt-48 pb-28 z-40" style={{ backgroundImage: `url('/images/bg-paper-white2.png')` }}>
                    <div className="grid grid-cols-12 max-w-5xl mx-auto pt-24 gap-8">
                        <div className="lg:col-span-6 col-span-12">
                            <h1 className="text-4xl lg:text-6xl text-chinoblue font-ultra uppercase tracking-wide lg:pb-24 pb-8 px-8 lg:px-0">
                                {props.heading}
                            </h1>
                            <div className="flex lg:my-0 lg:ml-16 lg:pt-7">
                                <p className="text-lg lg:text-3xl text-chinoblue font-ultra tracking-wide lg:block hidden">
                                    {props.textLeft}
                                </p>
                                <p className="text-black lg:2xl text-xl lg:pb-24 lg:w-10/12 font-lato lg:text-left px-8 lg:px-0 lg:hidden block">
                                    {props.description}
                                </p>
                                <img src={props.imageLeft.src} className="lg:block hidden mx-auto" alt={props.imageLeft.alt}></img>
                            </div>

                        </div>
                        <div className="lg:col-span-6 col-span-12">
                            <p className="text-black lg:2xl text-3xl lg:pb-24 lg:w-10/12 mx-12 lg:mx-0 font-lato lg:text-left text-center lg:block hidden">
                                {props.description}
                            </p>
                            <p className="text-xl lg:text-3xl text-chinoblue font-ultra tracking-wide px-8 lg:px-0 lg:hidden block pb-6">
                                {props.textLeft}
                            </p>
                            <a href="/products/pasture-raised">
                                <img src={props.imageRight.src} className="px-8 lg:px-0" alt={props.imageRight.alt} />
                            </a>
                        </div>
                    </div>
            </div>
    )
}

export const pastureEggsFooterBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <PastureEggsFooter {...data} />
      </BlocksControls>
    ),
    template: {
        label: "Pasture Eggs Component",
        defaultItems: [],
        fields: [
            {
                name: "heading",
                label: "Heading",
                component: "text"
            },
            {
                name: "description",
                label: "Description",
                component: "textarea"
            },
            {
                name: "textLeft",
                label: "Text Left",
                component: "text"
            },
            {
                name: "imageLeft",
                label: 'Image Left',
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
        ]
    }
}