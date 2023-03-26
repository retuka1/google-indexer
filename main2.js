const axios = require('axios');
const parseString = require('xml2js').parseString;

const sitemapUrl = 'https://www.opportunites-digitales.com/post-sitemap1.xml';
const googleApiKey = '27ff8d6b45a044a7b';
const searchEngineId = 'AIzaSyAR1tL1swrv4OwNN7qoRvzKjz850eVpXrk';
const indexingApiKey = 'cc38d8aae3c52eb12039e66ad1e13259a5ec6bf5';

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
