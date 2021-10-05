const articlesTemp = [
    {
        title: "How to Make The Perfect Breakfast Sandwich",
        image: {
            src: "/images/perfect-breakfast-sandwich.jpeg",
            alt: "Perfect Breakfast Sandwich"
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

import { useState } from 'react'
import { useNewsContext } from '../../context/news'
import moment from 'moment'
import { PaginatedList } from 'react-paginated-list'

import {FacebookShareButton, TwitterShareButton, EmailShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, EmailIcon, LinkedinIcon, PinterestIcon, RedditIcon, WhatsappIcon} from "react-share"

export function Articles(props) {

    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

    const newsContext = useNewsContext()
    const [articles, setArticles] = useState(newsContext)

    if(articles) {

        const parsedArticles = articles.map(article => JSON.parse(article.content))
        parsedArticles.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
        });

        const featuredArticle = parsedArticles.splice(0,1)

        return(

            <div>

            {/* Featured Article */}
            <div className="max-w-6xl mx-auto">
            {featuredArticle.map( (article, index) => {

                if(index == 0) {
                    return (
                <div key={index} className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 relative">
                            <a href={`/news/${article.slug}`}>
                                {article.image ?
                                <img src={article.image.src} alt={article.image.alt} className="mb-12"></img>
                                :
                                <img src="/images/article1.jpg" alt="placeholder image" className="mb-12"></img>
                                }

                            </a>
                                <div className="col-span-12">
                                    <a href={`/news/${article.slug}`}>
                                        <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4">
                                            {article.title}
                                        </h1>
                                    </a>

                                    <div className="sm:flex block px-8 lg:p-0">
                                        <p className="text-md lg:text-xl text-chinogray pr-2">
                                            {moment(article.date).format("MMM Do YYYY")},
                                        </p>
                                        <p className="text-md lg:text-xl text-chinogray">
                                            by {article.author}
                                        </p>
                                    </div>
                                    <div className="pt-4 flex gap-2 px-8 lg:px-0">
                                        <FacebookShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <EmailShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <EmailIcon size={32} round={true} />
                                        </EmailShareButton>
                                        <LinkedinShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <LinkedinIcon size={32} round={true} />
                                        </LinkedinShareButton>
                                        <PinterestShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <PinterestIcon size={32} round={true} />
                                        </PinterestShareButton>
                                        <RedditShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <RedditIcon size={32} round={true} />
                                        </RedditShareButton>

                                    </div>
                                </div>
                                <div className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl" dangerouslySetInnerHTML={{ __html: truncate( article.content.replace(/(<([^>]+)>)/gi, ""), 500, '...') }}></div>
                                <a href={`/news/${article.slug}`} className="text-xl lg:2xl pl-8 lg:p-0 text-chinored hover:underline cursor-pointer">Read More ></a>
                            </div>
                            <img src="/images/orangeSeperator.jpg" className="mt-20 mb-20 col-span-12"></img>
                        </div>
                    </div>
                    )
                }
            })}
        </div>

        {/* Articles */}

        <div className="lg:max-w-6xl mx-auto pb-12 lg:pb-24">
            <PaginatedList
                list={parsedArticles}
                itemsPerPage={8}
                renderList={(list) => (
                    <div className="grid grid-cols-12 lg:gap-16 gap-8 relative">
                    {list.map((article, index) => {
                    return (
                        <div key={index} className="lg:col-span-6 col-span-12">
                            <div>
                                        <a href={`/news/${article.slug}`} className="block h-full w-full">
                                        {article.image && article.image.src ?
                                        <img src={article.image.src} alt={article.image.alt} className="mb-12 object-cover h-72 w-full"></img>
                                        :
                                        <img src="/images/CVR_Blog_Thumbnail.png" alt="placeholder image" className="mb-12 object-cover h-48 w-full"></img>
                                        }
                                        </a>
                                        <a href={`/news/${article.slug}`}>
                                            <h1 className="text-2xl lg:text-4xl px-8 lg:p-0 text-chinored font-ultra uppercase tracking-wide mb-4" dangerouslySetInnerHTML={{ __html: article.title }}>
                                            </h1>
                                        </a>
                                        <div className="sm:flex block px-8 lg:p-0">
                                            <p className="text-md lg:text-xl text-chinogray lg:pr-2">
                                            {moment(article.date).format("MMM Do YYYY")},
                                            </p>
                                            <p className="text-md lg:text-xl text-chinogray">
                                            by {article.author}
                                            </p>
                                        </div>
                                        <div className="pt-4 flex gap-2 px-8 lg:px-0">
                                        <FacebookShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <EmailShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <EmailIcon size={32} round={true} />
                                        </EmailShareButton>
                                        <LinkedinShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <LinkedinIcon size={32} round={true} />
                                        </LinkedinShareButton>
                                        <PinterestShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <PinterestIcon size={32} round={true} />
                                        </PinterestShareButton>
                                        <RedditShareButton url={`https://www.chinovalleyranchers.com/news/${article.slug}`}>
                                            <RedditIcon size={32} round={true} />
                                        </RedditShareButton>

                                    </div>
                                        <p className="mt-6 mb-6 px-8 lg:p-0 text-black lg:2xl text-xl" dangerouslySetInnerHTML={{ __html: truncate( article.content.replace(/(<([^>]+)>)/gi, ""), 250, '...') }}></p>
                                        <a href={`/news/${article.slug}`} className="text-xl lg:2xl pl-8 lg:p-0 text-chinored hover:underline cursor-pointer">Read More ></a>
                            </div>
                        </div>
                    );
                    })}
                </div>
                )}
            />

        </div>
    </div>

        )

    } else {
        return (
            <div className="max-w-6xl mx-auto h-96"></div>
        )
    }


}