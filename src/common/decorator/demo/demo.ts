const Controller: ClassDecorator = (target: any) => {
    target.isController = true;
    console.log('Controller')
};

@Controller
class MyClass {

}

// @ts-ignore
console.log(MyClass.isController); // 输出结果：true
export default 'demo';