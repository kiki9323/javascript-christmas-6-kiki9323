import AppError from '../errors/error.js';
import COMMON from '../constants/common.js';
import DATE from '../constants/date.js';
import ERROR from '../constants/error.js';
import REGEX from '../constants/regex.js';

const Validator = {
  validatedInputDate(value) {
    if (!this.isValidDate(value)) {
      throw new AppError(ERROR.inputView.date.invalidDate);
    }
    return value;
  },

  // 방문 날짜는 1일과 31일 사이
  isValidDate(num) {
    return Number(num) && num >= DATE.period.start && num <= DATE.period.end;
  },

  isOnlyNumber(num) {
    return REGEX.number.test(num);
  },

  validatedOrder(orderString) {
    const orderItems = this.parseOrder(orderString);
    this.checkOrderItemFormatAndQuantity(orderItems);
    this.checkTotalOrderQuantity(orderItems);
    return orderItems;
  },

  parseOrder(orderString) {
    return orderString.split(COMMON.string.comma);
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
    if (totalQuantity > COMMON.number.maxOrderCount) {
      throw new AppError(ERROR.inputView.order.maxOrderCount);
    }
  },

  validateItemFormat(item) {
    if (!REGEX.itemFormat.test(item)) {
      throw new AppError(ERROR.inputView.order.invalid);
    }
  },

  getQuantityFromItem(item) {
    const [_, quantity] = item.split(COMMON.string.dash);
    return parseInt(quantity);
  },

  validateNonZeroQuantity(quantity) {
    if (quantity === '0' || quantity === 0) {
      throw new AppError(ERROR.inputView.order.minOrderCount);
    }
  },

  checkForDuplicateItems(item, orderedMenuItems) {
    const [menu, _] = item.split(COMMON.string.dash);
    if (orderedMenuItems.includes(menu)) {
      throw new AppError(ERROR.inputView.order.duplicatedMenu);
    }
    orderedMenuItems.push(menu);
  },
};

export default Validator;
