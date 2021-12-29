window.dom = {
    create(string) {
        //在template标签内写内容
        const container = document.createElement('template');
        container.innerHTML = string;
        return container.content.firstChild;
    },
    after(node, node2) {
        // 在node的下一个元素前面插入node2
        node.parentNode.insertBefore(node2, node.siblings);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, child) {
        parent.appendChild(child);
    },
    // node2添加为node的父节点
    wrap(node, node2) {
        // 将node2插入到node前，再将node添加到node2的子节点
        dom.before(node, node2);
        dom.append(node2, node);
    },
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node) {
        // 遍历node的子节点，注意空格也是节点
        const array = [];
        let x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild));
            console.log(array);
        }
        return array;
    },
    attr(node, name, value) {
        // 传入的参数有三个为设置setAttribute，两个为获取getAttribute，重载
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    text(node, string) {
        // 重载
        if (arguments.length === 2) {
            // 兼容IE
            if ('innerText' in node) {
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText;
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHtml = string;
        } else if (arguments.length === 1) {
            return node.innerHtml;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof value === 'string') {
                return node.style[name];
            } else if (name instanceof Object) {
                const object = name;
                for (let key in object) {
                    node.style[key] = object[key];
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, eventname, fn) {
        node.addEventListener(eventname, fn);
    },
    off(node, eventname, fn) {
        node.removeeventListener(eventname, fn);
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node);
    },
    next(node) {
        let x = node.nextSibling;
        while (x && x.nodeType === 3) {
            x = x.nextSibling;
        }
        return x;
    },
    previous(node) {
        let x = node.previousSibling;
        while (x && x.nodeType === 3) {
            x = x.previousSibling;
        }
        return x;
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index(node) {
        const list = dom.children(node.parentNode);
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break;
            }
        }
        return i;
    }
}