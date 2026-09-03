import { BlocksControls } from "react-tinacms-inline";
import { ConsentGatedVideo } from "./ConsentGatedVideo";

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
            <ConsentGatedVideo src={props.video} />
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
