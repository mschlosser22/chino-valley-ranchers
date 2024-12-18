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
import { HeadingAlt } from "../../components/heading/HeadingAlt";
import { SubheadingAlt } from "../../components/heading/SubheadingAlt";
import { ImageAlt } from "../../components/image/ImageAlt";
import { ButtonAlt } from "../../components/button/ButtonAlt";

export function ContentSingleColumnTwo({ data, index }) {
  //const {content} = props
  const itemProps = {
    backgroundImage:
      "https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png",
    data: data,
  };

  return (
    <>
      <div
        className="relative -mt-12 pt-8 lg:pt-20 pb-12 bg-no-repeat bg-cover min-h-[56px] z-40"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper-edge.png')`,
        }}
      ></div>
      <InlineBlocks
        name="blocks"
        blocks={CONTENT_SINGLE_COLUMN_TWO_BLOCKS}
        itemProps={itemProps}
      />
    </>
  );
}

export const contentSingleColumnTwoBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <ContentSingleColumnTwo data={data} />
    </BlocksControls>
  ),
  template: {
    label: "Content Single Column v2",
    defaultItem: {
      content: [
        {
          image: {
            src: "/images/american-humane-certified.png",
            alt: "American Humane Certified Eggs",
          },
        },
        {
          subheading:
            "Our passion for quality egg production practices dates back to our early beginnings. Along the way, we’ve received various certifications to assure our customers of our commitment to the highest standards. Chino Valley Ranchers pasture raised eggs are certified by American Humane and carry the American Humane Certified seal.",
        },
        {
          subheading:
            "Our passion for quality egg production permeates all operations and every employee is personally responsible for doing their part. Company employees and all personnel follow American Humane’s strict requirements for documentation, inspections, equipment maintenance, and access to feed and water. Maintaining pasture raised quality demands extra attention, but we believe it’s worth it.",
        },
        {
          heading: "Proudly Pasture Raised For You",
        },
        {
          subheading:
            "From our family to yours, Chino Valley Ranchers pasture raised eggs are produced with your health and well-being in mind.",
        },
        {
          button: {
            link: {
              url: "#",
            },
            text: "Find a Store Near You",
          },
        },
      ],
    },
    fields: [],
  },
};

const heading_alt_template = {
  label: "Heading",
  defaultItem: {
    heading: "Some Heading",
  },
  fields: [
    {
      name: "heading",
      label: "Heading",
      component: "text",
    },
  ],
};

const subheading_alt_template = {
  label: "Paragraph",
  defaultItem: {
    subheading: "Some paragraph Text Here.",
  },
  fields: [
    {
      name: "subheading",
      label: "Sub Heading",
      component: "textarea",
    },
  ],
};

const image_alt_template = {
  label: "Image",
  defaultItem: {
    image: "/images/american-humane-certified.png",
  },
  fields: [],
};

const button_alt_template = {
  label: "Button",
  defaultItem: {
    button: {
      link: "#",
      text: "Find A Store Near You",
    },
  },
  fields: [
    {
      name: "link",
      label: "Button Link",
      component: "text",
    },
    {
      name: "text",
      label: "Button Text",
      component: "text",
    },
  ],
};

const CONTENT_SINGLE_COLUMN_TWO_BLOCKS = {
  headingAlt: {
    Component: HeadingAlt,
    template: heading_alt_template,
  },
  subheadingAlt: {
    Component: SubheadingAlt,
    template: subheading_alt_template,
  },
  imageAlt: {
    Component: ImageAlt,
    template: image_alt_template,
  },
  buttonAlt: {
    Component: ButtonAlt,
    template: button_alt_template,
  },
};
