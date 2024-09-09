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
  let test1Payload = {
    id: 1,
    name: "test 1",
  };

  const test1Res = await indexedDB.insert("test1Schema", test1Payload);
  expect(test1Res).toEqual(1);

  //test insert case fail constraint
  try {
    const test1ErrorRes = await indexedDB.insert("test1Schema", test1Payload);
  } catch (err) {
    expect(err).toBeInstanceOf(DOMException);
    expect(err.name).toEqual("ConstraintError");
  }

  //test insert case fail not found schema
  try {
    const test1ErrorRes = await indexedDB.insert("test1Schema1", test1Payload);
  } catch (err) {
    expect(err).toBeInstanceOf(DOMException);
    expect(err.name).toEqual("NotFoundError");
  }

  let records = await indexedDB.getAll("test1Schema");
  expect(records?.length).toEqual(1);
  expect(records).toEqual([test1Payload]);

  test1Payload.name = "test 1 update";

  let res = await indexedDB.update("test1Schema", test1Payload);
  expect(res).toEqual(1);

  records = await indexedDB.getAll("test1Schema");
  expect(records?.length).toEqual(1);
  expect(records).toEqual([test1Payload]);

  const test2Payload = {
    id: 2,
    name: "test 2",
  };

  {
    res = await indexedDB.insert("test1Schema", test2Payload);
    expect(res).toEqual(2);

    records = await indexedDB.getAll("test1Schema");
    expect(records?.length).toEqual(2);
    expect(records).toEqual([test1Payload, test2Payload]);

    let record = await indexedDB.get("test1Schema", 2);
    expect(record).toEqual(test2Payload);
  }
  // test delete 1
  {
    await indexedDB.deleteRecord("test1Schema", 1);
    let record = await indexedDB.get("test1Schema", 2);
    expect(record).toEqual(test2Payload);
  }

  //test record 1 is not deleted
  {
    let record = await indexedDB.get("test1Schema", 1);
    expect(record).toEqual(undefined);
  }

  // test delete 2
  {
    await indexedDB.deleteRecord("test1Schema", 2);

    let record = await indexedDB.get("test1Schema", 2);
    expect(record).toEqual(undefined);
  }

  //delete all data, test get all data
  {
    let records = await indexedDB.getAll("test1Schema");
    expect(records?.length).toEqual(0);
    expect(records).toEqual([]);
  }
});
