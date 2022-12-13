//importation du model User
const User = require('../models/user.model');
//importation de jwt pour le token
const jwt = require('jsonwebtoken');

//cryptage de mot de passe
const bcrypt = require('bcrypt');

//inscription avec la methode post
exports.register = (req, res) => {
  // hasher le password avant entrée en base de données
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  newUser
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//connexion de l'utilisateur
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'user not found',
        });
      }

      //voir si le mot passe crypté correspond a celui qui est en base de données
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: 'password not valid',
          auth: false,
        });
      }
      //génération du token
      let userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
      );
      res.send({
        message: 'User logged',
        auth: true,
        //on rend le userToken
        token: userToken,
      });
    })
    .catch((err) => res.status(400).send(err));
};
