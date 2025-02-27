import Image from "next/image";
import {
  InlineText,
  InlineTextarea,
  InlineBlocks,
  InlineImage,
  BlocksControls,
  InlineGroup,
} from "react-tinacms-inline";

import { Button } from "../button/Button";

export function RecipesAndVideos(props) {
  return (
    <div
      className="relative pt-20 -mt-24 lg:pb-20 bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/white-burlap-bg.png')`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 pt-12 lg:pt-36 pb-2 lg:pb-24 relative px-8 xl:px-0 lg:gap-12">
          {/* Heading */}
          <div className="col-span-12 lg:col-span-5">
            <h3 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide text-chinoblue font-ultra text-left uppercase">
              <InlineTextarea name="heading" />
            </h3>
          </div>
          {/* Content */}
          <div className="col-span-12 lg:col-span-7">
            <p className="font-lato sm:leading-body lg:text-3xl lg:leading-body tracking-wide mb-8 pt-4 text-left">
              <InlineTextarea name="content" />
            </p>
          </div>
        </div>

        {/* Videos */}
        <div className="grid grid-cols-12 pb-8 lg:pb-24 relative px-8 xl:px-0 gap-2">
          {props.data.videos.map((video, index) => (
            <div
              key={index}
              className="col-span-12 lg:col-span-6 mb-2 lg:mb-12 lg:mb-0"
            >
              <div className="border-8 border-white rounded mb-2 lg:mb-8 shadow-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`${video.src}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <h5 className="font-lato lg:text-3xl tracking-wide text-left">
                {video.title}!
              </h5>
            </div>
          ))}
        </div>
        <div className="flex justify-center lg:block px-8 lg:px-0 pb-12 lg:pb-0">
          <Button button={props.data.button} classes={`lg:mt-12`} />
        </div>
      </div>
    </div>
  );
}

export const recipesAndVideosBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <RecipesAndVideos data={data} />
    </BlocksControls>
  ),
  template: {
    label: "Recipes and Videos",
    defaultItem: {},
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
      {
        name: "content",
        label: "Content",
        component: "textarea",
      },
      {
        name: "videos",
        label: "Videos",
        component: "group-list",
        fields: [
          {
            name: "src",
            label: "src",
            component: "text",
          },
          {
            name: "title",
            label: "Title",
            component: "text",
          },
        ],
      },
    ],
  },
};
