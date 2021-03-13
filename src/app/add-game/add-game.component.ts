import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit{

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
  key: string
  editMode = false

  constructor(private firebaseService: FirebaseService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('key')) {
      this.key = this.activatedRoute.snapshot.paramMap.get('key')
      this.editMode = true
      this.firebaseService.getBook(this.key).subscribe(
        editGame => {
          let game: Game = editGame.data()
          this.gameForm.get('title').setValue(game.title)
          this.gameForm.get('developer').setValue(game.developer)
          this.gameForm.get('year').setValue(game.year)
          this.gameForm.get('genre').setValue(game.genre)
          this.gameForm.get('platform').setValue(game.platform)
          this.gameForm.get('score').setValue(game.score)
          this.gameForm.get('logo').setValue(game.logo)
          this.gameForm.get('icon').setValue(game.icon)
        }
      )
    }
  }

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
      if (this.editMode) {
        this.firebaseService.updateGame(game, this.key).then( _ => {
          this.router.navigateByUrl('/')
        })
      } else {
        this.firebaseService.addGame(game).then( _ => {
          this.router.navigateByUrl('/')
        })
      }
    }
  }
}
