import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
  });
});

test('persists autorefresh toggle state after reload', async ({ page }) => {
  await page.goto('/settings');

  const autorefreshToggle = page.getByRole('checkbox', { name: 'Autorefresh' });
  const initialState = await autorefreshToggle.isChecked();

  await autorefreshToggle.click();
  if (initialState) {
    await expect(autorefreshToggle).not.toBeChecked();
  } else {
    await expect(autorefreshToggle).toBeChecked();
  }

  await page.reload();
  const persistedToggle = page.getByRole('checkbox', { name: 'Autorefresh' });
  if (initialState) {
    await expect(persistedToggle).not.toBeChecked();
  } else {
    await expect(persistedToggle).toBeChecked();
  }
});

test('renders key settings controls', async ({ page }) => {
  await page.goto('/settings');

  await expect(page.getByRole('heading', { name: 'Settings', level: 2 })).toBeVisible();
  await expect(page.getByTitle('Change theme')).toBeVisible();
  await expect(page.getByTitle('Change language')).toBeVisible();
});
