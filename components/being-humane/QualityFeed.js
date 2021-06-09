import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'


export function QualityFeed(props) {
   

    return(
     <div>
        <div className="relative pt-8 z-40 lg:-mt-12 -mt-16" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
         <div className="relative pb-44 mt-4" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
            <div className="max-w-5xl mx-auto">
                {/* Page Heading */}
                <div className="lg:text-center pt-12 lg:py-16 max-w-4xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase lg:mb-12 mb-6">Quality feed</h1>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-bold">As egg ranchers for more than six decades, we are committed to using nutritious top quality feed for several important reasons. First, it helps keep our chickens healthy, active and content. Equally important, it has a direct effect on the quality and nutritional value of Chino Valley Ranchers eggs.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-bold">As a leader in the specialty egg industry, we take great pride in producing egg varieties—organic, omega-3, vegetarian, soy free and more—with the highest nutritional values and the best taste. Precision feed formulation plays a major role in this.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal font-bold pb-12 lg:pb-0">It all starts with the finest grains. Chino Valley Ranchers uses only top grade corn, soybean (except for our Organic Soy Free), alfalfa, flax seed and other select seeds, plus limestone meal for essential minerals. All of our organic grains come from non-genetically-modified seeds and are grown in certified organic fields that are free of pesticide.</p>
                </div>
                <div>
                    <img src="/images/orangeSeperator.jpg"></img>
                    <p className="lg:text-3xl text-xl font-ultra text-center max-w-4xl py-9 mx-auto px-8 lg:px-0 tracking-wide">As you would expect, <br /> our natural feed formulations <br />
                    <span className="text-chinored font-ultra border-b-2 border-chinored">NEVER</span> contain hormones, animal proteins, steroids, or antibiotics.</p>
                    <img src="/images/orangeSeperator.jpg"></img>
                </div>
                <div className="lg:text-center pt-12 lg:py-16  max-w-4xl mx-auto px-8 lg:px-0">
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-bold">We have an Avian Nutritionist on staff to formulate grain combinations into the most nutritious diet for our chickens, and to optimize precision and quality for the variety of specialty eggs we produce. This important process is based on years of company research evaluating how different feed formulations affect the nutritional properties of eggs.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-bold">Notably, Chino Valley Ranchers is proud to have Southern California’s only dedicated organic poultry feed mill. We have found that the best way to maintain precise and proprietary dietary formulations is to mill our own feed onsite. Our extensive mill and silo system allows us to continuously monitor and control diets for our birds.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal font-bold">These many steps & protocols—nutrition research, top grade grains, precision feed formulation, staff nutritionist, our organic feed mill—all make a difference. The result is healthy chickens producing eggs that are of the highest quality and nutritional value for our customers.</p>
                </div>
            </div>
        </div>
     </div>
    </div>
    
    )

}

export const qualityFeedBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <QualityFeed {...data} />
      </BlocksControls>
    )}