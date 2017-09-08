
// 每个CommonJS模块中都有一个module对象可以使用，
// 这个module对象身上有一个exports属性，默认是一个空对象，
// 然后你可以给这个对象添加属性，也可以把这个属性值给覆写，
// 最终你在其他地方require该模块的时候，得到就是这个模块的exports属性值。

// 如果暴露一个值，通过我们这么写
module.exports = 123;