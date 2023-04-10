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
import { Button } from "../../components/button/Button";

export function DifferenceFeed(props) {
  return (
    <Controller>
      <div>
        <div
          id="difference"
          className="relative lg:pt-8 pt-12 z-20 -mt-20 xs:-mt-16 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('/images/bg-orange-egg-ripped.png')` }}
        >
          <div className="pt-20 max-w-4xl mx-auto px-8 lg:px-0">
            <h1 className="text-2xl lg:text-5xl lg:w-2/3 w-full text-white font-ultra uppercase tracking-wider lg:mb-12 mb-6 text-center md:text-left">
              <InlineTextarea name="heading" />
            </h1>
            <p className="text-black lg:text-xl lg:w-3/4 w-full mx-4 font-lato font-medium text-xl mx-8 md:mx-0 tracking-wide font-medium lg:pb-20">
              <InlineTextarea name="description" />
            </p>
          </div>
          <div className="lg:flex block lg:justify-between max-w-5xl lg:pl-14 mx-auto">
            <div className="text-center lg:mt-0 lg:mb-0 mb-8 mt-8">
              <Button button={props.button} />
            </div>
            <div className="lg:-mb-12 lg:ml-12 z-30 mb-12">
              <img
                src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/2eggs.png"
                className="w-96 mx-auto"
              ></img>
            </div>
          </div>

          <div>
            <Scene duration={400} triggerElement="#difference">
              {(progress, event) => (
                <Spring
                  config={{
                    mass: 1,
                    tension: 120,
                    friction: 14,
                  }}
                  top={progress > 0 ? `${progress * 1}rem` : "-19rem"}
                >
                  {(styles) => (
                    <animated.div
                      style={styles}
                      className="hidden lg:block absolute right-0 -top-96 h-80 w-96"
                    >
                      <img src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/SVG/hand.svg" />
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

export const differenceFeedBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <DifferenceFeed {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Difference in Our Feed Component",
    defaultItems: [],
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
      {
        name: "description",
        label: "Description",
        component: "textarea",
      },
      {
        name: "button",
        label: "Button",
        component: "group",
        fields: [
          {
            name: "text",
            label: "text",
            component: "text",
          },
          {
            name: "link",
            label: "Link",
            component: "group",
            fields: [
              {
                name: "url",
                label: "URL",
                component: "text",
              },
            ],
          },
        ],
      },
    ],
  },
};
