const puppeteer = require('puppeteer');

async function page(path) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`localhost:8080${path}`);
    
    return { browser, page }; 
}

/**
 * 
 * @param {string} path 
 * @param {[{ url: string, fixture: object }]} mocks 
 */
async function pageWithNetworkMocks(path, mocks) {
    const browser = await puppeteer.launch({
        headless: false,
        'args': ['--disable-web-security']
    });
    const page = await browser.newPage();
    let mockInc = 0;

    await page.setRequestInterception(true);
    page.on('request', request => {
        if (mocks[mockInc] && request.url() === mocks[mockInc].url) {
            const { fixture } = mocks[mockInc];
            mockInc++;
            return request.respond(fixture);
        }
        return request.continue();
    });

    await page.goto(`localhost:8080${path}`);
    
    return { browser, page }; 
}

module.exports = { page, pageWithNetworkMocks };