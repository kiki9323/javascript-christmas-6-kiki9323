import { Console } from '@woowacourse/mission-utils';
import Validator from '../Lib/Validator.js';

const InputView = {
  async readLineAsync(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },

  async readVisitDate(message) {
    const input = await this.readLineAsync(message);
    return Validator.validatedInputDate(input);
  },

  async readMenuAndCount(message) {
    const input = await this.readLineAsync(message);
    return Validator.validatedOrder(input);
  },
};

export default InputView;
