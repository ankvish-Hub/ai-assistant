const File = require("../models/File");
const parsePDF = require("../services/parserService");
const Chunk = require("../models/Chunk");
const chunkText = require("../utils/chunkText");
const createEmbedding = require("../services/embeddingService");

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        // Parse PDF
        const extractedText = await parsePDF(req.file.path);

        // Save file
        const file = await File.create({
            userId: req.user._id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            content: extractedText
        });

        // Create chunks
        const chunks = chunkText(extractedText);

        // Generate embeddings for each chunk
        for (const chunk of chunks) {
            const embedding = await createEmbedding(chunk);

            await Chunk.create({
                fileId: file._id,
                content: chunk,
                embedding
            });
        }

        res.status(201).json({
            success: true,
            fileId: file._id,
            message: "File uploaded and processed"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};