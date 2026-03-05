import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('navigates across providers, settings, and bookmarks pages', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('No providers added.')).toBeVisible();
  await page.getByRole('link', { name: 'Add' }).click();
  await expect(page).toHaveURL(/\/providers$/);

  await page.getByRole('button', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/\/settings$/);
  await expect(
    page.getByRole('heading', { name: 'Settings', level: 2 }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Bookmarks' }).click();
  await expect(page).toHaveURL(/\/bookmarks$/);
  await expect(page.getByText('No bookmarks')).toBeVisible();
});
