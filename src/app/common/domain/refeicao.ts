import { Alimento } from './alimento';

export class Refeicao {
    private horaInicio:number;
    private horaFim:number;
    private _alimentos:Alimento[];
    private _cho:number = null;

    constructor(private _nome:string){
        this._alimentos = [new Alimento(), new Alimento]
        this._alimentos.forEach((a)=>{
            this._cho += a.cho;
        })
    }

    public get nome(){
        return this._nome; 
    }

    public get cho(){
        return this._cho;
    }

    public toString(){
        return this.cho + "\ncho";
    }
}