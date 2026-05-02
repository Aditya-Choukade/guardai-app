"use client";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [inputText, setInputText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [verdictResult, setVerdictResult] = useState<any>(null);

  const handleScan = async () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
    setVerdictResult(null);
    try {
      const res = await fetch("http://127.0.0.1:8080/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setVerdictResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };
  return (
    <>
      


<main className="pt-24 pb-12 px-8 min-h-screen flex flex-col items-center pt-[15vh] relative">
<div className="w-full max-w-3xl space-y-8 relative z-10">
  <div className="text-center mb-12">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container/10 mb-6">
        <span className="material-symbols-outlined text-3xl text-primary-container">radar</span>
    </div>
    <h1 className="font-headline-lg text-white mb-3 tracking-tight">Anomaly Engine</h1>
    <p className="text-zinc-500 font-body-md max-w-md mx-auto">Paste any suspicious text, message, or URL below. Our AI infrastructure will analyze it in real-time.</p>
  </div>
  
  {/* Scan Panel */}
  <div className="bg-black border border-zinc-800 p-2 rounded-xl relative overflow-hidden shadow-sm flex flex-col md:flex-row gap-2 transition-all hover:border-zinc-700 focus-within:border-primary-container">
    <div className="flex-1 relative flex items-center">
      <span className="material-symbols-outlined text-zinc-600 ml-4 absolute pointer-events-none">search</span>
      <input 
        className="w-full bg-transparent border-none focus:ring-0 text-white pl-12 pr-4 py-4 font-label-mono text-sm outline-none placeholder:text-zinc-600" 
        placeholder="Paste text or URL to analyze..." 
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleScan()}
      />
    </div>
    <button 
      onClick={handleScan}
      disabled={isScanning}
      className="bg-primary-container text-black font-bold font-space-grotesk px-8 py-4 rounded-lg hover:bg-white transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[140px]">
      {isScanning ? (
        <span className="material-symbols-outlined animate-spin text-xl">refresh</span>
      ) : (
        "Analyze"
      )}
    </button>
  </div>

  {/* Verdict Card */}
  {verdictResult && (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500 mt-12">
      <div className={`p-6 flex items-center justify-between border-b ${verdictResult.verdict === 'Dangerous' ? 'bg-red-500/10 border-red-500/20' : verdictResult.verdict === 'Suspicious' ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-primary-container/10 border-primary-container/20'}`}>
        <div className="flex items-center gap-3">
            <span className={`material-symbols-outlined ${verdictResult.verdict === 'Dangerous' ? 'text-red-500' : verdictResult.verdict === 'Suspicious' ? 'text-yellow-500' : 'text-primary-container'}`} data-weight="fill">
            {verdictResult.verdict === 'Dangerous' ? 'warning' : verdictResult.verdict === 'Suspicious' ? 'priority_high' : 'verified'}
            </span>
            <span className={`font-label-caps tracking-widest ${verdictResult.verdict === 'Dangerous' ? 'text-red-500' : verdictResult.verdict === 'Suspicious' ? 'text-yellow-500' : 'text-primary-container'}`}>
            {verdictResult.verdict === 'Dangerous' ? 'CRITICAL THREAT' : verdictResult.verdict === 'Suspicious' ? 'ELEVATED RISK' : 'SYSTEM SECURE'}
            </span>
        </div>
        <span className="font-label-mono text-zinc-500 text-xs">
            CONFIDENCE: {Math.round(verdictResult.confidence * 100)}%
        </span>
      </div>
      <div className="p-8">
        <h2 className="font-headline-md text-white mb-4">{verdictResult.verdict}</h2>
        <p className="text-zinc-400 font-body-md mb-8 leading-relaxed">{verdictResult.explanation}</p>
        <div className="space-y-4">
        <div>
            <h4 className="font-label-caps text-zinc-600 text-[10px] tracking-widest uppercase mb-2">Recommended Action</h4>
            <div className="bg-black border border-zinc-800 rounded-lg p-4">
                <p className="text-white font-body-sm flex items-start gap-3">
                    <span className="material-symbols-outlined text-zinc-500 text-sm mt-0.5">info</span>
                    {verdictResult.action}
                </p>
            </div>
        </div>
        {verdictResult.urls_found && verdictResult.urls_found.length > 0 && (
            <div>
              <h4 className="font-label-caps text-zinc-600 text-[10px] tracking-widest uppercase mb-2 mt-6">URL Analysis</h4>
              <div className="bg-black border border-zinc-800 rounded-lg p-4 space-y-3">
              {verdictResult.urls_found.map((u: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-zinc-900 pb-3 last:border-0 last:pb-0">
                  <span className="text-zinc-300 font-label-mono truncate mr-4">{u.url}</span>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${u.url_verdict === 'malicious' ? 'bg-red-500/20 text-red-500' : 'bg-primary-container/20 text-primary-container'}`}>
                      {u.url_verdict}
                  </span>
                </div>
              ))}
              </div>
            </div>
        )}
        </div>
      </div>
    </div>
  )}
</div>
</main>
{/* BottomNavBar for Mobile */}
<nav className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t border-zinc-900 flex justify-around items-center h-16 z-50">
<button className="flex flex-col items-center gap-1 text-primary-container">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-[10px] font-space-grotesk">Dashboard</span>
</button>
<button className="flex flex-col items-center gap-1 text-zinc-500">
<span className="material-symbols-outlined">security</span>
<span className="text-[10px] font-space-grotesk">Scans</span>
</button>
<button className="flex flex-col items-center gap-1 text-zinc-500">
<span className="material-symbols-outlined">hub</span>
<span className="text-[10px] font-space-grotesk">Hub</span>
</button>
<button className="flex flex-col items-center gap-1 text-zinc-500">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-space-grotesk">Settings</span>
</button>
</nav>
{/* Contextual FAB */}
<button className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shield_with_heart</span>
</button>

    </>
  );
}
