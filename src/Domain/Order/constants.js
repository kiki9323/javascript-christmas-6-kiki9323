import { deepFreeze } from '../../Lib/utils.js';

const MenuPrices = deepFreeze({
  애피타이저: {
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000,
  },
  메인: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
  },
  디저트: {
    초코케이크: 15000,
    아이스크림: 5000,
  },
  음료: {
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000,
  },
});

const string = Object.freeze({
  drinks: '음료',
  gift: '샴페인 1개',
});

export const ORDER = Object.freeze({
  MenuPrices,
  string,
});

export default ORDER;
