import {
  InlineText,
  InlineTextarea,
  InlineImage,
  BlocksControls,
  InlineGroup,
} from "react-tinacms-inline";

export function SubheadingAlt(props) {
  return (
    <div
      className="relative pb-4 lg:pb-12 bg-repeat-y bg-cover"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
      }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-2 px-8 xl:px-0">
          <BlocksControls index={props.index}>
            <p className="text-xl lg:text-3xl text-gray-900 tracking-wide">
              <InlineTextarea name="subheading" />
            </p>
          </BlocksControls>
        </div>
      </div>
    </div>
  );
}
