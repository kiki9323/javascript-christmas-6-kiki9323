import ERROR from '../../Lib/constants/error.js';
import { MenuPrices } from './constants.js';

class Order {
  #items;

  constructor(items) {
    this.#items = this.createOrderData(items);
  }

  createOrderData(items) {
    if (this.validateCheckOnlyDrinks(items)) {
      throw new AppError(ERROR.inputView.order.invalidOnlyDrinks);
    }

    const orders = [];

    for (let item of items) {
      const [menu, quantity] = item.split('-');
      const category = this.validateCategoryAndMenu(menu);
      const orderData = this.createSingleOrderData(menu, quantity, category);

      orders.push(orderData);
    }

    return orders;
  }

  createSingleOrderData(menu, quantity, category) {
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

  validateCheckOnlyDrinks(items) {
    for (let item of items) {
      const [menu] = item.split('-');
      const category = this.validateCategoryAndMenu(menu);

      if (category !== '음료') return false;
    }
    return true;
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
}

export default Order;
