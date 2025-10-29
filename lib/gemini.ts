import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is missing! Check .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const summarizeVideo = async (transcript: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Summarize this YouTube video transcript clearly and concisely for student note-taking:
      ${transcript}
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Error summarizing video. Please try again.";
  }
};
