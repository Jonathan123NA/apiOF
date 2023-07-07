const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const routes = require('./routes');

app.use('/api', routes);

app.use("/", (req, res) => {
    res.send("Funcionando!");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});