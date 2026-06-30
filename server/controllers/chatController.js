const Chunk = require("../models/Chunk");
const createEmbedding = require("../services/embeddingService");
const askAI = require("../services/aiService");

const cosineSimilarity = (a, b) => {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

exports.askQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        const { fileId } = req.params;

        const questionEmbedding = await createEmbedding(question);

        
        const chunks = await Chunk.find({ fileId });

        

        const rankedChunks = chunks
            .map(chunk => ({
                content: chunk.content,
                similarity: cosineSimilarity(
                    questionEmbedding,
                    chunk.embedding
                )
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);

            

        const context = rankedChunks
            .map(chunk => chunk.content)
            .join("\n");

        const answer = await askAI(context, question);

        res.json({
            answer
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};