
const Log: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    const className = target.constructor.name;
    const oldValue = descriptor.value;
    descriptor.value = function(...params) {
        console.log(`调用${className}.${key}()方法`);
        return oldValue.apply(this, params);
    };
};

class MyClass {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    @Log
    getName (): string {
        return 'Tom';
    }
}

const entity = new MyClass('Tom');
const name = entity.getName();
// 输出: 调用MyClass.getName()方法

export default 'MethodDecoratorDemo';

