
// Node strings are UCS-2 internally (UCS-2 is the predecessor to UTF-16
// that assumes each character is exactly 2 bytes). Beause Unicode has more
// than 65536 characters, UTF-16 reserves some of the 2-byte sequences
// (0xD800 - 0xDFFF, known as surrogates) which are used in pairs to
// represent all unicode code points above U+FFFF.
//
// This means that there's a small possibility that a node string is not a
// valid unicode string: when it contains a surrogate that is not correctly
// paired. This module provides a function that replaces incorrectly paired
// surrogates by the unicode replacement character U+FFFD so that it can
// be treated as valid Unicode.

module.exports = function unicodeDragon(string) {
    return string.replace(/[\uD800-\uDFFF]/g, function (chr, pos) {
        if (chr.charCodeAt(0) >= 0xD800 && chr.charCodeAt(0) <= 0xDBFF) {
            if (string.charCodeAt(pos + 1) >= 0xDC00 && string.charCodeAt(pos + 1) <= 0xDFFF) {
                return chr;
            } else {
                return "\uFFFD";
            }
        } else {
            if (string.charCodeAt(pos - 1) >= 0xD800 && string.charCodeAt(pos - 1) <= 0xDBFF) {
                return chr;
            } else {
                return "\uFFFD";
            }
        }
    });
};
