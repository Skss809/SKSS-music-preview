import React from 'react';
import { Download, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-neutral-950 -z-10" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-600/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-300 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Version 1.0 Available Now</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Not just a player, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                your daily hustler.
              </span>
            </h1>
            
            <p className="text-lg text-neutral-400 mb-8 leading-relaxed max-w-xl text-balance">
              SKSS music is designed to be with you through your grind. It ensures it delivers a listening experience that is both visually stunning and intelligently curated.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a 
                href="https://drive.google.com/file/d/1B0gBi8HWzFx31lQx9ILVS-XVCU7e4oPF/view?usp=drivesdk" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-neutral-200 transition-colors"
                title="Download via Google Drive"
              >
                <Download className="w-5 h-5" />
                Download App
              </a>
              <p className="text-xs text-neutral-500 max-w-xs">
                com.musicpwa.app <br /> Requires Android 8.0+
              </p>
            </div>
          </div>

          {/* Hero visual representation */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="relative rounded-[3rem] border-[12px] border-neutral-900 bg-neutral-950 p-[2px] shadow-[0_0_50px_rgba(0,0,0,0.5)] h-[700px] overflow-hidden ring-1 ring-neutral-800 translate-y-6 lg:translate-y-0">
               {/* Mobile Notch */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-neutral-900 rounded-b-3xl z-20 drop-shadow-md" />

               {/* Background and Big Animated Logo */}
               <div className="absolute inset-0 bg-neutral-950 rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                 {/* Decorative background glows */}
                 <div className="absolute w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
                 <div className="absolute w-64 h-64 bg-rose-600/20 rounded-full blur-3xl bottom-20 -right-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                 
                 {/* Big Animated S Logo */}
                 <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center animate-bounce shadow-[0_0_80px_rgba(99,102,241,0.5)]">
                     <span className="text-white font-black text-8xl tracking-tighter drop-shadow-2xl">S</span>
                 </div>
               </div>
               
               {/* UI overlay mock */}
               <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pt-10">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-bold drop-shadow-md text-lg">Good Evening</span>
                    
                    {/* Animated S icon requested by user */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center animate-pulse shadow-lg ring-4 ring-indigo-500/20">
                      <span className="text-white font-black text-xl tracking-tighter">S</span>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-4">
                      {/* Nagato Cover Image */}
                      <div className="w-16 h-16 rounded-xl bg-neutral-800 overflow-hidden shrink-0 shadow-inner">
                        <img src="/Nagato image.jpg" alt="Cover" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm mb-1 truncate">Playing Now</div>
                        <div className="text-white/60 text-xs mb-3 truncate">Your daily vibe</div>
                        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                           <div className="h-full w-1/3 bg-indigo-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
