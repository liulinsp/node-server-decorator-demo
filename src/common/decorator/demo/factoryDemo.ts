function controller ( label: string): ClassDecorator {
    return (target: any) => {
        target.isController = true;
        target.controllerLabel = label;
    };
}

@controller('My')
class MyClass {

}

// @ts-ignore
console.log('MyClass.isController =', MyClass.isController);
// 输出结果为：MyClass.isController = true
// @ts-ignore
console.log('MyClass.controllerLabel =', MyClass.controllerLabel);
// 输出结果为：MyClass.controllerLabel = "My"

export default 'FactoryDemo';