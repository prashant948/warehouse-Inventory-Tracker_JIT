const Warehouse = require("./classes/Warehouse");

const warehouse = new Warehouse();

// Example Workflow
warehouse.addProduct(1, "Laptop", 10, 5);
warehouse.addProduct(2, "Keyboard", 20, 10);

warehouse.receiveShipment(1, 5);  
warehouse.fulfillOrder(1, 12);  
warehouse.fulfillOrder(2, 5);  

warehouse.showInventory();
