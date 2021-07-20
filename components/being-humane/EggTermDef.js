import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { Disclosure } from '@headlessui/react'

const terms = [
    {
        title: "Cage-Free Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    },
    {
        title: "Fertile Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    },
    {
        title: "Free Range Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    },
    {
        title: "Omega-3 Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    },
    {
        title: "Organic Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    },
    {
        title: "Pastured Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    },
    {
        title: "Vegetarian Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    },
    {
        title: "Grade AA Eggs",
        description: "Eggs laid by hens at indoor floor operations, sometimes called free roaming. The hens may roam in a building, room or open area, usually in a barn or poultry house, and have unlimited access to fresh food and water, while some may also forage for food if they are allowed outdoors. Cage- free systems vary and include barn-raised and free-range hens, both of which have shelter that helps protect against predators. Both types are produced under common handling and care practices, which provide floor space, nest space and perches."
    }
]


export function EggTermDef(props) {

    const {terms} = props

    return(
     <div>
        <div className="relative pt-16 z-40 lg:-mt-12 pb-20 -mt-32 md:bg-no-repeat md:bg-cover" style={{ backgroundImage: `url('/images/bg-blueEgg.jpg')` }}>

            <div className="max-w-6xl mx-auto">
                {/* Page Heading */}
                <div className="lg:text-center pt-16  max-w-5xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-6xl text-chinodarkorange font-ultra uppercase lg:mb-12 mb-6">Egg Terms & Definitions</h1>
                    <p className="font-lato lg:text-xl tracking-wide leading-normal font-lato text-white max-w-3xl mx-auto font-bold"> Here are common terms & definitions per the American Egg Board and their Egg Nutrition Center – click on the words below to see more information:</p>
                </div>

                <div className="max-w-5xl mx-auto text-center pt-10">
                    {terms.map((term) => (
                        <Disclosure as="div" key={term.title} className="pt-6">
                            {({ open }) => (
                            <>
                                <dt className="max-w-3xl mx-auto px-8 lg:px-0">
                                    <Disclosure.Button>
                                        <h3 className="font-ultra text-white text-2xl pb-6 uppercase tracking-wider lg:text-left">{term.title}</h3>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd">
                                    <p className="font-lato lg:text-xl tracking-wide leading-normal text-white font-bold pb-10 px-8 lg:px-16 lg:text-left">{term.description}</p>
                                </Disclosure.Panel>
                                <img src="/images/orangeSeperator1.jpg" className=""></img>
                            </>
                            )}
                        </Disclosure>
                    ))}

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
    ),
    template: {
        label: 'Egg Term Component',
        defaultItems: [],
        fields: [
            {
                name: "heading",
                label: "Heading",
                component: "text"
            },
            {
                name: "subheading",
                label: "Sub Heading",
                component: "textarea"
            },
            {
                name: "terms",
                label: "Terms",
                component: "group-list",
                fields: [
                    {
                        name: "title",
                        label: "Title",
                        component: "text"
                    },
                    {
                        name: "description",
                        label: "Description",
                        component: "textarea"
                    }
                ]
            }
        ]
    }
}