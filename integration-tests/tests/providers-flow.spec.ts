import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });
});

test('adds a provider from providers page and removes empty state on home', async ({ page }) => {
  await page.goto('/providers');

  const showProviderButtons = page.getByRole('button', { name: 'Show provider' });
  await expect(showProviderButtons.first()).toBeVisible();
  await showProviderButtons.first().click();

  await page.getByRole('link', { name: 'NewsRover' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText('No providers added.')).toHaveCount(0);
});
