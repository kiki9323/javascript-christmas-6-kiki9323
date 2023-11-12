// import { printDiscountMessage } from '../Lib/utils.js';
// /**
//  * TODO: 필드, 생성자 함수 내부 정리하기
//  * 쪼갤 부분 고민해보기
//  * 상수 정리
//  * 패턴이 있을지 찾아보기
//  */

// class DiscountManager {
//   #view;

//   constructor(view) {
//     this.#view = view;
//     this.appliedDiscount = {};
//     if (!DiscountManager.instance) {
//       this.totalAmount = 0;
//       this.discounts = {
//         christmas: {
//           dates: { start: 1, end: 25 },
//           baseAmount: 1000,
//         },
//         // 평일 (일~목), 디저트
//         weekday: {
//           dates: [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31],
//           menuCategory: '디저트',
//           discountAmount: 2023,
//         },
//         // 주말 (금,토), 메인
//         weekend: { dates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30], menuCategory: '메인', discountAmount: 2023 },
//         special: { dates: [3, 10, 17, 24, 25, 31], discountAmount: 1000 },
//       };
//       this.promotion = { threshold: 120000, gift: '샴페인 1병', discountAmount: 25000 };

//       DiscountManager.instance = this;
//     }

//     return DiscountManager.instance;
//   }

//   // 외부(App.js)에서 총 결제금액 설졍
//   addOrder(amount) {
//     this.totalAmount = amount;
//   }

//   // 주문 메뉴를 받아서 할인 대상이 되는 메뉴 카테고리로 분리하여 개수 카운트
//   countMenuCategories(orders) {
//     const categoryCounts = {};
//     for (const order of orders) {
//       if (!categoryCounts[order.category]) categoryCounts[order.category] = 0;
//       categoryCounts[order.category] += order.quantity;
//     }
//     return categoryCounts;
//   }

//   // 주문날짜와 메뉴카테고리 개수 받아서 해당하는 할인 받기
//   applyDiscount(orderDate, menuCategory) {
//     // 총주문 금액 10000원 이상부터 이벤트 적용
//     if (this.totalAmount < 10000) {
//       return (this.appliedDiscount = this.getDefaultDiscount());
//     }

//     return (this.appliedDiscount = {
//       '크리스마스 디데이 할인': this.getDdayDiscount(orderDate),
//       '평일 할인': this.getWeekdayDiscount(orderDate, menuCategory),
//       '주말 할인': this.getWeekendDiscount(orderDate, menuCategory),
//       '특별 할인': this.getSpecialDiscount(orderDate),
//       '증정 이벤트': this.applyPromotion() || 0,
//     });
//   }

//   getDefaultDiscount() {
//     return {
//       '크리스마스 디데이 할인': 0,
//       '평일 할인': 0,
//       '주말 할인': 0,
//       '특별 할인': 0,
//       '증정 이벤트': 0,
//     };
//   }

//   ///////S///////
//   // 크리스마스 할인 계산 로직
//   getDdayDiscount(orderDate) {
//     if (this.isInDateRange(orderDate, this.discounts.christmas.dates)) {
//       return this.discounts.christmas.baseAmount + (orderDate - 1) * 100;
//     }
//     return 0;
//   }

//   // 평일 할인 계산 로직
//   getWeekdayDiscount(orderDate, menuCategory) {
//     const { menuCategory: category, discountAmount: discount } = this.discounts.weekday;
//     const isWeekday = this.isWeekday(orderDate);
//     const menuCount = menuCategory[category];

//     if (isWeekday && menuCount) return discount * menuCount;
//     return 0;
//   }

//   // 주말 할인 계산 로직
//   getWeekendDiscount(orderDate, menuCategory) {
//     const { menuCategory: category, discountAmount: discount } = this.discounts.weekend;
//     const isWeekend = this.isWeekend(orderDate);
//     const menuCount = menuCategory[category];

//     if (isWeekend && menuCount) discount * menuCount;
//     return 0;
//   }

//   // 특별 할인 계산 로직
//   getSpecialDiscount(orderDate) {
//     if (this.isInSpecialDates(orderDate)) {
//       return this.discounts.special.discountAmount;
//     }
//     return 0;
//   }

//   // 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
//   applyPromotion() {
//     if (this.totalAmount >= this.promotion.threshold) {
//       return this.promotion.discountAmount;
//     }
//     return 0;
//   }
//   ///////E///////

//   // <총혜택 금액> 증정 이벤트를 제외한 할인 대상들만 더한다.
//   // -> 일단 다 더하고, 마지막 계산에서 증정 가격만 제외한다..?
//   getTotalDiscount() {
//     // 증정 이벤트까지 포함된 전체 혜택
//     return Object.values(this.appliedDiscount).reduce((sum, discount) => sum + discount, 0);
//   }

//   // 입력한 방문 날짜가 1일과 31일 사이인지
//   // TODO: 숫자만 입력, 문자나 공백 등 걸러내기
//   isInDateRange(date, { start, end }) {
//     return date >= start && date <= end;
//   }

//   // 평일 할인 대상인지
//   isWeekday(date) {
//     return this.discounts.weekday.dates.includes(Number(date));
//   }

//   // 주말 할인 대상인지
//   isWeekend(date) {
//     return this.discounts.weekend.dates.includes(Number(date));
//   }

//   // 스페셜 할인 대상인지
//   isInSpecialDates(date) {
//     return this.discounts.special.dates.includes(Number(date));
//   }

//   // 출력
//   printDiscountResult(totalBenefit, appliedDiscount, totalPrizeBeforeDiscount, isGiftEligible) {
//     console.log('appliedDiscount', appliedDiscount);
//     // Discount <혜택 내역> : 할인들과 증정 이벤트 보여줌
//     this.#view.printDiscountBenefits();
//     this.#view.print(printDiscountMessage(appliedDiscount, totalPrizeBeforeDiscount));

//     // Discount <총혜택 금액> : 할인들과 증정 이벤트가격 모두 더해서 보여줌
//     this.#view.printTotalDiscountAmount();
//     this.#view.print(totalBenefit ? `-${totalBenefit.toLocaleString()}원` : '0원');

//     // Discount <할인 후 예상 결제 금액> : 할인 가격들만 빼서 보여줌 (증정 이벤트 제외)
//     this.#view.printFinalPaymentAmountAfterDiscount();
//     const gift = isGiftEligible ? isGiftEligible : 0;
//     const finalPayment = totalPrizeBeforeDiscount - totalBenefit + gift;
//     this.#view.print(`${finalPayment.toLocaleString()}원`);
//   }
// }

// export default DiscountManager;
