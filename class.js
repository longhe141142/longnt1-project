const A = require('./classA')
class B extends A{
    constructor(message){
       super(message);
    //    this.childMessage = child
    }

    childShow(){
        console.log(this.mess)
    }
}


const b = new B("parent","child");

b.childShow()
b.present();
