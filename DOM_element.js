class DomElement {
    constructor(elementName, elementAttributs, children) {
        this.element = '';
        this.elementName = elementName;
        this.elementAttributs = elementAttributs;
        this.children = children
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const element = this.elementAttributs[key];
                    this.element.setAttribute(key, this.elementAttributs[key])
                }
            }
        }
        if (this.children) {
            if (typeof this.children === 'object' && this.children[0]) {
                for (let index = 0; index < this.children.length; index++) {
                    const childernElem = new DomElement(this.children[index].elementName, this.children[index].elementAttributs, this.children[index].children);
                    this.element.append(childernElem.draw());
                }
            } else if (typeof this.children === 'object' && !this.children[0]) {
                const childernElem = new DomElement(this.children.elementName, this.children.elementAttributs, this.children.children);
                this.element.append(childernElem.draw());
            } else if (typeof this.children === 'string') {
                this.element.innerHTML = this.children;
            }
        }
        return this.element
    }
}


function el(type, attrs, children) {
    const elem = new DomElement(type, attrs, children)
    return elem
}
// const tree = el("div", {id: 'name', class: 'lastname'}, [
//     el("h1", {class: 'lastname'}, 'AAAAAAAAAAAAAA'),
//     el("h1", {class: 'lastname'}, 'bbbbbbbbbbbbbb'),
//     el("h1", {class: 'lastname'}, 'CCCCCCCCCCCCCC')
// ])
// // const tree = el("div", {id: 'name', class: 'lastname'}, 'AAAAAAAAAAAAAA')
// const tree =
//     el("div", { "class": "some_classname", "id": "some_id" },
//         el("span", {}, 'hello')
//     );
// const tree =
//     el("div", {},
//         el("ul", {}, [
//             el("li", {}, "Item 1"),
//             el("li", {}, "Item 2"),
//             el("li", {}, "Item 3")
//         ])
//     );

const tree =
    el("form", { action: '/some_action' }, [
        el("label", { for: 'name' }, "First name:"),
        el("br", {}, null),
        el("input", { type: 'text', id: 'name', name: 'name', value: "My name" }, null),
        el("br", {}, null),
        el("label", { for: 'last_name' }, "Last name:"),
        el("br", {}, null),
        el("input", { type: 'text', id: 'last_name', name: 'last_name', value: "My second name" }, null),
        el("br", {}, null),
        el("input", { type: 'submit', value: 'Submit' }, null),
    ]);
document.getElementById("root").appendChild(tree.draw());
