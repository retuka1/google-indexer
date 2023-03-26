// Juste avec un tableau d'url, 1 et 3 sont indexées, n°2 pas indexée

const axios = require('axios')

const urls = [
    // 'https://www.opportunites-digitales.com/proton-vpn-lance-plusieurs-extensions-pour-navigateurs/',
    'https://www.opportunites-digitales.com/vpn-linux/',
    // 'https://www.opportunites-digitales.com/4-nouveaux-plugins-jelastic-cloud-infomaniak/'
]

const urlsNotIndexed = []

const googleApiKey = 'AIzaSyAR1tL1swrv4OwNN7qoRvzKjz850eVpXrk';
const searchEngineId = '27ff8d6b45a044a7b';

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