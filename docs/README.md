# 크리스마스

## 구현 목록

### 1. 구현 순서

1. 입력 단계

   - 방문 날짜
   - 주문 메뉴와 개수

2. 계산 단계

   주문 개수
   : 할인 전 총 금액 -> 샴페인 증정 여부 / 이벤트 적용 여부

   방문 날짜 + 주문 메뉴
   : 혜택 내역 -> 총혜택 금액

   할인 후 예상 결제 금액
   : 할인 전 총 금액 - 총혜택 금액

   배지
   : 총혜택 금액에 따른 여부

### 2. 데이터 저장할 항목들이 뭐가 있는지

1. 메뉴 카테고리와 가격 - `MenuPrices`
2. 배지 - `Badge`

### 3. 할인을 담당하는 객체 - `DiscountManager`

- 필요한 변수들

  1.  총 합계
  2.  discounts rule 담은 객체
  3.  샴페인 프로모션 객체
  4.  discounts rule에 따라 적용된 가격을 담은 객체

- discounts rule

  1.  크리스마스 디데이
  2.  weekday (평일 할인), weekend (주말 할인)
      (weekday와 weekend는 묶어서 갈지 나눌지 고민..)
  3.  특별 할인

      ```js
      dates: [적용되는 요일] or {적용되는 요일 범위}
      menuCategory: '적용되는 메뉴 카테고리'
      discountAmount: 할인 가격
      ```

  4.  샴페인 프로모션

      ```js
      조건, 리워드, 할인 가격
      ```

### 4. `inputView`, `outputView`

- `inputView` : 재입력 - `inputWithRetry`
