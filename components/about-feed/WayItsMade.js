import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'

export function WayItsMade() {
    return (
    <div>
        <div className="relative pt-8 -mt-24 pb-32 z-40 bg-no-repeat" style={{ backgroundImage: `url('/images/bg-paper-white3.png')` }}>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-12 lg:gap-8 pt-24 md:mx-auto px-8 ">
                    <div className="md:col-span-5 col-span-12">
                        <h1 className="text-2xl lg:text-5xl text-chinoblue lg:leading-tight font-ultra uppercase tracking-wide mb-6">Eggs made the way you want</h1>
                    </div>
                    <div className="md:col-span-7 col-span-12">
                        <p className=" text-black lg:leading-normal lg:text-2xl font-lato font-medium text-xl">What we put into our feed changes the composition of our eggs. Chickens that eat a soy-free diet can produce soy-free eggs. We can also produce higher omega-3 fatty acids in our produce by changing up the custom feed. The possibilities are virtually limitless!</p>
                    </div>
                    <div className="md:col-span-5 col-span-12 lg:-mt-6 my-4 lg:my-0 mx-auto">
                        <img src="/images/bowl-of-eggs.png" className=""></img>
                    </div>
                    <div className="md:col-span-7 col-span-12">
                        <p className="text-black lg:leading-normal lg:text-2xl font-lato font-medium text-xl">We have an Avian Nutritionist on staff to formulate grain combinations into the most nutritious diet for our chickens, and to optimize precision and quality for the variety of specialty eggs we produce. This important process is based on years of company research evaluating how different feed formulations affect the nutritional properties of eggs.</p>
                    </div>
                    <div className="col-span-12 lg:py-4 py-12">
                        <h3 className="text-black font-ultra text-xl lg:text-3xl text-center lg:text-left">Our specialty eggs include varieties such as:</h3>
                    </div>
                    <div className="lg:col-span-5 col-span-12 lg:mx-auto">
                        <h1 className="text-2xl md:text-4xl text-chinored uppercase font-ultra tracking-wide">Organic<br />Omega-3:</h1>
                    </div>
                    <div className="lg:col-span-7 col-span-12 lg:my-0 my-6">
                        <p className="text-black lg:text-2xl font-lato font-medium text-xl">Each egg contains 225 mg of Omega-3, also known as alpha-linoleic acid (ALA), which has a positive effect on cardiovascular health.</p> 
                    </div>
                    <hr className="solid col-span-12 border-chinodarkgray" />

                    <div className="lg:col-span-5 col-span-12 lg:mx-auto lg:pt-0 pt-4">
                        <h1 className="text-2xl md:text-4xl text-chinored uppercase font-ultra tracking-wide">Omega-3 <br />Soy-Free:</h1>
                    </div>
                    <div className="lg:col-span-7 col-span-12 lg:my-0 my-6">
                        <p className="text-black lg:text-2xl font-lato font-medium text-xl">Our Organic Omega-3 eggs come from hens raised in free roaming environments and fed a special soy-free diet that contains flax seeds.</p> 
                    </div>

                    <hr className="solid border-chinodarkgray col-span-12" />

                    <div className="lg:col-span-5 col-span-12 lg:mx-auto lg:pt-0 pt-4">
                        <h1 className="text-2xl md:text-4xl text-chinored uppercase font-ultra tracking-wide">Veg-a-Fed:</h1>
                    </div>
                    <div className="lg:col-span-7 col-span-12 lg:my-0 my-6">
                        <p className="text-black lg:text-2xl font-lato font-medium text-xl">Our Veg-A-Fed eggs come from hens raised in free roaming environments and fed a pure vegetarian diet consisting of premium grains, seeds, and meal.</p> 
                    </div>
                </div>
                <div className="text-center pt-16">
                    <a className="bg-chinored rounded-md font-din tracking-wider cursor-pointer mx-auto lg:text-2xl text-xl uppercase text-white px-6 py-2">View our products</a>
                </div>
            </div>
        </div>
    </div>  
    )
}

export const wayItsMadeBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <WayItsMade {...data} />
      </BlocksControls>
    )}