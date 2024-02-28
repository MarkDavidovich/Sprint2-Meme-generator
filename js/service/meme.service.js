'use strict'

let gCanvas
let gCtx

var gImgs = [{ id: 0, url: '', keywords: [] }]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: null,
    lines: [{
        txt: '',
        size: 20,
        color: 'red',
    }]
}

var gKeywordSearchCountMap = { 'funny': 0, 'cat': 0, 'angry': 0 }

function getCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

// function getMeme(num) {

//     const memeImg = new Image()
//     memeImg.src = `img/${num}.png`

//     memeImg.onload = () => {
//     }
//     return memeImg

//     //this doesn't work
// }

function showText() {
    gMeme.lines[0].txt = 'Hello'

    gMeme.lines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`
        gCtx.fillText(line.txt, 20, 30)
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
// }
