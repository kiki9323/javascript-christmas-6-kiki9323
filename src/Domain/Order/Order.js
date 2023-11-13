import AppError from '../../errors/error.js';
import COMMON from '../../constants/common.js';
import ERROR from '../../constants/error.js';
import { ORDER } from './constants.js';

class Order {
  #items;

  constructor(items) {
    this.#items = this.processOrderItems(items);
  }

  processOrderItems(items) {
    if (this.isOnlyDrinks(items)) {
      throw new AppError(ERROR.inputView.order.onlyDrinks);
    }

    return items.map((item) => this.createSingleOrderData(item));
  }

  createSingleOrderData(item) {
    const [menu, quantity] = item.split(COMMON.string.dash);
    const category = this.getCategoryOfMenu(menu);
    const onePrice = ORDER.MenuPrices[category][menu];
    const totalPrice = onePrice * parseInt(quantity);
    return {
      category,
      name: menu,
      quantity: parseInt(quantity),
      onePrice,
      totalPrice,
    };
  }

  isOnlyDrinks(items) {
    return items.every((item) => {
      const [menu] = item.split(COMMON.string.dash);
      return this.getCategoryOfMenu(menu) === ORDER.string.drinks;
    });
  }

  getCategoryOfMenu(menu) {
    const categories = Object.keys(ORDER.MenuPrices);
    for (const category of categories) {
      if (ORDER.MenuPrices[category].hasOwnProperty(menu)) {
        return category;
      }
    }
    throw new AppError(ERROR.inputView.order.invalid);
  }

  getItems() {
    return this.#items;
  }
}

export default Order;
