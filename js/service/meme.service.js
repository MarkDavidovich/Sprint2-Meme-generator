'use strict'

let gCanvas
let gCtx
let gIdx = 0

var gImgs = [
    { id: 1, url: 'img/1.png', keywords: ['sleepy', 'tired'] },
    { id: 2, url: 'img/2.png', keywords: ['curious', 'alert'] },
    { id: 3, url: 'img/3.png', keywords: ['tired', 'angry'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: null,
    lines: []
}

var gKeywordSearchCountMap = { 'funny': 0, 'tired': 0, 'angry': 0 }

function getCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    gCanvas.addEventListener('click', onCanvasClick)
}

function getMeme() {
    return gMeme
}

function showText() {
    gMeme.lines.forEach((line, index) => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`

        gCtx.fillText(line.txt, line.x, line.y)

        if (index === gMeme.selectedLineIdx) {
            gCtx.strokeStyle = 'rgba(255, 0, 0, 0.8)'
            gCtx.lineWidth = 2
            gCtx.strokeRect(line.x - 2, line.y - line.size, line.width + 5, line.size + 5)
        }

        line.width = gCtx.measureText(line.txt).width
    })
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
        txt: 'NEW LINE',
        size: 30,
        color: '#ff0000',
        x: 50,
        y: calculateY(),
        width: 0,
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

// function addLine() {
//     const newLine = {
//         txt: 'new line',
//         size: 30,
//         color: '#ff0000',
//         x: 50,
//         y: 50,
//         width: 0,
//     }

//     gMeme.lines.push(newLine)
//     gMeme.selectedLineIdx = gMeme.lines.length - 1

// }

function calculateY() {
    const lineSpacing = 50
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

        // gMeme.lines.forEach((line, index) => {
        //     line.y = 50 + index * 50;
        // })

        gMeme.selectedLineIdx = Math.min(gMeme.selectedLineIdx, gMeme.lines.length - 1)
        console.log(gMeme.lines.length)
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
        if (
            mouseX >= line.x && mouseX <= line.x + line.width &&
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