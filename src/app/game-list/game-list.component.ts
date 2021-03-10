import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Observable<Game[]>
  
  constructor(private firebaseService: FirebaseService) {
    this.games = firebaseService.getGames()
  }

  ngOnInit(): void {
  }

}
