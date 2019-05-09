import { Registro } from "./registro";

class Diario{
    private _registros: Registro[];

    public adicionarRegistro(registro:Registro) {
        this._registros.push(registro);
    }

    public get registros(){
        return this._registros;
    }
}