import React from "react";
import HeroBanner from "../components/HeroBanner";
const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send our Message";

const contactList = [
  {
    imgUrl: "/src/assets/images/icon/01.png",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "1201 park street, Fifth Avenue",
  },
  {
    imgUrl: "/src/assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone number",
    desc: "+22698 745 632,02 982 745",
  },
  {
    imgUrl: "/src/assets/images/icon/03.png",
    imgAlt: "contact icon",
    title: "Send email",
    desc: "admin@shopcart.com",
  },
  {
    imgUrl: "/src/assets/images/icon/04.png",
    imgAlt: "contact icon",
    title: "Our website",
    desc: "www.shopcart.com",
  },
];

const Contact = () => {
  return (
    <div className="">
      <HeroBanner page={"Contact Us"} title={"Get In Touch With Us"} />
      <div className="flex flex-col px-5  md:px-24 py-20 bg-yellow-50">
        <p className="uppercase text-center">Get in touch with Contact us</p>
        <h2 className="text-3xl font-semibold text-center">
          We're Always Eager To Hear From You!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          <div className="col-span-full md:col-span-2 w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.3685061566284!2d85.93193057501024!3d20.28500848118472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a197555eca1853d%3A0x60083b2363b95fc2!2sOXFORD%20COLLEGE%20OF%20ENGINEERING%20%26%20MANAGEMENT!5e0!3m2!1sen!2sin!4v1764078506794!5m2!1sen!2sin"
              className="w-full h-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <ul className="col-span-full md:col-span-1 w-full flex flex-col gap-5 h-full">
            {contactList.map((item, index) => {
              return (
                <li
                  key={index}
                  className="bg-white py-3 px-5 flex flex-row gap-2 items-center"
                >
                  <img src={item.imgUrl} alt={item.imgAlt} />
                  <div className="space-y-0.5">
                    <h2 className="font-semibold text-xl">{item.title}</h2>
                    <p>{item.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="md:px-[300px] px-5 py-24 flex flex-col gap-2">
        <h2 className="uppercase text-center ">Get in touch with Contact us</h2>
        <p className=" text-2xl md:text-4xl text-center font-semibold">
          Fill The Form Below So We Can Get To Know You And Your Needs Better.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Row 1 */}
          <input
            type="text"
            placeholder="Your Name*"
            className="shadow shadow-slate-400 p-3 rounded-sm w-full"
          />

          <input
            type="text"
            placeholder="Your Email*"
            className="shadow shadow-slate-400 p-3 rounded-sm w-full"
          />

          {/* Row 2 */}
          <input
            type="text"
            placeholder="Mobile Number*"
            className="shadow shadow-slate-400 p-3 rounded-sm w-full"
          />

          <input
            type="text"
            placeholder="Your Subject*"
            className="shadow shadow-slate-400 p-3 rounded-sm w-full"
          />
        </div>

        {/* Textarea below */}
        <div className="mt-4">
          <textarea
            placeholder="Your Message*"
            className="shadow-sm shadow-slate-300 p-3 rounded-md w-full h-40"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Contact;
