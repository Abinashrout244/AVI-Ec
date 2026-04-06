import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../Shop/CartProduct";
import HeroBanner from "../components/HeroBanner";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="space-y-10">
      <HeroBanner title="Shop Cart" page="Cart Page" />

      {CartItem.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-6 px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Your cart is feeling a little light.
          </h1>
          <Link to="/shop">
            <button className="btn-primary">Start shopping</button>
          </Link>
        </div>
      ) : (
        <div
          className={`px-3 md:px-14 mt-8 md:mt-16 pb-10 ${
            open === true ? "brightness-75" : ""
          }`}
        >
          <div className="hidden md:grid grid-cols-5 font-semibold text-sm p-3 glass-panel text-white items-center text-center rounded-2xl">
            <h2 className="text-start pl-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
            <h2>Edit</h2>
          </div>

          <div className="grid grid-cols-5 font-semibold text-xs p-2 glass-panel text-white text-center md:hidden rounded-2xl">
            <p>Product</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p>Edit</p>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {CartItem.map((item) => {
              return <CartProduct {...item} key={item.id} />;
            })}
          </div>
        </div>
      )}

      <div
        className={`px-3 md:px-14 pb-16 ${
          open === true ? "brightness-75" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 flex flex-col gap-5">
            <div className="flex flex-row gap-2">
              <input
                type="text"
                className="py-2 px-3 border border-white/10 bg-transparent text-white rounded-full flex-1 outline-none placeholder:text-slate-400"
                placeholder="Coupon Code"
              />
              <button className="btn-primary">Apply</button>
            </div>
            <div className="flex flex-col gap-5 w-full">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Calculate Shipping
              </h2>

              <select className="w-full py-2 pl-3 border border-white/10 rounded-full text-white bg-transparent focus:border-amber-300 outline-none">
                <option className="text-slate-900">India</option>
                <option className="text-slate-900">Africa</option>
                <option className="text-slate-900">America</option>
                <option className="text-slate-900">Bangalore</option>
              </select>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                <select className="w-full py-2 pl-3 border border-white/10 rounded-full text-white bg-transparent focus:border-amber-300 outline-none">
                  <option className="text-slate-900">India</option>
                  <option className="text-slate-900">Africa</option>
                  <option className="text-slate-900">America</option>
                  <option className="text-slate-900">Bangalore</option>
                </select>

                <input
                  type="text"
                  placeholder="Post / ZIP"
                  className="w-full py-2 px-3 border border-white/10 rounded-full bg-transparent text-white focus:border-amber-300 outline-none placeholder:text-slate-400"
                />
              </div>

              <button className="btn-ghost w-fit">Update Total</button>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex flex-row gap-4 justify-end items-center">
              <button
                onClick={() => setOpen(true)}
                className="btn-primary"
              >
                Proceed to Checkout
              </button>

              <button className="btn-ghost">Update cart</button>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Order Summary
              </h2>
              <div className="px-4 flex flex-row justify-between items-center border border-white/10 py-3 rounded-2xl">
                <p className="text-slate-300">Cart Subtotal</p>
                <h2 className="text-amber-200 font-semibold">
                  INR {totalOrder}
                </h2>
              </div>
              <div className="px-4 flex flex-row justify-between items-center border border-white/10 py-3 rounded-2xl">
                <p className="text-slate-300">Shipping and Handling</p>
                <h2 className="text-amber-200 font-semibold">Free Shipping</h2>
              </div>
              <div className="px-4 flex flex-row justify-between items-center border border-white/10 py-3 rounded-2xl">
                <p className="text-slate-300">Order Total</p>
                <h2 className="text-amber-200 font-semibold">
                  INR {totalOrder}.00
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col w-full max-w-[600px] mx-auto text-white">
          <div className="flex flex-row justify-between items-center px-2 pb-3">
            <h2 className="text-xl font-semibold items-start">
              Select Your payment Method
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>

          <div className="border-y border-white/10 flex flex-col rounded-2xl px-1 pt-3">
            <div className="flex gap-6 mb-4 border-b border-white/10 px-2 pb-3">
              <button
                onClick={() => setActiveTab("visa")}
                className={`px-4 py-2 rounded-full ${
                  activeTab === "visa"
                    ? "bg-white/10 border border-white/20"
                    : "border border-transparent"
                }`}
              >
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.VOMO352OP4axk11dPRMX2AHaB2?pid=Api&P=0&h=180"
                  alt="Visa"
                  className="h-6"
                />
              </button>

              <button
                onClick={() => setActiveTab("payout")}
                className={`px-4 py-2 rounded-full ${
                  activeTab === "payout"
                    ? "bg-white/10 border border-white/20"
                    : "border border-transparent"
                }`}
              >
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.E1H7K1pGXLYUVUvedgFMHwHaBy?pid=Api&P=0&h=180"
                  alt="Payout"
                  className="h-6"
                />
              </button>
            </div>

            <div className="w-full px-3 py-3 items-center">
              {activeTab === "visa" && (
                <div className="flex flex-col w-full gap-4">
                  <h2 className="text-xl font-semibold text-center">
                    Credit Card
                  </h2>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Cardholder Name"
                      className="w-full block text-white px-2 py-2 border-b border-white/15 outline-none bg-transparent placeholder:text-slate-400"
                    />
                    <input
                      type="text"
                      value={num}
                      onChange={(e) => setNum(e.target.value)}
                      placeholder="Card Number"
                      className="w-full block text-white px-2 py-2 border-b border-white/15 outline-none bg-transparent placeholder:text-slate-400"
                    />
                    <div className="flex flex-row gap-2">
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Expiry Date (MM/YY)"
                        className="w-full block text-white px-2 py-2 border-b border-white/15 outline-none bg-transparent placeholder:text-slate-400"
                      />
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                        className="w-full block text-white px-2 py-2 border-b border-white/15 outline-none bg-transparent placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false), handleLocation();
                    }}
                    className={`btn-primary w-[120px] ${
                      !name || !num || !cvv || !date
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!name || !num || !cvv || !date}
                  >
                    Add Card
                  </button>

                  <p className="text-slate-400 text-sm">
                    Payment disclaimer: in no event shall payment or partial
                    payment by Owner for any material or service.
                  </p>
                </div>
              )}

              {activeTab === "payout" && (
                <div className="flex flex-col w-full gap-4">
                  <h2 className="text-xl font-semibold text-center">
                    Paypal Account Info
                  </h2>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full block text-white px-2 py-2 border-b border-white/15 outline-none bg-transparent placeholder:text-slate-400"
                    />
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full block text-white px-2 py-2 border-b border-white/15 outline-none bg-transparent placeholder:text-slate-400"
                    />
                    <input
                      type="text"
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                      placeholder="Extra Info"
                      className="w-full block text-white px-2 py-2 border-b border-white/15 outline-none bg-transparent placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false), handleLocation();
                    }}
                    className={`btn-ghost w-[120px] ${
                      !email || !userName || !info
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!email || !userName || !info}
                  >
                    Add PayPal
                  </button>

                  <p className="text-slate-400 text-sm">
                    Payment disclaimer: in no event shall payment or partial
                    payment by Owner for any material or service.
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
