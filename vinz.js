const axios = require('axios');

// const apiKey = 'AIzaSyAR1tL1swrv4OwNN7qoRvzKjz850eVpXrk'; // flo
const apiKey = 'AIzaSyCP6lXY0EsKYHERbGEP50OHz8QKgKnYLF0'; // vinz
const cseId = '27ff8d6b45a044a7b';

const checkIfIndexed = (url) => {
  const domain = new URL(url).hostname;
  const path = new URL(url).pathname;

  const query = `site:${domain}+inurl:${path}`;
  const googleQuery = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${query}`;

  axios.get(googleQuery)
    .then(response => {
      console.log(`\n\n\n▶ \x1b[36m${url}\x1b[0m`);

      if (!response.data.items) {
        console.log("\nNo result, page is not indexed");

        return;
      }

      const foundUrls = response.data.items.map(item => item.link);

      console.log("\nFound the following urls:", foundUrls);

      const isIndexed = foundUrls.some(foundUrl => {
        const foundPath = new URL(foundUrl).pathname;

        return foundPath === path;
      });

      if (isIndexed) {
        console.log('\nPage is \x1b[33mindexed\x1b[0m');
      } else {
        console.log('\nPage is \x1b[35mnot indexed\x1b[0m');
      }
    })
    .catch(error => console.error(error));
}

const urls = [
  'https://www.opportunites-digitales.com/proton-vpn-lance-plusieurs-extensions-pour-navigateurs/',
  'https://www.opportunites-digitales.com/vpn-linux/',
  'https://www.opportunites-digitales.com/4-nouveaux-plugins-jelastic-cloud-infomaniak/'
];

urls.forEach(url => checkIfIndexed(url));
