/*
Во избежания недопонимания по срокам:
- основная часть программы (архитектура + solve + showLine) была доделана до 15.00 17.01;
- однако, showConvex была не закончена (уже перед дедлайном там вскрылась проблема с HTML5 canvas), так что
я отправила то, что было, а showConvex доделала днем позже (18.01);
- тогда же (18.01) был добавлен readme.
*/

function Numbers(style = 'line' || 'convex') {
    let arrone = [6, 7, 8, 9], arrtwo = [11, 12, 13, 14];
    this.a = arrone[Math.floor(Math.random() * 4)];
    this.c = arrtwo[Math.floor(Math.random() * 4)];
    this.b = this.c - this.a;
    this.style = style;

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
        this.style == 'line' ? this.showLine(number).prepend(form) : this.showConvex(number).prepend(form); aim = form; }
    else { span.style.display = 'inline-block'; span.innerHTML = ''; span.appendChild(form); aim = span; };

    form.onchange = (event = event || window.event) => {
        if (event.target.value != number) { event.target.style.color = 'red'; span.style.backgroundColor = '#FFD700'; }
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
    let idiv = document.createElement('div'), rect = document.createElement('div'),
        ruler = document.getElementById('ruler').getBoundingClientRect();

    idiv.style.position = 'absolute';
    idiv.style.textAlign = 'center';
    idiv.style.fontSize = '20pt';
    rect.style.height = '3px';
    rect.style.marginTop = '20px';
    rect.style.width = idiv.style.width = 39 * segment + 'px';

    idiv.appendChild(rect);
    document.querySelector('.main').appendChild(idiv);

    idiv.style.top = ruler.top - 30 + 'px';
    if (Numbers.count == 0) { rect.style.backgroundColor = '#EF3038'; idiv.style.left = ruler.left + 35 + 'px'; }
    else { rect.style.backgroundColor = '#007FFF'; idiv.style.left = ruler.left + 35 + 39 * this.a + 'px'; };

    return idiv;
};

Numbers.prototype.showConvex = function(segment) {

    let coords, drawing, cdiv = document.createElement('div'), canvas = document.createElement('canvas'),
        ruler = document.getElementById('ruler').getBoundingClientRect();

    cdiv.style.position = 'absolute';
    cdiv.classList.add('arrow');

    canvas.style.height = '80px';
    cdiv.style.width = canvas.style.width = 39 * segment + 'px';
    cdiv.style.top = cdiv.style.left = 0 + 'px';
    cdiv.style.textAlign = 'center';
    cdiv.style.fontSize = '20pt';
    cdiv.appendChild(canvas);
    document.querySelector('.main').appendChild(cdiv);

    switch (Numbers.count) {
        case 0:
            drawing = document.getElementsByTagName('canvas')[0].getContext('2d');
            coords = document.querySelectorAll('.arrow')[0].getBoundingClientRect();
            draw();
            cdiv.style.left = ruler.left + 35 + 'px';
            break;
        case 1:
            drawing = document.getElementsByTagName('canvas')[1].getContext('2d');
            coords = document.querySelectorAll('.arrow')[1].getBoundingClientRect();
            draw();
            cdiv.style.left = ruler.left + 35 + 39 * this.a + 'px';
            break;
    };

    function draw() {
            drawing.strokeStyle = '#EF3038';
            drawing.lineWidth = '4.5';
            drawing.lineCap = 'round';
            drawing.beginPath();
            drawing.moveTo(coords.left, coords.bottom);
            drawing.quadraticCurveTo(300 / 2, -30, 300, coords.bottom);
            drawing.stroke();
            cdiv.style.top = ruler.top - 70 + 'px';
    };

    return cdiv;

};

new Numbers('line');
