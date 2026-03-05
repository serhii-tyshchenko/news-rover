import { expect, test } from '@playwright/test';

test('homepage loads and shows app root', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/NewsRover/i);
  await expect(page.locator('#root')).toBeVisible();
});
