class OrderManager {
  calculateTotalOrderAmount(orderedMenuAndCount) {
    return orderedMenuAndCount.reduce((sum, order) => sum + order.totalPrice, 0);
  }
}

export default OrderManager;
