import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from '../schema/Movie-schema'; // Adjust the import path as necessary
import Migration from '../schema/Migration-movie'; // Adjust the import path as necessary
import Movie from '../models/Movie'; // Adjust the import path as necessary

const adapter = new SQLiteAdapter({
  schema,
  migrations: Migration,
  dbName: 'WatermelonDB', // Optional: Specify a database name
  jsi: true, // Enable JSI for better performance (if supported by your environment)
  onSetUpError: (error) => {
    console.error('Database setup error:', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Movie],
  // Removed actionsEnabled as it is not a valid property
});

export default database;