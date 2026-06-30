const fs = require("fs");
const pdfParse = require("pdf-parse");

const parsePDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);

        const data = await pdfParse(dataBuffer);

        return data.text;

    } catch (error) {
        console.log(error);
        throw new Error("PDF parsing failed");
    }
};

module.exports = parsePDF;