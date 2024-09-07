import type { IDBPDatabase } from 'idb';

export interface SchemaFunc {
	(db: IDBPDatabase): any;
}
