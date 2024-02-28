'use strict'
const NUM_OF_IMAGES = 3

function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')
    let strHTML = ''

    for (let i = 1; i <= NUM_OF_IMAGES; i++) { // MIGHT NEED TO CHANGE THE CONST USAGE HERE
        strHTML += `<img src="img/${i}.png" alt="cat ${i}" onclick="onImgSelect(${i})">`
    }
    elGallery.innerHTML = strHTML
}

function onImgSelect(id) {
    imgChange(id)
    showEditor()
    renderMeme()
}