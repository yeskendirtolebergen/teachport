# E2E Testing Guide

I have set up **Playwright** to test the full "Registration → Login → Dashboard" flow.

## 🧪 What is tested?
The E2E test (`frontend/e2e/registration.spec.ts`) performs the following:
1.  **Simulates a Google Form Submission**: Calls the backend webhook with a test header to register a new teacher.
2.  **Captures the Generated Password**: Using a secure `x-test-mode` flag, the backend returns the password only during the test.
3.  **UI Login**: Navigates to the local site, enters the IIN and the captured password.
4.  **Dashboard Verification**: Confirms the user is redirected to their personalized dashboard with correct data.

## 🚀 How to Run
1.  **Start the Backend**:
    ```bash
    cd backend
    npm run start:dev
    ```
2.  **Run E2E Tests**:
    ```bash
    cd frontend
    npx playwright install chromium # One-time setup
    npm run test:e2e
    ```

## 🛠️ Configuration
- **Playwright Config**: Located at `frontend/playwright.config.ts`. It's configured to automatically start the Next.js dev server on port 3000.
- **Backend Webhook**: The test assumes the backend is running on `http://localhost:3001`.
