const puppeteer = require('puppeteer');
const pages = require('./pages');


(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    page.setViewport({width: 1920, height: 1080})
    for (const target of pages) {
        await page.goto(target.url);
        await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 10000})
            .catch(e => console.log('timeout exceed. proceed to next operation'))
        await page.screenshot({path: `screenshot/${target.name}.png`, fullPage: true})
        console.log("save screenshot: " + target.url)
    }
    await browser.close()
})();