const A: ClassDecorator = (target) => {
    console.log('A');
};

const B: ClassDecorator = (target) => {
    console.log('B');
};

@A
@B
class MyClass {

}

/* 输出结果：
B
A
*/

export default 'OrderDemo';