import { saveConfig } from '@ionic/core';

export class DB {
    private db?:IDBDatabase;
    private dbName = "myDiet";
    private databaseVersion = 1;
    
    constructor(private store:string, private keyName: string){}

    public open(){
        return new Promise<IDBDatabase>((resolve, reject)=>{
            if(this.db != null){
                resolve(this.db);
                return;
            }
            var openRequest = window.indexedDB.open(this.dbName, this.databaseVersion);
            openRequest.onerror = reject;
            openRequest.onsuccess = ()=>{
                this.db = openRequest.result;
                resolve(openRequest.result);
            };
            openRequest.onupgradeneeded = this.createDB.bind(this);
        });
    }

    public async save(value:any){
        await this.open();
        return new Promise<Event>((resolve, reject)=>{
        
            var store = this.db.transaction(this.store, 'readwrite').objectStore(this.store);
            var request = store.add(value);
            
            request.onsuccess = (event)=>{
                resolve(event);
            };

            request.onerror = (event)=>{
                reject(event);
            }
        });
    }

    public async saveAll(values:any[]){
        return new Promise<Event>((resolve, reject)=>{
            for(let i in values){
                let value = values[i];
                this.save(value).catch(reject)
            }
            resolve();
        });
    }

    public get(key:any){
        return this.open().then((db)=>{
            return new Promise<Event>((resolve, reject)=>{
               
                var store = db.transaction(this.store, 'readwrite').objectStore(this.store);
                var request = store.get(key);
                
                request.onsuccess = (event)=>{
                    resolve(request.result);
                };

                request.onerror = (event)=>{
                    reject(event);
                }
            });
        });
    }

    private createDB(event:any){
        var db = event.target.result;
        db.onerror = function () {
            console.error(db.errorCode);
        };
        var store = db.createObjectStore(this.store, { keyPath: this.keyName });
    }
}