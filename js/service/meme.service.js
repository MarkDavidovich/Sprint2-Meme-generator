'use strict'

let gCanvas
let gCtx
let gIdx = 0

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
        txt: '',
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
