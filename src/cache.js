export default class Cache {
  
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }
  
  clear() {
    this.items = [];
  }

}