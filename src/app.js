const express = require('express');
const app = express(); // on démarre express
const bodyParser = require('body-parser'); //permet de parser tous les modules
const mongoose = require('mongoose');
const apiRouter = require('./routes/index');

require('dotenv').config(); //on le met aprés avoir fait npm i dotenv

app.use(bodyParser.json());
//app.use(express.json()); // .use middleware

//conexion à la base de données
mongoose
  .connect(
    'mongodb+srv://' +
      process.env.MONGODB_USER +
      ':' +
      process.env.MONGODB_PASSWORD +
      '@apicluster.k7ieawl.mongodb.net/?retryWrites=true&w=majority'
    //`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@apicluster.k7ieawl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Successfully connect to database');
  })
  .catch((err) => console.log(err));

//
app.use('/api/v1/', apiRouter);

//faire find one by id; find all; update one by id; delete one by id;

//Find one by id
app.get('/user/:id', async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//find all
app.get('/user', async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete by id
app.delete('/user/:id', (req, res) => {
  const id = req.params.id;
  User.deleteOne({ id: id })
    .exec()
    .then((user) => {
      res.send(user);
    });
});

//update by id
app.put('/user/:id'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const options = { new: true };
      const result = await User.findByIdAndUpdate(id, updateData, options);
      res.send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
//update by id
// app.put('/user/:id', (req, res) => {
//   const id = req.params.id;
//   const usertoUpdate = new User({
//     usertoUpdate.firstName = req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   usertoUpdate
// })

//console.log(process.env.MONGODB_USER);
//console.log(process.env.MONGODB_PASSWORD);

// app.get(
//routes =  endpoints avec la method GET
//   '/',
//la fonction = controller
//   function (req, res) {
//     res.send('<h1>Hello World<h1>');
//   }
// );

//une seconde route de type POST
//Dans le controller = récuperer le body de la requête (username et password)
//console.log du body de la requête
//renvoyer une réponse vous ete contecté

// app.post('/login', function (req, res) {
//   console.log(req.body); //pour afficher tout ce qui est sur le body (username et password)
//console.log(req.body.username); //pour afficher le username seulement

//   res.send('Vous êtes connecté');
// });

// app.get('/products/:id', function (req, res) {
//   console.log(req.params);
//   res.send(req.params.id);
// });

//method launch app
app.listen(process.env.PORT, function () {
  console.log('Vous êtes connecté');
});
