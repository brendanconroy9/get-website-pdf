const puppeteer = require('puppeteer');
const url = require('url');

(async () => {
  // Check if a website URL is provided as a command-line argument
  const args = process.argv.slice(2); // Slice off the first two elements (node and script name)

  if (args.length !== 1) {
    console.error('Usage: node your-script.js <website_URL>');
    process.exit(1);
  }

  let inputURL = args[0]; // The website URL passed as an argument

  // Automatically prepend "https://" if it's not already included
  if (!inputURL.startsWith('http://') && !inputURL.startsWith('https://')) {
    inputURL = 'https://' + inputURL;
  }

  // Extract the website name from the URL (excluding subdomains and path)
  const websiteName = url.parse(inputURL).hostname;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(inputURL, { waitUntil: 'networkidle2' });

  // Generate the PDF with the website name as the filename
  const pdfFileName = `${websiteName}.pdf`;

  await page.pdf({ path: pdfFileName, format: 'A4' });

  console.log(`PDF saved as ${pdfFileName}`);

  await browser.close();
})();

