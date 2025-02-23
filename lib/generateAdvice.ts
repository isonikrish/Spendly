import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const getFinancialAdvice = async (
  totalBudget: string | number,
  totalIncome: string | number,
  totalSpent: string | number
) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      I need personalized financial advice based on the following details:
      - Total Income: ${totalIncome}
      - Total Budget: ${totalBudget}
      - Total Spent: ${totalSpent}

    provide me financial advice in 4 sentences to help me manage my finances more effectively in India.

    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();
    return advice;
  } catch (error) {
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
