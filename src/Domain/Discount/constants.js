import { deepFreeze } from '../../Lib/utils.js';

const condition = deepFreeze({
  christmas: {
    dates: { start: 1, end: 25 },
    baseAmount: 1000,
  },
  weekday: {
    dates: [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31],
    menuCategory: '디저트',
    discountAmount: 2023,
  },
  weekend: {
    dates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
    menuCategory: '메인',
    discountAmount: 2023,
  },
  special: {
    dates: [3, 10, 17, 24, 25, 31],
    discountAmount: 1000,
  },
});

const types = Object.freeze({
  dDay: '크리스마스 디데이 할인',
  weekday: '평일 할인',
  weekend: '주말 할인',
  special: '특별 할인',
  giftEvent: '증정 이벤트',
});

const promotion = Object.freeze({
  threshold: 120000,
  gift: '샴페인 1병',
  discountAmount: 25000,
});

const badges = deepFreeze([
  { threshold: 0, name: '없음' },
  { threshold: 5000, name: '별' },
  { threshold: 10000, name: '트리' },
  { threshold: 20000, name: '산타' },
]);

const DISCOUNT = Object.freeze({
  condition,
  types,
  promotion,
  badges,
});

export default DISCOUNT;
