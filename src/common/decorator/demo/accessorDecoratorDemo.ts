const Enumerable: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = true;
};

class MyClass {
    createDate: Date;
    constructor() {
        this.createDate = new Date();
    }


    @Enumerable
    get createTime () {
        return this.createDate.getTime();
    }
}

const entity = new MyClass();
for(let key in entity) {
    console.log(`entity.${key} =`, entity[key]);
}
/* 输出：
entity.createDate = 2020-04-08T10:40:51.133Z
entity.createTime = 1586342451133
 */

export default 'AccessorDecoratorDemo';