import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {

  @Input() game: Game

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  delete() {
    this.firebaseService.deleteGame(this.game)
  }

  edit() {
    this.router.navigate(['/new', this.game.key])
  }

}
