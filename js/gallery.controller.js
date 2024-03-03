'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')
    const searchField = document.querySelector('.search-field')
    const keywordsDatalist = document.getElementById('keywords')

    const searchTerm = searchField.value.toLowerCase()

    const uniqueKeywords = new Set()

    const filteredImgs = gImgs.filter(img => {
        const includesTerm = img.keywords.some(keyword => keyword.includes(searchTerm))
        if (includesTerm) {
            img.keywords.forEach(keyword => uniqueKeywords.add(keyword))
        }
        return includesTerm
    })

    let strHTML = ''
    filteredImgs.forEach(img => {
        strHTML += `<img class="gallery-img" src="${img.url}" alt="image ${img.id}" onclick="onImgSelect(${img.id})">`
    })

    elGallery.innerHTML = strHTML

    keywordsDatalist.innerHTML = [...uniqueKeywords].map(keyword => `<option value="${keyword}">`).join('')
}

function onImgSelect(id) {
    imgChange(id)
    renderMeme()
    showEditor()
}

function onSearchChange() {
    // const searchField = document.querySelector('.search-field')
    // searchField.value.trim()

    renderGallery()
}

function onRandomMeme() {
    getRandomMeme()
    renderMeme()
    showEditor()
}

function onClearFilter() {
    const searchField = document.querySelector('.search-field')
    searchField.value = ''
    renderGallery()
}