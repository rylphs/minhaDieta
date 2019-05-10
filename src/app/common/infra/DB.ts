class DB {
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

    public save(value:any){
        var store = this.store;
        return this.open().then((db)=>{
            return new Promise<Event>((resolve, reject)=>{
               
                var store = db.transaction(this.store, 'readwrite').objectStore(this.store);
                var request = store.add(value);
                
                request.onsuccess = (event)=>{
                    resolve(event);
                };

                request.onerror = (event)=>{
                    reject(event);
                }
            });
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