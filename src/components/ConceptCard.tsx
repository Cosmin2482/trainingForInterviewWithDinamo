import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Lightbulb, Info, Megaphone, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { TacticalBoard } from './TacticalBoard.tsx';

interface Concept {
  id?: string;
  title: string;
  content: string;
  analogy: string;
  details: string[];
  visualType?: string;
}

export interface ConceptCardProps {
  moduleTitle: string;
  concepts: Concept[];
  color: string;
  onNextModule: () => void;
  onPrevModule: () => void;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ moduleTitle, concepts, color, onNextModule, onPrevModule }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentConcept = concepts[currentIndex];
  const isLastConcept = currentIndex === concepts.length - 1;
  const isFirstConcept = currentIndex === 0;

  const handleNext = () => {
    if (isLastConcept) {
      onNextModule();
      setCurrentIndex(0);
    } else {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (isFirstConcept) {
      onPrevModule();
    } else {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 max-w-5xl mx-auto p-2 md:p-4 lg:p-6 overflow-visible">
      {/* Header - Compact */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded">
              Modul Activ
            </span>
            <h1 className={`text-2xl md:text-3xl font-black text-neutral-900 uppercase italic tracking-tighter leading-tight`}>
              {moduleTitle}
            </h1>
          </div>
          <div className="text-right">
             <span className="text-neutral-400 text-xs font-mono font-bold">
                {currentIndex + 1} / {concepts.length}
              </span>
          </div>
        </div>
        
        {/* Progress Dots */}
        <div className="flex gap-1 mt-2 h-1.5">
          {concepts.map((_, idx) => (
            <div 
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                idx === currentIndex ? `flex-1 bg-red-600` : 'w-2 bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Card */}
      <div className="flex-1 relative perspective-1000 min-h-0">
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden h-full flex flex-col relative"
          >
            {/* Decorative Stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 z-10" />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              
              {/* Concept Header */}
              <div className="p-5 pb-2 bg-neutral-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-neutral-100">
                <h3 className="text-xl md:text-2xl font-black text-neutral-900 flex items-center gap-2 uppercase italic leading-none">
                  <Lightbulb className="w-5 h-5 text-red-600 flex-shrink-0" />
                  {currentConcept.title}
                </h3>
                <p className="mt-2 text-neutral-600 text-sm md:text-base font-medium leading-snug">
                  {currentConcept.content}
                </p>
              </div>

              <div className="p-5 space-y-6">
                {/* Tactical Board (Visual) */}
                {currentConcept.visualType && (
                  <div className="w-full">
                    <TacticalBoard type={currentConcept.visualType} />
                  </div>
                )}

                {/* Analogy Section */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-100 relative group hover:shadow-md transition-all">
                  <div className="absolute -top-2.5 left-4 bg-white px-2 py-0.5 rounded-full border border-red-100 text-[10px] font-bold text-red-600 uppercase flex items-center gap-1 shadow-sm">
                    <Megaphone size={10} />
                    Analogie de Peluză
                  </div>
                  <p className="text-neutral-800 text-base leading-relaxed italic font-medium mt-1">
                    "{currentConcept.analogy}"
                  </p>
                </div>

                {/* Technical Details */}
                {currentConcept.details.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-neutral-900 font-black uppercase text-[10px] tracking-wider opacity-70">
                      <ClipboardList size={12} />
                      Tactica Oficială
                    </div>
                    <div className="grid gap-2">
                      {currentConcept.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-100 shadow-sm text-sm">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0`} />
                          <span className="font-medium leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Footer - Fixed at bottom */}
            <div className="p-3 md:p-4 border-t border-neutral-100 bg-white flex justify-between items-center flex-shrink-0 z-20">
              <button
                onClick={handlePrev}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-bold uppercase tracking-wide transition-colors text-xs md:text-sm ${
                  isFirstConcept 
                    ? 'text-neutral-300 cursor-not-allowed' 
                    : 'hover:bg-neutral-100 text-neutral-600'
                }`}
                disabled={isFirstConcept}
              >
                <ChevronLeft size={16} />
                <span className="hidden md:inline">Înapoi</span>
              </button>
              
              <div className="flex gap-1">
                {/* Mini indicator dots for mobile if needed, or just keep it clean */}
              </div>

              <button
                onClick={handleNext}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-black uppercase tracking-wide shadow-lg shadow-red-600/20 transition-all active:scale-95 bg-red-600 hover:bg-red-700 text-xs md:text-sm`}
              >
                {isLastConcept ? "Următorul Modul" : "Următoarea Fază"}
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
