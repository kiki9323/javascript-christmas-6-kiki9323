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
    // 1. 크리스마스 이벤트 시작 메시지
    this.#view.printEventTitle();

    // 2. 사용자의 방문 날짜 입력
    const visitDate = await inputWithRetry(() => this.#view.readVisitDate());
    // 3. 사용자의 주문 메뉴와 개수 입력
    const orderedMenuAndCount = await inputWithRetry(async () => {
      const validatedMenu = await inputWithRetry(() => this.#view.readOrderMenu());
      return this.#orderManager.createOrderData(validatedMenu);
    });

    // <할인 전 총주문 금액>
    const totalPrizeBeforeDiscount = this.#orderManager.calculateTotalOrderAmount(orderedMenuAndCount);

    // DiscountManager에 총주문 금액 세팅
    this.#discountManager.addOrder(totalPrizeBeforeDiscount);

    const appliedDiscount = this.#discountManager.applyDiscount(
      visitDate,
      this.#discountManager.countMenuCategories(orderedMenuAndCount),
    );

    const totalBenefit = this.#discountManager.getTotalDiscount();
    const isGiftEligible = this.#discountManager.applyPromotion() || 0; // 샴페인

    this.#orderManager.printOrderResult(orderedMenuAndCount, totalPrizeBeforeDiscount, isGiftEligible);
    this.#discountManager.printDiscountResult(totalBenefit, appliedDiscount, totalPrizeBeforeDiscount, isGiftEligible);

    // <12월 이벤트 배지>
    this.#view.printEventBadge();
    this.#view.print(getBadgeName(totalBenefit));
  }
}
export default EventController;
