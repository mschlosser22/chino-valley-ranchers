import Image from "next/image";
import { Button } from "../button/Button";

const footer_content = {
  column_two: [
    {
      url: "/why-organic",
      text: "Our Story",
    },
    {
      url: "/products",
      text: "Our Eggs",
    },
    {
      url: "/recipes",
      text: "Recipes",
    },
    {
      url: "/news",
      text: "News",
    },
    {
      url: "/being-humane",
      text: "Being Humane",
    },
  ],
  column_three: [
    {
      url: "/contact",
      text: "Contact Cvr",
    },
    {
      url: "#",
      text: "331 W. Citrus Street, Colton, CA 92324",
    },
    {
      url: "#",
      text: "(800) 354-4503",
    },
    {
      url: "#",
      text: "info@chinovalleyranchers.com",
    },
    {
      url: "https://www.bigchiefcreative.com",
      text: "WEBSITE BY BCCM",
    },
  ],
};

export function Footer(props) {
  return (
    <footer
      className="bg-chinodarkblue min-h-36"
      aria-labelledby="footerHeading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-12 lg:gap-6 pt-16">
          <div className="col-span-12 lg:col-span-4 lg:pl-0 pl-8">
            <Image
              src="/images/logo.png"
              height={121}
              width={197}
              alt="Chino Valley Ranchers"
            />
            <div className="gap-2 flex lg:items-center pt-16 pb-12 text-center lg:pl-5">
              <a
                href="https://www.instagram.com/chinovalleyranchers/"
                className="cursor-pointer"
                target="_blank"
              >
                <div className="h-[28px]">
                  <Image
                    src="/images/instagram.png"
                    height={33}
                    width={32}
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
                    height={33}
                    width={32}
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
                    height={33}
                    width={32}
                    alt="Chino Valley Ranchers"
                  />
                </div>
              </a>
              <a
                href="https://twitter.com/ChinoValleyEggs"
                className="cursor-pointer"
                target="_blank"
              >
                <div className="h-[28px]">
                  <Image
                    src="/images/twitter.png"
                    height={33}
                    width={32}
                    alt="Chino Valley Ranchers"
                  />
                </div>
              </a>
              <a
                href="https://www.tiktok.com/@chinovalleyranchers?lang=en"
                className="cursor-pointer"
                target="_blank"
              >
                <div className="h-[28px]">
                  <Image
                    src="/images/tiktok.png"
                    height={33}
                    width={32}
                    alt="Chino Valley Ranchers"
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pl-0 pl-8 text-base">
            <ul>
              {footer_content.column_two.map((item, index) => (
                <li
                  key={index}
                  className="text-white text-5 uppercase font-din tracking-wider pb-4"
                >
                  <a href={item.url}>{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-4 md:pt-8 pl-8 lg:pl-0 lg:pt-0 text-base">
            <ul>
              {footer_content.column_three.map((item, index) => (
                <li
                  key={index}
                  className="text-white text-5 uppercase tracking-wider font-din pb-4"
                >
                  <a href={item.url}>{item.text}</a>
                </li>
              ))}
            </ul>
            <button className="w-1/2 mt-10 font-din tracking-wider text-lg mb-52 uppercase bg-chinoorange text-chinodarkblue border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium">
              Store Locator
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
