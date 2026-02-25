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

  const deepDiveMap: Record<string, string[]> = {
    'error-types': [
      'Diagnostic flow: reproducere → categorisire (syntax/runtime/logical) → fix minim → test de regresie.',
      'Compară două bug-uri similare și explică de ce unul oprește build-ul, iar altul apare doar în meciul din producție.',
      'Leagă severitatea de impact: ce tratezi imediat, ce planifici pentru sprint-ul următor.',
    ],
    'memory-flow': [
      'Explică value vs reference semantics și cum influențează mutabilitatea stării.',
      'Leagă call stack-ul de profiling: unde apar blocaje și recursion depth riscant.',
      'Descrie ce ai măsura înainte să optimizezi memoria „după instinct”.',
    ],
    'gc-arena': [
      'GC tuning: urmărește allocation rate, pause time și pressure pe generații.',
      'Hunting leaks: verifică cache-uri nelimitate, subscriptions uitate, obiecte long-lived.',
      'Explică trade-off throughput vs latency pe scenarii de trafic ridicat.',
    ],
    'debug-lab': [
      'Construiește o strategie de debugging reproducibilă: logs, breakpoints, watch, call stack.',
      'Alege excepțiile tratate local versus cele propagate spre boundary handlers.',
      'Transformă un incident într-un runbook clar pentru echipă.',
    ],
    'oop-core': [
      'Definește invariants în constructor și explică de ce previn stări invalide.',
      'Compară obiecte anemice vs obiecte bogate în comportament pentru business logic.',
      'Arată cum modelezi domeniul fără să supraîncarci o singură clasă.',
    ],
    'oop-relations': [
      'Compară composition vs inheritance pe un exemplu enterprise concret.',
      'Explică cum polimorfismul reduce if-else chaining și simplifică extensia.',
      'Leagă relațiile OOP de testabilitate și de schimbări viitoare.',
    ],
    'oop-contracts': [
      'Definește contracte mici și stabile între module ca să reduci coupling-ul.',
      'Explică diferența pragmatică dintre interface și abstract class într-un sistem real.',
      'Arată ce semnale indică design rigid și unde refactorizezi minim.',
    ],
    'solid-shield': [
      'Pentru fiecare principiu SOLID, dă încălcarea și refactorul minim care repară problema.',
      'Conectează SOLID la efecte observabile: bug rate, PR friction, onboarding time.',
      'Explică când aplicarea rigidă creează ceremonie fără valoare.',
    ],
    'patterns-map': [
      'Alege pattern-ul după problemă, nu după popularitate.',
      'Compară Factory/Builder/Singleton prin cost de mentenanță și testare.',
      'Explică semnalul din cod care îți spune „aici merită un pattern”.',
    ],
    'patterns-flow': [
      'Leagă Strategy/Observer/Adapter/Decorator de use-case-uri concrete din produs.',
      'Descrie cum Repository + DI reduc dependențe și accelerează testele.',
      'Explică ce pattern ai evita aici și de ce.',
    ],
    'anti-patterns': [
      'Identifică simptome timpurii de God Object și Spaghetti code.',
      'Propune refactor incremental, fără rescriere „big bang”.',
      'Definește metrici care confirmă că designul chiar s-a îmbunătățit.',
    ],
    'testing-pyramid': [
      'Mapează defectele pe niveluri de test: unit, integration, e2e.',
      'Ajustează distribuția testelor după risc și cost, nu după modă.',
      'Explică de ce „mai multe e2e” poate încetini feedback-ul echipei.',
    ],
    'testing-lab': [
      'Alege corect test doubles: mock pentru interacțiuni, fake pentru comportament aproape real.',
      'Descrie AAA + izolare + stabilitate ca standard minim de calitate.',
      'Leagă coverage-ul de risc real, nu de vanity metrics.',
    ],
    'testing-decision': [
      'Definește când NU unit testezi cod trivial și de ce.',
      'Explică cum prioritizezi testele pe zonele cu impact business mare.',
      'Transformă un bug real în caz de regresie obligatoriu.',
    ],
    'http-flow': [
      'Desenează fluxul complet request/response cu headers relevante și boundary validation.',
      'Separă clar metadata HTTP de payload business.',
      'Leagă contractul HTTP de observability și troubleshooting în producție.',
    ],
    'http-status': [
      'Alege method + status code pe semantică, nu pe conveniență.',
      'Explică idempotency și impactul ei în retry-uri și reziliență.',
      'Descrie diferența de UX și securitate între 401, 403, 404, 409.',
    ],
    'angular-formation': [
      'Arată cum structurezi componente/servicii ca să eviți coupling în UI.',
      'Leagă TypeScript strict de prevenirea bug-urilor înainte de runtime.',
      'Descrie fluxul de date predictibil într-un feature Angular.',
    ],
    'angular-advanced': [
      'Compară Reactive Forms vs template-driven pe testabilitate și complexitate.',
      'Explică OnPush, interceptors și lazy loading cu impact pe performanță.',
      'Definește când folosești Signals vs NgRx în funcție de complexitatea produsului.',
    ],
    'rest-grid': [
      'Leagă design-ul REST de front-end state synchronization și cache strategy.',
      'Descrie boundary contracts stabile între UI și API.',
      'Explică unde pui validarea: client, server, sau ambele.',
    ],
    'backend-layers': [
      'Explică traseul request-ului: middleware → controller → service → repository.',
      'Separă validarea de input de logica business și de persistență.',
      'Arată cum eviți „fat controller” prin design clar pe straturi.',
    ],
    'kafka-radio': [
      'Descrie fluxul producer-topic-consumer și ce înseamnă offset management.',
      'Explică handling pentru duplicate/out-of-order events.',
      'Leagă event-driven de decuplare și reziliență operațională.',
    ],
    'backend-pipeline': [
      'Combină sync API cu async events și explică de ce reduce coupling-ul.',
      'Definește contracte de evenimente versiunate și compatibile în timp.',
      'Arată cum monitorizezi latența end-to-end pe pipeline.',
    ],
    'di-lifetimes': [
      'Alege corect Singleton/Scoped/Transient după statefulness și cost de creare.',
      'Descrie riscurile de thread safety când lifetime-ul e ales greșit.',
      'Leagă configurarea pe environment de operare sigură în producție.',
    ],
    'sql-field': [
      'Modelează schema cu PK/FK/constraints pornind de la use-case-uri reale.',
      'Explică ce indexe creezi și de ce, pe baza query patterns.',
      'Leagă integritatea datelor de costul schimbărilor viitoare.',
    ],
    'sql-joins': [
      'Descrie când folosești INNER/LEFT/RIGHT în funcție de rezultat așteptat.',
      'Leagă JOIN strategy de query plan și indexing.',
      'Explică un caz clasic de raport greșit cauzat de join incorect.',
    ],
    'sql-acid': [
      'Explică ACID în termeni de risc de business, nu doar definiții.',
      'Compară isolation levels și impactul lor pe throughput.',
      'Descrie prevenția deadlocks prin ordine consistentă a lock-urilor.',
    ],
    'nosql-vs-sql': [
      'Alege SQL vs NoSQL după pattern de acces și evoluția domeniului.',
      'Explică compromisurile de consistență și modelare a datelor.',
      'Leagă flexibilitatea schema-less de disciplina validării la boundary.',
    ],
    'consistency-wave': [
      'Definește eventual consistency și cum o comunici stakeholderilor.',
      'Descrie unde accepti latență de consistență și unde nu.',
      'Leagă compensating actions de robustețe în sisteme distribuite.',
    ],
    'async-lane': [
      'Separă CPU-bound vs I/O-bound și alege modelul corect de execuție.',
      'Explică de ce async nu înseamnă automat mai rapid, ci mai scalabil la I/O.',
      'Evită blocarea sincronă peste async pentru a preveni starvation.',
    ],
    'thread-safety': [
      'Identifică starea partajată și definește ownership clar pe date.',
      'Compară lock-based vs lock-free în funcție de complexitate și risc.',
      'Descrie cum detectezi race conditions în teste și logging.',
    ],
    'algo-structures': [
      'Alege structura de date pe cost de acces, inserare și claritate.',
      'Explică diferența practică între listă, array și map pentru același caz.',
      'Leagă alegerea structurii de performanța observată, nu presupusă.',
    ],
    'algorithms-race': [
      'Compară soluții pe Big O și pe lizibilitate, cu argumente contextuale.',
      'Optimizează doar după profiling pe input real.',
      'Explică trade-off-ul dintre timp de execuție și memorie.',
    ],
    'edge-defense': [
      'Enumeră edge cases critice: null, empty, max/min, input invalid.',
      'Aplică validare la boundary și mesaje de eroare utile pentru debugging.',
      'Transformă fiecare incident de input într-un test de regresie.',
    ],
    'devops-toolchain': [
      'Leagă toolchain-ul de fluxul real: commit → PR → CI → CD → issue tracking.',
      'Explică de ce procesul clar bate tool-ul „fancy”.',
      'Descrie responsabilități clare între echipe pe pipeline.',
    ],
    'devops-pipeline': [
      'Definește quality gates: lint, tests, security scan, approval.',
      'Leagă deployment de rollback și observability imediată.',
      'Explică delivery vs deployment pe cazul echipei tale.',
    ],
    'git-graph': [
      'Construieste commits mici și coerente pentru review/revert rapid.',
      'Alege branching strategy potrivită ritmului de release.',
      'Explică ce înseamnă un PR bun: context, risc, test evidence.',
    ],
    'cloud-stack': [
      'Compară IaaS/PaaS/SaaS prin control operațional și viteză de livrare.',
      'Leagă scalability și availability de cost total de ownership.',
      'Descrie baseline minim de observability pentru producție.',
    ],
    'secrets-locker': [
      'Separă configuration de code pentru deploy-uri sigure pe multiple environment-uri.',
      'Aplică secrets management cu rotation, audit și least privilege.',
      'Explică riscul concret al secretelor hardcodate în repo sau prompt-uri.',
    ],
    'mcp-map': [
      'Definește roluri clare: model, tools, orchestrator, verificator uman.',
      'Leagă fiecare pas AI de verificare: teste, review, acceptance criteria.',
      'Măsoară impactul AI prin lead time, defect rate și PR throughput.',
    ],
    'ai-guardrails': [
      'Aplică human-in-the-loop: AI propune, inginerul validează și își asumă ownership.',
      'Definește guardrails de securitate pentru date sensibile și secrete.',
      'Construiește checklist de verificare înainte de merge.',
    ],
    'soft-skills': [
      'Structurează comunicarea: context → decizie → risc → next step.',
      'Aplică feedback specific pe comportament/cod, nu pe persoană.',
      'Exersează explicații tehnice pe înțelesul PM/QA/business.',
    ],
    'pressure-play': [
      'Prioritizează calm sub presiune prin impact × urgență × risc.',
      'Descrie cum comunici blocaje devreme fără a crea haos.',
      'Transformă failure-ul în lecții concrete și acțiuni preventive.',
    ],
    'time-box': [
      'Aplică time-boxing pe taskuri cu risc mare de context switching.',
      'Compară estimarea inițială cu realitatea și ajustează procesul.',
      'Leagă prioritizarea de obiectivele de produs, nu doar de zgomotul urgent.',
    ],
    'meta-tradeoffs': [
      'Documentează de ce alegi o opțiune și ce sacrifici explicit.',
      'Evită absoluții: caută decizia potrivită contextului actual.',
      'Definește semnale care declanșează re-evaluarea designului.',
    ],
    'quality-loop': [
      'Leagă maintainability de viteza de schimbare pe termen lung.',
      'Planifică plata technical debt în ferestre predictibile.',
      'Folosește refactoring incremental susținut de teste.',
    ],
    'thinking-map': [
      'Fă ipotezele explicite înainte de implementare.',
      'Comunică raționamentul și alternativele în PR/meeting.',
      'Definește criterii de decizie ca să eviți discuții circulare.',
    ],
    'construction-impact': [
      'Conectează deciziile tehnice la impactul real în teren și operațiuni.',
      'Optimizează pentru reliability + usability, nu doar eleganță tehnică.',
      'Leagă rezultatele de metrici de business și experiență utilizator.',
    ],
  };

  const interviewDrillMap: Record<string, string[]> = {
    'error-types': [
      'Dă un exemplu real de logical error care a trecut de compilare și cum l-ai prins.',
      'Cum explici diferența warning vs error unui coleg junior în 30 secunde?',
    ],
    'memory-flow': [
      'Cum explici stack vs heap pe un bug de referințe mutate accidental?',
      'Ce indicatori urmărești când suspectezi problemă de memorie?',
    ],
    'gc-arena': [
      'Descrie un caz de memory leak în aplicație managed și cum l-ai investigat.',
      'Ce compromis ai făcut între latență și throughput pe GC pressure mare?',
    ],
    'debug-lab': [
      'Care e fluxul tău standard de debugging la un incident critic?',
      'Unde pui limita între catch local și tratare globală?',
    ],
    'oop-core': [
      'Cum validezi că un obiect nu poate exista în stare invalidă?',
      'Dă un exemplu de modelare OOP care a simplificat codul de business.',
    ],
    'oop-relations': [
      'Când alegi composition în loc de inheritance într-un serviciu enterprise?',
      'Dă un exemplu de polimorfism care a eliminat if-else-uri complexe.',
    ],
    'oop-contracts': [
      'Interface sau abstract class pentru un service testabil? De ce?',
      'Ce semn îți arată că un contract API a devenit prea mare?',
    ],
    'solid-shield': [
      'Cum ai refactoriza un serviciu care trimite email, scrie în DB și loghează în aceeași clasă?',
      'Dă un exemplu când LSP a fost încălcat și ce ai schimbat.',
    ],
    'patterns-map': [
      'Când ai folosi Builder și când ai rămâne la constructor simplu?',
      'Dă un caz unde Singleton a făcut mai mult rău decât bine.',
    ],
    'patterns-flow': [
      'Ce pattern ai alege pentru algoritmi interschimbabili la runtime?',
      'Cum aplici Adapter fără să ascunzi probleme reale de design?',
    ],
    'anti-patterns': [
      'Cum fragmentezi un God Object fără să blochezi livrarea?',
      'Ce metrici urmărești ca să vezi că spaghetti code-ul scade?',
    ],
    'testing-pyramid': [
      'Cum alegi proporția dintre unit, integration și e2e pentru un feature nou?',
      'Ce defecte ai vrea să prinzi la nivel unit vs e2e?',
    ],
    'testing-lab': [
      'Cum explici diferența mock/stub/fake pe un exemplu concret?',
      'Ce înseamnă un test „stabil” în CI pentru tine?',
    ],
    'testing-decision': [
      'Dă un exemplu de cod pe care ai decis să NU îl unit testezi.',
      'Cum prioritizezi testele când timpul e limitat?',
    ],
    'http-flow': [
      'Cum proiectezi contractul request/response pentru un endpoint critic?',
      'Ce informații pui în headers versus body și de ce?',
    ],
    'http-status': [
      'Explică 401 vs 403 pe un scenariu real de autorizare.',
      'Ce metode HTTP alegi pentru update parțial vs complet?',
    ],
    'angular-formation': [
      'Cum structurezi componente și servicii într-un feature Angular mare?',
      'Ce reguli TypeScript strict aplici ca să reduci bug-urile de UI?',
    ],
    'angular-advanced': [
      'Când alegi Reactive Forms și ce câștigi concret?',
      'Signals sau NgRx pentru un produs enterprise: ce criterii folosești?',
    ],
    'rest-grid': [
      'Cum menții aliniate contractele REST între front-end și backend?',
      'Ce validezi în client și ce validezi obligatoriu pe server?',
    ],
    'backend-layers': [
      'Unde pui validarea business: controller sau service? De ce?',
      'Ce lifetime alegi pentru DbContext și ce bug apare dacă alegi greșit?',
    ],
    'kafka-radio': [
      'Cum gestionezi duplicate events într-un consumer?',
      'Ce strategie ai pentru replay fără a strica consistența?',
    ],
    'backend-pipeline': [
      'Când combini sync API cu async events și când nu?',
      'Ce măsori ca să demonstrezi că pipeline-ul e sănătos?',
    ],
    'di-lifetimes': [
      'Cum explici diferența Singleton/Scoped/Transient pe un caz real?',
      'Ce bug de concurență ai întâlnit din cauza lifetime-ului greșit?',
    ],
    'sql-field': [
      'Cum alegi PK/FK și indexe pentru un model de date nou?',
      'Ce constraint adaugi primul pentru integritate critică?',
    ],
    'sql-joins': [
      'Cum explici diferența LEFT vs INNER fără SQL brut, doar prin rezultat?',
      'Ce indice ai crea pentru query-ul tău cel mai folosit și de ce?',
    ],
    'sql-acid': [
      'Cum explici ACID unui stakeholder non-tehnic pe impact business?',
      'Ce ai schimba pentru a reduce deadlock-uri într-un flux intens?',
    ],
    'nosql-vs-sql': [
      'Când ai alege MongoDB peste SQL pentru un feature nou?',
      'Ce compromis accepți când mergi pe eventual consistency?',
    ],
    'consistency-wave': [
      'Cum comunici „eventual consistency” către product/QA?',
      'Ce mecanism de reconciliere aplici când apar inconsistențe temporare?',
    ],
    'async-lane': [
      'Cum explici în interviu că async nu înseamnă automat paralel?',
      'Ce anti-pattern eviți când combini cod sync cu async?',
    ],
    'thread-safety': [
      'Unde poate apărea race condition în feature-ul tău actual?',
      'Cum dovedești că o secțiune critică e thread-safe?',
    ],
    'algo-structures': [
      'Ce structură de date alegi pentru lookup intens și de ce?',
      'Când listă simplă e mai bună decât map, chiar dacă e mai lentă teoretic?',
    ],
    'algorithms-race': [
      'Cum alegi între o soluție O(n log n) clară și una O(n) greu de întreținut?',
      'Ce ai optimizat ultima dată pe bază de profiling, nu intuiție?',
    ],
    'edge-defense': [
      'Care sunt cele 3 edge case-uri pe care le testezi prima dată?',
      'Cum formulezi erori de validare utile pentru client și debugging?',
    ],
    'devops-toolchain': [
      'Cum conectezi Jira, PR-uri și release-uri pentru trasabilitate clară?',
      'Ce pas din toolchain ți-a redus cel mai mult regressions?',
    ],
    'devops-pipeline': [
      'Ce quality gates consideri non-negociabile înainte de deploy?',
      'Cum definești un rollback „bun” în primele minute după release?',
    ],
    'git-graph': [
      'Cum arată pentru tine un commit „mic și coeziv”?',
      'Ce informații trebuie să conțină PR-ul ca review-ul să fie rapid?',
    ],
    'cloud-stack': [
      'IaaS/PaaS/SaaS: ce alegi pentru un produs nou și de ce?',
      'Cum echilibrezi costul cloud cu availability target?',
    ],
    'secrets-locker': [
      'Cum previi expunerea de secrete în repo și în prompt-uri AI?',
      'Ce rotație și audit aplici pentru credențiale critice?',
    ],
    'mcp-map': [
      'Cum proiectezi un flux MCP astfel încât decizia finală să rămână la om?',
      'Ce KPI-uri folosești ca să dovedești că AI-assisted development chiar a crescut productivitatea?',
    ],
    'ai-guardrails': [
      'Cum verifici un snippet AI înainte de merge în branch principal?',
      'Ce date nu trimiți niciodată în prompt și cum menții security hygiene?',
    ],
    'soft-skills': [
      'Cum explici un trade-off tehnic unui stakeholder non-tehnic?',
      'Cum oferi feedback critic fără să scazi moralul echipei?',
    ],
    'pressure-play': [
      'Ce faci în primele 15 minute ale unui incident major?',
      'Cum prioritizezi când totul pare urgent simultan?',
    ],
    'time-box': [
      'Cum îți planifici o zi cu task-uri de livrare + întreruperi neprevăzute?',
      'Ce ajustezi când estimarea inițială a fost prea optimistă?',
    ],
    'meta-tradeoffs': [
      'Dă un exemplu când ai ales claritate în loc de optimizare prematură.',
      'Ce criterii folosești ca să eviți over-engineering?',
    ],
    'quality-loop': [
      'Cum decizi ce technical debt plătești acum versus mai târziu?',
      'Ce refactor incremental ai făcut recent cu impact mare?',
    ],
    'thinking-map': [
      'Cum îți faci ipotezele explicite într-un design review?',
      'Ce întrebare pui prima dată când cerința e ambiguă?',
    ],
    'construction-impact': [
      'Cum traduci o nevoie din teren într-o decizie tehnică testabilă?',
      'Ce metrică de business urmărești ca să validezi impactul unui feature?',
    ],
  };

  const deepDive = deepDiveMap[currentConcept.visualType ?? ''] ?? [
    'Leagă conceptul de un bug real și descrie pas cu pas cum l-ai preveni.',
    'Explică trade-off-ul principal: ce câștigi, ce pierzi, când alegi altă strategie.',
    'Testează-te: poți explica acest concept clar în 60 secunde unui coleg non-tehnic?',
  ];

  const interviewDrills = interviewDrillMap[currentConcept.visualType ?? ''] ?? [
    `Aplică ${currentConcept.title} într-un exemplu real dintr-un backend enterprise.`,
    'Ce ai măsura ca să demonstrezi că soluția ta chiar e mai bună?',
  ];

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

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-neutral-900 font-black uppercase text-[10px] tracking-wider opacity-70">
                    <Info size={12} />
                    Deep Dive (Interviu)
                  </div>
                  <div className="grid gap-2">
                    {deepDive.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-700 flex-shrink-0" />
                        <span className="font-medium leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-neutral-900 font-black uppercase text-[10px] tracking-wider opacity-70">
                    <ClipboardList size={12} />
                    Interview Drill
                  </div>
                  <div className="grid gap-2">
                    {interviewDrills.map((item, idx) => (
                      <div key={idx} className="text-neutral-700 bg-white p-2.5 rounded-lg border border-red-100 shadow-sm text-sm font-semibold">
                        Q{idx + 1}. {item}
                      </div>
                    ))}
                  </div>
                </div>
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
