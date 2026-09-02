import { useState } from "react";
import { BlocksControls } from "react-tinacms-inline";

// Forminit (formerly Getform.io) form endpoint. Set NEXT_PUBLIC_FORMINIT_FORM_ID
// to the Form ID from the Pro account; falls back to the legacy Getform id,
// which Forminit still honours on the new domain.
const FORM_ID =
  process.env.NEXT_PUBLIC_FORMINIT_FORM_ID ||
  "51bccb03-3af0-4a69-bc96-f636c4b96cb1";
const FORM_ACTION = `https://forminit.com/f/${FORM_ID}`;

export function ContactForm(props) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.target;
    setStatus("sending");

    try {
      const formData = new FormData(form);

      const response = await fetch(FORM_ACTION, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Forminit responded ${response.status}`);

      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <div
        className="w-full relative -mt-12 -mb-12 z-20 bg-contain bg-repeat-y"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmfgntgym/image/fetch/f_auto/q_auto:eco/https://www.chinovalleyranchers.com//images/bg-paper.png')`,
        }}
      >
        <div className="max-w-5xl mx-auto relative mb-8">
          <div className="grid grid-cols-12 relative">
            <div className="col-span-12 pb-12 px-8 lg:px-0 pt-12">
              {/* Address */}
              {props.address.map((item, index) => (
                <p
                  key={index}
                  className="text-chinoblue font-ultra text-xl lg:text-4xl text-center break-words lg:break-normal"
                >
                  {item}
                </p>
              ))}
              <p className="text-chinoblue font-ultra text-xl lg:text-4xl text-center break-words lg:break-normal">
                <a href="mailto:info@chinovalleyranchers.com">
                  info@chinovalleyranchers.com
                </a>
              </p>
            </div>

            <div className="col-span-12 pb-12 grid grid-cols-12 px-8 lg:px-0">
              {/* Form */}
              <form
                action={FORM_ACTION}
                method="POST"
                onSubmit={handleSubmit}
                className="col-span-12 grid grid-cols-1 gap-y-6"
              >
                {/* Honeypot: hidden from humans, harvested by bots. */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="fi-sender-fullName"
                      id="name"
                      required
                      autoComplete="name"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-chinoblue focus:border-chinoblue border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="fi-sender-email"
                      id="email"
                      required
                      autoComplete="email"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-chinoblue focus:border-chinoblue border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="subject"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="fi-text-subject"
                      id="subject"
                      autoComplete="subject"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-chinoblue focus:border-chinoblue border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="message"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="fi-text-message"
                      rows={10}
                      required
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="col-span-1 text-center mt-12 mb-24">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="px-5 py-2 bg-chinored text-white uppercase font-din font-bold text-xl lg:text-4xl rounded-lg tracking-wide cursor-pointer disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Submit"}
                  </button>

                  {status === "sent" && (
                    <p
                      role="status"
                      className="mt-6 text-chinoblue font-din text-xl"
                    >
                      Thanks for reaching out — we&apos;ll be in touch soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p
                      role="alert"
                      className="mt-6 text-chinored font-din text-xl"
                    >
                      Something went wrong. Please try again, or email us at{" "}
                      <a
                        className="underline"
                        href="mailto:info@chinovalleyranchers.com"
                      >
                        info@chinovalleyranchers.com
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const contactFormBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <ContactForm {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Contact Form",
    defaultItem: {},
    fields: [],
  },
};
