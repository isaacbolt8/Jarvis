const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 🤖 GEMINI API
app.post("/api/ia", async (req, res) => {
  try {
    const texto = req.body.text;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=SUA_API_KEY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: texto }] }]
        })
      }
    );

    const data = await response.json();

    const resposta =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui responder";

    res.json({ resposta });

  } catch (err) {
    res.json({ resposta: "Erro na IA" });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Jarvis rodando na porta 3000");
})
