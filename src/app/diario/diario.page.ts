import { Component } from '@angular/core';
import { LibraryService } from '../common/services/library.service';
import { Registro } from '../common/domain/registro';
import { DiarioService } from './diario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'diario.page.html',
  styleUrls: ['diario.page.scss']
})
export class DiarioPage {
  public registros:Registro[];

  constructor(private libraryService:LibraryService, private diarioService:DiarioService){
    this.registros = diarioService.getRegistrosDeHoje();
  }
  

  public get refeicoesBase(){
    return this.libraryService.getRefeicoesBase();
  }

  public nextDay(){}

  public prevDay(){}
}
