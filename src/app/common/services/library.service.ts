import { Refeicao } from '../domain/refeicao';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LibraryService{
    private refeicoesBase: Refeicao[] = [];

    public getRefeicoesBase(){
         if(this.refeicoesBase.length == 0) this.refeicoesBase = [
            new Refeicao("Café"),
            new Refeicao("Colação"),
            new Refeicao("Almoço"),
            new Refeicao("Lanche"),
            new Refeicao("Jantar"),
            new Refeicao("Ceia")
        ];
        return this.refeicoesBase
    }

    public getRefeicaoDeAgora(){}
}