import { deepFreeze } from '../../Lib/utils.js';

export const discounts = deepFreeze({
  /**
   * 크리스마스 디데이 할인
   */
  christmas: {
    dates: { start: 1, end: 25 },
    baseAmount: 1000,
  },
  /**
   * 평일 (일~목), 디저트 할인
   */
  weekday: {
    dates: [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31],
    menuCategory: '디저트',
    discountAmount: 2023,
  },
  /**
   * 주말 (금,토), 메인 할인
   */
  weekend: { dates: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30], menuCategory: '메인', discountAmount: 2023 },
  /**
   * 스페셜 할인
   */
  special: { dates: [3, 10, 17, 24, 25, 31], discountAmount: 1000 },
});

export const promotion = Object.freeze({
  threshold: 120000,
  gift: '샴페인 1병',
  discountAmount: 25000,
});
