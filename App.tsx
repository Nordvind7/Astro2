import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { DataForm } from './components/DataForm';
import { Quiz } from './components/Quiz';
import { LoadingScreen } from './components/LoadingScreen';
import { Results } from './components/Results';
import { AppStep, UserData, QuizAnswer } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { generateVibeAnalysis } from './services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('hero');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [resultMarkdown, setResultMarkdown] = useState<string>('');

  const handleStart = () => setStep('form');

  const handleFormComplete = (data: UserData) => {
    setUserData(data);
    setStep('quiz');
  };

  const handleQuizComplete = async (answers: QuizAnswer[]) => {
    setQuizAnswers(answers);
    setStep('loading');

    if (userData) {
      try {
        const result = await generateVibeAnalysis(userData, answers);
        setResultMarkdown(result);
        setStep('results');
      } catch (error) {
        console.error("Analysis failed", error);
        setResultMarkdown("# Ошибка\nНе удалось связаться с космосом. Пожалуйста, проверьте API ключ.");
        setStep('results');
      }
    }
  };

  const handleReset = () => {
    setStep('hero');
    setUserData(null);
    setQuizAnswers([]);
    setResultMarkdown('');
  };

  return (
    <div className="relative min-h-screen text-slate-200 overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-slate-950" />
         {/* Animated blobs */}
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
         <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]" />
         {/* Grid overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header/Logo area - only show if not on hero to avoid clutter */}
        {step !== 'hero' && (
          <header className="flex justify-between items-center mb-8 px-2">
             <div className="font-bold text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                VibeIdentity
             </div>
             <div className="text-xs font-mono text-slate-500 border border-slate-800 rounded px-2 py-1">
                BETA v1.0
             </div>
          </header>
        )}

        <main className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 'hero' && (
              <motion.div key="hero" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
                <Hero onStart={handleStart} />
              </motion.div>
            )}

            {step === 'form' && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
                <DataForm onComplete={handleFormComplete} />
              </motion.div>
            )}

            {step === 'quiz' && (
              <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <Quiz questions={QUIZ_QUESTIONS} onComplete={handleQuizComplete} />
              </motion.div>
            )}

            {step === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <LoadingScreen />
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div key="results" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Results markdown={resultMarkdown} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="text-center text-slate-600 text-sm py-6">
           <p>© {new Date().getFullYear()} VibeIdentity Analyzer. Powered by Gemini AI.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
