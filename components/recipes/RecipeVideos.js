import { ConsentGatedVideo } from "../video/ConsentGatedVideo";

/**
 * Recipe video list.
 *
 * Previously duplicated as RecipeVideos / RecipeVideosChris, which differed
 * only by the download button and a React key fix. RecipeVideosChris now
 * delegates here with showDownloadButton={false}; keeping one implementation
 * means a future embed cannot regress consent gating in only one of them.
 */
export default function RecipeVideos({
  recipes = [],
  recipeTag,
  showDownloadButton = true,
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12">
        {recipes.map((recipe, index) => {
          if (!(recipe.tags.includes(recipeTag) || recipeTag == "all")) {
            return null;
          }

          return (
            <div
              key={recipe.slug || `recipe-${index}`}
              className="col-span-12"
            >
              <div className={`col-span-12 relative recipe`}>
                <div
                  className="p-8 bg-cover mb-12"
                  style={{
                    backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-blue-wood.jpg')`,
                  }}
                >
                  <ConsentGatedVideo
                    src={`https://www.youtube.com/embed/${recipe.video.code}?rel=0`}
                    title={recipe.title || "YouTube video player"}
                  />
                </div>
                <div className="col-span-12 md:flex flex-wrap justify-between">
                  <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                    {recipe.title}
                  </h1>
                  {showDownloadButton && recipe.button && (
                    <a
                      href={recipe.button.src}
                      className="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-lg uppercase text-white px-6 mx-8 lg:mx-0 py-8 my-12 lg:my-0 inline-block"
                      download
                    >
                      {recipe.button.text}
                    </a>
                  )}
                </div>
                <div
                  className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full"
                  dangerouslySetInnerHTML={{ __html: recipe.content }}
                ></div>
              </div>
              <img
                src="https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/orangeSeperator.jpg"
                className="mt-20 mb-20 col-span-12"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}
