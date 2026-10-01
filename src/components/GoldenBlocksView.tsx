import React from 'react';

interface GoldenBlocksViewProps {
  centenas: number;
  dezenas: number;
  unidades: number;
  compact?: boolean;
}

export const GoldenBlocksView: React.FC<GoldenBlocksViewProps> = ({
  centenas,
  dezenas,
  unidades,
  compact = false
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5">
      {/* Centenas (Placas de 100) */}
      <div className="bg-white/80 border border-emerald-200 rounded-xl p-3 flex flex-col">
        <div className="flex items-center justify-between border-b border-emerald-100 pb-1.5 mb-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Centenas (C)
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            {centenas} {centenas === 1 ? 'placa' : 'placas'} = {centenas * 100}
          </span>
        </div>

        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 min-h-[70px]">
          {centenas <= 0 ? (
            <span className="text-xs text-slate-400 italic">Nenhuma centena</span>
          ) : (
            Array.from({ length: Math.max(0, Math.min(centenas, 12)) }).map((_, i) => (
              <div
                key={`c_${i}`}
                title="1 Placa = 100 unidades (10 dezenas)"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gridTemplateRows: 'repeat(10, 1fr)'
                }}
                className={`relative bg-amber-300 border-2 border-amber-600 rounded shadow-xs overflow-hidden ${
                  compact ? 'w-11 h-11' : 'w-16 h-16'
                }`}
              >
                {Array.from({ length: 100 }).map((_, cellIdx) => (
                  <div key={cellIdx} className="border-[0.5px] border-amber-600/30" />
                ))}
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-amber-950/70 pointer-events-none drop-shadow-2xs">
                  100
                </span>
              </div>
            ))
          )}
          {centenas > 12 && (
            <span className="text-xs font-bold text-emerald-800">+{centenas - 12} placas</span>
          )}
        </div>
      </div>

      {/* Dezenas (Barras de 10) */}
      <div className="bg-white/80 border border-amber-200 rounded-xl p-3 flex flex-col">
        <div className="flex items-center justify-between border-b border-amber-100 pb-1.5 mb-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Dezenas (D)
          </span>
          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
            {dezenas} {dezenas === 1 ? 'barra' : 'barras'} = {dezenas * 10}
          </span>
        </div>

        <div className="flex-1 flex flex-wrap items-center justify-center gap-1.5 min-h-[70px]">
          {dezenas <= 0 ? (
            <span className="text-xs text-slate-400 italic">Nenhuma dezena</span>
          ) : (
            Array.from({ length: Math.max(0, Math.min(dezenas, 20)) }).map((_, i) => (
              <div
                key={`d_${i}`}
                title="1 Barra = 10 unidades"
                className={`bg-amber-400 border border-amber-700 rounded-xs shadow-xs flex flex-col justify-between ${
                  compact ? 'w-2.5 h-11' : 'w-3.5 h-16'
                }`}
              >
                {Array.from({ length: 10 }).map((_, segment) => (
                  <div key={segment} className="h-full border-b border-amber-600/60 last:border-b-0" />
                ))}
              </div>
            ))
          )}
          {dezenas > 20 && (
            <span className="text-xs font-bold text-amber-800">+{dezenas - 20} barras</span>
          )}
        </div>
      </div>

      {/* Unidades (Cubinhos de 1) */}
      <div className="bg-white/80 border border-sky-200 rounded-xl p-3 flex flex-col">
        <div className="flex items-center justify-between border-b border-sky-100 pb-1.5 mb-2">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
            Unidades (U)
          </span>
          <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
            {unidades} {unidades === 1 ? 'cubo' : 'cubos'} = {unidades}
          </span>
        </div>

        <div className="flex-1 flex flex-wrap items-center justify-center gap-1 min-h-[70px] max-h-28 overflow-y-auto">
          {unidades <= 0 ? (
            <span className="text-xs text-slate-400 italic">Nenhuma unidade</span>
          ) : (
            Array.from({ length: Math.max(0, Math.min(unidades, 30)) }).map((_, i) => (
              <div
                key={`u_${i}`}
                title="1 Cubinho = 1 unidade"
                className={`bg-amber-300 border border-amber-600 rounded-xs shadow-xs ${
                  compact ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'
                }`}
              />
            ))
          )}
          {unidades > 30 && (
            <span className="text-xs font-bold text-sky-800">+{unidades - 30} cubos</span>
          )}
        </div>
      </div>
    </div>
  );
};
