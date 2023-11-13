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

