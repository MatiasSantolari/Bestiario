const express = require('express');
const mongoose = require('mongoose');
let cors = require("cors");
const monstruos = require('./models/monstruo/monstruoController')
const especies = require('./models/especie/especieController')
const db = require('./models/db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/monstruos', monstruos);
app.use('/api/especies', especies);

app.use(cors());


app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});
