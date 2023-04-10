import {
  InlineText,
  InlineTextarea,
  InlineBlocks,
  InlineImage,
  BlocksControls,
  InlineGroup,
} from "react-tinacms-inline";
import { Spring, animated, interpolate } from "react-spring";
import { Controller, Scene } from "react-scrollmagic";
import { propTypes } from "react-markdown";

export function NutritiousFeed(props) {
  return (
    <Controller>
      <div>
        <div
          className="relative lg:pt-40 lg:-mt-12 z-40 -mt-64 pt-24 pb-12 lg:pb-32 bg-cover"
          style={{ backgroundImage: `url('/images/dirt-alt.png')` }}
        >
          <div className="pt-8 sm:pt-20 lg:pt-24 lg:mb-12 max-w-5xl mx-auto px-8 lg:px-0 lg:flex block justify-between">
            <h1 className="text-2xl lg:text-5xl text-chinoblue font-ultra uppercase tracking-wider lg:leading-tight lg:text-center mb-6">
              <InlineTextarea name="headingLeft" />
            </h1>
            <img
              src={`https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${props.imageRight.src}`}
              className="lg:-mt-40 mx-auto"
              alt={props.imageRight.alt}
            ></img>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12">
              {props.list.map((item, index) => (
                <div
                  className="col-span-12 grid grid-cols-12 gap-4 lg:gap-8"
                  key={index}
                >
                  <div className="lg:col-span-5 col-span-12 relative">
                    <h1 className="text-xl md:text-3xl text-chinored uppercase font-ultra tracking-wide px-8 md:px-0 lg:pt-0 pt-4">
                      {item.title}
                    </h1>
                  </div>
                  <div className="lg:col-span-7 col-span-12">
                    <p className="text-black lg:2xl font-lato font-medium text-xl px-8 md:px-0">
                      {item.description}
                    </p>
                  </div>

                  <hr className="solid col-span-12 border-chinodarkgray" />
                </div>
              ))}
            </div>
            <Scene duration={400} triggerElement="#betterForYou">
              {(progress, event) => (
                <Spring
                  style="perspective: 400px"
                  config={{
                    mass: 1,
                    tension: 120,
                    friction: 14,
                  }}
                  from={{ transform: "rotate(0deg)", bottom: "0rem" }}
                  to={[
                    {
                      transform: `rotate(-${progress * 10}deg)`,
                      bottom: `${progress * 1.5}rem`,
                    },
                  ]}
                >
                  {(styles) => (
                    <animated.div
                      style={styles}
                      className="w-36 ml-24 pt-2 lg:block hidden relative"
                    >
                      <img
                        src={`https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${props.imageBottom.src}`}
                        alt={props.imageBottom.alt}
                      ></img>
                    </animated.div>
                  )}
                </Spring>
              )}
            </Scene>
          </div>
        </div>
      </div>
    </Controller>
  );
}

export const nutritiousFeedBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <NutritiousFeed {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Nutricious Feed Component",
    defaultItems: [],
    fields: [
      {
        name: "headingLeft",
        label: "Heading Left",
        component: "text",
      },
      {
        name: "imageRight",
        label: "Image Right",
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
        name: "list",
        label: "List",
        component: "group-list",
        fields: [
          {
            name: "title",
            label: "Title",
            component: "text",
          },
          {
            name: "description",
            label: "Description",
            component: "textarea",
          },
        ],
      },
      {
        name: "imageBottom",
        label: "Image Bottom",
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
    ],
  },
};
