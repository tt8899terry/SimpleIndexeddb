import { deleteRecord, get, getAll, insert, update } from "./dbOperations";
import { dbInit, getDb, setupSchema, setVersion } from "./init";
import type {
  SchemaFunc as importSchemaFunc,
  SchemaFuncs as importSchemaFuncs,
} from "./type";

export const simpleIdb = {
  setVersion,
  setupSchema,
  dbInit,
  getDb,
  insert,
  update,
  deleteRecord,
  getAll,
  get,
};

export type SchemaFuncs = importSchemaFuncs;
export type SchemaFunc = importSchemaFunc;
