import { DB } from "../common/infra/DB";
import { Registro } from '../common/domain/registro';
import {Moment} from 'moment';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DiarioService {
    private _registroDeHoje = null;
    private db:DB = new DB();
    private static STORE = DB.DIARIO_STORE_NAME;

    public  registroDeHoje():Promise<Registro>{
       
        return new Promise((resolve, reject)=>{
            if(this._registroDeHoje != null){
                resolve(this._registroDeHoje);
            }else {
                this._registroDeHoje = new Registro();
                this.db.save(DiarioService.STORE, this._registroDeHoje).then(()=>{
                    resolve(this._registroDeHoje);
                })
            }
        })
    }

    public async getRegistro(date:Moment):Promise<Registro> {
        return await this.db.get(DiarioService.STORE, 
            date.hours(0).minutes(0).seconds(0).milliseconds(0).valueOf(), Registro);
    }
    
    public async saveRegistro(registro:Registro) {
        return await this.db.save(DiarioService.STORE, registro);
    }

    public getRegistrosDeHoje(){
        var cafe = new Registro();
        cafe.data = moment().hour(7);
        var colacao = new Registro();colacao.data = moment().hours(10).minutes(37);
        var almoco = new Registro();almoco.data = moment();
        var lanche = new Registro();lanche.data = moment().hours(15).minutes(20);
        var jantar = new Registro();jantar.data = moment().hours(18).minutes(6);
        var ceia = new Registro();ceia.data = moment().hours(22).minutes(0);
        return [
            cafe, colacao, almoco, lanche, jantar, ceia
        ]
    }
}