import React, { useState } from "react";
import img from "../assets/images/shop/01.jpg";

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Ganelon Boileau",
    date: "Jun 10, 2024",
    rating: 5,
    title: "Exceeded my expectations entirely!",
    desc: "The build quality and precision are top tier. Feels extremely premium in hand, packaged with care, and arrived two days early. Worth every rupee.",
    verified: true,
    helpful: 34,
  },
  {
    id: 2,
    name: "Morgana Cailot",
    date: "May 28, 2024",
    rating: 5,
    title: "Best purchase in this price range",
    desc: "Seamless finish, clean aesthetic, and matches the product images 100%. Highly recommended for anyone looking for authentic quality.",
    verified: true,
    helpful: 19,
  },
  {
    id: 3,
    name: "Telford Bois",
    date: "Apr 14, 2024",
    rating: 4,
    title: "Solid quality, slightly delayed shipping",
    desc: "The product itself is a 5/5 without question. Delivery took a little longer than expected, but customer support was responsive.",
    verified: true,
    helpful: 8,
  },
  {
    id: 4,
    name: "Avi Sharma",
    date: "Mar 02, 2024",
    rating: 5,
    title: "Unbeatable value and craftsmanship",
    desc: "Used daily for over a month now. Durable, sleek, and performs effortlessly. Would definitely order again from this seller.",
    verified: true,
    helpful: 42,
  },
];

const RATING_BREAKDOWN = [
  { star: 5, pct: 78 },
  { star: 4, pct: 14 },
  { star: 3, pct: 5 },
  { star: 2, pct: 2 },
  { star: 1, pct: 1 },
];

const StarRating = ({ rating, size = "w-4 h-4" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        viewBox="0 0 20 20"
        className={`${size} ${s <= rating ? "fill-amber-400 text-amber-400" : "fill-white/10 text-white/10"}`}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewListpage = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);

  // New review form states
  const [newName, setNewName] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDesc.trim()) return;

    const created = {
      id: Date.now(),
      name: newName,
      date: "Just now",
      rating: newRating,
      title: newTitle || "Verified Customer Review",
      desc: newDesc,
      verified: true,
      helpful: 0,
    };

    setReviews([created, ...reviews]);
    setNewName("");
    setNewTitle("");
    setNewDesc("");
    setNewRating(5);
    setShowForm(false);
  };

  const handleHelpful = (id) => {
    if (helpfulVotes[id]) return;
    setHelpfulVotes((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Tab Navigation Header */}
      <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-white/10 bg-white/[0.02]">
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            activeTab === "reviews"
              ? "bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.3)] font-bold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Customer Reviews
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
            activeTab === "reviews" ? "bg-slate-950 text-amber-300" : "bg-white/10 text-white"
          }`}>
            {reviews.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("desc")}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            activeTab === "desc"
              ? "bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.3)] font-bold"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Product Details & Specs
        </button>
      </div>

      {/* ── TAB 1: REVIEWS ── */}
      {activeTab === "reviews" && (
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-white/10">
            
            {/* Left: Overall Rating Box */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <h3 className="text-sm uppercase tracking-wider font-bold text-slate-300">Customer Ratings</h3>
              
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-white">4.8</span>
                <div className="flex flex-col gap-1">
                  <StarRating rating={5} size="w-4 h-4" />
                  <span className="text-xs text-slate-400">Based on {reviews.length} ratings</span>
                </div>
              </div>

              {/* Star Percentage Bars */}
              <div className="flex flex-col gap-2 mt-2">
                {RATING_BREAKDOWN.map((b) => (
                  <div key={b.star} className="flex items-center gap-3 text-xs">
                    <span className="w-10 text-slate-400 font-medium">{b.star} star</span>
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-slate-400 font-medium">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Review this product CTA */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Review this product</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Share your genuine experience with other customers to help them make confident buying decisions.
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95"
                >
                  {showForm ? "Cancel Review" : "Write a Customer Review"}
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Review Submission Form */}
          {showForm && (
            <form onSubmit={handleAddReview} className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.06)] flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Submit Your Review</h4>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-300 font-medium">Your Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className={`w-5 h-5 ${
                          star <= newRating ? "fill-amber-400 text-amber-400" : "fill-white/20 text-white/20"
                        }`}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="Headline / Summary (e.g., Highly Recommended!)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-amber-400"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Write your feedback here... *"
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-amber-400"
              />

              <button
                type="submit"
                className="w-fit self-end px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)]"
              >
                Post Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="flex flex-col divide-y divide-white/[0.08]">
            {reviews.map((r) => (
              <div key={r.id} className="py-6 flex flex-col gap-3 group">
                
                {/* Author Info & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/40 to-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white uppercase">
                      {r.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{r.name}</p>
                      <p className="text-[10px] text-slate-400">{r.date}</p>
                    </div>
                  </div>

                  {r.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>

                {/* Stars & Title */}
                <div className="flex items-center gap-2.5 mt-1">
                  <StarRating rating={r.rating} size="w-3.5 h-3.5" />
                  <h5 className="text-xs sm:text-sm font-bold text-white">{r.title}</h5>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {r.desc}
                </p>

                {/* Helpful Count Button */}
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleHelpful(r.id)}
                    disabled={helpfulVotes[r.id]}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[11px] font-medium transition-all ${
                      helpfulVotes[r.id]
                        ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <span>👍</span> Helpful ({r.helpful})
                  </button>
                  <span className="text-slate-600">|</span>
                  <button type="button" className="text-[11px] hover:text-white transition-colors">
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: SPECS & DESCRIPTION ── */}
      {activeTab === "desc" && (
        <div className="p-6 md:p-8 flex flex-col gap-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-bold text-white">Crafted for Excellence</h4>
              <p className="text-slate-400 leading-relaxed">
                Every component is precision-engineered to provide maximum functionality and lasting resilience. Designed for discerning owners who demand durability without compromising on visual refinement.
              </p>

              {/* Spec Sheet Table */}
              <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02] mt-2">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    {[
                      ["Item Material", "Reinforced Composite & Aluminum"],
                      ["Warranty Period", "1 Year Comprehensive"],
                      ["Country of Origin", "India"],
                      ["Item Dimensions", "24.5 × 12.0 × 8.5 cm"],
                      ["Item Weight", "420 Grams"],
                    ].map(([key, val], i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                        <td className="py-2.5 px-4 font-semibold text-slate-400 w-1/3 bg-white/[0.01]">{key}</td>
                        <td className="py-2.5 px-4 text-white font-medium">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center p-4">
              <img
                src={img}
                alt="Product in detail"
                className="max-h-[300px] object-contain rounded-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Bullet Key Highlights */}
          <div className="border-t border-white/10 pt-6">
            <h5 className="text-sm uppercase tracking-wider font-bold text-white mb-4">Key Product Highlights</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
              {[
                "Scratch-resistant high-grade exterior finish",
                "Ergonomic geometry designed for prolonged everyday use",
                "Eco-conscious recyclable packaging",
                "Meets international regulatory and durability standards",
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span className="text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default ReviewListpage;