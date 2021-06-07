import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'


export function EggTermDef(props) {
   

    return(
     <div>
        <div className="relative pt-16 lg:-mt-12 pb-20 -mt-32 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/bg-blueEgg.jpg')` }}>
         
            <div className="max-w-6xl mx-auto">
                {/* Page Heading */}
                <div className="text-center pt-16  max-w-5xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-6xl text-chinodarkorange font-ultra uppercase lg:mb-12 mb-6">Egg Terms & Definitions</h1>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal font-lato text-white max-w-3xl mx-auto font-bold"> Here are common terms & definitions per the American Egg Board and their Egg Nutrition Center – click on the words below to see more information:</p>
                </div>
                <div className="text-center pt-12 lg:pt-16 pb-6 max-w-3xl mx-auto px-8 lg:px-0">
                    <h3 className="font-ultra text-white text-2xl pb-6 uppercase tracking-wider">Cage-Free Eggs</h3>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal text-white font-bold">Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches.</p>
                </div>
                <div className="max-w-5xl mx-auto text-center">
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                    <h3 className="font-ultra text-white text-2xl py-6 uppercase tracking-wider">Fertile Eggs</h3>
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                    
                    <h3 className="font-ultra text-white text-2xl py-6 uppercase tracking-wider">Free Range Eggs</h3>
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                    
                    <h3 className="font-ultra text-white text-2xl py-6 uppercase tracking-wider">Omega-3 Eggs</h3>
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                    
                    <h3 className="font-ultra text-white text-2xl py-6 uppercase tracking-wider">Organic Eggs</h3>
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                   
                    <h3 className="font-ultra text-white text-2xl py-6 uppercase tracking-wider">Pastured Eggs</h3>
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                    
                    <h3 className="font-ultra text-white text-2xl py-6 uppercase tracking-wider">Vegetarian Eggs</h3>
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                    
                    <h3 className="font-ultra text-white text-2xl py-6 uppercase tracking-wider">Grade AA Eggs</h3>
                    <img src="/images/orangeSeperator1.jpg" className=""></img>
                </div>
            </div>
        </div>
    </div>
    
    )

}

export const eggTermDefBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <EggTermDef {...data} />
      </BlocksControls>
    )}