// Avec clé api google indexing 

const axios = require('axios');

const parseString = require('xml2js').parseString;

const sitemapUrl = 'https://www.opportunites-digitales.com/post-sitemap1.xml';
const googleApiKey = '';
const searchEngineId = '';
const indexingApiKey = ''; 

const urlsToIndex = [];

axios.get(sitemapUrl)
  .then(response => {
    parseString(response.data, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        const urls = result.urlset.url.map(url => url.loc[0]);
        urls.forEach(url => {
          axios.get(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${url}`)
            .then(response => {
              if (!response.data.items) {
                urlsToIndex.push(url);
                console.log(urlsToIndex)
              }
            })
            .catch(error => {
              console.error(error);
            });
        });
        axios.post(`https://indexing.googleapis.com/v3/urlNotifications:batchUpdate?key=${indexingApiKey}`, {
          "urlNotification": urlsToIndex.map(url => {
            return {
              "url": url,
              "type": "URL_UPDATED"
            }
          })
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  })
  .catch(error => {
    console.error(error);
  });
