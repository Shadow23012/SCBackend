const mongoose = require("mongoose");


const UsuarioEsquema = new mongoose.Schema({
 correo: String,
 username: {type: String, required:true},
 password: {type: String, required:true},
});

module.exports = mongoose.model("Users", UsuarioEsquema);

