import { expect, test } from '@playwright/test';

const enableFirstProvider = async (page: import('@playwright/test').Page) => {
  await page.goto('/providers');
  await page.getByRole('button', { name: 'Show provider' }).first().click();
  await page.getByRole('link', { name: 'NewsRover' }).click();
  await expect(page).toHaveURL(/\/$/);
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
  });
});

test('shows provider card controls and can hide provider from home', async ({ page }) => {
  await enableFirstProvider(page);

  await expect(page.getByRole('button', { name: 'Refresh' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'View mode' }).first()).toBeVisible();

  const hideProviderButton = page.getByRole('button', { name: 'Hide provider' }).first();
  await expect(hideProviderButton).toBeVisible();
  await hideProviderButton.click();

  await expect(page.getByText('No providers added.')).toBeVisible();
});

test('shows no-news state and disables view mode when provider has no items', async ({ page }) => {
  await page.route('**/providers/*/news?*', async (route) => {
    if (route.request().resourceType() === 'document') {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [], count: 0 }),
    });
  });

  await enableFirstProvider(page);

  await expect(page.getByText('No news')).toBeVisible();
  await expect(page.getByRole('button', { name: 'View mode' }).first()).toBeDisabled();
});
