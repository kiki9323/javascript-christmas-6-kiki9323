import Badges from './constants/Badge.js';
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
  while (true) {
    try {
      return await inputMethod();
    } catch (error) {
      OutputView.printError(error);
    }
  }
};

export const formatCommas = (prize) => prize.totalLocaleString();

// orders 결과 받으면 아래와 같이 카테고리 별로 개수 구함
export const countMenuCategories = (orders) => {
  const categoryCounts = {};
  for (const order of orders) {
    if (categoryCounts[order.category]) categoryCounts[order.category] += 1;
    else categoryCounts[order.category] = 1;
  }
  return categoryCounts;
};

// 혜택 내역 message
export const printDiscountMessage = (applied, totalPrizeBeforeDiscount) => {
  if (totalPrizeBeforeDiscount < 10000) {
    return '없음';
  }
  for (const [discountType, discountAmount] of Object.entries(applied)) {
    if (discountAmount !== 0) {
      return `${discountType}: -${discountAmount.toLocaleString()}원`;
    }
  }
};

// 배지
export const getBadgeName = (amount) => {
  for (const badge of Badges) {
    if (amount >= Badges.threshold) {
      return badge.name;
    }
  }
  return Badges[0].name; // 기본값
};
