const div = dom.create('<div><span><i>直接插入一个节点</i></span></div>');
console.log(div)

// 在test节点后面插入一个节点
const div1 = dom.create('<div>newdiv1</div>');
// dom.after(test, div1);
// dom.before(test, div1);
dom.append(test, div1);

const newParent = dom.create('<div>newParent</div>');
dom.wrap(test, newParent)

const nodes = dom.empty(window.empty)
console.log(nodes)

//修改属性,两个参数是获取属性，三个是修改
dom.attr(at, 'title', 'bbb')
console.log(dom.attr(at, 'title'))

//修改属性
dom.style(test, { border: '1px solid red', color: 'blue' })

//添加class名,has判断有没有此类名
dom.class.add(test01, 'red')
// dom.class.remove(test01, 'red')
console.log(dom.class.has(test01, 'red'))

//点击事件
const fn = () => {
    alert("点击了")
}
dom.on(test01, 'click', fn)
dom.off(test01, 'click', fn)

//查找元素 test02是范围，如果没有则认为是全局查找
const testDiv = dom.find('.red', test02)[0]
console.log(testDiv)

//查找兄弟
console.log('------------------')
let s2 = dom.find('#test04>#s2')[0]
console.log(dom.siblings(s2))

//上一个节点和下一个节点
console.log(dom.next(s2))
console.log(dom.previous(s2))

//遍历所有节点
const t = dom.find('#trval')[0]
const fn2 = (n) => {
    dom.style(n, 'color', 'red')
}
dom.each(dom.children(t), fn2)

//排名第几,从0开始
console.log(dom.index(s3))
