import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, ilike, or } from 'drizzle-orm';
import { provider, providerCategory } from '../db/schema.ts';
import type { Provider, ProviderCategory } from '../db/schema.ts';

let db: ReturnType<typeof drizzle> | undefined;

function getDb() {
  if (!db) {
    const databaseUrl = process.env.DATABASE_URL_UNPOOLED;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL_UNPOOLED is not set');
    }
    db = drizzle(neon(databaseUrl));
  }
  return db;
}

export const getProviders = (): Promise<Provider[]> =>
  getDb().select().from(provider);

export function searchProviders(query: string): Promise<Provider[]> {
  const q = `%${query}%`;
  return getDb()
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
  const [row] = await getDb()
    .select()
    .from(provider)
    .where(eq(provider.id, id));
  return row ?? null;
}

export const getCategories = (): Promise<ProviderCategory[]> =>
  getDb().select().from(providerCategory);

export const getCategoryProviders = (categoryId: string): Promise<Provider[]> =>
  getDb().select().from(provider).where(eq(provider.categoryId, categoryId));
