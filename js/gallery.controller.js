'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')
    const searchTerm = document.querySelector('.search-field').value.toLowerCase();

    const filteredImgs = gImgs.filter(img => {
        return img.keywords.some(keyword => keyword.includes(searchTerm));
    })

    let strHTML = ''
    filteredImgs.forEach(img => {
        strHTML += `<img class="gallery-img" src="${img.url}" alt="image ${img.id}" onclick="onImgSelect(${img.id})">`
    })

    elGallery.innerHTML = strHTML
}


function onImgSelect(id) {
    imgChange(id)
    renderMeme()
    showEditor()
}

function onSearchChange() {
    const searchField = document.querySelector('.search-field')
    searchField.value.trim()

    renderGallery();
}

function onRandomMeme() {
    getRandomMeme()
    renderMeme()
    showText()
    showEditor()
}