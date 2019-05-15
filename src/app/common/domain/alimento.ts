import { Medida } from './medida';

export class Alimento{
    private nome:string;
    private _cho:number;
    private quantidade:number;
    private medida:Medida;

    public get cho(){
        return Math.round(Math.random() * 50);
    }

    toString(){
        return this.cho + + " cho";
    }
}