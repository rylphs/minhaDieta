import { Registro } from "./registro";
import {JsonProperty} from "json-object-mapper";

export class Diario{
    @JsonProperty({type: Registro, name: "registros"})
    private _registros: Registro[] = [];

    public adicionarRegistro(registro:Registro) {
        this._registros.push(registro);
    }

    public get registros(){
        return this._registros;
    }
}