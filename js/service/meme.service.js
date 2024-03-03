'use strict'
const MEME_KEY = 'savedMeme'
let gCanvas
let gCtx

let gIsDragging = false
let gDragStartX
let gDragStartY

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: null,
    lines: []
}
const gEmojis = ['⭐', '❤️', '💕', '💖', '😍', '🎶', '🔥', '💗', '💢', '💤', '💫']

function getCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    gCanvas.addEventListener('click', onCanvasClick)

    gCanvas.addEventListener('mousedown', onMouseDown)
    gCanvas.addEventListener('mousemove', onMouseMove)
    gCanvas.addEventListener('mouseup', onMouseUp)

    gCanvas.addEventListener('touchstart', onTouchStart)
    gCanvas.addEventListener('touchmove', onTouchMove)
    gCanvas.addEventListener('touchend', onTouchEnd)

    addLine()
}

function getMeme() {
    return gMeme
}

function showText() {
    gMeme.lines.forEach((line, idx) => {
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 5

        gCtx.font = `${line.size}px ${line.font || 'Impact'}`
        gCtx.textAlign = line.align || 'left'

        let x = line.x

        gCtx.strokeText(line.txt, x, line.y)
        gCtx.fillText(line.txt, x, line.y)

        showOutline(line, idx, x)
    })
}

function showOutline(line, idx, x) {
    const textWidth = gCtx.measureText(line.txt).width

    if (idx === gMeme.selectedLineIdx) {
        gCtx.strokeStyle = 'rgba(255, 0, 0, 0.8)'
        gCtx.lineWidth = 1

        let outlineX = x

        if (line.align === 'center') {
            outlineX = x - (textWidth / 2)
        } else if (line.align === 'right') {
            outlineX = x - textWidth
        }

        gCtx.strokeRect(outlineX - 2, line.y - line.size, textWidth + 5, line.size + 5)
    }

    line.width = textWidth
}

function setLineTxt(txt) {
    const selectedLine = getSelectedLine()
    if (selectedLine != undefined) {
        selectedLine.txt = txt
    }
}

function downloadMeme(elLink) {
    elLink.href = '#'
    const dataUrl = gCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'dank-meme'
}

function adjustFontSize(delta) {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        if ((selectedLine.size < 10 && delta < 0) || (selectedLine.size > 70 && delta > 0)) return
        selectedLine.size += delta
    }
}

function addLine() {
    const newLine = {
        txt: 'enter text',
        size: 50,
        color: '#ffffff',
        x: 30,
        y: calculateY(),
        width: 0,
        align: 'left',
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function calculateY() {
    const lineSpacing = 100
    const lastLine = gMeme.lines[gMeme.lines.length - 1]
    return lastLine ? lastLine.y + lineSpacing : 50

}

function switchLine() {
    if (gMeme.lines.length > 1) {
        gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
    }
}

function removeLine() {
    if (gMeme.selectedLineIdx !== null) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)

        gMeme.selectedLineIdx = Math.min(gMeme.selectedLineIdx, gMeme.lines.length - 1)
        console.log(gMeme.lines.length)

        if (gMeme.lines.length === 0) {
            document.querySelector('.input-field').value = null
        }
    }
}

function updateUI() {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        document.querySelector('.input-field').value = selectedLine.txt

        document.querySelector('.color-picker').value = selectedLine.color
    }
}

function updateText(value) {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        selectedLine.txt = value
    }
}

function onCanvasClick(ev) {
    const mouseX = ev.clientX - gCanvas.offsetLeft
    const mouseY = ev.clientY - gCanvas.offsetTop

    console.log(`clicked at (${mouseX}, ${mouseY})`)

    for (let idx = gMeme.lines.length - 1; idx >= 0; idx--) {
        const line = gMeme.lines[idx]

        let x

        if (line.align === 'left') {
            x = line.x
        } else if (line.align === 'right') {
            x = line.x - Math.abs(line.width)
        } else {
            x = line.x - line.width / 2
        }

        if (
            mouseX >= x && mouseX <= x + line.width &&
            mouseY >= line.y - line.size && mouseY <= line.y
        ) {
            gMeme.selectedLineIdx = idx
            updateUI()
            showText()
            renderMeme()
            console.log('clicked on a line!')
            return
        }
    }
    gMeme.selectedLineIdx = null
    updateUI()
    showText()
    renderMeme()

    // THIS NEEDS TO BE REFACTORED FOR MVC
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function fontChange(selectedFont) {
    gMeme.lines.forEach(line => {
        line.font = selectedFont
    })
}

function textAlign(dir) {
    const selectedLine = getSelectedLine()

    if (selectedLine) {
        selectedLine.align = dir

        if (dir === 'left') {
            selectedLine.x = 50
        } else if (dir === 'right') {
            selectedLine.x = gCanvas.width - 50
        } else {
            selectedLine.x = gCanvas.width / 2
        }
    }
}

function moveLine(dir) {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        const moveLineBy = 20 * dir
        selectedLine.y += moveLineBy
    }
}

