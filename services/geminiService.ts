import { GoogleGenAI } from "@google/genai";
import { UserData, QuizAnswer } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const generateVibeAnalysis = async (
  userData: UserData,
  quizAnswers: QuizAnswer[]
): Promise<string> => {
  
  // Robust API Key retrieval for various environments (Node, Vite, Netlify)
  let apiKey = "";
  
  // 1. Try standard process.env (Node/Webpack/Next.js)
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    apiKey = process.env.API_KEY;
  } 
  // 2. Try Vite standard import.meta.env (Netlify + Vite usually requires VITE_ prefix)
  else if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
     apiKey = (import.meta as any).env.VITE_API_KEY || (import.meta as any).env.API_KEY;
  }

  if (!apiKey) {
    console.error("API Key is missing from environment variables.");
    return "# Ошибка конфигурации\n\nAPI ключ не найден. \n\n**Для владельца сайта:**\nУбедитесь, что в настройках Netlify (Site Settings > Environment Variables) добавлен ключ `VITE_API_KEY` или `API_KEY` со значением вашего токена Gemini.";
  }

  const ai = new GoogleGenAI({ apiKey });

  // Format the user prompt to be readable by the LLM
  const promptData = `
    TARGET SUBJECT DATA:
    --------------------
    Name: ${userData.name}
    Date of Birth: ${userData.birthDate}
    Time of Birth: ${userData.birthTime || "Unknown"}
    Place of Birth: ${userData.birthPlace}

    PSYCHOMETRIC CALIBRATION (QUIZ):
    --------------------
    ${quizAnswers.map(a => `[Q${a.questionId}] Answer: "${a.answerText}" (Archetype Icon: ${a.answerIcon})`).join('\n')}
    
    TASK:
    Generate the full VibeIdentity Report based on the System Prompt rules.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptData,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.9, // High creativity for "Vibe" analysis
      },
    });

    return response.text || "Error: The cosmic signal was interrupted. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "# Connection Error\n\nНе удалось установить связь с Космосом (API Error). \n\nВозможно, квота ключа превышена или ключ недействителен.";
  }
};