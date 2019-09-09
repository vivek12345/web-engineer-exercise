const setup = require('./setup');
const signinObject = require('./page-objects/sign-in');
const appsObject = require('./page-objects/apps');
const usersObject = require('./page-objects/users');
const usersResponseWithLessThan25 = require('./fixtures/users-response-with-less-than-25.json');

describe.only('/users', () => {
  it('redirects to the sign-in page when the user is not signed in', async () => {
    const { page, browser } = await setup.page(
      '/apps/0fe0a330-12d3-4155-9af1-c4c1cc29b33f'
    );
    const signin = signinObject(page);
    const users = usersObject(page);

    await signin.isVisible();
    await users.isNotVisible();

    await browser.close();
  });

  it('displays 25 users per page', async () => {
    const { page, browser } = await setup.page('/');
    const signin = signinObject(page);
    const users = usersObject(page);
    const apps = appsObject(page);

    await signin.enterUserName('foo@bar.com');
    await signin.enterPassword('hunter2');
    await signin.clickSubmit();

    await apps.isVisible();
    await apps.clickApp();

    await users.isVisible();
    await users.assertUserCount(25);

    await browser.close();
  });

  it('the user can not click the "previous" page link when they are on the first page of users', async () => {
    const { page, browser } = await setup.page('/');
    const signin = signinObject(page);
    const users = usersObject(page);
    const apps = appsObject(page);

    await signin.enterUserName('foo@bar.com');
    await signin.enterPassword('hunter2');
    await signin.clickSubmit();

    await apps.isVisible();
    await apps.clickApp();

    await users.isVisible();
    await users.assertPreviousLinkDisabled();

    await browser.close();
  });

  it('the user can not click the "next" page link when they are on the last page of users', async () => {
    const { page, browser } = await setup.pageWithNetworkMocks('/apps/:appId', [
      {
        url:
          'https://guarded-thicket-22918.herokuapp.com/apps/0fe0a330-12d3-4155-9af1-c4c1cc29b33f/users',
        fixture: {
          status: 200,
          content: 'application/json',
          body: JSON.stringify(usersResponseWithLessThan25)
        }
      }
    ]);
    const signin = signinObject(page);
    const users = usersObject(page);
    const apps = appsObject(page);

    await signin.enterUserName('foo@bar.com');
    await signin.enterPassword('hunter2');
    await signin.clickSubmit();

    await apps.isVisible();
    await apps.clickApp();

    await users.isVisible();
    await users.assertNextLinkDisabled();

    await browser.close();
  });
});
