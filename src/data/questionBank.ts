import type { Question } from '../lib/types.ts';

type QuestionSeed = Omit<Question, 'id' | 'created_at'>;

const INTERVIEW_QUESTIONS: QuestionSeed[] = [
  {
    type: 'C#',
    question: 'Ce diferență esențială este între compile-time errors și runtime errors?',
    correct_answer: 'Compile-time sunt prinse la compilare; runtime apar în execuție, după ce aplicația pornește.',
    wrong_answers: [
      'Compile-time apar doar în producție, runtime doar local.',
      'Nu există diferență, sunt același tip de eroare.',
      'Runtime errors sunt detectate întotdeauna de IDE înainte de rulare.'
    ],
    difficulty: 'easy',
    explanation: 'Exemplu: type mismatch = compile-time, NullReferenceException = runtime.',
    conceptTitle: '1. Fundamente • Compile-time vs Runtime'
  },
  {
    type: 'C#',
    question: 'Ce este un logical error?',
    correct_answer: 'Codul compilează și rulează, dar rezultatul obținut este greșit față de așteptări.',
    wrong_answers: [
      'O eroare de sintaxă care oprește compilarea.',
      'O excepție care apare doar în release mode.',
      'Un warning pe care compilatorul îl tratează ca fatal implicit.'
    ],
    difficulty: 'easy',
    explanation: 'Este cel mai greu de prins fără teste și debugging atent.',
    conceptTitle: '1. Fundamente • Logical errors'
  },
  {
    type: 'C#',
    question: 'Cum diferențiezi warning de error la compilare?',
    correct_answer: 'Error blochează build-ul; warning permite build-ul dar semnalează risc potențial.',
    wrong_answers: [
      'Warning blochează build-ul, error nu.',
      'Ambele au exact același impact la compilare.',
      'Warning apare doar în .NET Core, error doar în .NET Framework.'
    ],
    difficulty: 'easy',
    explanation: 'În multe echipe warning-urile sunt tratate ca errors în CI.',
    conceptTitle: '1. Fundamente • Warnings vs Errors'
  },
  {
    type: 'C#',
    question: 'Ce rol are try/catch/finally?',
    correct_answer: 'try execută codul, catch tratează excepții, finally rulează mereu pentru cleanup.',
    wrong_answers: [
      'finally rulează doar dacă apare excepție.',
      'catch rulează înainte de try.',
      'finally este echivalent cu return și oprește metoda.'
    ],
    difficulty: 'easy',
    explanation: 'finally este util pentru eliberare resurse: conexiuni, stream-uri, lock-uri.',
    conceptTitle: '1. Fundamente • Exception handling'
  },
  {
    type: 'C#',
    question: 'Care este diferența conceptuală Stack vs Heap în C#?',
    correct_answer: 'Stack ține date cu durată scurtă și call frames; Heap ține obiecte alocate dinamic, gestionate de GC.',
    wrong_answers: [
      'Heap este pentru metode, Stack pentru obiecte.',
      'Stack și Heap sunt identice în .NET modern.',
      'Stack este gestionat exclusiv de Garbage Collector.'
    ],
    difficulty: 'medium',
    explanation: 'Reference types trăiesc pe heap, iar variabilele locale/referințele sunt pe stack.',
    conceptTitle: '1. Fundamente • Stack vs Heap'
  },
  {
    type: 'C#',
    question: 'Ce face Garbage Collector?',
    correct_answer: 'Eliberează memoria obiectelor de pe heap care nu mai sunt accesibile.',
    wrong_answers: [
      'Șterge automat toate variabilele locale la fiecare linie.',
      'Înlocuiește complet nevoia de gestionare atentă a resurselor.',
      'Rulează numai când dezvoltatorul îl apelează manual.'
    ],
    difficulty: 'medium',
    explanation: 'GC reduce memory management manual, dar nu elimină riscul de leak prin referințe menținute inutil.',
    conceptTitle: '1. Fundamente • Garbage Collection'
  },
  {
    type: 'C#',
    question: 'La debugging, ce avantaj au breakpoints + watch variables?',
    correct_answer: 'Poți opri execuția exact unde te interesează și inspecta starea internă în acel moment.',
    wrong_answers: [
      'Înlocuiesc complet testele unitare.',
      'Sunt utile doar în producție, nu în development.',
      'Funcționează doar pentru aplicații console.'
    ],
    difficulty: 'easy',
    explanation: 'Combinația breakpoint, call stack și watch accelerează identificarea cauzei reale.',
    conceptTitle: '1. Fundamente • Debugging'
  },
  {
    type: 'C#',
    question: 'Logging vs debugging: când alegi logging?',
    correct_answer: 'În medii reale/producție, unde nu poți atașa debugger și ai nevoie de trasabilitate în timp.',
    wrong_answers: [
      'Logging este util doar în testele unitare.',
      'Debugging este întotdeauna superior logging-ului.',
      'Logging trebuie evitat deoarece încetinește orice aplicație masiv.'
    ],
    difficulty: 'medium',
    explanation: 'Logging structurat este critic pentru incidente și observabilitate.',
    conceptTitle: '1. Fundamente • Logging'
  },

  {
    type: 'POO',
    question: 'Ce este OOP în termeni practici?',
    correct_answer: 'Un mod de modelare a sistemului prin obiecte care combină stare (date) și comportament (metode).',
    wrong_answers: [
      'Un set fix de design patterns impuse de limbaj.',
      'O tehnică exclusivă pentru aplicații UI.',
      'O alternativă la folosirea claselor.'
    ],
    difficulty: 'easy',
    explanation: 'OOP ajută la organizare, reutilizare și extensibilitate.',
    conceptTitle: '2. OOP • Ce este OOP'
  },
  {
    type: 'POO',
    question: 'Clasă vs obiect: ce exprimă corect diferența?',
    correct_answer: 'Clasa este șablonul; obiectul este instanța concretă creată din acel șablon.',
    wrong_answers: [
      'Obiectul definește structura, clasa doar datele runtime.',
      'Sunt sinonime în C#.',
      'Clasa există doar la runtime, obiectul doar la compile-time.'
    ],
    difficulty: 'easy',
    explanation: 'Poți avea multe obiecte diferite din aceeași clasă.',
    conceptTitle: '2. OOP • Clasă vs Obiect'
  },
  {
    type: 'POO',
    question: 'Ce diferență e între composition și inheritance?',
    correct_answer: 'Composition modelează has-a; inheritance modelează is-a.',
    wrong_answers: [
      'Composition este o formă de overriding.',
      'Inheritance este preferată mereu față de composition.',
      'Ambele exprimă exact același tip de relație.'
    ],
    difficulty: 'medium',
    explanation: 'În practică, composition oferă de multe ori flexibilitate mai bună.',
    conceptTitle: '2. OOP • is-a vs has-a'
  },
  {
    type: 'POO',
    question: 'Method overloading vs method overriding?',
    correct_answer: 'Overloading: același nume, semnături diferite; overriding: redefinire comportament moștenit cu aceeași semnătură.',
    wrong_answers: [
      'Overriding este doar pentru metode statice.',
      'Overloading necesită moștenire obligatoriu.',
      'Sunt același mecanism la compile-time.'
    ],
    difficulty: 'medium',
    explanation: 'Overriding permite polimorfism runtime.',
    conceptTitle: '2. OOP • Overloading/Overriding'
  },
  {
    type: 'POO',
    question: 'Când alegi interfață vs clasă abstractă?',
    correct_answer: 'Interfață pentru contract comportamental; clasă abstractă pentru contract + logică comună de bază.',
    wrong_answers: [
      'Interfața este pentru stocare de stare internă.',
      'Clasa abstractă nu poate avea metode implementate.',
      'Interfața nu poate fi folosită cu DI.'
    ],
    difficulty: 'medium',
    explanation: 'Interfețele ajută la decuplare și testabilitate.',
    conceptTitle: '2. OOP • Interface vs Abstract class'
  },
  {
    type: 'POO',
    question: 'Ce înseamnă coupling mic și cohesion mare?',
    correct_answer: 'Componentele depind puțin una de alta, iar fiecare componentă are responsabilitate clară internă.',
    wrong_answers: [
      'Coupling mic înseamnă multe dependențe circulare.',
      'Cohesion mare înseamnă clasă care face de toate.',
      'Sunt concepte opționale, fără impact real în mentenanță.'
    ],
    difficulty: 'medium',
    explanation: 'Acest echilibru îmbunătățește testarea și evoluția codului.',
    conceptTitle: '2. OOP • Coupling & Cohesion'
  },

  {
    type: 'POO',
    question: 'SRP (Single Responsibility Principle) cere ca o clasă să aibă ce?',
    correct_answer: 'Un singur motiv principal de schimbare.',
    wrong_answers: [
      'O singură metodă publică.',
      'O singură dependență externă.',
      'Doar proprietăți private.'
    ],
    difficulty: 'easy',
    explanation: 'SRP reduce efectele secundare la schimbări.',
    conceptTitle: '3. SOLID • SRP'
  },
  {
    type: 'POO',
    question: 'OCP (Open/Closed Principle) aplicat practic înseamnă?',
    correct_answer: 'Extinzi comportamentul fără să modifici cod stabil existent.',
    wrong_answers: [
      'Nu modifici niciodată niciun fișier existent.',
      'Folosești doar clase sealed.',
      'Scrii totul într-o singură clasă generică.'
    ],
    difficulty: 'medium',
    explanation: 'Pattern-uri ca Strategy ajută aplicarea OCP.',
    conceptTitle: '3. SOLID • OCP'
  },
  {
    type: 'POO',
    question: 'LSP este încălcat când?',
    correct_answer: 'Un subtip nu poate înlocui tipul de bază fără a rupe comportamentul așteptat.',
    wrong_answers: [
      'O clasă are prea multe proprietăți.',
      'Folosești dependency injection.',
      'Ai mai multe interfețe în același fișier.'
    ],
    difficulty: 'hard',
    explanation: 'LSP ține de contracte comportamentale, nu doar de semnături.',
    conceptTitle: '3. SOLID • LSP'
  },
  {
    type: 'POO',
    question: 'ISP recomandă ce tip de interfețe?',
    correct_answer: 'Interfețe mici și specifice, ca să nu forțezi implementări inutile.',
    wrong_answers: [
      'Interfețe foarte mari pentru consistență globală.',
      'Interfețe doar cu metode async.',
      'Interfețe folosite exclusiv în UI.'
    ],
    difficulty: 'medium',
    explanation: 'Clienții nu ar trebui să depindă de ce nu folosesc.',
    conceptTitle: '3. SOLID • ISP'
  },
  {
    type: 'POO',
    question: 'DIP în context enterprise .NET?',
    correct_answer: 'Modulele de nivel înalt depind de abstracții, nu de implementări concrete.',
    wrong_answers: [
      'Clasele concrete trebuie să depindă de modulele high-level.',
      'Abstracțiile depind de detalii concrete.',
      'DIP înseamnă doar inversarea ordinii apelurilor.'
    ],
    difficulty: 'hard',
    explanation: 'Este baza pentru testabilitate și schimbarea facilă a implementărilor.',
    conceptTitle: '3. SOLID • DIP'
  },

  {
    type: 'POO',
    question: 'Ce rezolvă pattern-ul Factory?',
    correct_answer: 'Separă crearea obiectelor de codul care le consumă.',
    wrong_answers: [
      'Forțează singleton global pentru toate clasele.',
      'Elimină nevoia de interfețe.',
      'Asigură persistarea automată în database.'
    ],
    difficulty: 'easy',
    explanation: 'Ajută la OCP și decuplare.',
    conceptTitle: '4. Design Patterns • Factory'
  },
  {
    type: 'POO',
    question: 'Singleton este util când?',
    correct_answer: 'Ai nevoie controlată de o singură instanță partajată pentru un serviciu specific.',
    wrong_answers: [
      'Pentru orice clasă de business, implicit.',
      'Când vrei să eviți testarea.',
      'Când ai multe request-uri concurente în mod obligatoriu.'
    ],
    difficulty: 'medium',
    explanation: 'Folosește-l atent; poate introduce coupling global.',
    conceptTitle: '4. Design Patterns • Singleton'
  },
  {
    type: 'POO',
    question: 'Strategy pattern ajută la ce?',
    correct_answer: 'Schimbarea algoritmului la runtime fără a modifica clientul.',
    wrong_answers: [
      'Persistență automată a strategiilor în DB.',
      'Rulare pe thread separat implicit.',
      'Eliminarea completă a interfețelor.'
    ],
    difficulty: 'medium',
    explanation: 'Ai comportamente interschimbabile sub un contract comun.',
    conceptTitle: '4. Design Patterns • Strategy'
  },
  {
    type: 'POO',
    question: 'Observer pattern este potrivit când?',
    correct_answer: 'Mai mulți consumatori trebuie notificați la schimbarea stării unui subiect.',
    wrong_answers: [
      'Ai nevoie de tranzacții ACID.',
      'Vrei să creezi obiecte complexe pas cu pas.',
      'Vrei să adaptezi o interfață incompatibilă.'
    ],
    difficulty: 'medium',
    explanation: 'Este baza modelului publish-subscribe.',
    conceptTitle: '4. Design Patterns • Observer'
  },
  {
    type: 'POO',
    question: 'Ce anti-pattern descrie o clasă care face prea multe?',
    correct_answer: 'God Object.',
    wrong_answers: [
      'Builder.',
      'Repository.',
      'Decorator.'
    ],
    difficulty: 'easy',
    explanation: 'Produce coupling ridicat și mentenanță dificilă.',
    conceptTitle: '4. Design Patterns • Anti-patterns'
  },

  {
    type: 'C#',
    question: 'Care e diferența de scop între unit test și integration test?',
    correct_answer: 'Unit testează o unitate izolată; integration testează colaborarea între componente reale.',
    wrong_answers: [
      'Unit test rulează întotdeauna mai lent.',
      'Integration test nu are assertions.',
      'Sunt aceeași categorie de teste.'
    ],
    difficulty: 'easy',
    explanation: 'Ambele sunt necesare, cu roluri diferite.',
    conceptTitle: '5. Testare • Unit vs Integration'
  },
  {
    type: 'C#',
    question: 'Arrange-Act-Assert înseamnă?',
    correct_answer: 'Pregătești contextul, execuți acțiunea testată, verifici rezultatul.',
    wrong_answers: [
      'Rulezi testul de trei ori în moduri diferite.',
      'Testezi doar API, nu logică internă.',
      'Scrii întâi assertions, apoi codul.'
    ],
    difficulty: 'easy',
    explanation: 'AAA crește claritatea și mentenabilitatea testelor.',
    conceptTitle: '5. Testare • AAA'
  },
  {
    type: 'C#',
    question: 'Mock vs stub vs fake: care formulare e corectă?',
    correct_answer: 'Stub dă răspunsuri fixe, mock verifică interacțiuni, fake este implementare simplificată funcțională.',
    wrong_answers: [
      'Sunt termeni identici pentru același obiect.',
      'Mock este pentru UI, stub pentru DB exclusiv.',
      'Fake înseamnă date invalide în test.'
    ],
    difficulty: 'medium',
    explanation: 'Alegerea depinde de ce vrei să verifici: rezultat sau comportament.',
    conceptTitle: '5. Testare • Test doubles'
  },
  {
    type: 'C#',
    question: 'Ce spune testing pyramid?',
    correct_answer: 'Multe unit tests, mai puține integration, puține E2E.',
    wrong_answers: [
      'Majoritatea testelor trebuie să fie E2E.',
      'Doar E2E oferă valoare reală.',
      'Toate straturile trebuie în proporții egale.'
    ],
    difficulty: 'medium',
    explanation: 'Costul crește pe măsură ce urci în piramidă.',
    conceptTitle: '5. Testare • Testing pyramid'
  },
  {
    type: 'C#',
    question: 'Când NU merită să scrii unit tests?',
    correct_answer: 'Pentru cod trivial fără logică semnificativă, unde costul depășește valoarea.',
    wrong_answers: [
      'Pentru orice cod ce rulează în producție.',
      'Pentru clasele cu dependențe externe.',
      'Când ai CI/CD configurat.'
    ],
    difficulty: 'medium',
    explanation: 'Focalizezi testele pe zone cu risc și logică de business.',
    conceptTitle: '5. Testare • When NOT to unit test'
  },

  {
    type: 'C#',
    question: 'În HTTP, GET vs POST: ce e corect?',
    correct_answer: 'GET citește și e idempotent; POST trimite date pentru creare/procesare și nu e idempotent în mod normal.',
    wrong_answers: [
      'GET modifică resurse, POST doar citește.',
      'POST este obligatoriu fără body.',
      'GET poate fi folosit doar intern, nu public.'
    ],
    difficulty: 'easy',
    explanation: 'Idempotency este critică pentru design de API robust.',
    conceptTitle: '6. Web & HTTP • Methods'
  },
  {
    type: 'C#',
    question: 'Ce diferență importantă e între 401 și 403?',
    correct_answer: '401: nu ești autentificat; 403: ești autentificat, dar nu ai permisiune.',
    wrong_answers: [
      '401 este pentru server down, 403 pentru client down.',
      'Nu există diferență semantică între ele.',
      '403 este folosit când resursa nu există.'
    ],
    difficulty: 'easy',
    explanation: 'Distincția corectă ajută UX și securitatea API-ului.',
    conceptTitle: '6. Web & HTTP • Status codes'
  },
  {
    type: 'C#',
    question: 'Path parameters vs query parameters?',
    correct_answer: 'Path identifică resursa; query ajustează filtrare/sortare/paginare.',
    wrong_answers: [
      'Query identifică resursa principală, path opțiunile.',
      'Path există doar pentru POST.',
      'Sunt complet interschimbabile fără impact semantic.'
    ],
    difficulty: 'easy',
    explanation: 'Ex: /users/42 versus /users?page=2&sort=name.',
    conceptTitle: '6. Web & HTTP • Params'
  },
  {
    type: 'C#',
    question: 'Ce implică statelessness în REST?',
    correct_answer: 'Fiecare request conține contextul necesar; serverul nu depinde de sesiune server-side pentru flux.',
    wrong_answers: [
      'Serverul nu păstrează date deloc în baze de date.',
      'Clientul nu trimite niciodată token-uri.',
      'REST interzice metodele PUT și DELETE.'
    ],
    difficulty: 'medium',
    explanation: 'Facilitează scalare orizontală și simplifică load balancing.',
    conceptTitle: '6. Web & HTTP • Statelessness'
  },
  {
    type: 'C#',
    question: 'În Angular enterprise, când preferi Reactive Forms față de template-driven forms?',
    correct_answer: 'Când ai formulare complexe, validări dinamice și ai nevoie de testabilitate ridicată și control explicit al stării.',
    wrong_answers: [
      'Reactive Forms sunt doar pentru aplicații foarte mici.',
      'Template-driven forms sunt obligatorii când folosești TypeScript strict.',
      'Nu există diferențe reale între cele două abordări.'
    ],
    difficulty: 'medium',
    explanation: 'Reactive Forms oferă control programatic mai bun și scaling mai bun în aplicații mari.',
    conceptTitle: '6. Web & HTTP • Angular forms'
  },
  {
    type: 'C#',
    question: 'Ce avantaj principal aduce strategia OnPush în Angular?',
    correct_answer: 'Reduce rerendering-ul inutil, actualizând componenta pe schimbări detectabile predictibil (ex: referințe noi, evenimente).',
    wrong_answers: [
      'Crește frecvența automată a change detection pentru toate componentele.',
      'Elimină complet nevoia de management al stării.',
      'Este utilă doar în aplicații fără HTTP requests.'
    ],
    difficulty: 'hard',
    explanation: 'OnPush îmbunătățește performanța, dar cere disciplină în pattern-urile de state updates.',
    conceptTitle: '6. Web & HTTP • Angular OnPush'
  },
  {
    type: 'C#',
    question: 'Ce rol are un HTTP Interceptor în Angular?',
    correct_answer: 'Aplică logică transversală pentru request/response (auth headers, logging, retry, error handling) într-un loc centralizat.',
    wrong_answers: [
      'Înlocuiește complet serviciile Angular.',
      'Este folosit exclusiv pentru manipularea template-urilor HTML.',
      'Poate fi utilizat doar în aplicații SSR, nu SPA.'
    ],
    difficulty: 'medium',
    explanation: 'Interceptors reduc duplicarea și standardizează comportamentul de rețea al aplicației.',
    conceptTitle: '6. Web & HTTP • Angular interceptors'
  },
  {
    type: 'C#',
    question: 'De ce este important lazy loading în Angular?',
    correct_answer: 'Scade bundle-ul inițial și îmbunătățește timpul de încărcare, încărcând feature-uri doar când sunt necesare.',
    wrong_answers: [
      'Crește dimensiunea bundle-ului inițial pentru performanță mai bună.',
      'Este util doar în aplicații cu o singură pagină statică.',
      'Elimină nevoia de routing în aplicație.'
    ],
    difficulty: 'easy',
    explanation: 'În proiecte enterprise, lazy loading este esențial pentru UX și scalare front-end.',
    conceptTitle: '6. Web & HTTP • Angular lazy loading'
  },
  {
    type: 'C#',
    question: 'Signals vs NgRx: cum alegi pragmatic în Angular?',
    correct_answer: 'Signals sunt bune pentru complexitate moderată și ergonomie; NgRx e preferat când ai state global complex, fluxuri stricte și nevoie de predictibilitate/auditabilitate.',
    wrong_answers: [
      'NgRx trebuie folosit în orice aplicație indiferent de complexitate.',
      'Signals înlocuiesc toate pattern-urile de state management enterprise.',
      'Alegerea depinde doar de preferința personală, fără impact tehnic.'
    ],
    difficulty: 'hard',
    explanation: 'Decizia corectă este contextuală și bazată pe cost de mentenanță vs control.',
    conceptTitle: '6. Web & HTTP • Angular state management'
  },

  {
    type: 'C#',
    question: 'Care e rolul unui controller într-un Web API .NET?',
    correct_answer: 'Primește request-uri HTTP și orchestrează apeluri către servicii pentru a returna response-uri.',
    wrong_answers: [
      'Conține întreaga logică de acces la DB în mod obligatoriu.',
      'Rulează doar validări de compilare.',
      'Este echivalent cu repository-ul.'
    ],
    difficulty: 'easy',
    explanation: 'Controller-ul ideal rămâne subțire; logica complexă stă în service layer.',
    conceptTitle: '7. Backend API • Controller'
  },
  {
    type: 'C#',
    question: 'De ce folosim DTO în API-uri enterprise?',
    correct_answer: 'Separăm contractul public de modelul intern și controlăm strict ce expunem.',
    wrong_answers: [
      'DTO este obligatoriu doar la MongoDB.',
      'DTO înlocuiește complet validarea de input.',
      'DTO este folosit doar pentru date binare mari.'
    ],
    difficulty: 'medium',
    explanation: 'DTO reduce coupling între API și persistență.',
    conceptTitle: '7. Backend API • DTO'
  },
  {
    type: 'C#',
    question: 'Service lifetime corect pentru DbContext în majoritatea aplicațiilor web?',
    correct_answer: 'Scoped, astfel încât să existe o instanță per request.',
    wrong_answers: [
      'Singleton, pentru performanță maximă.',
      'Transient pentru toate repository-urile în mod forțat.',
      'Nu contează lifetime-ul pentru DbContext.'
    ],
    difficulty: 'medium',
    explanation: 'Scoped evită probleme de concurență și stare partajată incorect.',
    conceptTitle: '7. Backend API • DI lifetimes'
  },
  {
    type: 'C#',
    question: 'Ce este middleware în ASP.NET Core?',
    correct_answer: 'Componente în pipeline care procesează request/response pentru concerns transversale.',
    wrong_answers: [
      'Un replacement pentru controllere.',
      'O bibliotecă de query SQL.',
      'Un tip de decorator pentru modele EF.'
    ],
    difficulty: 'medium',
    explanation: 'Exemple: auth, logging, exception handling, CORS.',
    conceptTitle: '7. Backend API • Middleware'
  },

  {
    type: 'C#',
    question: 'Primary key vs foreign key?',
    correct_answer: 'Primary key identifică unic rândul; foreign key leagă tabelele între ele prin referință.',
    wrong_answers: [
      'Primary key este mereu text, foreign key mereu numeric.',
      'Foreign key este opțională pentru relații one-to-many.',
      'Primary key poate avea duplicate dacă există index.'
    ],
    difficulty: 'easy',
    explanation: 'Cheile susțin integritatea datelor relaționale.',
    conceptTitle: '8. SQL • Keys'
  },
  {
    type: 'C#',
    question: 'INNER JOIN vs LEFT JOIN?',
    correct_answer: 'INNER aduce doar potriviri în ambele tabele; LEFT aduce toate rândurile din stânga + potrivirile din dreapta.',
    wrong_answers: [
      'LEFT JOIN exclude rândurile fără potrivire.',
      'INNER JOIN aduce toate rândurile din stânga.',
      'Nu există diferență de rezultat, doar sintaxă.'
    ],
    difficulty: 'medium',
    explanation: 'Alegerea join-ului schimbă semnificativ setul de rezultate.',
    conceptTitle: '8. SQL • JOINs'
  },
  {
    type: 'C#',
    question: 'Ce înseamnă ACID pentru tranzacții?',
    correct_answer: 'Atomicity, Consistency, Isolation, Durability pentru integritate și fiabilitate.',
    wrong_answers: [
      'Authentication, Caching, Indexing, Denormalization.',
      'Asynchronous, Consistent, Immutable, Distributed.',
      'Un format de query SQL avansat.'
    ],
    difficulty: 'medium',
    explanation: 'ACID este critic pentru scenarii enterprise sensibile.',
    conceptTitle: '8. SQL • ACID'
  },
  {
    type: 'C#',
    question: 'Ce este deadlock-ul în DB, conceptual?',
    correct_answer: 'Două tranzacții se blochează reciproc așteptând resurse una de la alta.',
    wrong_answers: [
      'O eroare de sintaxă în query.',
      'Un lock care se aplică doar în read-only mode.',
      'Stare în care DB pierde toate indexurile.'
    ],
    difficulty: 'hard',
    explanation: 'Ordinea consistentă a operațiilor reduce riscul de deadlock.',
    conceptTitle: '8. SQL • Deadlocks'
  },

  {
    type: 'C#',
    question: 'Când e potrivit NoSQL (MongoDB) în loc de SQL?',
    correct_answer: 'Când schema este flexibilă/evolutivă și modelul document-centric aduce avantaj.',
    wrong_answers: [
      'Întotdeauna pentru orice aplicație nouă.',
      'Doar când ai nevoie de tranzacții ACID complexe multi-table.',
      'Numai pentru date strict relaționale cu JOIN-uri grele.'
    ],
    difficulty: 'medium',
    explanation: 'Decizia depinde de modelul datelor și de pattern-ul de acces.',
    conceptTitle: '9. NoSQL • When to use'
  },
  {
    type: 'C#',
    question: 'Ce înseamnă schema-less în MongoDB?',
    correct_answer: 'Structura documentelor poate varia; schema se validează mai mult la nivel aplicație/reguli.',
    wrong_answers: [
      'Datele nu au niciun format intern.',
      'Toate documentele trebuie să aibă aceleași câmpuri obligatoriu.',
      'Nu poți defini indexuri într-un DB schema-less.'
    ],
    difficulty: 'medium',
    explanation: 'Flexibilitatea vine cu responsabilitate de validare.',
    conceptTitle: '9. NoSQL • Schema-less'
  },
  {
    type: 'C#',
    question: 'Ce este eventual consistency?',
    correct_answer: 'Sistemul devine consistent în timp, nu neapărat instant pe toate nodurile.',
    wrong_answers: [
      'Consistența nu va exista niciodată în cluster.',
      'Toate nodurile sunt sincronizate perfect la fiecare milisecundă.',
      'Este sinonim cu tranzacție serializabilă.'
    ],
    difficulty: 'hard',
    explanation: 'Este un compromis frecvent în sisteme distribuite scalabile.',
    conceptTitle: '9. NoSQL • Eventual consistency'
  },

  {
    type: 'C#',
    question: 'Synchronous vs asynchronous: care e ideea centrală?',
    correct_answer: 'Sync blochează fluxul până la rezultat; async permite progres pe alte operații în paralel cu așteptarea.',
    wrong_answers: [
      'Async creează întotdeauna thread nou.',
      'Sync este interzis în aplicații enterprise.',
      'Sunt doar denumiri diferite pentru același model.'
    ],
    difficulty: 'easy',
    explanation: 'În web backend, async ajută mult la I/O bound work.',
    conceptTitle: '10. Concurrency • Sync vs Async'
  },
  {
    type: 'C#',
    question: 'Thread vs Task în C#?',
    correct_answer: 'Thread este unitate low-level OS; Task este abstracție higher-level pentru lucru asincron.',
    wrong_answers: [
      'Task poate exista doar în aplicații UI.',
      'Thread este întotdeauna preferat față de Task.',
      'Task și Thread nu au nicio legătură.'
    ],
    difficulty: 'medium',
    explanation: 'Task + async/await simplifică modelul concurent în .NET.',
    conceptTitle: '10. Concurrency • Thread vs Task'
  },
  {
    type: 'C#',
    question: 'Ce este race condition?',
    correct_answer: 'Rezultatul depinde de ordinea necontrolată a execuțiilor concurente pe date partajate.',
    wrong_answers: [
      'Un algoritm de sortare paralelă.',
      'Un deadlock inevitabil în orice aplicație async.',
      'O eroare de network timeout.'
    ],
    difficulty: 'hard',
    explanation: 'Thread safety și sincronizarea corectă sunt cheia prevenirii.',
    conceptTitle: '10. Concurrency • Race conditions'
  },

  {
    type: 'C#',
    question: 'Big O descrie ce anume?',
    correct_answer: 'Cum crește costul algoritmului (timp/memorie) odată cu mărimea inputului.',
    wrong_answers: [
      'Timpul exact în milisecunde pe laptopul dezvoltatorului.',
      'Numărul de linii de cod ale implementării.',
      'Doar complexitatea sortării, nu a căutării.'
    ],
    difficulty: 'medium',
    explanation: 'Ajută la compararea scalabilității algoritmilor.',
    conceptTitle: '11. Algoritmi • Big O'
  },
  {
    type: 'C#',
    question: 'Când alegi Dictionary/Map în loc de List?',
    correct_answer: 'Când ai nevoie de lookup rapid după cheie unică.',
    wrong_answers: [
      'Când ai nevoie de ordine strictă de inserare în toate cazurile.',
      'Când nu ai cheie de identificare clară.',
      'Când vrei doar append secvențial simplu.'
    ],
    difficulty: 'easy',
    explanation: 'Map-urile optimizează căutări repetitive.',
    conceptTitle: '11. Algoritmi • Dictionaries'
  },
  {
    type: 'C#',
    question: 'De ce sunt edge cases critice în interviuri și producție?',
    correct_answer: 'Pentru că multe defecte apar la limite: null, colecții goale, valori extreme, input invalid.',
    wrong_answers: [
      'Edge cases nu contează dacă happy path trece.',
      'Le testezi doar după release.',
      'Sunt responsabilitatea exclusivă a QA.'
    ],
    difficulty: 'medium',
    explanation: 'Input validation + teste pentru limite cresc robustețea.',
    conceptTitle: '11. Algoritmi • Edge cases'
  },

  {
    type: 'C#',
    question: 'Ce aduce CI (Continuous Integration) într-o echipă?',
    correct_answer: 'Integrare frecventă cu build/test automate pentru detectare rapidă a regresiilor.',
    wrong_answers: [
      'Deploy direct în producție fără validare.',
      'Înlocuiește complet code review.',
      'Elimină nevoia de branch-uri.'
    ],
    difficulty: 'easy',
    explanation: 'CI scade riscul de „big-bang integration”.',
    conceptTitle: '12. CI/CD • CI'
  },
  {
    type: 'C#',
    question: 'CD: delivery vs deployment?',
    correct_answer: 'Delivery = gata de release cu aprobare manuală; deployment = release automat în producție.',
    wrong_answers: [
      'Delivery înseamnă doar transport de artefacte.',
      'Deployment necesită mereu intervenție umană.',
      'Sunt sinonime în orice organizație.'
    ],
    difficulty: 'medium',
    explanation: 'Ambele cer pipeline solid și încredere în teste.',
    conceptTitle: '12. CI/CD • Delivery vs Deployment'
  },
  {
    type: 'C#',
    question: 'De ce sunt importante rollback și environment variables?',
    correct_answer: 'Rollback reduce impactul incidentelor; environment variables separă configurația sensibilă de cod.',
    wrong_answers: [
      'Rollback se folosește doar în development.',
      'Environment variables trebuie commit-ate în repo.',
      'Ambele sunt opționale în enterprise software.'
    ],
    difficulty: 'medium',
    explanation: 'Practici de bază pentru operare sigură în producție.',
    conceptTitle: '12. CI/CD • Ops hygiene'
  },

  {
    type: 'C#',
    question: 'IaaS / PaaS / SaaS: ce diferență-cheie ai în responsabilitate?',
    correct_answer: 'Cu cât urci spre SaaS, cu atât gestionezi mai puțină infrastructură directă.',
    wrong_answers: [
      'În SaaS gestionezi serverele și patch-urile OS.',
      'PaaS necesită mai multă administrare low-level decât IaaS.',
      'Nu există diferență de responsabilitate între ele.'
    ],
    difficulty: 'medium',
    explanation: 'Alegerea influențează viteza de livrare și controlul operațional.',
    conceptTitle: '13. Cloud • Service models'
  },
  {
    type: 'C#',
    question: 'Scalability vs availability în cloud?',
    correct_answer: 'Scalability = gestionezi creștere de load; availability = serviciul rămâne accesibil în timp.',
    wrong_answers: [
      'Sunt exact același concept.',
      'Availability contează doar pentru baze de date.',
      'Scalability înseamnă doar vertical scaling.'
    ],
    difficulty: 'medium',
    explanation: 'Sisteme mature optimizează ambele, nu doar unul.',
    conceptTitle: '13. Cloud • Scalability & Availability'
  },
  {
    type: 'C#',
    question: 'Ce înseamnă secrets management bun?',
    correct_answer: 'Secretele sunt păstrate în vault-uri dedicate, rotate-ate, auditabile, niciodată hardcodate.',
    wrong_answers: [
      'Le pui în appsettings din repo privat și e suficient.',
      'Le criptezi manual într-un fișier text în proiect.',
      'Le trimiți în prompt-uri AI pentru debugging rapid.'
    ],
    difficulty: 'hard',
    explanation: 'Practică esențială în medii enterprise și cloud.',
    conceptTitle: '13. Cloud • Secrets management'
  },

  {
    type: 'C#',
    question: 'Ce înseamnă AI-assisted development într-un rol ca la Trimble?',
    correct_answer: 'Folosirea deliberată a AI pentru accelerare, calitate și învățare, cu validare umană strictă.',
    wrong_answers: [
      'Delegi AI-ului toate deciziile arhitecturale.',
      'E doar autocomplete fără impact real.',
      'Înlocuiește pairing, review și testare.'
    ],
    difficulty: 'easy',
    explanation: 'Accent pe productivitate + responsabilitate tehnică.',
    conceptTitle: '14. AI-Assisted • Fundamentals'
  },
  {
    type: 'C#',
    question: 'Ce rol are human-in-the-loop când folosești AI pentru cod?',
    correct_answer: 'Inginerul validează, adaptează și își asumă ownership-ul rezultatului final.',
    wrong_answers: [
      'AI-ul aprobă singur codul final.',
      'Code review devine inutil.',
      'Testele nu mai sunt necesare dacă AI a generat codul.'
    ],
    difficulty: 'medium',
    explanation: 'AI asistă, dar responsabilitatea rămâne umană.',
    conceptTitle: '14. AI-Assisted • Human-in-the-loop'
  },
  {
    type: 'C#',
    question: 'Care este un risc major de securitate în AI-assisted coding?',
    correct_answer: 'Expunerea accidentală de secrete/date sensibile în prompt-uri sau acceptarea codului nesecurizat generat.',
    wrong_answers: [
      'AI elimină complet riscul de vulnerabilități.',
      'Singurul risc este consumul de baterie la laptop.',
      'Risc există doar la modele open-source locale.'
    ],
    difficulty: 'hard',
    explanation: 'Prompt hygiene + security review rămân obligatorii.',
    conceptTitle: '14. AI-Assisted • Security concerns'
  },
  {
    type: 'C#',
    question: 'Cum verifici output-ul AI înainte de merge?',
    correct_answer: 'Revizuiești logică, rulezi teste, validezi edge cases și conformitatea cu standardele echipei.',
    wrong_answers: [
      'Dacă compilează, îl mergi direct.',
      'Îl accepți dacă arată „curat”.',
      'Îl validezi doar dacă depășește 500 linii.'
    ],
    difficulty: 'medium',
    explanation: 'Verification of AI output e competență centrală în JD-ul tău.',
    conceptTitle: '14. AI-Assisted • Verification'
  },

  {
    type: 'POO',
    question: 'Cum demonstrezi ownership într-o echipă software?',
    correct_answer: 'Îți asumi problema cap-coadă, comunici proactiv riscuri și împingi soluția până la rezolvare.',
    wrong_answers: [
      'Aștepți mereu task-uri complet detaliate.',
      'Escaladezi orice blocaj fără încercări proprii.',
      'Închizi task-ul când codul compilează local.'
    ],
    difficulty: 'medium',
    explanation: 'Exact comportamentul cerut explicit în descrierea rolului.',
    conceptTitle: '15. Soft Skills • Ownership'
  },
  {
    type: 'POO',
    question: 'În feedback tehnic, abordarea sănătoasă este?',
    correct_answer: 'Clar, specific, orientat pe cod și impact, nu pe persoană.',
    wrong_answers: [
      'Feedback-ul dur accelerează cel mai bine livrarea.',
      'E mai bine să eviți orice feedback negativ.',
      'Doar seniorii ar trebui să dea feedback.'
    ],
    difficulty: 'easy',
    explanation: 'Colaborarea bună crește calitatea și viteza echipei.',
    conceptTitle: '15. Soft Skills • Feedback'
  },
  {
    type: 'POO',
    question: 'Cum prioritizezi corect sub presiune?',
    correct_answer: 'Evaluezi impact + urgență, comunici trade-off-uri și confirmi explicit ordinea cu stakeholderii.',
    wrong_answers: [
      'Lucrezi simultan la tot ce pare urgent.',
      'Alegi mereu task-ul cel mai simplu.',
      'Eviți să comunici blocajele pentru a nu crea panică.'
    ],
    difficulty: 'medium',
    explanation: 'Prioritizarea clară reduce context switching și întârzierile.',
    conceptTitle: '15. Soft Skills • Prioritization'
  },

  {
    type: 'POO',
    question: 'Trade-offs în arhitectură înseamnă?',
    correct_answer: 'Alegerea conștientă între avantaje și costuri, în funcție de contextul produsului.',
    wrong_answers: [
      'Există întotdeauna o soluție perfectă universală.',
      'Trade-off înseamnă compromis pe calitate indiferent de context.',
      'Poți evita complet trade-off-urile folosind design patterns.'
    ],
    difficulty: 'medium',
    explanation: 'Interviurile senior caută raționament contextual, nu răspunsuri absolute.',
    conceptTitle: '16. Meta • Trade-offs'
  },
  {
    type: 'POO',
    question: 'Cum eviți over-engineering-ul?',
    correct_answer: 'Rezolvi problema reală de azi simplu și extensibil, nu scenarii speculative fără dovadă.',
    wrong_answers: [
      'Adaugi straturi extra „pentru orice eventualitate”.',
      'Aplici toate pattern-urile cunoscute în fiecare feature.',
      'Rescrii periodic tot modulul ca prevenție.'
    ],
    difficulty: 'medium',
    explanation: 'Simplicity + maintainability câștigă pe termen lung.',
    conceptTitle: '16. Meta • Simplicity vs Over-engineering'
  },
  {
    type: 'POO',
    question: 'Ce este technical debt util de înțeles la interviu?',
    correct_answer: 'Compromis tehnic acceptat pe termen scurt, cu cost de întreținere viitor care trebuie gestionat explicit.',
    wrong_answers: [
      'Orice cod vechi este automat technical debt.',
      'Technical debt trebuie eliminat imediat în orice context.',
      'Este doar un termen folosit de management, fără impact real.'
    ],
    difficulty: 'medium',
    explanation: 'Cheia este când și cum îl plătești, nu eliminare oarbă.',
    conceptTitle: '16. Meta • Technical debt'
  },
  {
    type: 'C#',
    question: 'Cum explici impactul concret al GitHub Copilot / CodeWhisperer într-o echipă enterprise?',
    correct_answer: 'Accelerăm boilerplate și explorarea soluțiilor, dar păstrăm review, teste și ownership uman pentru calitate.',
    wrong_answers: [
      'Elimină nevoia de code review și testare manuală.',
      'Este util doar pentru juniori, nu pentru echipe mature.',
      'Produce cod final perfect fără verificare.'
    ],
    difficulty: 'medium',
    explanation: 'Interviul caută impact măsurabil + utilizare responsabilă, nu hype.',
    conceptTitle: '14. AI-Assisted • Copilot & CodeWhisperer'
  },
  {
    type: 'POO',
    question: 'Când folosești NotebookLM/Claude/OpenAI în workflow-ul tehnic?',
    correct_answer: 'Pentru clarificare cerințe, sumarizare documentație și comparație de opțiuni înainte de implementare efectivă.',
    wrong_answers: [
      'Doar după deployment, pentru postmortem.',
      'Doar pentru generat cod de producție fără context.',
      'Nu au rol în analiză, doar în UI design.'
    ],
    difficulty: 'easy',
    explanation: 'Aceste unelte cresc viteza de înțelegere, dar decizia tehnică rămâne la echipă.',
    conceptTitle: '14. AI-Assisted • Research copilots'
  },
  {
    type: 'C#',
    question: 'Ce înseamnă să „own the life cycle” într-un rol de Software Engineer?',
    correct_answer: 'Participi cap-coadă: requirements analysis, design, implementare, testare, deployment și tuning în producție.',
    wrong_answers: [
      'Scrii doar cod și predai restul către alte echipe.',
      'Te ocupi exclusiv de bugfixing după lansare.',
      'Faza de requirements este doar responsabilitatea PM.'
    ],
    difficulty: 'medium',
    explanation: 'Exact acest ownership end-to-end este evidențiat în JD.',
    conceptTitle: '16. Meta • End-to-end ownership'
  },
  {
    type: 'POO',
    question: 'Cum colaborezi eficient cu PM/QA/engineering pentru un release bun?',
    correct_answer: 'Aliniezi scopul și acceptanța devreme, menții feedback continuu și tratezi testarea/deploy-ul ca parte a aceluiași flux.',
    wrong_answers: [
      'PM definește, dev implementează, QA validează separat fără sincronizare.',
      'Comunicarea cross-team este opțională dacă există Jira tickets.',
      'Calitatea finală depinde doar de testele automate din CI.'
    ],
    difficulty: 'medium',
    explanation: 'Jobul cere colaborare inter-disciplinară orientată pe impact.',
    conceptTitle: '15. Soft Skills • Cross-team delivery'
  },
  {
    type: 'POO',
    question: 'Ce transmite afirmația „driven to build exceptional software that solves real-world problems”?',
    correct_answer: 'Focalizare pe impact real pentru utilizator, calitate tehnică ridicată și ownership pe rezultat end-to-end.',
    wrong_answers: [
      'Accent doar pe viteza de scriere a codului.',
      'Prioritate pentru tehnologii noi, indiferent de valoare.',
      'Succesul se măsoară doar în linii de cod livrate.'
    ],
    difficulty: 'easy',
    explanation: 'Aceasta e exact direcția culturală evidențiată în job description.',
    conceptTitle: '16. Meta • Trimble mindset'
  },
  {
    type: 'POO',
    question: 'Cum interpretezi corect cerința de minimum 3 ani experiență enterprise?',
    correct_answer: 'Ai livrat constant aplicații enterprise în producție și poți demonstra ownership pe probleme reale, nu doar task-uri izolate.',
    wrong_answers: [
      'Orice 3 ani de coding hobby sunt automat echivalenți.',
      'Este suficient să fi lucrat doar pe proiecte academice fără release-uri reale.',
      'Experiența se măsoară doar în numărul de limbaje cunoscute.'
    ],
    difficulty: 'easy',
    explanation: 'Cerința vizează experiență aplicată în livrare, colaborare și mentenanță de sisteme reale.',
    conceptTitle: '16. Meta • Experience baseline'
  },
  {
    type: 'POO',
    question: 'De ce mențiunea „Bachelor’s degree in CS/SE or related field” este relevantă într-un JD tehnic?',
    correct_answer: 'Semnalizează bază solidă de fundamentals; poate fi completată de experiență practică demonstrabilă și rezultate reale.',
    wrong_answers: [
      'Înseamnă că experiența practică nu mai contează.',
      'Este doar un detaliu administrativ fără impact pe rol.',
      'Elimină nevoia de învățare continuă după angajare.'
    ],
    difficulty: 'medium',
    explanation: 'Interviul evaluează atât fundamentele, cât și capacitatea de execuție în contexte reale.',
    conceptTitle: '16. Meta • Education baseline'
  },
  {
    type: 'POO',
    question: 'Cum valorifici avantajul „experience in construction industry” dacă îl ai?',
    correct_answer: 'Conectezi deciziile tehnice la fluxuri reale din domeniu: calitatea datelor din teren, integrare sisteme și impact operațional.',
    wrong_answers: [
      'Îl menționezi generic fără exemple concrete.',
      'Îl folosești doar pentru a evita standardele enterprise generale.',
      'Nu are relevanță dacă stăpânești framework-ul tehnic.'
    ],
    difficulty: 'medium',
    explanation: 'Domain context poate accelera livrarea de valoare și reduce risc de decizii tehnice nealiniate cu realitatea produsului.',
    conceptTitle: '16. Meta • Construction domain advantage'
  }
];

