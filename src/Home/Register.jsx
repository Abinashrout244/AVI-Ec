import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Regist from "../assets/images/Register.jpg";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap";

const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";
const ease = [0.16, 1, 0.3, 1];

const FIELDS = [
  {
    type: "text",
    name: "name",
    label: "Full name",
    placeholder: "Your full name",
    autoComplete: "name",
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
  {
    type: "tel",
    name: "phone",
    label: "Phone",
    placeholder: "+91",
    autoComplete: "tel",
  },
];

const Register = () => {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONT_LINK;
    document.head.appendChild(l);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send form data to your backend / Supabase here
    setSent(true);
  };

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      className={`${sans} relative isolate overflow-hidden bg-[#0d0910] text-[#f3ecf4] outline outline-1 -outline-offset-1 outline-white/10`}
    >
      {/* Photograph, graded into the dark */}
      <img
        src={Regist}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover saturate-[0.85]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d0910] via-[#0d0910]/85 to-[#0d0910]/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d0910]/80 via-transparent to-[#0d0910]/40" />

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-12 px-6 py-16 md:px-12 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        {/* ── Left: copy ── */}
        <motion.div {...reveal(0)} className="lg:col-span-7">
          <p className="mb-7 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-[#d9b55f]">
            <span className="h-px w-10 bg-[#d9b55f]/60" />
            Limited time offer
          </p>

          <h2
            className={`${serif} text-[clamp(2.8rem,6.4vw,5.6rem)] font-normal leading-[0.95] tracking-[-0.025em]`}
          >
            Free workshop on
            <br />
            <span className="italic text-[#c4a1f5]">Advanced Sales</span>
          </h2>

          <p className="mt-7 max-w-md text-[16px] font-light leading-relaxed text-white/65">
            Join thousands of sellers mastering the art of e-commerce. One day.
            Free. Life-changing.
          </p>

          {/* Meta */}
          <dl className="mt-10 flex flex-wrap items-stretch gap-y-5 border-y border-white/10 py-5 sm:inline-flex">
            <div className="pr-8">
              <dt className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/40">
                Date
              </dt>
              <dd className={`${serif} mt-1.5 text-[1.5rem] leading-none`}>
                April 20, 2025
              </dd>
            </div>
            <div className="border-l border-white/10 pl-8">
              <dt className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/40">
                Time
              </dt>
              <dd className={`${serif} mt-1.5 text-[1.5rem] leading-none`}>
                10:00 AM – 6:00 PM
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-[12px] font-light tracking-wide text-white/50">
            <span className="font-medium text-white/85">2,400+</span> already
            registered
          </p>
        </motion.div>

        {/* ── Right: form ── */}
        <motion.div {...reveal(0.15)} className="lg:col-span-5">
          <div className="ml-auto w-full max-w-md border border-white/15 bg-[#0d0910]/85 p-7 sm:p-9">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
              Reserve your seat
            </p>
            <h3
              className={`${serif} mt-3 text-[2rem] leading-none tracking-[-0.01em]`}
            >
              Register <span className="italic text-[#c4a1f5]">now</span>
            </h3>
            <p className="mt-3 text-[13px] font-light text-white/50">
              Seats are filling fast.
            </p>

            {sent ? (
              <div
                role="status"
                className="mt-10 border-t border-white/10 pt-8"
              >
                <p
                  className={`${serif} text-[1.7rem] italic leading-tight text-[#c4a1f5]`}
                >
                  Thank you.
                </p>
                <p className="mt-2 text-[13px] font-light leading-relaxed text-white/60">
                  Your seat is reserved. We'll email you the details shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label
                      htmlFor={`reg-${f.name}`}
                      className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/45"
                    >
                      {f.label}
                    </label>
                    <input
                      id={`reg-${f.name}`}
                      type={f.type}
                      name={f.name}
                      required={f.name !== "phone"}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      className="mt-1.5 w-full border-b border-white/20 bg-transparent py-2.5 text-[15px] font-light text-white outline-none transition-colors duration-500 placeholder:text-white/25 focus:border-[#c4a1f5]"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="group mt-2 flex w-full items-center justify-center gap-3 bg-[#d9b55f] py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d0910] transition-colors duration-500 hover:bg-[#e8c97a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4a1f5]"
                >
                  Claim my free seat
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 transition-transform duration-500 group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 12h17M14 6l6 6-6 6" />
                  </svg>
                </button>
              </form>
            )}

            <p className="mt-6 text-[11px] font-light tracking-wide text-white/35">
              No credit card required · 100% free
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
