import ReactMarkdown from "react-markdown";
import { InlineWysiwyg } from "../../components/tinacms/InlineWYSIWYG";
import { PaginatedList } from "react-paginated-list";

//import rehypeRaw from 'rehype-raw'

export default function RecipeArticles(props) {
  const truncate = (str, max, suffix) =>
    str.length < max
      ? str
      : `${str.substr(
          0,
          str.substr(0, max - suffix.length).lastIndexOf(" ")
        )}${suffix}`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-12">
        <div className="lg:max-w-6xl mx-auto pb-12 lg:pb-24 col-span-12">
          <PaginatedList
            list={props.recipes}
            itemsPerPage={5}
            renderList={(list) => (
              <div className="grid grid-cols-12 lg:gap-16 gap-8 relative">
                {list.map((recipe, index) => {
                  if (
                    recipe.tags.includes(props.recipeTag) ||
                    props.recipeTag == "all"
                  ) {
                    return (
                      <>
                        <div className="col-span-12 relative">
                          <div
                            className="p-8 bg-cover mb-12"
                            style={{
                              backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-blue-wood.jpg')`,
                            }}
                          >
                            <div className="aspect-w-16 aspect-h-9">
                              <img
                                src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${recipe.image.src}`}
                                alt={recipe.image.alt}
                              />
                            </div>
                          </div>
                          <div className="col-span-12 flex justify-between">
                            <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                              {recipe.title}
                            </h1>
                          </div>
                          <div className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl lg:w-2/3 w-full recipe-article">
                            <InlineWysiwyg
                              name="content"
                              format="markdown"
                              sticky
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: truncate(
                                    recipe.content.replace(/(<([^>]+)>)/gi, ""),
                                    500,
                                    "..."
                                  ),
                                }}
                              ></div>
                            </InlineWysiwyg>
                            <a
                              href={`/recipes/${recipe.slug}`}
                              className="text-xl lg:2xl pl-8 mt-8 lg:p-0 text-chinored hover:underline cursor-pointer block"
                            >
                              Read More >
                            </a>
                          </div>
                        </div>
                        <img
                          src="https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/orangeSeperator.jpg"
                          className="mt-20 mb-20 col-span-12"
                        ></img>
                      </>
                    );
                  }
                })}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
