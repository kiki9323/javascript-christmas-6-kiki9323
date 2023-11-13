import COMMON from '../../constants/common.js';
import DISCOUNT from './constants.js';

/**
 * Discount 클래스를 활용하여 주문에 적용될 최종 할인을 결정헌다.
 */
class DiscountManager {
  #discounts;
  #totalAmount;
  #appliedDiscount;

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
    return orders.reduce((counts, order) => {
      counts[order.category] = (counts[order.category] || 0) + order.quantity;
      return counts;
    }, {});
  }

  // 주문날짜와 메뉴카테고리 개수 받아서 해당하는 할인 받기
  applyDiscount(orderDate, menuCategory) {
    if (this.#totalAmount < COMMON.unit.eventMin) {
      return (this.#appliedDiscount = this.getDefaultDiscount());
    }

    return (this.#appliedDiscount = {
      [DISCOUNT.types.dDay]: this.#discounts.getDdayDiscount(orderDate),
      [DISCOUNT.types.weekday]: this.#discounts.getWeeklyDiscount(orderDate, menuCategory, 'weekday'),
      [DISCOUNT.types.weekend]: this.#discounts.getWeeklyDiscount(orderDate, menuCategory, 'weekend'),
      [DISCOUNT.types.special]: this.#discounts.getSpecialDiscount(orderDate),
      [DISCOUNT.types.giftEvent]: this.applyPromotion(),
    });
  }

  getDefaultDiscount() {
    return {
      [DISCOUNT.types.dDay]: 0,
      [DISCOUNT.types.weekday]: 0,
      [DISCOUNT.types.weekend]: 0,
      [DISCOUNT.types.special]: 0,
      [DISCOUNT.types.giftEvent]: 0,
    };
  }

  applyPromotion() {
    return this.#discounts.applyPromotion(this.#totalAmount);
  }

  // <총혜택 금액> 증정 이벤트를 포함한 할인 대상들만 더한다.
  getTotalDiscount() {
    return Object.values(this.#appliedDiscount).reduce((sum, discount) => sum + discount, 0);
  }

  // <할인 후 예상 결제 금액> = 총혜택 금액 - 증정 이벤트
  getTotalDiscountWithoutGift() {
    const totalDiscount = Object.entries(this.#appliedDiscount)
      .filter(([key]) => key !== DISCOUNT.types.giftEvent)
      .reduce((sum, [_, discount]) => sum + discount, 0);

    return totalDiscount;
  }
}

export default DiscountManager;
