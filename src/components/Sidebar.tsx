import { CURRICULUM } from '../data/curriculum.ts';
import { Trophy } from 'lucide-react';

interface SidebarProps {
  activeModuleIndex: number;
  onSelectModule: (index: number) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ activeModuleIndex, onSelectModule, isOpen, toggleSidebar }: SidebarProps) {
  const progress = Math.round(((activeModuleIndex + 1) / CURRICULUM.length) * 100);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed top-0 left-0 h-full bg-neutral-900 text-white w-80 transform transition-transform duration-300 z-50 overflow-y-auto border-r border-red-900/30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="p-6 border-b border-red-900/30 bg-gradient-to-b from-red-950 to-neutral-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-600 p-2 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <Trophy size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
              FC DINAMO <span className="text-red-600">PREP</span>
            </h1>
          </div>
          <p className="text-neutral-400 text-xs font-mono border-l-2 border-red-600 pl-2">
            "Câini până la moarte și dincolo de ea"
          </p>
        </div>

        <nav className="p-4 space-y-2">
          {CURRICULUM.map((module, index) => {
            const Icon = module.icon;
            const isActive = activeModuleIndex === index;
            
            return (
              <button
                key={module.id}
                onClick={() => {
                  onSelectModule(index);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group relative overflow-hidden
                  ${isActive 
                    ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] border border-red-500' 
                    : 'hover:bg-neutral-800 text-neutral-400 hover:text-white border border-transparent'
                  }
                `}
              >
                {/* Active Indicator Strip */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                )}

                <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-red-700 text-white' : 'bg-neutral-800 text-neutral-500 group-hover:bg-neutral-700 group-hover:text-red-500'}`}>
                  <Icon size={20} />
                </div>
                <span className="font-bold text-sm tracking-wide">{module.title}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 mt-auto border-t border-red-900/30">
          <div className="bg-neutral-800 rounded-lg p-3 text-center border border-neutral-700">
            <p className="text-xs text-neutral-500 uppercase font-bold mb-1">Status Antrenament</p>
            <div className="w-full bg-neutral-900 rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-red-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-white">Progres modul ({progress}%)</p>
          </div>
        </div>
      </div>
    </>
  );
}