type TermCard = {
  type: QuestionSeed['type'];
  difficulty: QuestionSeed['difficulty'];
  conceptTitle: string;
  bucket: string;
  clue: string;
  answer: string;
};

const TERM_CARDS: TermCard[] = [
  { type: 'C#', difficulty: 'easy', conceptTitle: '1. Fundamente • Syntax errors', bucket: 'fundamente', clue: 'Ce tip de eroare apare când codul nu respectă regulile de sintaxă ale limbajului?', answer: 'Syntax errors' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '1. Fundamente • Exception vs Error', bucket: 'fundamente', clue: 'Ce concept descrie condiții tratabile de runtime prin try/catch în C#?', answer: 'Exception' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '1. Fundamente • Call stack', bucket: 'fundamente', clue: 'Ce structură arată lanțul de apeluri al metodelor în momentul unei erori?', answer: 'Call stack' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '1. Fundamente • Checked vs unchecked', bucket: 'fundamente', clue: 'Ce concept diferențiază excepțiile verificate conceptual de cele neverificate?', answer: 'Checked vs unchecked errors (conceptual)' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '1. Fundamente • Watch variables', bucket: 'fundamente', clue: 'Ce tehnică din debugger îți permite să urmărești valori în timp real?', answer: 'Watch / Inspect variables' },

  { type: 'POO', difficulty: 'easy', conceptTitle: '2. OOP • Encapsulation', bucket: 'oop', clue: 'Ce principiu OOP ascunde starea internă și expune doar operații controlate?', answer: 'Encapsulation' },
  { type: 'POO', difficulty: 'easy', conceptTitle: '2. OOP • Abstraction', bucket: 'oop', clue: 'Ce principiu OOP expune „ce face” un obiect și ascunde detaliile „cum”?', answer: 'Abstraction' },
  { type: 'POO', difficulty: 'easy', conceptTitle: '2. OOP • Constructor', bucket: 'oop', clue: 'Ce element al clasei inițializează obiectul la creare?', answer: 'Constructor' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '2. OOP • Destructor', bucket: 'oop', clue: 'Ce concept OOP este legat de cleanup la distrugerea obiectelor (conceptual)?', answer: 'Destructor (conceptual)' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '2. OOP • Contract', bucket: 'oop', clue: 'Cum numești obligațiile comportamentale asumate de o interfață?', answer: 'Contract' },

  { type: 'POO', difficulty: 'easy', conceptTitle: '3. SOLID • SRP', bucket: 'solid', clue: 'Ce principiu spune că o clasă trebuie să aibă un singur motiv de schimbare?', answer: 'Single Responsibility Principle (SRP)' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '3. SOLID • OCP', bucket: 'solid', clue: 'Ce principiu recomandă extensie fără modificarea codului stabil?', answer: 'Open / Closed Principle (OCP)' },
  { type: 'POO', difficulty: 'hard', conceptTitle: '3. SOLID • LSP', bucket: 'solid', clue: 'Ce principiu cere ca subtipurile să poată înlocui tipul de bază fără surprize?', answer: 'Liskov Substitution Principle (LSP)' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '3. SOLID • ISP', bucket: 'solid', clue: 'Ce principiu recomandă interfețe mici și specifice?', answer: 'Interface Segregation Principle (ISP)' },
  { type: 'POO', difficulty: 'hard', conceptTitle: '3. SOLID • DIP', bucket: 'solid', clue: 'Ce principiu spune că depinzi de abstracții, nu de implementări concrete?', answer: 'Dependency Inversion Principle (DIP)' },

  { type: 'POO', difficulty: 'medium', conceptTitle: '4. Patterns • Repository', bucket: 'patterns', clue: 'Ce pattern abstractizează accesul la date într-o interfață de colecție?', answer: 'Repository' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '4. Patterns • Builder', bucket: 'patterns', clue: 'Ce pattern construiește obiecte complexe pas cu pas?', answer: 'Builder' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '4. Patterns • Adapter', bucket: 'patterns', clue: 'Ce pattern face compatibile două interfețe incompatibile?', answer: 'Adapter' },
  { type: 'POO', difficulty: 'hard', conceptTitle: '4. Patterns • Decorator', bucket: 'patterns', clue: 'Ce pattern adaugă comportament fără a modifica clasa originală?', answer: 'Decorator' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '4. Patterns • DI pattern', bucket: 'patterns', clue: 'Ce pattern livrează dependențe din exterior în loc de new intern?', answer: 'Dependency Injection pattern' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '5. Testare • End-to-end', bucket: 'testing', clue: 'Ce tip de test validează fluxul complet user-to-system?', answer: 'End-to-end testing' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '5. Testare • White-box', bucket: 'testing', clue: 'Ce metodă de testare implică înțelegerea codului intern?', answer: 'White-box testing' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '5. Testare • Black-box', bucket: 'testing', clue: 'Ce metodă de testare verifică comportamentul fără acces la implementare?', answer: 'Black-box testing' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '5. Testare • Regression', bucket: 'testing', clue: 'Ce tip de testare verifică dacă schimbările noi nu strică funcționalități existente?', answer: 'Regression testing' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '5. Testare • Test isolation', bucket: 'testing', clue: 'Ce practică asigură că testele rulează independent unele de altele?', answer: 'Test isolation' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '6. HTTP • Protocol', bucket: 'http', clue: 'Ce protocol standard stă la baza comunicării web request/response?', answer: 'HTTP protocol' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '6. HTTP • Headers', bucket: 'http', clue: 'Ce parte a request-ului transportă metadate precum Content-Type și Authorization?', answer: 'Headers' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '6. HTTP • Body', bucket: 'http', clue: 'Ce parte a request-ului conține payload-ul principal trimis către server?', answer: 'Body' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '6. HTTP • DELETE', bucket: 'http', clue: 'Ce metodă HTTP este folosită pentru ștergerea unei resurse?', answer: 'DELETE' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '6. HTTP • REST', bucket: 'http', clue: 'Ce set de principii definește APIs stateless orientate pe resurse?', answer: 'REST principles' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '6. Angular • Components', bucket: 'frontend', clue: 'Ce unitate principală de UI în Angular combină template, logică și stil?', answer: 'Component' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '6. Angular • Reactive Forms', bucket: 'frontend', clue: 'Ce abordare Angular oferă control programatic puternic pentru validări complexe?', answer: 'Reactive Forms' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '6. Angular • Interceptors', bucket: 'frontend', clue: 'Ce mecanism Angular permite aplicarea logicii cross-cutting pe HTTP requests?', answer: 'HTTP Interceptor' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '6. Angular • OnPush', bucket: 'frontend', clue: 'Ce strategie Angular reduce rerendering-ul inutil prin change detection mai strict?', answer: 'OnPush change detection' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '6. Angular • State', bucket: 'frontend', clue: 'Ce set de opțiuni acoperă state management modern în Angular enterprise?', answer: 'Signals / NgRx (context-based choice)' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '7. Backend • Endpoint', bucket: 'backend', clue: 'Cum numești o rută expusă de API pentru o operație specifică?', answer: 'Endpoint' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '7. Backend • Routing', bucket: 'backend', clue: 'Ce mecanism mapează URL-uri către controllere/acțiuni?', answer: 'Routing' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '7. Backend • Service layer', bucket: 'backend', clue: 'Ce strat conține logica de business dintre controller și repository?', answer: 'Service layer' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '7. Backend • Repository layer', bucket: 'backend', clue: 'Ce strat centralizează accesul la persistență?', answer: 'Repository layer' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '7. Backend • Environment', bucket: 'backend', clue: 'Cum numești separarea configurărilor Dev/Test/Prod?', answer: 'Environment (Dev / Test / Prod)' },

  { type: 'C#', difficulty: 'medium', conceptTitle: '8. SQL • Normalization', bucket: 'sql', clue: 'Ce practică reduce redundanța și anomaliile în schema relațională?', answer: 'Normalization' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '8. SQL • Denormalization', bucket: 'sql', clue: 'Ce practică adaugă redundanță controlată pentru performanță de citire?', answer: 'Denormalization' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '8. SQL • Transactions', bucket: 'sql', clue: 'Ce mecanism grupează operații care trebuie executate atomic?', answer: 'Transactions' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '8. SQL • Index', bucket: 'sql', clue: 'Ce structură accelerează căutările pe coloane frecvent filtrate?', answer: 'Index' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '8. SQL • CRUD', bucket: 'sql', clue: 'Ce grup de comenzi SQL include SELECT, INSERT, UPDATE și DELETE?', answer: 'Basic SQL queries (SELECT, INSERT, UPDATE, DELETE)' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '9. NoSQL • Document database', bucket: 'nosql', clue: 'Ce tip de bază de date stochează date ca documente JSON/BSON?', answer: 'Document database' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '9. NoSQL • Collection', bucket: 'nosql', clue: 'Cum se numește grupul de documente într-o bază NoSQL de tip MongoDB?', answer: 'Collection' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '9. NoSQL • Document', bucket: 'nosql', clue: 'Cum se numește unitatea individuală de stocare într-un document database?', answer: 'Document' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '9. NoSQL • Trade-offs', bucket: 'nosql', clue: 'Ce concept compară avantaje și dezavantaje între SQL și NoSQL?', answer: 'SQL vs NoSQL trade-offs' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '9. NoSQL • Eventual consistency', bucket: 'nosql', clue: 'Ce model acceptă consistență în timp, nu imediat pe toate nodurile?', answer: 'Eventual consistency (conceptual)' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '10. Async • Blocking', bucket: 'async', clue: 'Ce model oprește thread-ul până la finalizarea operației?', answer: 'Blocking' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '10. Async • Non-blocking', bucket: 'async', clue: 'Ce model permite progresul fără a aștepta finalizarea I/O pe același thread?', answer: 'Non-blocking' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '10. Async • async/await', bucket: 'async', clue: 'Ce mecanism C# simplifică programarea asincronă fără callback hell?', answer: 'async / await' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '10. Async • Deadlocks', bucket: 'async', clue: 'Ce problemă apare când două fluxuri se așteaptă reciproc la infinit?', answer: 'Deadlocks (conceptual)' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '10. Async • Thread safety', bucket: 'async', clue: 'Ce proprietate garantează comportament corect la acces concurent pe date partajate?', answer: 'Thread safety (conceptual)' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '11. Algoritmi • Arrays', bucket: 'algo', clue: 'Ce structură oferă acces direct prin index pe elemente contigue?', answer: 'Arrays' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '11. Algoritmi • Lists', bucket: 'algo', clue: 'Ce structură dinamică este folosită frecvent pentru colecții redimensionabile?', answer: 'Lists' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '11. Algoritmi • Conditionals', bucket: 'algo', clue: 'Ce construct controlează fluxul pe baza unor condiții booleene?', answer: 'Conditionals' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '11. Algoritmi • Searching', bucket: 'algo', clue: 'Ce categorie de tehnici este folosită pentru găsirea unui element într-o colecție?', answer: 'Searching (conceptual)' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '11. Algoritmi • Input validation', bucket: 'algo', clue: 'Ce practică previne comportamente invalide prin verificarea datelor la intrare?', answer: 'Input validation' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '12. DevOps • Commit', bucket: 'devops', clue: 'Cum numești snapshot-ul versionat al schimbărilor în Git?', answer: 'Commit' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '12. DevOps • Branch', bucket: 'devops', clue: 'Cum se numește linia separată de dezvoltare în Git?', answer: 'Branch' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '12. DevOps • Pull Request', bucket: 'devops', clue: 'Ce mecanism formalizează review-ul înainte de integrarea codului?', answer: 'Pull Request' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '12. DevOps • Pipeline', bucket: 'devops', clue: 'Cum numești succesiunea automată build-test-deploy?', answer: 'Pipeline' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '12. DevOps • Deployment', bucket: 'devops', clue: 'Ce etapă publică artefactul într-un mediu țintă?', answer: 'Deployment' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '13. Cloud • Cloud computing', bucket: 'cloud', clue: 'Ce model oferă resurse IT la cerere prin internet?', answer: 'Cloud computing' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '13. Cloud • Hosting', bucket: 'cloud', clue: 'Cum se numește serviciul prin care aplicația este rulată pe infrastructură remote?', answer: 'Hosting' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '13. Cloud • Availability', bucket: 'cloud', clue: 'Ce metric exprimă disponibilitatea serviciului în timp?', answer: 'Availability' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '13. Cloud • Configuration vs code', bucket: 'cloud', clue: 'Ce principiu separă setările de runtime de logica implementată?', answer: 'Configuration vs code' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '13. Cloud • Secrets', bucket: 'cloud', clue: 'Cum numești gestionarea sigură a cheilor, token-urilor și parolelor?', answer: 'Secrets management (conceptual)' },

  { type: 'C#', difficulty: 'easy', conceptTitle: '14. AI • Code generation', bucket: 'ai', clue: 'Ce practică folosește AI pentru a produce cod pornind de la prompt?', answer: 'Code generation' },
  { type: 'C#', difficulty: 'easy', conceptTitle: '14. AI • Boilerplate', bucket: 'ai', clue: 'Ce practică accelerează crearea codului repetitiv cu AI?', answer: 'Boilerplate generation' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '14. AI • Refactoring', bucket: 'ai', clue: 'Cum numești îmbunătățirea structurii codului cu ajutorul AI, fără schimbarea comportamentului?', answer: 'Refactoring with AI' },
  { type: 'C#', difficulty: 'medium', conceptTitle: '14. AI • Documentation', bucket: 'ai', clue: 'Ce utilizare AI produce explicații, comentarii și sumarizări tehnice?', answer: 'AI for documentation' },
  { type: 'C#', difficulty: 'hard', conceptTitle: '14. AI • Code ownership', bucket: 'ai', clue: 'Ce concept subliniază că responsabilitatea finală a codului rămâne la inginer?', answer: 'Code ownership' },

  { type: 'POO', difficulty: 'easy', conceptTitle: '15. Soft • Communication', bucket: 'soft', clue: 'Ce competență permite explicarea clară a deciziilor tehnice către audiențe diverse?', answer: 'Communication' },
  { type: 'POO', difficulty: 'easy', conceptTitle: '15. Soft • Asking questions', bucket: 'soft', clue: 'Ce practică ajută la clarificarea rapidă a cerințelor ambigue?', answer: 'Asking questions' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '15. Soft • Accountability', bucket: 'soft', clue: 'Ce trăsătură înseamnă asumarea consecințelor și livrabilelor?', answer: 'Accountability' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '15. Soft • Handling failure', bucket: 'soft', clue: 'Ce abilitate descrie reacția matură la erori și incidente?', answer: 'Handling failure' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '15. Soft • Time management', bucket: 'soft', clue: 'Ce abilitate optimizează planificarea și execuția task-urilor?', answer: 'Time management' },

  { type: 'POO', difficulty: 'medium', conceptTitle: '16. Meta • Maintainability', bucket: 'meta', clue: 'Ce caracteristică face codul ușor de înțeles, modificat și extins?', answer: 'Maintainability' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '16. Meta • Scalability', bucket: 'meta', clue: 'Ce proprietate permite sistemului să suporte creștere de trafic și volum?', answer: 'Scalability' },
  { type: 'POO', difficulty: 'medium', conceptTitle: '16. Meta • Refactoring', bucket: 'meta', clue: 'Ce practică îmbunătățește structura internă fără schimbare de comportament extern?', answer: 'Refactoring' },
  { type: 'POO', difficulty: 'easy', conceptTitle: '16. Meta • Clean code', bucket: 'meta', clue: 'Ce concept promovează lizibilitate, claritate și intenție explicită în cod?', answer: 'Clean code' },
  { type: 'POO', difficulty: 'easy', conceptTitle: '16. Meta • Thinking out loud', bucket: 'meta', clue: 'Ce tehnică de interviu evidențiază procesul de gândire și decizie?', answer: 'Thinking out loud' },
];

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))];
}

