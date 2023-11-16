const MessageFormat = {
  error(message) {
    return `[ERROR] ${message}`;
  },

  wonPrice(price) {
    return `${price.toLocaleString()}원`;
  },

  count(string) {
    return `${string}개`;
  },

  preview(visitDate) {
    return `12월 ${visitDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`;
  },
};

export default MessageFormat;
