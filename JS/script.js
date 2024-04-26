const searchBock = document.querySelector('#search');
const app = document.querySelector('#app');
let artworksWithDetails = [];


document.addEventListener('DOMContentLoaded', function(){
  init();
});


//eventlistener searchBocks input ??????????????
searchBock.addEventListener('input', function(){
  sucheArtwork(searchBock.value);
});

async function sucheArtwork(searchInput){
  console.log(searchInput);
  let url = 'https://api.artic.edu/api/v1/artworks/search?q=&query[term][artist_id]=40610&limit=18';
  let artworks = await fetchData(url);
  let filteredArtworks = artworks.data.filter(artwork => artwork.title.includes(searchInput));
  console.log(filteredArtworks);

  app.innerHTML = '';

  filteredArtworks.forEach(artwork => {
      console.log(artwork.name);
      let card = document.createElement('div');
      card.className = 'Artworks';
      card.innerHTML = `<h3>${artwork.title}</h3>`;
      app.appendChild(card);
  });
}

init();

async function fetchData(url) { // async function to fetch data from the url
  try { // try block to handle exceptions
      let response = await fetch(url); // await the response of the fetch call
      let data = await response.json(); // convert response to json
      return data; // return the data
      // console.log(data.results[150].name);
  }
  catch (error) { // catch block to handle errors
      console.log(error);
  }
}

async function init(){
  let url = 'https://api.artic.edu/api/v1/artworks/search?q=&query[term][artist_id]=40610&limit=18';
  let artworks = await fetchData(url);
  artworks.data.forEach(async artwork => {
      console.log(artwork.title);

 artworksWithDetails = await Promise.all(artworks.data.map(async artwork => {
  let artworkDetails = await fetchData(`https://api.artic.edu/api/v1/artworks/${artwork.id}`);
  return artworkDetails.data;
  } ));

  console.log(artworksWithDetails);

  artworksWithDetails.forEach(artwork => {  
    createCard(artwork);

      } );
      });
  } 



function createCard(artwork){

  let card = document.createElement('div');
  card.className = 'Artworks';

  let cardtitel = document.createElement('div');
  cardtitel.className = 'cardtitel';
  let carddescription = document.createElement('div');
  carddescription.className = 'carddescription';


  let artworkname = document.createElement('h3');
      artworkname.innerHTML = artwork.title;   
      cardtitel.appendChild(artworkname);

      let beschreibung = document.createElement('p');
      if (artwork.description.length === 0) {
        beschreibung.innerHTML = artwork.thumbnail.alt_text;
      } else {
        beschreibung.innerHTML = artwork.description;
      }
      carddescription.appendChild(beschreibung);
  card.appendChild(cardtitel);
  card.appendChild(carddescription);
  app.appendChild(card);
}