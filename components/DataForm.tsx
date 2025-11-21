import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserData } from '../types';
import { User, Calendar, MapPin, Clock } from 'lucide-react';

interface DataFormProps {
  onComplete: (data: UserData) => void;
}

export const DataForm: React.FC<DataFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  const isFormValid = formData.name && formData.birthDate && formData.birthPlace;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onComplete(formData);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 hover:bg-white/10";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1 ml-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md w-full mx-auto"
    >
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Идентификация</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          <div>
            <label className={labelClasses}>Ваше Имя</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Как вас зовут?"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Дата рождения</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className={`${inputClasses} [color-scheme:dark]`}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClasses}>Время (опц.)</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
                <input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                  className={`${inputClasses} [color-scheme:dark]`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Место рождения</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Город, Страна"
                value={formData.birthPlace}
                onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                className={inputClasses}
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-4 mt-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              isFormValid 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Далее
          </motion.button>

        </form>
      </div>
    </motion.div>
  );
};
