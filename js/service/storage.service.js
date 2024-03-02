'use strict'

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
    localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    console.log(`loaded value for key ${key}`, val)
    return JSON.parse(val)
}
