// import AppError from '../errors/error.js';
// import ERROR from '../Lib/constants/error.js';
// // import MenuPrices from '../Lib/constants/MenuPrize.js';

// class OrderManager {
//   #view;

//   constructor(view) {
//     this.#view = view;
//   }

//   createOrderData(items) {
//     if (this.validateCheckOnlyDrinks(items)) {
//       throw new AppError(ERROR.inputView.order.invalidOnlyDrinks);
//     }

//     const orders = [];

//     for (let item of items) {
//       const [menu, quantity] = item.split('-');
//       const category = this.validateCategoryAndMenu(menu);
//       const orderData = this.createSingleOrderData(menu, quantity, category);

//       orders.push(orderData);
//     }

//     return orders;
//   }

//   createSingleOrderData(menu, quantity, category) {
//     const onePrice = MenuPrices[category][menu];
//     const totalPrice = onePrice * parseInt(quantity);
//     return {
//       category,
//       name: menu,
//       quantity: parseInt(quantity),
//       onePrice,
//       totalPrice,
//     };
//   }

//   validateCheckOnlyDrinks(items) {
//     for (let item of items) {
//       const [menu] = item.split('-');
//       const category = this.validateCategoryAndMenu(menu);

//       if (category !== '음료') return false;
//     }
//     return true;
//   }

//   validateCategoryAndMenu(menu) {
//     const categories = Object.keys(MenuPrices);
//     for (const category of categories) {
//       if (MenuPrices[category].hasOwnProperty(menu)) {
//         return category;
//       }
//     }
//     throw new AppError(ERROR.inputView.order.invalid);
//   }

//   calculateTotalOrderAmount(orderedMenuAndCount) {
//     return orderedMenuAndCount.reduce((sum, order) => sum + order.totalPrice, 0);
//   }

//   printOrderResult(orderedMenuAndCount, totalPrizeBeforeDiscount, isGiftEligible) {
//     this.#view.printOrderHeader();

//     // TODO: 문자열이 섞인 부분들 어떻게 리팩토링 할 수 있을지 고민하기.
//     // Order <주문 메뉴>
//     orderedMenuAndCount.forEach((order) => {
//       this.#view.print(`${order.name} ${order.quantity}개`);
//     });

//     // Order <할인 전 총주문 금액>
//     this.#view.printTotalAmountBeforeDiscount();
//     this.#view.print(`${totalPrizeBeforeDiscount.toLocaleString()}원`);

//     // Order 후 총 금액에 따라서 <증정 메뉴>
//     this.#view.printGiftMenu();
//     this.#view.print(isGiftEligible ? '샴페인 1개' : '없음');
//   }
// }

// export default OrderManager;
