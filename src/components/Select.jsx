import React, { useEffect, useRef, useState } from "react";

const ALL = "all";

const Select = ({ select, onChange, categories = [] }) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);
  const ref = useRef(null);

  const options = [{ value: ALL, label: "All Categories" }].concat(
    categories.map((c) => ({ value: c, label: c })),
  );
  const current = options.find((o) => o.value === select) || options[0];

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const choose = (value) => {
    onChange(value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHover((h) => (h + 1) % options.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setHover((h) => (h <= 0 ? options.length - 1 : h - 1));
    }
    if (e.key === "Enter" && open && hover >= 0) {
      e.preventDefault();
      choose(options[hover].value);
    }
  };

  return (
    <div ref={ref} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          setHover(options.findIndex((o) => o.value === select));
        }}
        className={`group flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium tracking-wide outline-none transition-all duration-200 hover:bg-white/5 focus-visible:ring-1 focus-visible:ring-[#d4af7a]/60 ${
          open ? "bg-white/5 text-[#d4af7a]" : "text-white/90"
        }`}
      >
        <span className="max-w-[130px] truncate">{current.label}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`h-3.5 w-3.5 shrink-0 text-[#d4af7a] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        role="listbox"
        className={`absolute bottom-full left-0 z-50 mb-3 max-h-64 w-56 origin-bottom-left overflow-y-auto rounded-2xl border border-white/10 bg-[#120c19]/95 p-1.5 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-200 [scrollbar-width:thin] [scrollbar-color:#3b2a4d_transparent] ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        {options.map((opt, i) => {
          const active = opt.value === select;
          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={active}
              onMouseEnter={() => setHover(i)}
              onClick={() => choose(opt.value)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                active ? "text-[#d4af7a]" : "text-white/70"
              } ${hover === i ? "bg-gradient-to-r from-violet-400/15 to-transparent text-white" : ""} ${
                active && hover !== i ? "bg-white/[0.03]" : ""
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {active && (
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={`h-3.5 w-3.5 shrink-0 text-[#d4af7a] transition-transform duration-300 ${
                    open ? "" : "rotate-180"
                  }`}
                >
                  <path
                    d="M5 8l5 5 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
