import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  User, 
  MessageSquare, 
  Play,
  ArrowLeft
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
  const filterBlog = blogList.filter((item) => item.id === Number(id));
  const post = filterBlog[0];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#03050C] text-white">
        <h2 className="text-2xl font-bold">Post not found.</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#03050C] min-h-screen font-sans text-white pb-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors mb-10 font-medium">
          <ArrowLeft size={18} />
          <span>Back to all posts</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Article Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            {/* Article Header (No glass panel) */}
            <div className="mb-10 space-y-6">
              <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                Category Name
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-400 pb-2">
                {post?.title}
              </h1>

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 p-[2px]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                        <User size={20} className="text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-base font-bold text-white tracking-wide">{post?.metaList[0].text}</p>
                      <p className="text-xs text-slate-400">Author & Content Creator</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6 text-sm font-semibold text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-amber-400" />
                      <span>{post?.metaList[1].text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-amber-400" />
                      <span>{post?.commentCount} Replies</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-[400px] md:h-[550px] w-full rounded-[2rem] overflow-hidden mb-12 shadow-2xl">
              <img
                src={post?.imgUrl}
                alt={post?.imgAlt || "Blog post cover"}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
            </div>

            {/* Content Body - Clean reading experience */}
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-p:leading-loose prose-a:text-amber-400 hover:prose-a:text-amber-300">
              <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium mb-8">
                Serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
              </p>
              
              <p>
                I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees.
              </p>

              {/* Blockquote feature styled for reading */}
              <blockquote className="relative my-12 py-8 px-8 md:px-12 bg-white/5 rounded-3xl border-l-4 border-amber-400">
                <div className="absolute top-4 left-6 text-6xl text-amber-500/10 font-serif leading-none">"</div>
                <p className="relative text-xl md:text-2xl italic font-serif text-white leading-relaxed z-10 m-0">
                  Dynamically recaptiualize distributed technologies is whereas turnkey channels and onotonectally provide access to resource leveling expertise via worldwide deliverables.
                </p>
                <footer className="mt-6 text-sm font-bold text-amber-400 uppercase tracking-widest">
                  — The Shadow AVI Team
                </footer>
              </blockquote>

              <p>
                Onotonectally provide access to resource leveling expertise via worldwide deliverables. Holisticly extend aserser are diverse portals. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.
              </p>

              {/* Video Media Container */}
              <div className="relative w-full rounded-2xl overflow-hidden my-12 group border border-white/10 shadow-2xl">
                <img src={img} alt="Post media" className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <a
                  href="https://youtu.be/IaZzh7pI5DE?si=1GL_rv3piLEW5jFR"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-amber-400/90 backdrop-blur-sm p-5 md:p-6 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.4)] border border-amber-300/50 flex items-center justify-center pl-6"
                  >
                    <Play size={32} fill="black" className="text-black" />
                  </motion.div>
                </a>
              </div>

              <p>
                I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now.
              </p>
            </div>

            {/* Tags & Social Share Footer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-10 mt-16 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold text-white mr-2">Tags:</span>
                {["Agency", "Business", "Personal"].map(tag => (
                  <button key={tag} className="py-1.5 px-4 bg-white/5 hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/30 text-xs font-bold text-slate-300 hover:text-amber-400 uppercase tracking-wider rounded-lg transition-all">
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white mr-2">Share:</span>
                {[
                  { icon: Facebook01Icon, color: "hover:bg-[#1877F2] hover:border-[#1877F2]" },
                  { icon: TwitterIcon, color: "hover:bg-[#1DA1F2] hover:border-[#1DA1F2]" },
                  { icon: InstagramIcon, color: "hover:bg-[#E4405F] hover:border-[#E4405F]" },
                  { icon: Linkedin01Icon, color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]" }
                ].map((social, idx) => (
                  <button key={idx} className={`p-2.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all ${social.color}`}>
                    <HugeiconsIcon icon={social.icon} size={18} />
                  </button>
                ))}
              </div>
            </div>
          </motion.article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
             <div className="glass-panel p-6 rounded-3xl border border-white/5 sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-amber-400 inline-block"></span>
                  Trending Posts
                </h3>
                <Popularpost />
                
                <h3 className="text-xl font-bold mt-10 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-amber-400 inline-block"></span>
                  Popular Tags
                </h3>
                <TagList />
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogPage;
