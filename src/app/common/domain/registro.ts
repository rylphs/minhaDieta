import {Moment} from 'moment';
import { JsonIgnore, JsonProperty } from 'json-object-mapper';
import { MomentSerializer } from '../infra/util';
import * as moment from 'moment';

export class Registro{
    @JsonProperty({name:"data", deserializer:MomentSerializer, serializer:MomentSerializer})
    private _data:Moment = moment();

    constructor(){
        this._data = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
    }

    @JsonProperty({name: "refeicao", type:Refeicao})
    private refeicao:Refeicao = null;
    @JsonProperty({name: "afericao", type:Afericao})
    private afericao:Afericao = null;
    @JsonProperty({name: "dose", type:Dose})
    private dose:Dose = null;

    public get data(){
        return this._data;
    }

    public set data(date:Moment){
        this._data = date.hours(0).minutes(0).seconds(0).milliseconds(0);
    }
}