import { Diario } from "src/app/common/domain/diario";
import { Registro } from 'src/app/common/domain/registro';
import {DB} from 'src/app/common/infra/DB';
import * as moment from 'moment';
import { ObjectMapper } from 'json-object-mapper';

describe('IndexDB support', ()=>{
    /*var db:DB;
    beforeAll(()=>{
        db = new DB();
        db.deleteAll(DB.DIARIO_STORE_NAME);   
    });

    afterAll(()=>{
        db.deleteAll(DB.DIARIO_STORE_NAME);
    });

    it("should connect to database", ()=>{
       return db.open().then((d) => {
           expect(d).toBeTruthy();
       }, fail);
    });

    it("should save all", ()=>{
        const diario:Diario = new Diario();
        const registro:Registro = new Registro();
        registro.data = moment();
        diario.adicionarRegistro(registro);

        var json = JSON.parse(<string> ObjectMapper.serialize(diario));
    
        return db.saveAll(DB.DIARIO_STORE_NAME, diario.registros).then((a)=>{
            console.log(a);
        }, fail);
     });

     it("should get all", ()=>{
        const diario:Diario = new Diario();
        const registro:Registro = new Registro();
        registro.data = moment();
        diario.adicionarRegistro(registro);

        return db.getAll(DB.DIARIO_STORE_NAME, Registro).then((a)=>{
            console.log(a);
        }, fail);
     });*/
});