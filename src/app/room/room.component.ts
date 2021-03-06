import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { RoomService, UserService, SocketService } from "../shared";
import { IMessage, IRoom } from "../../models";

import { MessageService } from "./message.service";

declare var require;
const styles: string = require('./room.component.scss');
const template: string = require('./room.component.html');

@Component({
    selector: 'room',
    styles: [styles],
    template
})

export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scroll') private scroll: ElementRef;
    @ViewChild('focus') private focus: ElementRef;
    @Input() room: IRoom;
    message: string = "";
    messages: IMessage[];
    private messageService: MessageService;
    private alreadyLeftChannel: boolean = false;

    constructor(
        private roomService: RoomService,
        public userService: UserService,
        public socketService: SocketService
    ) {}

    ngOnInit(): void {
        this.messageService = new MessageService(this.room.name);
        this.messageService.messages.subscribe(messages => {
            this.messages = messages;
            setTimeout( () => {
                this.scrollToBottom();
            }, 200);
        });
        this.messageService.create(this.userService.nickname, "joined the channel");
    }

      ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

        ngOnDestroy(): void {
        if (!this.alreadyLeftChannel) {
            this.leave();
        }
    }

      send(): void {
        this.messageService.create(this.userService.nickname, this.message);
        this.message = "";
    }

      leave(): void {
        this.alreadyLeftChannel = true;
        this.messageService.create(this.userService.nickname, "left the channel");
        this.roomService.leave(this.room.name);
    }

      scrollToBottom(): void {
        try {
            this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
        } catch(error) {
            console.log("ERROR:", error);
        }
    }

        eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.send();
        }
    }
}
