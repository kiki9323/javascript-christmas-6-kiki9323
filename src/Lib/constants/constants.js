const unit = Object.freeze({
  value: 1000,
});

const number = Object.freeze({
  orderLimitCount: 20,
  minEventApplyAmount: 10000,
});

const string = Object.freeze({
  comma: ',',
  dash: '-',
});

const CONSTANTS = Object.freeze({
  unit,
  number,
  string,
});

export default CONSTANTS;
