import { Component, ViewChild } from '@angular/core';
import { LibraryService } from '../common/services/library.service';
import { Registro } from '../common/domain/registro';
import { DiarioService } from './diario.service';
import * as moment from 'moment';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'diario.page.html',
  styleUrls: ['diario.page.scss']
})
export class DiarioPage {
  @ViewChild('slider') private slider: IonSlides;
  public registros:Registro[];
  public _dataRegistro:moment.Moment = moment();
  numbers = [0,1,2];

  _options = {initialSlide: 3, runCallbacksOnInit:false}

  constructor(private libraryService:LibraryService, private diarioService:DiarioService){
    this.registros = diarioService.getRegistrosDeHoje();
    this._dataRegistro = moment().startOf('date');
  }

  public get refeicoesBase(){
    return this.libraryService.getRefeicoesBase();
  }

  public async nextDay(){
    var proximoDia = this._dataRegistro.clone().add(1, 'days');
    var today = moment();
    
    if(proximoDia.isSameOrBefore(today, 'day')) {
      this._dataRegistro = proximoDia;
      this.registros.splice(0, this.registros.length);
      this.registros.push.apply(this.registros, this.diarioService.getRegistros(proximoDia));
     
      
      console.log(await this.slider.getActiveIndex(), this.numbers);
      //this.numbers.push(this.numbers[this.numbers.length - 1])
      this.numbers.shift();
      
      await this.slider.slidePrev(0, false);
      var n = await this.slider.getActiveIndex();
      await this.slider.slideTo(n, 0, false);
      
      
      await this.slider.update();
      console.log(await this.slider.getActiveIndex(), this.numbers, await this.slider.isEnd());
      await this.slider.update();
      // //this.registros = this.diarioService.getRegistros(proximoDia);
      
      // if(proximoDia.isSame(today, 'day')){
      //   this.slider.options.allowSlideNext = false;
      //   //this.slider.lockSwipeToNext(true);
      //   this.slider.update();
      // }
    }
  }

  public async prevDay(){
    console.log(await this.slider.getActiveIndex(), this.numbers);
    this.numbers.unshift(this.numbers[0] - 1);
    this.slider.slideNext(0, false);
    var diaAnterior = this._dataRegistro.clone().subtract(1, 'days');
    //this.slider.lockSwipeToNext(false);
    this._dataRegistro = diaAnterior;
    this.registros.splice(0, this.registros.length);
    this.registros.push.apply(this.registros, this.diarioService.getRegistros(diaAnterior));
    console.log(await this.slider.getActiveIndex(), this.numbers);
      
    this.slider.update();
  }

  public get options(){
    return this._options;
  }

  public get dataRegistro(){
    return this._dataRegistro.toDate();
  }

  public set dataRegistro(data:Date){
    this._dataRegistro = moment(data).startOf("date");
  }
}
