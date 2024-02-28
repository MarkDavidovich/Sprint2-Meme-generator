'use strict'

function oninit() {
    getCanvas()
    renderMeme()
    renderGallery()
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
    const meme = getMeme()

    const img = new Image()
    img.src = `img/${meme.selectedImgId}.png`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        showText()
    }
}

function updateText(value) {
    setLineTxt(value)
    showText()
    renderMeme()
}

function onDownloadMeme(elLink) {
    downloadMeme(elLink)
}