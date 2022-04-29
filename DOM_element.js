const DIV = 'div'
const SPAN = 'span'
const UL = 'ul'
const LI = 'li'
const FORM = 'form'
const LABEL = 'label'
const BR = 'br'
const INPUT = 'input'


class DomElement {
    constructor(elementName, elementAttributs, children) {
        this.element = '';
        this.elementName = elementName;
        this.elementAttributs = elementAttributs;
        this.children = children
    }
    draw() {
        switch (this.elementName) {
            case DIV:
                this.element = new DivElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            case SPAN:
                this.element = new SpanElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            case UL:
                this.element = new UlElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            case LI:
                this.element = new LiElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            case FORM:
                this.element = new FormElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            case LABEL:
                this.element = new LabelElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            case INPUT:
                this.element = new InputElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            case BR:
                this.element = new BrElement(this.elementName, this.elementAttributs, this.children).draw();
                break;
            default:
                console.error('choose from this list (DIV, SPAN, UL, LI, FORM, LABEL, BR, INPUT)');
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

class DivElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const divAttr = ['id', 'class', 'style', 'title']
                    if (!divAttr.some(attr => attr === key)) {
                        console.error(`div tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}

class SpanElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const spanAttr = ['id', 'class', 'style']
                    if (!spanAttr.some(attr => attr === key)) {
                        console.error(`span tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}

class UlElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const ulAttr = ['id', 'class', 'style']
                    if (!ulAttr.some(attr => attr === key)) {
                        console.error(`ul tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}


class LiElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const liAttr = ['id', 'class', 'style']
                    if (!liAttr.some(attr => attr === key)) {
                        console.error(`li tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}

class FormElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const formAttr = ['id', 'class', 'action', 'method', 'autocomplete', 'name', 'target', 'accept-charset']
                    if (!formAttr.some(attr => attr === key)) {
                        console.error(`form tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}

class LabelElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const labelAttr = ['for', 'form']
                    if (!labelAttr.some(attr => attr === key)) {
                        console.error(`label tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}

class InputElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const inputAttr = ['id', 'class', 'style', 'type', 'value', 'name', 'disabled', 'checked', 'autofocus', 'alt', 'accept']
                    if (!inputAttr.some(attr => attr === key)) {
                        console.error(`input tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}

class BrElement extends DomElement {
    constructor(elementName, elementAttributs, children) {
        super(elementName, elementAttributs, children)
    }
    draw() {
        this.element = document.createElement(this.elementName);
        if (this.elementAttributs) {
            for (const key in this.elementAttributs) {
                if (Object.hasOwnProperty.call(this.elementAttributs, key)) {
                    const brAttr = ['id', 'class', 'style']
                    if (!brAttr.some(attr => attr === key)) {
                        console.error(`br tag cannot have ${key.toLocaleUpperCase()} attribute`);
                    } else {
                        this.element.setAttribute(key, this.elementAttributs[key])
                    }
                }
            }
        }
        return this.element
    }
}

function el(type, attrs, children) {
    const elem = new DomElement(type, attrs, children)
    return elem
}

// Test 1

// const tree =
//     el("div", { "class": "some_classname", "id": "some_id" },
//         el("span", {}, 'hello')
//     );

// Test 2

// const tree =
//     el("div", {},
//         el("ul", {}, [
//             el("li", {}, "Item 1"),
//             el("li", {}, "Item 2"),
//             el("li", {}, "Item 3")
//         ])
//     );

// Test 3

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
