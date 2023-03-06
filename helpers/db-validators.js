const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');
const Tipo = require('../models/tipo');

//Este archivo maneja validaciones personalizadas

const esTipoValido = async( tipo = '' ) => {

    const existeTipo = await Tipo.findOne( { tipo } );

    if ( !existeTipo ) {
        throw new Error(`El tipo ${ tipo } no está registrado en la DB`);
    }

}


const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Empresa.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}


const existeEmpresaPorId = async(id) => {

    //Verificar si el ID existe
    const existeUser = await Empresa.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const existeSucursalPorId = async(id) => {

    //Verificar si el ID existe
    const existeProducto = await Sucursal.findById(id);

    if ( !existeProducto ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}



module.exports = {
    emailExiste,
    existeEmpresaPorId,
    existeSucursalPorId,
    esTipoValido
}