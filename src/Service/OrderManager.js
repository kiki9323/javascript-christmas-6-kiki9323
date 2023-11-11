class OrderManager {
  #view;

  constructor(view) {
    this.#view = view;
  }

  validateTotalQuantity(orderedMenuAndCount) {
    const totalQuantity = orderedMenuAndCount.reduce((sum, order) => sum + order.quantity, 0);
    if (totalQuantity > 20) {
      throw new AppError('주문은 총 20개까지 가능합니다.');
    }
  }

  calculateTotalOrderAmount(orderedMenuAndCount) {
    return orderedMenuAndCount.reduce((sum, order) => sum + order.totalPrize, 0);
  }

  printOrderResult(orderedMenuAndCount, totalPrizeBeforeDiscount, isGiftEligible) {
    this.#view.printOrderHeader();

    // TODO: 문자열이 섞인 부분들 어떻게 리팩토링 할 수 있을지 고민하기.
    // Order 사용자 주문
    orderedMenuAndCount.forEach((order) => {
      this.#view.print(`${order.name} ${order.quantity}개`);
    });

    // Order 사용자 주문
    this.#view.printTotalAmountBeforeDiscount();
    this.#view.print(`${totalPrizeBeforeDiscount.toLocaleString()}원`);

    // Order 후 총 금액에 따라서 샴페인 증정.
    this.#view.printGiftMenu();
    this.#view.print(isGiftEligible ? `${'샴페인 1개'}` : '없음');
  }
}

export default OrderManager;
