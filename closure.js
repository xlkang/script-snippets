/**
 * 演示闭包以及render phase
 */

var f = 1

function wrap (p) {
    var a = 1;
    var b = p

    return function () {
        console.log(b)
    }
}

var fn1 = wrap(1)

setTimeout(function(){}, 0)

fn1()

setTimeout(function () {
    // another render phase
    var fn2 = wrap(2)
    fn1()
    fn2()
}, 1000)