import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async readLineAsync(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },

  async readVisitDate(message) {
    const input = await this.readLineAsync(message);
    return input;
  },

  async readMenuAndCount(message) {
    const input = await this.readLineAsync(message);
    return input;
  },
};

export default InputView;
