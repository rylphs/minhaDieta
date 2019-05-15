import { saveConfig } from '@ionic/core';
import { NgIf } from '@angular/common';
import { ObjectMapper } from 'json-object-mapper';
import {DB_VERSION, DBNAME} from '../../../environments/environment';

export enum STORES {
    DIARIO = "diario",
    LIBRARY = "library"
}

export type  DBStoreType = {name:string, keyName: string}

export class DB {
    public static readonly DIARIO_STORE_NAME:STORES = STORES.DIARIO;
    public static readonly LIBRARY_STORE_NAME:STORES = STORES.LIBRARY;
    private db?:IDBDatabase;
    private stores:DBStoreType[] = [
        {name:DB.DIARIO_STORE_NAME, keyName:"data"},
        {name:DB.LIBRARY_STORE_NAME, keyName:"index"}
    ]

    public static TESTE = "asdfasdf";
    
    constructor(){}

    public open(){
        return new Promise<IDBDatabase>((resolve, reject)=>{
            if(this.db != null){
                resolve(this.db);
                return;
            }
            var openRequest = window.indexedDB.open(DBNAME, DB_VERSION);
            openRequest.onerror = reject;
            openRequest.onsuccess = ()=>{
                this.db = openRequest.result;
                resolve(openRequest.result);
            };
            
            openRequest.onupgradeneeded = (event)=>{
                this.createStore(openRequest);
            }
        });
    }

    public async save(storeName:STORES, value:any){
        var jsonValue = JSON.parse(<string>ObjectMapper.serialize(value));
        await this.open();
        return new Promise<Event>((resolve, reject)=>{
            var store = this.db.transaction(storeName, 'readwrite').objectStore(storeName);
            var request = store.add(jsonValue);
            
            request.onsuccess = (event)=>{
                resolve(event);
            };

            request.onerror = (event)=>{
                reject(event);
            }
        });
    }

    public async saveAll(storeName:STORES, values:any[]){
        await this.open();
        var store = this.db.transaction(storeName, 'readwrite').objectStore(storeName);
        return new Promise((resolve, reject)=>{
            for(let i in values){
                var jsonValue = JSON.parse(<string>ObjectMapper.serialize(values[i]));
                store.add(jsonValue).onerror = reject;
            }
            resolve();
        });
    }

    public get<T>(storeName:STORES, key:any, type: new () => T):Promise<T>{
        return this.open().then((db)=>{
            return new Promise<T>((resolve, reject)=>{
               
                var store = db.transaction(storeName, 'readwrite').objectStore(storeName);
                var request = store.get(key);
                
                request.onsuccess = (event)=>{
                    var t:T = ObjectMapper.deserialize(type, request.result);
                    resolve(t);
                };

                request.onerror = (event)=>{
                    reject(event);
                }
            });
        });
    }

    public async getAll<T>(storeName:STORES, type: {new():T}):Promise<T[]>{
        await this.open();
        
        var store = this.db.transaction(storeName, 'readwrite').objectStore(storeName);
        return new Promise((resolve:(value:T[])=>any, reject)=>{
            var req = store.getAll();
            req.onsuccess = ()=>resolve(ObjectMapper.deserializeArray(type, req.result));
            req.onerror = reject;
        });
    }

    public async delete(storeName:STORES, obj:any){
        await this.open();
        
        var store = this.db.transaction(storeName, 'readwrite').objectStore(storeName);
        return new Promise((resolve, reject)=>{
            var keyName = this.stores.find((v) => v.name == storeName).keyName;
            var key = obj[keyName];
            if(!key) reject("Chave não existente");
            var req = store.delete(key);
            req.onsuccess = ()=>resolve();
            req.onerror = reject;
        });
    }

    public async deleteAll(storeName:STORES){
        await this.open();
        
        var store = this.db.transaction(storeName, 'readwrite').objectStore(storeName);
        return new Promise((resolve, reject)=>{
            var req = store.clear();
            req.onsuccess = ()=>resolve();
            req.onerror = reject;
        });
    }

    private createStore(request){
        //return new Promise((resolve, reject)=>{
            var db = request.result;
            db.onerror = function (ev) {
                console.error(ev);
            };
            for(let i in this.stores){
                var storeDef = this.stores[i];
                var store = db.createObjectStore(storeDef.name, { keyPath: storeDef.keyName });
            }
          //  resolve();
        //});
    }
}