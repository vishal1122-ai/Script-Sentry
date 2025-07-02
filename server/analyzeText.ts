import dotenv from "dotenv";
dotenv.config();

export async function analyzeContractText(text: string): Promise<string> {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5000", // Required by OpenRouter
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
            content: `Here is a contract:\n\n${text}\n\nPlease provide the following:\n
1. Key clauses
2. Payment terms
3. Termination policy
4. Any red flags (highlighted in **bold**)
5. Overall summary (in simple, plain English)
6. Risk Score (1–10)`,
          },
        ],
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.choices || !result.choices[0]?.message?.content) {
    throw new Error(`OpenRouter Error: ${JSON.stringify(result)}`);
  }

  return result.choices[0].message.content;
}
