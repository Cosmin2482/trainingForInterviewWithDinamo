import { 
  BrickWall, 
  Box, 
  ShieldCheck, 
  Layers, 
  TestTube, 
  Globe, 
  Server, 
  Database, 
  FileJson, 
  Cpu, 
  Binary, 
  GitBranch, 
  Cloud, 
  Bot, 
  Users, 
  BrainCircuit,
  Trophy,
  Flag,
  Activity,
  Lock,
  Network,
  Zap
} from 'lucide-react';

export const CURRICULUM = [
  {
    id: 1,
    title: "1. Fundamente Programare",
    icon: BrickWall,
    color: "bg-red-600",
    concepts: [
      {
        id: "compile-runtime",
        title: "Compile-time vs Runtime Errors",
        content: "Greșeli de vestiar vs Greșeli pe teren.",
        analogy: "Compile-time: Ești oprit la vestiar că n-ai jambiere (Syntax Error). Meciul nici nu începe. Runtime: Începe meciul, dar faci ruptură musculară când alergi (Exception). Aplicația crapă în fața fanilor.",
        details: [
          "Compile-time: Syntax errors, Type mismatch. Codul nu pornește.",
          "Runtime: Division by zero, NullReference. Crapă în execuție.",
          "Logical: Dai autogol. Codul merge, dar rezultatul e greșit."
        ],
        visualType: "error-types"
      },
      {
        id: "stack-heap",
        title: "Stack vs Heap & Memory",
        content: "Vestiarul (Stack) vs Terenul (Heap).",
        analogy: "Stack: Vestiarul. Mic, rapid, ordonat. Știi exact unde e tricoul fiecăruia (Value Types: int, bool). Heap: Terenul. Mare, haotic. Jucătorii aleargă peste tot. Ai nevoie de numărul de pe tricou (Pointer/Reference) să știi cine e cine (Objects).",
        details: [
          "Stack: LIFO, rapid, curățare automată.",
          "Heap: Alocare dinamică, necesită Garbage Collection."
        ],
        visualType: "stack-heap"
      },
      {
        id: "gc",
        title: "Garbage Collection (GC)",
        content: "Îngrijitorul gazonului.",
        analogy: "Pe Heap (Teren), jucătorii obosesc. Când nu mai participă la fază (nu mai au referințe), vine Îngrijitorul (GC) și îi scoate de pe teren. Dacă nu ar veni, s-ar umple terenul de jucători inutili (Memory Leak) și nu s-ar mai putea juca.",
        details: [
          "Curăță memoria automată în .NET.",
          "Generații: 0, 1, 2 (Jucători noi vs Veterani)."
        ],
        visualType: "garbage-collection"
      },
      {
        id: "exceptions",
        title: "Exception Handling",
        content: "Accidentările și Schimbările.",
        analogy: "Exception: Un jucător se lovește. Try: Încerci să joci schema. Catch: Dacă se lovește, medicul intervine și face schimbare. Finally: Indiferent de scor, saluți galeria la final.",
        details: [
          "try { ... } catch (ex) { ... } finally { ... }",
          "Throw: Arunci prosopul (eroare manuală)."
        ],
        visualType: "try-catch"
      },
      {
        id: "debugging",
        title: "Debugging & Call Stack",
        content: "Sistemul VAR și Reluările.",
        analogy: "Debugging: Oprești meciul (Breakpoint) și te uiți la VAR (Watch) să vezi cine a fost în ofsaid. Call Stack: Lista de pase care a dus la gol. Cine a pasat cui (Funcția A a apelat Funcția B).",
        details: [
          "Breakpoint: Pauză în execuție.",
          "Watch: Verifici starea jucătorilor (variabilelor).",
          "Call Stack: Urma pașilor execuției."
        ],
        visualType: "debugging"
      }
    ]
  },
  {
    id: 2,
    title: "2. OOP - Object Oriented Programming",
    icon: Box,
    color: "bg-red-600",
    concepts: [
      {
        id: "class-object",
        title: "Clasă vs Obiect",
        content: "Tactica vs Jucătorul.",
        analogy: "Clasa: Schema tactică de pe tablă (Atacantul trebuie să șuteze). Obiectul: Politic sau Abdallah în carne și oase. Clasa e ideea, Obiectul e realitatea.",
        details: ["Clasa = Blueprint. Obiect = Instanță."],
        visualType: "class-object"
      },
      {
        id: "encapsulation",
        title: "Encapsulation",
        content: "Secretele vestiarului.",
        analogy: "Ce se discută în vestiar (private) rămâne acolo. Presa vede doar conferința oficială (public). Nu lași suporterii să intre în vestiar să îți lege șireturile.",
        details: ["Private fields, Public properties.", "Protejarea stării interne."],
        visualType: "encapsulation"
      },
      {
        id: "inheritance",
        title: "Inheritance & Polymorphism",
        content: "Academia și Faza Fixă.",
        analogy: "Inheritance: Un Junior moștenește talentul tatălui (Base Class). Polymorphism: Antrenorul strigă 'Execută!'. Portarul degajează, Atacantul șutează. Aceeași comandă, execuție diferită.",
        details: [
          "Is-a relationship.",
          "Override: Schimbarea comportamentului moștenit."
        ],
        visualType: "inheritance"
      },
      {
        id: "abstraction",
        title: "Abstraction & Interface",
        content: "Contractul de Joc.",
        analogy: "Interface: Contractul jucătorului. Scrie 'Trebuie să te antrenezi și să joci'. Nu scrie CUM să dai cu piciorul în minge. Abstract Class: Un plan parțial. 'Toți jucătorii poartă echipament', dar 'Portarul are mănuși'.",
        details: ["Interface: Ce face (Contract).", "Abstract Class: Ce este (Base partial)."],
        visualType: "interface"
      },
      {
        id: "composition",
        title: "Composition vs Inheritance",
        content: "Echipa vs Familia.",
        analogy: "Inheritance (Familie): Ești fiul lui X, nu poți schimba asta. Composition (Echipă): Ai un Antrenor, ai un Maseur. Dacă nu îți place Maseurul, îl schimbi (Loose Coupling). Preferă Compoziția!",
        details: ["Has-a > Is-a.", "Flexibilitate mai mare."],
        visualType: "composition"
      }
    ]
  },
  {
    id: 3,
    title: "3. SOLID Principles",
    icon: ShieldCheck,
    color: "bg-red-600",
    concepts: [
      {
        id: "srp",
        title: "Single Responsibility (SRP)",
        content: "Fiecare cu postul lui.",
        analogy: "Portarul apără. Atacantul dă gol. Nu îl pui pe Golubovic să vândă bilete la pauză. O clasă face O SINGURĂ treabă.",
        details: ["O clasă = Un motiv de schimbare."],
        visualType: "srp"
      },
      {
        id: "ocp",
        title: "Open / Closed (OCP)",
        content: "Transferuri, nu operații.",
        analogy: "Echipa e deschisă la transferuri noi (Extensie), dar nu îi tai picioarele lui Homawoo ca să fie mai rapid (Modificare). Adaugi funcționalitate nouă fără să strici ce merge.",
        details: ["Open for extension, closed for modification."],
        visualType: "ocp"
      },
      {
        id: "lsp",
        title: "Liskov Substitution (LSP)",
        content: "Rezerva perfectă.",
        analogy: "Dacă iese titularul și intră rezerva, echipa trebuie să joace la fel. Dacă bagi o rezervă care ia mingea în mână (dar nu e portar), ai încălcat principiul.",
        details: ["Subclasele trebuie să poată înlocui părintele."],
        visualType: "lsp"
      },
      {
        id: "isp",
        title: "Interface Segregation (ISP)",
        content: "Antrenament specific.",
        analogy: "Nu îi dai lui Patriche antrenament de portari. Fă fișe de antrenament separate: 'FisăPortar', 'FisăAtacant'. Nu 'FisăUniversală'.",
        details: ["Interfețe mici și specifice."],
        visualType: "isp"
      },
      {
        id: "dip",
        title: "Dependency Inversion (DIP)",
        content: "Contractul de Sponsorizare.",
        analogy: "Clubul nu depinde de 'Nike'. Depinde de 'FurnizorEchipament'. Azi e Nike, mâine e Macron. Dacă depinzi de abstracție (Interfață), poți schimba sponsorul oricând.",
        details: ["Depinde de abstracții, nu de detalii."],
        visualType: "dip"
      }
    ]
  },
  {
    id: 4,
    title: "4. Design Patterns",
    icon: Layers,
    color: "bg-red-600",
    concepts: [
      {
        id: "singleton",
        title: "Singleton & Factory",
        content: "Căpitanul și Academia.",
        analogy: "Singleton: Căpitanul. E unul singur pe teren. Factory: Academia. Ceri 'Un Fundaș', primești unul gata antrenat, nu știi cum l-au crescut.",
        details: ["Singleton: O singură instanță.", "Factory: Creație abstractizată."],
        visualType: "patterns-creation"
      },
      {
        id: "observer",
        title: "Observer & Strategy",
        content: "Peluza și Tactica.",
        analogy: "Observer: Când se dă gol (Event), PCH (Observers) reacționează instant. Strategy: Kopic schimbă tactica în min 80. Trece de la 4-4-2 la 5-4-1. Algoritmul se schimbă din mers.",
        details: ["Observer: Evenimente.", "Strategy: Algoritmi interschimbabili."],
        visualType: "patterns-behavior"
      },
      {
        id: "di-pattern",
        title: "Dependency Injection",
        content: "Magazionerul.",
        analogy: "Jucătorul nu își coase singur tricoul. Magazionerul (Containerul) îi aduce tot ce are nevoie (Dependențe) în vestiar. Jucătorul doar joacă.",
        details: ["Inversion of Control."],
        visualType: "di"
      }
    ]
  },
  {
    id: 5,
    title: "5. Testare",
    icon: TestTube,
    color: "bg-red-600",
    concepts: [
      {
        id: "unit-integration",
        title: "Unit vs Integration",
        content: "Individual vs Miuța.",
        analogy: "Unit: Politic bate libere singur (Test izolat). Integration: Apărarea joacă contra Atacului (Test de interacțiune). Dacă Politic dă gol singur, dar în meci nu primește pase, e eroare de integrare.",
        details: ["Unit: Izolat, rapid.", "Integration: Componente împreună."],
        visualType: "testing-types"
      },
      {
        id: "mocking",
        title: "Mocking & TDD",
        content: "Manechinele și Planul.",
        analogy: "Mocking: Folosești manechine de plastic la antrenament în loc de adversari reali. TDD (Test Driven Development): Întâi desenezi schema pe tablă (Testul pică), apoi o exersezi până iese (Testul trece).",
        details: ["Mock: Obiect fals.", "Red-Green-Refactor."],
        visualType: "mocking"
      }
    ]
  },
  {
    id: 6,
    title: "6. Web & HTTP",
    icon: Globe,
    color: "bg-red-600",
    concepts: [
      {
        id: "http-basics",
        title: "Request / Response",
        content: "Cererea de Bilete.",
        analogy: "Client (Tu) -> Request (Vreau bilet) -> Server (Casa de bilete) -> Response (Poftim biletul / Nu mai sunt). Stateless: Vânzătoarea nu ține minte că ai mai fost acum 5 minute.",
        details: ["Protocol stateless.", "Headers, Body."],
        visualType: "http-flow"
      },
      {
        id: "methods-status",
        title: "Methods & Status Codes",
        content: "Acțiuni și Arbitraj.",
        analogy: "GET (Te uiți la meci), POST (Dai gol), DELETE (Iei roșu). 200 (Gol valabil), 404 (Mingea în tribune), 500 (Nocturna a căzut).",
        details: ["CRUD Operations.", "Status codes standard."],
        visualType: "status-codes"
      }
    ]
  },
  {
    id: 7,
    title: "7. Backend / Web API",
    icon: Server,
    color: "bg-red-600",
    concepts: [
      {
        id: "mvc-api",
        title: "Controller & Middleware",
        content: "Arbitrul și Stewarzii.",
        analogy: "Middleware (Stewarzii): Te controlează la intrare (Auth). Controller (Arbitrul): Decide cine are mingea și fluieră începutul fazei. Service: Jucătorii care fac treaba.",
        details: ["Pipeline de execuție.", "Separation of concerns."],
        visualType: "backend-arch"
      },
      {
        id: "lifetimes",
        title: "Service Lifetimes",
        content: "Durata Contractului.",
        analogy: "Transient: Jucător de o zi (Nou la fiecare cerere). Scoped: Împrumut pe un sezon (Același pe durata meciului/request-ului). Singleton: Statuia lui Hîldan (Una singură, veșnică).",
        details: ["Transient, Scoped, Singleton."],
        visualType: "lifetimes"
      }
    ]
  },
  {
    id: 8,
    title: "8. Baze de Date - SQL",
    icon: Database,
    color: "bg-red-600",
    concepts: [
      {
        id: "sql-structure",
        title: "Relational & Normalization",
        content: "Organizarea Clubului.",
        analogy: "Tabele: Jucători, Echipe, Meciuri. Foreign Key: Jucătorul are ID-ul Echipei. Normalizare: Nu scrii numele echipei în dreptul fiecărui jucător, pui doar ID-ul, ca să nu greșești când echipa își schimbă numele.",
        details: ["Tabele relaționate.", "Evitarea redundanței."],
        visualType: "database-rel"
      },
      {
        id: "acid",
        title: "ACID Transactions",
        content: "Transferul Bancar.",
        analogy: "Când plătești biletul: Banii pleacă de la tine ȘI biletul se emite. Dacă pică netul, banii se întorc. Nu rămâi și fără bani și fără bilet. Totul sau nimic.",
        details: ["Atomicity, Consistency, Isolation, Durability."],
        visualType: "acid"
      }
    ]
  },
  {
    id: 9,
    title: "9. NoSQL & Concurrency",
    icon: FileJson,
    color: "bg-red-600",
    concepts: [
      {
        id: "nosql",
        title: "NoSQL (MongoDB)",
        content: "Caietul Antrenorului.",
        analogy: "Nu ai tabele fixe. Pe o pagină scrii despre un jucător, pe alta desenezi o schemă. E flexibil (Schema-less). Bun pentru date care se schimbă rapid.",
        details: ["Documente JSON.", "Scalabilitate orizontală."],
        visualType: "nosql"
      },
      {
        id: "async",
        title: "Async/Await & Deadlock",
        content: "Contraatacul și Blocajul.",
        analogy: "Async: Dai pasă lungă și alergi (nu stai pe loc). Deadlock: Doi jucători se țin de tricou reciproc și niciunul nu pleacă după minge.",
        details: ["Non-blocking I/O.", "Race conditions."],
        visualType: "async"
      }
    ]
  },
  {
    id: 10,
    title: "10. Algoritmi & DevOps",
    icon: Binary,
    color: "bg-red-600",
    concepts: [
      {
        id: "algo",
        title: "Algoritmi & Big O",
        content: "Viteza de Joc.",
        analogy: "O(1): Șut direct. O(n): Dribling tot terenul. O(n^2): Pase inutile în cerc. Alege algoritmul care te duce cel mai repede la poartă.",
        details: ["Eficiență.", "Structuri de date (Array vs List)."],
        visualType: "big-o"
      },
      {
        id: "ci-cd",
        title: "CI/CD & Git",
        content: "Antrenamentul și Meciul Oficial.",
        analogy: "Git: Istoricul meciurilor (Replay). CI: Antrenamentul automat (Teste). CD: Autocarul care duce echipa la stadion (Deploy).",
        details: ["Pipeline automat.", "Version Control."],
        visualType: "ci-cd"
      }
    ]
  },
  {
    id: 11,
    title: "11. Cloud & AI",
    icon: Cloud,
    color: "bg-red-600",
    concepts: [
      {
        id: "cloud",
        title: "Cloud Computing",
        content: "Stadionul Închiriat.",
        analogy: "Nu îți faci stadionul tău (On-premise). Închiriezi Arena Națională (Azure). Plătești cât joci. Dacă vin mulți fani, deschizi inelul 3 (Scalare).",
        details: ["IaaS, PaaS, SaaS.", "Scalabilitate."],
        visualType: "cloud"
      },
      {
        id: "ai",
        title: "AI-Assisted Dev",
        content: "Analistul Video (VAR).",
        analogy: "AI-ul îți arată unde greșești și îți propune scheme. Dar TU ești antrenorul. Tu decizi dacă aplici schema sau nu. Nu lăsa AI-ul să conducă echipa.",
        details: ["Copilot.", "Human-in-the-loop."],
        visualType: "ai-bot"
      }
    ]
  },
  {
    id: 12,
    title: "12. Soft Skills & Meta",
    icon: Users,
    color: "bg-red-600",
    concepts: [
      {
        id: "soft-skills",
        title: "Soft Skills",
        content: "Spiritul de Echipă.",
        analogy: "Nu joci pentru tine, joci pentru Dinamo. Comunici, ajuți colegul (Code Review), îți asumi greșeala (Ownership).",
        details: ["Comunicare.", "Feedback."],
        visualType: "teamwork"
      },
      {
        id: "meta",
        title: "Meta-Concepte",
        content: "Filozofia Jocului.",
        analogy: "Trade-offs: Atac vs Apărare. Technical Debt: Cumperi victorii azi cu efort dublu mâine. Clean Code: Joc frumos, pase clare.",
        details: ["Compromisuri.", "Calitatea codului."],
        visualType: "meta"
      }
    ]
  }
];
