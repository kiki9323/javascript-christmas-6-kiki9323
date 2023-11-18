import COMMON from '../../constants/common.js';
import DISCOUNT from './constants.js';

const DiscountMsgFormat = {
  printDiscountMessage(appliedDiscount, totalPrizeBeforeDiscount) {
    if (totalPrizeBeforeDiscount < COMMON.unit.eventMin || this.isDiscountApplied(appliedDiscount))
      return COMMON.string.default;

    return this.generateDiscountMessag(appliedDiscount);
  },

  isDiscountApplied(discounts) {
    return Object.values(discounts).every((discountAmount) => discountAmount === 0);
  },

  generateDiscountMessag(discounts) {
    return Object.entries(discounts)
      .filter(([_, discountAmount]) => discountAmount !== 0)
      .map(([discountType, discountAmount]) => `${discountType}: -${discountAmount.toLocaleString()}원`)
      .join('\n');
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
