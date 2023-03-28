// Juste avec un tableau d'url, 1 et 3 sont indexées, n°2 pas indexée

// const axios = require('axios')

const urlsToCheck = [
    'https://www.opportunites-digitales.com/proton-vpn-lance-plusieurs-extensions-pour-navigateurs/',
    'https://www.opportunites-digitales.com/4-nouveaux-plugins-jelastic-cloud-infomaniak/',
    'https://www.opportunites-digitales.com/vpn-linux/'
]

const urlsNotIndexed = []

const googleApiKey = 'AIzaSyAR1tL1swrv4OwNN7qoRvzKjz850eVpXrk';
const searchEngineId = '27ff8d6b45a044a7b';

urlsToCheck.forEach(url => {
    fetch(`https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=site:${url}`)
      .then(response => response.json())
      .then(data => {
        if (data.searchInformation.totalResults > 0) {
            console.log(url +  ' : ' + 'L\'URL est indexée dans les résultats de recherche de Google.');
        } else {
            urlsNotIndexed.push(url);
console.log(urlsNotIndexed);

            console.log(url + ' : ' +  'L\'URL n\'est pas indexée dans les résultats de recherche de Google.');
        }
        
      })
      .catch(error => {
        console.error(error);
      });
});



