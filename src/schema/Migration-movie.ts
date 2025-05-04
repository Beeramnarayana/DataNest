import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    {
      toVersion: 3, 
      steps: [
        createTable({
          name: 'movie',
          columns: [
            { name: 'title', type: 'string' },
            { name: 'rating', type: 'string' },
            { name: 'year', type: 'string' },
            { name: 'director', type: 'string' },
            { name: 'genre', type: 'string' },
          ],
        }),
      ],
    },
  ],
});