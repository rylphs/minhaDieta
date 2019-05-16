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

    private map = {};

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

    public getRegistros(data:Moment):Registro[]{
        var d = data.clone().startOf('day').valueOf();
        if(!!this.map[d]){
            return this.map[d];
        }
        var cafe = new Registro();
        cafe.data = data.clone().hour(7).minutes(Math.floor(Math.random()*59));
        var colacao = new Registro();colacao.data = data.clone().hours(10).minutes(Math.floor(Math.random()*59));
        var almoco = new Registro();almoco.data = data.clone().hours(12).minutes(Math.floor(Math.random()*59));
        var lanche = new Registro();lanche.data = data.clone().hours(15).minutes(Math.floor(Math.random()*59));
        var jantar = new Registro();jantar.data = data.clone().hours(18).minutes(Math.floor(Math.random()*59));
        var ceia = new Registro();ceia.data = data.clone().hours(22).minutes(Math.floor(Math.random()*59));
        this.map[d] = [
            cafe, colacao, almoco, lanche, jantar, ceia
        ]
        return this.map[d].slice();
    }

    public getRegistrosDeHoje(){
        return this.getRegistros(moment());
    }
}