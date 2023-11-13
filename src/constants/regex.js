const REGEX = Object.freeze({
  number: /^\d+$/,
  itemFormat: /^([a-zA-Z가-힣]+-\d+(,|$))+$/,
});

export default REGEX;
