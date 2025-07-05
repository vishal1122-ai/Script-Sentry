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
            content: `Here is a contract:\n\n${text}\n\nPlease analyze the contract and strictly follow the structure below. DO NOT use *, #, -, or any Markdown formatting. Use the **exact titles** and spacing as shown:
            
1. risk score: [number between 0 and 10]

2. summary: [Write a 1–2 paragraph plain-English summary of the contract.]

3. red flag: mention all of the risky statements in the following manner
[Clause Name]
"[Exact clause text]"
Why this is risky: [Reason in plain English]

4. recommendation:
[RECOMMEND] Negotiate a base salary or guaranteed payment to ensure fair compensation.
[RECOMMEND] Limit liability clauses to only direct damages caused by negligence.
[RECOMMEND] Define a maximum confidentiality period of 2 years.
... (continue as needed, using lettered list format)
`,
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
