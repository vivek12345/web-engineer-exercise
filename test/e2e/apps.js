const setupPage = require('./setup').page;
const signinObject = require('./page-objects/sign-in');
const appsObject = require('./page-objects/apps');

describe.only('/apps', () => {
    it('redirects to the sign-in page when the user is not signed in', async () => {
        const { page, browser } = await setupPage('/apps');
        const signin = signinObject(page);
        const apps = appsObject(page);

        await signin.isVisible();
        await apps.isNotVisible();

        await browser.close();
    });

    it('displays all the apps on the apps page', async () => {
        const { page, browser } = await setupPage('/');
        const signin = signinObject(page);
        const apps = appsObject(page);
        
        await signin.enterUserName('foo@bar.com');
        await signin.enterPassword('hunter2');
        await signin.clickSubmit();

        await apps.isVisible();
        await apps.assertAppCount(2);

        await browser.close();
    });

    it('updates the app information when the user changes them');
});