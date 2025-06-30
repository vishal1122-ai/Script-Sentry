import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeContractText(text: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4", // or "gpt-3.5-turbo" if you prefer
    messages: [
      {
        role: "system",
        content:
          "You are a contract analysis assistant helping freelancers, creators, consultants, and small business owners understand legal agreements. Your job is to extract meaningful insights and highlight any areas that may pose risks. Be concise, avoid legal jargon, and tailor your language to a non-technical audience."",
      },
      {
        role: "user",
        content: `Here is a contract:\n\n${text}\n\nPlease provide the following:\n
1. Key clauses
2. Payment terms
3. Termination policy
4. Any red flags (highlighted in **bold**)
5. Overall summary (in simple, plain English)
6. Risk Score (1–10)`,
      },
    ],
    temperature: 0.5,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || "No analysis result found.";
}
