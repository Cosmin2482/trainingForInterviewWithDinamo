/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ConceptCard } from './components/ConceptCard';
import { Glossary } from './components/Glossary';
import { CURRICULUM } from './data/curriculum';
import { Menu, BookOpen, LayoutGrid } from 'lucide-react';

export default function App() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'learn' | 'glossary'>('learn');

  const activeModule = CURRICULUM[activeModuleIndex];

  const handleNextModule = () => {
    if (activeModuleIndex < CURRICULUM.length - 1) {
      setActiveModuleIndex(prev => prev + 1);
    }
  };

  const handlePrevModule = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans text-neutral-900">
      {/* Sidebar */}
      <Sidebar 
        activeModuleIndex={activeModuleIndex} 
        onSelectModule={(idx) => {
          setActiveModuleIndex(idx);
          setViewMode('learn'); // Switch back to learn mode when selecting a module
        }}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="p-4 bg-white border-b border-neutral-200 flex items-center justify-between shadow-sm z-30 relative">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg text-neutral-600"
            >
              <Menu size={24} />
            </button>
            <span className="font-black text-neutral-900 truncate max-w-[200px] lg:hidden uppercase italic">
              {viewMode === 'glossary' ? 'Glosar' : activeModule.title}
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex bg-neutral-100 p-1 rounded-lg border border-neutral-200">
            <button
              onClick={() => setViewMode('learn')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                viewMode === 'learn' 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <LayoutGrid size={16} />
              <span className="hidden sm:inline">Tactică</span>
            </button>
            <button
              onClick={() => setViewMode('glossary')}
              className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                viewMode === 'glossary' 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">Glosar</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-neutral-50 relative">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-red-600/5 rounded-full blur-3xl" />
            <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-neutral-900/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 h-full overflow-hidden">
            {viewMode === 'glossary' ? (
              <Glossary />
            ) : (
              <div className="h-full w-full overflow-hidden">
                <ConceptCard 
                  key={activeModule.id} // Forces reset when module changes
                  moduleTitle={activeModule.title}
                  concepts={activeModule.concepts}
                  color={activeModule.color} // Pass color for theming
                  onNextModule={handleNextModule}
                  onPrevModule={handlePrevModule}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
