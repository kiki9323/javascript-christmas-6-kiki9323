import AppError from '../errors/error.js';
import ERROR from '../Lib/constants/error.js';
import MenuPrices from '../Lib/constants/MenuPrize.js';

class OrderManager {
  #view;

  constructor(view) {
    this.#view = view;
  }

  createOrderData(items) {
    // TODO: 입력받은(유효성 검증이 끝난 데이터 받아서 order data 만들기)
    const orders = [];
    let hasOnlyDrinks = true;

    for (let item of items) {
      const [menu, quantity] = item.split('-');
      const category = this.validateCategoryAndMenu(menu);

      // order data 생성
      const onePrice = MenuPrices[category][menu];
      const totalPrice = onePrice * parseInt(quantity);

      const orderData = {
        category,
        name: menu,
        quantity: parseInt(quantity),
        onePrice,
        totalPrice,
      };

      // 주문 정보를 배열에 추가
      orders.push(orderData);

      // 음료 외의 카테고리가 존재할 경우 플래그를 false로 설정
      if (category !== '음료') hasOnlyDrinks = false;
    }

    // 음료만 주문한 경우 에러 발생
    if (hasOnlyDrinks && orders.length > 0) {
      throw new AppError(ERROR.inputView.order.invalidOnlyDrinks);
    }

    return orders;
  }

  validateCategoryAndMenu(menu) {
    const categories = Object.keys(MenuPrices);
    for (const category of categories) {
      if (MenuPrices[category].hasOwnProperty(menu)) {
        return category;
      }
    }
    throw new AppError(ERROR.inputView.order.invalid);
  }

  validateTotalQuantity(orderedMenuAndCount) {
    const totalQuantity = orderedMenuAndCount.reduce((sum, order) => sum + order.quantity, 0);
    if (totalQuantity > 20) {
      throw new AppError('주문은 총 20개까지 가능합니다.');
    }
  }

  calculateTotalOrderAmount(orderedMenuAndCount) {
    return orderedMenuAndCount.reduce((sum, order) => sum + order.totalPrice, 0);
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

export default OrderManager;
