
// CODE QUI MARCHE 


const axios = require('axios');
// Import the xml2js package to parse the XML data
const parseString = require('xml2js').parseString; 

// Replace this URL with the URL of the sitemap you want to fetch
const sitemapUrl = 'https://www.opportunites-digitales.com/post-sitemap1.xml';

// Make an HTTP request to fetch the sitemap XML
axios.get(sitemapUrl)
  .then(response => {
    // Parse the XML data to extract the URLs
    parseString(response.data, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        // Get all the URLs from the sitemap
        const urls = result.urlset.url.map(url => url.loc[0]);
        console.log(urls);
      }
    });
  })
  .catch(error => {
    // Handle any errors that occur
    console.error(error);
  });
