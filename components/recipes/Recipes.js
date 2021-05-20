import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { PastureEggsFooter } from '../about-pasture-raised/PastureEggsFooter'

const recipes = [
    {
        title: "The Morning Wrap",
        video: {
            src: "/images/recipeVideo0.jpg",
            alt: "Recipe Video"
        },
        button: {
            text: "Download Recipe Card",
            src: "#"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl quam, nec convallis libero fringilla vitae. Sed tincidunt a lorem ac faucibus. Integer efficitur est a risus."
    },
    {
        title: "Asparagus and Mushroom Frittata",
        video: {
            src: "/images/recipeVideo1.jpg",
            alt: "Carton of Eggs"
        },
        button: {
            text: "Download Recipe Card",
            src: "#"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl quam, nec convallis libero fringilla vitae. Sed tincidunt a lorem ac faucibus. Integer efficitur est a risus consectetur elementum."
    },
    {
        title: "Baked Eggs",
        video: {
            src: "/images/recipeVideo2.jpg",
            alt: "Recipe Video"
        },
        button: {
            text: "Download Recipe Card",
            src: "#"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl quam, nec convallis libero fringilla vitae. Sed tincidunt a lorem ac faucibus. Integer efficitur est a risus consectetur elementum."
    },
    {
        title: "Heavenly Crepes",
        video: {
            src: "/images/recipeVideo3.jpg",
            alt: "Recipe Video"
        },
        button: {
            text: "Download Recipe Card",
            src: "#"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl quam, nec convallis libero fringilla vitae. Sed tincidunt a lorem ac faucibus. Integer efficitur est a risus consectetur elementum."
    },
    {
        title: "Garden Fresh Omelette",
        video: {
            src: "/images/recipeVideo4.jpg",
            alt: "Recipe Video"
        },
        button: {
            text: "Download Recipe Card",
            src: "#"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl quam, nec convallis libero fringilla vitae. Sed tincidunt a lorem ac faucibus. Integer efficitur est a risus consectetur elementum."
    },
    {
        title: "Easy Potato Skillet",
        video: {
            src: "/images/recipeVideo5.jpg",
            alt: "Recipe Video"
        },
        button: {
            text: "Download Recipe Card",
            src: "#"
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl quam, nec convallis libero fringilla vitae. Sed tincidunt a lorem ac faucibus. Integer efficitur est a risus consectetur elementum."
    }
]

export function Recipes(props) {

    //const {content} = props
   

    return(
        <div>
        <div className="relative lg:pt-8 pt-12 lg:-mt-12 -mt-36 bg-no-repeat" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
          <div className="relative bg-repeat-y mt-4 pb-64" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
            <div className="max-w-6xl mx-auto">
                
                {/* Page Heading */}
                <div className="text-center z-50 pt-20 pb-8 lg:py-24 max-w-5xl mx-auto px-8 lg:px-0">
                    <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-4"><InlineTextarea name="heading" /></h1>
                    <p className="font-lato lg:text-3xl tracking-wide"><InlineTextarea name="subheading" /></p>
                </div>
                {/* Video recipes / Recipe Articles */}
                <div className="flex max-w-6xl mx-auto mb-8">
                    <button className="bg-chinoblue w-full py-2">
                        <a>
                        <span className="text-white sm:text-lg text-md tracking-wider uppercase font-ultra">Video Recipes</span>
                        </a>
                    </button>
                    <button className="border-b-2 border-chinoblue w-full py-2">
                        <a>
                            <span className="text-chinoblue font-ultra uppercase tracking-wider sm:text-lg text-md">Recipe Articles</span>
                        </a>
                    </button>
                </div>

                {/* Breakfast Lunch Dinner */} 
                <div className="flex justify-center max-w-6xl mx-auto mb-12">
                    <div>
                        <a src="#" className="text-chinoblue font-ultra cursor-pointer uppercase border-b-2 border-chinoblue tracking-wider sm:text-lg text-md pb-2">Breakfast</a>
                    </div>
                    <div className="px-14">
                        <a src="#" className="text-chinoblue font-ultra cursor-pointer uppercase border-b-2 border-chinoblue tracking-wider sm:text-lg text-md pb-2">Lunch</a>
                    </div>
                    <div>
                        <a src="#" className="text-chinoblue font-ultra cursor-pointer uppercase border-b-2 border-chinoblue tracking-wider sm:text-lg text-md pb-2">Dinner</a>
                    </div>
                </div>
                

                {/* Recipe 0 */}
                <div className="max-w-7xl mx-auto">
                    {recipes.map( (recipe, index) => {
                        if(index == 0) {
                            return (
                           <div className="max-w-6xl mx-auto">
                               <div className="grid grid-cols-12">
                                   <div className="col-span-12 relative">
                                        <img src={recipe.video.src} alt={recipe.video.alt} className="mb-12"></img>
                                        <div className="col-span-12 flex justify-between lg:px-0 px-3">
                                            <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                                {recipe.title}
                                            </h1>
                                            <button class="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-md uppercase text-white px-6">{recipe.button.text}</button>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full">{recipe.content}</p>
                                    </div>
                                    <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                                </div>
                            </div>
                            )
                        }
                    })}
                </div>

                {/* Recipe 1 */}
                <div className="max-w-7xl mx-auto">
                    {recipes.map( (recipe, index) => {
                        if(index == 1) {
                            return (
                           <div className="max-w-6xl mx-auto">
                               <div className="grid grid-cols-12">
                                   <div className="col-span-12 relative">
                                        <img src={recipe.video.src} alt={recipe.video.alt} className="mb-12"></img>
                                        <div className="col-span-12 flex justify-between lg:px-0 px-3">
                                            <h1 className="text-2xl lg:text-3xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                                {recipe.title}
                                            </h1>
                                            <button class="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-md uppercase text-white px-6">{recipe.button.text}</button>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full">{recipe.content}</p>
                                    </div>
                                    <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                                </div>
                            </div>
                            )
                        }
                    })}
                </div>

                {/* Recipe 2 */}
                <div className="max-w-7xl mx-auto">
                    {recipes.map( (recipe, index) => {
                        if(index == 2) {
                            return (
                           <div className="max-w-6xl mx-auto">
                               <div className="grid grid-cols-12">
                                   <div className="col-span-12 relative">
                                        <img src={recipe.video.src} alt={recipe.video.alt} className="mb-12"></img>
                                        <div className="col-span-12 flex justify-between lg:px-0 px-3">
                                            <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                                {recipe.title}
                                            </h1>
                                            <button class="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-md uppercase text-white px-6">{recipe.button.text}</button>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full">{recipe.content}</p>
                                    </div>
                                    <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                                </div>
                            </div>
                            )
                        }
                    })}
                </div>

                {/* Recipe 3 */}
                <div className="max-w-7xl mx-auto">
                    {recipes.map( (recipe, index) => {
                        if(index == 3) {
                            return (
                           <div className="max-w-6xl mx-auto">
                               <div className="grid grid-cols-12">
                                   <div className="col-span-12 relative">
                                        <img src={recipe.video.src} alt={recipe.video.alt} className="mb-12"></img>
                                        <div className="col-span-12 flex justify-between lg:px-0 px-3">
                                            <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                                {recipe.title}
                                            </h1>
                                            <button class="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-md uppercase text-white px-6">{recipe.button.text}</button>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full">{recipe.content}</p>
                                    </div>
                                    <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                                </div>
                            </div>
                            )
                        }
                    })}
                </div>

                {/* Recipe 4 */}
                <div className="max-w-7xl mx-auto">
                    {recipes.map( (recipe, index) => {
                        if(index == 4) {
                            return (
                           <div className="max-w-6xl mx-auto">
                               <div className="grid grid-cols-12">
                                   <div className="col-span-12 relative">
                                        <img src={recipe.video.src} alt={recipe.video.alt} className="mb-12"></img>
                                        <div className="col-span-12 flex justify-between lg:px-0 px-3">
                                            <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                                {recipe.title}
                                            </h1>
                                            <button class="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-md uppercase text-white px-6">{recipe.button.text}</button>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full">{recipe.content}</p>
                                    </div>
                                    <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                                </div>
                            </div>
                            )
                        }
                    })}
                </div>

                {/* Recipe 5 */}
                <div className="max-w-7xl mx-auto">
                    {recipes.map( (recipe, index) => {
                        if(index == 5) {
                            return (
                           <div className="max-w-6xl mx-auto">
                               <div className="grid grid-cols-12">
                                   <div className="col-span-12 relative">
                                        <img src={recipe.video.src} alt={recipe.video.alt} className="mb-12"></img>
                                        <div className="col-span-12 flex justify-between lg:px-0 px-3">
                                            <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                                {recipe.title}
                                            </h1>
                                            <button class="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-md uppercase text-white px-6">{recipe.button.text}</button>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full">{recipe.content}</p>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                    })}
                </div>
            </div>
            </div>
            </div>
            <PastureEggsFooter />       
        </div>
           
    )

}

export const recipesBlock = {
    Component: ({ index, data }) => (
      <BlocksControls index={index}>
        <Recipes {...data} />
      </BlocksControls>
    ),
    template: {
        label: 'Recipes Component',
        defaultItem: {
            heading: 'Some Headline Here',
            subheading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            image: '/images/bg-paper-edge.png'
        },
        fields: [

        ],
    },
}