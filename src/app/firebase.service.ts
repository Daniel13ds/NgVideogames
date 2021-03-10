import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collection = 'games'

  constructor(private firestore: AngularFirestore) { }

  getGames() : Observable<Game[]> {
    return this.firestore.collection<Game>(this.collection).valueChanges()
  }

  addGame(game: Game) {
    return this.firestore.collection(this.collection).add(game)
  }
}
