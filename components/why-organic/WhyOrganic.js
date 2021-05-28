import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { OurMission } from './OurMission'
import { OrganicMatters } from './OrganicMatters'
import { OurCommitment } from './OurCommitment'
import { Studies } from './Studies'

export function WhyOrganic(props) {
    return (
    <div>
        <div className="relative z-30 pt-8 lg:-mt-12 -mt-24 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
                <div className="max-w-7xl mx-auto">
                    {/* Page Heading */}
                    <div className="text-center z-50 pt-20 pb-8 lg:py-24 max-w-5xl mx-auto px-8 lg:px-0">
                        <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6"><InlineTextarea name="heading" /></h1>
                        <p className="font-lato lg:text-2xl tracking-wide lg:mx-52 mx-14"><InlineTextarea name="subheading" /></p>
                    </div>
                </div>             
        </div>
        <OurMission />
        <OrganicMatters />
        <OurCommitment />
        <Studies />
    </div>
    )
}

export const whyOrganicBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <WhyOrganic {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Why Organic Component',
        defaultItem: {
            heading: 'Some Headline Here',
            subheading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            image: '/images/bg-paper-edge.png'
        },
        fields: [

        ],
    },
}