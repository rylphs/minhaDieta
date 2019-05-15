import { Alimento } from './alimento';

export class Refeicao {
    private horaInicio:number;
    private horaFim:number;
    private alimento:Alimento[];
    private _cho:number = null;

    constructor(private _nome:string){

    }

    public get nome(){
        return this._nome; 
    }

    public get alimentos(){
        return [new Alimento(), new Alimento];
    }

    public get cho(){
        if(this._cho) return this._cho;

        return this.alimentos.forEach((a)=>{
            this._cho += a.cho;
        })
        return this._cho;
    }

    public toString(){
        return this.cho + "\ncho";
    }
}