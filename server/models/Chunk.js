const mongoose = require("mongoose");

const chunkSchema = new mongoose.Schema(
{
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },

    content: {
        type: String
    },

    embedding: {
        type: [Number]
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Chunk", chunkSchema);