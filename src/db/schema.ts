import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const tasks = sqliteTable('tasks', {
  id: integer('id', { mode: 'number' })
    .primaryKey({ autoIncrement: true }),
  name: text('name')
    .notNull(),
  done: integer('done', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => new Date()),
});

export const selectTaskSchema = createSelectSchema(tasks);

export const insertTaskSchema = createInsertSchema(tasks, {
  name: schema => schema.name.min(1).max(500),
}).required({
  done: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
