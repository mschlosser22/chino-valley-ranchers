import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'


export function OurMission() {
    return (
        <div>
            <div className="relative bg-contain" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="lg:col-span-5 col-span-12">
                        <img src="/images/family-picture.jpg" className="mx-auto lg:w-full w-72" />
                    </div>
                    <div className="lg:col-span-7 col-span-12 lg:pb-20 pb-8">
                        <img src="/images/family-owned-sign.png" className="w-3/4 pb-4 mx-auto" />
                        <p className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8">For us, it starts with family. Since the beginning, we’ve worked together to focus solely on egg ranching. That’s how we maintain the highest quality possible. We bring the freshest produce to your table because to us, our chickens are family.</p>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wide pb-4 lg:mx-0 mx-8">California Organic:</h1>
                        <h3 className="font-ultra text-xl lg:text-3xl tracking-widest uppercase lg:mx-0 mx-8">The Natural Choice</h3>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <img src="/images/orangeSeperator-thick.png" className="lg:px-0 px-8" />
                        <p className="font-lato text-xl tracking-wide py-6 lg:mx-0 mx-14 lg:mx-0 mx-8"><span className="font-bold">For more than 30 years,</span> we’ve been a leading provider of honestly organic eggs dedicated to providing free range lifestyle for our chickens.</p>
                        <img src="/images/orangeSeperator-thick.png" className="lg:px-0 px-8" />
                    </div>
                </div>
                <div className="lg:pt-12 pt-8 lg:pb-24 pb-8">
                    <img src="/images/true-range-arrow.png" className="lg:pl-28 lg:w-96 w-56 lg:pb-4 lg:mx-0 mx-8" />
                    <img src="/images/aboutFeedVideo.jpg" />
                </div>
                <div className="max-w-3xl mx-auto">
                    <img src="/images/chickens82.jpg" />
                </div>
                <div className="z-50 lg:pb-20 pb-12 pt-4 max-w-6xl mx-auto px-8 lg:px-0 text-center">
                    <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wider">More than 
                        <span className="bg-chinodarkorange px-2 leading-snug mx-2">82% of U.S. households</span>
                        buy organic foods on a regular basis.
                    </h1>
                    <img src="/images/redSeperator.png" className="pt-6 pb-6 mx-auto lg:w-3/5 w-full" />
                    <p className="text-sm font-lato text-center">Source: Study: 82% of U.S Households Buy Organic Food Regularly, 
                    <br />
                    Organic Trade Association, 2017.</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export const ourMissionBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <OurMission {...data} />
      </BlocksControls>
    )}