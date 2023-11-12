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
