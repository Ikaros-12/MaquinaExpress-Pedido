import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle,IonCardSubtitle,IonCardContent,IonGrid,IonRow,IonCol } from '@ionic/angular/standalone';
import { Producto } from '../models/producto'
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonGrid,IonRow,IonCol]
})
export class MenuComponent  implements OnInit {
  listaproducto : Producto[] = [];

  //private http = inject(HttpClient);

  constructor(public http: HttpClient,public router:Router) { }

  ngOnInit() {}

  pagar(id:any):void{
    const headers = new HttpHeaders();                
    headers.set('Content-Type','application/json');
    /*.set('Access-Control-Allow-Origin', '*')   
    .set("Access-Control-Max-Age","3600")
    .set("X-Requested-With","XMLHttpRequests")
    .set("Origin","http://localhost:8100") 
    .set("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept, Authorization");*/

    var data={
      'id':1
    }

    var response=this.http.post('http://localhost:8090/pedido/pagar', data,{ "headers" : headers })
    response.subscribe(res=>{
      var json = Object(res)
      //console.log(json["sandboxInitPoint"])
      //this.router.navigateByUrl(json["sandboxInitPoint"]);
      window.open(json["sandboxInitPoint"], '_self');

    } 
      
      
    )
   


  }
}
