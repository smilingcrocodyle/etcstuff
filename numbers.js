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

    if (Numbers.count == 0 || Numbers.count == 1) { this.showLine(number).prepend(form); aim = form; }
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

/*Numbers.prototype.test = function() {
    var rect = document.createElement('div');
    rect.style.width = 39 * this.b + 'px';
    rect.style.height = '20px';
    rect.style.backgroundColor = 'green';
    rect.style.position = 'absolute';
    rect.style.top = '0px';
    rect.style.left = '0px';
    document.getElementsByClassName('main')[0].appendChild(rect);

    var coords = document.getElementById('ruler').getBoundingClientRect();
    rect.style.top = coords.top + 'px';
    rect.style.left = coords.left + 35 + 39*this.a + 'px';

    var startpoint = coords.left + 35 + 'px';
    var endpoint = coords.right - 60 + 'px';
    var segmentlength = 39;
    var divwidthforA = segmentlength * this.a + 'px';
    var startpointforB = coords.left + 35 + segmentlength * this.a + 'px';
    var divwidthforB = segmentlength * this.b + 'px';


};*/

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

/*Numbers.prototype.showArrow = function(amountofsegments) {
    var canvasdiv = document.createElement('div');
    var canvas = document.createElement('canvas');
    var coords = document.getElementById('ruler').getBoundingClientRect();
    canvasdiv.style.position = 'absolute';
    canvasdiv.style.top = coords.top + 'px';
    canvasdiv.style.left = coords.left + 35 + 'px';
    canvasdiv.style.width = canvas.style.width = 39 * this.a + 'px';
    canvasdiv.style.height = canvas.style.height = '83px';
    canvasdiv.appendChild(canvas);
    document.getElementsByClassName('main')[0].appendChild(canvasdiv);

    const drawing = document.getElementsByTagName('canvas')[0].getContext('2d');

    drawing.strokeStyle = '#EF3038';
    drawing.lineWidth = '0.7';
    drawing.beginPath();
    if (Numbers.count == 0) { drawing.moveTo(0, 100); drawing.quadraticCurveTo(39 * this.a / 2, 0, 39 * this.a, 100);  };
    //if (Numbers.count == 1) { drawing.moveTo(13 * ++this.a, 100); drawing.quadraticCurveTo(13 * 100 / 2, -20, 13 * ++this.c, 100); };
    drawing.stroke();

    return canvasdiv;
};*/

new Numbers();
