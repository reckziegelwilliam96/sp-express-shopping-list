const { readData, writeData } = require('../data');

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  static all() {
    const data = readData();
    return data.items;
  }

  static find(name) {
    const data = readData();
    return data.items.find(item => item.name === name);
  }

  static create(item) {
    const data = readData();
    data.items.push(item);
    writeData(data);
    return item;
  }

  update(changes) {
    const data = readData();
    const index = data.items.findIndex(item => item.name === this.name);
    const updatedItem = { ...this, ...changes };
    data.items[index] = updatedItem;
    writeData(data);
    return updatedItem;
  }

  delete() {
    const data = readData();
    const index = data.items.findIndex(item => item.name === this.name);
    data.items.splice(index, 1);
    writeData(data);
  }
}

module.exports = Item;