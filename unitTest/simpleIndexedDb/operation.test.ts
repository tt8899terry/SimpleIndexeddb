import { IDBPDatabase } from "idb";
import { expect, test } from "vitest";
import { indexedDB } from "../../src/SimpleIndexedDB";
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
  };
  indexedDB.setupSchema(schemas);
  const testDb = await indexedDB.getDb();
  expect(testDb).toBeInstanceOf(IDBDatabase);

  //test insert case success
  let testPayload1 = {
    id: 1,
    name: "test 1",
  };
  const test1Res = await indexedDB.insert("test1Schema", testPayload1);
  expect(test1Res).toEqual(1);

  //test insert case fail
  try {
    const test1ErrorRes = await indexedDB.insert("test1Schema", testPayload1);
  } catch (err) {
    expect(err).toBeInstanceOf(DOMException);
    expect(err.name).toEqual("ConstraintError");
  }

  //test insert case fail
  try {
    const test1ErrorRes = await indexedDB.insert("test1Schema1", testPayload1);
  } catch (err) {
    expect(err).toBeInstanceOf(DOMException);
    expect(err.name).toEqual("NotFoundError");
  }
});
