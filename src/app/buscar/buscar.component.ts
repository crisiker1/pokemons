import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  arrayPokemons: Array<any[]>;
  arrayPokemons_copia: Array<any[]>;
  title: any = "holi";

 

  @Input()
  nombre: any = '';

  show:boolean = false;
  loading:boolean = false;
  contenedorPokemons:boolean = true;
  

  constructor(public http: HttpClient) { }

  ngOnInit () {
      this.http.get("/pokemons/todos").subscribe((datos:Array<any[]>) =>{
      //console.log(data);
      //this.title = datos;
      this.arrayPokemons = datos;
      this.arrayPokemons_copia = datos;

    })

    
  }



  resetearPokemons(){
    this.loading=true;
    this.contenedorPokemons=false;
    this.http.get("/pokemons/reset").subscribe(() =>{
      //console.log(data);
      //this.title = datos;
      window.location.reload();
      new alert("Pokedex reiniciada");
       
    })
  }


  buscarPok(){
    this.http.get("/pokemons/contiene_nombre/" + this.nombre).subscribe((datos:Array<any[]>) =>{
      //console.log(data);
      //this.title = datos;
      console.log('scope is ' + this.nombre);
      this.arrayPokemons = datos;
      this.show=true;   
    })
  }

  verTodos(){
      //console.log(data);
      //this.title = datos;
      console.log('scope is ' + this.nombre);
      this.arrayPokemons = this.arrayPokemons_copia;
      this.show=false;   
    
  }


  eliminarPokemon(id: number){
    this.http.delete("/pokemons/eliminar/" + id).subscribe(() =>{
      //console.log(data);
      //this.title = datos;
      window.location.reload();
      console.log('scope is ' + id);
      (err) => console.log(err);
    })
  }


}
