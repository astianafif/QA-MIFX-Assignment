const { test, expect } = require('@playwright/test');

test.describe('UI Automation Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('Verify Login UI elements are visible', async ({ page }) => {
        // Check fields
        const usernameField = page.locator('[data-test="username"]');
        const passwordField = page.locator('[data-test="password"]');
        const loginButton = page.locator('[data-test="login-button"]');
        await expect(usernameField).toBeVisible();
        await expect(passwordField).toBeVisible();
        await expect(loginButton).toBeVisible();

        // Check field placeholder
        await expect(usernameField).toHaveAttribute('placeholder', 'Username');
        await expect(passwordField).toHaveAttribute('placeholder', 'Password');
    });

    test('Valid login with correct credentials', async ({ page }) => {
        // Valid login 
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Verify login function
        await expect(page).toHaveURL(/.*inventory.html/);
        const productHeader = page.locator('.title');
        await expect(productHeader).toHaveText('Products');
    });

    test('Logout Test', async ({ page }) => {
        // Login to the dashboard page
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Click the Hamburger Menu and click Logout
        await page.click('#react-burger-menu-btn');
        await page.locator('[data-test="logout-sidebar-link"]').click();

        // Verification: Check if we are back on the login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        const loginButton = page.locator('[data-test="login-button"]');
        await expect(loginButton).toBeVisible();
    });
    const invalidCase = [
    { scenario: 'Invalid Username', user: 'user', pass: 'secret_sauce', msg: 'Username and password do not match' },
    { scenario: 'Invalid Pass', user: 'standard_user', pass: '123', msg: 'Username and password do not match' },
    { scenario: 'Blank Username', user: '', pass: 'secret_sauce', msg: 'Username is required' },
    { scenario: 'Blank Password', user: 'standard_user', pass: '', msg: 'Password is required' },
    ];

    for (const data of invalidCase) {
    test(`Invalid case - ${data.scenario}: ${data.msg}`, async ({ page }) => {
        
        if (data.user) await page.locator('[data-test="username"]').fill(data.user);
        if (data.pass) await page.locator('[data-test="password"]').fill(data.pass);
        
        await page.locator('[data-test="login-button"]').click();

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText(data.msg);
    });
    }
    test('Direct access to dashboard', async ({ page }) => {
        // Attempt to navigate directly to dashboard URL
        await page.goto('https://www.saucedemo.com/inventory.html');

        // Check if URL is redirected back to login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');

        // Verify error message 
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();

    });
});