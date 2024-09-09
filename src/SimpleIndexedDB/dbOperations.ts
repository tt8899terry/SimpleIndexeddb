// init indexdb
import { type IDBPTransaction } from "idb";
import { getDb } from "./init";

//NOTE: to use multiple store on single transaction
// let tx = db.transaction(['store1', 'store2'], 'readwrite');
// let s1 = tx.objectStore('store1');
// let s2 = tx.objectStore('store2');
// TODO:  to test all operation with transaction

//TODO: add insert transaction, please use update instead
export const insert = async (storeName: string, value: JSON | any) => {
  let _db = await getDb();
  let res = await _db?.add(storeName, value);
  return res;
};

export const update = async (
  storeName: string,
  value: JSON | any,
  tx?: IDBPTransaction<unknown, string[], "readwrite"> | null
) => {
  let _db = await getDb();
  if (tx) {
    let store = tx.objectStore(storeName);
    let res = await store.put(value);
    return res;
  }
  // we can use inline key too
  // await db.put('storeName', { inlineKeyName: 'newValue' });
  let _tx = _db?.transaction([storeName], "readwrite");
  let store = _tx?.objectStore(storeName);
  let res = await store?.put(value);
  _tx?.done;
  return res;
};

export const deleteRecord = async (
  storeName: string,
  key: IDBValidKey,
  tx?: IDBPTransaction<unknown, string[], "readwrite"> | null
) => {
  let _db = await getDb();
  if (tx) {
    let store = tx.objectStore(storeName);
    let res = await store.delete(key);
    return res;
  }
  let res = await _db?.delete(storeName, key);
  return res;
};

// TODO: add sorting
export const getAll = async (
  storeName: string,
  tx?: IDBPTransaction<unknown, string[], IDBTransactionMode> | null
) => {
  let _db = await getDb();
  if (tx) {
    let store = tx.objectStore(storeName);
    let res = await store.getAll(storeName);
    return res;
  }
  let res = await _db?.getAll(storeName);
  return res;
};

export const get = async (
  storeName: string,
  id: string | number,
  tx?: IDBPTransaction<unknown, string[], IDBTransactionMode> | null
) => {
  let _db = await getDb();
  if (tx) {
    let store = tx.objectStore(storeName);
    let res = await store.get(id);
    return res;
  }
  let res = await _db?.transaction([storeName]).objectStore(storeName).get(id);
  return res;
};
