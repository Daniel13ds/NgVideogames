import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { generate } from 'rxjs';
import { Game } from 'src/models/game';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {

  gameForm : FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    developer: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    platform: new FormControl('', [Validators.required]),
    score: new FormControl('', [Validators.required, Validators.pattern('[1-9]?[0-9]?(\.[0-9][0-9]?)?')]),
    year: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}')]),
    logo: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required])
  });

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  save() {
    if (this.gameForm.valid) {
      let game: Game = {
        title: this.gameForm.get('title').value,
        developer: this.gameForm.get('developer').value,
        genre: this.gameForm.get('genre').value,
        platform: this.gameForm.get('platform').value,
        score: this.gameForm.get('score').value,
        year: this.gameForm.get('year').value,
        logo: this.gameForm.get('logo').value,
        icon: this.gameForm.get('icon').value
      }
      this.firebaseService.addGame(game).then( _ => {
        this.router.navigateByUrl('/')
      })
    }
  }

}
