class DiscountManager {
  constructor() {
    this.appliedDiscount = {};
    if (!DiscountManager.instance) {
      this.totalAmount = 0;
      this.discounts = {
        christmas: {
          dates: { start: 1, end: 25 },
          baseAmount: 1000,
        },
        weekday: {
          dates: [4, 5, 6, 7, 11, 12, 13, 14, 18, 19, 20, 21, 25, 26, 27, 28],
          menuCategory: '디저트',
          discountAmount: 2023,
        },
        weekend: { dates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30], menuCategory: '메인', discountAmount: 2023 },
        special: { dates: [3, 10, 17, 24, 25, 31], discountAmount: 1000 },
      };
      this.promotion = { threshold: 120000, gift: '샴페인 1병', discountAmount: 25000 };

      DiscountManager.instance = this;
    }

    return DiscountManager.instance;
  }

  addOrder(amount) {
    this.totalAmount = amount;
  }

  applyDiscount(orderDate, menuCategory) {
    // 크리스마스 할인
    const dDayDiscount = this.getDdayDiscount(orderDate);

    // 평일 및 주말 할인
    const weekdayDiscount = this.getWeekdayDiscount(orderDate, menuCategory);
    const weekendDiscount = this.getWeekendDiscount(orderDate, menuCategory);

    // 특별 할인
    const specialDiscount = this.getSpecialDiscount(orderDate);

    const giftDiscount = this.applyPromotion() || 0;

    return (this.appliedDiscount = {
      '크리스마스 디데이 할인': dDayDiscount,
      '평일 할인': weekdayDiscount,
      '주말 할인': weekendDiscount,
      '특별 할인': specialDiscount,
      '증정 이벤트': giftDiscount,
    });
  }

  getTotalDiscount() {
    return Object.values(this.appliedDiscount).reduce((sum, discount) => sum + discount, 0);
  }

  // 크리스마스 할인
  getDdayDiscount(orderDate) {
    if (this.isInDateRange(orderDate, this.discounts.christmas.dates)) {
      return this.discounts.christmas.baseAmount + (orderDate - 1) * 100;
    }
    return 0;
  }

  /**
   * 평일 할인
   */
  getWeekdayDiscount(orderDate, menuCategory) {
    const isWeekday = this.isWeekday(orderDate) && 'weekday';
    if (!isWeekday) return 0;
    return this.discounts[isWeekday].discountAmount * menuCategory[this.discounts.weekday.menuCategory];
  }

  // 주말 할인
  getWeekendDiscount(orderDate, menuCategory, memuQuantity = 1) {
    const isWeekend = this.isWeekend(orderDate) && 'weekend';
    if (!isWeekend) return 0;
    return this.discounts[isWeekend].discountAmount * menuCategory[this.discounts.weekend.menuCategory];
  }

  // 특별 할인
  getSpecialDiscount(orderDate) {
    if (this.isInSpecialDates(orderDate)) {
      return this.discounts.special.discountAmount * orderDate;
    }
    return 0;
  }

  // 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
  applyPromotion() {
    if (this.totalAmount >= this.promotion.threshold) {
      return this.promotion.discountAmount;
    }
    return 0;
  }

  // 입력한 방문 날짜가 1일과 31일 사이인지
  isInDateRange(date, { start, end }) {
    return date >= start && date <= end;
  }

  // 평일 할인 대상인지
  isWeekday(date) {
    return this.discounts.weekday.dates.includes(date);
  }

  // 주말 할인 대상인지
  isWeekend(date) {
    return this.discounts.weekend.dates.includes(date);
  }

  // 스페셜 할인 대상인지
  isInSpecialDates(date) {
    return this.discounts.special.dates.includes(date);
  }
}

export default DiscountManager;
