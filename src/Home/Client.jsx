import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fashion Blogger · Mumbai",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "AVI Store completely changed how I shop online. The curation is incredible — every product feels thoughtfully selected. Delivery was same-day!",
    rating: 5,
    country: "🇮🇳",
    purchase: "Aesthetic Tote Bag",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Tech Enthusiast · Bangalore",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Got my Samsung S25 Ultra in 18 hours. The packaging was premium and the price was unbeatable. Already told all my friends about this store.",
    rating: 5,
    country: "🇮🇳",
    purchase: "Samsung S25 Ultra",
  },
  {
    id: 3,
    name: "Ananya Singh",
    role: "Beauty Creator · Delhi",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The beauty section is a dream. Authentic products, fast delivery, and the return process was so easy when one item didn't work for me.",
    rating: 5,
    country: "🇮🇳",
    purchase: "Glow Serum Kit",
  },
  {
    id: 4,
    name: "Kiran Patel",
    role: "Entrepreneur · Ahmedabad",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    quote: "I became a merchant partner and my sales tripled in 3 months. The seller tools and analytics are top-notch. Best decision ever.",
    rating: 5,
    country: "🇮🇳",
    purchase: "Merchant Partner",
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="size-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const Client = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 px-2 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center flex flex-col gap-3 mb-14"
      >
        <p className="text-amber-400 text-[11px] uppercase tracking-[0.4em] font-semibold">
          — Customer Stories
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-white">
          Loved by{" "}
          <span className="italic text-white/40 font-light">60,000+</span>{" "}
          Customers
        </h2>
        <p className="text-white/40 text-sm max-w-md mx-auto">
          Real stories from real shoppers across India
        </p>
      </motion.div>

      {/* Testimonials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => setActive(i)}
            className={`glass-panel rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300 ${
              active === i ? "border-amber-400/30 shadow-amber-400/10 shadow-xl" : "border-white/5"
            }`}
          >
            {/* Stars */}
            <StarRating count={t.rating} />

            {/* Quote */}
            <p className="text-white/70 text-[14px] leading-relaxed italic">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="size-11 rounded-full object-cover ring-2 ring-amber-400/20"
                />
                <div>
                  <p className="text-white font-semibold text-[13px] flex items-center gap-1.5">
                    {t.name} <span className="text-base">{t.country}</span>
                  </p>
                  <p className="text-white/35 text-[11px]">{t.role}</p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-amber-400/60 border border-amber-400/20 px-2.5 py-1 rounded-full">
                Purchased: {t.purchase}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-14 glass-panel rounded-2xl p-6 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            ["60,000+", "Verified Reviews"],
            ["4.9 / 5", "Average Rating"],
            ["98%", "Would Recommend"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-amber-400 font-bold text-2xl md:text-3xl font-serif">{num}</p>
              <p className="text-white/40 text-[11px] uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Client;
