
export function WhatItTakes(props) {

    return (
        <div>
            <div className="relative lg:pt-40 lg:-mt-48 -mt-64 pt-56 bg-repeat-x bg-cover" style={{ backgroundImage: `url('/images/bg-talons.png')` }}>
            <div className="z-50 pt-20 pb-8 lg:py-24 max-w-4xl mx-auto px-8 lg:px-0">
                <h1 className="text-2xl lg:text-5xl text-chinoblue font-ultra uppercase tracking-wide lg:mb-12 mb-6 text-center md:text-left">What it Takes to Produce Pasture Raised Eggs</h1>
                <p className="font-lato text-black lg:2xl mx-auto w-5/6 font-medium text-xl text-center tracking-wide">Producing pasture raised eggs requires special care and attention. Chino Valley Ranchers personnel are trained in looking after these wildly happy hens to ensure their safety, satisfaction and welfare."</p>
            </div>
            <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-12 gap-8">

                <div className="lg:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                    <h1 className="text-lg md:text-3xl text-chinored uppercase font-ultra text-center md:text-left tracking-wide">Plenty of Room to Roam</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl mx-4 font-lato font-medium text-xl mx-8 md:mx-0 text-center md:text-left">Chino Valley Ranchers pasture raised farms provide 108 square feet of land per hen. That equates to one full acre for every 400 hens. They have plenty of room to roam around, stretch their legs, forage naturally, bath in the dust, bask in the sunshine and relax in the shade before coming back to a warm and comfortable barn to roost at night. They live a life that keeps them happy and healthy. These truly are birds of paradise!</p> 
                </div>

                <hr className="solid col-span-12 border-chinodarkgray my-10" />

                <div className="lg:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                    <h1 className="text-lg md:text-3xl text-chinored uppercase font-ultra text-center md:text-left mx-8 md:mx-0 tracking-wide">Better for the Hens, Better for You</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl mx-4 font-lato font-medium text-xl text-center md:text-left mx-8 md:mx-0">What’s good for the hens is good for the eggs that these lovely ladies lay. Our ranchers package up the eggs and sends them directly to stores and customers. When you buy Chino Valley Ranchers pasture raised eggs, you know you are getting nothing but the best organic quality, nutrition and flavor.</p> 
                </div>

                <hr className="solid border-chinodarkgray col-span-12 my-10" />

                <div className="lg:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                    <h1 className="text-lg md:text-3xl text-chinored uppercase font-ultra text-center md:text-left tracking-wide mx-8 md:mx-0">American Humane Certified</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl mx-4 font-lato font-medium text-xl text-center md:text-left mx-8 md:mx-0">If you are buying pasture raised eggs, make sure you see the American Humane Certified seal of approval. This means they are certified by American Humane and the hens are being treated properly. At Chino Valley Ranchers, we have been using humane egg production practices since our early days in business. American Humane sets strict requirements for all aspects of hen raising and egg production. We follow these regulations and more to ensure the most caring treatment of our hens.</p> 
                </div>
            </div>
        </div>
        
        <div className="z-50 pt-20 pb-8 lg:py-24 max-w-6xl mx-auto px-8 lg:px-0 text-center">
            <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wide lg:mb-12 mb-6">
                From our family to yours, Chino Valley Ranchers pasture raised eggs represent 
                <br />
                <span className="bg-chinodarkorange px-2">quality you can count on.</span>
                </h1>
            <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wide lg:mb-12 mb-6">Just ask the happy ladies out roaming in our wide open pastures!</h1>
            <img src="/images/redSeperator.png" className="my-20 mx-auto w-1/2"></img>
            <button class="bg-chinored rounded-md font-din tracking-wider mx-auto lg:text-xl text-md uppercase text-white px-6 py-2 mb-12">Learn More</button>
        </div>
        </div>

        </div>
    )
}