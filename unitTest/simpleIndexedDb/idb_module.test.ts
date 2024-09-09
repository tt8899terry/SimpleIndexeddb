import { openDB } from "idb";
import { expect, test } from "vitest";

test("test idb package is working", async () => {
  const db = await openDB("test-db", 1, {
    upgrade(db) {
      db.createObjectStore("store", { keyPath: "id" });
    },
  });

  const tx = db.transaction("store", "readwrite");
  const store = tx.objectStore("store");
  await store.add({ id: 1, name: "Test" });
  await tx.done;

  const result = await db.get("store", 1);
  expect(result).toEqual({ id: 1, name: "Test" });
});
