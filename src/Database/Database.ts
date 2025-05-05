import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from '../schema/Schema';
import User from '../models/user';

const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [User],
});

export default database;