import { MenuPrices, ORDER } from './constants.js';

import AppError from '../../errors/error.js';
import ERROR from '../../Lib/constants/error.js';

class Order {
  #items;

  constructor(items) {
    this.#items = this.processOrderItems(items);
  }

  processOrderItems(items) {
    if (this.isOnlyDrinks(items)) {
      throw new AppError(ERROR.inputView.order.invalidOnlyDrinks);
    }

    return items.map((item) => this.createSingleOrderData(item));
  }

  createSingleOrderData(item) {
    const [menu, quantity] = item.split('-');
    const category = this.getCategoryOfMenu(menu);
    const onePrice = MenuPrices[category][menu];
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
      const [menu] = item.split('-');
      return this.getCategoryOfMenu(menu) === ORDER.drinks;
    });
  }

  getCategoryOfMenu(menu) {
    const categories = Object.keys(MenuPrices);
    for (const category of categories) {
      if (MenuPrices[category].hasOwnProperty(menu)) {
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
