'use strict'

let gCanvas
let gCtx

var gImgs = [{ id: 0, url: '', keywords: [] }]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: null,
    lines: [{
        txt: '',
        size: 50,
        color: 'red',
    }]
}

var gKeywordSearchCountMap = { 'funny': 0, 'cat': 0, 'angry': 0 }

function getCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

function getMeme() {
    const memeImg = new Image()
    const randNum = getRandomIntInclusive(1, 3)
    memeImg.src = `img/${randNum}.png`
    memeImg.onload = () => {
        gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height)
        showText()
    }
}

function showText() {
    gMeme.lines[0].txt = 'Hello mortal' //placeholder text

    gMeme.lines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`
        gCtx.fillText(line.txt, 50, 50)
    })
}

// function setUpImages(numOfImages) {
//     for (let i = 1; i <= numOfImages; i++) {
//         gImgs.push({
//             id: i,
//             url: `img/${i}.png`,
//             keywords: `keywords_${i}`
//         })
//     }
// //might be of use later
// }
