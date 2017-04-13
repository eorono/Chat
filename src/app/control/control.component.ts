import { Component } from "@angular/core";

import { RoomService } from "../shared";

import { IRoom } from "../../models";

declare var require;
const styles: string = require("./control.component.scss");
const template: string = require("./control.component.html");

@Component({
    selector: "control",
    styles: [styles],
    template
})

export class ControlComponent {
    room: string = "";
    newRoom: string = "";

    constructor(public roomService: RoomService) {}

    // Unirse a la sala, cuando se resione el boton de unirse
    join(): void {
        this.roomService.join(this.room);
    }

    // Crear sala, cuando se presiona el boton de crear sala
    create(): void {
        this.roomService.create(this.newRoom);
        this.newRoom = "";
    }

    // Remover sala, cuando se presione el boton de remover
    remove(): void {
        this.roomService.remove(this.room);
        this.room = "";
    }

      eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.create();
        }
    }
}
