import DiscountMsgFormat from '../Domain/Discount/DiscountMsgFormat.js';
import Order from '../Domain/Order/Order.js';
import OrderManager from '../Domain/Order/OrderManager.js';
import OrderView from '../Domain/Order/OrderView.js';
import { inputWithRetry } from '../Lib/utils.js';

class EventController {
  #view;
  #orderManager;
  #orderView;
  #discountManager;
  #discountView;

  constructor(view, discountManager, discountView) {
    this.#view = view;
    this.#orderManager = new OrderManager();
    this.#orderView = new OrderView(view);
    this.#discountManager = discountManager;
    this.#discountView = discountView;
  }

  async runEvent() {
    this.#printEventTitle();

    const visitDate = await this.#getVisitDate();
    const { orderedItems, categoryCount } = await this.#getOrderItems();
    const appliedDiscount = this.#applyDiscount(visitDate, orderedItems, categoryCount);
    this.#printEventInfo(visitDate);
    this.#printResults(orderedItems, appliedDiscount);
    this.#printBadge();
  }

  #printEventTitle() {
    this.#view.printEventTitle();
  }

  async #getVisitDate() {
    return await inputWithRetry(() => this.#view.readVisitDate());
  }

  async #getOrderItems() {
    const orderedItems = await inputWithRetry(async () => {
      const validatedMenu = await inputWithRetry(() => this.#view.readOrderMenu());
      const order = new Order(validatedMenu);
      return order.getItems();
    });

    const categoryCount = this.#discountManager.countMenuCategories(orderedItems);
    return { orderedItems, categoryCount };
  }

  #applyDiscount(visitDate, orderedItems, categoryCount) {
    const totalPriceBeforeDiscount = this.#orderManager.calculateTotalOrderAmount(orderedItems);
    this.#discountManager.setTotalAmount(totalPriceBeforeDiscount);

    return this.#discountManager.applyDiscount(visitDate, categoryCount);
  }

  #printEventInfo(visitDate) {
    this.#view.printEventInfo(visitDate);
  }

  #printResults(orderedItems, appliedDiscount) {
    const totalDiscount = this.#discountManager.getTotalDiscount();
    const isGiftEligible = this.#discountManager.applyPromotion();
    const totalDiscountWithoutGift = this.#discountManager.getTotalDiscountWithoutGift();
    const totalPriceBeforeDiscount = this.#orderManager.calculateTotalOrderAmount(orderedItems);

    this.#orderView.printOrderResult(orderedItems, totalPriceBeforeDiscount, isGiftEligible);
    this.#discountView.printDiscountResult(
      appliedDiscount,
      totalPriceBeforeDiscount,
      totalDiscount,
      totalDiscountWithoutGift,
    );
  }

  #getBadgeName() {
    const totalDiscount = this.#discountManager.getTotalDiscount();
    return DiscountMsgFormat.getBadgeName(totalDiscount);
  }

  #printBadge() {
    this.#view.printEventBadge();
    this.#view.print(this.#getBadgeName());
  }
}
export default EventController;
