/// Sans clé api google indexing, stock les urls non indexées (marche pas)

const axios = require('axios');

const parseString = require('xml2js').parseString;

const sitemapUrl = 'https://www.opportunites-digitales.com/post-sitemap2.xml';
const googleApiKey = '';
const searchEngineId = '';

const urlsNotIndexed = [];

axios.get(sitemapUrl)
  .then(response => {
    console.log(response);
    parseString(response.data, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        const urls = result.urlset.url.map(url => url.loc[0]).slice(1, 2);
        console.log(urls);
        urls.forEach(url => {
          axios.get(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${url}`)
            .then(response => {
              if (!response.data.items) {
                urlsNotIndexed.push(url);
              }
            })
            .catch(error => {
              console.error(error);
            });
        });
        console.log(urlsNotIndexed);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });
