import React, { Suspense, lazy, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import searchIcon from "../assets/icons/search-2.svg";
import Select from "../components/Select";
import { fetchProducts } from "../api.js";

const BannerScene = lazy(() => import("./BannerScene.jsx"));
const serif = "font-['Instrument_Serif',Georgia,serif]";
const sans = "font-['Hanken_Grotesk',system-ui,sans-serif]";
const TRENDING = ["Electronics", "Fashion", "Beauty", "Shoes", "Bags", "Phones"];

const detectLowPower = () => {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8;
  return Boolean(coarse) || cores <= 4 || mem <= 4;
};

const detectWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
};

/* Pauses rendering when the banner is off-screen or the tab is hidden. */
const useActive = (ref) => {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    let inView = true;
    const update = () => setActive(inView && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [ref]);
  return active;
};

/* ───────────────────────── shared textures (CPU-drawn, no network) ───────────────────────── */

const Banner = () => {
  const containerRef = useRef(null);
  const searchBoxRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [sceneEnabled, setSceneEnabled] = useState(false);

  const [lowPower] = useState(detectLowPower);
  const [webgl, setWebgl] = useState(true);
  const [ready, setReady] = useState(false);
  const maxDpr = lowPower ? 1.25 : 1.75;
  const [dpr, setDpr] = useState(maxDpr);

  const active = useActive(containerRef);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(
        () => setSceneEnabled(true),
        { timeout: 900 },
      );
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timer = window.setTimeout(() => setSceneEnabled(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setWebgl(detectWebGL());
  }, []);

  /* products */
  useEffect(() => {
    let alive = true;
    fetchProducts()
      .then((r) => {
        const list = Array.isArray(r) ? r : r?.data || r?.products || [];
        if (alive) setProducts(list);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  /* search (derived — no extra state/effect round trip) */
  const index = useMemo(
    () =>
      products.map((p) => ({
        p,
        name: String(p?.name ?? "").toLowerCase(),
        cat: String(p?.category ?? "").toLowerCase(),
      })),
    [products],
  );
  const deferred = useDeferredValue(searchText);
  const results = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((r) => r.name.includes(q) || r.cat.includes(q))
      .slice(0, 6)
      .map((r) => r.p);
  }, [deferred, index]);
  const showDropdown = open && searchText.trim().length > 0;

  /* close dropdown on outside click */
  useEffect(() => {
    const onDown = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  /* subtle mouse parallax — fine pointers only, never on touch */
  useEffect(() => {
    if (reduced || typeof window === "undefined") return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return undefined;
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  /* scroll */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const spring = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.3,
    restDelta: 0.0005,
  });
  const smooth = reduced ? scrollYProgress : spring;

  useEffect(
    () => smooth.on("change", (v) => v > 0.04 && setOpen(false)),
    [smooth],
  );

  const curtainOpacity = useTransform(smooth, [0, 0.12], [1, 0]);
  const heroOpacity = useTransform(smooth, [0, 0.13], [1, 0]);
  const heroScale = useTransform(smooth, [0, 0.16], [1, 1.12]);
  const heroY = useTransform(smooth, [0, 0.16], [0, -50]);
  // Once faded out, the hero must stop catching taps/focus.
  const heroPointer = useTransform(heroOpacity, (v) =>
    v > 0.04 ? "auto" : "none",
  );
  const heroVisibility = useTransform(heroOpacity, (v) =>
    v > 0.01 ? "visible" : "hidden",
  );

  const interiorOpacity = useTransform(smooth, [0.42, 0.72, 0.94], [0, 1, 0]);
  const interiorScale = useTransform(smooth, [0.42, 0.76], [0.95, 1.04]);

  /* navigation */
  const goToProduct = useCallback(
    (item) => {
      setOpen(false);
      navigate(`/shop/${item._id || item.id}`);
    },
    [navigate],
  );

  const submitSearch = (e) => {
    e.preventDefault();
    if (showDropdown && activeIdx >= 0 && results[activeIdx]) {
      goToProduct(results[activeIdx]);
      return;
    }
    const query = searchText.trim();
    setOpen(false);
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActiveIdx(-1);
      return;
    }
    if (!showDropdown || !results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    }
  };

  const onGlCreated = useCallback(({ gl }) => {
    gl.toneMappingExposure = 1.05;
    gl.domElement.addEventListener(
      "webglcontextlost",
      (ev) => ev.preventDefault(),
      false,
    );
    setReady(true);
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="AVI Studio flagship"
      className={`${sans} relative bg-[#070509] text-[#f3ecf4]`}
      style={{ height: "320svh" }}
    >
      <div
        className="sticky top-0 flex w-full items-center justify-center overflow-hidden"
        style={{ height: "100svh" }}
      >
        <Suspense fallback={<div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-[1400ms] ease-out opacity-0" aria-hidden="true"><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070509] via-transparent to-[#070509]/60" /></div>}>
          {sceneEnabled && <BannerScene ready={ready} active={active} webgl={webgl} dpr={dpr} maxDpr={maxDpr} setDpr={setDpr} onGlCreated={onGlCreated} progress={smooth} pointerRef={pointerRef} reduced={reduced} lowPower={lowPower} />}
        </Suspense>

        {/* ── CURTAIN (gradient, not a 160px blur — far cheaper on mobile GPUs) ── */}
        <motion.div
          style={{ opacity: curtainOpacity }}
          className="pointer-events-none absolute inset-0 z-[1] bg-[#070509]"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[min(900px,140vmin)] w-[min(900px,140vmin)] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(closest-side, rgba(196,161,245,0.17), rgba(196,161,245,0.05) 55%, transparent)",
            }}
          />
        </motion.div>

        {/* ── HERO ── */}
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            pointerEvents: heroPointer,
            visibility: heroVisibility,
            willChange: "transform, opacity",
          }}
          className="relative z-10 flex max-h-full w-full max-w-[940px] flex-col items-center px-5 pt-6 text-center sm:px-6 sm:pt-10"
        >
          <div className="mb-4 flex items-center gap-3 sm:mb-6">
            <span className="h-px w-5 bg-white/20 sm:w-6" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 sm:text-[10px] sm:tracking-[0.35em]">
              AVI STUDIO · THE ART OF GIVING
            </span>
            <span className="h-px w-5 bg-white/20 sm:w-6" />
          </div>

          <h1
            className={`${serif} font-normal leading-[0.9] tracking-[-0.03em] text-white`}
            style={{ fontSize: "clamp(2.75rem, min(14vw, 15svh), 7.8rem)" }}
          >
            Where Love <span className="italic text-[#c4a1f5]">Blooms</span>
          </h1>

          <p className="mt-4 max-w-md text-[13px] font-light tracking-wide text-white/60 sm:mt-5 sm:text-base [@media(max-height:560px)]:hidden">
            Thoughtfully curated flowers, timeless arrangements, and beautiful
            moments crafted to make every occasion unforgettable.
          </p>

          {/* Search */}
          <div
            ref={searchBoxRef}
            className="relative mt-6 w-full max-w-[620px] sm:mt-8"
          >
            <form
              onSubmit={submitSearch}
              role="search"
              className="group flex items-center rounded-full border border-white/15 bg-[#0f0a15]/90 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-300 focus-within:border-[#c4a1f5]/60 focus-within:bg-[#120c19]/95 sm:bg-[#0f0a15]/80 sm:p-2 sm:backdrop-blur-xl"
            >
              <div className="hidden border-r border-white/10 pl-4 pr-3 sm:block">
                <Select select="all" />
              </div>
              <input
                type="text"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                role="combobox"
                aria-expanded={showDropdown}
                aria-controls="banner-search-list"
                aria-autocomplete="list"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setActiveIdx(-1);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                placeholder="Search collections, evening wear, atelier..."
                /* 16px on phones prevents iOS Safari from zooming the page on focus */
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-[16px] font-light tracking-wide text-white outline-none placeholder:text-white/35 sm:text-[13px]"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#d9b55f] text-[#120a1a] transition-transform duration-300 hover:scale-105 hover:bg-[#e6c46e] active:scale-95"
              >
                <img src={searchIcon} alt="" className="size-4" />
              </button>
            </form>

            <AnimatePresence>
              {showDropdown && (
                <motion.ul
                  id="banner-search-list"
                  role="listbox"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 right-0 z-50 mt-2 max-h-[240px] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#0e0914] p-2 text-left shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
                >
                  {results.length > 0 ? (
                    results.map((item, i) => (
                      <li
                        key={item._id || item.id}
                        role="option"
                        aria-selected={i === activeIdx}
                      >
                        <button
                          type="button"
                          onClick={() => goToProduct(item)}
                          onMouseEnter={() => setActiveIdx(i)}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                            i === activeIdx ? "bg-white/10" : "hover:bg-white/5"
                          }`}
                        >
                          <span className="truncate text-sm text-white/90 sm:text-xs">
                            {item.name}
                          </span>
                          <span className="ml-3 shrink-0 text-[10px] uppercase tracking-widest text-[#d9b55f]">
                            View →
                          </span>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-center text-xs text-white/35">
                      No pieces found
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/45 sm:mt-6 sm:gap-x-7 sm:tracking-[0.22em]">
            {TRENDING.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="py-1 transition-colors hover:text-white"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-12 [@media(max-height:680px)]:hidden">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
              Scroll to Enter
            </span>
            <div className="h-8 w-px animate-pulse bg-gradient-to-b from-[#c4a1f5] via-[#d9b55f] to-transparent" />
          </div>
        </motion.div>

        {/* ── SHOWROOM GREETING ── */}
        <motion.div
          style={{
            opacity: interiorOpacity,
            scale: interiorScale,
            willChange: "transform, opacity",
          }}
          className="pointer-events-none absolute z-20 flex flex-col items-center px-6 text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#d9b55f]">
            The Atelier &amp; Footwear Salon
          </span>
          <h2
            className={`${serif} mt-2 text-white`}
            style={{
              fontSize: "clamp(3rem, min(12vw, 16svh), 6.5rem)",
              lineHeight: 1,
            }}
          >
            Welcome Inside
          </h2>
          <p className="mt-4 max-w-sm text-sm font-light text-white/60">
            Now exploring couture dresses and limited sneakers. Scroll down to
            browse all pieces.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
