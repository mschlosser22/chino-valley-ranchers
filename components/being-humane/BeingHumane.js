import Image from "next/image";
import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";

export function BeingHumane(props) {
  //const {content} = props

  return (
    <div>
      <div
        className="relative pt-8 lg:-mt-18 z-40 -mt-32 bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper-edge.png')`,
        }}
      >
        <div
          className="relative bg-repeat-y pb-44 mt-4"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
          }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Page Heading */}
            <div className="z-50 pt-12 pb-8 lg:py-24 max-w-5xl mx-auto px-8 lg:px-0">
              <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6 text-center">
                <InlineTextarea name="heading" />
              </h1>
              <p className="font-lato text-gray-900 tracking-wide mb-8 lg:mb-8 text-xl lg:text-3xl">
                <InlineTextarea name="subheading" />
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-12">
                <div className="lg:col-span-5 md:col-span-6 col-span-12">
                  <img
                    src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${props.imageLeft.src}`}
                    className="mx-auto md:m-0"
                    alt={props.imageLeft.alt}
                  />
                </div>
                <div className="lg:col-span-7 md:col-span-6 col-span-12">
                  <p className="font-lato text-gray-900 tracking-wide lg:mb-8 text-xl lg:text-3xl md:pl-8 md:mx-0 mx-6 pb-8 lg:pb-20">
                    <InlineTextarea name="textRight" />
                  </p>
                </div>
                <div className="lg:col-span-7 md:col-span-6 col-span-12">
                  <p className="font-lato text-gray-900 tracking-wide mb-8 lg:mb-8 text-xl lg:text-3xl lg:pl-12 pt-8 pb-8 md:pb-0 leading-normal md:mx-0 mx-6">
                    <InlineTextarea name="textLeft" />
                  </p>
                </div>
                <div className="lg:col-span-5 md:col-span-6 col-span-12 lg:-mt-20 lg:pl-16">
                  <img
                    src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${props.imageRight.src}`}
                    className="mx-auto md:m-0"
                    alt={props.imageRight.alt}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const beingHumaneBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <BeingHumane {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Being Humane Component",
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
        name: "textLeft",
        label: "Text Left",
        component: "textarea",
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
    ],
  },
};
