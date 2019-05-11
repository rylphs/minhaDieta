import { Diario } from "src/app/common/domain/diario";
import { Registro } from 'src/app/common/domain/registro';
import {DB} from 'src/app/common/infra/DB';
import * as moment from 'moment';
import { ObjectMapper } from 'json-object-mapper';

describe('IndexDB support', ()=>{
    var db:DB;
    const dbName = "testDB";
    const storeName = "testStore";
    const version = 4;
    beforeAll(()=>{
        db = new DB(dbName, [{name:storeName, keyName: "data"}], version);
        db.deleteAll(storeName);   
    });

    afterAll(()=>{
        db.deleteAll(storeName);
    });

    it("should connect to database", ()=>{
       return db.open().then((d) => {
           expect(d).toBeTruthy();
       }, fail);
    });

    it("should create", ()=>{
        const diario:Diario = new Diario();
        const registro:Registro = new Registro();
        registro.data = moment();
        diario.adicionarRegistro(registro);

        var json = JSON.parse(<string> ObjectMapper.serialize(diario));
    
        return db.saveAll(storeName, diario.registros).then((a)=>{
            console.log(a);
        }, fail);
     });

     it("should get all", ()=>{
        const diario:Diario = new Diario();
        const registro:Registro = new Registro();
        registro.data = moment();
        diario.adicionarRegistro(registro);

        return db.getAll(storeName, Registro).then((a)=>{
            console.log(a);
        }, fail);
     });
});