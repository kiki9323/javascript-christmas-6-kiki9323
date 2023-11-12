import { printDiscountMessage } from './utils.js';

/**
 * 할인 결과를 출력하는 역할을 한다.
 */
class DiscountView {
  #view;

  constructor(view) {
    this.#view = view;
  }

  printDiscountResult(appliedDiscount, totalPriceBeforeDiscount, totalDiscount, totalDiscountWithoutGift) {
    this.discountBenefits(appliedDiscount, totalPriceBeforeDiscount);
    this.totalDiscountAmount(totalDiscount);
    this.finalPayment(totalPriceBeforeDiscount, totalDiscountWithoutGift);
  }

  // <혜택 내역> : 할인들과 증정 이벤트 보여줌
  discountBenefits(appliedDiscount, totalPriceBeforeDiscount) {
    this.#view.printDiscountBenefits();
    this.#view.print(printDiscountMessage(appliedDiscount, totalPriceBeforeDiscount));
  }

  // <총혜택 금액> : 할인들과 증정 이벤트가격 모두 더해서 보여줌
  totalDiscountAmount(totalDiscount) {
    this.#view.printTotalDiscountAmount();
    this.#view.print(totalDiscount ? `-${totalDiscount.toLocaleString()}원` : '0원');
  }

  // <할인 후 예상 결제 금액> = 총혜택 금액 - 증정 이벤트
  finalPayment(totalPriceBeforeDiscount, totalDiscountWithoutGift) {
    const finalPayment = totalPriceBeforeDiscount - totalDiscountWithoutGift;
    this.#view.printFinalPaymentAmountAfterDiscount();
    this.#view.print(`${finalPayment.toLocaleString()}원`);
  }
}

export default DiscountView;
