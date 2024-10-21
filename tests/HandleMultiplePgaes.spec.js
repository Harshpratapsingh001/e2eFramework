const { test, expect, chromium } = require('@playwright/test');

test('Handle multiple pages/windows',
    async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://www.orangehrm.com/');

        const title = await page.title();
        const url = page.url();

        await expect(page).toHaveTitle(title);
        await expect(page).toHaveURL(url);

        const windowPromise = context.waitForEvent('page');
        await page.getByText('Our Offices').click();
        const newPage = await windowPromise;

        const newTitle = await newPage.title();
        await expect(newPage).toHaveTitle(newTitle);
    }
);