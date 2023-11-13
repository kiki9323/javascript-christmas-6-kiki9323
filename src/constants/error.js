const date = Object.freeze({
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidType: '숫자만 입력해 주세요.',
});

const order = Object.freeze({
  invalid: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  onlyDrinks: '음료만 주문할 수 없습니다. 다시 입력해 주세요.',
  maxOrderCount: '총 주문 갯수는 20개를 초과할 수 없습니다.',
  minOrderCount: '1개 이상 부터 주문 가능합니다.',
  duplicatedMenu: '중복된 메뉴가 있습니다.',
});

const inputView = Object.freeze({
  date,
  order,
});

const ERROR = Object.freeze({
  inputView,
});

export default ERROR;