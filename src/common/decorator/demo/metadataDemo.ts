import 'reflect-metadata';

const Controller: ClassDecorator = (target: any) => {
    Reflect.defineMetadata('isController', true, target);
};

@Controller
class MyClass {

}

console.log(Reflect.getMetadata('isController', MyClass)); // 输出结果：true
export default 'MetadataDemo';

