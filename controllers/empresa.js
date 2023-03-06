const { response, request } = require("express");
const bcrypt = require("bcryptjs");
//Importación del modelo
const Empresa = require("../models/empresa");

const getEmpresas = async (req = request, res = response) => {
  //condiciones del get
  const query = { estado: true };

  const listaEmpresas = await Promise.all([
    Empresa.countDocuments(query),
    Empresa.find(query),
  ]);

  res.json({
    msg: "C_Empresa",
    listaEmpresas,
  });
};

const postEmpresa = async (req = request, res = response) => {
  const { nombre, correo, password, tipo, sucursales } = req.body;
  const empresaGuardadaDB = new Empresa({ nombre, correo, password, type, });

  empresaGuardadaDB.sucursales.push(...req.body.sucursales);

  //Encriptar password
  const salt = bcrypt.genSaltSync();
  empresaGuardadaDB.password = bcrypt.hashSync(password, salt);

  //Guardar en BD
  await empresaGuardadaDB.save();

  res.json({
    msg: "Post_Empresa",
    empresaGuardadaDB,
  });
};

const putEmpresa = async (req = request, res = response) => {
  const idEmpresa = req.empresa.id;
  const { _id, estado, ...resto } = req.body;
  
  if (resto.password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(resto.password, salt);
  }

  resto.sucursales = [...req.body.sucursales];
  
  const empresaEliminada = await Empresa.findByIdAndUpdate(idEmpresa, resto, {new: true});
  res.json({
    msg: "Edit_Empresa",
    empresaEliminada,
  });
};

const deleteEmpresa = async (req = request, res = response) => {
  const idEmpresa = req.empresa.id;
  
  const empresaEliminada = await Empresa.findByIdAndDelete(idEmpresa, {new: true});
  res.status(200).json({
    msg: `Se ha eliminado correctamente el id ${ idEmpresa }`,
    empresaEliminada,
  });
};


module.exports = {
  getEmpresas,
  postEmpresa,
  putEmpresa,
  deleteEmpresa
};


