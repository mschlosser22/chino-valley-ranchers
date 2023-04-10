import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";
import ReactMarkdown from "react-markdown";
import { InlineWysiwyg } from "../../components/tinacms/InlineWYSIWYG";

import { Button } from "../../components/button/Button";

export function OurSustainability(props) {
  return (
    <div>
      <div
        class="relative -mt-12 pt-8 lg:pt-20 pb-12 bg-no-repeat bg-cover min-h-[56px]"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper-edge.png')`,
        }}
      ></div>
      <div
        className="relative bg-contain"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
        }}
      >
        <div className="max-w-5xl mx-auto pb-24">
          <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wider lg:leading-tight lg:mx-0 mx-8 lg:pb-6 pb-4">
            <InlineTextarea name="heading" />
          </h1>

          <InlineWysiwyg name="markdown" format="markdown" sticky>
            <ReactMarkdown className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-lato font-bold sustainability px-8 lg:px-0">
              {props.markdown}
            </ReactMarkdown>
          </InlineWysiwyg>

          {props.button && (
            <div className="px-8 lg:px-0 flex justify-center lg:justify-left">
              <Button button={props.button} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ourSustainabilityBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <OurSustainability {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Our Sustainability Component",
    defaultItem: {},
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "textarea",
      },
      {
        name: "markdown",
        label: "Markdown",
        component: "markdown",
      },
    ],
  },
};
