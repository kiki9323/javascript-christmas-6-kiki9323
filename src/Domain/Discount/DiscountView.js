import DiscountMsgFormat from './DiscountMsgFormat.js';
import MessageFormat from '../../Lib/MessageFormat.js';

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
    this.#view.print(DiscountMsgFormat.printDiscountMessage(appliedDiscount, totalPriceBeforeDiscount));
  }

  // <총혜택 금액> : 할인들과 증정 이벤트가격 모두 더해서 보여줌
  totalDiscountAmount(totalDiscount) {
    this.#view.printTotalDiscountAmount();
    this.#view.print(totalDiscount ? `-${MessageFormat.wonPrice(totalDiscount)}` : '0원');
  }

  // <할인 후 예상 결제 금액> = 총혜택 금액 - 증정 이벤트
  finalPayment(totalPriceBeforeDiscount, totalDiscountWithoutGift) {
    const finalPayment = totalPriceBeforeDiscount - totalDiscountWithoutGift;
    this.#view.printFinalPaymentAmountAfterDiscount();
    this.#view.print(MessageFormat.wonPrice(finalPayment));
  }
}

export default DiscountView;
