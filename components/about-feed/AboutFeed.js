import { DiffieHellman } from 'crypto'
import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { DifferenceFeed } from './DifferenceFeed'
import { NutritiousFeed } from './NutritiousFeed'
import { OrganiceFeed } from './OrganicFeed'
import { WayItsMade } from './WayItsMade'


export function AboutFeed(props) {

    //const {content} = props
   

    return(
     <div>
        <div className="relative pt-8 lg:-mt-12 -mt-32 bg-no-repeat bg-auto" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
          <div className="relative pb-44 mt-4" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
            <div className="max-w-6xl mx-auto">
                
                {/* Page Heading */}
                <div className="text-center z-50 pt-20 pb-8 lg:py-24 max-w-3xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6"><InlineTextarea name="heading" /></h1>
                    <p className="font-lato lg:text-2xl tracking-wide lg:mx-24 mx-14"><InlineTextarea name="subheading" /></p>
                </div>

                           <div className="max-w-5xl mx-auto">
                               <div className="grid grid-cols-12 gap-8 lg:ml-6 lg:-mb-16">
                                   <div className="md:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                                        <img src="/images/youarewhatyoueat.png" alt="" className="lg:pb-6 w-48 md:w-full"></img>
                                    </div>
                                    <div className="md:col-span-7 col-span-12">
                                        <img src="/images/orangeSeperator.jpg" className="mb-12 mt-4 col-span-12"></img>
                                        <p className="text-black lg:text-2xl lg:mx-4 mx-8 text-center md:text-left font-lato font-medium text-xl leading-relaxed">For more than six decades, we’ve been producing high quality eggs and that’s how we know that the difference is in the feed. As they say, “you are what you eat,” and the same rules apply to our chickens.</p> 
                                        <img src="/images/orangeSeperator.jpg" className="mt-12 col-span-12"></img>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <img src="/images/seeing-believingArrow.png" className="pb-4 pr-24 lg:w-1/3 w-3/5 mt-8 lg:mt-0"></img>
                                </div>
                                <img src="/images/aboutFeedVideo.jpg" alt="About Feed Video" className="md:mb-12 mb-8"></img>
                            </div>
                            <div className="z-50 pt-20 pb-8 lg:py-24 max-w-6xl mx-auto px-8 lg:px-0 text-center">
                                <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wide">
                                    Chino Valley Ranchers owns and operates 
                                    <br />
                                    <span className="bg-chinodarkorange px-2 leading-snug">Southern California’s only certified organic feed mill for poultry</span>
                                    <br />
                                    to ensure the highest quality and purity.
                                    </h1>
                                <img src="/images/redSeperator.png" className="mt-20 mx-auto lg:w-1/2 w-3/4"></img>
                            </div>
                </div>
            </div>
        </div>
        <NutritiousFeed />
        <DifferenceFeed />
        <OrganiceFeed />
        <WayItsMade />
     </div>
    
    )

}

export const aboutFeedBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <AboutFeed {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'About Feed Component',
        defaultItem: {
            heading: 'Some Headline Here',
            subheading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            image: '/images/bg-paper-edge.png'
        },
        fields: [

        ],
    },
}