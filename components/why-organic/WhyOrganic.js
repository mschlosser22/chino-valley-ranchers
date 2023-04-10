import {
  InlineTextarea,
  InlineImage,
  BlocksControls,
} from "react-tinacms-inline";

export function WhyOrganic(props) {
  return (
    <div>
      <div
        className="relative z-40 pt-8 lg:-mt-2 -mt-24 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper-edge.png')`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Page Heading */}
          <div className="lg:text-center text-left z-40 pt-8 lg:pt-20 pb-8 lg:py-24 max-w-5xl mx-auto">
            <h1 className="text-3xl lg:text-6xl text-chinored font-ultra uppercase tracking-wide lg:mb-12 mb-6 mx-8 lg:mx-0">
              <InlineTextarea name="heading" />
            </h1>
            <div className="font-lato lg:text-2xl tracking-wide lg:mx-52 mx-8 lg:text-left">
              <InlineTextarea name="subheading" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const whyOrganicBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <WhyOrganic {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Why Organic Component",
    defaultItem: {
      heading: "Some Headline Here",
      subheading:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/images/bg-paper-edge.png",
    },
    fields: [],
  },
};
