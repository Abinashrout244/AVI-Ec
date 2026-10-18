import React from "react";

const Pegination = ({ productperpage, totalproducts, currPage, peginate }) => {
  const totalPages = Math.ceil(totalproducts / productperpage);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currPage > 3) pages.push("...");
      const start = Math.max(2, currPage - 1);
      const end   = Math.min(totalPages - 1, currPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase = {
    background: "rgba(255,255,255,0.05)",
    border:     "1px solid rgba(255,255,255,0.1)",
    color:      "rgba(255,255,255,0.5)",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "inherit",
  };

  const btnActive = {
    background: "linear-gradient(135deg,#fbbf24,#f59e0b)",
    border:     "1px solid #fbbf24",
    color:      "#0a0e1c",
    fontWeight: 700,
    borderRadius: 8,
    cursor: "pointer",
  };

  return (
    <div className="flex items-center justify-center gap-1.5 py-10 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => currPage > 1 && peginate(currPage - 1)}
        disabled={currPage === 1}
        style={{ ...btnBase, padding: "7px 14px", fontSize: 12, opacity: currPage === 1 ? 0.3 : 1 }}
        onMouseEnter={e => { if (currPage > 1) { e.target.style.borderColor = "rgba(251,191,36,0.4)"; e.target.style.color = "#fbbf24"; }}}
        onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
      >
        ← Prev
      </button>

      {/* Pages */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`el-${i}`} className="text-white/20 text-sm px-1">···</span>
        ) : (
          <button
            key={page}
            onClick={() => peginate(page)}
            style={currPage === page ? { ...btnActive, width: 36, height: 36 } : { ...btnBase, width: 36, height: 36, fontSize: 13 }}
            onMouseEnter={e => { if (currPage !== page) { e.target.style.borderColor = "rgba(251,191,36,0.35)"; e.target.style.color = "#fbbf24"; }}}
            onMouseLeave={e => { if (currPage !== page) { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "rgba(255,255,255,0.5)"; }}}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => currPage < totalPages && peginate(currPage + 1)}
        disabled={currPage === totalPages}
        style={{ ...btnBase, padding: "7px 14px", fontSize: 12, opacity: currPage === totalPages ? 0.3 : 1 }}
        onMouseEnter={e => { if (currPage < totalPages) { e.target.style.borderColor = "rgba(251,191,36,0.4)"; e.target.style.color = "#fbbf24"; }}}
        onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
      >
        Next →
      </button>
    </div>
  );
};

export default Pegination;
