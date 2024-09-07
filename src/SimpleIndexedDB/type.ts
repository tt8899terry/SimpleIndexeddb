import type { IDBPDatabase } from "idb";

export interface SchemaFunc {
  (db: IDBPDatabase): Function;
}

export interface SchemaFuncs {
  [key: string]: SchemaFunc;
}
