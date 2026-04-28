import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import blogList from "../utilis/blogdata";
import { Link } from "react-router-dom";
import { User, Calendar, MessageSquare, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Blog = () => {
  const [bdata, setBdata] = useState(blogList);
  return (
    <div className="bg-[#03050C] min-h-screen">
      <HeroBanner title="Our Journal" page="Blog" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-3"
          >
            Insights & Stories
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
          >
            Latest from the Blog
          </motion.h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {bdata.map((item) => {
            return (
              <motion.div variants={itemAnim} key={item.id}>
                <Link to={`/blog/${item.id}`} className="group block h-full">
                  <div className="glass-panel h-full flex flex-col rounded-[2rem] overflow-hidden border border-white/5 hover:border-amber-400/30 transition-all duration-500">
                    
                    <div className="relative overflow-hidden h-64">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                      <img
                        src={item.imgUrl}
                        alt={item.imgAlt}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Meta pills overlaid on image */}
                      <div className="absolute bottom-4 left-4 z-20 flex items-center justify-between w-[calc(100%-2rem)]">
                        <div className="flex gap-2">
                          <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                            <Calendar size={12} className="text-amber-300" />
                            {item.metaList[1].text}
                          </span>
                        </div>
                        <span className="bg-amber-400 text-black px-2.5 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg shadow-amber-400/20">
                          <MessageSquare size={12} className="fill-black" />
                          {item.commentCount}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        <User size={14} />
                        <span>{item.metaList[0].text}</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300 leading-tight mb-4">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6 flex-grow line-clamp-3">
                        {item.desc}
                      </p>

                      <div className="flex items-center gap-2 text-white font-bold text-sm mt-auto pt-4 border-t border-white/10 group-hover:text-amber-300 transition-colors">
                        <span>Read Article</span>
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
