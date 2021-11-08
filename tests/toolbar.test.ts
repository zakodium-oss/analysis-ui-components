import { test, expect } from '@playwright/test';

test('toolbar', async ({ page }) => {
  // TODO: extend page to open stories more easily.
  await page.goto(
    'http://localhost:6006/iframe.html?id=layout-toolbar--vertical-toolbar&args=&viewMode=story',
  );
  await expect(page.locator('_react=ToolbarItem')).toHaveCount(10);
});
