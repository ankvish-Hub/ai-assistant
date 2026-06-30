const express = require("express");
const groq = require("../config/groq");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: "Say hello"
                }
            ]
        });

        res.json(response.choices[0].message.content);

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;