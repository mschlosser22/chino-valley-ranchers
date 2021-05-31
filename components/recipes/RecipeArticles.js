export default function RecipeArticles(props) {

    return (

        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-12">
        {props.recipes.map( (recipe, index) => {

            if(recipe.tags.includes(props.recipeTag) || props.recipeTag == 'all') {

                return (
                    <>
                        <div className="col-span-12 relative">
                            <div className="p-8 bg-cover mb-12" style={{ backgroundImage: `url('/images/bg-blue-wood.jpg')` }}>
                                <div className="aspect-w-16 aspect-h-9">
                                    <img src={recipe.image.src} alt={recipe.image.alt} />
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-between lg:px-0 px-3">
                                <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                    {recipe.title}
                                </h1>
                                <button className="bg-chinored rounded-md font-din tracking-wider lg:text-xl text-md uppercase text-white px-6">{recipe.button.text}</button>
                            </div>
                            <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full">{recipe.content}</p>
                        </div>
                        <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                        </>
                )

            }

        })}
        </div>
    </div>

    )

}