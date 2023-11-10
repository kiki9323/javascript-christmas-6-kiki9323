import { countMenuCategories, getBadgeName, inputWithRetry, printDiscountMessage } from './Lib/utils.js';

import AppError from './errors/error.js';
import DiscountManager from './Lib/DiscountManager.js';
import View from './View/View.js';

class App {
  #view;

  #discountManager;

  constructor() {
    this.#view = new View();
    this.#discountManager = new DiscountManager();
  }

  async run() {
    // 1. 안녕~
    this.#view.printEventTitle();

    // 2. 방문 날짜 입력
    const visitDate = await inputWithRetry(() => this.#view.readVisitDate());

    // 3. 주문 메뉴와 개수 입력
    const orderedMenuAndCount = await inputWithRetry(() => this.#view.readOrderMenu());

    // 총 주문 수량 체크
    this.validateTotalQuantity(orderedMenuAndCount);

    // 총주문 금액 계산
    const totalPrizeBeforeDiscount = this.calculateTotalPrizeBeforeDiscount(orderedMenuAndCount);

    // discountManager에 총주문 금액 세팅
    this.#discountManager.addOrder(totalPrizeBeforeDiscount);

    const appliedDiscount = this.#discountManager.applyDiscount(visitDate, countMenuCategories(orderedMenuAndCount));

    const totalBenefit = this.#discountManager.getTotalDiscount();
    const isGiftEligible = this.#discountManager.applyPromotion() || 0; // 샴페인

    this.printResult(orderedMenuAndCount, totalPrizeBeforeDiscount, appliedDiscount, totalBenefit, isGiftEligible);
  }

  validateTotalQuantity(orderedMenuAndCount) {
    const totalQuantity = orderedMenuAndCount.reduce((sum, order) => sum + order.quantity, 0);
    if (totalQuantity > 20) {
      throw new AppError('주문은 총 20개까지 가능합니다.');
    }
  }

  calculateTotalPrizeBeforeDiscount(orderedMenuAndCount) {
    return orderedMenuAndCount.reduce((sum, order) => sum + order.totalPrize, 0);
  }

  printResult(orderedMenuAndCount, totalPrizeBeforeDiscount, appliedDiscount, totalBenefit, isGiftEligible) {
    this.#view.printResultHeader();

    orderedMenuAndCount.forEach((order) => {
      this.#view.print(`${order.name} ${order.quantity}개`);
    });

    this.#view.printBeforeDiscountTotalAmount();
    this.#view.print(`${totalPrizeBeforeDiscount.toLocaleString()}원`);

    this.#view.printPreviewMenu();
    this.#view.print(isGiftEligible ? `${'샴페인 1개'}` : '없음');

    this.#view.printBenefits();
    this.#view.print(printDiscountMessage(appliedDiscount, totalPrizeBeforeDiscount));

    this.#view.printTotalBenefitsAmount();
    this.#view.print(totalBenefit ? `-${totalBenefit.toLocaleString()}원` : '0원');

    this.#view.printDiscountedPaymentAmount();
    this.#view.print(`${(totalPrizeBeforeDiscount - totalBenefit).toLocaleString()}원`);

    this.#view.printDecemberEventBadge();
    this.#view.print(getBadgeName(totalBenefit));
  }
}

export default App;
