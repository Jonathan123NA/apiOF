const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const routes = require('./routes');

app.use('/api', routes);

app.use("/", (req, res) => {
    res.send("Funcionando!");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});