function buildFlashcardQuestions(): QuestionSeed[] {
  return TERM_CARDS.map((card) => {
    const sameBucketPool = TERM_CARDS.filter((item) => item.bucket === card.bucket && item.answer !== card.answer).map(
      (item) => item.answer,
    );
    const fallbackPool = TERM_CARDS.filter((item) => item.answer !== card.answer).map((item) => item.answer);
    const wrongAnswers = uniqueValues([...sameBucketPool, ...fallbackPool]).slice(0, 3);

    return {
      type: card.type,
      question: `Ce concept se potrivește descrierii: ${card.clue}`,
      correct_answer: card.answer,
      wrong_answers: wrongAnswers,
      difficulty: card.difficulty,
      explanation: `Răspuns corect: ${card.answer}. Leagă-l de ${card.conceptTitle} în recapitularea pentru interviu.`,
      conceptTitle: card.conceptTitle,
    };
  });
}

function buildSeedQuestions(): QuestionSeed[] {
  return [...INTERVIEW_QUESTIONS, ...buildFlashcardQuestions()];
}

export const QUESTION_BANK: Question[] = buildSeedQuestions().map((seed, index) => ({
  ...seed,
  id: `qb-${index + 1}`,
  created_at: new Date(Date.now() - index * 1000).toISOString(),
}));
