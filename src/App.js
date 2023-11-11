import DiscountManager from './Service/DiscountManager.js';
import EventController from './Controller/EventController.js';
import OrderManager from './Service/OrderManager.js';
import View from './View/View.js';

class App {
  #eventController;

  constructor() {
    const view = new View();
    const orderManager = new OrderManager(view);
    const discountManager = new DiscountManager(view);

    this.#eventController = new EventController(view, orderManager, discountManager);
  }

  async run() {
    await this.#eventController.runEvent();
  }
}

export default App;
