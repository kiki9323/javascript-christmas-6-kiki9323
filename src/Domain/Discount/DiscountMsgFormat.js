import COMMON from '../../constants/common.js';
import DISCOUNT from './constants.js';

const DiscountMsgFormat = {
  printDiscountMessage(appliedDiscount, totalPrizeBeforeDiscount) {
    if (totalPrizeBeforeDiscount < COMMON.unit.eventMin) return COMMON.string.default;

    const message = Object.entries(appliedDiscount)
      .filter(([_, discountAmount]) => discountAmount !== 0)
      .map(([discountType, discountAmount]) => `${discountType}: -${discountAmount.toLocaleString()}원`)
      .join('\n');

    return message;
  },

  getBadgeName(totalBenefit) {
    const badge = DISCOUNT.badges
      .slice()
      .reverse()
      .find((badge) => totalBenefit >= badge.threshold);
    return badge ? badge.name : DISCOUNT.badges[0].name;
  },
};

export default DiscountMsgFormat;
