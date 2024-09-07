// init indexdb
import { openDB, type IDBPDatabase } from 'idb';
import type { SchemaFunc } from './type';

var db: IDBPDatabase<unknown> | null;

export let version: number = 1;
export let schemaName = 'public';

export var indexDbSupported: Function = () => {
	return window && 'indexedDB' in window;
};

let createSchema: {
	[key: string]: SchemaFunc;
} = {};

export const setupSchema = (_createSchema: { [key: string]: SchemaFunc }) => {
	createSchema = _createSchema;
};

const dbInit = async () => {
	if (!indexDbSupported()) return null;
	let indexDb = await openDB(schemaName, version, {
		upgrade(db, oldVersion, transaction, event) {
			window.idxEvent = 'upgrade';
			for (let key in createSchema) {
				createSchema[key](db);
			}
		}
	});
	return indexDb;
};

var running = false;

const dbSetup = () => {
	return async () => {
		if (!db && !running) {
			running = true;
			db = await dbInit();
		}
		running = false;
		return db;
	};
};

//TODO: add change/create schema function
// export const switchSchema = (_schemaName: string, _version: number) => {
// 	if (_schemaName) {
// 		schemaName = _schemaName;
// 		db = null;
// 	}
// 	if (_version) {
// 		version = _version;
// 		db = null;
// 	}
// };

export let getDb = dbSetup();
