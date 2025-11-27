import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../Shop/CartProduct";
import HeroBanner from "../components/HeroBanner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import { clearCart } from "../utilis/CartSlice";

const CartPage = () => {
  const CartItem = useSelector((store) => store?.cart?.items);
  const dispatch = useDispatch();
  const totalOrder = CartItem.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("visa");
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [cvv, setCvv] = useState("");
  const [date, setDate] = useState("");

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  const handleLocation = () => {
    alert("Your Order is Placed Succesfully..");
    setCvv("");
    setDate("");
    setNum("");
    setName("");
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className={``}>
      <HeroBanner title="Shop Cart" page="Cart Page" />

      {CartItem.length === 0 ? (
        <h1 className="h-[70vh] text-2xl font-semibold px-10 py-6 text-center pt-16">
          Please add something in your cart from{" "}
          <Link to="/shop">
            <span className="text-3xl font-semibold text-rose-600">
              Shop...
            </span>
          </Link>
        </h1>
      ) : (
        <div
          className={`px-3 md:px-14 mt-10 md:mt-20 pb-10 ${
            open === true ? "brightness-50 " : "bg-white"
          }`}
        >
          <div className="hidden md:grid grid-cols-5 font-semibold text-lg p-3 bg-rose-600 text-white items-center text-center">
            <h2 className="text-start">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
            <h2>Edit</h2>
          </div>

          <div className="grid grid-cols-5 font-semibold text-xs p-2 bg-rose-600 text-white text-center md:hidden">
            <p>Product</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p>Edit</p>
          </div>

          <div className="">
            {CartItem.map((item) => {
              return <CartProduct {...item} key={item.id} />;
            })}
          </div>
        </div>
      )}

      <div
        className={`px-3 md:px-14 mt-10 md:mt-20 pb-10 ${
          open === true ? "brightness-50" : "bg-white"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 shadow shadow-gray-300 gap-5">
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-row">
              <input
                type="text"
                className="py-2 px-2 border border-slate-300"
                placeholder="Cupon Code....."
              />
              <button className="text-white px-5 py-2 bg-rose-600">
                Apply Coupon
              </button>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Calculate Shipping
              </h2>

              <select className="w-full py-2 pl-2 border border-slate-300 rounded-lg text-black  focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none ">
                <option>India</option>
                <option>Africa</option>
                <option>America</option>
                <option>Bangalore</option>
              </select>

              <div className="flex flex-col md:flex-row gap-5 w-full">
                <select className="w-full py-2 pl-2 border border-slate-300 rounded-lg text-black  focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none">
                  <option>India</option>
                  <option>Africa</option>
                  <option>America</option>
                  <option>Bangalore</option>
                </select>

                <input
                  type="text"
                  placeholder="Post / ZIP"
                  className="w-full py-2 px-2 border border-slate-300 focus:border-rose-600 focus:ring-1 focus:ring-rose-600 outline-none rounded-lg"
                />
              </div>

              <button className="px-6 md:px-10 rounded-md py-2 font-semibold text-white text-sm bg-rose-600 w-fit">
                Update Total
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-row gap-7 justify-end items-end">
              <div className="flex justify-center items-center">
                {/* 🔥 FIXED — MODAL OPENS NOW */}
                <button
                  onClick={() => setOpen(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-sm"
                >
                  proceed to Checkout
                </button>
              </div>

              <button className="bg-rose-600 text-white px-7 rounded-sm py-2">
                Update cart
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="text-3xl font-semibold">Calculate Shipping</h2>
              <div className="px-3 flex flex-row justify-between items-center border border-slate-300 py-2 rounded-sm">
                <p className="text-gray-600">Cart Subtotal</p>
                <h2 className="text-rose-400 font-semibold">${totalOrder}</h2>
              </div>
              <div className="px-3 flex flex-row justify-between items-center border border-slate-300 py-2 rounded-sm">
                <p className="text-gray-600">Shipping and Handling</p>
                <h2 className="text-rose-400 font-semibold">Free Shipping</h2>
              </div>
              <div className="px-3 flex flex-row justify-between items-center border border-slate-300 py-2 rounded-sm">
                <p className="text-gray-600">order Total</p>
                <h2 className="text-rose-400 font-semibold">
                  ${totalOrder}.00
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className={`flex flex-col  w-full max-w-[600px] mx-auto `}>
          <div className="flex flex-row justify-between items-center px-3 pb-3">
            <h2 className="text-xl font-semibold items-start ">
              Select Your payment Method
            </h2>
            <button onClick={() => setOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>

          <div className="border-y border-slate-y-400 flex flex-col rounded-t-sm rounded-b-sm px-1 pt-3">
            <div className="flex gap-7 mb-4 border-b-2 border-b-slate-400 ">
              <button
                onClick={() => setActiveTab("visa")}
                className={`px-4 py-2  
          ${
            activeTab === "visa"
              ? "border-t border-t-slate-400 border-x border-x-slate-400 rounded-tr-sm rounded-tl-sm"
              : "border-none"
          }
        `}
              >
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.VOMO352OP4axk11dPRMX2AHaB2?pid=Api&P=0&h=180"
                  alt="Visa"
                />
              </button>

              <button
                onClick={() => setActiveTab("payout")}
                className={`px-4 py-2 
          ${
            activeTab === "payout"
              ? "border-t border-t-slate-400 border-x border-x-slate-400 rounded-tr-sm rounded-tl-sm"
              : "border-none"
          }
        `}
              >
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.E1H7K1pGXLYUVUvedgFMHwHaBy?pid=Api&P=0&h=180"
                  alt="Payout"
                />
              </button>
            </div>

            <div className="w-full px-3 py-3 items-center">
              {activeTab === "visa" && (
                <div className="flex flex-col w-full gap-3">
                  <h2 className="text-xl font-semibold text-center ">
                    Credit Card
                  </h2>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Cardholder Name"
                      className="w-full block text-gray-600 px-2 py-2 border-b border-slate-400 outline-none"
                    />
                    <input
                      type="text"
                      value={num}
                      onChange={(e) => setNum(e.target.value)}
                      placeholder="Card Number"
                      className="w-full block text-gray-600 px-2 py-2 border-b border-slate-400 outline-none"
                    />
                    <div className="flex flex-row gap-2">
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Expiry Date (MM/YY)"
                        className="w-full block text-gray-600 px-2 py-2 border-b border-slate-400 outline-none"
                      />
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                        className="w-full block text-gray-600 px-2 py-2 border-b border-slate-400 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false), handleLocation();
                    }}
                    className={`bg-rose-600/70 rounded-full w-[120px] text-white font-semibold px-3 py-2 ${
                      !name || !num || !cvv || !date
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-rose-600 hover:text-white"
                    }`}
                    disabled={!name || !num || !cvv || !date}
                  >
                    Add Card
                  </button>

                  <p className="text-slate-500">
                    payment Disclaimer:in no event shall payment or partial
                    payment by Owner for any material or service
                  </p>
                </div>
              )}

              {activeTab === "payout" && (
                <div className="flex flex-col w-full gap-3">
                  <h2 className="text-xl font-semibold text-center ">
                    Paypal Account Info
                  </h2>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full block text-gray-600 px-2 py-2 border-b border-slate-400 outline-none"
                    />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full block text-gray-600 px-2 py-2 border-b border-slate-400 outline-none"
                    />
                    <input
                      type="text"
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                      placeholder="Extra Info"
                      className="w-full block text-gray-600 px-2 py-2 border-b border-slate-400 outline-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false), handleLocation();
                    }}
                    className={`bg-indigo-600/70 rounded-full w-[120px] text-white font-semibold px-3 py-2 ${
                      !name || !num || !cvv || !date
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-rose-600 hover:text-white"
                    }`}
                    disabled={!name || !num || !cvv || !date}
                  >
                    Add PayPal
                  </button>

                  <p className="text-slate-500">
                    payment Disclaimer:in no event shall payment or partial
                    payment by Owner for any material or service
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CartPage;
