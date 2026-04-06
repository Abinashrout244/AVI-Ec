import React, { useState, useContext } from "react";
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

const Signup = () => {
  const [errMsg, setErrMsg] = useState("");
  const { signUpWithEmail, createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/cart-page";

  const handleRegister = () => {
    signUpWithEmail()
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrMsg("Passwords don't match!");
    } else {
      setErrMsg("");
      createUser(email, password)
        .then((userInfo) => {
          alert("Account Created!");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          alert(`${error.message}`);
        });
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden">
      <div className="max-w-md w-full glass-panel rounded-[2rem] p-6 md:p-8 transition-all duration-500">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Join Us
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            Experience the excellence
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSignup}>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
              placeholder="Display Name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
              placeholder="email@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
                placeholder="********"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Confirm
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-300 transition-all text-sm text-white placeholder:text-slate-500"
                placeholder="********"
              />
            </div>
          </div>

          {errMsg && (
            <div className="text-rose-300 text-[11px] font-semibold text-center animate-pulse">
              {errMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-amber-300 text-slate-900 text-sm font-bold hover:bg-amber-200 shadow-md transition-all active:scale-95"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-slate-400 text-sm">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-amber-300 font-semibold hover:underline underline-offset-4"
            >
              Log In
            </Link>
          </p>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white/10 px-3 py-0.5 rounded-full text-slate-400 font-bold border border-white/10">
              OR
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
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
              className="p-2.5 rounded-xl bg-white/10 border border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <HugeiconsIcon icon={social.icon} color={social.color} size={20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signup;
