import { BlocksControls } from "react-tinacms-inline";

export function Youtube(props) {
  return (
    <div
      className="relative pt-8 -mt-12 2xl:-mt-16 pb-12 bg-no-repeat bg-cover z-40"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/blue-bg.png')`,
      }}
    >
      <div className="max-w-5xl mx-auto pt-8 pb-24 lg:pt-32 text-center">
        <div
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/blue-board.jpg')`,
          }}
          className="bg-cover w-full"
        >
          <div className="p-8">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={props.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const youtubeBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <Youtube {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Content Single Column",
    defaultItem: {},
    fields: [],
  },
};
