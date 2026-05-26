import React, { useState } from 'react';
import { Palette, PlaySquare, HardDrive, NotebookPen, X } from 'lucide-react';

const features = [
  {
    icon: <Palette className="w-6 h-6 text-indigo-400" />,
    title: "Extreme Personalisation",
    description: "Make it truly yours. Add personalised wallpapers and update the cover image for any song in your library. Your vibe, your aesthetic."
  },
  {
    icon: <PlaySquare className="w-6 h-6 text-rose-400" />,
    title: "Audius & SoundCloud Configured",
    description: "Stream endlessly with two integrated APIs. We highly recommend using SoundCloud as it fetches the largest variety of available songs."
  },
  {
    icon: <HardDrive className="w-6 h-6 text-emerald-400" />,
    title: "Bring Your Own Audio",
    description: "Want to listen to something local? You can add songs or audio of your own making it function beautifully as an offline audio player."
  },
  {
    icon: <NotebookPen className="w-6 h-6 text-amber-400" />,
    title: "Integrated Notepad",
    description: "Capture your vibe. An integrated notepad allows you to write down your thoughts while listening. All data is securely tied to your user credentials."
  }
];

export default function USP() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-neutral-950 relative border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
            Designed around you.
          </h2>
          <p className="text-lg text-neutral-400">
            Four powerful features that make SKSS music stand out from traditional players. No fluff, just what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sneak peek gallery mockup */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {[
             "/Preview 1.jpg",
             "/Preview 2.jpg",
             "/Preview 3.jpg",
             "/Preview 4.jpg",
             "/Preview 5.jpg",
             "/Preview 6.jpg",
             "/Preview 7.jpg"
          ].map((src, i) => (
             <div 
               key={i} 
               onClick={() => setSelectedImage(src)}
               className="cursor-pointer aspect-[1/2] rounded-2xl overflow-hidden border border-neutral-800 relative group max-w-sm mx-auto w-full shadow-lg"
             >
                <div className="absolute inset-0 bg-neutral-900 animate-pulse -z-10" />
                <img src={src} alt={`App UI Preview ${i + 1}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
             </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="relative w-full max-w-4xl h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Fullscreen Preview" 
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl" 
            />
          </div>
        </div>
      )}

    </section>
  );
}
