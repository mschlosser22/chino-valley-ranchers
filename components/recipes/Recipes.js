import Image from 'next/image'
import { InlineTextarea, InlineImage, BlocksControls } from 'react-tinacms-inline'
import { PastureEggsFooter } from '../about-pasture-raised/PastureEggsFooter'

import RecipeVideos from '../../components/recipes/RecipeVideos'
import RecipeArticles from '../../components/recipes/RecipeArticles'

const recipesTemp = [
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

import { useState } from 'react'
import { useRecipesContext } from '../../context/recipes'
import { get } from 'http'

const getVideoRecipes = (recipes) => {
    const results = recipes.filter( recipe => recipe.category == 'recipe-video')
    return results
}

const getArticleRecipes = (recipes) => {
    const results = recipes.filter( recipe => recipe.category == 'recipe-article')
    return results
}

export function Recipes(props) {

    const recipesContext = useRecipesContext()
    const [recipes, setRecipes] = useState(recipesContext)
    const [recipeCategory, setRecipeCategory] = useState('recipe-videos')
    const [recipeTag, setRecipeTag] = useState('all')

    const setRecipeTagPre = (tag) => {
        if(tag == recipeTag) {
            setRecipeTag('all')
        } else {
            setRecipeTag(tag)
        }
    }

    if(recipes) {

        const parsedRecipes = recipes.map(recipe => JSON.parse(recipe.content))
        parsedRecipes.sort(function (a, b) {
            return a.order - b.order;
        });

        return(
            <div>
            <div className="relative lg:pt-8 pt-12 lg:-mt-12 -mt-36 bg-no-repeat bg-contain" style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}>
              <div className="relative bg-repeat-y mt-4 pb-64 bg-contain" style={{ backgroundImage: `url('/images/bg-paper.png')` }}>
                <div className="max-w-6xl mx-auto">

                    {/* Page Heading */}
                    <div className="text-center z-50 pt-20 pb-8 lg:py-24 max-w-5xl mx-auto px-8 lg:px-0">
                        <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-4"><InlineTextarea name="heading" /></h1>
                        <p className="font-lato lg:text-3xl tracking-wide"><InlineTextarea name="subheading" /></p>
                    </div>
                    {/* Video recipes / Recipe Articles */}
                    <div className="flex max-w-6xl mx-auto mb-8">
                        <button
                            className={`w-full py-2 cursor-pointer ${recipeCategory == 'recipe-videos' ? "bg-chinoblue text-white" : "border-b-2 border-chinoblue text-chinoblue" }`}
                            onClick={() => setRecipeCategory('recipe-videos')}
                        >
                            <span className="sm:text-lg text-md tracking-wider uppercase font-ultra">Video Recipes</span>
                        </button>
                        <button
                            className={`w-full py-2 cursor-pointer ${recipeCategory == 'recipe-articles' ? "bg-chinoblue text-white" : "border-b-2 border-chinoblue text-chinoblue"}`}
                            onClick={() => setRecipeCategory('recipe-articles')}
                        >
                            <span className="font-ultra uppercase tracking-wider sm:text-lg text-md">Recipe Articles</span>
                        </button>
                    </div>

                    {/* Breakfast Lunch Dinner */}
                    <div className="flex justify-center max-w-6xl mx-auto mb-12">
                        <div>
                            <a
                                onClick={() => setRecipeTagPre('breakfast')}
                                className="text-chinoblue font-ultra cursor-pointer uppercase border-b-2 border-chinoblue tracking-wider sm:text-lg text-md pb-2"
                            >Breakfast</a>
                        </div>
                        <div className="px-14">
                            <a
                                onClick={() => setRecipeTagPre('lunch')}
                                className="text-chinoblue font-ultra cursor-pointer uppercase border-b-2 border-chinoblue tracking-wider sm:text-lg text-md pb-2"
                            >Lunch</a>
                        </div>
                        <div>
                            <a
                            onClick={() => setRecipeTagPre('dinner')}
                            className="text-chinoblue font-ultra cursor-pointer uppercase border-b-2 border-chinoblue tracking-wider sm:text-lg text-md pb-2"
                        >Dinner</a>
                        </div>
                    </div>


                    {/* Video Recipes */}
                    {recipeCategory == 'recipe-videos' &&
                        <RecipeVideos recipes={getVideoRecipes(parsedRecipes)} recipeTag={recipeTag} />
                    }

                    {/* Article Recipes */}
                    {recipeCategory == 'recipe-articles' &&
                        <RecipeArticles recipes={getArticleRecipes(parsedRecipes)} recipeTag={recipeTag} />
                    }


                </div>
                </div>
                </div>
                <PastureEggsFooter />
            </div>

        )

    } else {

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
                            <a className="cursor-pointer" onClick={() => setRecipeCategory('recipe-videos')}>
                            <span className="text-white sm:text-lg text-md tracking-wider uppercase font-ultra">Video Recipes</span>
                            </a>
                        </button>
                        <button className="border-b-2 border-chinoblue w-full py-2">
                            <a className="cursor-pointer" onClick={() => setRecipeCategory('recipe-articles')}>
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


                    {/* Video Recipes */}
                    {recipeCategory == 'recipe-videos' &&
                        <RecipeVideos recipes={getVideoRecipes(recipesTemp)} />
                    }

                    {/* Article Recipes */}
                    {recipeCategory == 'recipe-articles' &&
                        <RecipeArticles recipes={getArticleRecipes(recipesTemp)} />
                    }

                </div>
                </div>
                </div>
                <PastureEggsFooter />
            </div>

        )

    }


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