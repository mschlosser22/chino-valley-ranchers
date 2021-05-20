export function NutritiousFeed() {
    return (
        <div>
            <div className="relative lg:pt-40 lg:-mt-48 -mt-64 pt-24 pb-32  bg-cover" style={{ backgroundImage: `url('/images/bg-talons.png')` }}>
            <div className="z-50 pt-20 lg:pt-24 lg:mb-28 max-w-5xl mx-auto px-8 lg:px-0 lg:flex block justify-between">
                <h1 className="text-2xl lg:text-5xl text-chinoblue font-ultra uppercase tracking-wider lg:leading-tight text-center lg:text-left">Using nutritious organic feed has many benefits, including</h1>
                <img src="/images/chicken.jpg" className="lg:-mt-40 lg:w-72 w-56 mx-auto"></img>
            </div>
            <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-8">

                <div className="lg:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                    <h1 className="text-lg md:text-3xl text-chinored uppercase font-ultra text-center md:text-left tracking-wide">Better For Our Chickens</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl mx-4 font-lato font-medium text-xl mx-8 md:mx-0 text-center md:text-left">We develop our feed specifically to help keep our chickens stay healthy, active and content.</p> 
                </div>

                <hr className="solid col-span-12 border-chinodarkgray" />

                <div className="lg:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                    <h1 className="text-lg md:text-3xl text-chinored uppercase font-ultra text-center md:text-left mx-8 md:mx-0 tracking-wide">Better For Our Eggs</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl mx-4 font-lato font-medium text-xl text-center md:text-left mx-8 md:mx-0">Organic feed has a positive impact on the quality and nutritional value of our eggs.</p> 
                </div>

                <hr className="solid border-chinodarkgray col-span-12" />

                <div className="lg:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                    <h1 className="text-lg md:text-3xl text-chinored uppercase font-ultra text-center md:text-left tracking-wide mx-8 md:mx-0">Better For <br className="lg:block hidden"/>You</h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl mx-4 font-lato font-medium text-xl text-center md:text-left mx-8 md:mx-0">Our chickens don’t consume hormones, antibiotics, or animal by-products, which means you don’t either!</p> 
                </div>
            </div>
            <img src="/images/yourFamilyArrow.png" className="w-36 ml-24 pt-2 lg:block hidden"></img>
        </div>
        </div>
        </div>
    )
} 