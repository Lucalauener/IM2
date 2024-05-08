const header = document.querySelector('header'); 
const h1 = header.querySelector('h1'); 

document.addEventListener('DOMContentLoaded', function() {
    fitTextToHeader();
    // Any other functions you need to initialize
});


function fitTextToHeader() {
    
    if (window.innerWidth > 480) {
    let desiredWidth = header.clientWidth; 
    let currentWidth = h1.scrollWidth; 

    let currentFontSize = parseFloat(window.getComputedStyle(h1).fontSize); 
    let newFontSize = currentFontSize * (desiredWidth / currentWidth); 

    h1.style.fontSize = `${newFontSize - 50}px`; 
    
    let h1Height = h1.scrollHeight; 
    header.style.height = `${h1Height - 10}px`;
    } else {
        h1.style.fontSize = '40px'; 
        header.style.height = '80px';
    }
}


document.addEventListener('DOMContentLoaded', fitTextToHeader);  
window.addEventListener('resize', fitTextToHeader); 


document.getElementById('framesize').addEventListener('click', function() {
    let inputs = document.getElementById('SizeInputs');
    if (inputs.style.display === 'none') {
        inputs.style.display = 'block'; 
    } else {
        inputs.style.display = 'none'; 
    }
});