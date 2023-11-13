import COMMON from '../../constants/common.js';
import MessageFormat from '../../Lib/MessageFormat.js';
import ORDER from './constants.js';

class OrderView {
  #view;

  constructor(view) {
    this.#view = view;
  }

  printOrderResult(orderedMenuAndCount, totalPriceBeforeDiscount, isGiftEligible) {
    this.#view.printOrderHeader();

    this.orderMenuList(orderedMenuAndCount);

    this.beforeDiscount(totalPriceBeforeDiscount);

    this.giftMenu(isGiftEligible);
  }

  // <주문 메뉴>
  orderMenuList(orderedMenuAndCount) {
    orderedMenuAndCount.forEach((order) => {
      this.#view.print(MessageFormat.count(`${order.name} ${order.quantity}`));
    });
  }

  // <할인 전 총주문 금액>
  beforeDiscount(totalPriceBeforeDiscount) {
    this.#view.printTotalAmountBeforeDiscount();
    this.#view.print(MessageFormat.wonPrice(totalPriceBeforeDiscount));
  }

  // <증정 메뉴>
  giftMenu(isGiftEligible) {
    this.#view.printGiftMenu();
    this.#view.print(isGiftEligible ? ORDER.string.gift : COMMON.string.default);
  }
}

export default OrderView;
