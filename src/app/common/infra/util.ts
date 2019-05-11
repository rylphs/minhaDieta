import { Serializer, Deserializer } from 'json-object-mapper';
import {Moment} from 'moment';
import * as moment from 'moment'


export class MomentSerializer implements Serializer, Deserializer {

    deserialize(value: any) {
        return moment(value);
    }
    serialize(value: any) {
        return (<Moment> value).valueOf();
    }

}