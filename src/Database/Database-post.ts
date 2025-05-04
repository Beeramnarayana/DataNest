import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from '../schema/Post-schema';
import Migration from '../schema/Migration';
import Post from '../models/post';

const adapter = new SQLiteAdapter({
  schema,
  migrations: Migration,
  dbName: 'WatermelonDB', 
  jsi: true, 
  onSetUpError: (error) => {
    console.error('Database setup error:', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Post],
});

export default database;