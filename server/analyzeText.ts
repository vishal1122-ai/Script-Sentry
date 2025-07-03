import dotenv from "dotenv";
import { analyzeText as parseText } from "./parser";

dotenv.config();

export async function analyzeContractText(text: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "ScriptSentry",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small",
        messages: [
          {
            role: "system",
            content:
              "You are a contract analysis assistant helping freelancers, creators, consultants, and small business owners understand legal agreements. Your job is to extract meaningful insights and highlight any areas that may pose risks. Be concise, avoid legal jargon, and tailor your language to a non-technical audience.",
          },
          {
            role: "user",
            content: `Here is a contract:\n\n${text}\n\nPlease provide the following in this exact order and structure:\n
1. Risk Score: [number from 1–10]

2. Contract Summary:
[1-2 paragraph summary]

3. Red-Flagged Clauses:
[Use this format for each clause]
[Clause Name]
"[Exact clause text]"
Why this is risky: [Reason in plain English]

4. General Recommendations:
• Recommendation 1
• Recommendation 2
• Recommendation 3`,
          },
        ],
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.choices || !result.choices[0]?.message?.content) {
    throw new Error(`OpenRouter Error: ${JSON.stringify(result)}`);
  }

  const rawText = result.choices[0].message.content;
  const structured = parseText(rawText);
  return structured;
}
