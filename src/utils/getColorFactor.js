function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

export function pickHex(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
    return "#" + ColorToHex(rgb[0]) + ColorToHex(rgb[1]) + ColorToHex(rgb[2]);
};
