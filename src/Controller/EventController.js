import { getBadgeName, inputWithRetry } from '../Lib/utils.js';

import OutputView from '../View/OutputView.js';

class EventController {
  #view;
  #orderManager;
  #discountManager;

  constructor(view, orderManager, discountManager) {
    this.#view = view;
    this.#orderManager = orderManager;
    this.#discountManager = discountManager;
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
    const totalPrizeBeforeDiscount = this.#orderManager.calculateTotalOrderAmount(orderedMenuAndCount);
    this.#discountManager.addOrder(totalPrizeBeforeDiscount);
    return this.#discountManager.applyDiscount(
      visitDate,
      this.#discountManager.countMenuCategories(orderedMenuAndCount),
    );
  }

  printResults(orderedMenuAndCount, appliedDiscount) {
    const totalBenefit = this.#discountManager.getTotalDiscount();
    const isGiftEligible = this.#discountManager.applyPromotion();
    const totalPrizeBeforeDiscount = this.#orderManager.calculateTotalOrderAmount(orderedMenuAndCount);

    this.#orderManager.printOrderResult(orderedMenuAndCount, totalPrizeBeforeDiscount, isGiftEligible);
    this.#discountManager.printDiscountResult(totalBenefit, appliedDiscount, totalPrizeBeforeDiscount, isGiftEligible);
  }

  getBadgeName() {
    const totalBenefit = this.#discountManager.getTotalDiscount();
    return getBadgeName(totalBenefit);
  }
}
export default EventController;
