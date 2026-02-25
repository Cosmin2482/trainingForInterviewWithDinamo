import React from 'react';
import { motion } from 'motion/react';

interface TacticalBoardProps {
  type: string;
}

const pulse = {
  animate: { scale: [1, 1.06, 1] },
  transition: { duration: 1.4, repeat: Infinity },
};

const tile =
  'rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white';

function GenericBoard({
  title,
  subtitle,
  chips,
  tone = 'from-neutral-800 via-neutral-700 to-neutral-800',
}: {
  title: string;
  subtitle: string;
  chips: string[];
  tone?: string;
}) {
  return (
    <div className={`w-full h-52 rounded-xl bg-gradient-to-br ${tone} border border-white/20 p-4 overflow-hidden`}>
      <div className="text-white">
        <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">Schiță Dinamo</p>
        <h4 className="text-sm md:text-base font-black leading-tight">{title}</h4>
        <p className="text-[11px] opacity-80">{subtitle}</p>
      </div>

      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
        {chips.map((chip, index) => (
          <motion.div
            key={chip}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index }}
            className={tile}
          >
            {chip}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TimelineBoard({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="w-full h-52 rounded-xl bg-neutral-900 border border-neutral-700 p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <p className="text-white text-xs font-black uppercase tracking-[0.18em]">Flux Executie</p>
      </div>
      <div className="relative">
        <div className="absolute left-2 top-1 bottom-1 w-px bg-neutral-600" />
        <div className="space-y-2">
          {steps.map((step, idx) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.14 }}
              className="flex items-center gap-3"
            >
              <motion.div
                {...pulse}
                transition={{ duration: 1.4, repeat: Infinity, delay: idx * 0.2 }}
                className={`w-4 h-4 rounded-full ${color} border border-white/20 flex-shrink-0`}
              />
              <div className="rounded-md bg-neutral-800 border border-neutral-700 text-neutral-200 text-[11px] px-2 py-1 font-semibold uppercase tracking-wide">
                {step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LayeredSchemaBoard({
  title,
  layers,
  tone = 'from-slate-900 via-slate-800 to-slate-900',
}: {
  title: string;
  layers: string[];
  tone?: string;
}) {
  return (
    <div className={`w-full h-52 rounded-xl bg-gradient-to-br ${tone} border border-white/20 p-3 overflow-hidden`}>
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">{title}</p>
      <div className="relative h-[calc(100%-22px)]">
        {layers.map((layer, index) => {
          const top = 8 + index * 38;
          return (
            <React.Fragment key={layer}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="absolute left-3 right-3 rounded-md border border-white/30 bg-white/10 text-white text-[11px] font-bold px-3 py-2"
                style={{ top }}
              >
                {layer}
              </motion.div>
              {index < layers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.35, 0.8, 0.35] }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: index * 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 text-white/80 text-sm"
                  style={{ top: top + 28 }}
                >
                  ↓
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function JoinVennBoard() {
  return (
    <div className="w-full h-52 rounded-xl bg-neutral-900 border border-neutral-700 p-3 overflow-hidden relative">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">JOIN Schema (SQL)</p>
      <div className="relative h-[calc(100%-22px)]">
        <motion.div
          animate={{ x: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute w-24 h-24 rounded-full bg-cyan-500/45 border border-cyan-300 left-[26%] top-[26%]"
        />
        <motion.div
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute w-24 h-24 rounded-full bg-emerald-500/45 border border-emerald-300 left-[44%] top-[26%]"
        />
        <div className="absolute left-[30%] top-[18%] text-[10px] font-black text-cyan-200 uppercase">Users</div>
        <div className="absolute left-[54%] top-[18%] text-[10px] font-black text-emerald-200 uppercase">Orders</div>
        <div className="absolute left-[46%] top-[42%] text-[10px] font-black text-white uppercase">Inner</div>
        <div className="absolute left-[16%] bottom-[8%] text-[10px] font-bold text-cyan-200">LEFT = tot Users + match</div>
        <div className="absolute right-[8%] bottom-[8%] text-[10px] font-bold text-emerald-200 text-right">RIGHT = tot Orders + match</div>
      </div>
    </div>
  );
}

function CloudStackBoard() {
  return (
    <div className="w-full h-52 rounded-xl bg-gradient-to-br from-sky-900 via-blue-800 to-sky-900 border border-white/20 p-3 overflow-hidden">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">Cloud Service Models</p>
      <div className="relative h-[calc(100%-22px)]">
        <div className="absolute inset-x-4 bottom-1 h-8 rounded-md bg-slate-900/70 border border-white/20 text-[11px] text-white font-bold flex items-center justify-center">
          IaaS — VM/Network/Storage control
        </div>
        <div className="absolute inset-x-8 bottom-11 h-8 rounded-md bg-blue-700/70 border border-white/20 text-[11px] text-white font-bold flex items-center justify-center">
          PaaS — focus pe cod, nu pe server ops
        </div>
        <div className="absolute inset-x-12 bottom-[84px] h-8 rounded-md bg-cyan-600/75 border border-white/20 text-[11px] text-white font-bold flex items-center justify-center">
          SaaS — consumi produsul final
        </div>
        <div className="absolute right-3 top-2 text-[10px] text-white/90 font-bold uppercase">Dinamo scale mode ⚽</div>
      </div>
    </div>
  );
}

function LoopBoard({ title, nodes }: { title: string; nodes: string[] }) {
  return (
    <div className="w-full h-52 rounded-xl bg-neutral-900 border border-neutral-700 p-3 overflow-hidden">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">{title}</p>
      <div className="relative h-[calc(100%-22px)]">
        {nodes.map((node, index) => {
          const angle = (index / nodes.length) * Math.PI * 2;
          const left = 50 + Math.cos(angle) * 28;
          const top = 50 + Math.sin(angle) * 28;

          return (
            <motion.div
              key={node}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.04, 1] }}
              transition={{ delay: index * 0.08, duration: 1.8, repeat: Infinity }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/20 bg-white/10 text-white text-[10px] font-bold px-2 py-1"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {node}
            </motion.div>
          );
        })}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 text-lg"
        >
          ↻
        </motion.div>
      </div>
    </div>
  );
}

function AngularBoard({ advanced = false }: { advanced?: boolean }) {
  return (
    <div className="w-full h-52 rounded-xl bg-gradient-to-br from-red-900 via-rose-800 to-red-900 border border-white/20 p-3 overflow-hidden">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">
        {advanced ? 'Angular Advanced Match Plan' : 'Angular Team Formation'}
      </p>
      <div className="relative h-[calc(100%-22px)]">
        <div className="absolute left-3 right-3 top-2 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-bold text-white uppercase">
          App Shell + Routing Guards
        </div>
        <div className="absolute left-3 w-[45%] top-14 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-bold text-white uppercase">
          Components (UI)
        </div>
        <div className="absolute right-3 w-[45%] top-14 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-bold text-white uppercase">
          Services (Logic)
        </div>
        <div className="absolute left-3 right-3 top-26 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-bold text-white uppercase">
          State + RxJS Streams
        </div>
        <div className="absolute left-3 right-3 bottom-2 rounded-md border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-bold text-white uppercase">
          API + DTO Contracts
        </div>

        <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.7 }} className="absolute left-1/2 -translate-x-1/2 top-9 text-white/80 text-xs">↓</motion.div>
        <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.7, delay: 0.2 }} className="absolute left-[27%] top-20 text-white/80 text-xs">↓</motion.div>
        <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.7, delay: 0.35 }} className="absolute right-[27%] top-20 text-white/80 text-xs">↓</motion.div>
        <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.7, delay: 0.5 }} className="absolute left-1/2 -translate-x-1/2 top-32 text-white/80 text-xs">↓</motion.div>
        {advanced && (
          <div className="absolute right-2 top-1 text-[9px] font-black uppercase text-amber-200 bg-black/30 border border-white/20 rounded px-1.5 py-0.5">
            OnPush + Perf
          </div>
        )}
      </div>
    </div>
  );
}

function KafkaFlowBoard() {
  return (
    <div className="w-full h-52 rounded-xl bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900 border border-white/20 p-3 overflow-hidden">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">Event-Driven (Kafka) Match Radio</p>
      <div className="relative h-[calc(100%-22px)]">
        <div className="absolute left-2 top-12 w-[28%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">API Producer</div>
        <div className="absolute left-[36%] top-6 w-[28%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Kafka Topic</div>
        <div className="absolute right-2 top-12 w-[28%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Consumer Service</div>
        <div className="absolute left-[36%] bottom-4 w-[28%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Offsets / Replay</div>

        <motion.div animate={{ x: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }} className="absolute left-[31%] top-14 text-white">→</motion.div>
        <motion.div animate={{ x: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.3 }} className="absolute left-[65%] top-14 text-white">→</motion.div>
        <motion.div animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }} className="absolute left-1/2 -translate-x-1/2 top-16 text-white">↓</motion.div>
      </div>
    </div>
  );
}

function DevOpsToolchainBoard() {
  return (
    <div className="w-full h-52 rounded-xl bg-gradient-to-br from-amber-900 via-orange-800 to-amber-900 border border-white/20 p-3 overflow-hidden">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">Toolchain Delivery Line</p>
      <div className="relative h-[calc(100%-22px)]">
        {['Bitbucket/GitHub', 'Bamboo CI', 'Spinnaker CD', 'Jira Tracking'].map((item, idx) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="absolute rounded-md border border-white/25 bg-white/10 text-white text-[10px] font-bold uppercase px-2 py-1"
            style={{ left: `${6 + idx * 23}%`, top: `${idx % 2 === 0 ? 18 : 50}%` }}
          >
            {item}
          </motion.div>
        ))}
        <motion.div animate={{ x: [0, 78, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.8 }} className="absolute left-8 bottom-3 text-white">⚽➡</motion.div>
      </div>
    </div>
  );
}

function MCPBoard() {
  return (
    <div className="w-full h-52 rounded-xl bg-gradient-to-br from-fuchsia-900 via-purple-800 to-fuchsia-900 border border-white/20 p-3 overflow-hidden">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">MCP + Agentic Workflow</p>
      <div className="relative h-[calc(100%-22px)]">
        <div className="absolute left-2 top-8 w-[30%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Developer Prompt</div>
        <div className="absolute left-[35%] top-2 w-[30%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">MCP Context Hub</div>
        <div className="absolute right-2 top-8 w-[30%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Agents/Tools</div>
        <div className="absolute left-[35%] bottom-6 w-[30%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Human Verification</div>

        <motion.div animate={{ x: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }} className="absolute left-[31%] top-10 text-white">→</motion.div>
        <motion.div animate={{ x: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="absolute left-[67%] top-10 text-white">→</motion.div>
        <motion.div animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="absolute left-1/2 -translate-x-1/2 top-16 text-white">↓</motion.div>
      </div>
    </div>
  );
}

function ConstructionImpactBoard() {
  return (
    <div className="w-full h-52 rounded-xl bg-gradient-to-br from-slate-900 via-stone-800 to-slate-900 border border-white/20 p-3 overflow-hidden">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/90 mb-2">Construction Domain Impact</p>
      <div className="relative h-[calc(100%-22px)]">
        <div className="absolute left-2 top-6 w-[30%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Site Data</div>
        <div className="absolute left-[35%] top-6 w-[30%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">API + Rules</div>
        <div className="absolute right-2 top-6 w-[30%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1">Field UI</div>
        <div className="absolute left-[20%] bottom-8 w-[60%] rounded-md bg-white/10 border border-white/25 text-white text-[10px] font-bold uppercase px-2 py-1 text-center">Fewer errors • Faster decisions • Real-world value</div>
        <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute left-[30%] top-10 text-white">→</motion.div>
        <motion.div animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }} className="absolute left-[66%] top-10 text-white">→</motion.div>
        <motion.div animate={{ y: [0, 6, 0], opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.7, delay: 0.3 }} className="absolute left-1/2 -translate-x-1/2 top-16 text-white">↓</motion.div>
      </div>
    </div>
  );
}

export const TacticalBoard: React.FC<TacticalBoardProps> = ({ type }) => {
  switch (type) {
    case 'error-types':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <div className="relative h-52 bg-gradient-to-br from-green-900 to-emerald-700 border-4 border-white rounded-xl p-3">
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/25" />
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 text-[11px] font-black bg-red-600 text-white rounded-md px-2 py-1"
            >
              Compile/Syntax
            </motion.div>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-16 right-4 text-[11px] font-black bg-amber-400 text-neutral-900 rounded-md px-2 py-1"
            >
              Runtime
            </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-4 left-4 text-[11px] font-black bg-cyan-400 text-neutral-900 rounded-md px-2 py-1"
            >
              Logical + Warnings
            </motion.div>
          </div>
        </div>
      );

    case 'memory-flow':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <div className="h-52 grid grid-cols-3 gap-3 p-3 bg-slate-100 border border-slate-300 rounded-xl">
            <div className="col-span-1 rounded-lg bg-slate-800 p-2 flex flex-col-reverse gap-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="h-7 rounded bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center"
                >
                  Stack #{i}
                </motion.div>
              ))}
              <p className="text-[10px] text-slate-300 font-black uppercase">Stack</p>
            </div>
            <div className="col-span-2 rounded-lg bg-emerald-100 border border-emerald-300 relative overflow-hidden p-2">
              <p className="text-[10px] text-emerald-900 font-black uppercase mb-1">Heap + Call Stack refs</p>
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ x: [0, 6, 0], y: [0, i % 2 ? -2 : 2, 0] }}
                  transition={{ duration: 1.8 + i * 0.2, repeat: Infinity }}
                  className="absolute w-8 h-8 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center"
                  style={{ top: `${16 + i * 12}%`, left: `${8 + i * 18}%` }}
                >
                  Obj
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'gc-arena':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <div className="relative h-52 rounded-xl bg-gradient-to-br from-emerald-900 via-green-700 to-emerald-900 border border-white/20 p-3 overflow-hidden">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/90 mb-2">Garbage Collection Arena</p>
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [1, 0.7, 0], scale: [1, 0.9, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
                className="absolute w-8 h-8 rounded-full bg-slate-300/80 border border-white/40 flex items-center justify-center text-[10px] font-black text-slate-900"
                style={{ left: `${12 + i * 18}%`, top: `${28 + (i % 2) * 20}%` }}
              >
                Obj
              </motion.div>
            ))}

            <motion.div
              animate={{ x: ['-20%', '115%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-3 text-xl"
            >
              🚜
            </motion.div>

            <div className="absolute bottom-3 right-3 text-[11px] font-black uppercase text-white bg-black/25 border border-white/20 rounded-md px-2 py-1">
              GC curăță obiectele fără referință
            </div>
          </div>
        </div>
      );

    case 'debug-lab':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard
            color="bg-red-600"
            steps={['Breakpoint', 'Watch/Inspect', 'Call Stack', 'Try/Catch', 'Log & Fix']}
          />
        </div>
      );

    case 'oop-core':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <div className="h-52 bg-slate-100 border border-slate-300 rounded-xl p-4 flex items-center justify-around">
            <div className="text-center">
              <div className="w-24 h-28 rounded-lg border-2 border-dashed border-blue-500 bg-blue-100 flex items-center justify-center text-3xl">
                📘
              </div>
              <p className="text-[11px] font-black mt-1">Class</p>
            </div>
            <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="text-2xl">
              ➜
            </motion.div>
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.1 }}
                className="w-24 h-28 rounded-lg bg-red-600 text-white flex items-center justify-center text-3xl shadow-lg"
              >
                🏃
              </motion.div>
              <p className="text-[11px] font-black mt-1">Object</p>
            </div>
          </div>
        </div>
      );

    case 'oop-relations':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <LayeredSchemaBoard
            title="OOP Schema — de la concept la execuție"
            layers={[
              'Encapsulation (boundary/API) ',
              'Abstraction (contract) ',
              'Inheritance / Composition (structură) ',
              'Polymorphism (runtime behavior) ',
            ]}
            tone="from-indigo-900 via-indigo-700 to-slate-800"
          />
        </div>
      );

    case 'oop-contracts':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Composition vs Aggregation · Interface Contract"
            subtitle="has-a, coupling/cohesion, dependency control"
            chips={['has-a', 'is-a', 'cohesion↑', 'coupling↓', 'interface', 'abstract class']}
            tone="from-violet-900 via-fuchsia-700 to-violet-900"
          />
        </div>
      );

    case 'solid-shield':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="SOLID Defensive Line"
            subtitle="SRP · OCP · LSP · ISP · DIP"
            chips={['SRP', 'OCP', 'LSP', 'ISP', 'DIP']}
            tone="from-red-900 via-rose-700 to-red-900"
          />
        </div>
      );

    case 'patterns-map':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Creational Patterns"
            subtitle="Factory · Singleton · Builder"
            chips={['Factory', 'Singleton', 'Builder']}
            tone="from-amber-900 via-orange-700 to-amber-900"
          />
        </div>
      );

    case 'patterns-flow':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Behavioral + Structural"
            subtitle="Strategy · Observer · Adapter · Decorator · Repository · DI"
            chips={['Strategy', 'Observer', 'Adapter', 'Decorator', 'Repository', 'DI Pattern']}
            tone="from-sky-900 via-cyan-700 to-sky-900"
          />
        </div>
      );

    case 'anti-patterns':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Anti-pattern Alert"
            subtitle="God Object · Spaghetti Code"
            chips={['Too many responsibilities', 'Low testability', 'Hard changes', 'Hidden bugs']}
            tone="from-zinc-900 via-zinc-700 to-zinc-900"
          />
        </div>
      );

    case 'testing-pyramid':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <div className="h-52 rounded-xl bg-neutral-900 border border-neutral-700 p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white mb-3">Testing Pyramid</p>
            <div className="space-y-2">
              <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} transition={{ duration: 0.6 }} className="h-8 bg-cyan-500/80 rounded-md text-[11px] font-black text-white flex items-center px-2">E2E</motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: '58%' }} transition={{ duration: 0.7 }} className="h-8 bg-blue-500/80 rounded-md text-[11px] font-black text-white flex items-center px-2">Integration</motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} transition={{ duration: 0.8 }} className="h-8 bg-emerald-500/80 rounded-md text-[11px] font-black text-white flex items-center px-2">Unit</motion.div>
            </div>
          </div>
        </div>
      );

    case 'testing-lab':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard
            color="bg-emerald-500"
            steps={['Arrange', 'Act', 'Assert', 'Mock/Stub/Fake', 'Regression']}
          />
        </div>
      );

    case 'testing-decision':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="When NOT to Unit Test"
            subtitle="Testezi după risc, nu după ego"
            chips={['Trivial code', 'Low business value', 'High maintenance tests', 'Prefer integration where needed']}
            tone="from-emerald-900 via-teal-700 to-emerald-900"
          />
        </div>
      );

    case 'http-flow':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard
            color="bg-sky-500"
            steps={['Client', 'HTTP Request', 'Server', 'HTTP Response', 'Render UI']}
          />
        </div>
      );

    case 'http-status':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Methods + Status Codes"
            subtitle="GET POST PUT PATCH DELETE | 200 201 400 401 403 404 409 500"
            chips={['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'Idempotency']}
            tone="from-blue-900 via-sky-700 to-blue-900"
          />
        </div>
      );

    case 'rest-grid':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="REST + Stateless"
            subtitle="Resurse clare, contracte uniforme, cereri independente"
            chips={['Resource URIs', 'Uniform verbs', 'Stateless', 'Cache-friendly']}
            tone="from-cyan-900 via-cyan-700 to-slate-900"
          />
        </div>
      );

    case 'angular-formation':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <AngularBoard />
        </div>
      );

    case 'angular-advanced':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <AngularBoard advanced />
        </div>
      );

    case 'backend-pipeline':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-violet-500" steps={['Routing', 'Controller', 'Service', 'Repository', 'Response DTO']} />
        </div>
      );

    case 'kafka-radio':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <KafkaFlowBoard />
        </div>
      );

    case 'backend-layers':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <LayeredSchemaBoard
            title="Backend Architecture Schema"
            layers={['Middleware/Filters', 'Controller + DTO', 'Service Layer', 'Repository Layer', 'DB/External systems']}
            tone="from-fuchsia-900 via-violet-700 to-fuchsia-900"
          />
        </div>
      );

    case 'di-lifetimes':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="DI + Service Lifetimes"
            subtitle="Transient · Scoped · Singleton + Env Config"
            chips={['Dependency Injection', 'Transient', 'Scoped', 'Singleton', 'Dev/Test/Prod', 'Configuration']}
            tone="from-purple-900 via-indigo-700 to-purple-900"
          />
        </div>
      );

    case 'sql-field':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="SQL Fundamentals"
            subtitle="Table · Row · Column · PK · FK · Constraints · Index"
            chips={['Relational DB', 'Primary Key', 'Foreign Key', 'Constraints', 'Index', 'Schema']}
            tone="from-lime-900 via-emerald-700 to-lime-900"
          />
        </div>
      );

    case 'sql-joins':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <JoinVennBoard />
        </div>
      );

    case 'sql-acid':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-green-500" steps={['BEGIN', 'ACID checks', 'SELECT/INSERT/UPDATE/DELETE', 'COMMIT / ROLLBACK']} />
        </div>
      );

    case 'nosql-vs-sql':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="SQL vs NoSQL"
            subtitle="Schema strictă vs Schema-less document model"
            chips={['Collection', 'Document', 'Schema-less', 'Flexible fields', 'Trade-offs']}
            tone="from-orange-900 via-amber-700 to-orange-900"
          />
        </div>
      );

    case 'consistency-wave':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-amber-500" steps={['Write', 'Replica sync', 'Eventual consistency', 'Read convergence']} />
        </div>
      );

    case 'async-lane':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-teal-500" steps={['Task created', 'await', 'non-blocking wait', 'resume', 'result']} />
        </div>
      );

    case 'thread-safety':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Concurrency Risks"
            subtitle="Race condition · Deadlock · Thread safety"
            chips={['Shared state', 'Race condition', 'Lock ordering', 'Deadlock', 'Thread-safe design']}
            tone="from-teal-900 via-cyan-700 to-teal-900"
          />
        </div>
      );

    case 'algo-structures':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Data Structures + Flow"
            subtitle="Arrays · Lists · Dictionaries/Maps · Loops · Conditionals"
            chips={['Array', 'List', 'Dictionary/Map', 'for/while', 'if/switch']}
            tone="from-rose-900 via-red-700 to-rose-900"
          />
        </div>
      );

    case 'algorithms-race':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Big O Race"
            subtitle="Sorting + Searching + Time/Space complexity"
            chips={['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'Readability vs performance']}
            tone="from-red-900 via-pink-700 to-red-900"
          />
        </div>
      );

    case 'edge-defense':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Edge Cases Defense"
            subtitle="Input validation înainte să intre datele în sistem"
            chips={['null/empty', 'min/max', 'invalid format', 'fail fast']}
            tone="from-stone-900 via-zinc-700 to-stone-900"
          />
        </div>
      );

    case 'git-graph':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-orange-500" steps={['branch', 'commit', 'pull request', 'code review', 'merge']} />
        </div>
      );

    case 'devops-toolchain':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <DevOpsToolchainBoard />
        </div>
      );

    case 'devops-pipeline':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-yellow-500" steps={['Build', 'Automated tests', 'Deploy', 'Monitor', 'Rollback']} />
        </div>
      );

    case 'cloud-stack':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <CloudStackBoard />
        </div>
      );

    case 'secrets-locker':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Config vs Code + Secrets"
            subtitle="Setări externe, secret management sigur"
            chips={['env config', 'vault', 'no hardcoded secrets', 'least privilege']}
            tone="from-indigo-900 via-blue-700 to-indigo-900"
          />
        </div>
      );

    case 'ai-loop':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <LoopBoard title="AI Dev Loop (Human-in-the-loop)" nodes={['Prompt', 'Generate', 'Review', 'Test', 'Refine']} />
        </div>
      );

    case 'mcp-map':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <MCPBoard />
        </div>
      );

    case 'ai-guardrails':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="AI Guardrails"
            subtitle="Security, ownership, limitations, verification"
            chips={['Human-in-the-loop', 'Limitations', 'Security checks', 'Ownership', 'Verify output']}
            tone="from-fuchsia-900 via-purple-700 to-fuchsia-900"
          />
        </div>
      );

    case 'soft-skills':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Team Dynamics"
            subtitle="Communication · Questions · Feedback · Collaboration"
            chips={['Clear comms', 'Ask early', 'Feedback loop', 'Pairing']}
            tone="from-red-900 via-rose-700 to-red-900"
          />
        </div>
      );

    case 'pressure-play':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Ownership Under Pressure"
            subtitle="Accountability · Learning mindset · Handling failure"
            chips={['Ownership', 'Accountability', 'Pressure handling', 'Failure recovery']}
            tone="from-rose-900 via-orange-700 to-rose-900"
          />
        </div>
      );

    case 'time-box':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-rose-500" steps={['Prioritize', 'Plan block', 'Execute', 'Review', 'Adjust']} />
        </div>
      );

    case 'meta-tradeoffs':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <LayeredSchemaBoard
            title="Decision Schema (Trade-offs)"
            layers={['Context / constraints', 'Options', 'Risks & costs', 'Decision + rationale', 'Follow-up metrics']}
            tone="from-neutral-900 via-slate-700 to-neutral-900"
          />
        </div>
      );

    case 'construction-impact':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <ConstructionImpactBoard />
        </div>
      );

    case 'quality-loop':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <TimelineBoard color="bg-slate-500" steps={['Refactor', 'Clean code', 'Docs', 'Measure quality', 'Scale safely']} />
        </div>
      );

    case 'thinking-map':
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Thinking Out Loud"
            subtitle="Assumptions explicite + validare rapidă"
            chips={['Assumptions', 'Risks', 'Alternatives', 'Decision log']}
            tone="from-slate-900 via-zinc-700 to-slate-900"
          />
        </div>
      );

    default:
      return (
        <div className="w-full my-4 rounded-xl overflow-hidden shadow-inner bg-white">
          <GenericBoard
            title="Concept Tactic"
            subtitle="Schiță generică disponibilă"
            chips={['Analogie Dinamo', 'Definiție', 'Detalii', 'Repetiție']}
          />
        </div>
      );
  }
};
