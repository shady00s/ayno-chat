"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function colorGenerator() {
    const red = (Math.floor(Math.random() * 60));
    const green = (Math.floor(Math.random() * 40));
    const blue = (Math.floor(Math.random() * 39));
    return `rgb(${red},${green},${blue})`;
}
exports.default = colorGenerator;
//# sourceMappingURL=user_color_generator.js.map