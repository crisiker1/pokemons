import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  file: File;

  fileVacio: boolean = false;

  @Input()
  pokemon:any = {
    nombre: '',
    url: ''

  }

  pokemon_actual:any = {
    nombre: '',
    url: ''

  }

  elegido = "";


  constructor(public http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get("/pokemons/id/" + parseInt(this.route.snapshot.paramMap.get('id'))).subscribe((datos:Array<any[]>) =>{
      this.pokemon_actual = datos;
      //console.log(this.pokemon_actual.nombre);
      this.elegido = this.pokemon_actual.nombre.toUpperCase();   
    })

  }

  editPok(id: number){

    id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    



    if(this.fileVacio == true){
      let body = new FormData();
      body.append("imageFile", this.file);
      this.http.post('/pokemons/subirImagen', body).subscribe(() =>{
        (err) => console.log(err);
      })
      this.pokemon.url = "./../../assets/images/" + this.file.name;
    }
    

    

    this.http.put("/pokemons/modificar/" + id, this.pokemon).subscribe(() =>{
      
      (err) => console.log(err);
    })

    new alert("Pokemon editado correctamente");
    this.router.navigate(['/']);

  }





  fileChange(event: any) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileVacio = true;
    }
  }

}
