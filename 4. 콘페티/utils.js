const randomNumBetween = (min, max) => Math.random() * (max - min) + min;

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
const hypotenuse = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
export { randomNumBetween, hexToRgb, hypotenuse };
