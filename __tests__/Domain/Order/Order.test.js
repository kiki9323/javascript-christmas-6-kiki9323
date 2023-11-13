import ORDER from '../../../src/Domain/Order/constants.js';
import Order from '../../../src/Domain/Order/Order.js';

describe('processOrderItems 메서드', () => {
  test('음료만 주문된 경우 에러를 던져야 한다.', () => {
    // given
    const INVALID_ORDER_MESSAGE = '[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.';
    const INPUTS = ['레드와인-2'];

    // when, then
    expect(() => new Order(INPUTS)).toThrow(INVALID_ORDER_MESSAGE);
  });
});

describe('isOnlyDrinks 메서드', () => {
  test('주문 항목에 음료가 아닌 메뉴가 포함된 경우 false를 반환해야 한다.', () => {
    // given
    const items = ['레드와인-1', '해산물파스타-2'];

    // when
    const order = new Order(items);
    const result = order.isOnlyDrinks(items);

    // then
    expect(result).toBe(false);
  });
});

describe('createSingleOrderData 메서드', () => {
  test('입력한 메뉴에 대해 주문 객체가 생성되어야 한다..', () => {
    const item = '초코케이크-2';
    const order = new Order([item]);
    const expected = {
      category: '디저트',
      name: '초코케이크',
      quantity: 2,
      onePrice: 15000,
      totalPrice: 30000,
    };

    expect(order.createSingleOrderData(item)).toEqual(expected);
  });
});

describe('getCategoryOfMenu 메서드', () => {
  test('입력한 메뉴에 대한 정확한 카테고리명이 나와야 한다.', () => {
    // given
    const items = ['양송이수프-1', '초코케이크-2'];

    // when
    const order = new Order(items);

    // then
    expect(order.getCategoryOfMenu('양송이수프')).toBe('애피타이저');
    expect(order.getCategoryOfMenu('초코케이크')).toBe('디저트');
  });

  test('유효하지 않은 주문을 했을 경우 에러를 던져야 한다.', () => {
    // given
    const INVALID_ORDER_MESSAGE = '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.';
    const items = ['김밥-2'];

    // when, then
    expect(() => new Order(items)).toThrow(INVALID_ORDER_MESSAGE);
  });
});
