import { BlocksControls } from "react-tinacms-inline";
import { Button } from "../../components/button/Button";
import Image from "next/image";
import cometTextImage from "../../public/images/comet-eggs-have-arrived.png";
import { ConsentGatedVideo } from "./ConsentGatedVideo";

const button = {
  link: {
    url: "/products/comet-eggs",
  },
  classes: "mt-8",
  text: "Learn More",
};

export function YoutubeComet(props) {
  return (
    <div
      className="relative pt-8 -mt-12 2xl:-mt-16 pb-12 bg-cover bg-no-repeat z-40"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/space-bg.png')`,
      }}
    >
      <div className="max-w-5xl mx-auto pt-8 pb-12 lg:pb-24 lg:pt-20 text-center">
        <Image src={cometTextImage} alt="Comet Eggs Have Arrived" />

        <div className="bg-cover w-full pb-8 lg:pb-20 pt-8 lg:pt-12 px-2 lg:px-0">
          <div className="border-2 border-white rounded-sm">
            <ConsentGatedVideo src={props.video} />
          </div>
        </div>

        <Button button={button} />
      </div>
    </div>
  );
}

export const youtubeBlockComet = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <YoutubeComet {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Content Single Column",
    defaultItem: {},
    fields: [],
  },
};
