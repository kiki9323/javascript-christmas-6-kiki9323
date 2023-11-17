import COMMON from '../../Constants/common.js';

class Discount {
  constructor(discounts, promotion) {
    this.discounts = discounts;
    this.promotion = promotion;
  }

  getDdayDiscount(orderDate) {
    const { dates, baseAmount } = this.discounts.christmas;
    return this.isInDateRange(orderDate, dates) ? baseAmount + (orderDate - 1) * COMMON.unit.percentage : 0;
  }

  getWeeklyDiscount(orderDate, menuCategory, category) {
    const discountInfo = this.discounts[category];
    const isApplicable = this.isInDates(orderDate, discountInfo.dates);
    const menuCount = menuCategory[discountInfo.menuCategory];

    return isApplicable && menuCount ? discountInfo.discountAmount * menuCount : 0;
  }

  getSpecialDiscount(orderDate) {
    const { dates, discountAmount } = this.discounts.special;
    return this.isInDates(orderDate, dates) ? discountAmount : 0;
  }

  applyPromotion(totalAmount) {
    const { threshold, discountAmount } = this.promotion;
    return totalAmount >= threshold ? discountAmount : 0;
  }

  // 크리스마스 할인 조건 (방문 날짜가 '1'일과 '25'일 사이인지)
  isInDateRange(date, { start, end }) {
    return date >= start && date <= end;
  }

  isInDates(date, dates) {
    return dates.includes(Number(date));
  }
}

export default Discount;
