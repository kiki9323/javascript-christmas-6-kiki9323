import DiscountMsgFormat from '../../../src/Domain/Discount/DiscountMsgFormat.js';
import { EOL as LINE_SEPARATOR } from 'os';
import { MissionUtils } from '@woowacourse/mission-utils';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe('DiscountMsgFormat 클래스', () => {
  describe('getBadgeName 메서드', () => {
    test('총혜택 금액에 따라 다른 이벤트 배지를 부여한다.', () => {
      const totalBenefits = [5500, 3000, 12000, 19300, 30000];
      const expectedBadgeNames = ['별', '없음', '트리', '트리', '산타'];

      const logSpy = getLogSpy();

      const badgeNames = totalBenefits.map((benefit) => {
        const badgeName = DiscountMsgFormat.getBadgeName(benefit);
        MissionUtils.Console.print(badgeName);
        return badgeName;
      });

      const output = getOutput(logSpy);

      expectLogContains(output, badgeNames);
      expect(badgeNames).toEqual(expectedBadgeNames);

      logSpy.mockRestore();
    });
  });

  describe('printDiscountMessage 메서드', () => {
    test('26일 타파스-1,제로콜라-2 에서 <혜택 내역>은 `없음`이 나와야 한다.', () => {
      const appliedDiscount = {
        '크리스마스 디데이 할인': 0,
        '평일 할인': 0,
        '주말 할인': 0,
        '특별 할인': 0,
        '증정 이벤트': 0,
      };
      const totalPrizeBeforeDiscount = 11500;
      const expectText = '없음';
      const noBenefits = DiscountMsgFormat.printDiscountMessage(appliedDiscount, totalPrizeBeforeDiscount);

      expect(noBenefits).toEqual(expectText);
    });
  });
});
