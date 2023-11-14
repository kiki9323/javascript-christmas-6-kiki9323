const read = Object.freeze({
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  orderMenuAndCount: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

const eventInfo = {
  title: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n',
};

const header = {
  orderMenu: '\n<주문 메뉴>',
  totalAmountBeforeDiscount: '\n<할인 전 총주문 금액>',
  giftMenu: '\n<증정 메뉴>',
  discountBenefits: '\n<혜택 내역>',
  totalDiscountAmount: '\n<총혜택 금액>',
  finalPaymentAmount: '\n<할인 후 예상 결제 금액>',
  eventBadge: '\n<12월 이벤트 배지>',
};

const MESSAGE = Object.freeze({
  read,
  eventInfo,
  header,
});

export default MESSAGE;
