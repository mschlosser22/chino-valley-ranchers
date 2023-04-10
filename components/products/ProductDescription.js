import Image from "next/image";
import {
  InlineText,
  InlineTextarea,
  InlineBlocks,
  InlineImage,
  BlocksControls,
  InlineGroup,
} from "react-tinacms-inline";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

import { Button } from "../../components/button/Button";
import { Paragraph } from "../../components/content/paragraph/Paragraph";

export function ProductDescription(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative -mt-12 pb-20 bg-no-repeat bg-cover z-40"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper-edge.png')`,
        }}
      ></div>
      <div
        className="relative pb-20 bg-repeat-y bg-contain"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 pt-12 pb-12 lg:pb-24 relative px-8 xl:px-0 gap-4">
            {/* Heading */}
            <div className="col-span-12">
              <h1 className="text-3xl lg:text-7xl text-chinored font-ultra uppercase tracking-wide lg:mb-4 text-center">
                <InlineText name="name" />
              </h1>
            </div>
            {/* Content */}
            <div className="col-span-12 px-8 lg:px-0 text-center font-lato lg:text-2xl tracking-wide lg:mx-24">
              {props.text &&
                props.text.map((paragraph, index) => (
                  <p key={index} className="mb-8">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-12 relative px-8 xl:px-0 gap-4">
            {/* Product */}
            <div className="col-span-12 lg:col-span-5 pl-0 lg:pl-12">
              {/* Tags/Category */}
              <div className="pb-12 lg:pb-28">
                <h2 className="ml-0 lg:ml-14 text-2xl lg:text-5xl font-ultra tracking-wide pb-8 text-gray-900">
                  <InlineText name="category" />
                </h2>
                <img
                  src="https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/orangeSeperator.jpg"
                  alt="border"
                  className="pb-8"
                />
                {props.tags.map((tag, index) => (
                  <div key={index}>
                    <h3 className="font-ultra tracking-wide ml-0 lg:ml-14 text-gray-900 text-xl lg:text-4xl">
                      {tag}
                    </h3>
                  </div>
                ))}
              </div>
              {/* Button */}
              <Button button={props.button} />
            </div>
            <div className="col-span-12 lg:col-span-7 grid grid-cols-12">
              <div className="relative col-span-12 lg:-top-20 px-12">
                <img
                  src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${props.image.src}`}
                  alt={props.image.alt}
                />
              </div>
              {/* Icons */}
              <div className="flex justify-end h-12 gap-8 w-full col-span-12">
                {props.icons &&
                  props.icons.map((icon, index) => (
                    <img
                      key={index}
                      src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${icon.src}`}
                      alt={icon.alt}
                      className="object-cover h-12"
                    />
                  ))}
              </div>
              {/* Nutrition Info */}
              <div className="col-span-12 text-right flex flex-row-reverse mt-12 mb-12">
                <a
                  className="border-b-4 border-chinoblue lg:text-2xl text-chinoblue font-ultra tracking-wide cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  View Nutrition Info
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="mt-2">
                      <img
                        src={`https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${props.nutrition.src}`}
                        alt={props.nutrition.alt}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-chinored text-base font-medium text-white hover:bg-chinored focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chinored sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export const productDescriptionBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <ProductDescription {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Product Description Component",
    defaultItem: {},
    fields: [
      {
        name: "name",
        label: "Name",
        component: "text",
      },
      {
        name: "text",
        label: "Text",
        component: "list",
        field: {
          component: "textarea",
        },
      },
      {
        name: "category",
        label: "Category",
        component: "text",
      },
      {
        name: "tags",
        label: "Tags",
        component: "list",
        field: {
          component: "text",
        },
      },
      {
        name: "icons",
        label: "Icons",
        component: "group-list",
        fields: [
          {
            name: "image",
            label: "Image",
            component: "image",
          },
          {
            name: "alt",
            label: "Alt Text",
            component: "text",
          },
        ],
      },
      {
        name: "image",
        label: "Image",
        component: "group",
        fields: [
          {
            name: "src",
            label: "src",
            component: "image",
          },
          {
            name: "alt",
            label: "Alt Text",
            component: "text",
          },
        ],
      },
      {
        name: "nutrition",
        label: "Nutrition Facts",
        component: "group",
        fields: [
          {
            name: "src",
            label: "src",
            component: "image",
          },
          {
            name: "alt",
            label: "Alt Text",
            component: "text",
          },
        ],
      },
      {
        name: "button",
        label: "Button",
        component: "group",
        fields: [
          {
            name: "link",
            label: "Link",
            component: "text",
          },
          {
            name: "text",
            label: "Text",
            component: "text",
          },
        ],
      },
    ],
  },
};
