import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";
import ReactMarkdown from "react-markdown";
import { InlineWysiwyg } from "../../components/tinacms/InlineWYSIWYG";

import { Button } from "../../components/button/Button";

export function OurCommitment(props) {
  return (
    <div>
      <div
        className="relative -mt-12 lg:pt-36 pt-20 pb-12 lg:pb-32 bg-cover"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-blue-talons.png')`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="font-ultra lg:text-6xl text-3xl lg:mx-0 mx-8 text-white uppercase tracking-normal pb-8">
            <InlineTextarea name="heading" />
          </h1>
          <div
            className="font-lato lg:text-2xl tracking-wide lg:mx-0 mx-8 text-white lg:pb-8 pb-6"
            id="ourCommitment"
          >
            <InlineWysiwyg name="markdown" format="markdown" sticky>
              <ReactMarkdown>{props.markdown}</ReactMarkdown>
            </InlineWysiwyg>
          </div>

          <div className="flex justify-center">
            <Button button={props.button} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const ourCommitmentBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <OurCommitment {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Our Commitment Component",
    defaultItem: [],
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
      {
        name: "markdown",
        label: "Markdown",
        component: "markdown",
      },
      {
        name: "button",
        label: "Button",
        component: "group",
        fields: [
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
          {
            name: "text",
            label: "Text",
            component: "text",
          },
        ],
      },
    ],
  },
};
