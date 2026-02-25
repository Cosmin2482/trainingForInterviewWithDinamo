import {
  Activity,
  Binary,
  Bot,
  Box,
  BrainCircuit,
  BrickWall,
  Cloud,
  Cpu,
  Database,
  FileJson,
  Flag,
  GitBranch,
  Globe,
  Layers,
  Server,
  ShieldCheck,
  TestTube,
  Users,
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface CurriculumConcept {
  id: string;
  title: string;
  content: string;
  analogy: string;
  details: string[];
  visualType: string;
}

export interface CurriculumModule {
  id: number;
  title: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  color: string;
  concepts: CurriculumConcept[];
}

export const CURRICULUM: CurriculumModule[] = [
  {
    id: 1,
    title: '1. Fundamente Programare',
    icon: BrickWall,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'errors-core',
        title: 'Compile-time, Runtime, Syntax, Logical, Warnings vs Errors',
        content: '5 tipuri de probleme, 5 minute de panică evitate.',
        analogy:
          'Compile-time e controlul la intrare pe stadion: fără bilet (syntax) nu intri. Runtime e accidentare în minutul 63. Logical e autogolul elegant: meciul merge, scorul e greșit. Warning-ul e stewardul care îți spune “nu sta pe scară”, Error-ul te scoate afară.',
        details: [
          'Compile-time errors: apar înainte de rulare (tipuri incompatibile, sintaxă invalidă).',
          'Syntax errors: gramatică greșită; compilatorul oprește execuția.',
          'Runtime errors: apar în execuție (null, divide-by-zero, index out of range).',
          'Logical errors: codul rulează, dar produce rezultat greșit.',
          'Warnings vs Errors: warning = risc/miros, error = blocaj real.',
        ],
        visualType: 'error-types',
      },
      {
        id: 'memory-core',
        title: 'Stack vs Heap, Memory allocation, Call stack',
        content: 'Unde stau datele, cum sunt alocate și cine a apelat pe cine.',
        analogy:
          'Stack-ul e lista de schimbări de pe bancă: ordonată și rapidă. Heap-ul e terenul mare cu toți jucătorii obiect. Call stack-ul e filmul VAR care arată lanțul de pase până la faza curentă.',
        details: [
          'Stack: LIFO, alocare rapidă, folosit pentru cadre de funcții și valori mici.',
          'Heap: alocare dinamică pentru obiecte; acces prin referințe.',
          'Memory allocation: stack automat, heap gestionat de runtime.',
          'Call stack: urmărește apelurile funcțiilor în execuție.',
        ],
        visualType: 'memory-flow',
      },
      {
        id: 'garbage-collection',
        title: 'Garbage Collection (GC) & memory health',
        content: 'Memoria curată înseamnă performanță stabilă sub presiune.',
        analogy:
          'GC-ul e staff-ul care curăță terenul după faze haotice. Dacă lași obiecte „uitate” pe gazon, jocul devine lent și obositor pentru toată echipa.',
        details: [
          'Garbage Collection: eliberează obiectele fără referințe active.',
          'Memory leaks apar când referințele rămân vii inutil și blochează colectarea.',
          'Object lifetime și presiunea pe GC influențează latența aplicației.',
          'Profilarea memoriei + logging ajută la diagnostic în producție.',
        ],
        visualType: 'gc-arena',
      },
      {
        id: 'exceptions-debug',
        title: 'Exception vs Error, try/catch/finally, Debugging, Logging, Breakpoints, Watch/Inspect',
        content: 'Setul complet de supraviețuire când aplicația joacă prost.',
        analogy:
          'Exception e fault de joc pe care îl poți gestiona tactic; Error e nocturna căzută total. `try/catch/finally` este: încerci schema, tratezi incidentul, apoi strângi echipamentul indiferent de scor.',
        details: [
          'Exception vs Error: exception poate fi tratată; error severă poate opri sistemul.',
          'try/catch/finally: control explicit al fluxului la probleme.',
          'Checked vs unchecked errors (conceptual): unele trebuie declarate/tratate, altele apar implicit.',
          'Debugging: reproduci bug, izolezi cauza, verifici starea pas cu pas.',
          'Logging: istoric de meci pentru producție; fără loguri e „amintire vagă”.',
          'Breakpoints + Watch/Inspect variables: vezi exact valorile și traseul în call stack.',
        ],
        visualType: 'debug-lab',
      },
    ],
  },
  {
    id: 2,
    title: '2. OOP – Object Oriented Programming',
    icon: Box,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'oop-basics',
        title: 'Ce este OOP, Obiect, Clasă, Constructor, Destructor',
        content: 'Modelăm lumea reală în cod: jucători, echipă, meci.',
        analogy:
          'Clasa e fișa postului „Mijlocaș”. Obiectul e Cîrjan în meci. Constructorul îl echipează înainte de start; destructorul conceptual închide resursele după fluierul final.',
        details: [
          'OOP: organizează codul în obiecte cu stare + comportament.',
          'Class = blueprint; Object = instanță concretă.',
          'Constructor: inițializează starea validă la creare.',
          'Destructor (conceptual): curăță resurse la finalul ciclului de viață.',
        ],
        visualType: 'oop-core',
      },
      {
        id: 'oop-principles',
        title: 'Encapsulation, Abstraction, Inheritance, Polymorphism',
        content: 'Cei 4 piloni care țin vestiarul în picioare.',
        analogy:
          'Encapsulation: vestiar privat. Abstraction: pe tablă vezi rolul, nu biomecanica fiecărui șut. Inheritance: juniorul moștenește schema de bază. Polymorphism: aceeași comandă, execuții diferite pe posturi.',
        details: [
          'Encapsulation: ascunzi detalii interne și expui API clar.',
          'Abstraction: expui „ce face”, ascunzi „cum face”.',
          'Inheritance: relație is-a, reutilizare de comportament.',
          'Polymorphism: același contract, implementări multiple.',
          'Method overriding: subclasa schimbă comportamentul moștenit.',
          'Method overloading: același nume, semnături diferite.',
          'Virtual methods: permit overriding dinamic.',
        ],
        visualType: 'oop-relations',
      },
      {
        id: 'oop-architecture',
        title: 'Composition, Aggregation, Coupling, Cohesion, is-a vs has-a, Abstract class, Interface, Dependency, Contract',
        content: 'Arhitectura de lot: relații sănătoase între piese.',
        analogy:
          'Composition înseamnă că echipa are-antrenor (has-a). Aggregation e colaborare mai relaxată. Coupling mic = transferuri ușoare. Cohesion mare = fiecare compartiment știe clar ce face.',
        details: [
          'Composition: ownership puternic al componentelor; Aggregation: ownership slab.',
          'is-a vs has-a: moștenire versus compoziție.',
          'Coupling: cât de dependentă e o clasă de alta (vrei loose coupling).',
          'Cohesion: cât de bine se leagă responsabilitățile din aceeași clasă (vrei high cohesion).',
          'Abstract class: bază parțial implementată.',
          'Interface: contract pur de comportament.',
          'Dependency: ce folosește un obiect ca să funcționeze.',
          'Contract: promisiunea API-ului între module.',
        ],
        visualType: 'oop-contracts',
      },
    ],
  },
  {
    id: 3,
    title: '3. SOLID Principles',
    icon: ShieldCheck,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'solid-full',
        title: 'SRP, OCP, LSP, ISP, DIP – set complet',
        content: 'SOLID = disciplină tactică pe termen lung.',
        analogy:
          'Fără SOLID, echipa are 11 jucători care aleargă după aceeași minge. Cu SOLID, fiecare rol este clar, extensibil și înlocuibil fără haos.',
        details: [
          'Single Responsibility Principle (SRP): o clasă are un singur motiv de schimbare.',
          'Open / Closed Principle (OCP): extinzi comportament fără a modifica ce funcționează.',
          'Liskov Substitution Principle (LSP): subclasele pot înlocui clasa de bază fără surprize.',
          'Interface Segregation Principle (ISP): interfețe mici și specifice, nu „mega-interfață”.',
          'Dependency Inversion Principle (DIP): depinzi de abstracții, nu de implementări concrete.',
        ],
        visualType: 'solid-shield',
      },
    ],
  },
  {
    id: 4,
    title: '4. Design Patterns (conceptual)',
    icon: Layers,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'patterns-creational',
        title: 'Factory, Singleton, Builder',
        content: 'Pattern-uri de creare: cine produce jucătorii și cum.',
        analogy:
          'Factory e academia care produce roluri la cerere. Singleton e un singur căpitan pe teren. Builder montează pas cu pas un transfer complex cu multe opțiuni.',
        details: [
          'Factory: ascunde logica de instanțiere.',
          'Singleton: o singură instanță globală controlată.',
          'Builder: construiește obiecte complexe incremental.',
        ],
        visualType: 'patterns-map',
      },
      {
        id: 'patterns-behavior-struct',
        title: 'Strategy, Observer, Adapter, Decorator, Repository, Dependency Injection pattern',
        content: 'Pattern-uri de comportament și structură pentru cod flexibil.',
        analogy:
          'Strategy schimbă tactica în minutul 80. Observer anunță instant galeria la gol. Adapter traduce „spaniolă tacticală” în „română backend”. Decorator pune banderola fără să schimbe jucătorul de bază.',
        details: [
          'Strategy: algoritmi interschimbabili la runtime.',
          'Observer: publish/subscribe pentru evenimente.',
          'Adapter: convertește interfețe incompatibile.',
          'Decorator: adaugă comportament fără moștenire agresivă.',
          'Repository: separă accesul la date de logica de business.',
          'Dependency Injection pattern: furnizezi dependențe din exterior.',
        ],
        visualType: 'patterns-flow',
      },
      {
        id: 'anti-patterns',
        title: 'Anti-patterns: God object, Spaghetti code',
        content: 'Cum arată codul când vestiarul ia foc.',
        analogy:
          'God object e jucătorul care vrea să fie portar, atacant, medic și șofer de autocar în același timp. Spaghetti code e fază în care nimeni nu mai știe cine pe cine marchează.',
        details: [
          'God object: prea multe responsabilități într-o clasă.',
          'Spaghetti code: flux greu de urmărit, cuplare mare, testare dificilă.',
          'Semnal de alarmă: schimbări mici provoacă defecte în multe zone.',
        ],
        visualType: 'anti-patterns',
      },
    ],
  },
  {
    id: 5,
    title: '5. Testare',
    icon: TestTube,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'testing-types',
        title: 'Unit, Integration, End-to-end, White-box, Black-box',
        content: 'Tipuri de testare pentru fiecare nivel al jocului.',
        analogy:
          'Unit test e șut la poartă fără adversar. Integration e joc pe compartimente. End-to-end e meci complet cu arbitru, fani și vreme rea.',
        details: [
          'Unit testing: verifică funcții/componente izolate.',
          'Integration testing: verifică interacțiunea dintre componente.',
          'End-to-end testing: verifică fluxul complet din perspectiva utilizatorului.',
          'White-box testing: bazat pe cunoașterea internă a codului.',
          'Black-box testing: bazat pe input/output, fără detalii interne.',
        ],
        visualType: 'testing-pyramid',
      },
      {
        id: 'testing-techniques',
        title: 'Mocking, Stubbing, Fake objects, Coverage, AAA, Isolation, Regression',
        content: 'Unelte și practici de testare serioasă.',
        analogy:
          'Mock-ul e adversar de antrenament controlat. Stub-ul îți pasează fix mingea unde ai stabilit. Fake object e mini-teren realist, dar mai simplu.',
        details: [
          'Mocking: verifici apeluri/interacțiuni.',
          'Stubbing: răspunsuri predefinite pentru dependențe.',
          'Fake objects: implementări simplificate, dar funcționale.',
          'Test coverage: procentul de cod executat de teste (nu garantează calitate singur).',
          'Arrange – Act – Assert: structură clară pentru test.',
          'Test isolation: fiecare test independent și repetabil.',
          'Regression testing: previne reintroducerea bugurilor vechi.',
        ],
        visualType: 'testing-lab',
      },
      {
        id: 'testing-strategy',
        title: 'Testing pyramid & When NOT to unit test',
        content: 'Nu testezi tot cu unit tests; alegi tactic.',
        analogy:
          'Piramida spune: multe exerciții de bază (unit), mai puține jocuri de compartiment (integration), foarte puține finale costisitoare (e2e).',
        details: [
          'Testing pyramid: bază lată la unit, vârf îngust la e2e.',
          'When NOT to unit test: cod trivial, getter/setter simplu, logică fără valoare de business.',
          'Alege testul după risc și cost, nu din reflex.',
        ],
        visualType: 'testing-decision',
      },
    ],
  },
  {
    id: 6,
    title: '6. Web & HTTP',
    icon: Globe,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'http-architecture',
        title: 'Client–Server, HTTP protocol, Request/Response, Headers, Body',
        content: 'Fluxul clasic al unui schimb pe web.',
        analogy:
          'Clientul e suporterul la casa de bilete. Request-ul e cererea. Header-ele sunt datele de context, body e conținutul principal. Response-ul este decizia ghișeului.',
        details: [
          'Client–Server architecture: responsabilități separate.',
          'HTTP protocol: reguli de comunicare între client și server.',
          'Request / Response: modelul de bază al web-ului.',
          'Headers: metadata (auth, content type, caching).',
          'Body: payload-ul efectiv al mesajului.',
        ],
        visualType: 'http-flow',
      },
      {
        id: 'http-methods-status',
        title: 'Methods, Status codes, Query parameters, Path parameters, Idempotency',
        content: 'Verbele și scorul oficial al API-ului.',
        analogy:
          'GET vezi tabela, POST înscrii gol nou, PUT rescrii fișa completă, PATCH corectezi doar minutul golului, DELETE anulezi intrarea.',
        details: [
          'HTTP Methods: GET, POST, PUT, PATCH, DELETE.',
          'HTTP Status Codes: 200 / 201, 400, 401, 403, 404, 409, 500.',
          'Query parameters: filtre/sortări în URL.',
          'Path parameters: identificatori de resurse în traseu.',
          'Idempotency: apeluri repetate păstrează același efect pentru PUT/DELETE.',
        ],
        visualType: 'http-status',
      },
      {
        id: 'rest-principles',
        title: 'REST principles & Statelessness',
        content: 'API-ul joacă simplu, previzibil și fără memorie de sesiune.',
        analogy:
          'Stateless e ca un arbitru care judecă fiecare fază doar pe ce vede acum, nu pe ce a fost la meciul trecut.',
        details: [
          'REST principles: resurse clare, reprezentări standard, operații uniforme.',
          'Statelessness: serverul nu păstrează contextul clientului între request-uri.',
          'Beneficii: scalare mai simplă, cache mai bun, mentenanță mai bună.',
        ],
        visualType: 'rest-grid',
      },
      {
        id: 'frontend-angular',
        title: 'Frontend modern: Angular + TypeScript (preferat)',
        content: 'UI-ul trebuie să fie clar, predictibil și testabil, nu doar „frumos”.',
        analogy:
          'Angular e tabla tactică pe care fiecare jucător știe exact zona lui: componentele au rol clar, serviciile distribuie pasele de date, iar TypeScript ține disciplina de vestiar.',
        details: [
          'Angular: framework orientat pe componente, module și dependency injection.',
          'TypeScript: tipuri statice care reduc erorile înainte de runtime.',
          'RxJS și fluxuri reactive: utile pentru UI-uri cu date în timp real.',
          'Separarea UI/state/services susține mentenanța în proiecte enterprise.',
        ],
        visualType: 'rest-grid',
      },
      {
        id: 'frontend-angular-advanced',
        title: 'Angular avansat: architecture, forms, change detection, testing',
        content: 'Nivelul enterprise cere control pe performanță, state și testabilitate.',
        analogy:
          'E ca un meci tactic în care fiecare compartiment al echipei știe exact când presează și când se repliază: componentele, serviciile și state-ul trebuie să joace sincron.',
        details: [
          'Component lifecycle: OnInit/OnDestroy și management corect al resurselor.',
          'Reactive Forms: validare robustă pentru inputuri complexe.',
          'Change detection strategy (OnPush): optimizezi randarea pentru performanță.',
          'Routing guards: controlezi accesul pe rute și fluxuri sensibile.',
          'State management: pattern-uri predictibile pentru aplicații mari.',
          'Testing Angular: unit + integration pentru componente și servicii.',
        ],
        visualType: 'rest-grid',
      },
    ],
  },
  {
    id: 7,
    title: '7. Backend / Web API (.NET context)',
    icon: Server,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'backend-core',
        title: 'Web API, REST API, Controller, Endpoint, Routing',
        content: 'Structura minimă a unui backend de producție.',
        analogy:
          'Controller-ul e arbitrul care primește faza. Endpoint-ul e poarta exactă. Routing-ul e harta stadionului care duce cererea la omul potrivit.',
        details: [
          'Web API: interfață HTTP pentru consumatori.',
          'REST API: convenții orientate pe resurse.',
          'Controller: gestionează request-ul la nivel de intrare.',
          'Endpoint: URL + metodă pentru o operație.',
          'Routing: maparea request-urilor către endpoint-uri.',
        ],
        visualType: 'backend-pipeline',
      },
      {
        id: 'backend-layers',
        title: 'DTO, Model, Service layer, Repository layer, Middleware, Filters',
        content: 'Separarea responsabilităților ca să nu ai God API.',
        analogy:
          'DTO e biletul de intrare, Model-ul e fișa internă, Service layer-ul decide tactica, Repository layer-ul merge în arhivă, Middleware-ul filtrează la turnichet.',
        details: [
          'DTO (Data Transfer Object): format de transfer între straturi.',
          'Model: reprezentarea datelor de domeniu.',
          'Service layer: logică de business.',
          'Repository layer: acces la date/persistență.',
          'Middleware: logică transversală în pipeline.',
          'Filters: reguli aplicate pe acțiuni/controlere.',
        ],
        visualType: 'backend-layers',
      },
      {
        id: 'backend-di-config',
        title: 'Dependency Injection, Service lifetimes, Configuration, Environment (Dev/Test/Prod)',
        content: 'Setarea terenului pentru deploy stabil.',
        analogy:
          'Containerul DI e magazionerul central: îți dă exact ce dependențe ceri. Lifetimes sunt duratele contractelor jucătorilor.',
        details: [
          'Dependency Injection: injecție de dependențe prin constructor/interfețe.',
          'Service lifetimes: Singleton, Scoped, Transient.',
          'Configuration: setări externe codului (fișiere, variabile).',
          'Environment: Dev / Test / Prod cu reguli diferite.',
        ],
        visualType: 'di-lifetimes',
      },
      {
        id: 'backend-dotnet-kafka',
        title: '.NET Core Web API + Event-driven (Kafka conceptual)',
        content: 'Backend modern: API-uri curate + evenimente pentru scalare.',
        analogy:
          'Web API-ul este arbitru central pentru fazele directe, iar Kafka e stația radio dintre compartimente: mesajele ajung chiar dacă receiverul e ocupat în altă fază.',
        details: [
          '.NET Core Web API: endpoint-uri robuste, versionare și validare DTO.',
          'Event-driven architecture: publici evenimente, consumatorii reacționează asincron.',
          'Confluent Kafka (conceptual): topic-uri, producători, consumatori, offset-uri.',
          'Separarea sync API + async events reduce cuplarea și crește reziliența.',
        ],
        visualType: 'backend-pipeline',
      },
    ],
  },
  {
    id: 8,
    title: '8. Baze de date – SQL',
    icon: Database,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'sql-entities',
        title: 'Relational database, Table, Row, Column, PK, FK, Constraints, Index',
        content: 'Alfabetul SQL fără de care nu treci interviul.',
        analogy:
          'Tabela e lotul, row e jucătorul, column e atributul (post, vârstă). Primary Key e numărul unic de pe tricou. Foreign Key leagă jucătorul de echipă.',
        details: [
          'Relational database: date organizate în tabele corelate.',
          'Table / Row / Column: structură de bază.',
          'Primary Key: identificator unic.',
          'Foreign Key: relație între tabele.',
          'Constraints: reguli de integritate.',
          'Index: accelerează căutările frecvente.',
        ],
        visualType: 'sql-field',
      },
      {
        id: 'sql-normalization-joins',
        title: 'Normalization, Denormalization, JOIN (INNER/LEFT/RIGHT), Pagination',
        content: 'Cum eviți haosul și cum servești date eficient.',
        analogy:
          'Normalization e organizarea vestiarului pe compartimente; denormalization e pui lucruri mai aproape pentru viteză în zi de meci.',
        details: [
          'Normalization: reduce redundanța și anomaliile.',
          'Denormalization: optimizează citirea în scenarii specifice.',
          'INNER JOIN: doar potrivirile comune.',
          'LEFT JOIN: tot din stânga + ce se potrivește.',
          'RIGHT JOIN: tot din dreapta + ce se potrivește.',
          'Pagination: limitezi setul de rezultate pentru performanță.',
        ],
        visualType: 'sql-joins',
      },
      {
        id: 'sql-transactions',
        title: 'Transactions, ACID, Deadlocks (conceptual), Basic queries',
        content: 'Integritate și operare corectă sub presiune.',
        analogy:
          'Transferul e valid doar dacă semnăturile și plata se fac complet. Deadlock-ul e doi jucători blocați pe culoar, fiecare așteptând pe celălalt.',
        details: [
          'Transactions: grup de operații „all or nothing”.',
          'ACID: Atomicity, Consistency, Isolation, Durability.',
          'Deadlocks (conceptual): blocaje circulare între tranzacții.',
          'Basic SQL queries: SELECT, INSERT, UPDATE, DELETE.',
        ],
        visualType: 'sql-acid',
      },
    ],
  },
  {
    id: 9,
    title: '9. NoSQL (MongoDB – conceptual)',
    icon: FileJson,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'nosql-core',
        title: 'NoSQL, Document database, Collection, Document, Schema-less design',
        content: 'Date flexibile când schema se schimbă des.',
        analogy:
          'În caietul antrenorului, fiecare pagină poate avea format diferit: o pagină pentru fundaș, alta pentru faze fixe.',
        details: [
          'NoSQL: familie de baze de date non-relaționale.',
          'Document database: date stocate ca documente (ex. JSON/BSON).',
          'Collection: grup logic de documente.',
          'Document: unitatea principală de date.',
          'Schema-less design: flexibilitate mare a structurii.',
        ],
        visualType: 'nosql-vs-sql',
      },
      {
        id: 'nosql-choices',
        title: 'When to use NoSQL, SQL vs NoSQL trade-offs, Eventual consistency',
        content: 'Alegi tehnologia după context, nu după modă.',
        analogy:
          'Uneori vrei stadion clasic (SQL), alteori teren modular pentru turneu rapid (NoSQL).',
        details: [
          'When to use NoSQL: date semi-structurate, scalare orizontală, evoluție rapidă.',
          'SQL vs NoSQL trade-offs: consistență strictă vs flexibilitate/scalare.',
          'Eventual consistency (conceptual): datele converg în timp, nu instant.',
        ],
        visualType: 'consistency-wave',
      },
    ],
  },
  {
    id: 10,
    title: '10. Concurrency & Async',
    icon: Cpu,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'async-basics',
        title: 'Synchronous vs Asynchronous, Blocking vs Non-blocking, Thread, Task, async/await',
        content: 'Controlul ritmului în aplicații moderne.',
        analogy:
          'Sync e coadă la singura casă de bilete. Async deschide mai multe ghișee. Non-blocking înseamnă că nu blochezi tot stadionul pentru o singură legitimație.',
        details: [
          'Synchronous vs Asynchronous: secvențial versus concurent.',
          'Blocking vs Non-blocking: aștepți activ versus continui altă muncă.',
          'Thread: fir de execuție.',
          'Task: unitate de lucru asincronă.',
          'async / await: sintaxă clară pentru flux asincron.',
        ],
        visualType: 'async-lane',
      },
      {
        id: 'async-risks',
        title: 'Race conditions, Deadlocks, Thread safety (conceptual)',
        content: 'Greșeli clasice când mai mulți jucători ating aceeași minge.',
        analogy:
          'Race condition: doi atacanți trag simultan la aceeași minge și rezultatul depinde de cine ajunge cu 0.1s mai repede.',
        details: [
          'Race conditions (conceptual): acces concurent nesincronizat la stare comună.',
          'Deadlocks (conceptual): blocaj circular între resurse.',
          'Thread safety (conceptual): cod sigur la execuție concurentă.',
        ],
        visualType: 'thread-safety',
      },
    ],
  },
  {
    id: 11,
    title: '11. Algoritmi & Gândire',
    icon: Binary,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'structures-control',
        title: 'Arrays, Lists, Dictionaries/Maps, Loops, Conditionals',
        content: 'Structuri de date și control de flux fundamentale.',
        analogy:
          'Array-ul e linia de jucători fixați în teren. List-ul e banca flexibilă. Dictionary/Map e tabelul număr tricou -> jucător.',
        details: [
          'Arrays: dimensiune fixă, acces rapid prin index.',
          'Lists: dimensiune dinamică, inserări/ștergeri mai flexibile.',
          'Dictionaries / Maps: perechi cheie-valoare pentru lookup rapid.',
          'Loops: repetiție controlată.',
          'Conditionals: decizii pe baza condițiilor.',
        ],
        visualType: 'algo-structures',
      },
      {
        id: 'complexity-performance',
        title: 'Sorting, Searching, Time complexity (Big O), Space complexity, Performance vs readability',
        content: 'Eficiența contează, dar nu sacrifici claritatea inutil.',
        analogy:
          'Big O e viteza de tranziție atac-apărare: dacă schema consumă prea mult, echipa obosește înainte de minutul 70.',
        details: [
          'Sorting (conceptual): ordonezi date pentru procesare eficientă.',
          'Searching (conceptual): găsești elemente rapid.',
          'Time complexity (Big O): costul în funcție de mărimea inputului.',
          'Space complexity: memorie suplimentară necesară.',
          'Performance vs readability trade-off: optimizezi doar unde există nevoie reală.',
        ],
        visualType: 'algorithms-race',
      },
      {
        id: 'edge-quality',
        title: 'Edge cases & Input validation',
        content: 'Meciul se câștigă la detalii ciudate.',
        analogy:
          'Edge case e mingea lovită ciudat de gazon. Input validation e controlul biletelor la intrare: nu lași date invalide pe teren.',
        details: [
          'Edge cases: input minim/maxim, gol/null, caractere neașteptate.',
          'Input validation: verifici datele la granița sistemului.',
          'Defensiv: fail fast cu mesaje clare.',
        ],
        visualType: 'edge-defense',
      },
    ],
  },
  {
    id: 12,
    title: '12. CI / CD & DevOps',
    icon: GitBranch,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'git-flow',
        title: 'Version control, Git, Repository, Commit, Branch, Merge, Pull Request, Code review',
        content: 'Colaborarea fără haos începe cu Git disciplinat.',
        analogy:
          'Repository e clubul, branch-ul e lotul de antrenament, commit-ul e o fază clară înregistrată, PR-ul e analiza video înainte de meciul oficial.',
        details: [
          'Version control: istoric și revenire sigură.',
          'Git: sistem distribuit de control al versiunilor.',
          'Repository: spațiul codului și al istoricului.',
          'Commit: schimbare atomică documentată.',
          'Branch / Merge: dezvoltare paralelă și integrare.',
          'Pull Request + Code review: validare colaborativă a schimbărilor.',
        ],
        visualType: 'git-graph',
      },
      {
        id: 'cicd-core',
        title: 'CI, CD, Pipeline, Build, Automated tests, Deployment, Rollback, Environment variables',
        content: 'Automatizezi livrarea ca să reduci erori și stres.',
        analogy:
          'Pipeline-ul e ruta autocarului: verificare echipament (build), control medical (tests), intrare pe stadion (deployment), întoarcere rapidă dacă ceva merge prost (rollback).',
        details: [
          'CI (Continuous Integration): integrare frecventă + verificări automate.',
          'CD (Continuous Deployment / Delivery): livrare automată sau semi-automată.',
          'Pipeline: pași standardizați de build-test-release.',
          'Build: transformare cod în artefact executabil.',
          'Automated tests: gardian de regresii.',
          'Deployment: publicare în environment țintă.',
          'Rollback: revenire controlată la versiune stabilă.',
          'Environment variables: configurări externe codului.',
        ],
        visualType: 'devops-pipeline',
      },
      {
        id: 'devops-toolchain',
        title: 'Toolchain enterprise: Bamboo, Spinnaker, Bitbucket/GitHub, Jira',
        content: 'Procesele clare între cod, release și task management reduc haosul.',
        analogy:
          'Bamboo e cantonamentul automat, Spinnaker e autocarul de deploy, Bitbucket/GitHub e arhiva fazelor, iar Jira e tabela oficială cu obiectivele meciului.',
        details: [
          'Atlassian Bamboo: CI server pentru build și test orchestration.',
          'Spinnaker: orchestrare release/deployment multi-environment.',
          'Bitbucket/GitHub: version control + code review disciplinat.',
          'Jira: trasabilitate requirements -> task -> release.',
        ],
        visualType: 'git-graph',
      },
    ],
  },
  {
    id: 13,
    title: '13. Cloud (Azure conceptual)',
    icon: Cloud,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'cloud-foundation',
        title: 'Cloud computing, IaaS/PaaS/SaaS, Hosting, Scalability, Availability',
        content: 'Cloud-ul înseamnă infrastructură elastică și servicii gestionate.',
        analogy:
          'În loc să-ți construiești stadion propriu, închiriezi ce ai nevoie și scalezi când vine derby-ul.',
        details: [
          'Cloud computing: resurse livrate on-demand.',
          'IaaS / PaaS / SaaS: niveluri diferite de responsabilitate.',
          'Hosting: unde rulează aplicația.',
          'Scalability: crești/scazi resurse după trafic.',
          'Availability: menții serviciul accesibil cât mai mult timp.',
          'Azure context: App Services, Functions, managed DB și monitorizare centrală.',
        ],
        visualType: 'cloud-stack',
      },
      {
        id: 'cloud-config-secrets',
        title: 'Configuration vs code, Secrets management (conceptual)',
        content: 'Ce pui în cod și ce păstrezi în seif.',
        analogy:
          'Configurația e tabela de meci (se schimbă des), codul e tactica de bază (se schimbă controlat). Secretul e cheia vestiarului: nu o lipești pe poartă.',
        details: [
          'Configuration vs code: separi setările variabile de logica aplicației.',
          'Secrets management (conceptual): parole/token-uri în vault securizat, nu în repo.',
        ],
        visualType: 'secrets-locker',
      },
    ],
  },
  {
    id: 14,
    title: '14. AI-Assisted Development',
    icon: Bot,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'ai-usage',
        title: 'AI-assisted development, Code generation, Boilerplate generation, Refactoring with AI',
        content: 'AI accelerează, dar tu conduci echipa.',
        analogy:
          'AI-ul e analistul video: îți dă idei de faze, dar antrenorul decide ce intră în teren.',
        details: [
          'AI-assisted development: suport pentru viteză și explorare.',
          'Code generation: prototipare rapidă de funcții/componente.',
          'Boilerplate generation: economisești timp pe cod repetitiv.',
          'Refactoring with AI: sugestii de restructurare.',
        ],
        visualType: 'ai-loop',
      },
      {
        id: 'ai-governance',
        title: 'AI for docs/debug/learning, Human-in-the-loop, AI limitations, Security, Code ownership, Verification',
        content: 'Folosire responsabilă și verificată în producție.',
        analogy:
          'Asistentul îți propune schema, dar tu verifici reluarea VAR înainte de a valida golul.',
        details: [
          'AI for documentation: draft rapid de explicații.',
          'AI for debugging: ipoteze și pași de investigare.',
          'AI for learning concepts: exemple și analogii.',
          'Human-in-the-loop: decizia finală rămâne la om.',
          'AI limitations: halucinații, context incomplet, inconsistență.',
          'Security concerns: risc de expunere date/secrete.',
          'Code ownership: echipa rămâne responsabilă de codul livrat.',
          'Verification of AI output: teste, review, validare funcțională.',
        ],
        visualType: 'ai-guardrails',
      },
      {
        id: 'ai-mcp-agentic',
        title: 'AI workflows: MCP, agentic flows, prompt quality, measurable productivity',
        content: 'AI dev matur înseamnă workflow repetabil, nu prompturi haotice.',
        analogy:
          'MCP e tunelul oficial între vestiar și antrenorii specializați; fiecare agent primește rol clar, altfel toată lumea strigă peste toată lumea.',
        details: [
          'Model Context Protocol: conectezi tool-uri și date într-un mod standardizat.',
          'Agentic workflows (ex. n8n): lanțuri de task-uri automate cu verificare umană.',
          'Prompt quality: claritate, context, constrângeri, criterii de acceptare.',
          'Măsurare impact AI: lead time, defect rate, PR throughput, calitatea review-ului.',
        ],
        visualType: 'ai-loop',
      },
    ],
  },
  {
    id: 15,
    title: '15. Soft Skills & Comportament',
    icon: Users,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'soft-teamwork',
        title: 'Communication, Asking questions, Feedback, Collaboration',
        content: 'Lucrul în echipă bate eroul solitar.',
        analogy:
          'Fără comunicare, pasele se duc în aut. Întrebările bune sunt radarul care previne greșeli scumpe.',
        details: [
          'Communication: clară, concisă, orientată pe context.',
          'Asking questions: clarifici devreme, eviți rework.',
          'Giving / receiving feedback: direct, respectuos, orientat pe îmbunătățire.',
          'Collaboration: progres comun, ownership împărțit inteligent.',
        ],
        visualType: 'soft-skills',
      },
      {
        id: 'soft-ownership',
        title: 'Ownership, Accountability, Learning mindset, Handling pressure/failure',
        content: 'Mentalitate de profesionist, nu doar de executant.',
        analogy:
          'Ownership înseamnă să alergi și la faza de apărare, nu doar să te bucuri la gol.',
        details: [
          'Ownership: tratezi problema cap-coadă.',
          'Accountability: îți asumi deciziile și consecințele.',
          'Learning mindset: înveți continuu, fără ego defensiv.',
          'Handling pressure: prioritizezi calm în condiții de stres.',
          'Handling failure: extragi lecții și revii mai bun.',
        ],
        visualType: 'pressure-play',
      },
      {
        id: 'soft-prioritization',
        title: 'Prioritization & Time management',
        content: 'Executi ce contează, în ordinea corectă.',
        analogy:
          'Nu faci trick-uri în propria jumătate când adversarul presează: întâi clarifici pericolul real.',
        details: [
          'Prioritization: impact × urgență × risc.',
          'Time management: blocuri de focus, estimări realiste, follow-up predictibil.',
        ],
        visualType: 'time-box',
      },
      {
        id: 'soft-mentoring',
        title: 'Mentoring, knowledge sharing, articulating technical trade-offs',
        content: 'Senioritatea reală include creșterea echipei, nu doar ticket-uri închise.',
        analogy:
          'Un lider bun nu doar dă goluri; ridică și jocul colegilor, explică schema și corectează poziționarea fără panică.',
        details: [
          'Mentoring: feedback concret, pairing, context tehnic transmis clar.',
          'Knowledge sharing: documentație vie, demo-uri, post-mortem-uri fără blame.',
          'Articularea trade-off-urilor: explici opțiuni tehnice pe înțelesul business/QA/PM.',
        ],
        visualType: 'soft-skills',
      },
    ],
  },
  {
    id: 16,
    title: '16. Meta-concepte (diferențiatorul)',
    icon: BrainCircuit,
    color: 'bg-red-600',
    concepts: [
      {
        id: 'meta-tradeoffs',
        title: 'Trade-offs, Readability vs performance, Simplicity vs over-engineering',
        content: 'Decizii mature, nu extreme dogmatice.',
        analogy:
          'Uneori aperi rezultatul, alteori riști ofensiv. Important e contextul meciului, nu ideologia tactică.',
        details: [
          'Trade-offs: fiecare alegere câștigă ceva și pierde altceva.',
          'Readability vs performance: optimizezi unde doare, păstrezi claritatea implicit.',
          'Simplicity vs over-engineering: construiești minimul robust.',
        ],
        visualType: 'meta-tradeoffs',
      },
      {
        id: 'meta-sustainability',
        title: 'Maintainability, Scalability, Technical debt, Refactoring, Code quality, Clean code, Documentation',
        content: 'Cum păstrezi proiectul sănătos după multe sezoane.',
        analogy:
          'Technical debt e când câștigi azi cu improvizații și plătești dublu în retur. Refactoring-ul e cantonamentul în care corectezi fundația.',
        details: [
          'Maintainability: cod ușor de înțeles și modificat.',
          'Scalability: susține creșterea fără degradare majoră.',
          'Technical debt: compromisuri tehnice care au cost viitor.',
          'Refactoring: îmbunătățești structura fără a schimba comportamentul.',
          'Code quality + Clean code: consistență, claritate, testabilitate.',
          'Documentation: context durabil pentru oameni noi și mentenanță.',
        ],
        visualType: 'quality-loop',
      },
      {
        id: 'meta-thinking',
        title: 'Assumptions & Thinking out loud',
        content: 'Transparența gândirii accelerează echipa.',
        analogy:
          'Dacă antrenorul explică schema cu voce tare, toți știu unde se mișcă. Dacă presupui în tăcere, apare haosul.',
        details: [
          'Assumptions: le faci explicite și le validezi devreme.',
          'Thinking out loud: comunici raționamentul, riscurile și alternativele.',
          'Rezultat: mai puține surprize, aliniere mai bună.',
        ],
        visualType: 'thinking-map',
      },
      {
        id: 'construction-domain-impact',
        title: 'Software pentru construcții: domain thinking & real-world impact',
        content: 'Codul bun trebuie să rezolve probleme reale, nu doar să fie elegant.',
        analogy:
          'E ca pregătirea unui derby pe un stadion real, nu pe PlayStation: condițiile din teren (date incomplete, integrare sisteme, timp limitat) dictează tactica tehnică.',
        details: [
          'Domain understanding: fluxuri reale, utilizatori reali, constrângeri reale.',
          'Reliability + usability: software intuitiv, eficient și robust pe teren.',
          'Performance tuning end-to-end: DB, API, UI, observability.',
          'Impact mindset: optimizezi pentru valoare de business, nu doar pentru cod „frumos”.',
        ],
        visualType: 'meta-tradeoffs',
      },
    ],
  },
];
