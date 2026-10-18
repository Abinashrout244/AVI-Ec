import React, { useState, useMemo } from "react";
import HeroBanner from "../components/HeroBanner";
import blogList from "../utilis/blogdata";
import { Link } from "react-router-dom";
import { 
  User, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  Clock, 
  Bookmark,
  TrendingUp 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

const Blog = () => {
  const [bdata] = useState(blogList);
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique category tags dynamically or provide fallbacks
  const categories = useMemo(() => {
    const tags = new Set(["All"]);
    bdata.forEach((b) => {
      if (b.category) tags.add(b.category);
    });
    // Defaults if category field isn't explicitly set in json
    if (tags.size <= 1) {
      return ["All", "Trends", "Style Guides", "Tech & Gear", "Lifestyle", "Buying Advice"];
    }
    return Array.from(tags);
  }, [bdata]);

  const filteredPosts = useMemo(() => {
    return bdata.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "All" ||
        item.category?.toLowerCase() === selectedTag.toLowerCase();
      return matchesSearch && matchesTag;
    });
  }, [bdata, searchQuery, selectedTag]);

  const featuredPost = bdata[0];
  const regularPosts = searchQuery || selectedTag !== "All" ? filteredPosts : filteredPosts.slice(1);

  return (
    <div className="bg-[#04060E] min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black">
      <HeroBanner title="Our Journal" page="Blog" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
          >
            <Sparkles size={13} className="text-amber-400" />
            Editorial Stories & Insights
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            The Curated Digest
          </motion.h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base leading-relaxed">
            In-depth guides, trend breakdowns, and behind-the-scenes perspectives from industry specialists.
          </p>
        </div>

        {/* ── Search & Filter Pill Ribbon ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-white/[0.02] border border-white/[0.08] p-3 rounded-2xl backdrop-blur-xl">
          {/* Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const active = selectedTag === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedTag(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 select-none ${
                    active
                      ? "bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.25)]"
                      : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Large Featured Headline Story (Magazine Hero style) ── */}
        {!searchQuery && selectedTag === "All" && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <Link to={`/blog/${featuredPost.id}`} className="group block">
              <div className="relative rounded-[2.2rem] overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-2xl hover:border-amber-400/30 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                
                {/* Media Image half */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#04060E]/30 to-[#04060E] z-10" />
                  <img
                    src={featuredPost.imgUrl}
                    alt={featuredPost.imgAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-400/30">
                      <TrendingUp size={13} />
                      Featured Story
                    </span>
                  </div>
                </div>

                {/* Content half */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-amber-400/90 font-semibold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1.5">
                      <User size={13} />
                      {featuredPost.metaList?.[0]?.text || "Editor's Pick"}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={13} />
                      {featuredPost.metaList?.[1]?.text}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-6">
                    {featuredPost.desc}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock size={13} className="text-amber-400" />
                      <span>5 min read</span>
                    </div>

                    <span className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      Read Full Article
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          </motion.div>
        )}

        {/* ── Magazine Grid ── */}
        <AnimatePresence mode="wait">
          {regularPosts.length > 0 ? (
            <motion.div
              key={`${selectedTag}-${searchQuery}`}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {regularPosts.map((item) => (
                <motion.div variants={itemAnim} key={item.id}>
                  <Link to={`/blog/${item.id}`} className="group block h-full">
                    <div className="h-full flex flex-col rounded-[2rem] overflow-hidden border border-white/[0.08] hover:border-amber-400/30 bg-slate-900/40 backdrop-blur-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-300">
                      
                      {/* Image Block */}
                      <div className="relative overflow-hidden h-60 bg-slate-950">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#04060E] via-transparent to-transparent z-10 opacity-80" />
                        
                        <img
                          src={item.imgUrl}
                          alt={item.imgAlt}
                          loading="lazy"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 z-20 flex items-center justify-between w-[calc(100%-1.75rem)]">
                          <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
                            <Calendar size={11} className="text-amber-300" />
                            {item.metaList?.[1]?.text}
                          </span>

                          <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                            <MessageSquare size={11} className="fill-amber-400/20" />
                            {item.commentCount || 0}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
                          <User size={13} />
                          <span>{item.metaList?.[0]?.text}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-200 leading-snug mb-3 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                          {item.desc}
                        </p>

                        <div className="flex items-center justify-between text-xs text-white font-bold pt-4 border-t border-white/[0.08] mt-auto group-hover:text-amber-300 transition-colors">
                          <span className="flex items-center gap-1.5">
                            Read Story
                            <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </span>
                          <span className="text-[11px] text-slate-500 font-normal">
                            3 min read
                          </span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-4xl mb-3">📰</span>
              <p className="text-white/60 font-semibold text-base">No articles found</p>
              <p className="text-slate-500 text-xs mt-1">Try searching for different keywords or clear the category filter.</p>
              <button
                onClick={() => { setSelectedTag("All"); setSearchQuery(""); }}
                className="mt-5 px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-md"
              >
                Reset Filters
              </button>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Blog;