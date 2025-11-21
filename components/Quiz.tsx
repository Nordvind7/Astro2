import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, QuizAnswer } from '../types';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: QuizAnswer[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const handleOptionSelect = (option: any) => {
    const newAnswer: QuizAnswer = {
      questionId: questions[currentStep].id,
      answerText: option.text,
      answerIcon: option.icon,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="w-full bg-slate-800/50 rounded-full h-1.5 mb-8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <span className="text-purple-400 font-medium tracking-wider text-sm mb-3 uppercase">
            Вопрос {currentStep + 1} из {questions.length}
          </span>
          <h2 className="text-3xl font-bold text-white text-center mb-10 drop-shadow-md">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300"
              >
                <span className="text-5xl mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </span>
                <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">
                  {option.text}
                </span>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_20px_rgba(168,85,247,0.15)]" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
