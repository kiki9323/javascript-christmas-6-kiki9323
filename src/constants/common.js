const unit = Object.freeze({
  percentage: 100,
  thousand: 1000,
  eventMin: 10000,
});

const number = Object.freeze({
  maxOrderCount: 20,
});

const string = Object.freeze({
  comma: ',',
  dash: '-',
  default: '없음',
});

const COMMON = Object.freeze({
  unit,
  number,
  string,
});

export default COMMON;
