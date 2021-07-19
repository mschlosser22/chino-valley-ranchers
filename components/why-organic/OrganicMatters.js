import { propTypes } from 'react-markdown'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'


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
                    <div className="grid grid-cols-12 gap-6">
                        {props.list.map((item, index) =>
                            <div key={index}>
                                <div className="lg:col-span-4 col-span-12">
                                    <h4 className="text-2xl uppercase black font-ultra lg:mx-0 mx-8">
                                        <InlineTextarea name="title" />
                                    </h4>
                                </div>
                                <div className="lg:col-span-8 col-span-12">
                                    <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 lg:pr-16 pr-0">
                                        <InlineTextarea name="description" />
                                    </p>
                                </div>
                                <hr className="solid border-chinodarkgray col-span-12"></hr>
                            </div>
                        )}
                        <div className="lg:col-span-4 col-span-12">
                            <h4 className="text-2xl uppercase black font-ultra lg:mx-0 mx-8">Preservative<br className="lg:block hidden" /> Free</h4>
                        </div>
                        <div className="lg:col-span-8 col-span-12">
                            <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 lg:pr-16 pr-0">Organic food doesn’t contain preservatives to make it last longer on the shelves. These foods are often produced on small, family-run farms, like ours, and delivered locally for fresh results.</p>
                        </div>
                        <hr className="solid border-chinodarkgray col-span-12"></hr>
                        <div className="lg:col-span-4 col-span-12">
                            <h4 className="text-2xl uppercase black font-ultra lg:mx-0 mx-8">Environmental<br className="lg:block hidden" /> Friendly</h4>
                        </div>
                        <div className="lg:col-span-8 col-span-12">
                            <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 lg:pr-16 pr-0">Organic farming helps reduce pollution, conserve water, reduce soil erosion, and uses less energy. Farming with less pesticides is also better for those that live around the community.</p>
                        </div>
                        <hr className="solid border-chinodarkgray col-span-12"></hr>
                        <div className="lg:col-span-4 col-span-12">
                            <h4 className="text-2xl uppercase black font-ultra lg:mx-0 mx-8">Antibiotic<br className="lg:block hidden" /> Free</h4>
                        </div>
                        <div className="lg:col-span-8 col-span-12">
                            <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 lg:pr-16 pr-0">We don’t give our chickens antibiotics, so that means no antibiotic-resistant strains of bacteria in your body. They also don’t receive growth hormones or animal byproducts.</p>
                        </div>
                        <hr className="solid border-chinodarkgray col-span-12"></hr>
                        <div className="lg:col-span-4 col-span-12">
                            <h4 className="text-2xl uppercase black font-ultra lg:mx-0 mx-8">GMO-free<br className="lg:block hidden" />diet</h4>
                        </div>
                        <div className="lg:col-span-8 col-span-12 pb-36">
                            <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 lg:pr-16 pr-0">Genetically Modified Organisms (GMOs) foods have been altered to be resistant to pesticides. We feed our chickens all organic feed, so your eggs don’t contain any chemicals.</p>
                        </div>
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
            }
        ],
    }}