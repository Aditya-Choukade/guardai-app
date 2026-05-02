// --- EXISTING FUNCTIONALITY: Handle Popup Messages ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTION") {
    const selection = window.getSelection()?.toString()?.trim() || "";
    sendResponse({ selection });
    return true;
  }

  if (message.type === "HIGHLIGHT_TEXT") {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const mark = document.createElement("mark");
      mark.style.cssText = `
        background: rgba(127, 119, 221, 0.25);
        border-radius: 2px;
        transition: background 0.3s;
      `;
      try {
        range.surroundContents(mark);
        setTimeout(() => {
          mark.outerHTML = mark.innerHTML;
        }, 3000);
      } catch (e) {
        // Selection spans multiple elements — skip highlighting
      }
    }
    sendResponse({ ok: true });
    return true;
  }
});

// --- NEW FUNCTIONALITY: Proactive Link Interceptor ---
const API_BASE = "http://localhost:8080";
let intercepting = true;

document.addEventListener("click", async (e) => {
  if (!intercepting) return;
  
  const link = e.target.closest("a[href]");
  if (!link) return;
  
  const href = link.href;
  if (!href.startsWith("http")) return; // skip anchors, mailto etc.

  e.preventDefault();
  e.stopImmediatePropagation();

  // Show instant loading overlay
  showOverlay({ status: "loading", url: href });

  try {
    const res = await fetch(`${API_BASE}/analyze/url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: href })
    });
    const data = await res.json();

    if (data.verdict === "Safe") {
      removeOverlay();
      window.location.href = href; // proceed normally
    } else {
      showOverlay({ status: "blocked", url: href, result: data });
    }
  } catch (error) {
    console.error("GuardAI interception error:", error);
    removeOverlay();
    window.location.href = href; // fail open — never block on error
  }
}, true); // use capture phase to intercept before site's own listeners

function showOverlay({ status, url, result }) {
  removeOverlay();
  const el = document.createElement("div");
  el.id = "guardai-overlay";
  el.style.cssText = `
    position:fixed;inset:0;z-index:2147483647;
    background:#0F172A;display:flex;align-items:center;
    justify-content:center;font-family:-apple-system,sans-serif;
  `;

  if (status === "loading") {
    el.innerHTML = `
      <div style="text-align:center;color:#94A3B8">
        <div style="width:40px;height:40px;border:2px solid rgba(127,119,221,0.2);
          border-top-color:#7F77DD;border-radius:50%;
          animation:guardai-spin .8s linear infinite;margin:0 auto 16px">
        </div>
        <div style="font-size:15px;color:#E2E8F0;margin-bottom:4px">Checking link safety…</div>
        <div style="font-size:12px">${truncate(url, 60)}</div>
      </div>
      <style>@keyframes guardai-spin{to{transform:rotate(360deg)}}</style>
    `;
    document.body.appendChild(el);
  } else {
    const v = result.verdict?.toLowerCase() || "suspicious";
    const color = v === "dangerous" ? "#EF4444" : "#F59E0B";
    const icon  = v === "dangerous" ? "🚨" : "⚠️";
    el.innerHTML = `
      <div style="max-width:480px;width:90%;background:#1E293B;
        border:1px solid ${color}44;border-radius:16px;padding:32px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);">
        <div style="font-size:40px;margin-bottom:12px">${icon}</div>
        <div style="font-size:22px;font-weight:700;color:${color};
          margin-bottom:8px">${result.verdict?.toUpperCase() || "UNKNOWN"}</div>
        <div style="font-size:13px;color:#94A3B8;
          margin-bottom:6px;word-break:break-all">${truncate(url, 70)}</div>
        <div style="font-size:14px;color:#CBD5E1;line-height:1.6;
          margin:16px 0;padding:12px;background:rgba(15,23,42,0.4);
          border-radius:8px">${escHtml(result.explanation || "")}</div>
        <div style="font-size:12px;color:${color};
          margin-bottom:20px">${escHtml(result.action || "")}</div>
        <div style="display:flex;gap:12px;justify-content:center">
          <button id="guardai-btn-back"
            style="padding:10px 24px;background:#7F77DD;color:white;
            border:none;border-radius:8px;font-size:14px;
            font-weight:600;cursor:pointer;transition:opacity 0.2s">
            Go back (safe)
          </button>
          <button id="guardai-btn-proceed"
            style="padding:10px 24px;background:transparent;
            color:#64748B;border:1px solid #334155;border-radius:8px;
            font-size:14px;cursor:pointer;transition:color 0.2s">
            Proceed anyway
          </button>
        </div>
        <div style="font-size:11px;color:#334155;margin-top:16px">
          Protected by GuardAI · Powered by Claude AI
        </div>
      </div>
    `;
    document.body.appendChild(el);

    // Attach event listeners instead of using inline onclick (to comply with strict CSPs on host pages)
    document.getElementById("guardai-btn-back").addEventListener("click", () => {
      removeOverlay();
    });
    
    document.getElementById("guardai-btn-proceed").addEventListener("click", () => {
      removeOverlay();
      window.location.href = url;
    });
  }
}

function removeOverlay() {
  const overlay = document.getElementById("guardai-overlay");
  if (overlay) {
    overlay.remove();
  }
}

function truncate(str, n) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n) + "…" : str;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
