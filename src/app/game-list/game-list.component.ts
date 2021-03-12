import { tap } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Game } from 'src/models/game'
import { FirebaseService } from '../firebase.service'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Observable<Game[]>
  selectedGame: Game

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.games = this.firebaseService.getGames().pipe(tap(games=>this.selectedGame = games[0]))
  }

  select(game: Game) {
    this.selectedGame = game
  }

}

