import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// teste simples
app.get("/", (req, res) => {
res.send("Jarvis backend online 🚀");
});

// IA REAL
app.post("/jarvis", async (req, res) => {
const { message } = req.body;

try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Você é o Jarvis, inteligente e direto." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();

    res.json({
        reply: data.choices[0].message.content
    });

} catch (err) {
    res.json({
        reply: "Erro ao acessar IA"
    });
}

});

app.listen(3000, () => console.log("Rodando"));
