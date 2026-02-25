import React from 'react';
import { motion } from 'motion/react';

interface TacticalBoardProps {
  type: string;
}

export const TacticalBoard: React.FC<TacticalBoardProps> = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case 'error-types':
        return (
          <div className="relative w-full h-48 bg-green-800 rounded-lg border-4 border-white overflow-hidden flex items-center justify-center">
            {/* Field Lines */}
            <div className="absolute w-full h-0.5 bg-white/30 top-1/2" />
            <div className="absolute w-24 h-24 border-2 border-white/30 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            {/* Compile Time Error */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute left-4 top-4 bg-red-600 text-white text-xs p-2 rounded shadow-lg z-10"
            >
              ⛔ Compile: Stop la Vestiar!
            </motion.div>

            {/* Runtime Error */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute right-10 top-1/2 bg-yellow-500 text-black text-xs p-2 rounded shadow-lg z-10"
            >
              ⚠️ Runtime: Ruptură pe teren!
            </motion.div>
          </div>
        );

      case 'stack-heap':
        return (
          <div className="flex gap-4 w-full h-48">
            {/* Stack */}
            <div className="w-1/3 bg-slate-200 rounded-lg p-2 flex flex-col-reverse gap-1 border-2 border-slate-400">
              <div className="text-center text-xs font-bold mb-1 text-slate-600">STACK (Vestiar)</div>
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-blue-500 h-8 rounded text-white text-xs flex items-center justify-center"
                >
                  Val {i}
                </motion.div>
              ))}
            </div>
            
            {/* Heap */}
            <div className="flex-1 bg-green-100 rounded-lg p-2 relative border-2 border-green-400 overflow-hidden">
              <div className="text-center text-xs font-bold mb-1 text-green-800">HEAP (Teren)</div>
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="absolute w-8 h-8 bg-red-600 rounded-full text-white text-xs flex items-center justify-center shadow-sm"
                  style={{ 
                    top: `${Math.random() * 60 + 20}%`, 
                    left: `${Math.random() * 80}%` 
                  }}
                >
                  Obj
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'garbage-collection':
        return (
          <div className="relative w-full h-48 bg-green-800 rounded-lg border-4 border-white overflow-hidden">
             {/* Players */}
             {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  className="absolute w-6 h-6 bg-red-600 rounded-full border border-white"
                  style={{ top: '30%', left: `${20 * i}%` }}
                />
             ))}
             {/* Garbage Player */}
             <motion.div 
                animate={{ opacity: [1, 0.5, 0], scale: [1, 0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-6 h-6 bg-gray-400 rounded-full border border-dashed border-white"
                style={{ top: '60%', left: '50%' }}
             />
             {/* GC Truck */}
             <motion.div 
                animate={{ x: [-50, 200] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-2 left-0 w-16 h-8 bg-yellow-400 rounded flex items-center justify-center text-xs font-bold"
             >
               GC 🚜
             </motion.div>
          </div>
        );

      case 'class-object':
        return (
          <div className="flex items-center justify-around w-full h-48 bg-slate-50 rounded-lg border border-slate-200 p-4">
            <div className="text-center">
              <div className="w-20 h-24 bg-blue-100 border-2 border-blue-500 border-dashed rounded flex items-center justify-center mb-2">
                📝
              </div>
              <div className="text-xs font-bold">Clasă (Schiță)</div>
            </div>
            <div className="text-2xl">➡️</div>
            <div className="text-center">
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-20 h-24 bg-red-600 rounded-lg shadow-lg flex items-center justify-center text-white text-2xl mb-2"
              >
                🏃
              </motion.div>
              <div className="text-xs font-bold">Obiect (Jucător)</div>
            </div>
          </div>
        );
        
      case 'inheritance':
        return (
          <div className="flex flex-col items-center w-full h-48 bg-slate-50 rounded-lg border border-slate-200 p-4 justify-center">
             <div className="w-32 p-2 bg-blue-500 text-white rounded text-center text-sm font-bold mb-4">
               Base Class (Fotbalist)
             </div>
             <div className="w-0.5 h-8 bg-slate-400 mb-4" />
             <div className="flex gap-4">
               <motion.div 
                 whileHover={{ scale: 1.1 }}
                 className="w-24 p-2 bg-red-500 text-white rounded text-center text-xs"
               >
                 Atacant
               </motion.div>
               <motion.div 
                 whileHover={{ scale: 1.1 }}
                 className="w-24 p-2 bg-green-500 text-white rounded text-center text-xs"
               >
                 Portar
               </motion.div>
             </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
            <div className="text-center">
              <div className="text-4xl mb-2">⚽</div>
              <div className="text-sm">Tactica se încarcă...</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full my-4 shadow-inner rounded-xl overflow-hidden bg-white">
      {renderContent()}
    </div>
  );
};
