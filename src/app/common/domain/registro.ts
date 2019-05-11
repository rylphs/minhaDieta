import {Moment} from 'moment';
import { JsonIgnore, JsonProperty } from 'json-object-mapper';
import { MomentSerializer } from '../infra/util';
//import * as moment from 'moment';

export class Registro{
    @JsonProperty({name:"data", deserializer:MomentSerializer, serializer:MomentSerializer})
    private _data:Moment = null;

   /* @JsonIgnore()
    private refeicao:Refeicao;
    @JsonIgnore()
    private afericao:Afericao;
    @JsonIgnore()
    private dose:Dose;

    @JsonProperty({name: "teste"})
    teste:string = "inicial";

    public getTeste(){
        return this.teste;
    }*/

    public get data(){
        return this._data;
    }

    public set data(date:Moment){
        this._data = date;
    }
}