import DiscountManager from './Service/DiscountManager.js';
import OrderManager from './Service/OrderManager.js';
import View from './View/View.js';
import { inputWithRetry } from './Lib/utils.js';

class App {
  #view;

  #orderManager;

  #discountManager;

  constructor() {
    this.#view = new View();
    this.#orderManager = new OrderManager(this.#view);
    this.#discountManager = new DiscountManager(this.#view);
  }

  async run() {
    // 1. 크리스마스 이벤트 시작을 알려주는 인사 메시지
    this.#view.printEventTitle();

    // 2. 사용자의 방문 날짜 입력 + 3. 사용자의 주문 메뉴와 개수 입력
    const visitDate = await inputWithRetry(() => this.#view.readVisitDate());
    const orderedMenuAndCount = await inputWithRetry(() => this.#view.readOrderMenu());

    // 총 주문 수량 체크 -> 마지막 할인율 계산 시 사용
    this.#orderManager.validateTotalQuantity(orderedMenuAndCount);
    // 총주문 금액 계산 -> DiscountManager
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
    this.#discountManager.printDiscountResult(appliedDiscount, totalPrizeBeforeDiscount, totalBenefit);
  }
}

export default App;
