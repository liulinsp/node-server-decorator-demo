interface Mixinable {
    [funcName: string]: Function;
}
function mixin ( list: Mixinable[]): ClassDecorator {
    return (target: any) => {
        Object.assign(target.prototype, ...list)
    }
}

const mixin1 = {
    fun1 () {
        return 'fun1'
    }
};

const mixin2 = {
    fun2 () {
        return 'fun2'
    }
};

@mixin([ mixin1, mixin2 ])
class MyClass {

}

// @ts-ignore
console.log(new MyClass().fun1()); // 输出：fun1
// @ts-ignore
console.log(new MyClass().fun2()); // 输出：fun2

export default 'classDecoratorDemo';