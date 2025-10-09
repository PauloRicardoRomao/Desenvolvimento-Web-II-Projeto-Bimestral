const express = require("express");
const app = express();
const routes = require("./routes/viewRoutes");
const sequelize = require("./config/config");

const plantio = require("./models/plantioModel");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use(express.static("public"));

app.use("/", routes);

sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
