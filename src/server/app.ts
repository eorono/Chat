import * as express from "express";
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import * as mongoose from "mongoose";

import { RoomSocket } from "./socket";

declare var process, __dirname;

class Server {
    public app: any;
    private server: any;
    private io: any;
    private mongo: any;
    private root: string;
    private port: number;

    // Bootstrap the application.
    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        // Crear aplicacion expressjs
        this.app = express();

        // Configurar applicacion
        this.config();

        // Configurar rutas
        this.routes();

        // Crear servidor
        this.server = http.createServer(this.app);

        // Crear conexiones a la base de datos
        this.databases();

        // Manejo de los websockets
        this.sockets();

        // Iniciar escucha
        this.listen();
    }

    // Configurar
    private config(): void {
        // Por default el puerto sera 5000
        this.port = process.env.PORT || 5000;

        // Dirrecion root ../../target
        this.root = path.join(path.resolve(__dirname, '../../target'));

    }

    // Configurar rutas
    private routes(): void {
        let router: express.Router;
        router = express.Router();

        // Estaticos
        this.app.use('/assets', serveStatic(path.resolve(this.root, 'assets')));

        // Establecer ruta al servidor index.html (e.g. single page app)
        router.get('/', (request: express.Request, result: express.Response) => {
            result.sendFile(path.join(this.root, '/index.html'));
        });

        // Establecer la ruta default para que la use la app

        this.app.use('*', router);
    }

    // Configurar base de datos
    private databases(): void {
        // MongoDB URL
        let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/chat';

        // Obtener manejadres de MongoDB
        this.mongo = mongoose.connect(mongoDBUrl);
    }

    // Configurar sockets
    private sockets(): void {
        // Obtener manejador de socket.io
        this.io = socketIo(this.server);
        let roomSocket = new RoomSocket(this.io);
    }

    // Iniciar escucha del servidor HTTP
    private listen(): void {

        this.server.listen(this.port);

        //agregar manejador de errores
        this.server.on("error", error => {
            console.log("ERROR", error);
        });

        //Iniciar escucha en puerto
        this.server.on("listening", () => {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', this.port, this.port);
        });

    }
}

// Bootstrap the server
let server = Server.bootstrap();
export = server.app;
