/*
* 语法
* Object.defineProperty(object,


 prop, descriptor)
* 两种描述
* 1. {value: '', writeble: false}
* 2. getter()、setter()
*
* 两种描述共有属性
* - configurable 仅在属性可以修改和删除的情况下为true, 默认为false
* - enumerable 仅在枚举相关对象属性显示的情况下为true 默认为false
*
* 数据描述器还有如下属性：
* 1. value 属性值 默认为undefined
* 2. writable 可否正常赋值（例如ob.a=1） 仅在可以正常赋值的情况下为true 默认为false
*
* 访问描述器还有如下属性：
* get 获取该属性值时需要调用到的函数（无参数），该函数返回值为该属性值。 默认为undefined
* set 设置该属性值时需要调用到的函数（参数为设置该属性的值），默认为undefined
*
* 请记住，这些属性不一定是描述符本身的属性。 继承的属性也将被考虑。 
* 为了确保保留这些默认值，您可以预先冻结Object.prototype，明确指定所有选项，或者使用Object.create（null）指向null。
*/



const ob1 = {age: 0};
console.log(Object.defineProperty(ob1, 'name', {
    value: 'ob1',
    //默认不可变
    // writable: false 
}));

ob1.name = 'changed ob1';
//严格模式下会报错

console.log(ob1.name);
for(var i in ob1) {
    console.log(i);//name不会被枚举
}
/*
* 请记住，这些属性不一定是描述符本身的属性。 继承的属性也将被考虑。 
* 为了确保保留这些默认值，您可以预先冻结Object.prototype，明确指定所有选项，或者使用Object.create（null）指向null。
*/

// using __proto__
var ob2 = {};
//建立空对象 无所继承只能走默认
var descriptor = Object.create(null);
descriptor.value = 'static';
Object.defineProperty(ob2, 'key', descriptor);
console.log(`ob2.key: ${ob2.key}`);

//明确指定响应值
var ob3 = {};
Object.defineProperty(ob3, 'key', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 'stabic'
});

//优化
function withValue(value) {
    var d = withValue.d || (
        withValue.d = {
            enumerable: false,
            configurable: false,
            writable: false,
            value: null
        }
    );
    if(d.value !== value) {
        d.value = value;
    }
    return d;
}
var ob4 = {};
Object.defineProperty(ob4, 'key', withValue('static ob4'));
console.log(`ob4: ${ob4.key}`);

var ob5 = {};
Object.defineProperty(ob5,  'key', withValue('static ob5'));
/*
* q: 设置属性指向相同描述对象，描述对象修改，修改描述对象value后，之前设置好的对象属性值不变化
* a: 设想设置属性时描述对像是个快照之类的东西，并非传统的对象指针
*/
console.log(`ob4: ${ob4.key}`);
console.log(`ob5: ${ob5.key}`);

// Examples

//数据描述器
var ob6 = {};
Object.defineProperty(ob6, 'a', {
    value: 37,
    writable: true,
    enumerable: true,
    configurable: true
});

//访问描述器
//vue原理有用到
var ob6BValue = 88;
Object.defineProperty(ob6, 'b', {
    get() {
        return ob6BValue;
    },
    set(newValue) {
        ob6BValue = newValue
    },
    enumerable: true,
    configurable: true
});


//报错，两种描述器不能同时出现
Object.defineProperty('ob6', 'c', {
    value: 44,
    get() {
        return 55;
    }
});

//自定义设置器和获取器
function Archiver() {
    var temperature = null;
    var archive = [];
    Object.defineProperty(this, 'temperature', {
        get() {
            console.log('get');
            return temperature;
        },
        set(value) {
            temperature = value;
            archive.push(value);
        }
    });
    this.getArchive = function() {
        return archive;
    }
}

var archive = new Archiver();
archive.temperature = 99;
archive.temperature = 88;
archive.getArchive();




