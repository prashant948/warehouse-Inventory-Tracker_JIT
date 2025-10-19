class AlertService {
  notifyLowStock(product) {
    console.log(` Restock Alert: Low stock for ${product.name} – only ${product.quantity} left!`);
  }
}

module.exports = AlertService;
