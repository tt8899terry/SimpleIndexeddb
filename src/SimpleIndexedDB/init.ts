// init indexdb
import { openDB, type IDBPDatabase } from "idb";
import type { SchemaFunc, SchemaFuncs } from "./type";

var db: IDBPDatabase<unknown> | null;

let version: number = 1;
// do not allow change schema name unless we can figure out how to allows switch schema
let schemaName = "public";

export const setVersion = (_version: number) => {
  version = _version;
};
export var indexDbSupported: Function = () => {
  return window && "indexedDB" in window;
};

let createSchema: SchemaFuncs = {};

export const setupSchema = (_createSchema: { [key: string]: SchemaFunc }) => {
  createSchema = _createSchema;
};

export const dbInit = async () => {
  if (!indexDbSupported()) return null;
  let _createSchema = createSchema;
  let _version = version;
  if (db) {
    db.close();
    db = null;
  }
  try {
    db = await openDB(schemaName, _version, {
      // TODO: use case for upgrade(db, oldVersion, transaction, event) {
      upgrade(_db) {
        for (let key in _createSchema) {
          createSchema[key](_db);
        }
      },
    });
  } catch (err) {
    console.log(err);
  }
  return db;
};

var running = false;

const dbSetup = () => {
  return async () => {
    if (!db && !running) {
      running = true;
      await dbInit();
    }
    running = false;
    return db;
  };
};

//TODO: add change/create schema function
// export const switchSchema = (_schemaName: string, _version: number) => {
// 	if (_schemaName) {
// 		schemaName = _schemaName;
// 		db = null;
// 	}
// 	if (_version) {
// 		version = _version;
// 		db = null;
// 	}
// };

export let getDb = dbSetup();
