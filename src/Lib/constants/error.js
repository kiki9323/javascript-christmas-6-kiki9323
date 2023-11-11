const date = Object.freeze({
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidType: '숫자만 입력해 주세요.',
});

const order = Object.freeze({
  invalid: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  invalidOnlyDrinks: '음료만 주문할 수 없습니다. 다시 입력해 주세요.',
});

const inputView = Object.freeze({
  date: date,
  order: order,
});

const ERROR = Object.freeze({
  inputView,
});

export default ERROR;
