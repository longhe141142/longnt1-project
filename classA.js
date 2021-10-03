module.exports = class A {
  constructor(message) {
    this.mess = message;
  }

  present() {
    console.log(this.mess);
  }
};
