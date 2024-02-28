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
        color: 'red',
    }]
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
    gMeme.lines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`
        gCtx.fillText(line.txt, 50, 50)
    })
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}

function downloadMeme(elLink) {
    elLink.href = '#'
    const dataUrl = gCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'dank-meme'
}
// function setUpImages(numOfImages) {
//     for (let i = 1; i <= numOfImages; i++) {
//         gImgs.push({
//             id: i,
//             url: `img/${i}.png`,
//             keywords: `keywords_${i}` //placeholder for now
//         })
//     }
//     //might be of use later
// }
