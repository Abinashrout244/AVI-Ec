import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Calendar, 
  User, 
  MessageSquare, 
  Play,
  ArrowLeft,
  Clock,
  Bookmark,
  Share2,
  Check,
  Sparkles,
  Type
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook01Icon,
  InstagramIcon,
  TwitterIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";

import blogList from "../utilis/blogdata";
import img from "../assets/images/blog/single/01.jpg";
import Popularpost from "../Shop/Popularpost";
import TagList from "../Shop/TagList";

const BlogPage = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState("normal"); // 'normal' | 'large'

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const post = useMemo(() => {
    return blogList.find((item) => String(item.id) === String(id));
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#03050C] text-white gap-4">
        <h2 className="text-2xl font-bold">Article not found.</h2>
        <Link 
          to="/blog" 
          className="text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#03050C] min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black">
      
      {/* ── Top Reading Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 origin-left z-50 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.06]">
          <Link 
            to="/blog" 
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Journal</span>
          </Link>

          {/* Quick Reader Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFontSize((prev) => (prev === "normal" ? "large" : "normal"))}
              title="Toggle reading text size"
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                fontSize === "large" 
                  ? "bg-amber-400/10 border-amber-400/30 text-amber-300" 
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Type size={14} />
              <span className="font-bold">{fontSize === "large" ? "120%" : "100%"}</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              title="Bookmark article"
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked 
                  ? "bg-amber-400 text-slate-950 border-amber-400" 
                  : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Bookmark size={15} className={isBookmarked ? "fill-slate-950" : ""} />
            </button>

            <button
              onClick={handleCopyLink}
              title="Copy article link"
              className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white transition-all flex items-center gap-1 text-xs"
            >
              {copied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
              {copied && <span className="text-[10px] text-emerald-400 font-semibold">Copied!</span>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Main Editorial Content ── */}
          <motion.article 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8"
          >
            {/* Header Meta */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="bg-amber-400/10 text-amber-300 border border-amber-400/25 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(251,191,36,0.12)]">
                  {post?.category || "Insight"}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock size={13} className="text-amber-400" />
                  4 min read
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
                {post?.title}
              </h1>

              {/* Author & Timestamp Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-white/[0.08] mt-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-[1.5px] shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                    <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center">
                      <User size={18} className="text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">{post?.metaList?.[0]?.text || "Senior Contributor"}</p>
                    <p className="text-[11px] text-slate-400">Staff Editor & Analyst</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-amber-400" />
                    {post?.metaList?.[1]?.text}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-amber-400" />
                    {post?.commentCount || 0} Comments
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image Stage */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <img
                src={post?.imgUrl}
                alt={post?.imgAlt || post?.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03050C]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Key Takeaways Callout Card */}
            <div className="mb-10 p-5 rounded-2xl bg-amber-400/[0.04] border border-amber-400/20 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2.5">
                <Sparkles size={14} />
                Executive Summary
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">›</span>
                  High-converting layouts prioritize frictionless navigation and typographic clarity.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">›</span>
                  Cohesive color schemes build persistent brand recall and lower cognitive strain.
                </li>
              </ul>
            </div>

            {/* Reading Body */}
            <div className={`prose prose-invert max-w-none transition-all duration-200 ${
              fontSize === "large" 
                ? "text-base sm:text-lg leading-[2.1]" 
                : "text-sm sm:text-base leading-[1.9]"
            } text-slate-300`}>
              
              {/* Drop-cap styled opener */}
              <p className="first-letter:text-5xl first-letter:font-black first-letter:text-amber-400 first-letter:float-left first-letter:mr-3 first-letter:leading-none text-slate-200 font-medium">
                {post?.desc || "Serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart."}
              </p>

              <p>
                In an era dominated by superficial impressions, long-term product loyalty is earned through micro-craftsmanship. Every interaction—from how smoothly an image scales on hover to the subtle contrast of a secondary text caption—signals intent and respect for the reader's attention.
              </p>

              {/* Styled Pull-Quote */}
              <blockquote className="my-10 relative p-6 sm:p-8 rounded-2xl bg-white/[0.03] border-l-4 border-amber-400 shadow-lg">
                <span className="absolute top-2 left-4 text-5xl font-serif text-amber-400/10 pointer-events-none">“</span>
                <p className="text-lg sm:text-xl font-serif italic text-white leading-relaxed m-0 relative z-10">
                  "Simplicity is not the absence of clutter, that's a consequence of simplicity. Simplicity is somehow essentially describing the purpose and place of an object and product."
                </p>
                <cite className="block mt-4 text-xs font-bold text-amber-400 uppercase tracking-widest not-italic">
                  — Design Philosophy Editorial Team
                </cite>
              </blockquote>

              <p>
                When establishing scalable systems, companies frequently mistake complexity for rigor. Modular tokens, consistent vertical rhythm, and empathetic color boundaries consistently yield higher conversion than cluttered feature sets.
              </p>

              {/* Media Video Embed Container */}
              <div className="relative w-full rounded-2xl overflow-hidden my-10 group border border-white/10 shadow-2xl aspect-video bg-slate-900">
                <img 
                  src={img} 
                  alt="Post supporting media" 
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-300" 
                />
                <a
                  href="https://youtu.be/IaZzh7pI5DE?si=1GL_rv3piLEW5jFR"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(251,191,36,0.45)] border border-amber-300"
                  >
                    <Play size={24} fill="currentColor" />
                  </motion.div>
                </a>
              </div>

              <p>
                As digital products continue to converge toward standardized frameworks, true differentiation relies on narrative pacing and emotional coherence. When design decisions support the narrative rather than fighting for spotlight, the whole ecosystem thrives.
              </p>
            </div>

            {/* Author Signature Box */}
            <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-800 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-lg flex-shrink-0">
                {post?.metaList?.[0]?.text?.slice(0, 2) || "AU"}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Written by {post?.metaList?.[0]?.text || "The Editorial Team"}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Specializing in digital strategy, design systems, and product innovation. Covering shifts across modern e-commerce and consumer technology.
                </p>
              </div>
            </div>

            {/* Tags & Social Share Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 pt-8 mt-10 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">Filed under:</span>
                {["Agency", "Business", "Design Systems"].map((tag) => (
                  <span 
                    key={tag} 
                    className="py-1 px-3 bg-white/[0.04] hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/30 text-[11px] font-semibold text-slate-300 hover:text-amber-300 rounded-lg cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Icons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-1 uppercase tracking-wider">Share:</span>
                {[
                  { icon: TwitterIcon, color: "hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40" },
                  { icon: Linkedin01Icon, color: "hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
                  { icon: Facebook01Icon, color: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/40" },
                  { icon: InstagramIcon, color: "hover:bg-[#E4405F]/20 hover:text-[#E4405F] hover:border-[#E4405F]/40" }
                ].map((social, idx) => (
                  <button 
                    key={idx} 
                    className={`p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 transition-all ${social.color}`}
                  >
                    <HugeiconsIcon icon={social.icon} size={16} />
                  </button>
                ))}
              </div>
            </div>

          </motion.article>

          {/* ── Sticky Sidebar ── */}
          <aside className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-24">
            <div className="p-6 rounded-3xl border border-white/[0.08] bg-slate-900/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-4 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <h3 className="text-base font-bold text-white tracking-wide">Trending Posts</h3>
              </div>
              <Popularpost />
              
              <div className="h-px w-full bg-white/[0.08] my-8" />

              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-4 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <h3 className="text-base font-bold text-white tracking-wide">Popular Topics</h3>
              </div>
              <TagList />
              
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogPage;