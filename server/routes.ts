import type { Express } from "express";
import { createServer, type Server } from "http";
// @ts-ignore
import multer from "multer";
// @ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse.js";
// @ts-ignore
import mammoth from "mammoth";
// @ts-ignore
// import * as fileType from "file-type"; // ✅ Works for file-type@21
const fileType = await import("file-type");
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Set up file upload middleware (in-memory)
  const upload = multer({ storage: multer.memoryStorage() });

  // ✅ File Upload and Text Extraction Endpoint
  app.post("/api/upload", upload.single("document"), async (req, res) => {
    const file = req.file as Express.Multer.File | undefined;

    if (!file) return res.status(400).json({ error: "No file uploaded." });

    const detectedType = await fileType.fileTypeFromBuffer(file.buffer);
    const mime = detectedType?.mime || "";

    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ].includes(mime)
    ) {
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

      if (text.trim().split(/\s+/).length < 50) {
        return res
          .status(400)
          .json({ error: "File does not contain enough content to analyze." });
      }

      return res.json({ text });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to extract file text.", detail: err });
    }
  });

  return httpServer;
}
