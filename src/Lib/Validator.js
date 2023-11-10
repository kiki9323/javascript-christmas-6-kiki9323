import AppError from '../errors/error.js';
import Date from './constants/date.js';
import ERROR from './constants/error.js';
import MenuPrices from './constants/MenuPrize.js';

const Validator = {
  isValidDate(num) {
    return Number(num) && num >= Date.period.start && num <= Date.period.end;
  },

  validatedInputDate(value) {
    if (!this.isValidDate(value)) {
      throw new AppError(ERROR.inputView.date.invalidDate);
    }
  },

  isOnlyNumber(num) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(num);
  },

  validatedOrderMenuAcount(orderString) {
    const orders = [];
    let hasOnlyDrinks = true;

    const items = orderString.split(','); // 입력값 파싱

    for (let item of items) {
      const [menu, quantity] = item.split('-');

      // quantity 예외처리
      if (!this.isOnlyNumber(quantity)) throw new AppError(ERROR.inputView.order.invalid);

      const category = Object.keys(MenuPrices).find((currentCategory) =>
        Object.keys(MenuPrices[currentCategory]).includes(menu),
      );

      if (!category) {
        throw new AppError(ERROR.inputView.order.invalid);
      }

      // 주문 객세 생성 및 계산
      const onePrize = MenuPrices[category][menu];
      const totalPrize = onePrize * parseInt(quantity);

      const orderData = {
        category,
        name: menu,
        quantity: parseInt(quantity),
        onePrize,
        totalPrize,
      };

      // 주문 정보를 배열에 추가
      orders.push(orderData);

      // 음료 외의 카테고리가 존재할 경우 플래그를 false로 설정
      if (category !== '음료') hasOnlyDrinks = false;
    }

    // 음료만 주문한 경우 에러 발생
    if (hasOnlyDrinks && orders.length > 0) {
      throw new AppError(`음료만 주문할 수 없습니다.`);
    }

    return orders;
  },
};

export default Validator;
