import {Moment} from 'moment';
import { JsonIgnore, JsonProperty } from 'json-object-mapper';
import { MomentSerializer } from '../infra/util';
import * as moment from 'moment';
import {Refeicao} from './refeicao';
import {Afericao} from './afericao'
import {Dose} from './dose';

export class Registro{
    @JsonProperty({name:"data", deserializer:MomentSerializer, serializer:MomentSerializer})
    private _data:Moment = moment();
    public s:string = "teste";

    constructor(){
        this._data = moment().seconds(0).milliseconds(0);
        this.afericao =  new Afericao(Math.round(Math.random()*120)+80);
        this.dose = new Dose(0, Math.round(Math.random()*3));
    }

    @JsonProperty({name: "refeicao", type:Refeicao})
    private _refeicao:Refeicao = new Refeicao("Almoço");
    @JsonProperty({name: "afericao", type:Afericao})
    public afericao:Afericao = null;
    @JsonProperty({name: "dose", type:Dose})
    public dose:Dose = null;

    public get hora(){
        return this._data.format("HH:mm");
    }

    public get data(){
        return this._data;
    }

    public set data(date:Moment){
        this._data = date.seconds(0).milliseconds(0);
    }

    public get refeicao(){
        return this._refeicao;
    }
}