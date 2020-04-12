import 'reflect-metadata';

const MyClassDecorator: ClassDecorator = (target: any) => {
    const type = Reflect.getMetadata('design:type', target);
    console.log(`类[${target.name}] design:type = ${type && type.name}`);

    const paramTypes = Reflect.getMetadata('design:paramtypes', target);
    console.log(`类[${target.name}] design:paramtypes =`, paramTypes && paramTypes.map(item => item.name));

    const returnType = Reflect.getMetadata('design:returntype', target)
    console.log(`类[${target.name}] design:returntype = ${returnType && returnType.name}`);
};

const MyPropertyDecorator: PropertyDecorator = (target: any, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    console.log(`属性[${key}] design:type = ${type && type.name}`);

    const paramTypes = Reflect.getMetadata('design:paramtypes', target, key);
    console.log(`属性[${key}] design:paramtypes =`, paramTypes && paramTypes.map(item => item.name));

    const returnType = Reflect.getMetadata('design:returntype', target, key);
    console.log(`属性[${key}] design:returntype = ${returnType && returnType.name}`);
};

const MyMethodDecorator: MethodDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    const type = Reflect.getMetadata('design:type', target, key);
    console.log(`方法[${key}] design:type = ${type && type.name}`);

    const paramTypes = Reflect.getMetadata('design:paramtypes', target, key);
    console.log(`方法[${key}] design:paramtypes =`, paramTypes && paramTypes.map(item => item.name));

    const returnType = Reflect.getMetadata('design:returntype', target, key)
    console.log(`方法[${key}] design:returntype = ${returnType && returnType.name}`);
};

const MyParameterDecorator: ParameterDecorator = (target: any, key: string, paramIndex: number) => {
    const type = Reflect.getMetadata('design:type', target, key);
    console.log(`参数[${key} - ${paramIndex}] design:type = ${type && type.name}`);

    const paramTypes = Reflect.getMetadata('design:paramtypes', target, key);
    console.log(`参数[${key} - ${paramIndex}] design:paramtypes =`, paramTypes && paramTypes.map(item => item.name));

    const returnType = Reflect.getMetadata('design:returntype', target, key)
    console.log(`参数[${key} - ${paramIndex}] design:returntype = ${returnType && returnType.name}`);
};

@MyClassDecorator
class MyClass {
    @MyPropertyDecorator
    myProperty: string;

    constructor (myProperty: string) {
        this.myProperty = myProperty;
    }

    @MyMethodDecorator
    myMethod (@MyParameterDecorator index: number, name: string): string {
        return `${index} - ${name}`;
    }
}

export default 'MetadataDemo';