import { Diario } from "src/app/common/domain/diario";
import { Registro } from 'src/app/common/domain/registro';
import {DB} from 'src/app/common/infra/DB';
import * as moment from 'moment';
import { ObjectMapper } from 'json-object-mapper';
import { DiarioService } from 'src/app/diario/diario.service';

describe('Diario Service', ()=>{
    var service:DiarioService;

    beforeAll(()=>{
        var db = new DB();
        db.deleteAll(DB.DIARIO_STORE_NAME);
        service = new DiarioService();
    });
   
    it("should save today's registro", async ()=> {
        var registro = await service.registroDeHoje();
        var registro2 = await service.getRegistro(moment());
        expect(registro).toBeTruthy();
        expect(registro.data.unix()).toBe(registro2.data.unix());
    });

  
});