import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { UserService } from "../shared";

declare var require;
const styles: string = require('./nickname.component.scss');
const template: string = require('./nickname.component.html');

@Component({
    selector: 'nickname',
    styles: [styles],
    template
})

export class NicknameComponent implements AfterViewInit {
    @ViewChild('focus') private focus: ElementRef;
    nickname: string;

    constructor(public userService: UserService) {
        this.nickname = userService.nickname;
    }

    // Despues de que la vista este inicializada, enfocarse en el nickname ingresado
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    // guradar nickname en el deposito de usuarios
    save(): void {
        this.userService.nickname = this.nickname;
    }

      eventHandler(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.save();
        }
    }
}
