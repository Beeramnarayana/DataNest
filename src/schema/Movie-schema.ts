import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'movie',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'rating', type: 'string' },
        { name: 'year', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'director', type: 'string' },

      ],
    }),
  ],
});