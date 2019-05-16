import { Registro } from "./registro";
import {JsonProperty} from "json-object-mapper";
import { Moment } from 'moment';

export class Diario{
    constructor(private _data:Moment, private _registros:Registro[]){

    }

    public adicionarRegistro(registro:Registro) {
        this._registros.push(registro);
    }

    public get registros(){
        return this._registros;
    }

    public get data(){
        return this._data;
    }

    public get formatedDate(){
        return this._data.clone().locale("pt-BR").format("dddd, D [de] MMMM");
      }
}