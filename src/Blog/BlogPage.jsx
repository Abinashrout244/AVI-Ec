import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import blogList from "../utilis/blogdata";
import { useParams } from "react-router-dom";
import img from "../assets/images/blog/single/01.jpg";
import Popularpost from "../Shop/Popularpost";
import TagList from "../Shop/TagList";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook01Icon,
  InstagramIcon,
  TwitterIcon,
  Linkedin01Icon,
  Calendar03Icon,
  PrisonGuardIcon,
  BubbleChatIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";

const BlogPage = () => {
  const [blog, setBlog] = useState(blogList);
  const { id } = useParams();
  const filterBlog = blogList.filter((item) => item.id === Number(id));
  console.log(filterBlog[0]);

  return (
    <div className=" bg-yellow-50">
      <HeroBanner title={"Single Blog Pages"} page={"Blog  / BlogDetails"} />
      <div className="grid grid-cols-1 md:grid-cols-3 px-2 md:px-36 py-32 gap-5">
        {/* leftside */}
        <div className="col-span-2 bg-white  shadow shadow-gray-300 ">
          {filterBlog.map((item) => {
            return (
              <div key={item.id} className="rounded-t-sm \ overflow-hidden">
                <img
                  src={item?.imgUrl}
                  alt={item.imgAlt}
                  className="object-cover w-full h-[450px] rounded-t-sm hover:opacity-80 hover:scale-110 transition-all ease-in"
                />

                <div className="p-6 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-semibold">
                    {item?.title}
                  </h2>

                  <div className="flex flex-col md:flex-row gap-5 text-gray-600 text-sm">
                    <div className="flex flex-row items-center gap-2">
                      <span>
                        <HugeiconsIcon icon={PrisonGuardIcon} />
                      </span>
                      <p>{item.metaList[0].text}</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <span>
                        <HugeiconsIcon icon={Calendar03Icon} />
                      </span>
                      <p>{item.metaList[1].text}</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <span>
                        <HugeiconsIcon icon={BubbleChatIcon} />
                      </span>
                      <p className="flex gap-1.5">
                        {item?.commentCount}
                        <span>Comments</span>
                      </p>
                    </div>
                  </div>

                  <p>
                    Serenity hasir taken poseson mying entre soung these sweet
                    morngs sprng whch enoywith whole heart create am alones and
                    feel the charm of exstenceth spot whch the blissouls like
                    mineing am soo happy my dearsi frend absoribed the exquste
                    sense enjoy my whole hearts alone and fee the charm of
                    exstenceths spotsi whch was the blis of soulis mineing
                    amsoing dear frend soingu absoribed the exqust sense tranqui
                    existence neglect my talentsr should ncapable ofing is
                    draung singe wonderful serenty has taken possesison of my
                    entre soulng these sweet present moment and yet feel that
                    never was greater artst
                  </p>

                  <div className="bg-orange-600 text-white p-5 flex flex-col gap-4">
                    <p className="pl-3 md:pl-10">
                      Dynamically recaptiualize distributed technologies is
                      wherease turnkey channels and onotonectally provide access
                      to resource leveling expertise vias worldwide deliverables
                      uolisticly extend aserser are diversevortals.
                    </p>
                    <span className="text-lg font-semibold text-end">
                      ....Shadow AVI
                    </span>
                  </div>

                  <p>
                    whole heart create am alones and feel the charm of
                    exstenceth spot whch the blissouls like mineing am soo happy
                    my dearsi frend absoribed theexqustesenseenjoy my whole
                    hearts alone and fee the charm of exstenceths spotsi whch
                    was the blis of soulis mineing amsoing dear frend soingu
                    absoribed the exqust sense tranqui existence neglect my
                    talentsr should ncapable ofing is drawng singe wonderful
                    serenty has taken possesison of my entre soulng these sweet
                    present moment and yet feel that never was greater artst
                  </p>

                  <div className="relative w-full">
                    <img src={img} className="w-full" />

                    <a
                      href="https://youtu.be/IaZzh7pI5DE?si=1GL_rv3piLEW5jFR"
                      target="_blank"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-white/80 p-4 rounded-full shadow-lg">
                        <HugeiconsIcon
                          icon={PlayIcon}
                          size={34}
                          color="orange"
                        />
                      </div>
                    </a>
                  </div>

                  <p>
                    whole heart create am alones and feel the charm of
                    exstenceth spot whch the blissouls like mineing am soo happy
                    my dearsi frend absoribed theexqustesenseenjoy my whole
                    hearts alone and fee the charm of exstenceths spotsi whch
                    was the blis of soulis mineing amsoing dear frend soingu
                    absoribed the exqust sense tranqui existence neglect my
                    talentsr should ncapable ofing is drawng singe wonderful
                    serenty has taken possesison of my entre soulng these sweet
                    present moment and yet feel that never was greater artst
                  </p>

                  {/*  Bottom section  */}
                  <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-center items-center md:justify-between pt-6 mt-6 border-t border-gray-300">
                    <div className="flex flex-row gap-3">
                      <button className="py-1.5 hover:-translate-y-1 transition-all ease-in-out px-5 border border-slate-200 font-semibold text-slate-500">
                        Agency
                      </button>
                      <button className="py-1.5 hover:-translate-y-1 transition-all ease-in-out px-5 border border-slate-200 font-semibold text-slate-500">
                        Business
                      </button>
                      <button className="py-1.5 hover:-translate-y-1 transition-all ease-in-out px-5 border border-slate-200 font-semibold text-slate-500">
                        Personal
                      </button>
                    </div>

                    <div className="flex flex-row  gap-4.5">
                      <HugeiconsIcon
                        icon={Facebook01Icon}
                        size={34}
                        color="white"
                        className="bg-slate-700 rounded-full p-2 hover:-translate-y-1 transition-all ease-in-out"
                      />
                      <HugeiconsIcon
                        icon={InstagramIcon}
                        size={34}
                        color="white"
                        className="bg-rose-600 rounded-full p-2 hover:-translate-y-1 transition-all ease-in-out "
                      />
                      <HugeiconsIcon
                        icon={TwitterIcon}
                        size={34}
                        color="white"
                        className="bg-sky-500 rounded-full p-2 hover:-translate-y-1 transition-all ease-in-out"
                      />
                      <HugeiconsIcon
                        icon={Linkedin01Icon}
                        size={34}
                        color="white"
                        className="bg-blue-500 rounded-full p-2 hover:-translate-y-1 transition-all ease-in-out "
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* rightside */}
        <div className="md:col-span-1  pl-5 md:pl-0 flex flex-col gap-5 -mt-5">
          <TagList />
          <Popularpost />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
