import { GoogleGenAI } from "@google/genai";
import { UserData, QuizAnswer } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const generateVibeAnalysis = async (
  userData: UserData,
  quizAnswers: QuizAnswer[]
): Promise<string> => {
  
  // Fix: Use process.env.API_KEY instead of import.meta.env.VITE_API_KEY to comply with SDK guidelines
  // and fix the TypeScript error "Property 'env' does not exist on type 'ImportMeta'".
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API Key is missing from environment variables (API_KEY).");
    return "# Ошибка конфигурации\n\nAPI ключ не найден.\n\n**Инструкция:**\nУбедитесь, что переменная окружения `API_KEY` установлена и доступна.";
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
    return "# Connection Error\n\nНе удалось установить связь с Космосом (API Error). \n\nПроверьте правильность API ключа и лимиты использования.";
  }
};