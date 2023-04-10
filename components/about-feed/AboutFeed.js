import { DiffieHellman } from "crypto";
import Image from "next/image";
import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";

import { Spring, animated, interpolate } from "react-spring";
import { Controller, Scene } from "react-scrollmagic";
import { scale } from "tailwindcss/defaultTheme";

import ReactMarkdown from "react-markdown";
import { InlineWysiwyg } from "../../components/tinacms/InlineWYSIWYG";

export function AboutFeed(props) {
  return (
    <Controller>
      <div>
        <div
          className="relative pt-8 lg:-mt-12 -mt-32 bg-repeat-x bg-contain bg-auto z-40"
          style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}
        >
          <div
            className="relative bg-repeat-y pb-44 mt-4 z-30 bg-contain"
            style={{ backgroundImage: `url('/images/bg-paper.png')` }}
          >
            <div className="max-w-6xl mx-auto">
              {/* Page Heading */}
              <div className="text-center z-40 pt-8 lg:pt-20 pb-8 lg:py-24 max-w-3xl mx-auto">
                <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6 lg:px-0 px-8">
                  <InlineTextarea name="heading" />
                </h1>
                <p className="font-lato lg:text-2xl text-xl tracking-wide lg:px-24 px-8 lg:text-left">
                  <InlineTextarea name="subheading" />
                </p>
              </div>

              <div className="max-w-5xl mx-auto" id="eatalt">
                <div className="grid grid-cols-12 gap-8 lg:ml-6 lg:-mb-16">
                  <div className="md:col-span-5 col-span-12 mx-auto relative">
                    <Scene duration={150} triggerElement="#eatalt">
                      {(progress, event) => (
                        <Spring
                          style="perspective: 400px"
                          config={{
                            mass: 1,
                            tension: 120,
                            friction: 14,
                          }}
                          from={{ opacity: "0", transform: "scale(0.8)" }}
                          to={[
                            {
                              opacity: `${progress}`,
                              transform: `scale(${(progress + 9) / 10})`,
                            },
                          ]}
                        >
                          {(styles) => (
                            <animated.div style={styles}>
                              <img
                                id="eat"
                                src={`https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${props.imageLeft.src}`}
                                className="lg:pb-6 w-48 md:w-full"
                                alt={props.imageLeft.alt}
                              />
                            </animated.div>
                          )}
                        </Spring>
                      )}
                    </Scene>
                  </div>
                  <div className="md:col-span-7 col-span-12">
                    <img
                      src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/orangeSeperator.jpg"
                      className="mb-12 mt-4 col-span-12 lg:px-0 px-8"
                    />
                    <p className="text-black lg:text-2xl lg:px-8 px-8 font-lato font-medium text-xl leading-relaxed">
                      <InlineTextarea name="textRight" />
                    </p>
                    <img
                      src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/orangeSeperator.jpg"
                      className="mt-12 col-span-12 lg:px-0 px-8"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Scene duration={400} triggerElement="#eat">
                    {(progress, event) => (
                      <Spring
                        style="perspective: 400px"
                        config={{
                          mass: 1,
                          tension: 120,
                          friction: 14,
                        }}
                        from={{ transform: "rotate(0deg)" }}
                        to={[{ transform: `rotate(-${progress * 5}deg)` }]}
                      >
                        {(styles) => (
                          <animated.div
                            style={styles}
                            className="pb-4 pr-24 lg:w-1/3 w-3/5 mt-8 lg:mt-0"
                          >
                            <img src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/seeing-believingArrow.png" />
                          </animated.div>
                        )}
                      </Spring>
                    )}
                  </Scene>
                </div>
                <div
                  style={{ backgroundImage: `url('/images/blue-board.jpg')` }}
                  className="bg-cover w-full"
                >
                  <div className="p-8">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={props.video.src}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div className="z-50 pt-20 pb-8 lg:py-24 max-w-6xl mx-auto px-8 lg:px-0 text-center">
                <h1
                  className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wide"
                  id="stat"
                >
                  <InlineWysiwyg name="stat" format="markdown" sticky>
                    <ReactMarkdown>{props.stat}</ReactMarkdown>
                  </InlineWysiwyg>
                </h1>
                <img
                  src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/redSeperator.png"
                  className="mt-20 mx-auto lg:w-1/2 w-3/4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Controller>
  );
}

export const aboutFeedBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <AboutFeed {...data} />
    </BlocksControls>
  ),
  template: {
    label: "About Feed Component",
    defaultItem: {
      heading: "Some Headline Here",
      subheading:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/images/bg-paper-edge.png",
    },
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
      {
        name: "subheading",
        label: "Sub Heading",
        component: "textarea",
      },
      {
        name: "imageLeft",
        label: "Image Left",
        component: "group",
        fields: [
          {
            name: "src",
            label: "src",
            component: "image",
            parse: (media) => `/images/${media.filename}`,
            uploadDir: () => "/images",
          },
          {
            name: "alt",
            label: "Alt",
            component: "text",
          },
        ],
      },
      {
        name: "textRight",
        label: "Text Right",
        component: "textarea",
      },
      {
        name: "stat",
        label: "Stat",
        component: "markdown",
      },
      {
        name: "video",
        label: "Video",
        component: "group",
        fields: [
          {
            name: "src",
            label: "src",
            component: "text",
          },
        ],
      },
    ],
  },
};
