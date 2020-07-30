window.dom = {
    //创建并插入一个节点,传入节点的字符串：'<div><span><i>直接插入一个节点</i></span></div>'
    create(string) {
        // template 是万能的模板
        const container = document.createElement('template');
        //去掉空格，空格也是一个标签
        container.innerHTML = string.trim();
        return container.content.firstChild
    },
    //新增弟弟，在元素后面插入一个节点，传入元素节点，新建节点：
    after(node, newNode) {
        node.parentNode.insertBefore(newNode, node.nextSibling);
    },
    //新增哥哥，在节点的前面插入一个节点
    before(node, newNode) {
        node.parentNode.insertBefore(newNode, node);
    },
    //新增一个儿子节点
    append(parent, newNode) {
        parent.appendChild(newNode);
    },
    //给节点添加一个爸爸,把newParent包裹着node
    wrap(node, newParent) {
        //先把newParent变成node兄弟
        dom.after(node, newParent);
        //把node变成newParent的儿子
        dom.append(newParent, node);
    },
    //删除元素（包含此元素）
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    //将所有子元素删（不包含此元素）
    //获取全部子元素 childNodes =node.chilNodes简写成{ childNodes } = node
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    //改属性
    attr(node, name, value) {//重载
        // arguments获取参数列表，参数为3个，修改参数，为2则是修改
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    //修改文本内容，两个参数：修改，一个：返回
    text(node, string) {
        if (arguments === 2) {
            //适配
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments === 2) {
            if ('innerText' in node) {
                return node.innerText = string
            } else {
                return node.textContent = string
            }
        }
    },
    //修改html
    html(node, string) {
        if (arguments === 2) {
            node.innerHTML = string
        } else if (arguments === 2) {
            return node.innerHTML = string
        }
    },
    //修改样式
    style(node, name, value) {
        if (arguments.length === 3) {
            //改变某一个样式 dom.style(div,'color','red')
            node.style[name] = value
        } else if (arguments.length == 2) {
            //若是两个参数：是取值
            if (typeof neme === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(test, { border: '1px solid red', color: 'blue' })
                const object = name
                for (let key in object) {
                    //变量使用[]
                    node.style[key] = object[key]
                }
            }
        }
    },
    //添加修改删除类名
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    //点击事件
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    //移除点击事件
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    //查找
    find(selector, scope) {
        //scope 寻找的指定范围,没有scope就全局寻找
        return (scope || document).querySelectorAll(selector)
    },
    //查找父亲
    parent(node) {
        return node.parentNode
    },
    //查找儿子
    children(node) {
        return node.children
    },
    //查找兄弟姐妹,不包括自己，返回的数组是伪数组
    //filter是过滤，只要不等于传入的节点就放入数组里
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    //寻找下一个节点x.nodeType如果是3，则此节点是文本节点
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    //返回上一个节点
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    //遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //查询节点排名第几
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break;
            }
        }
        return i
    }


};