const Product = require("./Product");
const AlertService = require("./alertService");

class Warehouse {
  constructor() {
    this.products = new Map();
    this.alertService = new AlertService();
  }

  addProduct(id, name, quantity, threshold) {
    if (this.products.has(id)) {
      console.log(`Product ID ${id} already exists.`);
      return;
    }
    const product = new Product(id, name, quantity, threshold);
    this.products.set(id, product);
    console.log(`Product added: ${name} (Qty: ${quantity}, Threshold: ${threshold})`);
  }

  receiveShipment(id, quantity) {
    const product = this.products.get(id);
    if (!product) {
      console.log(` Invalid Product ID: ${id}`);
      return;
    }
    product.quantity += quantity;
    console.log(`Shipment received: ${quantity} units of ${product.name}. Total = ${product.quantity}`);
  }

  fulfillOrder(id, quantity) {
    const product = this.products.get(id);
    if (!product) {
      console.log(`Invalid Product ID: ${id}`);
      return;
    }
    if (quantity > product.quantity) {
      console.log(`Not enough stock for ${product.name}. Available: ${product.quantity}`);
      return;
    }
    product.quantity -= quantity;
    console.log(` Order fulfilled: ${quantity} units of ${product.name}. Remaining = ${product.quantity}`);

    if (product.quantity < product.threshold) {
      this.alertService.notifyLowStock(product);
    }
  }

  showInventory() {
    console.log("\n Current Inventory:");
    this.products.forEach((product) => {
      console.log(`- ${product.name}: ${product.quantity} units (Threshold: ${product.threshold})`);
    });
  }
}

module.exports = Warehouse;
