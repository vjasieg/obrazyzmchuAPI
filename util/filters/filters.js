var express = require('express');
var router = express.Router();
var filters = require("../json/filters.json")

function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}

router.get('', (req, res, next) => {
    var translated = filters.filters
    translated = renameKeys(translated, {size: "Rozmiar", color: "Kolor", pattern: "Wzór"})
    res.status(200).json(translated)
})

module.exports = router;