'use strict'

let gCanvas
let gCtx

var gImgs = [
    { id: 1, url: 'img/1.png', keywords: ['sleepy', 'tired'] },
    { id: 2, url: 'img/2.png', keywords: ['curious', 'alert'] },
    { id: 3, url: 'img/3.png', keywords: ['tired', 'angry'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: null,
    lines: [{
        txt: 'Default text',
        size: 30,
        color: '#ff0000',
    },
    {
        txt: 'Default text',
        size: 30,
        color: '#ff0000',
    }
    ]
}

var gKeywordSearchCountMap = { 'funny': 0, 'tired': 0, 'angry': 0 }

function getCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

function getMeme() {
    return gMeme
}

function showText() {
    gMeme.lines.forEach((line, index) => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`
        gCtx.fillText(line.txt, 50, 50 + index * 50)

        if (index === gMeme.selectedLineIdx) {
            gCtx.strokeStyle = 'rgba(255, 0, 0, 0.8)'
            gCtx.lineWidth = 2
            gCtx.strokeRect(48, 50 + index * 50 - line.size, gCtx.measureText(line.txt).width + 5, line.size + 5)
        }
    })
}

function setLineTxt(txt) {
    // gMeme.lines[0].txt = txt
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
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
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    if (selectedLine) {
        if ((selectedLine.size < 10 && delta < 0) || (selectedLine.size > 70 && delta > 0)) return
        selectedLine.size += delta
    }
}


function addLine() {
    const newLine = {
        txt: 'NEW LINE',
        size: 30,
        color: '#ff0000'
    }

    gMeme.lines.push(newLine)

    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    if (gMeme.lines.length > 1) {
        gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
    }
}