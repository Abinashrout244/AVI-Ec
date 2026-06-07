import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Contact info cards ────────────────────────────────────────────────────────
const contactCards = [
  {
    icon: "📍",
    title: "Visit Us",
    lines: ["1201 Park Street, Fifth Avenue", "Bangalore, Karnataka 560001"],
    accent: "#c4a882",
    accentRgb: "196,168,130",
    href: "https://maps.google.com",
    cta: "Get Directions",
  },
  {
    icon: "📞",
    title: "Call Us",
    lines: ["+91 8249281685", "+91 1234567890"],
    accent: "#7dd3fc",
    accentRgb: "125,211,252",
    href: "tel:+918249281685",
    cta: "Call Now",
  },
  {
    icon: "✉️",
    title: "Email Us",
    lines: ["support@avistore.in", "admin@avistore.in"],
    accent: "#86efac",
    accentRgb: "134,239,172",
    href: "mailto:support@avistore.in",
    cta: "Send Email",
  },
  {
    icon: "🕐",
    title: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 8:00 PM", "Sunday: 10:00 AM – 5:00 PM"],
    accent: "#f0abfc",
    accentRgb: "240,171,252",
    href: null,
    cta: null,
  },
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "Most orders are delivered within 2–5 business days. Same-day delivery is available in Bangalore, Mumbai, Delhi, and Hyderabad.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a hassle-free 7-day return policy. Simply raise a request from your order page and we'll arrange a pickup.",
  },
  {
    q: "Are the products genuine?",
    a: "Absolutely. We partner directly with verified brands and authorised distributors. Every product is 100% authentic.",
  },
  {
    q: "How do I track my order?",
    a: "Once shipped, you'll receive an SMS and email with a tracking link. You can also track via the Orders section in your account.",
  },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "#",
    colorClass: "hover:bg-sky-500/10 hover:border-sky-500/30 text-sky-300",
    icon: (
      <svg className="size-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.056-4.425 5.056H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    colorClass:
      "hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 text-fuchsia-300",
    icon: (
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    colorClass: "hover:bg-red-500/10 hover:border-red-500/30 text-red-300",
    icon: (
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    colorClass: "hover:bg-blue-500/10 hover:border-blue-500/30 text-blue-300",
    icon: (
      <svg
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
];

// ── FAQ Item ─────────────────────────────────────────────────────────────────
const FaqItem = ({ faq, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="glass-panel rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-white font-medium text-[14px] leading-snug">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 size-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 text-sm font-bold"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-6 pb-5 text-white/45 text-[13px] leading-relaxed border-t border-white/5 pt-4">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── MAIN ─────────────────────────────────────────────────────────────────────
const Contact = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const sub = form.sub.value;
    const message = form.message?.value;

    if (!name || !email || !number || !sub) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => navigate("/"), 3000);
    }, 1800);
  };

  // Shared input class
  const inputCls =
    "w-full bg-white/[0.03] border border-white/8 rounded-2xl px-5 py-3.5 text-white text-[14px] placeholder:text-white/25 outline-none focus:border-purple-400/40 focus:bg-white/[0.05] transition-all duration-300";

  return (
    <div className="min-h-screen">
      <HeroBanner page="Contact Us" title="Get In Touch" />

      {/* ── CONTACT INFO CARDS ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel rounded-2xl p-7 flex flex-col gap-5 group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, rgba(${card.accentRgb},0.08), transparent 70%)`,
                }}
              />
              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                }}
              />

              <div
                className="size-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: `rgba(${card.accentRgb}, 0.1)`,
                  border: `1px solid rgba(${card.accentRgb}, 0.2)`,
                }}
              >
                {card.icon}
              </div>

              <div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {card.title}
                </h3>
                {card.lines.map((line, j) => (
                  <p
                    key={j}
                    className="text-white/45 text-[13px] leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {card.href && (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                  style={{ color: card.accent }}
                >
                  {card.cta}
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MAP + FORM ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-purple-400/70 font-semibold mb-2">
              — Find Us Here
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Our Location
            </h2>
          </div>

          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Map overlay tint */}
            <div className="absolute inset-0 bg-[#03050c]/20 pointer-events-none z-10 mix-blend-color" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.3685061566284!2d85.93193057501024!3d20.28500848118472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a197555eca1853d%3A0x60083b2363b95fc2!2sOXFORD%20COLLEGE%20OF%20ENGINEERING%20%26%20MANAGEMENT!5e0!3m2!1sen!2sin!4v1764078506794!5m2!1sen!2sin"
              className="w-full h-[380px] md:h-[460px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AVI Store Location"
              style={{ filter: "grayscale(30%) contrast(1.05)" }}
            />
          </div>

          {/* Social links */}
          <div className="glass-panel rounded-2xl p-5 flex items-center justify-between">
            <p className="text-white/40 text-[12px] uppercase tracking-widest">
              Follow Us
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={s.label}
                  className="size-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `rgba(${s.color === "#7dd3fc" ? "125,211,252" : s.color === "#f0abfc" ? "240,171,252" : s.color === "#fca5a5" ? "252,165,165" : "147,197,253"},0.1)`,
                    border: `1px solid rgba(${s.color === "#7dd3fc" ? "125,211,252" : s.color === "#f0abfc" ? "240,171,252" : s.color === "#fca5a5" ? "252,165,165" : "147,197,253"},0.2)`,
                    color: s.color,
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-purple-400/70 font-semibold mb-2">
              — Drop a Message
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Send Us a Message
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-5 min-h-[400px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="size-20 rounded-full flex items-center justify-center text-4xl"
                  style={{
                    background: "rgba(134,239,172,0.12)",
                    border: "1px solid rgba(134,239,172,0.3)",
                  }}
                >
                  ✓
                </motion.div>
                <h3 className="font-serif text-2xl text-white">
                  Message Sent!
                </h3>
                <p className="text-white/45 text-[13px] max-w-xs">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
                <p className="text-white/20 text-[11px]">
                  Redirecting to home...
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="glass-panel rounded-3xl p-7 md:p-8 flex flex-col gap-5"
                style={{
                  boxShadow:
                    "0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/35 text-[11px] uppercase tracking-widest pl-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Abinash Rout"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/35 text-[11px] uppercase tracking-widest pl-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/35 text-[11px] uppercase tracking-widest pl-1">
                      Phone *
                    </label>
                    <input
                      type="text"
                      name="number"
                      required
                      placeholder="+91 8249281685"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/35 text-[11px] uppercase tracking-widest pl-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="sub"
                      required
                      placeholder="Order issue, partnership..."
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/35 text-[11px] uppercase tracking-widest pl-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Privacy note */}
                <p className="text-white/20 text-[11px] leading-relaxed">
                  By submitting this form you agree to our{" "}
                  <span className="text-purple-400/60 cursor-pointer hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </span>
                  .
                </p>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="relative w-full py-4 rounded-2xl font-bold text-[13px] uppercase tracking-[0.2em] text-[#0a0c10] overflow-hidden"
                  style={{
                    background: loading
                      ? "rgba(255,255,255,0.1)"
                      : "linear-gradient(135deg, #f0abfc, #c084fc)",
                    boxShadow: loading
                      ? "none"
                      : "0 12px 30px rgba(240,171,252,0.3)",
                    color: loading ? "rgba(255,255,255,0.4)" : "#0a0c10",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="size-4 border-2 border-white/30 border-t-white/70 rounded-full inline-block"
                      />
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-16 pb-24">
        <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] uppercase tracking-[0.4em] text-amber-400/70 font-semibold">
            — FAQ
          </p>
          <h2 className="font-serif text-4xl text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} i={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
