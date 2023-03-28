const axios = require('axios');
const parseString = require('xml2js').parseString;

const googleApiKey = 'AIzaSyAR1tL1swrv4OwNN7qoRvzKjz850eVpXrk';
const searchEngineId = '27ff8d6b45a044a7b';

const sitemapUrl = 'https://www.opportunites-digitales.com/post-sitemap6.xml';

const urlsNotIndexed = [];

axios.get(sitemapUrl)
  .then(response => {
    parseString(response.data, async (error, result) => {
      if (error) {
        console.error(error);
      } else {
        const urls = result.urlset.url.map(url => url.loc[0]);

        for (const url of urls) {
          await new Promise(resolve => setTimeout(resolve, 30000)); // attendre 30 secondes
          //fetch(`https://www.google.com/search/&q=site:${url}`)
          fetch(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=site:${url}`)

          .then(response => response.json())
            .then(data => {
              if (data.searchInformation.totalResults > 0) {
                  console.log(url + ' : ' + 'L\'URL est indexée dans les résultats de recherche de Google.');
              } else {
                  urlsNotIndexed.push(url);
                  console.log(url + ' : ' + 'L\'URL n\'est pas indexée dans les résultats de recherche de Google.');
              }
            })
            .catch(error => {
              console.error(error);
            });
        }

        console.log("Liste des URLs non indexées :");
        console.log(urlsNotIndexed);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });
