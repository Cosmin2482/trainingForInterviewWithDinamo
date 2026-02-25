import { CURRICULUM } from '../data/curriculum.ts';
import { Search, Megaphone } from 'lucide-react';
import { useState } from 'react';

export function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const totalConcepts = CURRICULUM.reduce((acc, module) => acc + module.concepts.length, 0);

  const filteredModules = CURRICULUM.map(module => ({
    ...module,
    concepts: module.concepts.filter(c => 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.analogy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.details.some(detail => detail.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(m => m.concepts.length > 0);

  const visibleConcepts = filteredModules.reduce((acc, module) => acc + module.concepts.length, 0);

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-neutral-900 mb-4 uppercase italic tracking-tighter">
            Glosar <span className="text-red-600">Complet</span>
          </h1>
          <p className="text-sm text-neutral-600 mb-3 font-medium">
            Acoperire studiu: <span className="font-black text-red-600">{visibleConcepts}</span> / {totalConcepts} concepte.
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input 
              type="text"
              placeholder="Caută o schemă tactică..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none shadow-sm bg-white text-neutral-900 placeholder:text-neutral-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-12">
          {filteredModules.map((module) => (
            <div key={module.id} className="space-y-4">
              <h2 className="text-xl font-black text-red-600 uppercase tracking-wider border-b-2 border-red-100 pb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                {module.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {module.concepts.map((concept, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all hover:border-red-200 group">
                    <h3 className="font-bold text-lg text-neutral-900 mb-2 group-hover:text-red-600 transition-colors">{concept.title}</h3>
                    <p className="text-neutral-600 text-sm mb-4">{concept.content}</p>
                    <div className="bg-neutral-50 p-3 rounded-lg text-sm text-neutral-700 italic border-l-4 border-red-600">
                      <div className="flex items-center gap-1 mb-1 text-red-600 font-bold text-xs uppercase">
                        <Megaphone size={12} />
                        Analogie
                      </div>
                      "{concept.analogy}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredModules.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              Nu am găsit nimic pentru "{searchTerm}". Încearcă altceva, poate "Gol"?
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
