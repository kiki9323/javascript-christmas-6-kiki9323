import { getBadgeName } from '../Domain/Discount/utils.js';
import { inputWithRetry } from '../Lib/utils.js';

class EventController {
  #view;
  #orderManager;
  #discountManager;
  #discountView;

  constructor(view, orderManager, discountManager, discountView) {
    this.#view = view;
    this.#orderManager = orderManager;
    this.#discountManager = discountManager;
    this.#discountView = discountView;
  }

  async runEvent() {
    this.#view.printEventTitle();

    const visitDate = await this.getUserVisitDate();
    const orderedMenuAndCount = await this.getUserOrder();
    const appliedDiscount = this.calculateAndApplyDiscount(visitDate, orderedMenuAndCount);
    this.printResults(orderedMenuAndCount, appliedDiscount);

    this.#view.printEventBadge();
    this.#view.print(this.getBadgeName());
  }

  async getUserVisitDate() {
    return await inputWithRetry(() => this.#view.readVisitDate());
  }

  async getUserOrder() {
    return await inputWithRetry(async () => {
      const validatedMenu = await inputWithRetry(() => this.#view.readOrderMenu());
      return this.#orderManager.createOrderData(validatedMenu);
    });
  }

  calculateAndApplyDiscount(visitDate, orderedMenuAndCount) {
    const totalPriceBeforeDiscount = this.#orderManager.calculateTotalOrderAmount(orderedMenuAndCount);
    this.#discountManager.setTotalAmount(totalPriceBeforeDiscount);

    return this.#discountManager.applyDiscount(
      visitDate,
      this.#discountManager.countMenuCategories(orderedMenuAndCount),
    );
  }

  printResults(orderedMenuAndCount, appliedDiscount) {
    const totalDiscount = this.#discountManager.getTotalDiscount();
    const isGiftEligible = this.#discountManager.applyPromotion();
    const totalDiscountWithoutGift = this.#discountManager.getTotalDiscountWithoutGift();
    const totalPriceBeforeDiscount = this.#orderManager.calculateTotalOrderAmount(orderedMenuAndCount);

    this.#orderManager.printOrderResult(orderedMenuAndCount, totalPriceBeforeDiscount, isGiftEligible);
    this.#discountView.printDiscountResult(
      appliedDiscount,
      totalPriceBeforeDiscount,
      totalDiscount,
      totalDiscountWithoutGift,
    );
  }

  getBadgeName() {
    const totalDiscount = this.#discountManager.getTotalDiscount();
    return getBadgeName(totalDiscount);
  }
}
export default EventController;
