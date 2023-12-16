// 1: cd C:/Users/Xzavi/OneDrive/Desktop/Ink/
// 2: node Crawler.JS

const axios = require('axios');
const cheerio = require('cheerio');

const targetUrl = 'https://en.wikipedia.org/wiki/';
const visitedLinks = new Set();
const infoOccurrences = {};

async function crawlWebsite(url, depth = 2, parentLink = '') {
  try {
    if (depth === 0 || visitedLinks.has(url)) {
      return;
    }

    // Mark the current link as visited
    visitedLinks.add(url);

    // Fetch HTML content of the specified URL
    const response = await axios.get(url);
    const htmlContent = response.data;

    // Use Cheerio to parse HTML content
    const $ = cheerio.load(htmlContent);

    // Extract information from the HTML content
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');

    // Log the extracted information and its source link
    console.log('Source Link:', parentLink);
    console.log('Title:', title);
    console.log('Meta Description:', metaDescription);

    // Count occurrences of each piece of information
    updateInfoOccurrences(title);
    updateInfoOccurrences(metaDescription);

    // Extract links from the HTML content
    const links = [];
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      if (link && !link.startsWith('#')) {
        links.push(link);
      }
    });

    // Follow links and crawl their content
    for (const link of links) {
      console.log('------------------------');
      console.log('Found at:', url);
      console.log('Following link:', link);
      await crawlWebsite(link, depth - 1, url);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Start crawling the website
crawlWebsite(targetUrl);

// Function to update the occurrences of each piece of information
function updateInfoOccurrences(info) {
  if (info) {
    infoOccurrences[info] = (infoOccurrences[info] || 0) + 1;
    console.log('Info Occurrences:', infoOccurrences);
  }
}