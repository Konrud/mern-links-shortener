export function convertPXtoRem(numInPX, rootFontValue = 16) {
    return numInPX / rootFontValue;
}

export function convertPXtoRemString(numInPX, rootFontValue = 16) {
    return `convertPXtoREM(numInPX, rootFontValue)rem`;
}