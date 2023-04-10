import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";
import ReactMarkdown from "react-markdown";
import { InlineWysiwyg } from "../../components/tinacms/InlineWYSIWYG";

export function QualityFeed(props) {
  return (
    <div>
      <div
        className="relative pt-8 z-40 lg:-mt-12 -mt-16"
        style={{ backgroundImage: `url('/images/bg-paper-edge.png')` }}
      >
        <div
          className="relative pb-24 mt-4"
          style={{ backgroundImage: `url('/images/bg-paper.png')` }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Page Heading */}
            <div className="pt-12 lg:py-16 max-w-4xl mx-auto px-8 lg:px-0">
              <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase lg:mb-12 mb-6 text-center">
                <InlineTextarea name="heading" />
              </h1>
              {props.listTop.map((item, index) => (
                <p className="font-lato text-gray-900 tracking-wide mb-8 lg:mb-8 text-xl lg:text-3xl">
                  {item.description}
                </p>
              ))}
            </div>
            {props.listBottom && (
              <div>
                <img src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/orangeSeperator.jpg"></img>
                <p
                  className="lg:text-3xl text-xl font-ultra text-center max-w-4xl py-9 mx-auto px-8 lg:px-0 tracking-wide"
                  id="callout"
                >
                  <InlineWysiwyg name="callout" format="markdown" sticky>
                    <ReactMarkdown>{props.callout}</ReactMarkdown>
                  </InlineWysiwyg>
                </p>
                <img src="https://res.cloudinary.com/dmlnena1u/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/orangeSeperator.jpg"></img>
              </div>
            )}
            {props.listBottom && (
              <div className="lg:text-center pt-12 lg:py-16  max-w-4xl mx-auto px-8 lg:px-0">
                {props.listBottom.map((item, index) => (
                  <p className="font-lato lg:text-xl tracking-wide leading-normal pb-12 font-bold lg:text-left">
                    {item.description}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const qualityFeedBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <QualityFeed {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Quality Feed Component",
    defaultItems: [],
    fields: [
      {
        name: "heading",
        label: "Heading",
        component: "text",
      },
      {
        name: "listTop",
        label: "Paragraph List Top",
        component: "group-list",
        fields: [
          {
            name: "description",
            label: "Paragraph",
            component: "textarea",
          },
        ],
      },
      {
        name: "callout",
        label: "Callout",
        component: "markdown",
      },
      {
        name: "listBottom",
        label: "Paragraph List Bottom",
        component: "group-list",
        fields: [
          {
            name: "description",
            label: "Paragraph",
            component: "textarea",
          },
        ],
      },
    ],
  },
};
