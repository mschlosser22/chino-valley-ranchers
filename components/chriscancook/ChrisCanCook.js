import { BlocksControls } from "react-tinacms-inline";
import { ChrisText } from "../../components/chriscancook/ChrisText";
import Image from "next/image";
import chrisImage from "../../public/images/chris.jpg";

const button = {
  link: {
    url: "/products/comet",
  },
  classes: "mt-8 absolute bottom-0 right-0",
  text: "Learn More",
};

export function ChrisCanCook(props) {
  return (
    <div
      className="relative -mt-28 pt-8 bg-cover bg-no-repeat z-40" /*style={{ backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/chris.jpg')` }}*/
    >
      <div className="mx-auto pt-8 lg:pt-20 text-center relative">
        <div className="">
          <Image src={chrisImage} alt="Chris Can Cook" layout="responsive" />
        </div>

        <ChrisText />
      </div>
    </div>
  );
}

export const ChrisCanCookBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <ChrisCanCook {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Content Single Column",
    defaultItem: {},
    fields: [],
  },
};
