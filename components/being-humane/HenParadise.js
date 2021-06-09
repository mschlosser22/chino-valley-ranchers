import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'


export function HenParadise(props) {

    return(
     <div>
        <div className="relative lg:pt-16 pt-6 z-40 lg:-mt-12 -mt-32 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/dirt-background.png')` }}>
            <div className="max-w-5xl mx-auto">
                
                {/* Page Heading */}
                <div className="lg:text-center z-50 pt-12 lg:py-16 max-w-4xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase lg:mb-12 mb-6">Hello Hen Paradise!</h1>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold">At Chino Valley Ranchers we strive to provide an environment that allows our chickens to live and act in their natural ways. They have unlimited access to sunlight, premium grain feed, and plenty of fresh air and water. In fact, their fresh water is drawn from our own wells.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold">Our cage free hen houses are specially built to give the birds freedom to roam the floor, and also are equipped with special roosting and nesting areas. All of our hen houses are environmentally controlled to maintain comfortable temperatures.</p>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal font-bold">Besides enjoying the interior amenities of the cage free houses, our free range and organic chickens are free to go outside—for sunning, socializing or dust bathing—anytime they want.</p>
                </div>
                <img src="/images/threeChickens.png" className="md:pt-0 pt-8" />
                </div>
            </div>
           
        </div>
    
    )

}

export const henParadiseBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <HenParadise {...data} />
      </BlocksControls>
    )}