export class Dose{

    constructor(private _basal:number, private _rapida:number){}

    public toString(){
        return this._basal + "U\n" + this._rapida + "U"
    }
}