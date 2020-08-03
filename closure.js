/**
 * 演示闭包以及render phase
 */

var f = 1

// 预解析，生成变量对象以及整条scope存放在堆内存中
function wrap (p) {
    var a = 1;
    var b = p

    return function () {
        var c = 3
        // v8预解析，将自由变量b由栈内存移入堆内存，
        // 存放在变量对象上（猜测）
        console.log('fn===', b)
        function ccc () {
            console.log('ccc===', c)
        }
        ccc()
    }  
}

// first render phase
// 创建fn1的[[Scope]]
// 为 [[Scope]] 的变量对象节点取得新值
// 取得闭包变量, 根据scope，查询变量值（捕获render phase），
// 创建[[Closure]]，挂载到[[Scope]],
// [[Scope]]挂载到fn1对象上
var fn1 = wrap(1)
console.dir(fn1)
setTimeout(function(){}, 0)

fn1()

function fn3 () {}

var fn4 = function () { console.log(fn3)}

var n4 = fn4()

setTimeout(function () {
    // another render phase
    var fn2 = wrap(2)
    fn1()
    fn2()
}, 1000)