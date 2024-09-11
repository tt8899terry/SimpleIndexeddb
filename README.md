# Simple Indexed Bb

`Simple Indexed Db` is a straightforward npm package designed to simplify common operations with IndexedDB. It provides a clean and easy-to-use API for initializing the database, setting up schema, and performing CRUD operations.

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
npm install simple-indexed-db
```

## Usage

Here’s a basic example of how to use `Simple IndexedDb` with `async/await`:

```ts
import { SimpleIndexedDb } from "simple-indexed-db";

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
  SimpleIndexedDb.setVersion(1);

  // Set the schema
  SimpleIndexedDb.setupSchema(schemas);
  await SimpleIndexedDb.dbInit();

  // Insert a record
  await SimpleIndexedDb.insert("myObjectStore", {
    id: 1,
    name: "Sample Record",
  });

  // Update a record
  await SimpleIndexedDb.update("myObjectStore", {
    id: 1,
    name: "Updated Record",
  });

  // Get a single record
  const record = await SimpleIndexedDb.get("myObjectStore", 1);
  console.log(record);

  // Get all records
  const records = await SimpleIndexedDb.getAll("myObjectStore");
  console.log(records);

  // Delete a record
  await SimpleIndexedDb.deleteRecord("myObjectStore", 1);
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
