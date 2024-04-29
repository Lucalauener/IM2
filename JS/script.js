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
  let filteredArtworks = artworksWithDetails.data.filter(artworksWithDetails => artworksWithDetails.title.includes(searchInput));

  app.innerHTML = '';

  filteredArtworks.forEach(artwork => {
    createCard(artwork);
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
  
  artworksWithDetails = await Promise.all(artworks.data.map(async artwork => {
  let artworkDetails = await fetchData(`https://api.artic.edu/api/v1/artworks/${artwork.id}`);
  return artworkDetails.data;
  } ));

  artworksWithDetails.forEach(artwork => {  
    createCard(artwork);

      } );
      };



function createCard(artwork){

  let card = document.createElement('div');
  card.className = 'Artworks';

  let cardtitel = document.createElement('div');
  cardtitel.className = 'cardtitel';

  let carddescription = document.createElement('div');
  carddescription.className = 'carddescription';

  let img = document.createElement('img');
  img.className = 'GalleryImage';
  img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`; 
  
  let artworkname = document.createElement('h3');
      artworkname.innerHTML = artwork.title;   
      cardtitel.appendChild(artworkname);

      let beschreibung = document.createElement('p');

      if (!artwork.description) {
        beschreibung.innerHTML = artwork.thumbnail.alt_text;
      } else {
        beschreibung.innerHTML = artwork.description;
      }
      carddescription.appendChild(beschreibung);



  card.appendChild(cardtitel);
  card.appendChild(img);
  card.appendChild(carddescription);
  
  app.appendChild(card);
}