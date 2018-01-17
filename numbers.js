//Функция-конструктор Numbers с методом solve (управляет всем) и двумя вспомогательными методами showLine и showArrow, которые отвечают за визуальное представление числа на линейке: одна показывает линии, так что линейка становится похожа на градусник (сделала, чтобы было хоть какое-то представление, поскольку со второй возникла проблема); вторая показывает выгнутые стрелки, как в ТЗ (через HTML5 canvas), однако я пока не смогла понять, что там именно не так со вторым отрезком - завтра посмотрю "свежим взглядом" и обновлю код на гитхабе (общую мысль метод, тем не менее, передает).

function Numbers() {
    let arrone = [6, 7, 8, 9], arrtwo = [11, 12, 13, 14];
    this.a = arrone[Math.floor(Math.random() * 4)];
    this.c = arrtwo[Math.floor(Math.random() * 4)];
    this.b = this.c - this.a;

    this.anumber = document.getElementById('anumber'); this.anumber.innerHTML = this.a;
    this.bnumber = document.getElementById('bnumber'); this.bnumber.innerHTML = this.b;
    this.result = document.getElementById('result'); this.result.textContent = '?';

    this.solve(this.a, this.anumber);
};

Numbers.count = 0;

Numbers.prototype.solve = function(number, span) {
    if (Numbers.count == 3) return;
    let aim, form = document.createElement('span');
    form.innerHTML = '<form><input name="inputfornumbers" maxlength="2" type="text" /></form>';

    if (Numbers.count == 0 || Numbers.count == 1) {
        this.showLine(number).prepend(form);
        //this.showArrow(number).prepend(form); - это линейка по ТЗ (с выгнутыми стрелками) через canvas-элемент
        aim = form; }
    else { span.style.display = 'inline-block'; span.innerHTML = ''; span.appendChild(form); aim = span; };

    form.onchange = (event = event || window.event) => {
        if (event.target.value != number) { event.target.style.color = 'red'; span.style.backgroundColor = 'yellow'; }
        else {
            span.style.backgroundColor = 'white';
            event.target.style.color = 'black';
            aim.innerHTML = '';
            aim.innerHTML = event.target.value;
            Numbers.count++;
            Numbers.count == 1 ? this.solve(this.b, this.bnumber) : this.solve(this.c, this.result);
        };

    };

};

Numbers.prototype.showLine = function(segment) {
    let inputdiv = document.createElement('div'), rect = document.createElement('div'),
        coords = document.getElementById('ruler').getBoundingClientRect();

    inputdiv.style.position = 'absolute';
    inputdiv.style.textAlign = 'center';
    inputdiv.style.fontSize = '17pt';
    rect.style.height = '3px';
    rect.style.marginTop = '20px';
    rect.style.width = inputdiv.style.width = 39 * segment + 'px';

    inputdiv.appendChild(rect);
    document.getElementsByClassName('main')[0].appendChild(inputdiv);

    inputdiv.style.top = coords.top - 20 + 'px';
    if (Numbers.count == 0) { rect.style.backgroundColor = '#EF3038'; inputdiv.style.left = coords.left + 35 + 'px'; }
    else { rect.style.backgroundColor = '#007FFF'; inputdiv.style.left = coords.left + 35 + 39 * this.a + 'px'; };

    return inputdiv;
};

Numbers.prototype.showArrow = function(segment) {

    var canvasdiv = document.createElement('div'), canvas = document.createElement('canvas'), coords = document.getElementById('ruler').getBoundingClientRect(), coordsdiv;

    canvasdiv.style.position = 'absolute';
    canvasdiv.classList.add('t');

    canvasdiv.style.height = canvas.style.height = '83px';
    canvasdiv.style.width = canvas.style.width = 39 * segment + 'px';
    canvasdiv.style.top = coords.top + 'px';
    canvasdiv.style.left = coords.left + 35 + 'px';
    canvasdiv.appendChild(canvas);
    document.getElementsByClassName('main')[0].appendChild(canvasdiv)

    const drawing = document.getElementsByTagName('canvas')[0].getContext('2d');

    switch (Numbers.count) {
        case 0:
            coordsdiv = document.getElementsByClassName('t')[0].getBoundingClientRect();
            drawing.strokeStyle = '#EF3038';
            drawing.lineWidth = '0.7';
            drawing.beginPath();
            drawing.moveTo(0, 100);
            drawing.quadraticCurveTo(39 * this.a / 2, 0, coords.left + coordsdiv.bottom, 100);
            drawing.stroke();
            break;
        case 1:
            coordsdiv = document.getElementsByClassName('t')[1].getBoundingClientRect();
            drawing.strokeStyle = '#007FFF';
            drawing.lineWidth = '0.7';
            drawing.beginPath();
            drawing.moveTo(coords.left + 35 + 39 * this.a, 100);
            drawing.quadraticCurveTo(39 * this.a / 2, 0, coords.left + 35 + 39 * this.c, 100);
            drawing.stroke();
            canvasdiv.style.left = coords.left + coords.left + coordsdiv.bottom + 'px';
            break;
    };

    return canvasdiv;

};

new Numbers();
