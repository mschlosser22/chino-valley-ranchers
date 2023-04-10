import Image from "next/image";
import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";
import { PastureEggsFooter } from "../about-pasture-raised/PastureEggsFooter";

import RecipeVideosChris from "../../components/recipes/RecipeVideosChris";
import { useState } from "react";
import { useRecipesContext } from "../../context/recipes";

const getVideoRecipes = (recipes) => {
  const results = recipes.filter(
    (recipe) => recipe.category == "recipe-video-chris"
  );
  const sortResults = results.sort((a, b) => b.number - a.number);
  return sortResults;
};

export function RecipesChris(props) {
  const recipesContext = useRecipesContext();
  const [recipes, setRecipes] = useState(recipesContext);
  const [recipeCategory, setRecipeCategory] = useState("recipe-videos");
  const [recipeTag, setRecipeTag] = useState("all");

  const setRecipeTagPre = (tag) => {
    if (tag == recipeTag) {
      setRecipeTag("all");
    } else {
      setRecipeTag(tag);
    }
  };

  if (recipes) {
    const parsedRecipes = recipes.map((recipe) => JSON.parse(recipe.content));
    parsedRecipes.sort(function (a, b) {
      return a.order - b.order;
    });

    return (
      <div>
        <div
          className="relative lg:pt-8 pt-12 lg:-mt-12 z-40 -mt-28 bg-no-repeat bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper-edge.png')`,
          }}
        >
          <div
            className="relative g-repeat-y bg-contain mt-4 pb-16"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
            }}
          >
            <div className="max-w-6xl mx-auto">
              {/* Page Heading */}
              <div className="text-center pb-8 lg:py-24 lg:pb-0 max-w-5xl mx-auto px-8 lg:px-0">
                <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-4">
                  <InlineTextarea name="heading" />
                </h1>
                <p className="font-lato lg:text-3xl tracking-wide">
                  <InlineTextarea name="subheading" />
                </p>
              </div>

              {/* Video Recipes */}
              <RecipeVideosChris
                recipes={getVideoRecipes(parsedRecipes)}
                recipeTag={recipeTag}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="relative lg:pt-8 pt-12 lg:-mt-12 -mt-36 bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper-edge.png')`,
          }}
        >
          <div
            className="relative bg-repeat-y mt-4 pb-16"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
            }}
          >
            <div className="max-w-6xl mx-auto">
              {/* Video Recipes */}
              {recipeCategory == "recipe-videos" && (
                <RecipeVideosChris recipes={getVideoRecipes(recipesTemp)} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const recipesChrisBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <RecipesChris {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Recipes Component",
    defaultItem: {
      heading: "Some Headline Here",
      subheading:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/images/bg-paper-edge.png",
    },
    fields: [],
  },
};
