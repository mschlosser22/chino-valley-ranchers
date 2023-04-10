import {
  InlineText,
  InlineTextarea,
  InlineBlocks,
  InlineImage,
  BlocksControls,
  InlineGroup,
} from "react-tinacms-inline";
import ReactMarkdown from "react-markdown";
import { InlineWysiwyg } from "../../components/tinacms/InlineWYSIWYG";
import { Button } from "../../components/button/Button";

export function WhatItTakes(props) {
  return (
    <div>
      <div
        className="relative pt-20 sm:pt-56 lg:pt-40 -mt-72 lg:-mt-56 lg:-mt-48 2xl:-mt-72 bg-repeat-x bg-cover z-40"
        style={{ backgroundImage: `url('/images/bg-talons.png')` }}
      >
        <div className="z-50 pt-56 sm:pt-24 pb-8 lg:py-24 2xl:pt-72 max-w-4xl mx-auto px-8 lg:px-0">
          <h1 className="text-2xl lg:text-5xl text-chinoblue font-ultra uppercase tracking-wide lg:mb-12 mb-6 text-center md:text-left">
            <InlineTextarea name="heading" />
          </h1>
          <p className="font-lato text-black lg:2xl mx-auto w-5/6 font-medium text-xl text-center lg:text-left tracking-wide">
            <InlineTextarea name="description" />
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-12">
            {props.list.map((item, index) => (
              <div
                className="col-span-12 grid grid-cols-12 gap-4 lg:gap-8"
                key={index}
              >
                <div className="lg:col-span-5 col-span-12 mx-auto lg:mx-0 relative">
                  <h1 className="text-lg md:text-3xl text-chinored uppercase font-ultra text-center md:text-left tracking-wide">
                    {item.title}
                  </h1>
                </div>
                <div className="lg:col-span-7 col-span-12">
                  <p className="text-black lg:2xl mx-4 font-lato font-medium text-xl mx-8 md:mx-0 text-center md:text-left">
                    {item.description}
                  </p>
                </div>
                <hr className="solid col-span-12 border-chinodarkgray my-10" />
              </div>
            ))}
          </div>
        </div>

        <div className="z-50 pt-8 lg:pt-20 pb-8 lg:py-24 max-w-6xl mx-auto px-8 lg:px-0 text-center">
          <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wide lg:mb-12 mb-6 stat">
            <InlineWysiwyg name="statOne" format="markdown" sticky>
              <ReactMarkdown>{props.statOne}</ReactMarkdown>
            </InlineWysiwyg>
          </h1>
          <h1 className="text-2xl lg:text-4xl text-black font-ultra uppercase tracking-wide lg:mb-12 mb-6 stat">
            <InlineWysiwyg name="statTwp" format="markdown" sticky>
              <ReactMarkdown>{props.statTwo}</ReactMarkdown>
            </InlineWysiwyg>
          </h1>
          <img
            src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/redSeperator.png"
            className="my-8 lg:my-20 mx-auto w-1/2"
          ></img>
          <div className="pb-16 lg:pb-0">
            <Button button={props.button} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const whatItTakesBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <WhatItTakes {...data} />
    </BlocksControls>
  ),
  template: {
    label: "What it Takes Component",
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
        name: "statOne",
        label: "Stat One",
        component: "markdown",
      },
      {
        name: "statTwo",
        label: "Stat Two",
        component: "markdown",
      },
      {
        name: "button",
        label: "Button",
        component: "group",
        fields: [
          {
            name: "text",
            label: "Text",
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
