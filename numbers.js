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
    var form = document.createElement('span'), aim;
    form.innerHTML = '<form><input name="inputfornumbers" maxlength="2" type="text" /></form>';

    if (Numbers.count == 0 || Numbers.count == 1) {
        document.getElementsByClassName('main')[0].lastElementChild.before(form); aim = form; }
    else { aim = span; span.innerHTML = ''; span.appendChild(form); };

    console.log(aim, Numbers.count);

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

var numbers = new Numbers();
