'use strict'
const NUM_OF_IMAGES = 3

function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')

    var strHTML = ''


    for (let i = 1; i <= NUM_OF_IMAGES; i++) { // MIGHT NEED TO CHANGE THE CONST USAGE HERE
        strHTML += `<img src="/img/${i}.png" alt="cat ${i}" onclick="onImgSelect(event)">`
    }
    elGallery.innerHTML = strHTML
    elGallery.style.display = 'block'
}

