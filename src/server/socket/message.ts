import { IMessage, Message } from "../../models";

export class MessageSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;

    constructor(io: any, private room: string) {
        this.nsp = io.of("/messages/" + encodeURIComponent(this.room));
        this.nsp.on("connection", (socket: any) => {
            console.log("Client connected to room:", this.room);
            this.socket = socket;
            this.listen();
        });
    }

    // Agregar señal
    private listen(): void {
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("create", (message: IMessage) => this.create(message));
        this.socket.on("list", () => this.list());
    }

    // Desconexion
    private disconnect(): void {
        console.log("Client disconnected from room:", this.room);
    }

    // Crear mensaje en la sala
    private create(message: IMessage): void {
        Message.create(message, (error: any, message: IMessage) => {
            if (!error && message) {
                this.nsp.emit("create", message);
            }
        });
    }

    // Listar todos los mensajes de la sala
    private list(): void {
        if (this.socket && this.socket.connected) {
            Message
                .find({ room: this.room }) // buscar los mensajes de esta sala
                .sort({ created: -1 }) // ordenar las mensajes mas nuevos primero
                .limit(25) // Limitado a los primeros 25
                .exec(
                    (error: any, messages: IMessage[]) => {
                        for (let message of messages.reverse()) {
                            this.socket.emit("create", message);
                        }
                    }
                );
        }
    }
}
