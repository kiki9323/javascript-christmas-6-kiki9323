import COMMON from '../../constants/common.js';
import DISCOUNT from './constants.js';

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

  countMenuCategories(orders) {
    return orders.reduce((counts, order) => {
      counts[order.category] = (counts[order.category] || 0) + order.quantity;
      return counts;
    }, {});
  }

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

  getTotalDiscount() {
    return Object.values(this.#appliedDiscount).reduce((sum, discount) => sum + discount, 0);
  }

  getTotalDiscountWithoutGift() {
    const totalDiscount = Object.entries(this.#appliedDiscount)
      .filter(([key]) => key !== DISCOUNT.types.giftEvent)
      .reduce((sum, [_, discount]) => sum + discount, 0);

    return totalDiscount;
  }
}

export default DiscountManager;
