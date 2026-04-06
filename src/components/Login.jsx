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
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden">
      <div className="max-w-md w-full glass-panel rounded-[2rem] p-6 md:p-10 transition-all duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Please enter your details
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
              placeholder="********"
            />
          </div>

          {errMsg && (
            <div className="text-rose-300 text-[11px] font-semibold text-center animate-pulse">
              {errMsg}
            </div>
          )}

          <div className="flex items-center justify-between text-[12px] px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-white/20 text-amber-300 focus:ring-amber-300 transition-all"
              />
              <span className="text-slate-400 group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-amber-300 font-semibold hover:underline underline-offset-4"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl bg-amber-300 text-slate-900 text-sm font-bold hover:bg-amber-200 shadow-lg shadow-amber-300/30 transition-all active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            New here?{" "}
            <Link
              to="/signup"
              className="text-amber-300 font-bold hover:underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white/10 px-4 py-1 rounded-full text-slate-400 font-bold border border-white/10">
              Quick Connect
            </span>
          </div>
        </div>

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
              className="p-3 rounded-2xl bg-white/10 border border-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <HugeiconsIcon icon={social.icon} color={social.color} size={20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
