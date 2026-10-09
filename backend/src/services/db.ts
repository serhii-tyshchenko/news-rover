import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, ilike, or } from 'drizzle-orm';
import { provider, providerCategory } from '../db/schema.ts';
import type { Provider, ProviderCategory } from '../db/schema.ts';

const databaseUrl = process.env.DATABASE_URL_UNPOOLED;
if (!databaseUrl) {
  throw new Error('DATABASE_URL_UNPOOLED is not set');
}

const db = drizzle(neon(databaseUrl));

export const getProviders = (): Promise<Provider[]> =>
  db.select().from(provider);

export function searchProviders(query: string): Promise<Provider[]> {
  const q = `%${query}%`;
  return db
    .select()
    .from(provider)
    .where(
      or(
        ilike(provider.name, q),
        ilike(provider.description, q),
        ilike(provider.url, q),
      ),
    );
}

export async function getProviderById(id: string): Promise<Provider | null> {
  const [row] = await db.select().from(provider).where(eq(provider.id, id));
  return row ?? null;
}

export const getCategories = (): Promise<ProviderCategory[]> =>
  db.select().from(providerCategory);

export const getCategoryProviders = (categoryId: string): Promise<Provider[]> =>
  db.select().from(provider).where(eq(provider.categoryId, categoryId));
