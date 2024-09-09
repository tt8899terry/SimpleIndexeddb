import { IDBPDatabase } from "idb";
import { expect, test } from "vitest";
import { indexedDB } from "../../src/SimpleIndexedDB";
import { SchemaFuncs } from "../../src/SimpleIndexedDB/type";

test("simpleIndexedDb init", async () => {
  let schemas: SchemaFuncs = {
    test1Schema: function (db: IDBPDatabase): any {
      let dbName = "test1Schema";
      if (!db.objectStoreNames.contains(dbName)) {
        let store = db.createObjectStore(dbName, { keyPath: "id" });
        store.createIndex("uniqueIndex", "id", { unique: true });
      }
    },
  };

  {
    indexedDB.setupSchema(schemas);
    let init1Res = await indexedDB.dbInit();
    expect(init1Res).toBeInstanceOf(IDBDatabase);

    expect(init1Res?.objectStoreNames).toEqual(Object.keys(schemas));

    const testDb = await indexedDB.getDb();
    expect(testDb).toBeInstanceOf(IDBDatabase);
  }

  //upgrade db version test
  {
    indexedDB.setVersion(2);
    schemas = {
      test1Schema: function (db: IDBPDatabase): any {
        let dbName = "test1Schema";
        if (!db.objectStoreNames.contains(dbName)) {
          let store = db.createObjectStore(dbName, { keyPath: "id" });
          store.createIndex("uniqueIndex", "id", { unique: true });
        }
      },
      test2Schema: function (db: IDBPDatabase): any {
        let dbName = "test2Schema";
        if (!db.objectStoreNames.contains(dbName)) {
          let store = db.createObjectStore(dbName, { keyPath: "id" });
        }
      },
    };

    indexedDB.setupSchema(schemas);
    let init2Res = await indexedDB.dbInit();
    expect(init2Res).toBeInstanceOf(IDBDatabase);

    expect(init2Res?.objectStoreNames).toEqual(Object.keys(schemas));

    let test1Payload = {
      id: 1,
      name: "test 1",
    };

    const test1Res = await indexedDB.insert("test1Schema", test1Payload);
    expect(test1Res).toEqual(1);
    const test2Res = await indexedDB.insert("test2Schema", test1Payload);
    expect(test2Res).toEqual(1);
  }
});
