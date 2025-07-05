interface AnalyzedResult {
  summary: string;
  riskScore: number;
  redFlags: { clause: string; text: string; reason: string }[];
  recommendations: string[];
}

export function analyzeText(result: string): AnalyzedResult {
  // Extract first paragraph or block before "Red-Flagged", "###", or numbered section
  const summaryMatch = result.match(
    /^([\s\S]*?)(?=\n#+\s*Red-Flagged|\n\d+\.\s*Red-Flagged|\nRed-Flagged|Risk Score|General Recommendations)/i
  );
  console.log("🟩 Summary Match:", summaryMatch?.[1]);
  const scoreMatch = result.match(/Risk Score[:\s]*([\d.]+)/i);
  const recommendationsMatch = result.match(
    /General Recommendations:\s*([\s\S]*)/i
  );

  const redFlagRegex =
    /^(.*?)[\n\r]+"(.*?)"[\n\r]+Why this is risky:\s*(.*?)\s*(?=\n\S|\Z)/gm;
  const redFlags: { clause: string; text: string; reason: string }[] = [];

  let match;
  while ((match = redFlagRegex.exec(result)) !== null) {
    redFlags.push({
      clause: match[1].trim(),
      text: match[2].trim(),
      reason: match[3].trim(),
    });
  }

  const recommendations =
    recommendationsMatch?.[1]
      ?.split(/•\s+/)
      .map((rec) => rec.trim())
      .filter((rec) => rec.length > 0) || [];

  console.log("🟩 Summary Match:", summaryMatch?.[1]);
  console.log("🟩 Score Match:", scoreMatch?.[1]);
  console.log("🟩 Recommendations Raw:", recommendationsMatch?.[1]);
  console.log("🟩 Red Flags:", redFlags);

  return {
    summary: summaryMatch?.[1].trim() || "",
    riskScore: parseFloat(scoreMatch?.[1] || "0"),
    redFlags,
    recommendations,
  };
}
