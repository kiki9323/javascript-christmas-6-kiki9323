import InputView from './InputView.js';
import MESSAGE from '../Lib/constants/message.js';
import OutputView from './OutputView.js';
import Validator from '../Lib/Validator.js';

class View {
  #inputView = InputView;

  #outputView = OutputView;

  async readVisitDate() {
    const input = await this.#inputView.readVisitDate(MESSAGE.read.visitDate);
    return Validator.validatedInputDate(input);
  }

  async readOrderMenu() {
    const input = await this.#inputView.readMenuAndCount(MESSAGE.read.orderMenuAndCount);
    return Validator.validatedOrderMenuAcount(input);
  }

  print(message) {
    this.#outputView.print(message);
  }

  printEventTitle() {
    this.#outputView.print(MESSAGE.eventInfo.title);
  }

  printEventInfo() {
    this.#outputView.print(MESSAGE.eventInfo.preview);
  }

  printResultHeader() {
    this.#outputView.print(MESSAGE.header.orderMenu);
  }

  printBeforeDiscountTotalAmount() {
    this.#outputView.print(MESSAGE.header.beforeDiscountTotalAmount);
  }

  printPreviewMenu() {
    this.#outputView.print(MESSAGE.header.previewMenu);
  }

  printBenefits() {
    this.#outputView.print(MESSAGE.header.benefits);
  }

  printTotalBenefitsAmount() {
    this.#outputView.print(MESSAGE.header.totalBenefitsAmount);
  }

  printDiscountedPaymentAmount() {
    this.#outputView.print(MESSAGE.header.discountedPaymentAmount);
  }

  printDecemberEventBadge() {
    this.#outputView.print(MESSAGE.header.decemberEventBadge);
  }
}

export default View;
