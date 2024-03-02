'use strict'

var gImgs = [
    { id: 1, url: 'img/1.png', keywords: ['sleepy', 'tired'] },
    { id: 2, url: 'img/2.png', keywords: ['curious', 'alert'] },
    { id: 3, url: 'img/3.png', keywords: ['tired', 'angry'] },
    { id: 4, url: 'img/4.png', keywords: ['fighting', 'angry', 'multiple'] },
    { id: 5, url: 'img/5.png', keywords: ['frightened', 'alert'] },
    { id: 6, url: 'img/6.png', keywords: ['tired', 'angry'] },
    { id: 7, url: 'img/7.png', keywords: ['frightened', 'surprised'] },
    { id: 8, url: 'img/8.png', keywords: ['fighting', 'multiple'] },
    { id: 9, url: 'img/9.png', keywords: ['sad'] },
    { id: 10, url: 'img/10.png', keywords: ['curious', 'small'] },
]

var gFilteredImgs = gImgs.slice()

function imgChange(id) {
    gMeme.selectedImgId = id

}