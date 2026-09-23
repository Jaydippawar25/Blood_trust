import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Droplet, Heart } from 'lucide-react';

export default function PageLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [statusText, setStatusText] = useState('Connecting to Regional Network...');

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds total loading time

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(currentProgress);

      if (elapsed < 500) {
        setStatusText('Connecting to Regional Network...');
      } else if (elapsed < 1000) {
        setStatusText('Syncing Inventory & Donors...');
      } else {
        setStatusText('Ready to Save Lives!');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#060b14] text-white flex flex-col items-center justify-center p-4 transition-opacity duration-500 ease-out select-none overflow-hidden ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes ecgGlow {
          0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.8)); }
          50% { opacity: 1; filter: drop-shadow(0 0 14px rgba(244, 63, 94, 1)); }
        }
        .ecg-glow {
          animation: ecgGlow 1.5s infinite alternate;
        }
      `}</style>

      {/* Ambient Red Glow Effects */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-red-600/30 to-rose-600/10 blur-[130px] animate-pulse pointer-events-none"></div>

      {/* MAIN BLOOD TRUST GLASS CARD */}
      <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-red-950/60 flex flex-col items-center text-center space-y-6 max-w-md w-full">
        
        {/* TOP STATUS BADGE */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-extrabold uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Lifesaver Portal</span>
        </div>

        {/* BLOOD TRUST BRANDING BADGE (Replaced BPM Counter) */}
        <div className="flex flex-col items-center justify-center space-y-2 py-1">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-red-600/20 animate-ping"></div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 flex items-center justify-center shadow-xl shadow-red-900/80 border border-white/20 z-10">
              <Droplet className="w-9 h-9 text-white fill-current animate-pulse" />
            </div>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-1 pt-1">
            <span>Blood Trust</span>
            <span className="text-red-500 text-2xl">•</span>
          </h1>
        </div>

        {/* ZIGZAG ECG PULSE WAVE GRAPH LOADER */}
        <div className="w-full space-y-2 pt-2">
          
          {/* ECG Wave SVG Monitor Box */}
          <div className="w-full h-20 bg-slate-950/90 rounded-2xl border border-slate-800/80 p-2 relative overflow-hidden flex items-center justify-center shadow-inner">
            
            {/* Background Medical Grid Lines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:12px_12px]"></div>

            {/* Background Dim ECG Wave Line */}
            <svg className="w-full h-full stroke-red-950/50 fill-none stroke-2 relative z-0" viewBox="0 0 400 60" preserveAspectRatio="none">
              <path d="M 0,30 L 80,30 L 90,10 L 105,50 L 120,5 L 135,55 L 150,30 L 230,30 L 240,10 L 255,50 L 270,5 L 285,55 L 300,30 L 400,30" />
            </svg>

            {/* Foreground Active Filling Red Zigzag ECG Wave Line */}
            <div
              className="absolute left-0 top-0 bottom-0 overflow-hidden transition-all duration-150 ease-out z-10"
              style={{ width: `${progress}%` }}
            >
              <svg className="w-[384px] sm:w-[400px] h-full stroke-red-500 fill-none stroke-[3] ecg-glow" viewBox="0 0 400 60" preserveAspectRatio="none">
                <path d="M 0,30 L 80,30 L 90,10 L 105,50 L 120,5 L 135,55 L 150,30 L 230,30 L 240,10 L 255,50 L 270,5 L 285,55 L 300,30 L 400,30" />
              </svg>
            </div>

            {/* Leading Pulse Spark Dot at current progress point */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff] z-20 transition-all duration-150"
              style={{ left: `calc(${progress}% - 5px)` }}
            ></div>
          </div>

          {/* Progress % and Status Text */}
          <div className="flex justify-between items-center text-[11px] font-mono font-bold text-slate-400 px-1 pt-1">
            <span className="flex items-center gap-1.5 text-red-400 truncate max-w-[240px]">
              <Activity className="w-3.5 h-3.5 animate-pulse shrink-0 text-red-500" />
              <span className="truncate">{statusText}</span>
            </span>
            <span className="text-white font-extrabold text-xs">{progress}%</span>
          </div>

        </div>

      </div>

      {/* FOOTER TEXT */}
      <div className="relative z-10 mt-6 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
        <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
        <span>Saving Lives Every Drop Counts</span>
      </div>

    </div>
  );
}
