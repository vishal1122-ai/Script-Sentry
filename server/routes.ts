import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";
const fileType = await import("file-type");
import { analyzeContractText } from "./analyzeText";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // File upload middleware (in-memory)
  const upload = multer({ storage: multer.memoryStorage() });

  /**
   * @route POST /api/upload
   * Uploads a contract file and returns analyzed insights
   */
  app.post("/api/upload", upload.single("document"), async (req, res) => {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: "No file uploaded." });

    // Detect MIME type
    const detectedType = await fileType.fileTypeFromBuffer(file.buffer);
    const mime = detectedType?.mime || "";

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(mime)) {
      return res.status(400).json({ error: "Unsupported file type." });
    }

    try {
      let text = "";

      if (mime === "application/pdf") {
        const parsed = await pdfParse(file.buffer);
        text = parsed.text;
      } else if (
        mime ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        text = result.value;
      } else if (mime === "text/plain") {
        text = file.buffer.toString("utf8");
      }

      // Minimum content check
      if (text.trim().split(/\s+/).length < 50) {
        return res
          .status(400)
          .json({ error: "File does not contain enough content to analyze." });
      }

      // 🔍 Analyze text using OpenAI
      const aiResult = await analyzeContractText(text);

      return res.json({ analysis: aiResult });
    } catch (err) {
      console.error("File processing failed:", err);
      return res
        .status(500)
        .json({ error: "Failed to extract file text.", detail: err });
    }
  });

  return httpServer;
}
