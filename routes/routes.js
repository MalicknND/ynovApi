//importation d'express
const express = require('express');
//router d'express
const router = express.Router();
//importation du modèle de schema
const Model = require('../models/model');

//POST Method
//publier les données dans la base de données
router.post('/post', (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });
  //bloc try-catch pour gérer les messages d'erreurs et de reussite
  try {
    //sauvegarde des données avec data.save()
    const dataToSave = data.save();
    //stockage des données dans dataToSave
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all Method
router.get('/getAll', async (req, res) => {
  try {
    //Model.find pour récupérer toutes les donnés de la base
    const data = await Model.find();
    //on le renvoie sous format json
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//gGet by ID
router.get('/getOne/:id', async (req, res) => {
  try {
    //Model.findOne pour récupérer un élement de la base
    const data = await Model.findById(req.params.id);
    //on le renvoie sous format json
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by id
router.patch('/update/:id', async (req, res) => {
  try {
    /*trois parametre dans la methode findByIdAndUpdate pour rechercher 
    un élemnt par id et le mettre à jour */
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updateData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete by id method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
