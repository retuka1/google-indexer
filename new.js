function checkIndex(url) {
    var googleApiKey = 'AIzaSyAR1tL1swrv4OwNN7qoRvzKjz850eVpXrk';
    const searchEngineId = '27ff8d6b45a044a7b';
    var googleEndpoint = 'https://www.googleapis.com/customsearch/v1';
    var query = 'site:' + url;
    var requestUrl = googleEndpoint + '?key=' + googleApiKey + '&cx=' + searchEngineId + '&q=' + query;
  
    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.searchInformation.totalResults > 0) {
          console.log('L\'URL est indexée dans les résultats de recherche de Google.');
        } else {
          console.log('L\'URL n\'est pas indexée dans les résultats de recherche de Google.');
        }
      })
      .catch(error => console.log(error));
  }
  
  // Exemple d'utilisation :
  checkIndex('https://www.opportunites-digitales.com/avis-surfshark/');
  
