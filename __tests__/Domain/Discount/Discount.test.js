import Discount from '../../../src/Domain/Discount/Discount.js';

describe('Discount 클래스', () => {
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

  describe('getDdayDiscount 메소드', () => {
    // when
    const christmasDiscount = discount.getDdayDiscount(25);

    // then
    test('25일에 주문하면 크리스마스 할인이 적용되어야 한다.', () => {
      expect(christmasDiscount).toBe(1000 + (25 - 1) * 100);
    });
  });

  describe('getWeeklyDiscount 메소드', () => {
    // when
    const menuCategory = { 디저트: 5 };
    const weekdayDiscount = discount.getWeeklyDiscount(3, menuCategory, 'weekday');

    // then
    test('평일에 디저트를 5개 주문하면 평일 할인이 적용되어야 한다.', () => {
      expect(weekdayDiscount).toBe(2023 * 5);
    });
  });

  describe('getSpecialDiscount 메소드', () => {
    // when
    const specialDiscount = discount.getSpecialDiscount(24);

    // then
    test('특별 할인 날에 주문하면 특별 할인이 적용되어야 한다.', () => {
      expect(specialDiscount).toBe(1000);
    });
  });

  describe('applyPromotion 메소드', () => {
    // when
    const promotionDiscount = discount.applyPromotion(130000);

    // then
    test('총 주문 금액이 12만 원 이상이면 샴페인 할인이 적용되어야 한다.', () => {
      expect(promotionDiscount).toBe(25000);
    });
  });
});
