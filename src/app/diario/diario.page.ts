import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LibraryService } from '../common/services/library.service';
import { Registro } from '../common/domain/registro';
import { DiarioService } from './diario.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {IonSlides} from '@ionic/angular';
import { MatDatepickerInputEvent } from '@angular/material';
import { Diario } from '../common/domain/diario';
import { provideForRootGuard } from '@angular/router/src/router_module';

@Component({
  selector: 'app-tab1',
  templateUrl: 'diario.page.html',
  styleUrls: ['diario.page.scss']
})
export class DiarioPage {
  @ViewChild('slider') private slider: IonSlides;
  //public registros:Registro[];
  //public _dataRegistro:moment.Moment = moment();
  //numbers = [0,1,2];
  public diarios:Diario[] = [];
  public diarioAtual:Diario;
  private LAST_SLIDE = 2;
  private MIDDLE_SLIDE = 1;
  private FIRST_SLIDE = 0;

  _options = {initialSlide: 3, runCallbacksOnInit:false, pager: false}

  constructor(private libraryService:LibraryService, private diarioService:DiarioService){
    var ontem = moment().startOf('date').subtract(1, 'days');
    var diario = new Diario(ontem, diarioService.getRegistros(ontem));
    this.configurarDiarios(diario, 2);
  }

  public get refeicoesBase(){
    return this.libraryService.getRefeicoesBase();
  }

  public get ehUltimoSlide(){
    return this.diarioAtual == this.diarios[2];
  }

  public nextDay(){
    var proximoDia = this.diarioAtual.data.clone().add(1, 'days');
    var today = moment();
    
    if(proximoDia.isSameOrBefore(today, 'day')) {
      if(proximoDia.isSame(today, 'day')){
        this.diarioAtual = this.diarios[2];
        this.slider.slideTo(this.LAST_SLIDE, 0, false);
      }
      else{
        this.slider.slideTo(this.MIDDLE_SLIDE, 0, false);
        this.diarioAtual = this.diarios[2];
        proximoDia = this.diarioAtual.data.clone().add(1, 'days');
        this.diarios[0] = this.diarios[1];
        this.diarios[1] = this.diarios[2];
        this.diarios[2] = new Diario(proximoDia, this.diarioService.getRegistros(proximoDia));
      }
    }
  }

  public prevDay(){
    
    if(this.diarioAtual == this.diarios[2]){
      this.diarioAtual = this.diarios[1];
      return;
    }
    this.slider.slideTo(this.MIDDLE_SLIDE, 0, false);
    this.diarioAtual = this.diarios[0];
    var diaAnterior = this.diarioAtual.data.clone().subtract(1, 'days');

    this.diarios[2] = this.diarios[1];
    this.diarios[1] = this.diarios[0];
    this.diarios[0] = new Diario(diaAnterior, this.diarioService.getRegistros(diaAnterior));
    
  }

  public get options(){
    return this._options;
  }

  public async navigateTo( event: MatDatepickerInputEvent<Moment>){
    /*setTimeout(()=>{
      var data = event.value;
     //this.nav(data);
     this.configurarDiarios(new Diario(data, this.diarioService.getRegistros(data)));
    },0)*/
    var data = event.value;
    this.diarioAtual = new Diario(data, this.diarioService.getRegistros(data));
    this.configurarDiarios(new Diario(data, this.diarioService.getRegistros(data)));
  }

  public async nav(data:Moment){
    var today = moment();
    if(data.isSame(this.diarioAtual.data)) return;
    if(data.isAfter(this.diarioAtual.data)){
      
      if(data.isSame(today, 'day')) {
        this.slider.slideNext(400, false);
      } else { 

        this.slider.slideNext(400, false);
        setTimeout(()=>{
          this.slider.slideTo(this.MIDDLE_SLIDE, 0, false)
        }, 1000)
      }
    }
    else {
      // this.slider.slideTo(this.LAST_SLIDE, 0, false).then(()=>{
      //  this.slider.update();
      this.slider.slidePrev(400, false);
      setTimeout(()=>{
        this.slider.slideTo(this.MIDDLE_SLIDE, 0, false)
      }, 1000);
      // });
       
      //this.slider.slideTo(this.MIDDLE_SLIDE, 400, false);
      
    }
  }

  private configurarDiarios(diario:Diario, i?:number){
    var data = diario.data;
    var diaAnterior = data.clone().subtract(1, 'days');
    var diaPosterior = data.clone().add(1, 'days');
    this.diarios[0] = new Diario(diaAnterior, this.diarioService.getRegistros(diaAnterior));
    this.diarios[1] = diario;
    this.diarios[2] = new Diario(diaPosterior, this.diarioService.getRegistros(diaPosterior));
    if(!!i)
      this.diarioAtual = this.diarios[i];
    else this.diarioAtual = diario;
  }
}
