const { test, expect } = require('@playwright/test');

test('Assertions',
    async ({page}) => {
        await page.goto("https://www.google.com/");

        const frame = page.frameLocator('iframe[role="presentation"]').getByText('Stay signed out');
        await frame.click();

        await expect(page).toHaveURL("https://www.google.com/");
        await expect(page).toHaveTitle("Google");
        await expect(page.getByRole('button', {name: "Google Search"})).toBeEnabled();
        
        const googleImage = page.getByAltText('Google')
        await expect(googleImage).toHaveAttribute('src');
    }
);