const setupPage = require('./setup').page;
const signinObject = require('./page-objects/sign-in');
const appsObject = require('./page-objects/apps');
const appEditModalObject = require('./page-objects/app-edit-modal');

describe.skip('/apps', () => {
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

  it('shows a app edit modal when clicked on edit btn', async () => {
    const { page, browser } = await setupPage('/');
    const signin = signinObject(page);
    const apps = appsObject(page);
    const appEditModal = appEditModalObject(page);

    await signin.enterUserName('foo@bar.com');
    await signin.enterPassword('hunter2');
    await signin.clickSubmit();

    await apps.isVisible();
    await apps.clickEditAppBtn();

    await appEditModal.isVisible();

    await browser.close();
  });

  it('app edit modal form should contain name and logo fields prefilled with the value of selected app', async () => {
    const { page, browser } = await setupPage('/');
    const signin = signinObject(page);
    const apps = appsObject(page);
    const appEditModal = appEditModalObject(page);

    await signin.enterUserName('foo@bar.com');
    await signin.enterPassword('hunter2');
    await signin.clickSubmit();

    await apps.isVisible();
    await apps.clickEditAppBtn();

    await appEditModal.isVisible();
    const appName = await apps.getAppName();
    const appLogoUrl = await apps.getAppLogo();
    await appEditModal.checkNameValue(appName);
    await appEditModal.checkLogoValue(appLogoUrl);

    await browser.close();
  });

  it('should update the app when edited', async () => {
    const { page, browser } = await setupPage('/');
    const signin = signinObject(page);
    const apps = appsObject(page);
    const appEditModal = appEditModalObject(page);

    await signin.enterUserName('foo@bar.com');
    await signin.enterPassword('hunter2');
    await signin.clickSubmit();

    await apps.isVisible();
    await apps.clickEditAppBtn();

    await appEditModal.isVisible();

    const newName = 'test app';
    const newLogoUrl = 'http://lorempixel.com/500/500/animals';

    await appEditModal.enterName(newName);
    await appEditModal.enterLogo(newLogoUrl);

    await appEditModal.clickUpdate();

    await apps.isVisible();

    await new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    const appName = await apps.getAppName();
    const appLogoUrl = await apps.getAppLogo();

    await new Promise((resolve, reject) => {
      if (appName === newName && appLogoUrl === newLogoUrl) {
        resolve(true);
      } else {
        reject(new Error('failed to update value'));
      }
    });

    await browser.close();
  });
});
