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
          "You are a contract analysis assistant for freelancers. Your job is to review contracts and extract helpful insights. Always include a risk score from 1 to 10, highlight red flags in asterisks, and offer brief explanations.",
      },
      {
        role: "user",
        content: `Here is a contract:\n\n${text}\n\nPlease provide the following:\n
1. Key clauses
2. Payment terms
3. Termination policy
4. Any red flags (highlighted in **bold**)
5. Overall summary
6. Risk Score (1–10)`,
      },
    ],
    temperature: 0.5,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || "No analysis result found.";
}
