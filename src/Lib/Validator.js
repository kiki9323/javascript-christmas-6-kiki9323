import AppError from '../errors/error.js';
import Date from './constants/date.js';
import ERROR from './constants/error.js';

const Validator = {
  validatedInputDate(value) {
    if (!this.isValidDate(value)) {
      throw new AppError(ERROR.inputView.date.invalidDate);
    }

    return value;
  },

  isValidDate(num) {
    return Number(num) && num >= Date.period.start && num <= Date.period.end;
  },

  /**
   * TODO: 단일 책임 원칙에 따라 분리하기
   *
   * // Validator.js/validatedOrderMenuCount()
   *
   * 1. 문자열 파싱 parseOrderString
   * 2. 주문 항목 검증
   *    1. 주문 포맷 확인
   *        > 안 되는 예시 '음식01,음식_3'
   *    2. 입력형태 검증
   *        > '음식1-1,음식2-2,음식3-3'
   *        - 숫자가 0이상
   *        - 공백 없어야 함
   *        - 중복 메뉴 안 됨
   *    -> 검증완료된 가공 데이터를 OrderManager.createOrderData() 에게 넘김.
   *
   *
   * // OrderManager.js
   * 3. 주문 데이터 생성 createOrderData -> OrderManager.js로 옮기기
   *    orderManager에서 체크할 것들
   *    1. 메뉴에 없는 음식인지
   *    2. 음료수만 시키는 경우
   *    3. 음료만 주문한 경우 검사 checkOnlyDrinks
   */
  validatedOrderMenuCount(orderString) {
    const items = this.parseOrderString(orderString);
    const checkDuplicateArray = [];

    for (let i = 0; i < items.length; i++) {
      this.validateOrderFormat(items[i]);
      this.validateNonZeroQuantity(items[i]);
      this.checkForDuplicates(items[i], checkDuplicateArray);
    }

    return items;
  },

  isOnlyNumber(num) {
    const numberRegex = /^\d+$/;

    return numberRegex.test(num);
  },

  parseOrderString(string) {
    return string.split(',');
  },

  validateOrderFormat(item) {
    const regex = /^([a-zA-Z가-힣]+-\d+(,|$))+$/;

    if (!regex.test(item)) {
      // throw new AppError('"음식메뉴-숫자" 와 같은 형식으로 공백 없이 입력해주세요.');
      throw new AppError('유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  },

  validateNonZeroQuantity(item) {
    const [_, quantity] = item.split('-');

    if (quantity === '0' || quantity === 0) {
      throw new AppError('1개 이상 부터 주문 가능합니다.');
    }
  },

  checkForDuplicates(item, checkDuplicateArray) {
    const [menu, _] = item.split('-');

    if (checkDuplicateArray.includes(menu)) {
      throw new AppError('중복된 메뉴가 있습니다.');
    }
    checkDuplicateArray.push(menu);
  },
};

export default Validator;
