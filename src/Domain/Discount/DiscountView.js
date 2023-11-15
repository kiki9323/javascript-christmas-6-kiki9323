import DiscountMsgFormat from './DiscountMsgFormat.js';
import MessageFormat from '../../Lib/MessageFormat.js';
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

  discountBenefits(appliedDiscount, totalPriceBeforeDiscount) {
    this.#view.printDiscountBenefits();
    this.#view.print(DiscountMsgFormat.printDiscountMessage(appliedDiscount, totalPriceBeforeDiscount));
  }

  totalDiscountAmount(totalDiscount) {
    this.#view.printTotalDiscountAmount();
    this.#view.print(totalDiscount ? `-${MessageFormat.wonPrice(totalDiscount)}` : '0원');
  }

  finalPayment(totalPriceBeforeDiscount, totalDiscountWithoutGift) {
    const finalPayment = totalPriceBeforeDiscount - totalDiscountWithoutGift;
    this.#view.printFinalPaymentAmountAfterDiscount();
    this.#view.print(MessageFormat.wonPrice(finalPayment));
  }
}

export default DiscountView;
