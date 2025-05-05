import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from '../schema/Movie-schema'; 
import Migration from '../schema/Migration-movie'; 
import movie from '../models/Movie'; 

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
  modelClasses: [movie],
});

export default database;