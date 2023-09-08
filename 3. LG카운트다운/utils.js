const randomNumBetween = (min, max) => Math.random() * (max - min) + min;

const hypotenuse = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

export { randomNumBetween, hypotenuse };
