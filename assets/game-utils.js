function findLetterIndices(word, letter) {
    var indices = [];
    if (!word || !letter) {
        return indices;
    }
    var lowerLetter = letter.toLowerCase();
    var chars = Array.isArray(word) ? word : word.split("");
    for (var i = 0; i < chars.length; i++) {
        if (chars[i] && chars[i].toLowerCase() === lowerLetter) {
            indices.push(i);
        }
    }
    return indices;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { findLetterIndices };
} else {
    window.findLetterIndices = findLetterIndices;
}
