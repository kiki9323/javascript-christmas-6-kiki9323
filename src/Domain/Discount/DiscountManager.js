/**
 * Discount 클래스를 활용하여 주문에 적용될 최종 할인을 결정헌다.
 */
class DiscountManager {
  #discounts;
  #totalAmount;

  constructor(discounts) {
    this.#discounts = discounts;
    this.#totalAmount = 0;
  }

  setTotalAmount(amount) {
    this.#totalAmount = amount;
  }

  getTotalAmount() {
    return this.#totalAmount;
  }

  // 주문 메뉴를 받아서 할인 대상이 되는 메뉴 카테고리로 분리하여 개수 카운트
  countMenuCategories(orders) {
    const categoryCounts = {};
    for (const order of orders) {
      if (!categoryCounts[order.category]) categoryCounts[order.category] = 0;
      categoryCounts[order.category] += order.quantity;
    }
    return categoryCounts;
  }

  // 주문날짜와 메뉴카테고리 개수 받아서 해당하는 할인 받기
  applyDiscount(orderDate, menuCategory) {
    // 총주문 금액 10000원 이상부터 이벤트 적용
    if (this.#totalAmount < 10000) {
      return (this.appliedDiscount = this.getDefaultDiscount());
    }

    return (this.appliedDiscount = {
      '크리스마스 디데이 할인': this.#discounts.getDdayDiscount(orderDate),
      '평일 할인': this.#discounts.getWeeklyDiscount(orderDate, menuCategory, 'weekday'),
      '주말 할인': this.#discounts.getWeeklyDiscount(orderDate, menuCategory, 'weekend'),
      '특별 할인': this.#discounts.getSpecialDiscount(orderDate),
      '증정 이벤트': this.applyPromotion(),
    });
  }

  getDefaultDiscount() {
    return {
      '크리스마스 디데이 할인': 0,
      '평일 할인': 0,
      '주말 할인': 0,
      '특별 할인': 0,
      '증정 이벤트': 0,
    };
  }

  applyPromotion() {
    return this.#discounts.applyPromotion(this.#totalAmount);
  }

  // <총혜택 금액> 증정 이벤트를 포함한 할인 대상들만 더한다.
  getTotalDiscount() {
    return Object.values(this.appliedDiscount).reduce((sum, discount) => sum + discount, 0);
  }

  // <할인 후 예상 결제 금액> = 총혜택 금액 - 증정 이벤트
  getTotalDiscountWithoutGift() {
    const totalDiscount = Object.entries(this.appliedDiscount)
      .filter(([key]) => key !== '증정 이벤트')
      .reduce((sum, [_, discount]) => sum + discount, 0);

    return totalDiscount;
  }
}

export default DiscountManager;
