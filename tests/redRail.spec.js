const { test, expect } = require('@playwright/test');

test('Flight Search functionality',
    async ({ page }) => {
        await page.goto('https://www.redbus.in/');
        await page.getByRole('link', { name: 'Book Train Tickets' }).click();

        const title = await page.title();
        const url = page.url();

        await expect(page).toHaveTitle(title);
        await expect(page).toHaveURL(url);

        await page.locator('[for="src"]').fill('Delhi');
        await page.locator('.src_search_wrapper').getByText('NDLS').first().click();
        await page.locator('[for="dst"]').fill('Lucknow');
        await page.locator('.dst_search_wrapper').getByText('GTNR').click();

        const date = new Date();
        date.setDate(date.getDate() + 100);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const week = weekNames[date.getDay()];

        await page.waitForSelector('div.home_calendar');
        await page.locator('div.home_calendar').first().dblclick();

        while (true) {
            const calendarMonthAndYear = await page.locator('div.sc-gZMcBi.fSiRuE > div:nth-child(2)').textContent();
            const monthAndYear = calendarMonthAndYear.split(' ');
            const currMonth = monthAndYear[0];
            const currYear = monthAndYear[1];

            if (year == currYear && month == currMonth) {
                break;
            }
            await page.locator('[class="sc-gqjmRU fnURhG"]').last().click();
        }
        await page.getByText(day).click();

        await page.getByText('Free Cancellation').check();
        await page.getByRole('button', { name: 'search trains' }).click();
    }
);