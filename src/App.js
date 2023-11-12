import { discounts, promotion } from './Domain/Discount/constants.js';

import Discount from './Domain/Discount/Discount.js';
import DiscountManager from './Domain/Discount/DiscountManager.js';
import DiscountView from './Domain/Discount/DiscountView.js';
import EventController from './Controller/EventController.js';
import OrderManager from './Service/OrderManager.js';
import View from './View/View.js';

class App {
  #eventController;

  constructor() {
    const view = new View();
    const orderManager = new OrderManager(view);
    const discount = new Discount(discounts, promotion);
    const discountManager = new DiscountManager(discount);
    const discountView = new DiscountView(view);

    this.#eventController = new EventController(view, orderManager, discountManager, discountView);
  }

  async run() {
    await this.#eventController.runEvent();
  }
}

export default App;
