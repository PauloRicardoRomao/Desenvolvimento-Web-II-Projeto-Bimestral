const express = require("express");
const path = require("path");
const sequelize = require("./config/config");

const app = express();

// Importa modelos (se necessário)
const plantio = require("./models/plantioModel");
const colheita = require("./models/colheitaModel");

// Configura o EJS como motor de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares básicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

// Importa as rotas
const viewRoutes = require("./routes/viewRoutes");
const plantioRoutes = require("./routes/plantioRoutes");
const colheitaRoutes = require("./routes/colheitaRoutes");

// Usa as rotas
app.use("/", viewRoutes);           // Página inicial e views gerais
app.use("/plantio", plantioRoutes); // CRUD de plantios
app.use("/colheita", colheitaRoutes); // CRUD de colheitas

// Rota de fallback (404)
app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

// Sincroniza o banco e sobe o servidor
sequelize.sync().then(() => {
    console.log("✅ Banco de dados sincronizado!");
    app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
}).catch(err => {
    console.error("❌ Erro ao sincronizar o banco:", err);
});

module.exports = app;
