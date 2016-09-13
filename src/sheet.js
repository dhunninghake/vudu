export default class Sheet {
  
  constructor() {
    this.vStyleSheet = this.create('vStyleSheet');
  }

  create(id) {
    if (document.getElementById(id)) {
      return;
    } else {
      let style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      style.setAttribute('id', id);
      document.head.appendChild(style);
      return style.sheet;
    }
  }

  reset() {
    return this.stylesheet.cssRules.forEach((item, index) => {
      return this.stylesheet.deleteRule(index);
    });
  }

}