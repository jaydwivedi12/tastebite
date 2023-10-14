import puppeteer from 'puppeteer';

async function generatePDF(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', networkIdleTimeout: 5000 });

    // Set the media type to 'print' for generating a PDF
    await page.emulateMediaType('print');

    const pdfConfig = {
        format: 'A4',
        printBackground: true,
        margin: {
            top: '2.54cm',
            bottom: '2.54cm',
            left: '2.54cm',
            right: '2.54cm',
        },
    };

    const pdf = await page.pdf(pdfConfig);

    await browser.close();

    return pdf;
}

export default generatePDF;
