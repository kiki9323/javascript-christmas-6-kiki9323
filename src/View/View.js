import InputView from './InputView.js';
import MESSAGE from '../constants/message.js';
import MessageFormat from '../Lib/MessageFormat.js';
import OutputView from './OutputView.js';

class View {
  #inputView = InputView;

  #outputView = OutputView;

  async readVisitDate() {
    const input = await this.#inputView.readVisitDate(MESSAGE.read.visitDate);
    return input;
  }

  async readOrderMenu() {
    const input = await this.#inputView.readMenuAndCount(MESSAGE.read.orderMenuAndCount);
    return input;
  }

  print(message) {
    this.#outputView.print(message);
  }

  printEventTitle() {
    this.#outputView.print(MESSAGE.eventInfo.title);
  }

  printEventInfo(visitDate) {
    this.#outputView.print(MessageFormat.preview(visitDate));
  }

  printOrderHeader() {
    this.#outputView.print(MESSAGE.header.orderMenu);
  }

  printTotalAmountBeforeDiscount() {
    this.#outputView.print(MESSAGE.header.totalAmountBeforeDiscount);
  }

  printGiftMenu() {
    this.#outputView.print(MESSAGE.header.giftMenu);
  }

  printDiscountBenefits() {
    this.#outputView.print(MESSAGE.header.discountBenefits);
  }

  printTotalDiscountAmount() {
    this.#outputView.print(MESSAGE.header.totalDiscountAmount);
  }

  printFinalPaymentAmountAfterDiscount() {
    this.#outputView.print(MESSAGE.header.finalPaymentAmount);
  }

  printEventBadge() {
    this.#outputView.print(MESSAGE.header.eventBadge);
  }
}

export default View;
