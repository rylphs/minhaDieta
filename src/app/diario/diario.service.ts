import { DB } from "../common/infra/DB";
import { Registro } from '../common/domain/registro';
import {Moment} from 'moment';

class DiarioService {
    private _registroDeHoje = null;
    private db:DB = new DB();

    public get registroDeHoje(){
        return new Promise((resolve, reject)=>{
            if(this._registroDeHoje != null){
                resolve(this._registroDeHoje);
            }else {
                this._registroDeHoje = new Registro();
                this.db.save("diario", this._registroDeHoje).then(()=>{
                    resolve(this._registroDeHoje);
                })
            }
        })
    }

    public async getRegistro(date:Moment) {
        return await this.db.get("diario", 
            date.hours(0).minutes(0).seconds(0).milliseconds(0).valueOf());
    }
    
}