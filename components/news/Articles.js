const articles = [
    {
        title: "How to make and egg-celent brunch board",
        image: {
            src: "/images/brunch-board.jpg",
            alt: "Brunch board"
        },
        date: "20 April 2021",
        time: "13:30",
        author: "Chino Valley Ranchers",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        title: "The Difference Between Cage-Free & Pasture-Raised Eggs",
        image: {
            src: "/images/article1.jpg",
            alt: "Carton of Eggs"
        },
        date: "16 April 2021",
        time: "19:55",
        author: "Chino Valley Ranchers",
        content: "Cage-free, free-range, pasture-raised, non-GMO, Organic, conventional, and all natural are just a few labels you’ll see on egg cartons at your local grocery store. If you’re feeling dizzy just reading all of these terms, rest assured you’re probably not the only one. "
    },
    {
        title: "5 Fun Easter Egg Recipes For The Whole Family",
        image: {
            src: "/images/article2.jpg",
            alt: "Deviled Eggs"
        },
        date: "26 March 2021",
        time: "20:35",
        author: "Chino Valley Ranchers",
        content: "Easter is just around the corner and makes for a great holiday to celebrate with family, especially if you’ve got little ones. Here are five fun recipes to enjoy with the whole family. "
    },
    {
        title: "How to make and egg-celent brunch board",
        image: {
            src: "/images/article1.jpg",
            alt: "Some alt text"
        },
        date: "20 April 2021",
        time: "13:30",
        author: "Chino Valley Ranchers",
        content: "Cage-free, free-range, pasture-raised, non-GMO, Organic, conventional, and all natural are just a few labels you’ll see on egg cartons at your local grocery store. If you’re feeling dizzy just reading all of these terms, rest assured you’re probably not the only one."
    },
    {
        title: "How to make and egg-celent brunch board",
        image: {
            src: "/images/article2.jpg",
            alt: "Some alt text"
        },
        date: "20 April 2021",
        time: "13:30",
        author: "Chino Valley Ranchers",
        content: "Easter is just around the corner and makes for a great holiday to celebrate with family, especially if you’ve got little ones. Here are five fun recipes to enjoy with the whole family."
    }
]

export function Articles() {
    return (
        <div>
        {/* Featured Article */}
            <div className="max-w-6xl mx-auto">
            {articles.map( (article, index) => {
                if(index == 0) {
                    return (
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 relative">
                                <img src={article.image.src} alt={article.image.alt} className="mb-12"></img>
                                <div className="col-span-12">
                                    <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                        {article.title}
                                    </h1>
                                    <div className="sm:flex block px-8 lg:p-0">
                                        <p className="text-md lg:text-xl text-chinogray pr-2">
                                            {article.date} - {article.time},
                                        </p>
                                        <p className="text-md lg:text-xl text-chinogray">
                                            by {article.author}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl">{article.content}</p>
                            </div>
                            <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                        </div>
                    </div>
                    )
                }
            })}
        </div>

        {/* Article 1 */}

        <div className="lg:max-w-6xl mx-auto">
            <div className="grid grid-cols-12 lg:gap-16 gap-8 relative">
                <div class="lg:col-span-6 col-span-12">
                    {articles.map( (article, index) => {
                        if(index == 1) {
                            return (
                                <div>
                                        <img src={article.image.src} alt={article.image.alt} className="mb-12 w-full"></img>
                                        <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                            {article.title}
                                        </h1>
                                        <div className="sm:flex block px-8 lg:p-0">
                                            <p className="text-md lg:text-xl text-chinogray lg:pr-2">
                                            {article.date} - {article.time},
                                            </p>
                                            <p className="text-md lg:text-xl text-chinogray">
                                            by {article.author}
                                            </p>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl">{article.content}</p>
                                        <a className="text-xl lg:2xl pl-8 lg:p-0 text-chinored underline cursor-pointer">Read More ></a>
                                </div>
                            )
                        }
                    })}
                </div>

        {/* Article 2 */}

            <div class="lg:col-span-6 col-span-12">
                    {articles.map( (article, index) => {
                        if(index == 2) {
                            return (
                                <div>
                                        <img src={article.image.src} alt={article.image.alt} className="mb-12 w-full"></img>
                                        <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                            {article.title}
                                        </h1>
                                        <div className="sm:flex block px-8 lg:p-0">
                                            <p className="text-md lg:text-xl text-chinogray lg:pr-2">
                                            {article.date} - {article.time},
                                            </p>
                                            <p className="text-md lg:text-xl text-chinogray">
                                            by {article.author}
                                            </p>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl">{article.content}</p>
                                        <a className="text-xl lg:2xl pl-8 lg:p-0 text-chinored underline cursor-pointer">Read More ></a>
                                </div>
                        )
                    }
                })}
            </div>

                {/* Article 3 */}

                <div class="lg:col-span-6 col-span-12">
                    {articles.map( (article, index) => {
                        if(index == 3) {
                            return (
                                <div>
                                        <img src={article.image.src} alt={article.image.alt} className="mb-12 w-full"></img>
                                        <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                            {article.title}
                                        </h1>
                                        <div className="sm:flex block px-8 lg:p-0">
                                            <p className="text-md lg:text-xl text-chinogray lg:pr-2">
                                            {article.date} - {article.time},
                                            </p>
                                            <p className="text-md lg:text-xl text-chinogray">
                                            by {article.author}
                                            </p>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl">{article.content}</p>
                                        <a className="text-xl lg:2xl pl-8 lg:p-0 text-chinored underline cursor-pointer">Read More ></a>
                                </div>
                            )
                        }
                    })}
                </div>

        {/* Article 4 */}

            <div class="lg:col-span-6 col-span-12">
                    {articles.map( (article, index) => {
                        if(index == 4) {
                            return (
                                <div>
                                        <img src={article.image.src} alt={article.image.alt} className="mb-12 w-full"></img>
                                        <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                            {article.title}
                                        </h1>
                                        <div className="sm:flex block px-8 lg:p-0">
                                            <p className="text-md lg:text-xl text-chinogray lg:pr-2">
                                            {article.date} - {article.time},
                                            </p>
                                            <p className="text-md lg:text-xl text-chinogray">
                                            by {article.author}
                                            </p>
                                        </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl">{article.content}</p>
                                        <a className="text-xl lg:2xl pl-8 lg:p-0 text-chinored underline cursor-pointer">Read More ></a>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    </div>
    )
}