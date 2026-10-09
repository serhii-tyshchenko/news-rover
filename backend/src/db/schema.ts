import { pgTable, text } from 'drizzle-orm/pg-core';

export const providerCategory = pgTable('provider_category', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

export const provider = pgTable('provider', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  categoryId: text('category_id')
    .notNull()
    .references(() => providerCategory.id),
  url: text('url').notNull(),
  description: text('description'),
  logo: text('logo'),
  language: text('language'),
});

export type Provider = typeof provider.$inferSelect;
export type ProviderCategory = typeof providerCategory.$inferSelect;
