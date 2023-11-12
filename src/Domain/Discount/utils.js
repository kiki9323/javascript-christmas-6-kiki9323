import { badges } from './constants.js';

// 혜택 내역 message
export const printDiscountMessage = (appliedDiscount, totalPrizeBeforeDiscount) => {
  let message = '';
  if (totalPrizeBeforeDiscount < 10000) return '없음';

  for (const [discountType, discountAmount] of Object.entries(appliedDiscount)) {
    if (discountAmount !== 0) {
      message += `${discountType}: -${discountAmount.toLocaleString()}원\n`;
    }
  }
  return message;
};

// 배지
export const getBadgeName = (totalBenefit) => {
  for (let i = badges.length - 1; i >= 0; i--) {
    const badge = badges[i];
    if (totalBenefit >= badge.threshold) return badge.name;
  }
  return badges[0].name; // 기본값
};
