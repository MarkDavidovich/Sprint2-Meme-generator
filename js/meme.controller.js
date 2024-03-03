'use strict'

function oninit() {
    getCanvas()
    renderMeme()
    renderGallery()
    renderEmojiField()
}

function showGallery(elBtn) {
    document.querySelector('.gallery-view').style.display = 'inline'
    document.querySelector('.editor-view').style.display = 'none'
    document.querySelector('.saved-view').style.display = 'none'
    resetButtons(elBtn)
}

function showEditor(elBtn) {
    document.querySelector('.gallery-view').style.display = 'none'
    document.querySelector('.editor-view').style.display = 'flex'
    document.querySelector('.saved-view').style.display = 'none'
    resetButtons(elBtn)
}

function showSaved(elBtn) {
    document.querySelector('.gallery-view').style.display = 'none'
    document.querySelector('.editor-view').style.display = 'none'
    document.querySelector('.saved-view').style.display = 'inline'
    renderSavedMemes()
    resetButtons(elBtn)
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

function renderSavedMemes() {
    const savedMemes = loadFromStorage(MEME_KEY) || []
    const elSavedGallery = document.querySelector('.imgs-container.saved')
    let strHTML = ''

    savedMemes.forEach((meme) => {
        const idx = meme.selectedImgId
        strHTML += `<div class="gallery-item">
        <img class="gallery-img" src="img/${idx}.png" alt="image ${idx}" onclick="clickOnSaved(${idx})">
        <button class="remove-saved-btn" onclick="clickOnRemove(${idx})"> <img src="img/icons/delete-line.png" alt="remove image" /></button>
    </div>`
    })

    elSavedGallery.innerHTML = strHTML
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
    const selectedFont = elFont.value

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

function onSaveMeme() {
    const meme = getMeme()
    saveMeme(meme)

    const saveTooltip = document.querySelector('.tooltip')
    saveTooltip.style.visibility = 'visible'
    setTimeout(() => {
        saveTooltip.style.visibility = 'hidden'
    }, 1500)
}

function clickOnSaved(idx) {
    loadSavedMeme(idx)
    renderMeme()
    showEditor()
}

function clickOnRemove(idx) {
    removeSavedMeme(idx)
    renderSavedMemes()
}

function resetButtons(elBtn) {

    document.querySelectorAll('.header-btn').forEach(btn => {
        btn.classList.remove('active')
    })

    if (!elBtn) {
        document.querySelector('.editor-btn').classList.add('active')
        return
    }

    elBtn.classList.add('active')
}

function renderEmojiField() {
    const emojiContainer = document.querySelector('.emoji-container')
    const emojis = getEmojis()
    let strHTML = ''

    emojis.forEach(emoji => {
        strHTML += `<div class="emoji-item" onclick="onEmojiClick('${emoji}')">${emoji}</div>`
    })

    emojiContainer.innerHTML = strHTML
}

function onEmojiClick(emoji) {
    addEmojiLine(emoji)
    showText()
    renderMeme()
    updateUI()
}

