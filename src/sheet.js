export default class Sheet {
  
  constructor() {
    this.stylesheet = this.create();
  }

  create() {
    if (document.getElementById('vStyleSheet')) {
      return;
    } else {
      let style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      style.setAttribute('id', 'vStyleSheet');
      document.head.appendChild(style);
      return style.sheet;
    }
  }

  reset() {
    this.stylesheet.cssRules.forEach((item, index) => {
      this.stylesheet.deleteRule(index);
    });
  }

}