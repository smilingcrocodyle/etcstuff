//1. Сделать так, чтобы mousedown не реагировала на простые клики (только на перетаскивание).
//2. Разобраться с позиционированием элемента (за что ухватили - за то и тащим: https://learn.javascript.ru/drag-and-drop).

var draggable;

function Draggable(event) {
    var coords = getCoords(event.target),
    dropplace = document.getElementById('drop'),
    dropcoords = getCoords(dropplace);
    this.element = {
        element: event.target,
        elementY: coords.top,
        elementX: coords.left,
        shiftY: event.clientY - coords.top,
        shiftX: event.clientX - coords.left
    };
    this.dropfield = {
        dropY: dropcoords.top,
        dropX: dropcoords.left,
        dropW: dropplace.offsetWidth,
        dropH: dropplace.offsetHeight
    };

    this.dragging = 0;

    document.onmousemove = (event = event || window.event) => { draggable.move(); };
    document.onmouseup = (event = event || window.event) => { draggable.stop(); };

    function getCoords(element) {
        var rec = element.getBoundingClientRect(),
        recTopScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop,
        recLeftScroll = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
        return {
            top: rec.top + recTopScroll,
            left: rec.left + recLeftScroll
        };
    };
};

Draggable.prototype.move = function() {
    this.dragging++; if (this.dragging > 20) {
    this.element.element.style.position = 'fixed';
    this.element.element.style.zIndex = '1000';

    var elementTop = event.clientY - this.element.shiftY,
    elementLeft = event.clientX - this.element.shiftX;
    this.element.element.style.top = elementTop + 'px';
    this.element.element.style.left = elementLeft + 'px'; };
};

Draggable.prototype.stop = function() {
        switch (true) {
            case event.clientX < this.dropfield.dropX:
            case event.clientX > this.dropfield.dropX + this.dropfield.dropW:
            case event.clientY < this.dropfield.dropY:
            case event.clientY > this.dropfield.dropY + this.dropfield.dropH:
                this.element.element.style.top = this.element.elementY + 'px';
                this.element.element.style.left = this.element.elementX + 'px';
                this.element.element.style.position = 'static';
                break;
        };
        this.element.element.style.zIndex = 'auto';
        draggable = document.onmouseup = document.onmousemove = null; this.dragging = 0;
};

document.onmousedown = (event = event || window.event) => {
    if (event.which != 1) return;
    if (!event.target.classList.contains('item')) return;
    draggable = new Draggable(event);
    return false;
};