function saveMeme(meme) {
    const savedMemes = loadFromStorage(MEME_KEY) || []
    savedMemes.push(meme)
    saveToStorage(MEME_KEY, savedMemes)
}

function loadSavedMeme(imgId) {
    const savedMemes = loadFromStorage(MEME_KEY) || []
    const selectedMeme = savedMemes.find(meme => meme.selectedImgId === imgId)

    if (selectedMeme) {
        gMeme = selectedMeme
    }
}

function removeSavedMeme(imgId) {
    const savedMemes = loadFromStorage(MEME_KEY) || []
    const Idx = savedMemes.findIndex(meme => meme.selectedImgId === imgId)
    savedMemes.splice(Idx, 1)
    saveToStorage(MEME_KEY, savedMemes)
}

function getEmojis() {
    return gEmojis
}

function scrollEmojis(dir) {
    const emojiContainer = document.querySelector('.emoji-container')
    const scrollAmount = 60

    if (dir === 'left') {
        emojiContainer.scrollLeft -= scrollAmount
    } else {
        emojiContainer.scrollLeft += scrollAmount
    }
}

function addEmojiLine(emoji) {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        selectedLine.txt += emoji
    }
}

//NEED TO CONSIDER MVC STRUCTURE

function onMouseDown(event) {
    event.preventDefault()
    const mouseX = event.clientX - gCanvas.offsetLeft
    const mouseY = event.clientY - gCanvas.offsetTop
    handleLineDragStart(mouseX, mouseY)
}

function onTouchStart(event) {
    event.preventDefault()
    const touch = event.touches[0]
    const touchX = touch.clientX - gCanvas.offsetLeft
    const touchY = touch.clientY - gCanvas.offsetTop
    handleLineDragStart(touchX, touchY)
}

function handleLineDragStart(startX, startY) {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        const textWidth = gCtx.measureText(selectedLine.txt).width

        let lineX;
        if (selectedLine.align === 'left') {
            lineX = selectedLine.x
        } else if (selectedLine.align === 'right') {
            lineX = selectedLine.x - textWidth
        } else {
            lineX = selectedLine.x - textWidth / 2
        }

        if (
            startX >= lineX &&
            startX <= lineX + textWidth &&
            startY >= selectedLine.y - selectedLine.size &&
            startY <= selectedLine.y
        ) {
            gIsDragging = true
            gDragStartX = startX
            gDragStartY = startY
        }
    }
}

function onMouseMove(event) {
    if (gIsDragging) {
        const mouseX = event.clientX - gCanvas.offsetLeft
        const mouseY = event.clientY - gCanvas.offsetTop
        handleLineDrag(mouseX, mouseY)
    }
}

function onTouchMove(event) {
    if (gIsDragging) {
        const touch = event.touches[0]
        const touchX = touch.clientX - gCanvas.offsetLeft
        const touchY = touch.clientY - gCanvas.offsetTop
        handleLineDrag(touchX, touchY)
    }
}

function handleLineDrag(dragX, dragY) {
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        const deltaX = dragX - gDragStartX
        const deltaY = dragY - gDragStartY

        selectedLine.x += deltaX
        selectedLine.y += deltaY

        gDragStartX = dragX
        gDragStartY = dragY

        renderMeme()
    }
}

function onMouseUp() {
    gIsDragging = false
}

function onTouchEnd() {
    gIsDragging = false
}

function resetMeme(img) {

    const meme = getMeme()
    meme.selectedImgId = null

    if (img) {
        meme.selectedImgId = 'uploaded'
        renderMeme(img)
    }
}