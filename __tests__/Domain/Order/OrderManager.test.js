import OrderManager from '../../../src/Domain/Order/OrderManager.js';

describe('OrderManager 클래스', () => {
  describe('calculateTotalOrderAmount 메서드', () => {
    test('주문한 메뉴의 구매 금액을 반환해야 한다.', () => {
      // given
      const orderManager = new OrderManager();
      const orderedMenuAndCount = [
        { name: '바비큐립', quantity: 2, onePrice: 54000, totalPrice: 54000 * 2 },
        { name: '아이스크림', quantity: 1, onePrice: 5000, totalPrice: 5000 },
      ];

      // when
      const expectedTotal = orderedMenuAndCount.reduce((sum, order) => sum + order.totalPrice, 0);

      // then
      expect(orderManager.calculateTotalOrderAmount(orderedMenuAndCount)).toBe(expectedTotal);
    });
  });
});
