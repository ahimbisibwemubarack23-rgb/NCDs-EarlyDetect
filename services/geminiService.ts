
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Use direct process.env.API_KEY without fallback and correct named parameter for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMedicalImage = async (imageBuffer: string, prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: imageBuffer.split(',')[1], mimeType: 'image/png' } },
          { text: `Analyze this medical image for NCD indicators. Focus on ${prompt}. Provide findings in JSON format with fields: classification, confidence (0-1), findings_summary, and recommendations (array).` }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            findings_summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['classification', 'confidence', 'findings_summary', 'recommendations']
        }
      }
    });

    // Fix: Access response.text as a property directly (not a method) and provide safe fallback
    const textOutput = response.text || '{}';
    return JSON.parse(textOutput);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
};