import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public _usuarioProv: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    // cambia los puntos de avance(en el proyecto son 2 ventanas asi que son dos puntos) por una barra de progreso
    this.slides.paginationType = 'progress';

    // bloquea los slides
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }

  mostrarInput(){
    this.alertCtrl.create({
      title: 'Ingrese el username',
      inputs: [{
        name: 'username',
        placeholder: 'Username'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },{
      text: 'Ingresar',
      handler: data => {
        this.verificarUsuario( data.username)
      }
    }]
    }).present();
  }


  verificarUsuario( clave: string) {
    let loading = this.loadingCtrl.create({
      content: 'Verificando'
    });

    this._usuarioProv.verificaUsuario( clave )
      .then( existe => {

        loading.dismiss();

        if(existe){

          this.slides.lockSwipes(false);
          this.slides.freeMode = true;
          this.slides.slideNext();
          this.slides.lockSwipes(true);
          this.slides.freeMode = false;
        
        } else {
          
          this.alertCtrl.create({
            title: 'Usuario incorrecto',
            subTitle: 'Intente de nuevo o hable con el administrador',
            buttons: ['Aceptar']
          }).present();
        }

      });

    loading.present();

  }

  ingresar() {
    this.navCtrl.setRoot( HomePage );
  }

}
