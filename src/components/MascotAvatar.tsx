import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakPortuguese, stopSpeech } from '../utils/audio';

interface MascotProps {
  mood?: 'happy' | 'thinking' | 'celebrating' | 'teaching';
  message?: string;
  speakableText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MascotAvatar: React.FC<MascotProps> = ({
  mood = 'happy',
  message,
  speakableText,
  size = 'md'
}) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleSpeak = () => {
    const textToRead = speakableText || message;
    if (!textToRead) return;
    
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakPortuguese(textToRead, () => setIsSpeaking(false));
    }
  };

  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20',
    lg: 'w-28 h-28'
  }[size];

  return (
    <div className="flex items-start gap-3">
      {/* Robot SVG Avatar */}
      <div className={`relative shrink-0 ${sizeClasses}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md select-none transform transition-transform hover:scale-105"
        >
          {/* Antenna */}
          <line x1="50" y1="20" x2="50" y2="8" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="7" r="5" fill="#EF4444" className={mood === 'celebrating' ? 'animate-ping' : ''} />
          <circle cx="50" cy="7" r="4" fill="#F87171" />

          {/* Ears / Headbolts */}
          <rect x="18" y="32" width="6" height="14" rx="2" fill="#94A3B8" />
          <rect x="76" y="32" width="6" height="14" rx="2" fill="#94A3B8" />

          {/* Head */}
          <rect
            x="22"
            y="20"
            width="56"
            height="44"
            rx="12"
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="3"
          />

          {/* Screen / Faceplate */}
          <rect
            x="27"
            y="26"
            width="46"
            height="32"
            rx="8"
            fill="#0F172A"
          />

          {/* Eyes */}
          {mood === 'celebrating' ? (
            // Star/happy eyes
            <>
              <path d="M 36 39 Q 40 33 44 39" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              <path d="M 56 39 Q 60 33 64 39" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            // Thinking looking up
            <>
              <circle cx="40" cy="38" r="4" fill="#38BDF8" />
              <circle cx="40" cy="36" r="1.5" fill="#FFFFFF" />
              <circle cx="60" cy="38" r="4" fill="#38BDF8" />
              <circle cx="60" cy="36" r="1.5" fill="#FFFFFF" />
            </>
          ) : (
            // Standard cheerful eyes
            <>
              <circle cx="40" cy="40" r="5" fill="#38BDF8" />
              <circle cx="41.5" cy="38.5" r="2" fill="#FFFFFF" />
              <circle cx="60" cy="40" r="5" fill="#38BDF8" />
              <circle cx="61.5" cy="38.5" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* Mouth */}
          {mood === 'celebrating' || mood === 'happy' ? (
            <path
              d="M 43 49 Q 50 56 57 49"
              fill="none"
              stroke="#FDE047"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ) : mood === 'thinking' ? (
            <ellipse cx="50" cy="51" rx="4" ry="2" fill="#FDE047" />
          ) : (
            <line x1="44" y1="51" x2="56" y2="51" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Body */}
          <rect
            x="30"
            y="66"
            width="40"
            height="26"
            rx="8"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="3"
          />

          {/* Chest badge - Mini Base-10 block logo */}
          <rect x="42" y="72" width="16" height="14" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <line x1="47.3" y1="72" x2="47.3" y2="86" stroke="#CA8A04" strokeWidth="1" />
          <line x1="52.6" y1="72" x2="52.6" y2="86" stroke="#CA8A04" strokeWidth="1" />
          <line x1="42" y1="79" x2="58" y2="79" stroke="#CA8A04" strokeWidth="1" />
        </svg>

        {/* Small badge of Robô Dito */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-xs">
          Dito
        </span>
      </div>

      {/* Speech bubble */}
      {message && (
        <div className="relative bg-white border border-amber-200/80 rounded-2xl p-3.5 shadow-sm text-slate-800 text-sm flex-1 max-w-xl">
          <div className="absolute top-4 -left-2 w-3 h-3 bg-white border-l border-t border-amber-200/80 transform -rotate-45" />
          
          <div className="flex items-start justify-between gap-2">
            <p className="leading-snug font-medium text-slate-700">{message}</p>
            
            {/* Audio speech button */}
            <button
              onClick={handleSpeak}
              type="button"
              title={isSpeaking ? "Parar leitura" : "Ouvir leitura em voz alta"}
              className={`shrink-0 p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-xs font-semibold ${
                isSpeaking 
                  ? 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse' 
                  : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Parar</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span className="hidden sm:inline">Ouvir</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
