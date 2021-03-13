import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collection = 'games'

  constructor(private firestore: AngularFirestore) { }

  getGames() : Observable<Game[]> {
    return this.firestore.collection<Game>(this.collection).snapshotChanges().pipe(
      map( games => {
        return games.map( book => {
          const data = book.payload.doc.data()
          const key = book.payload.doc.id
          return {key, ...data}
        })
      })
    )
  }

  getBook(key: string) {
    return this.firestore.collection<Game>(this.collection).doc(key).get()
  }

  addGame(game: Game) {
    return this.firestore.collection(this.collection).add(game)
  }

  deleteGame(game: Game) {
    return this.firestore.collection(this.collection).doc(game.key).delete()
  }

  updateGame(game: Game, key: string) {
    return this.firestore.collection<Game>(this.collection).doc(key).update(game)
  }
}
