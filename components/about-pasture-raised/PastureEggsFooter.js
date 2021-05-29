export function PastureEggsFooter() {
    return (
        <div className="relative lg:pt-56 pt-36 -mt-32 z-50 pb-28 bg-cover bg-no-repeat" style={{ backgroundImage: `url('/images/bg-paper-white2.png')` }}>
                    <div className="grid grid-cols-12 max-w-5xl mx-auto pt-24 gap-8">
                        <div className="lg:col-span-5 col-span-12">
                            <h1 className="text-4xl lg:text-6xl text-chinoblue font-ultra uppercase tracking-wide lg:pb-24 pb-6 text-center lg:text-left">Pasture Raised Products</h1>
                            <img src="/images/gonna-love-these-eggsArrow.png" className="lg:pt-12 lg:pl-6 lg:block hidden"></img>
                            
                        </div>
                        <div className="lg:col-span-7 col-span-12">
                            <p className="text-black lg:text-2xl text-xl lg:pb-24 pb-6 lg:w-10/12 w-full mx-12 lg:mx-0 lg:ml-12 ml-0 font-lato lg:text-left text-center">Explore our entire family of egg products, all of which are produced by healthy and happy, free range hens.</p>
                            <p className="text-xl lg:text-3xl text-chinoblue font-ultra tracking-wide text-center lg:hidden block pb-6">you're gonna love these eggs!</p>
                            <img src="/images/pastureEggCarton.png" className="lg:mx-0 mx-auto lg:-mt-24"></img>
                        </div>
                        <div className="col-span-12 mx-auto mt-12">
                            <a className="bg-chinored rounded-md font-din tracking-wider text-center cursor-pointer mx-auto lg:mx-0 lg:text-2xl text-md uppercase text-white px-6 py-2 mb-12">View All Products</a>
                        </div>
                    </div>
            </div>
    )
}