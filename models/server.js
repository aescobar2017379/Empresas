const express = require('express')
const cors = require ('cors');
const {dbConection} = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //this.categoriasPath = '/api/categoria'

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            empresas: '/api/empresas',
            sucursales: '/api/sucursales',
            
        }

        this.conectarDB();
        this.middlewares();
        this.routes();

    }
    
    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public') )
    }

    async conectarDB(){
        await dbConection();
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.empresas, require('../routes/empresa'));
        this.app.use(this.paths.sucursales, require('../routes/sucursal'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;