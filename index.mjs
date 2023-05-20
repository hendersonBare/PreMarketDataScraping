import puppeteer from "puppeteer-core";

async function run() {
    let browser;
    try {

        //launches a browser instance to pull its web socket endpoint for later use
        const browser = await puppeteer.launch({
            executablePath:'C:\\Users\\Henderson Bare\\Desktop\\VSCODE\\NodeAndScraping\\node_modules\\@puppeteer\\browsers\\chrome\\win64-115.0.5777.0\\chrome-win64\\chrome.exe',
            channel: "chrome"
        });
        const UserWSEndpoint = browser.wsEndpoint();
        //await UserBrowser.close();


        /*browser = await puppeteer.connect({
            //browserWSEndpoint: UserWSEndpoint
            browserWSEndpoint: 'ws:\\127.0.0.1'
        }); */

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        await page.goto('https://www.nasdaq.com/market-activity/stocks/aapl/pre-market-trades');

        const html = await page.evaluate(() => 
        document.documentElement.outerHTML
        );

        console.log(html);

        return;

    } catch (e) {
        console.error('scrape failed', e);
        if (!browser.UserWSEndpoint == null) {browser.close();}
    }
    finally {
        await browser?.close();
    }
}

run();