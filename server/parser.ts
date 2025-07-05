interface AnalyzedResult {
  summary: string;
  riskScore: number;
  redFlags: { clause: string; text: string; reason: string }[];
  recommendations: string[];
}

export function analyzeText(result: string): AnalyzedResult {
  const riskScoreMatch = result.match(/1\. risk score:\s*(\d+)/i);
  const summaryMatch = result.match(/2\. summary:\s*([\s\S]*?)\s*3\./i);
  const redFlagsRaw = result.match(/3\. red flag:\s*([\s\S]*?)\s*4\./i);
  const recommendationsMatch = result.match(/4\. recommendation:\s*([\s\S]*)/i);

  const redFlags: { clause: string; text: string; reason: string }[] = [];
  if (redFlagsRaw?.[1]) {
    const redFlagRegex =
      /^(.*?)\s+"(.*?)"\s+Why this is risky:\s*(.*?)(?=\n\S|\Z)/gms;
    let match;
    while ((match = redFlagRegex.exec(redFlagsRaw[1])) !== null) {
      redFlags.push({
        clause: match[1].trim(),
        text: match[2].trim(),
        reason: match[3].trim(),
      });
    }
  }

  const recommendations =
    recommendationsMatch?.[1]
      ?.split(/\[RECOMMEND\]\s*/i)
      .map((rec) => rec.trim())
      .filter((rec) => rec.length > 0) || [];

  // console.log("🧠 Raw Recommendations Block:", recommendationsMatch?.[1]);
  // console.log("✅ Extracted Recommendations:", recommendations);

  return {
    summary: summaryMatch?.[1]?.trim() || "No summary found.",
    riskScore: parseFloat(riskScoreMatch?.[1] || "0"),
    redFlags,
    recommendations,
  };
}
