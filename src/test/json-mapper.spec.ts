import { ObjectMapper, JsonProperty } from "json-object-mapper";
import {Diario} from  "../app/common/domain/diario";
import { Registro } from 'src/app/common/domain/registro';
import * as moment from 'moment';


describe('MomentJs serialization/deserialization support', () => {
   
   
    it('should serialize Moment js objects', () => {
        var now = new Date();

        const diario:Diario = new Diario();
        const registro:Registro = new Registro();
        registro.data = moment();
        diario.adicionarRegistro(registro);
   
      const json:string = <string>ObjectMapper.serialize(diario);

      expect(JSON.parse(json).registros[0].data).toBe(registro.data.valueOf());
    });

    it('should deserialize Moment js objects', () => {
        var now = new Date();
   
      const json = {
        registros: [{
            data: now.getTime()
        }]
      }

      const diario = ObjectMapper.deserialize(Diario, json);

      expect(diario.registros[0].data.valueOf()).toBe(now.getTime());
    });

});