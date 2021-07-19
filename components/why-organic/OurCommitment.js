import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'


export function OurCommitment(props) {
    return (
        <div>
            <div className="relative -mt-12 lg:pt-36 pt-20 pb-32 bg-cover" style={{ backgroundImage: `url('/images/bg-blue-talons.jpg')` }}>
                <div className="max-w-5xl mx-auto">
                   <h1 className="font-ultra lg:text-6xl text-3xl lg:mx-0 mx-8 text-white uppercase tracking-normal pb-8">
                       <InlineTextarea name="heading" />
                   </h1>
                    <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 text-white lg:pb-8 pb-6">As a CCOF (California Certified Organic Farmers) certified organic provider, we strive to go beyond standard to ensure that you enjoy the tastiest organic eggs possible.</p>
                    <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 text-white">All of our hens are fed the finest organic, non-GMO grains and seeds from certified pesticide-free fields. We also own and operate Southern California’s only certified organic feed mill for poultry for complete quality control.</p>
                    <h3 className="font-ultra lg:text-3xl text-2xl lg:mx-0 mx-8 text-white uppercase tracking-wider lg:pt-12 pt-8 pb-8">Cage Free Means Happier Chickens</h3>
                    <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 text-white lg:pb-8 pb-6">We know the impact an environment has on a chicken’s life and believe that happy hens are productive hens. Given the pleasant weather conditions in California, our chickens have the opportunity to live active lives thanks to plenty of time outdoors with fresh air and sunlight. All of our birds have access to soil and vegetation where they can dust bathe, scratch, and dig for insects.</p>
                    <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 text-white lg:pb-8 pb-6">Our chickens lay their eggs inside within the floor operations where they can roam around the building, room and, open area, usually inside a barn or poultry house. They always have unlimited access to fresh food and water. Sometimes, they choose to forage for food outdoors.</p>
                    <h3 className="font-ultra lg:text-4xl text-2xl lg:mx-0 mx-8 text-white uppercase tracking-wide pb-12">It’s simple. They get to do what <br className="lg:block hidden" />chickens are supposed to do.</h3>
                    <div className="flex justify-center">
                        <a href="/products/organic" className="bg-chinored rounded-md font-din tracking-wider text-center cursor-pointer mx-auto lg:text-2xl text-xl uppercase text-white px-6 py-2 mb-12 lg:mx-0 mx-8">Eat Organic Eggs</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ourCommitmentBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OurCommitment {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Our Commitment Component',
        defaultItem: [

        ],
        fields: [
            {
                name: 'heading',
                label: 'Heading',
                component: 'text'
            }
        ]
    }
}