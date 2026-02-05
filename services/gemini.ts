
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const getStrategyAdvice = async (handDetails: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: `You are an expert poker strategy coach (GTO oriented). Analyze the following hand or situation and provide concise, actionable advice: ${handDetails}`,
      config: {
        systemInstruction: "You are a professional poker coach. Keep answers punchy, strategic, and focused on GTO principles. Use markdown formatting.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble analyzing that hand right now. Let's try again in a moment.";
  }
};
