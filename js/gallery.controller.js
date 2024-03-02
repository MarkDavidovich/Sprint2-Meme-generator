'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')
    let strHTML = ''

    gImgs.forEach(img => {
        strHTML += `<img class="gallery-img" src="${img.url}" alt="cat ${img.id}" onclick="onImgSelect(${img.id})">`
    })

    elGallery.innerHTML = strHTML
}

function onImgSelect(id) {
    imgChange(id)
    renderMeme()
    showEditor()
}
