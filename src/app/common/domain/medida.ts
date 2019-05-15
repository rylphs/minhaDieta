export class Medida {
    private qtde: number;

    constructor(private _name:string, private label: string) { }

    public get name(){return this._name}

    public set value(v: number) { 
        this.qtde = v;
    }

    toString() {
        return this.qtde + this.label;
    }
}

class GRAMA extends Medida { 
    constructor() {
        super("grama", "g");
    }
}

class COLHER extends Medida { 
    constructor() {
        super("colher", "col");
    }
}

class Medidas {
    static get GRAMA() {
        return new GRAMA();
    }

    static get COLHER() {
        return new COLHER();
    }

    get medidas(){
        return [Medidas.GRAMA, Medidas.COLHER];
    }
}