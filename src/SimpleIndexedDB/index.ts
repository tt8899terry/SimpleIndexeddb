import { deleteRecord, get, getAll, insert, update } from "./dbOperations";
import { dbInit, getDb, setupSchema, setVersion } from "./init";

export const indexedDB = {
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
