/*Функция-конструктор Numbers с методом solve (управляет всем) и двумя вспомогательными методами showLine и showArrow, которые отвечают за
визуальное представление числа на линейке: одна показывает линии, так что линейка становится похожа на градусник (сделала, чтобы было хоть
какое-то представление, поскольку со второй возникла проблема); вторая показывает выгнутые стрелки, как в ТЗ (через HTML5 canvas), однако я пока
не смогла понять, что там именно не так со вторым отрезком - завтра посмотрю "свежим взглядом" и обновлю код на гитхабе (общую мысль метод, тем
не менее, передает).*/

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
        //this.showLine(number).prepend(form);
        this.showArrow(number).prepend(form);
        aim = form; }
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
    let inputdiv = document.createElement('div'), rect = document.createElement('div'),
        ruler = document.getElementById('ruler').getBoundingClientRect();

    inputdiv.style.position = 'absolute';
    inputdiv.style.textAlign = 'center';
    inputdiv.style.fontSize = '17pt';
    rect.style.height = '3px';
    rect.style.marginTop = '20px';
    rect.style.width = inputdiv.style.width = 39 * segment + 'px';

    inputdiv.appendChild(rect);
    document.querySelector('.main').appendChild(inputdiv);

    inputdiv.style.top = ruler.top - 20 + 'px';
    if (Numbers.count == 0) { rect.style.backgroundColor = '#EF3038'; inputdiv.style.left = ruler.left + 35 + 'px'; }
    else { rect.style.backgroundColor = '#007FFF'; inputdiv.style.left = ruler.left + 35 + 39 * this.a + 'px'; };

    return inputdiv;
};

Numbers.prototype.showArrow = function(segment) {

    let coords, drawing, cdiv = document.createElement('div'), canvas = document.createElement('canvas'),
        ruler = document.getElementById('ruler').getBoundingClientRect();

    cdiv.style.position = 'absolute';
    cdiv.classList.add('arrow');

    cdiv.style.height = canvas.style.height = '83px';
    cdiv.style.width = canvas.style.width = 39 * segment + 'px';
    cdiv.style.top = ruler.top + 'px';
    cdiv.style.left = ruler.left + 35 + 'px';
    cdiv.appendChild(canvas);
    document.querySelector('.main').appendChild(cdiv);

    switch (Numbers.count) {
        case 0:
            drawing = document.getElementsByTagName('canvas')[0].getContext('2d');
            coords = document.querySelectorAll('.arrow')[0].getBoundingClientRect();
            draw();
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
            drawing.lineWidth = '1.5';
            drawing.beginPath();
            drawing.moveTo(0, 100);
            drawing.quadraticCurveTo(39 * segment / 2, 0, ruler.left + coords.bottom, 100);
            drawing.stroke();
    };

    return cdiv;

};

new Numbers();
