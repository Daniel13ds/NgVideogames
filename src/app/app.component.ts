import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  games: Observable<Game[]>
  constructor(private firebaseService: FirebaseService) {
    this.games = firebaseService.getGames()
  }
}
