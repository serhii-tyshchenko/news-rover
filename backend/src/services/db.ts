import { google } from 'googleapis';
import { DEFAULT_CACHE_DURATION_MINUTES } from '../common/constants.ts';

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const serviceEmail = process.env.GOOGLE_SERVICE_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const cacheDurationMinutes = Number(
  process.env.CACHE_DURATION_MINUTES ?? DEFAULT_CACHE_DURATION_MINUTES,
);
const providersKey = 'providers';

export type Provider = Record<string, string>;

let providersCache: Provider[] | null = null;
let providersCacheTimestamp = 0;

function checkEnv() {
  if (!spreadsheetId || !serviceEmail || !privateKey) {
    throw new Error('Missing Google Sheets environment variables');
  }
}

async function authenticate() {
  checkEnv();
  const client = new google.auth.JWT({
    email: serviceEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  await client.authorize();
  return client;
}

export async function getProviders(): Promise<Provider[]> {
  const now = Date.now();
  if (
    providersCache &&
    now - providersCacheTimestamp < cacheDurationMinutes * 60 * 1000
  ) {
    return providersCache;
  }

  const auth = await authenticate();
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${providersKey}!A1:Z`,
  });
  const rows = response.data.values ?? [];

  if (rows.length === 0) {
    providersCache = [];
    providersCacheTimestamp = now;
    return providersCache;
  }

  const headers = rows[0] ?? [];
  const data = rows.slice(1);

  providersCache = data.map((row) =>
    row.reduce((acc: Provider, cell: string, index: number) => {
      const header = headers[index];
      if (header) {
        acc[header] = cell;
      }
      return acc;
    }, {}),
  );
  providersCacheTimestamp = now;
  return providersCache;
}

export async function searchProviders(query: string): Promise<Provider[]> {
  const providers = await getProviders();
  return providers.filter((provider) =>
    Object.values(provider).some((value) =>
      value.toLowerCase().includes(query.toLowerCase()),
    ),
  );
}

export async function getProviderById(id: string): Promise<Provider | null> {
  const providers = await getProviders();
  const provider = providers.find((p) => p.id === id);
  if (!provider) {
    return null;
  }
  return provider;
}

export async function getCategories(): Promise<string[]> {
  const providers = await getProviders();
  const categories = new Set<string>();
  providers.forEach((provider) => {
    if (provider.category) {
      categories.add(provider.category);
    }
  });
  return Array.from(categories);
}

export async function getCategoryProviders(
  categoryId: string,
): Promise<Provider[]> {
  const providers = await getProviders();
  return providers.filter((provider) => provider.category === categoryId);
}
