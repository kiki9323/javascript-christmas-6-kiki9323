import MessageFormat from '../../Lib/MessageFormat.js';

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

  // TODO: 문자열이 섞인 부분들 어떻게 리팩토링 할 수 있을지 고민하기.
  // Order <주문 메뉴>
  orderMenuList(orderedMenuAndCount) {
    orderedMenuAndCount.forEach((order) => {
      this.#view.print(`${order.name} ${order.quantity}개`);
    });
  }

  // Order <할인 전 총주문 금액>
  beforeDiscount(totalPriceBeforeDiscount) {
    this.#view.printTotalAmountBeforeDiscount();
    // this.#view.print(`${totalPriceBeforeDiscount.toLocaleString()}원`);
    this.#view.print(MessageFormat.wonPrize(totalPriceBeforeDiscount.toLocaleString()));
  }

  // Order 후 총 금액에 따라서 <증정 메뉴>
  giftMenu(isGiftEligible) {
    this.#view.printGiftMenu();
    this.#view.print(isGiftEligible ? '샴페인 1개' : '없음');
  }
}

export default OrderView;
