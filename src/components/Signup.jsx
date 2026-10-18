import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon } from "@hugeicons/core-free-icons";
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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#03050C] text-slate-100 p-4 relative overflow-hidden selection:bg-amber-400 selection:text-black">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="text-center mb-7">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-400/10 border border-amber-400/25 text-amber-300 mb-3 shadow-[0_0_12px_rgba(251,191,36,0.15)]">
            Create an Account
          </span>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Join the Experience
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-normal">
            Unlock bespoke shopping, priority curation & tracking
          </p>
        </div>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/60 focus:bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-slate-600 transition-all shadow-inner"
              placeholder="e.g. Abinash Rout"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/60 focus:bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-slate-600 transition-all shadow-inner"
              placeholder="name@example.com"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/60 focus:bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-slate-600 transition-all shadow-inner"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-1">
                Confirm
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-400/60 focus:bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-slate-600 transition-all shadow-inner"
                placeholder="••••••••"
              />
            </div>
          </div>

          {errMsg && (
            <div className="text-rose-400 text-xs font-semibold text-center bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-xl animate-shake">
              {errMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all duration-300 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.08]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
            <span className="bg-[#0b0f19] px-3 py-1 rounded-full text-slate-400 font-bold border border-white/10">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login Only */}
        <button
          type="button"
          onClick={handleRegister}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-200 shadow-sm active:scale-[0.98] group"
        >
          <HugeiconsIcon icon={GoogleIcon} color="#EA4335" size={19} className="group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-white tracking-wide">
            Sign up with Google
          </span>
        </button>

        {/* Bottom Login Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-xs">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-amber-300 font-bold hover:text-amber-200 underline underline-offset-4 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;