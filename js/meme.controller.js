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
    const memeImg = new Image()
    memeImg.src = 'img/1.png'
    memeImg.onload = () => {
        gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height)
        // gCtx.font = "50px serif"
        // gCtx.fillText('Hello', 50, 90)
        showText()
    }

    //need to find a way to MVC this

}