'use strict'

function oninit() {
    getCanvas()
    renderMeme()
}

function showGallery() {
    document.querySelector('.gallery-view').style.display = 'block'
    document.querySelector('.editor-view').style.display = 'none'
}

function showEditor() {
    document.querySelector('.gallery-view').style.display = 'none'
    document.querySelector('.editor-view').style.display = 'block'
}

function renderMeme() {
    getMeme()
}

function updateText(value) {
    setLineTxt(value)
    showText()
    renderMeme()
}