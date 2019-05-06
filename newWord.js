// new操作符做了这些事：
// 1. 它创建了一个全新的对象；
// 2. 它会被执行 [[ Prototype ]] (也就是 __proto__) 链接；
// 3. 它使 this 指向新创建的对象；
// 4. 通过 new 创建的每个对象将最终被 [[ Prototype ]] 链接到这个函数的 prototype 对象上；
// 5. 如果函数没有返回对象类型 Object(包含Function, Array, Date, RegExg, Error)，那么 new 表达式中的函数调用将返回该对象引用。

function newWord(func) {
  const res = {};
  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  }
  const result = func.apply(res, Array.prototype.slice.call(arguments, 1));
  if ((typeof result === 'object' || typeof result === 'function') && result !== null) {
    return result;
  }
  return res;
}

// example
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayName = function () {
  return this.name;
};

const dum = newWord(Person, 'dum', 28);
console.log(dum);
