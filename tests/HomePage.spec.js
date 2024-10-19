const {test, expect} = require('@playwright/test');

test('Validate Google homepage',
    async ({page}) => {
        await page.goto('https://www.google.com/');
        const title = await page.title();
        expect(title).toBe('Google');
        const url = await page.url();
        await expect(page).toHaveURL(url)
    }
);