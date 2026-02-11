const { google } = require('googleapis');
const { DEFAULT_CACHE_DURATION_MINUTES } = require('../common/constants');

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const serviceEmail = process.env.GOOGLE_SERVICE_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const CACHE_DURATION_MINUTES =
  process.env.CACHE_DURATION_MINUTES ?? DEFAULT_CACHE_DURATION_MINUTES;

let providersCache = null;
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

async function getProviders() {
  const now = Date.now();
  if (
    providersCache &&
    now - providersCacheTimestamp < CACHE_DURATION_MINUTES * 60 * 1000
  ) {
    return providersCache;
  }
  const auth = await authenticate();
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'providers!A1:Z',
  });
  const headers = response.data.values[0];
  const data = response.data.values.slice(1);
  providersCache = data.map((row) =>
    row.reduce((acc, cell, index) => {
      acc[headers[index]] = cell;
      return acc;
    }, {})
  );
  providersCacheTimestamp = now;
  return providersCache;
}

async function searchProviders(query) {
  const providers = await getProviders();
  return providers.filter((provider) =>
    Object.values(provider).some((value) =>
      value.toLowerCase().includes(query.toLowerCase())
    )
  );
}

async function getProviderById(id) {
  const providers = await getProviders();
  const provider = providers.find((p) => p.id === id);
  if (!provider) {
    return null;
  }
  return provider;
}

async function getCategories() {
  const providers = await getProviders();
  const categories = new Set();
  providers.forEach((provider) => {
    if (provider.category) {
      categories.add(provider.category);
    }
  });
  return Array.from(categories);
}

async function getCategoryProviders(categoryId) {
  const providers = await getProviders();
  return providers.filter((provider) => provider.category === categoryId);
}

module.exports = {
  getProviders,
  getProviderById,
  searchProviders,
  getCategories,
  getCategoryProviders,
};
