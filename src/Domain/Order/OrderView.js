class OrderView {
  #view;

  constructor(view) {
    this.#view = view;
  }

  printOrderResult(orderedMenuAndCount, totalPrizeBeforeDiscount, isGiftEligible) {
    this.#view.printOrderHeader();

    // TODO: 문자열이 섞인 부분들 어떻게 리팩토링 할 수 있을지 고민하기.
    // Order <주문 메뉴>
    orderedMenuAndCount.forEach((order) => {
      this.#view.print(`${order.name} ${order.quantity}개`);
    });

    // Order <할인 전 총주문 금액>
    this.#view.printTotalAmountBeforeDiscount();
    this.#view.print(`${totalPrizeBeforeDiscount.toLocaleString()}원`);

    // Order 후 총 금액에 따라서 <증정 메뉴>
    this.#view.printGiftMenu();
    this.#view.print(isGiftEligible ? '샴페인 1개' : '없음');
  }
}

export default OrderView;
