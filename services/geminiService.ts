import { GoogleGenAI } from "@google/genai";
import { UserData, QuizAnswer } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const generateVibeAnalysis = async (
  userData: UserData,
  quizAnswers: QuizAnswer[]
): Promise<string> => {
  // Netlify and other build environments typically expose this via process.env
  // Ensure your Netlify site settings have API_KEY defined.
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    // Provide a user-friendly error message that might hint at config issues
    return "# Connection Error\n\nНе удалось установить связь с Космосом (API Error). \n\nЕсли вы разработчик, проверьте переменную окружения `API_KEY`.";
  }
};