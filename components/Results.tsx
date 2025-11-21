import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Star, Moon, Zap, Key, Crown, Palette, Sparkles } from 'lucide-react';

interface ResultsProps {
  markdown: string;
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ markdown, onReset }) => {
  
  // Custom renderer for markdown to style it like a dashboard
  const components = {
    h1: ({node, ...props}: any) => (
       <div className="hidden" /> 
    ),
    h2: ({node, ...props}: any) => {
      let Icon = Star;
      let color = "text-yellow-400";
      const text = props.children?.toString() || "";

      if (text.includes("Cosmic") || text.includes("Signature")) { Icon = Moon; color = "text-indigo-400"; }
      if (text.includes("Archetype")) { Icon = Crown; color = "text-purple-400"; }
      if (text.includes("Totem") || text.includes("Spirit")) { Icon = Sparkles; color = "text-emerald-400"; }
      if (text.includes("Color") || text.includes("Power")) { Icon = Palette; color = "text-pink-400"; }
      if (text.includes("Hidden") || text.includes("Deficit")) { Icon = Key; color = "text-amber-400"; }
      if (text.includes("Actionable") || text.includes("Shift")) { Icon = Zap; color = "text-cyan-400"; }

      return (
        <div className="flex items-center gap-3 mt-10 mb-5 border-b border-white/5 pb-2">
          <div className={`p-2 rounded-lg bg-white/5 ${color} shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
             <Icon className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide uppercase" {...props} />
        </div>
      );
    },
    p: ({node, ...props}: any) => (
      <p className="text-slate-300 leading-relaxed mb-4 text-lg font-light" {...props} />
    ),
    ul: ({node, ...props}: any) => (
      <ul className="space-y-4 mb-6 bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/5" {...props} />
    ),
    li: ({node, ...props}: any) => (
      <li className="flex items-start gap-3 text-slate-200" {...props}>
        <span className="text-indigo-400 mt-1.5 text-lg">✦</span>
        <span>{props.children}</span>
      </li>
    ),
    strong: ({node, ...props}: any) => (
        <strong className="text-indigo-200 font-bold tracking-wide" {...props} />
    ),
    hr: ({node, ...props}: any) => (
        <hr className="border-white/10 my-8" />
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto pb-20"
    >
      <div className="text-center mb-12">
        <motion.div
           initial={{ scale: 0, rotate: -180 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ type: "spring", damping: 20 }}
           className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6"
        >
            <div className="bg-slate-950 rounded-full p-4 border-4 border-slate-900">
                <Star className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ваш Космический Паспорт</h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">Вибрации расшифрованы. Ниже представлен глубокий анализ вашей энергетической структуры.</p>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden"
      >
          {/* Decorative background elements inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <ReactMarkdown components={components}>
              {markdown}
            </ReactMarkdown>
          </div>

          {/* Footer Actions */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center border-t border-white/5 pt-8">
             <button onClick={() => navigator.clipboard.writeText(markdown).then(() => alert("Текст скопирован!"))} className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all hover:scale-105">
                <Download className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" /> 
                <span>Сохранить данные</span>
             </button>
             <button onClick={onReset} className="group flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:scale-105">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> 
                <span>Начать заново</span>
             </button>
          </div>
      </motion.div>
    </motion.div>
  );
};