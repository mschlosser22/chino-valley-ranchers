import Image from "next/image";
import {
  InlineText,
  InlineTextarea,
  InlineBlocks,
  InlineImage,
  BlocksControls,
  InlineGroup,
} from "react-tinacms-inline";

import { Button } from "../../components/button/Button";
import { Paragraph } from "../../components/content/paragraph/Paragraph";

export function SizeOptions(props) {
  return (
    <div
      className="relative pb-20 bg-no-repeat bg-cover -mt-20"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/dirt-bg-alt.png')`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full pt-48 pb-12 lg:pb-24 relative px-8 xl:px-0">
          {/* Heading */}
          <div className="pb-12">
            <h3 className="text-center text-chinored text-2xl lg:text-5xl font-ultra tracking-wide">
              <InlineTextarea name="heading" />
            </h3>
          </div>

          {/* Size Options */}
          <div
            className={`grid grid-cols-${props.images.length} gap-4 auto-rows-min`}
          >
            {props.images &&
              props.images.map((image, index) => (
                <div key={index} className="col-span-4 sm:col-span-1">
                  <img
                    src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${image.src}`}
                    alt={image.alt}
                  />
                  <div className="w-full text-center lg:text-left text-gray-900 font-ultra text-lg lg:text-3xl pt-8 tracking-wide">
                    <h4>{props.sizes[index]}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="hidden grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4"></div>
      </div>
    </div>
  );
}

export const sizeOptionsBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <SizeOptions {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Size Options Component",
    defaultItem: {},
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
      {
        name: "sizes",
        label: "Sizes",
        component: "list",
        field: {
          component: "text",
        },
      },
    ],
  },
};
