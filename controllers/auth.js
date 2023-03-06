const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const Empresa = require('../models/empresa');


const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verficiar si el email existe
        const empresa = await Empresa.findOne({ correo });
        if ( !empresa ) {
            return res.status(400).json({
                msg: 'Empresa / Password no son correctos - (El correo no existe jaja)'
            });
        }

        //Si el usuario esta activo (estado = false)
        if ( !empresa.estado ) {
            return res.status(400).json({
                msg: 'Empresa / Password no son correctos - estado: false'
            });
        }
        
        //Verificar la password
        const validarPassword = bcrypt.compareSync( password, empresa.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Empresa / Password no son correctos - (password incorrecta)'
            });
        }

        //Generar JWT
        const token = await generarJWT( empresa.id );

        res.json({
            msg: 'Login PATH',
            correo, password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }

}

module.exports = {
    login,
}