import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InstagramIcon,
  TwitterIcon,
  Linkedin01Icon,
  GoogleIcon,
  Facebook01Icon,
} from "@hugeicons/core-free-icons";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [remember, setRemember] = useState(false);
  const { signUpWithEmail, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/cart-page";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        alert("Login success!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrMsg("Please provide valid Email & password");
      });
  };

  const handleRegister = () => {
    signUpWithEmail()
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  return (
    /* FULL SCREEN NO SCROLL */
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 overflow-hidden">
      {/* LUXURY GLASS CARD */}
      <div className="max-w-md w-full backdrop-blur-2xl bg-white/60 border border-white/50 rounded-[2rem] shadow-2xl p-6 md:p-10 transition-all duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm font-medium mt-1">
            Please enter your details
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-white/40 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-sm"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-white/40 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          {errMsg && (
            <div className="text-red-500 text-[11px] font-semibold text-center animate-pulse">
              {errMsg}
            </div>
          )}

          <div className="flex items-center justify-between text-[12px] px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all"
              />
              <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-indigo-600 font-semibold hover:underline underline-offset-4"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-indigo-600 shadow-lg shadow-gray-200 hover:shadow-indigo-200 transition-all active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            New here?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-bold hover:underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* COMPACT DIVIDER */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white/50 px-4 py-1 rounded-full text-gray-400 font-bold border border-gray-50">
              Quick Connect
            </span>
          </div>
        </div>

        {/* SOCIAL CONNECT */}
        <div className="flex items-center justify-center gap-4">
          {[
            { icon: GoogleIcon, color: "#EA4335", action: handleRegister },
            { icon: Facebook01Icon, color: "#1877F2" },
            { icon: TwitterIcon, color: "#1DA1F2" },
            { icon: InstagramIcon, color: "#E4405F" },
            { icon: Linkedin01Icon, color: "#0A66C2" },
          ].map((social, idx) => (
            <button
              key={idx}
              onClick={social.action}
              className="p-3 rounded-2xl bg-white/80 border border-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <HugeiconsIcon
                icon={social.icon}
                color={social.color}
                size={20}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
