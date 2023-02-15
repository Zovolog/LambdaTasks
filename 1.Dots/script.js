const EMTPTY_CHAR = "";
const DOT_CHAR = ".";

function useDots(str) {

  const variants = [];
  const numberOfBetweens = str.length - 1;
  const numberOfVariants = 2 ** numberOfBetweens;
  for (let i = 0; i < numberOfVariants; i++) {
    let variant = i // 2
      .toString(2) // 10
      .padStart(numberOfBetweens, 0)
      .split(EMTPTY_CHAR)
      .map((el, j) => (el == 0 ? EMTPTY_CHAR : DOT_CHAR) + str[j + 1])
      .reduce((v, el) => v + el, str[0]);
    variants.push(variant);
  }
  return variants;
}

console.log(useDots("abcк"));
