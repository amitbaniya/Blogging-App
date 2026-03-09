import { ai } from "../config/ai.js";

export async function getAIReply(req, res) {
    try {
        const { prompt, length = 300 } = req.body
        if (!prompt) {
            return res.status(401).json({ message: "Prompt is required." })
        }
        const generationLength = `A little more than More than ${length}`
        const role = 'Blogger'
        const contentFormat = 'HTML generation'
        const contentType = `
        Only paragraph.
        Indentation on each paragraphs.
        No titles.
        No the full html file.
        But feel free to highlight needed wordsor lists or any inline text semantics elements. 
        Also you can use multiple paragraphs as needed.
        If you use mutliple paragraphs be sure to put one extraspacing spacing between each paragraphs.
        `

        const finalPrompt = `
        Content: ${prompt},
        Role: ${role},
        GenerationFormat:${contentFormat},
        ContentType:${contentType},
        Length:${generationLength}`

        const model = 'gemini-3-flash-preview'; //good model but rate limited

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-preview",
            contents: finalPrompt,
        });
        res.status(200).json({ reply: response.text, message: "generation successful" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: " Server Error." })
    }
}
