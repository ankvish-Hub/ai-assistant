const groq = require("../config/groq");

const askAI = async (context, question) => {
    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "system",
                content:
                    "Answer strictly based on provided notes.If the information is present, extract it clearly.Do not miss obvious details.If not found, say not found."
            },
            {
                role: "user",
                content: `
                Notes:
                ${context}

                Question:
                ${question}
                `
            }
        ]
    });

    return response.choices[0].message.content;
};

module.exports = askAI;