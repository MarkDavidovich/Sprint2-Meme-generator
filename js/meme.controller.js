'use strict'

function oninit() {
    getCanvas()
    renderMeme()
    renderGallery()
}

function showGallery() {
    document.querySelector('.gallery-view').style.display = 'inline'
    document.querySelector('.editor-view').style.display = 'none'
}

function showEditor() {
    document.querySelector('.gallery-view').style.display = 'none'
    document.querySelector('.editor-view').style.display = 'flex'
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
    updateUI()
}

function onDownloadMeme(elLink) {
    downloadMeme(elLink)
}

function onColorChange(ev) {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        selectedLine.color = ev.target.value
        showText()
        renderMeme()
    }
}

function onAdjustFontSize(delta) {
    adjustFontSize(delta)
    showText()
    renderMeme()
}


function onAddLine() {
    addLine()
    renderMeme()
    showText()
    updateUI()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    showText()
    updateUI()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
    showText()
    updateUI()
}

function onFontChange() {
    const elFont = document.querySelector('.font-select')
    const selectedFont = elFont.value;
    fontChange(selectedFont)

    showText()
    renderMeme()
}

function onTextAlign(dir) {
    textAlign(dir)
    showText()
    renderMeme()

}

function onMoveLine(dir) {
    moveLine(dir)
    showText()
    renderMeme()
}