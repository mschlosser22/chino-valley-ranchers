import Image from "next/image";
import { Fragment, useState, useContext, useEffect } from "react";
import { Disclosure, Dialog, Menu, Transition } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import { useCMS } from "tinacms";

import { TinaCMS, TinaProvider } from "tinacms";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Nav(props) {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setSmall(window.pageYOffset > 0));
    }
  }, []);

  const cms = useCMS();
  //console.log(`CMS is enabled: ${cms.enabled}`)

  const [open, setOpen] = useState(false);

  //const {navigation} = props
  const navigation = [
    {
      name: "Our Story",
      href: "/why-organic",
      current: false,
      children: [
        { name: "Why Organic Matters", href: "/why-organic" },
        { name: "It Starts With Our Feed", href: "/about-feed" },
        { name: "Pasture Raised Eggs", href: "/about-pasture-raised" },
        { name: "Our Family", href: "/our-family" },
        { name: "Careers", href: "/opportunities" },
      ],
    },
    { name: "Our Eggs", href: "/products", current: false },
    { name: "Recipes", href: "/recipes", current: false },
    { name: "News", href: "/news", current: false },
    { name: "Being Humane", href: "/being-humane", current: false },
    { name: "Contact CVR", href: "/contact", current: false },
    {
      name: "Store Locator",
      href: "/store-locator",
      current: false,
      primary: true,
    },
  ];

  return (
    <div className="relative">
      <Disclosure
        as="nav"
        className={`bg-gray-800 bg-opacity-100 lg:bg-opacity-80 z-50 ${
          cms.enabled ? "relative" : "fixed"
        } w-full`}
      >
        {({ open }) => (
          <div>
            <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden z-50">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div
                  className={`hidden lg:block z-50 min-w-[237px] ${
                    small ? "pt-2" : "pt-28"
                  }`}
                >
                  <a href="/">
                    <Image
                      src="/images/logo.png"
                      height={`${small ? 60 : 161}`}
                      width={`${small ? 88 : 237}`}
                      alt="Chino Valley Ranchers"
                      className="transition transform duration-500 ease-in-out"
                    />
                  </a>
                </div>

                <div className="absolute inset-0 flex justify-center items-center z-0 lg:hidden">
                  <a href="/">
                    <Image
                      src="/images/logo.png"
                      height={52}
                      width={77}
                      alt="Chino Valley Ranchers"
                    />
                  </a>
                </div>

                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden lg:block lg:ml-6">
                    <div className="flex space-x-1">
                      {navigation.map((item) =>
                        item.children && item.children.length ? (
                          <Menu
                            key={item.name}
                            as="div"
                            className="relative text-left z-50"
                          >
                            {({ open }) => (
                              <div>
                                <Menu.Button className="flex items-center text-sm font-medium text-gray-900 rounded-md focus:outline-none">
                                  <span
                                    className={`px-3 py-2 rounded-md text-sm font-medium text-white uppercase ${
                                      item.current
                                        ? "bg-gray-900"
                                        : "hover:bg-gray-700 hover:text-white"
                                    } ${
                                      item.primary
                                        ? "bg-yellow-500 text-gray-700"
                                        : null
                                    }`}
                                  >
                                    {item.name}
                                  </span>
                                </Menu.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items
                                    static
                                    className="origin-top-right absolute z-30 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                  >
                                    <div className="py-1">
                                      {item.children.map((child) => (
                                        <Menu.Item key={child.name}>
                                          {({ active }) => (
                                            <a
                                              href={child.href}
                                              className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                              )}
                                            >
                                              {child.name}
                                            </a>
                                          )}
                                        </Menu.Item>
                                      ))}
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </div>
                            )}
                          </Menu>
                        ) : (
                          <a
                            key={item.name}
                            href={item.href}
                            className={`px-3 py-2 rounded-md text-sm font-medium text-white uppercase ${
                              item.current
                                ? "bg-gray-900"
                                : "hover:bg-gray-700 hover:text-white"
                            } ${
                              item.primary
                                ? "bg-yellow-500 text-gray-700"
                                : null
                            }`}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                  <div className="gap-2 hidden lg:flex lg:items-center">
                    <a
                      href="https://www.instagram.com/chinovalleyranchers/"
                      className="cursor-pointer"
                      target="_blank"
                    >
                      <div className="h-[28px]">
                        <Image
                          src="/images/instagram.png"
                          height={28}
                          width={28}
                          alt="Chino Valley Ranchers"
                        />
                      </div>
                    </a>

                    <a
                      href="https://www.youtube.com/channel/UCfpxQ8Bri4ZVNE__73DD36A"
                      className="cursor-pointer"
                      target="_blank"
                    >
                      <div className="h-[28px]">
                        <Image
                          src="/images/youtube.png"
                          height={28}
                          width={28}
                          alt="Chino Valley Ranchers"
                        />
                      </div>
                    </a>
                    <a
                      href="https://www.facebook.com/Chino-Valley-Ranchers-Organic-and-Specialty-Eggs-110085262344097/"
                      className="cursor-pointer"
                      target="_blank"
                    >
                      <div className="h-[28px]">
                        <Image
                          src="/images/facebook.png"
                          height={28}
                          width={28}
                          alt="Chino Valley Ranchers"
                        />
                      </div>
                    </a>
                    {/* <a
                      href="https://twitter.com/ChinoValleyEggs"
                      className="cursor-pointer"
                      target="_blank"
                    >
                      <div className="h-[28px]">
                        <Image
                          src="/images/twitter.png"
                          height={28}
                          width={28}
                          alt="Chino Valley Ranchers"
                        />
                      </div>
                    </a> */}
                    <a
                      href="https://www.tiktok.com/@chinovalleyranchers?lang=en"
                      className="cursor-pointer"
                      target="_blank"
                    >
                      <div className="h-[28px]">
                        <Image
                          src="/images/tiktok.png"
                          height={28}
                          width={28}
                          alt="Chino Valley Ranchers"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) =>
                  item.children && item.children.length ? (
                    <div key={item.name}>
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-1 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                      {item.children.map((child, index) => (
                        <a
                          key={item.name}
                          href={child.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block px-3 py-1 rounded-md text-base font-medium pl-8"
                          )}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-1 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
