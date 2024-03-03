'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')
    const searchField = document.querySelector('.search-field')
    const keywordsDatalist = document.getElementById('keywords')

    const searchTerm = searchField.value.toLowerCase()
    const searchTermsArray = searchTerm.split(' ')

    const uniqueKeywords = new Set()

    const filteredImgs = gImgs.filter(img => {
        const includesTerm = searchTermsArray.every(term => {
            return img.keywords.some(keyword => keyword.includes(term))
        })

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

    renderKeywords([...uniqueKeywords])
}

function renderKeywords(keywords) {
    const elKeywords = document.querySelector('.keyword-tags')
    let strHTML = ''

    keywords.forEach(keyword => {
        const fontSize = getKeywordPopularity()[keyword] * 5 || 10
        strHTML += `<span class="keyword" style="font-size: ${fontSize}px;" onclick="onKeywordClick('${keyword}')">${keyword} </span>`
    })
    elKeywords.innerHTML = strHTML
}

function onImgSelect(id) {
    imgChange(id)
    renderMeme()
    showEditor()
}

function onSearchChange() {
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

function onKeywordClick(keyword) {
    increaseWordSize(keyword)
    setSearchValue(keyword)
    renderGallery()
}