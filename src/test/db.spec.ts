import { Diario } from "src/app/common/domain/diario";
import { Registro } from 'src/app/common/domain/registro';
import {DB} from 'src/app/common/infra/DB';
import * as moment from 'moment';
import { ObjectMapper } from 'json-object-mapper';

describe('IndexDB support', ()=>{
    it("should connect to database", ()=>{
       const db:DB = new DB("registros", "data");
       return db.open().then((d) => {
           expect(d).toBeTruthy();
       }, fail);
    });

    it("should create", ()=>{
        const diario:Diario = new Diario();
        const registro:Registro = new Registro();
        registro.data = moment();
        diario.adicionarRegistro(registro);

        const db:DB = new DB("registros", "data");
        var json = JSON.parse(<string> ObjectMapper.serialize(diario));
        console.log(json);
        return db.saveAll(json.registros).then((a)=>{
            console.log(a);
        }, fail);
     });

   
});