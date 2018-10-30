const setupPage = require('./setup').page;
const signinObject = require('./page-objects/sign-in');

describe('/sign-in', () => {
    it('successfully signs in when provided with a valid username and password', async () => {
        const { page, browser } = await setupPage('/');
        const signin = signinObject(page);
        const successfulNavigation = page.waitForNavigation();

        await signin.enterUserName('foo@bar.com');
        await signin.enterPassword('hunter2');
        await signin.clickSubmit();

        await successfulNavigation;

        await browser.close();
    });

    it('renders an error message when the user enters the incorrect sign in details', async () => {
        const { page, browser } = await setupPage('/');
        const signin = signinObject(page);

        await signin.enterUserName('foo@bar.com');
        await signin.enterPassword('hunter1');
        await signin.clickSubmit();
        await signin.hasSubmissionError();

        await page.close();
    });
});
