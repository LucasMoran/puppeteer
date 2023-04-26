//get the puppeteer package
const puppeteer = require("puppeteer");
const fs = require("fs/promises");
 
// set url const
const url = process.argv[2];
 
async function go() {
    // launch the browser
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400,
    });
 
    const page = await browser.newPage();
 
    //   access the  site
    await page.goto(
        url
    );
 
    // product name
    const pname = await page.$eval("#title", (data) => {
        return data.innerText;
    });
 
    console.log('Product: ' + pname);
 
    // stars
    const stars = await page.$eval("#acrPopover > span.a-declarative > a > span", (data) => {
        return data.innerText;
    });

    //  number of ratings

    const trate = await page.$eval("#acrCustomerReviewText", (data) => {
        return data.innerText;
    });

 

    console.log('Rating: ' + stars + 'out of 5 stars from a total of ' + trate);

 

    //  photo

    const photo = await page.$eval("#landingImage", (photo) => {
        return photo.src;
    });
    console.log('Product main picture URL is:' + photo)

    //  price

    const price = await page.$eval("#sns-base-price", (price) => {
        return price.innerText;
    });

    console.log('Product price:' + price)

    // close browser
    // browser.close();

}

 

go()
