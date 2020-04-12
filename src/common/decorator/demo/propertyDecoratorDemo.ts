interface CheckRule {
    required: boolean;
}
interface MetaData {
    [key: string]: CheckRule;
}

const Required: PropertyDecorator = (target: any, key: string) => {
    target.__metadata = target.__metadata ? target.__metadata : {};
    target.__metadata[key] = { required: true };
};

class MyClass {
    @Required
    name: string;

    @Required
    type: string;
}


function validate(entity): boolean {
    // @ts-ignore
    const metadata: MetaData = entity.__metadata;
    if(metadata) {
        let i: number,
            key: string,
            rule: CheckRule;
        const keys = Object.keys(metadata);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            rule = metadata[key];
            if (rule.required && (entity[key] === undefined || entity[key] === null || entity[key] === '')) {
                return false;
            }
        }
    }
    return true;
}

const entity: MyClass = new MyClass();
entity.name = 'name';
const result: boolean = validate(entity);
console.log('validate result:', result); // 输出结果：false

export default 'propertyDecoratorDemo';