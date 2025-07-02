export default function RecipeVideosChris(props) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-12">
        {props.recipes.map((recipe, index) => {
          if (
            recipe.tags.includes(props.recipeTag) ||
            props.recipeTag == "all"
          ) {
            return (
              <div key={recipe.slug || `recipe-${index}`} className="col-span-12">
                <div className={`col-span-12 relative recipe`}>
                  <div
                    className="p-8 bg-cover mb-12"
                    style={{
                      backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-blue-wood.jpg')`,
                    }}
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://www.youtube.com/embed/${recipe.video.code}?rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="col-span-12 md:flex flex-wrap justify-between">
                    <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                      {recipe.title}
                    </h1>
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
          }
        })}
      </div>
    </div>
  );
}
