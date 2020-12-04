import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  nombre_download: any = '';

  file: File;

  @Input()

  pokemon:any = {
    nombre: '',
    url: ''

  }



  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    //const AWS = require('aws-sdk');
    //const AwsService = window.AWS;
    //AwsService.config.accessKeyId = 'AKIAI2XGFZJTESKTXTZA';
    //AwsService.config.secretAccessKey = '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';
    //AwsService.config.region = 'us-east-1';
    //console.log(AwsService);
    //this.s3 = new AwsService.S3();

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

    /*
    this.nombre_download = this.file.name;
    this.http.get("/pokemons/downloadImagen/" + this.nombre_download).subscribe((datos_d:File) =>{
      console.log(datos_d);
      //this.title = datos;
      

    })
    */


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
