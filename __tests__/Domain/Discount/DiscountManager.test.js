import Discount from '../../../src/Domain/Discount/Discount.js';
import DiscountManager from '../../../src/Domain/Discount/DiscountManager.js';

describe('DiscountManager 클래스', () => {
  // given
  const discounts = {
    christmas: {
      dates: { start: 1, end: 25 },
      baseAmount: 1000,
    },
    weekday: {
      dates: [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31],
      menuCategory: '디저트',
      discountAmount: 2023,
    },
    weekend: {
      dates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
      menuCategory: '메인',
      discountAmount: 2023,
    },
    special: {
      dates: [3, 10, 17, 24, 25, 31],
      discountAmount: 1000,
    },
  };

  const promotion = {
    threshold: 120000,
    discountAmount: 25000,
  };

  const discount = new Discount(discounts, promotion);
  const discountManager = new DiscountManager(discount);

  describe('setTotalAmount 메서드', () => {
    // when
    discountManager.setTotalAmount(130000);

    // then
    test('주문 금액을 설정하면, getTotalAmount 메서드로 그 금액을 가져와야 한다.', () => {
      expect(discountManager.getTotalAmount()).toBe(130000);
    });
  });

  describe('countMenuCategories 메서드', () => {
    // given
    const orders = [
      { category: '디저트', quantity: 5 },
      { category: '메인', quantity: 3 },
    ];

    // when
    const menuCategories = discountManager.countMenuCategories(orders);

    // then
    test('주문된 메뉴 카테고리별로 개수를 카운트해야 한다.', () => {
      expect(menuCategories).toEqual({ 디저트: 5, 메인: 3 });
    });
  });

  describe('applyDiscount 메서드', () => {
    // given
    const orderDate = 3;
    const menuCategory = { 디저트: 5 };

    // when
    discountManager.setTotalAmount(130000);
    const appliedDiscount = discountManager.applyDiscount(orderDate, menuCategory);

    // then
    test('주문 날짜와 메뉴 카테고리, 특별 할인 따라 할인이 적용되어야 한다.', () => {
      expect(appliedDiscount).toMatchObject({
        '크리스마스 디데이 할인': 1000 + (3 - 1) * 100,
        '평일 할인': 2023 * 5,
        '주말 할인': 0,
        '특별 할인': 1000,
        '증정 이벤트': 25000,
      });
    });
  });

  describe('getTotalDiscount 메서드', () => {
    // when
    const totalDiscount = discountManager.getTotalDiscount();

    // then
    test('적용된 모든 할인 금액을 합쳐야 한다.', () => {
      expect(totalDiscount).toBe(1000 + (3 - 1) * 100 + 2023 * 5 + 25000 + 1000);
    });
  });

  describe('getTotalDiscountWithoutGift 메서드', () => {
    // when
    const totalDiscountWithoutGift = discountManager.getTotalDiscount('증정 이벤트');

    // then
    it('증정 이벤트를 제외한 모든 할인 금액을 합쳐야 한다.', () => {
      expect(totalDiscountWithoutGift).toBe(1000 + (3 - 1) * 100 + 2023 * 5 + 1000);
    });
  });
});
