import AppError from '../errors/error.js';
import Date from './constants/date.js';
import ERROR from './constants/error.js';

const Validator = {
  /**
   * 방문 날짜 입력 유효성 검증
   */
  validatedInputDate(value) {
    if (!this.isValidDate(value)) {
      throw new AppError(ERROR.inputView.date.invalidDate);
    }
    return value;
  },

  isValidDate(num) {
    return Number(num) && num >= Date.period.start && num <= Date.period.end;
  },

  isOnlyNumber(num) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(num);
  },

  /**
   * 주문 메뉴와 개수 유효성 검증
   */
  validatedOrder(orderString) {
    const orderItems = this.parseOrder(orderString);
    this.checkOrderItemFormatAndQuantity(orderItems);
    this.checkTotalOrderQuantity(orderItems);
    return orderItems;
  },

  parseOrder(orderString) {
    return orderString.split(',');
  },

  checkOrderItemFormatAndQuantity(orderItems) {
    const orderedMenuItems = [];
    orderItems.forEach((item) => {
      this.validateItemFormat(item);
      const quantity = this.getQuantityFromItem(item);
      this.validateNonZeroQuantity(quantity);
      this.checkForDuplicateItems(item, orderedMenuItems);
    });
  },

  checkTotalOrderQuantity(orderItems) {
    const totalQuantity = orderItems.reduce((acc, item) => acc + this.getQuantityFromItem(item), 0);
    if (totalQuantity > 20) {
      throw new AppError('총 주문 갯수는 20개를 초과할 수 없습니다.');
    }
  },

  validateItemFormat(item) {
    const itemFormatRegex = /^([a-zA-Z가-힣]+-\d+(,|$))+$/;
    if (!itemFormatRegex.test(item)) {
      throw new AppError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  },

  getQuantityFromItem(item) {
    const [_, quantity] = item.split('-');
    return parseInt(quantity);
  },

  validateNonZeroQuantity(quantity) {
    if (quantity === '0' || quantity === 0) {
      throw new AppError('1개 이상 부터 주문 가능합니다.');
    }
  },

  checkForDuplicateItems(item, orderedMenuItems) {
    const [menu, _] = item.split('-');
    if (orderedMenuItems.includes(menu)) {
      throw new AppError('중복된 메뉴가 있습니다.');
    }
    orderedMenuItems.push(menu);
  },
};

export default Validator;
