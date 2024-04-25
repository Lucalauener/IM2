
if ("geolocation" in navigator) {
    // Geolocation is supported
    console.log("Geolocation is available");
  } else {
    // Geolocation is not supported
    console.log("Geolocation is not available");
  }

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  getLocation();

  function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
                "\nLongitude: " + position.coords.longitude);

    var lat = position.coords.latitude;
    var lon = position.coords.longitude
  }
  showPosition();
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }