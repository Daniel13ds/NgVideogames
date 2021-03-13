import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  rojo: number
  verde: number
  azul: number

  constructor() {  }

  ngOnInit(): void {
    this.rojo = 255
    this.verde = 0
    this.azul = 0
    this.arcoiris()
  }

  async arcoiris() {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    while (true) {
        for (let index = 255; index >= 0; index--) {
          this.rojo--
          this.verde++
          await timer(50)
        }
        for (let index = 255; index >= 0; index--) {
          this.verde--
          this.azul++
          await timer(50)
        }
        for (let index = 255; index >= 0; index--) {
          this.azul--
          this.rojo++
          await timer(50)
        }
    }
  }

}
