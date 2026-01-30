import { test, expect } from '@playwright/test';

test('Full Teacher Registration and Login Flow', async ({ page, request }) => {
    const testIin = `99${Math.floor(Math.random() * 10000000000)}`;
    const testEmail = `test_${testIin}@example.com`;

    // 1. Simulate Google Form Webhook Submission
    console.log(`Registering teacher with IIN: ${testIin}`);
    const webhookResponse = await request.post('http://localhost:3001/webhook/google-form', {
        headers: {
            'x-webhook-secret': 'super-secret-key',
            'x-test-mode': 'true'
        },
        data: {
            fullName: 'E2E Test Teacher',
            iin: testIin,
            email: testEmail,
            phone: '87771234567',
            subject: 'Mathematics',
            currentWorkplace: 'E2E Test School',
            totalExperience: '5'
        }
    });

    expect(webhookResponse.ok()).toBeTruthy();
    const webhookData = await webhookResponse.json();
    const tempPassword = webhookData.tempPassword;
    expect(tempPassword).toBeDefined();

    // 2. Navigate to Login Page
    await page.goto('/login');
    await expect(page).toHaveTitle(/TeachPort/);

    // 3. Perform Login
    await page.fill('#iin-input', testIin);
    await page.fill('#password-input', tempPassword);
    await page.click('button[type="submit"]');

    // 4. Verify Dashboard Redirect
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('My Academic Portfolio');
    await expect(page.locator('body')).toContainText('E2E Test Teacher');
    await expect(page.locator('body')).toContainText('Mathematics');
});
