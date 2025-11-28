import React from "react";
import HeroBanner from "../components/HeroBanner";
import { useNavigate } from "react-router-dom";
const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send our Message";

const contactList = [
  {
    imgUrl:
      "https://tse3.mm.bing.net/th/id/OIP.vZ2Jcz-1jdgxnWlxqVlrKwHaHa?pid=Api&P=0&h=180",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "1201 park street, Fifth Avenue",
  },
  {
    imgUrl:
      "https://tse4.mm.bing.net/th/id/OIP.mVg0rVNFv4j0nP0qa0QvugHaHa?pid=Api&P=0&h=180",
    imgAlt: "contact icon",
    title: "Phone number",
    desc: "+22698 745 632,02 982 745",
  },
  {
    imgUrl:
      "https://tse4.mm.bing.net/th/id/OIP.rBajZk9yWx8HaQn6WZuvogAAAA?pid=Api&P=0&h=180",
    imgAlt: "contact icon",
    title: "Send email",
    desc: "admin@shopcart.com",
  },
  {
    imgUrl:
      "https://tse4.mm.bing.net/th/id/OIP.rrT01-bWAz1P7aS7MQnXYQHaHa?pid=Api&P=0&h=180",
    imgAlt: "contact icon",
    title: "Our website",
    desc: "www.shopcart.com",
  },
];

const Contact = () => {
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const sub = form.sub.value;

    if (!name || !email || !number || !sub) {
      alert("All fields are mandatory. Please fill all the fields.");
      return;
    } else {
      alert(`Submit Succesfulyy....\n
          UserName:${name}\n
          Email:${email}\n
          Number:${number}\n
          Subject:${sub}\n
        `);
    }

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

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
                  <img
                    src={item.imgUrl}
                    alt={item.imgAlt}
                    className="size-16"
                  />
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
        <form onSubmit={handleSignup}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Row 1 */}
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your Name*"
              className="shadow shadow-slate-400 p-3 rounded-sm w-full"
            />

            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Your Email*"
              className="shadow shadow-slate-400 p-3 rounded-sm w-full"
            />

            {/* Row 2 */}
            <input
              type="text"
              name="number"
              id="number"
              required
              placeholder="Mobile Number*"
              className="shadow shadow-slate-400 p-3 rounded-sm w-full"
            />

            <input
              type="text"
              id="sub"
              name="sub"
              required
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
          <div className="flex justify-center items-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-16 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
