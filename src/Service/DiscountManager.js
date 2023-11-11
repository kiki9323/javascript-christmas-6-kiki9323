import { getBadgeName, printDiscountMessage } from '../Lib/utils.js';
/**
 * TODO: 필드, 생성자 함수 내부 정리하기
 * 쪼갤 부분 고민해보기
 * 상수 정리
 * 패턴이 있을지 찾아보기
 */

class DiscountManager {
  #view;

  constructor(view) {
    this.#view = view;
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

  // 외부(App.js)에서 총 결제금액 설졍
  addOrder(amount) {
    this.totalAmount = amount;
  }

  // 주문날짜와 메뉴카테고리 받아서 해당하는 할인 받기
  applyDiscount(orderDate, menuCategory) {
    return (this.appliedDiscount = {
      '크리스마스 디데이 할인': this.getDdayDiscount(orderDate),
      '평일 할인': this.getWeekdayDiscount(orderDate, menuCategory),
      '주말 할인': this.getWeekendDiscount(orderDate, menuCategory),
      '특별 할인': this.getSpecialDiscount(orderDate),
      '증정 이벤트': this.applyPromotion() || 0,
    });
  }

  // 총 할인 금액
  getTotalDiscount() {
    return Object.values(this.appliedDiscount).reduce((sum, discount) => sum + discount, 0);
  }

  // 메뉴 카테고리 개수 카운트
  countMenuCategories(orders) {
    const categoryCounts = {};
    for (const order of orders) {
      if (categoryCounts[order.category]) categoryCounts[order.category] += 1;
      else categoryCounts[order.category] = 1;
    }
    return categoryCounts;
  }

  // 크리스마스 할인 계산 로직
  getDdayDiscount(orderDate) {
    if (this.isInDateRange(orderDate, this.discounts.christmas.dates)) {
      return this.discounts.christmas.baseAmount + (orderDate - 1) * 100;
    }
    return 0;
  }

  // 평일 할인 계산 로직
  getWeekdayDiscount(orderDate, menuCategory) {
    const isWeekday = this.isWeekday(orderDate) && 'weekday';
    if (!isWeekday) return 0;
    return this.discounts[isWeekday].discountAmount * menuCategory[this.discounts.weekday.menuCategory];
  }

  // 주말 할인 계산 로직
  getWeekendDiscount(orderDate, menuCategory) {
    const isWeekend = this.isWeekend(orderDate) && 'weekend';
    if (!isWeekend) return 0;
    return this.discounts[isWeekend].discountAmount * menuCategory[this.discounts.weekend.menuCategory];
  }

  // 특별 할인 계산 로직
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

  /**
   * validator? 올바른 입력과 할인 대상 체크
   */
  // 입력한 방문 날짜가 1일과 31일 사이인지
  // TODO: 숫자만 입력, 문자나 공백 등 걸러내기
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

  printDiscountResult(totalBenefit, appliedDiscount, totalPrizeBeforeDiscount) {
    this.#view.printDiscountBenefits();
    this.#view.print(printDiscountMessage(appliedDiscount, totalPrizeBeforeDiscount));

    this.#view.printTotalDiscountAmount();
    this.#view.print(totalBenefit ? `-${totalBenefit.toLocaleString()}원` : '0원');

    this.#view.printFinalPaymentAmountAfterDiscount();
    this.#view.print(`${(totalPrizeBeforeDiscount - totalBenefit).toLocaleString()}원`);

    this.#view.printEventBadge();
    this.#view.print(getBadgeName(totalBenefit));
  }
}

export default DiscountManager;
