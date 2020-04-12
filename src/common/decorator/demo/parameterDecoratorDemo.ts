function logParam (paramName: string = ''): ParameterDecorator  {
    return (target: any, key: string, paramIndex: number) => {
        if (!target.__metadata) {
            target.__metadata = {};
        }
        if (!target.__metadata[key]) {
            target.__metadata[key] = [];
        }
        target.__metadata[key].push({
            paramName,
            paramIndex
        });
    }
}

const Log: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    const className = target.constructor.name;
    const oldValue = descriptor.value;
    descriptor.value = function(...params) {
        let paramInfo = '';
        if (target.__metadata && target.__metadata[key]) {
            target.__metadata[key].forEach(item => {
                paramInfo += `\n * 第${item.paramIndex}个参数${item.paramName}的值为: ${params[item.paramIndex]}`;
            })
        }
        console.log(`调用${className}.${key}()方法` + paramInfo);
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

    @Log
    setName(@logParam() name: string): void {
        this.name = name;
    }

    @Log
    setNames( @logParam('firstName') firstName: string, @logParam('lastName') lastName: string): void {
        this.name = firstName + '' + lastName;
    }
}

const entity = new MyClass('Tom');
const name = entity.getName();
// 输出：调用MyClass.getName()方法

entity.setName('Jone Brown');
/* 输出：
调用MyClass.setNames()方法
 * 第0个参数的值为: Jone Brown
*/

entity.setNames('Jone', 'Brown');
/* 输出：
调用MyClass.setNames()方法
 * 第1个参数lastName的值为: Brown
 * 第0个参数firstName的值为: Jone
*/

export default 'MethodDecoratorDemo';