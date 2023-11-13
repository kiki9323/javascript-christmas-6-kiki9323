import COMMON from '../../constants/common.js';
/**
 * 할인과 관련된 로직을 처리한다.
 * 할인 조건과 할인 계산과 관련된 데이터 및 메서드를 포함한다.
 */
class Discount {
  constructor(discounts, promotion) {
    this.discounts = discounts;
    this.promotion = promotion;
  }

  // 크리스마스 할인 계산 로직
  getDdayDiscount(orderDate) {
    const { dates, baseAmount } = this.discounts.christmas;
    return this.isInDateRange(orderDate, dates) ? baseAmount + (orderDate - 1) * COMMON.unit.percentage : 0;
  }

  // weekly = 평일(weekday) 할인 + 주말(weekend) 할인
  getWeeklyDiscount(orderDate, menuCategory, category) {
    const discountInfo = this.discounts[category];
    const isApplicable = this.isInDates(orderDate, discountInfo.dates);
    const menuCount = menuCategory[discountInfo.menuCategory];

    return isApplicable && menuCount ? discountInfo.discountAmount * menuCount : 0;
  }

  // 특별 할인 계산 로직
  getSpecialDiscount(orderDate) {
    const { dates, discountAmount } = this.discounts.special;
    return this.isInDates(orderDate, dates) ? discountAmount : 0;
  }

  // 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
  applyPromotion(totalAmount) {
    const { threshold, discountAmount } = this.promotion;
    return totalAmount >= threshold ? discountAmount : 0;
  }

  // 크리스마스 할인 조건 (방문 날짜가 1일과 25일 사이인지)
  isInDateRange(date, { start, end }) {
    return date >= start && date <= end;
  }

  isInDates(date, dates) {
    return dates.includes(Number(date));
  }
}

export default Discount;
