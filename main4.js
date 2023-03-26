// Juste avec un tableau d'url, 1 et 3 sont indexées, n°2 pas indexée

const axios = require('axios')

const urls = [
    // 'https://www.opportunites-digitales.com/proton-vpn-lance-plusieurs-extensions-pour-navigateurs/',
    'https://www.opportunites-digitales.com/vpn-linux/',
    // 'https://www.opportunites-digitales.com/4-nouveaux-plugins-jelastic-cloud-infomaniak/'
]

const urlsNotIndexed = []

const googleApiKey = '';
const searchEngineId = '';

urls.forEach(url => {
    axios.get(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${url}`)
      .then(response => {
        // console.log(response);
        if (!response.data.items) {
        
          urlsNotIndexed.push(url);
          
        }
      })
      .catch(error => {
        console.error(error);
      });
});

console.log(urlsNotIndexed);