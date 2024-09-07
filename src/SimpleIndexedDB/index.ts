import { deleteRecord, get, getAll, insert, update } from './dbOperations';
import { getDb, setupSchema } from './init';

export const indexedDB = {
	setupSchema,
	getDb,
	insert,
	update,
	deleteRecord,
	getAll,
	get
};
