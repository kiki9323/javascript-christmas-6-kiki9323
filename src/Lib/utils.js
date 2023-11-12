// import Badges from './constants/Badge.js';
import OutputView from '../View/OutputView.js';

export const deepFreeze = (object) => {
  for (let key in object) {
    if (typeof object[key] === 'object' && object[key] !== null) {
      deepFreeze(object[key]);
    }
  }
  return Object.freeze(object);
};

export const inputWithRetry = async (inputMethod) => {
  try {
    return await inputMethod();
  } catch (error) {
    OutputView.printError(error);
    return await inputWithRetry(inputMethod);
  }
};

export const formatCommas = (prize) => prize.totalLocaleString();

// // 혜택 내역 message
// export const printDiscountMessage = (appliedDiscount, totalPrizeBeforeDiscount) => {
//   let message = '';
//   if (totalPrizeBeforeDiscount < 10000) return '없음';

//   for (const [discountType, discountAmount] of Object.entries(appliedDiscount)) {
//     if (discountAmount !== 0) {
//       message += `${discountType}: -${discountAmount.toLocaleString()}원\n`;
//     }
//   }
//   return message;
// };

// // 배지
// export const getBadgeName = (totalBenefit) => {
//   for (let i = Badges.length - 1; i >= 0; i--) {
//     const badge = Badges[i];
//     if (totalBenefit >= badge.threshold) return badge.name;
//   }
//   return Badges[0].name; // 기본값
// };
