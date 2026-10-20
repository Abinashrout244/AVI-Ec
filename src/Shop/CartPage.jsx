import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../Shop/CartProduct";
import HeroBanner from "../components/HeroBanner";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { clearCart } from "../utilis/CartSlice";
import { fetchProducts } from "../api.js";
import {
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  Lock,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

const INDIAN_STATES = [
  "Telangana",
  "Maharashtra",
  "Karnataka",
  "Delhi",
  "Tamil Nadu",
  "Gujarat",
  "Uttar Pradesh",
  "West Bengal",
];

const formatPrice = (price) => Number(price || 0).toLocaleString("en-IN");

const getProductImage = (product) =>
  product?.img ||
  product?.image ||
  product?.images?.[0] ||
  product?.thumbnail ||
  "";

const CartPage = () => {
  const CartItem = useSelector((store) => store?.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Product data from your Fake API
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");

  // Quick-view modal
  const [selectedItem, setSelectedItem] = useState(null);

  const selectedProduct = selectedItem
    ? products.find(
        (product) => String(product.id) === String(selectedItem.id),
      ) || selectedItem
    : null;

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);

  // Shipping state
  const [selectedState, setSelectedState] = useState("Telangana");
  const [pincode, setPincode] = useState("");
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [shippingMessage, setShippingMessage] = useState("");

  // Fetch products from the API
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError("");

        const result = await fetchProducts();

        // Support common API response formats
        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.products)
              ? result.products
              : [];

        if (isMounted) {
          setProducts(productList);
        }
      } catch (error) {
        console.error("Failed to load products:", error);

        if (isMounted) {
          setProductsError(
            "Unable to load product details. Please check your API connection.",
          );
        }
      } finally {
        if (isMounted) {
          setProductsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Cart calculations
  const subtotal = CartItem.reduce((total, item) => {
    return total + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);

  const totalItemsCount = CartItem.reduce((total, item) => {
    return total + Number(item.quantity || 1);
  }, 0);

  const finalTotal = Math.max(0, subtotal - discount);

  // Apply coupon
  const handleApplyCoupon = (event) => {
    event.preventDefault();

    const normalizedCode = couponCode.trim().toUpperCase();

    if (!normalizedCode) {
      setCouponMessage({
        type: "error",
        text: "Please enter a coupon code.",
      });
      return;
    }

    if (normalizedCode === "AVI10" || normalizedCode === "SAVE10") {
      const discountValue = Math.round(subtotal * 0.1);

      setDiscount(discountValue);
      setCouponMessage({
        type: "success",
        text: "10% discount applied successfully!",
      });
    } else {
      setDiscount(0);
      setCouponMessage({
        type: "error",
        text: "Invalid code. Try AVI10 for 10% off.",
      });
    }
  };

  // Check delivery PIN
  const handleCheckShipping = () => {
    setShippingCalculated(false);
    setShippingMessage("");

    if (!/^\d{6}$/.test(pincode.trim())) {
      setShippingMessage("Enter a valid 6-digit PIN code.");
      return;
    }

    setShippingCalculated(true);
    setShippingMessage(`Delivery estimate checked for ${selectedState}.`);
  };

  return (
    <div className="min-h-screen bg-[#03050C] text-slate-100 selection:bg-amber-400 selection:text-black">
      <HeroBanner title="Shopping Bag" page="Cart" />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
        {CartItem.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-slate-900/40 px-4 py-24 text-center backdrop-blur-xl">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
              <ShoppingBag size={36} />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Your bag is currently empty
            </h1>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
              Explore our hand-picked curated edits across electronics, luxury
              apparel, and home essentials.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950 shadow-[0_10px_25px_rgba(251,191,36,0.35)] transition-all hover:shadow-[0_15px_35px_rgba(251,191,36,0.5)] active:scale-95"
            >
              <span>Start Shopping</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Cart items */}
            <div className="flex flex-col gap-6 lg:col-span-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Cart Items
                  </h2>

                  <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                    {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    dispatch(clearCart());
                    setDiscount(0);
                    setCouponMessage(null);
                  }}
                  className="flex items-center gap-1.5 text-xs text-rose-400/80 transition-colors hover:text-rose-400"
                >
                  <Trash2 size={13} />
                  <span>Clear Bag</span>
                </button>
              </div>

              <div className="hidden grid-cols-12 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid">
                <span className="col-span-6">Product Details</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Subtotal</span>
              </div>

              <div className="flex flex-col gap-3">
                {CartItem.map((item, index) => (
                  <CartProduct
                    {...item}
                    key={item.id ?? index}
                    onClickProduct={() => setSelectedItem(item)}
                  />
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-2 grid grid-cols-3 gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-[11px] text-slate-400">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck size={16} className="text-amber-400" />
                  <span>100% Authentic</span>
                </div>

                <div className="flex items-center justify-center gap-2 border-x border-white/10">
                  <Truck size={16} className="text-amber-400" />
                  <span>Express Dispatch</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <RotateCcw size={16} className="text-amber-400" />
                  <span>7-Day Return</span>
                </div>
              </div>

              {/* Delivery estimate */}
              <div className="mt-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2">
                  <Truck size={16} className="text-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Delivery Estimate
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="relative">
                    <select
                      value="India"
                      disabled
                      aria-label="Country"
                      className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white/70 outline-none"
                    >
                      <option value="India" className="bg-[#0b0f19]">
                        India (Domestic)
                      </option>
                    </select>
                  </div>

                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={(event) => {
                        setSelectedState(event.target.value);
                        setShippingCalculated(false);
                        setShippingMessage("");
                      }}
                      aria-label="State"
                      className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400/50"
                    >
                      {INDIAN_STATES.map((state) => (
                        <option
                          key={state}
                          value={state}
                          className="bg-[#0b0f19]"
                        >
                          {state}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                    />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={pincode}
                      onChange={(event) => {
                        setPincode(
                          event.target.value.replace(/\D/g, "").slice(0, 6),
                        );
                        setShippingCalculated(false);
                        setShippingMessage("");
                      }}
                      placeholder="Enter 6-digit PIN"
                      aria-label="Delivery PIN code"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-white outline-none placeholder:text-white/30 focus:border-amber-400/50"
                    />

                    <button
                      type="button"
                      onClick={handleCheckShipping}
                      className="flex-shrink-0 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/15"
                    >
                      Check
                    </button>
                  </div>
                </div>

                {shippingMessage && (
                  <p
                    className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${
                      shippingCalculated ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {shippingCalculated && <CheckCircle2 size={13} />}
                    <span>{shippingMessage}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:col-span-4">
              <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:p-8">
                <h3 className="border-b border-white/10 pb-4 text-lg font-bold tracking-tight text-white">
                  Order Summary
                </h3>

                {/* Coupon */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <Tag size={12} className="text-amber-400" />
                    Promotional Voucher
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(event) => setCouponCode(event.target.value)}
                      placeholder="e.g. AVI10"
                      className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-2.5 font-mono text-xs uppercase text-white outline-none transition-all placeholder:text-white/30 focus:border-amber-400/50"
                    />

                    <button
                      type="submit"
                      className="rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950"
                    >
                      Apply
                    </button>
                  </div>

                  {couponMessage && (
                    <p
                      className={`mt-1 text-[11px] ${
                        couponMessage.type === "success"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                </form>

                {/* Price breakdown */}
                <div className="flex flex-col gap-3 border-y border-white/10 py-4 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Bag Subtotal</span>
                    <span className="font-semibold text-white">
                      ₹{formatPrice(subtotal)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Promotional Discount (10%)</span>
                      <span className="font-semibold">
                        - ₹{formatPrice(discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-400">
                    <span>Estimated Shipping</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                      Free
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>Estimated Taxes &amp; GST</span>
                    <span className="text-slate-500">Included</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-slate-500">
                      All local taxes included
                    </span>
                  </div>

                  <span className="text-2xl font-black tracking-tight text-amber-300 md:text-3xl">
                    ₹{formatPrice(finalTotal)}
                  </span>
                </div>

                {/* Checkout */}
                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 py-4 text-xs font-black uppercase tracking-widest text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(251,191,36,0.55)] active:scale-[0.98]"
                >
                  <Lock size={14} />
                  <span>Secure Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-500">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>256-bit encrypted checkout with bank-grade safety</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Product quick-view modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        maxWidth="max-w-[760px]"
      >
        {selectedProduct && selectedItem && (
          <div className="flex w-full flex-col gap-6 p-2 text-slate-100 md:flex-row">
            {/* Product image */}
            <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:w-1/2">
              {getProductImage(selectedProduct) ? (
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.name || "Product"}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl"
                />
              ) : (
                <ShoppingBag size={48} className="text-slate-500" />
              )}
            </div>

            {/* Product information */}
            <div className="flex w-full flex-col justify-between gap-4 md:w-1/2">
              <div>
                <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {selectedProduct.seller || "Official Brand"}
                </span>

                <h3 className="mt-2 text-xl font-bold leading-snug text-white">
                  {selectedProduct.name || "Product"}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl font-black text-white">
                    ₹{formatPrice(selectedProduct.price)}
                  </span>

                  {(selectedProduct.ratings ?? selectedProduct.rating) !=
                    null && (
                    <span className="flex items-center gap-1 rounded bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-950">
                      {selectedProduct.ratings ?? selectedProduct.rating} ★
                    </span>
                  )}
                </div>

                {(selectedItem.size || selectedItem.color) && (
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    {selectedItem.size && (
                      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1">
                        Size:{" "}
                        <strong className="text-white">
                          {selectedItem.size}
                        </strong>
                      </span>
                    )}

                    {selectedItem.color && (
                      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1">
                        Color:{" "}
                        <strong className="text-white">
                          {selectedItem.color}
                        </strong>
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-slate-400">
                  {selectedProduct.description ||
                    "Experience top-tier quality with this product from our exclusive curated line."}
                </p>

                {productsLoading && (
                  <p className="mt-3 text-xs text-slate-400">
                    Loading product details…
                  </p>
                )}

                {productsError && (
                  <p className="mt-3 text-xs text-rose-400">{productsError}</p>
                )}
              </div>

              <div className="flex gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 rounded-xl border border-white/15 bg-white/[0.05] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Close
                </button>

                <Link
                  to={`/shop/${selectedProduct.id}`}
                  onClick={() => setSelectedItem(null)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-400 py-2.5 text-center text-xs font-bold text-slate-950 shadow-md transition-colors hover:bg-amber-300"
                >
                  <span>Product Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CartPage;
