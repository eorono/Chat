import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { List } from "immutable";

import { SocketService } from "./socket.service";
import { UserService } from "./user.service";

import { IRoom, ISocketItem } from "../../models";

@Injectable()
export class RoomService {
    rooms: ReplaySubject<any> = new ReplaySubject(1);
    private list: List<any> = List();

    constructor(
        private socketService: SocketService,
        private userService: UserService
    ) {
        this.socketService
            .get("room")
            .subscribe(
                (socketItem: ISocketItem) => {
                    let room: IRoom = socketItem.item;
                    let index: number = this.findIndex(room.name);
                    if (socketItem.action === "remove") {
                        // Remove
                        this.list = this.list.delete(index);
                    } else {
                        if (index === -1) {
                            // Create
                            this.list = this.list.push(room);
                        } else {
                            // Update
                            this.list = this.list.set(index, room)
                        }
                    }
                    this.rooms.next(this.list);
                },
                error => console.log(error)
            );
    }

    // Uirse a la sala
    join(name: string): void {
        for (let roomIndex in this.userService.rooms) {
            let room = this.userService.rooms[roomIndex];
            if (room.name === name) {
                return;
            }
        }
        let index = this.findIndex(name);
        if (index !== -1) {
            let room = this.list.get(index);
            this.userService.rooms.push(room);
        }
    }

    // Dejar sala
    leave(name: string) {

        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }
    }

    // Crear sala
    create(name: string) {
        this.socketService.create(name);
    }

    // Remover sala
    remove(name: string) {

        for (var i = 0; i < this.userService.rooms.length; i++) {
            let room = this.userService.rooms[i];
            if (room.name === name) {
                this.userService.rooms.splice(i, 1);
            }
        }

        // Envio de peticion para remover sala
        this.socketService.remove(name);
    }

    // Buscar sala que coincida
    private findIndex(name: string): number {
        return this.list.findIndex((room: IRoom) => {
            return room.name === name;
        });
    }
}
