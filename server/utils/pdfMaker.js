import puppeteer from 'puppeteer'
async function pdfMaker(receiptHTML) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.setContent(receiptHTML);

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
}

export default pdfMaker;
