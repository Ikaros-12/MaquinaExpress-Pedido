import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle,IonCardSubtitle,IonCardContent,IonGrid,IonRow,IonCol } from '@ionic/angular/standalone';
import { Producto } from '../models/producto'
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonGrid,IonRow,IonCol]
})
export class MenuComponent  implements OnInit {
  listaproducto : Producto[] = [];
  status="";
  url="";
  //private http = inject(HttpClient);

  constructor(public http: HttpClient,private _route: ActivatedRoute,private toastController: ToastController) { 
    this.status=this._route.snapshot.paramMap.get('status')||""
    this.url=this._route.snapshot.paramMap.get('url')||""
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Gracias por su compra!!!!',
      duration: 1500,
      position: 'bottom',
      color:'success'
    });

    await toast.present();
  }

  async faileToast() {
    const toast = await this.toastController.create({
      message: 'ERROR comprar rechazada vuelva a intentar!!!!',
      duration: 1500,
      position: 'bottom',
      color:'danger'
    });

    await toast.present();
  }


  ngOnInit() {
    this.getMenu()

    if (this.status=="success"){
      this.presentToast();
    }
    if (this.status=="failure"){
      this.faileToast();
    }
  }

  pagar(id:any):void{
    const headers = new HttpHeaders();                
    headers.set('Content-Type','application/json');
    /*.set('Access-Control-Allow-Origin', '*')   
    .set("Access-Control-Max-Age","3600")
    .set("X-Requested-With","XMLHttpRequests")
    .set("Origin","http://localhost:8100") 
    .set("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept, Authorization");*/

    var data={
      'id':id
    }

    var response=this.http.post('http://192.168.1.225:8090/pedido/pagar', data,{ "headers" : headers })
    response.subscribe(res=>{
      console.log(json)
      var json = Object(res)
      console.log(json)
      //this.router.navigateByUrl(json["sandboxInitPoint"]);
      window.open(json["initPoint"], '_self');
    }    
    )
  }

  getMenu():void{
    const headers = new HttpHeaders();                
    headers.set('Content-Type','application/json');

    var response=this.http.get<Producto[]>('http://192.168.1.225:8090/pedido/menu/'+this.url,{ "headers" : headers })
    response.subscribe(res=>{
      this.listaproducto=res
    }    
    )
  }
}
