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

  indexedDB.setupSchema(schemas);

  let init1Res = await indexedDB.dbInit();
  expect(init1Res).toBeInstanceOf(IDBDatabase);

  const testDb = await indexedDB.getDb();
  expect(testDb).toBeInstanceOf(IDBDatabase);

  //upgrade db version test
  indexedDB.setVersion(2);
  schemas["test2Schema"] = function (db: IDBPDatabase): any {
    let dbName = "test2Schema";
    if (!db.objectStoreNames.contains(dbName)) {
      let store = db.createObjectStore(dbName, { keyPath: "id" });
      store.createIndex("uniqueIndex", "id", { unique: true });
    }
  };

  indexedDB.setupSchema(schemas);
  let init2Res = await indexedDB.dbInit();
  expect(init2Res).toBeInstanceOf(IDBDatabase);

  let testPayload1 = {
    id: 1,
    name: "test 1",
  };

  const test1Res = await indexedDB.insert("test2Schema", testPayload1);
  expect(test1Res).toEqual(1);
});
