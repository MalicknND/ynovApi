const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

//importation du fichier .env
require('dotenv').config();

app.use(express.json());
app.use('/api', routes);

//on le stocke dans une const
const mongoString = process.env.DATABASE_url;
//connexion à la base
mongoose.connect(mongoString);
const database = mongoose.connection;
//connexion avec succés ou sans
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Connected to database'));

app.listen(3000, () => {
  console.log(`server started at ${3000}`);
});
