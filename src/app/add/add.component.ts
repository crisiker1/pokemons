import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {



  file: File;

  @Input()
  pokemon:any = {
    nombre: '',
    url: ''

  }

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  addPok(){

    let body = new FormData();
    body.append("imageFile", this.file);
    this.http.post('/pokemons/subirImagen', body).subscribe(() =>{
      (err) => console.log(err);
    })

    this.pokemon.url = "./../../assets/images/" + this.file.name;

    this.http.post("/pokemons", this.pokemon).subscribe(() =>{
      (err) => console.log(err);
    })

    new alert("Pokemon añadido correctamente");
    this.router.navigate(['/']);

  }





  fileChange(event: any) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }


}
