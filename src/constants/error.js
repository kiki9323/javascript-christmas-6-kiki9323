const date = Object.freeze({
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidType: '숫자만 입력해 주세요. (공백 혹은 문자가 포함되어 있습니다.)',
  invalidZero: '숫자 형식을 지켜주세요. (좋은 예시: 1, 안 좋은 예시: 01) 0을 앞자리에 붙이면 안 됩니다.',
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
