const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');

const coleccionesPermitidas = [
    'empresas',
    'sucursals',
];


const buscarEmpresas = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );  //TRUE

    if ( esMongoID ) {
        const empresa = await Empresa.findById(termino);
        return res.json({
            //results: [ usuario ]
            results: ( empresa ) ? [ empresa ] : [] 
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    } 

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');

    const empresas = await Empresa.find({
        $or: [ { nombre: regex }, { correo: regex } ],
        $and: [ { estado: true } ]
    });

    res.json({
        results: empresas
    })

}

const buscarSucursales = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );  //TRUE

    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        return res.json({
            //results: [ usuario ]
            results: ( sucursal ) ? [ sucursal ] : [] 
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    } 

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');

    const sucursales = await Sucursal.find({
        $or: [ { nombre: regex }],
        $and: [ { estado: true } ]
    });

    res.json({
        results: sucursales
    })

}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Unicamente: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case 'empresas':
            buscarEmpresas(termino, res);
        break;
        case 'sucursals':
           buscarSucursales(termino, res);
        break;
        default:
            res.status(500).json({
                msg: 'no has hecho la busqueda'
            });
        break;
    }

}


module.exports = {
    buscar
}