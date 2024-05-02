const searchBock = document.querySelector('#search');
const app = document.querySelector('#app');
let artworksWithDetails = [];

2
document.addEventListener('DOMContentLoaded', function(){
  init();
});


//eventlistener searchBocks input ??????????????
searchBock.addEventListener('input', function(){  
  sucheArtwork(searchBock.value);
});

async function sucheArtwork(searchInput){
  app.innerHTML = '';

  if (searchInput.trim() === '') {
    artworksWithDetails.forEach(artwork => {
      createPreview(artwork);
    });
  } else {
    // Osonst filtern mit lowercase
    let filteredArtworks = artworksWithDetails.filter(artwork => 
      artwork.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    filteredArtworks.forEach(artwork => {
      let card = createCard(artwork);
      app.appendChild(card);
    });

 
}
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
    createPreview(artwork);

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
        beschreibung.innerHTML = `<span class="label">Description:</span> ${artwork.thumbnail.alt_text}`;
      } else {
        beschreibung.innerHTML = `<span class="label">Description:</span> ${artwork.description}`;
      }
      carddescription.appendChild(beschreibung);

  let infos = document.createElement('div');
  infos.className = 'infos';


  let mediumofdisplay = document.createElement('p');
  mediumofdisplay.innerHTML = `<span class="label">Medium of Display:</span> ${artwork.medium_display}`;
  infos.appendChild(mediumofdisplay);

  let dateorigin = document.createElement('p');
  dateorigin.innerHTML = `<span class="label">Date of origin:</span> ${artwork.date_display}`;
  infos.appendChild(dateorigin);

  let größe = document.createElement('p');
  größe.innerHTML = `<span class="label">Measurment:</span> ${artwork.dimensions}`;
  infos.appendChild(größe);

  card.appendChild(cardtitel);
  card.appendChild(img);
  card.appendChild(infos);
  card.appendChild(carddescription);
  
  app.appendChild(card);
  return card;
    }


function createPreview(artwork){

  let preview = document.createElement('div');
  preview.className = 'preview';
  app.appendChild(preview);



  let img = document.createElement('img');
  img.className = 'bildklein';
  img.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`; 
  img.addEventListener('click', function(){
    showOverlay(artwork);
  } );

preview.appendChild(img);

  let previewtitel = document.createElement('div');
  previewtitel.className = 'previewtitel';
  previewtitel.innerHTML = artwork.title;
  preview.appendChild(previewtitel);


app.appendChild(preview);

}

function showOverlay(artwork) {
  let overlay = document.getElementById('overlay');
  overlay.innerHTML = ''; // Clear previous content

  let modal = document.createElement('div');
  modal.className = 'modal';

 
  let closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;';
  closeButton.className = 'modal-close';
  closeButton.onclick = function() {
    overlay.style.display = 'none';
  };
  modal.appendChild(closeButton);

  let karte = createCard(artwork);
  modal.appendChild(karte);
  overlay.appendChild(modal);
  overlay.style.display = 'flex'; 

}