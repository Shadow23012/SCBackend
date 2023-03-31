var express = require('express');
var router = express.Router();
const userModel = require ('../models/userModel');

/* GET user listing. */
router.get('/', async function(req, res, next) {
  const userresult = await userModel.find();
  res.json(userresult);
});

/* POST user add. */
router.post('/', async function(req, res, next) {
  let datos = {
    correo: req.body.correo,
    username: req.body.username,
    password: req.body.password
  };

  let user = new userModel(datos);
  let userresult = await user.save();

  res.send('Registro agregado exitosamente');
});

/* PUT user edit. */
router.put('/', async function(req, res, next) {
  const filter = {correo: req.query.correo}; //Condición de Query
  const update = {username: req.query.name,
                  password: req.query.password,}; //Campos a modificar


  const userresult = await userModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });


  res.json("Se actualiza el usuario");
});

/* DELETE user delete. */
router.delete('/:correo', async function(req, res, next) {
  const resul = await userModel.find({correo: req.params.correo}).exec();

  if (resul.length > 0) {
    await userModel.deleteOne({correo: req.params.correo});
    res.json("Eliminando usuario");
  } else {
    res.json({error: "No se encontró el usuario con correo " + req.params.correo})
  }

});




module.exports = router;
