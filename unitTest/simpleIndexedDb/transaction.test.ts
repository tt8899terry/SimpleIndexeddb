import { IDBPDatabase } from "idb";
import { expect, test } from "vitest";
import { simpleIdb as indexedDB } from "../../src/SimpleIndexedDB";
import { SchemaFuncs } from "../../src/SimpleIndexedDB/type";

test("simpleIndexedDb operation test ", async () => {
  const schemas: SchemaFuncs = {
    test1Schema: function (db: IDBPDatabase): any {
      let dbName = "test1Schema";
      let dbStoreNames = db.objectStoreNames;
      if (!dbStoreNames.contains(dbName)) {
        let store = db.createObjectStore(dbName, { keyPath: "id" });
      }
    },
    test2Schema: function (db: IDBPDatabase): any {
      let dbName = "test2Schema";
      let dbStoreNames = db.objectStoreNames;
      if (!dbStoreNames.contains(dbName)) {
        let store = db.createObjectStore(dbName, { keyPath: "id" });
      }
    },
  };
  indexedDB.setupSchema(schemas);
  const testDb = await indexedDB.getDb();
  expect(testDb).toBeInstanceOf(IDBDatabase);

  //test insert case success
  let test1Payload = {
    id: 1,
    name: "test 1",
  };
  let test2Payload = {
    id: 2,
    name: "test 1",
  };

  // test transaction update operation
  {
    let tx = testDb?.transaction(["test1Schema", "test2Schema"], "readwrite");
    let resTx1 = await indexedDB.update("test1Schema", test1Payload, tx);
    let resTx2 = await indexedDB.update("test2Schema", test2Payload, tx);
    tx?.done;
    expect(resTx1).toEqual(1);
    expect(resTx2).toEqual(2);
    let records = await indexedDB.getAll("test1Schema");
    expect(records?.length).toEqual(1);
    expect(records).toEqual([test1Payload]);

    records = await indexedDB.getAll("test2Schema");
    expect(records?.length).toEqual(1);
    expect(records).toEqual([test2Payload]);
  }

  // test transaction delete/get operation
  {
    let tx = testDb?.transaction(["test1Schema"], "readwrite");
    let resTx1 = await indexedDB.update("test1Schema", test1Payload, tx);
    let resTx2 = await indexedDB.deleteRecord("test1Schema", 1, tx);
    tx?.done;

    let records = await indexedDB.getAll("test1Schema");
    expect(records?.length).toEqual(0);
    expect(records).toEqual([]);
  }
});
