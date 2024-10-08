# Simple Idb Easy

`Simple Idb Easy` is a straightforward npm package designed to simplify common operations with IndexedDB. It provides a clean and easy-to-use API for initializing the database, setting up schema, and performing CRUD operations.

## Features

- **Database Initialization**: `dbInit` for initializing the database.
- **Schema Setup**: `setupSchema` to define the database structure.
- **Version Management**: `setVersion` to manage database versions.
- **CRUD Operations**:
  - `insert` to add records.
  - `update` to modify existing records.
  - `deleteRecord` to remove records.
  - `get` to retrieve a single record.
  - `getAll` to fetch all records.

## Installation

To install the package, run:

```bash
npm install simple-idb-easy
```

## Usage

Here’s a basic example of how to use `simple-idb-easy` with `async/await`:

```ts
import { simpleIdb } from "simple-idb-easy";

async function example() {
  let schemas: SchemaFuncs = {
    myObjectStore: function (db: IDBPDatabase): any {
      let dbName = "myObjectStore";
      if (!db.objectStoreNames.contains(dbName)) {
        let store = db.createObjectStore(dbName, { keyPath: "id" });
      }
    },
  };

  // Set the database version
  simpleIdb.setVersion(1);

  // Set the schema
  simpleIdb.setupSchema(schemas);
  await simpleIdb.dbInit();

  // Insert a record
  await simpleIdb.insert("myObjectStore", {
    id: 1,
    name: "Sample Record",
  });

  // Update a record
  await simpleIdb.update("myObjectStore", {
    id: 1,
    name: "Updated Record",
  });

  // Get a single record
  const record = await simpleIdb.get("myObjectStore", 1);
  console.log(record);

  // Get all records
  const records = await simpleIdb.getAll("myObjectStore");
  console.log(records);

  // Delete a record
  await simpleIdb.deleteRecord("myObjectStore", 1);
}

await example();
```

## Third-Party Licenses

This project uses the following third-party packages:

- `@types/node` (https://www.npmjs.com/package/@types/node)
  Licensed under the MIT License.

- `fake-indexeddb` (https://www.npmjs.com/package/fake-indexeddb)
  Licensed under the MIT License.

- `jsdom` (https://www.npmjs.com/package/jsdom)
  Licensed under the MIT License.

- `typescript` (https://www.npmjs.com/package/typescript)
  Licensed under the Apache License 2.0.

- `vite` (https://vitejs.dev/)
  Licensed under the MIT License.

- `vite-plugin-dts` (https://www.npmjs.com/package/vite-plugin-dts)
  Licensed under the MIT License.

- `vitest` (https://vitest.dev/)
  Licensed under the MIT License.

- `idb` (https://www.npmjs.com/package/idb)
  Licensed under the ISC License.
