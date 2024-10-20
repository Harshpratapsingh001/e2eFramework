const { test, expect } = require('@playwright/test');

test('Validate Google homepage',
    async ({ page }) => {
        await page.goto('https://www.google.com/');
        const title = await page.title();
        await expect(page).toHaveTitle(title);
        const url = page.url();
        await expect(page).toHaveURL(url)
    }
);

test('Handle iframe',
    async ({ page }) => {
        await page.goto('https://www.google.com/');
        const frame = page.frameLocator('iframe[role="presentation"]').getByText('Stay signed out');
        await frame.click();
    }
);