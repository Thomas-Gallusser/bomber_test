class c_ennemie {
  constructor(spawnX, spawnY) {
    this.life = 1;
    this.dir = [];

    let divMob = document.createElement("div");
    divMob.style.width = "40px";
    divMob.style.height = "40px";
    divMob.style.left = spawnX + "px";
    divMob.style.top = spawnY + "px";
    divMob.style.position = "absolute";
    divMob.style.backgroundSize = "cover";
    divMob.style.backgroundPosition = '0px 0px';
    divMob.style.zIndex = 500;
    divMob.style.backgroundImage = "url('img/mob.png')";
    terrain.appendChild(divMob);
    ennemie.push(this);
    this.div = divMob;

    this.boucle();
  }

  boucle() {
      let that = this;
      setTimeout(function() {
        that.dir = [];
        that.verifDeplacement();

        if (that.dir.length > 0) that.move(that.dir[getRnd(that.dir.length)]);
        if (that.life > 0) that.boucle();
      },2000);
  }

  getDamage() {
    this.life -= 1;
    if (this.life == 0) this.gameOver();
  }

  gameOver() {
    score++;
    hurt.cloneNode(true).play();
    this.div.remove();
    ennemie = ennemie.filter(e => e.life > 0);

    if (ennemie.length == 0) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", './score.php', true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send('score='+score+'&pseudo='+pseudo);

      audio.pause();
      start = false;
      win.play();

      let tableScore = document.createElement("table");
      xhr = new XMLHttpRequest();
      xhr.open("POST", './score.php', true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = function() {
          if (xhr.status === 200) {

            if (xhr.responseText.includes('<tr>')) {
              tableScore.style.position = "absolute";
              tableScore.innerHTML = xhr.responseText;
              tableScore.borderCollapse = "collapse";
              tableScore.border = "1px solid black";
              tableScore.style.width = "200px";
              tableScore.style.height = ((xhr.responseText.split('<td>')-1) * 40) + "px";
              tableScore.style.backgroundColor = 'white';
              tableScore.style.zIndex = 999;
              tableScore.style.fontWeight = "bold";
              tableScore.style.fontSize = "16px";
              terrain.appendChild(tableScore);
              tableScore.style.left = (terrain.offsetWidth / 2) - (tableScore.offsetWidth / 2) + 'px';
              tableScore.style.top = '10px';
            }
          }
      };
      xhr.send('get=0');

      let winer = document.createElement("p");
      winer.style.position = "absolute";
      winer.innerText = "Bravo !"
      winer.style.padding = "10px 15px 10px 15px";
      winer.style.borderRadius= "5px";
      winer.style.backgroundColor = 'white';
      winer.style.zIndex = 999;
      winer.style.fontWeight = "bold";
      winer.style.fontSize = "21px";
      terrain.appendChild(winer);
      winer.style.left = (terrain.offsetWidth / 2) - (winer.offsetWidth / 2) + 'px';
      winer.style.top = (terrain.offsetHeight / 2) - (winer.offsetHeight) + 'px';

      let reMultiBtn = document.createElement("button");
      let restartBtn = document.createElement("button");
      restartBtn.style.position = "absolute";
      restartBtn.innerText = "Solo"
      restartBtn.style.zIndex = 999;
      terrain.appendChild(restartBtn);
      restartBtn.style.left = (terrain.offsetWidth / 2) - (restartBtn.offsetWidth / 2) + 'px';
      restartBtn.style.top = (terrain.offsetHeight / 2) - (restartBtn.offsetHeight) + 60 + 'px';
      restartBtn.onclick = function() {
        winer.remove();
        murs.forEach(function(element) {
          element.div.remove();
        });
        ennemie.forEach(function(element) {
          element.div.remove();
        });
        bombe.forEach(function(element) {
          element.div.remove();
        });
        joueur1.div.remove();
        if (joueur2 != undefined) joueur2.div.remove();
        murs = [];
        bombe = [];
        ennemie = [];
        nbrMursActuel = 0;
        nbrEnnemiesActuel = 0;
        spawn(1);
        tableScore.remove();
        restartBtn.remove();
        reMultiBtn.remove();
      };

      reMultiBtn.style.position = "absolute";
      reMultiBtn.innerText = "Multijoueur";
      reMultiBtn.style.zIndex = 999;
      terrain.appendChild(reMultiBtn);
      reMultiBtn.style.left = (terrain.offsetWidth / 2) - (reMultiBtn.offsetWidth / 2) + 'px';
      reMultiBtn.style.top = (terrain.offsetHeight / 2) - (reMultiBtn.offsetHeight) + 90 + 'px';
      reMultiBtn.onclick = function() {
        loser.remove();
        murs.forEach(function(element) {
          element.div.remove();
        });
        ennemie.forEach(function(element) {
          element.div.remove();
        });
        bombe.forEach(function(element) {
          element.div.remove();
        });
        murs = [];
        bombe = [];
        ennemie = [];
        nbrMursActuel = 0;
        nbrEnnemiesActuel = 0;
        joueur1.div.remove();
        if (joueur2 != undefined) {
          joueur2.div.remove();
          joueur2 = undefined;
        }
        spawn(2);
        restartBtn.remove();
        reMultiBtn.remove();
      };
    }
  }


  move(code) {
    if (start) {
      var newX = this.div.offsetLeft;
      var newY = this.div.offsetTop;

      if (code == "ArrowUp") newY -= move_size;
      if (code == "ArrowDown") newY += move_size;
      if (code == "ArrowRight") newX += move_size;
      if (code == "ArrowLeft") newX -= move_size;

      this.startAnim(code);
      this.div.style.left = newX + 'px';
      this.div.style.top = newY + 'px';
    }
  }

  startAnim(code) {
      var getActualPos = this.div.style.backgroundPosition.split('px')[0];

      if (code == "ArrowUp") {
        if (getActualPos != '-120' && getActualPos != '-160') {
          this.div.style.backgroundPosition = '-120px 0px';
        } else if (getActualPos == '-160') {
          this.div.style.backgroundPosition = '-160px 0px';
        } else if (getActualPos == '-160') {
          this.div.style.backgroundPosition = '-120px 0px';
        }
      }
      if (code == "ArrowDown") {
        if (getActualPos != '-40' && getActualPos != '-80') {
          this.div.style.backgroundPosition = '-40px 0px';
        } else if (getActualPos == '-40') {
          this.div.style.backgroundPosition = '-80px 0px';
        } else if (getActualPos == '-80') {
          this.div.style.backgroundPosition = '-40px 0px';
        }

      }
      if (code == "ArrowRight") {
        if (getActualPos != '-200' && getActualPos != '-240') {
          this.div.style.backgroundPosition = '-200px 0px';
        } else if (getActualPos == '-200') {
          this.div.style.backgroundPosition = '-240px 0px';
        } else if (getActualPos == '-240') {
          this.div.style.backgroundPosition = '-200px 0px';
        }

      }
      if (code == "ArrowLeft") {
        if (getActualPos != '-280' && getActualPos != '-320') {
          this.div.style.backgroundPosition = '-280px 0px';
        } else if (getActualPos == '-280') {
          this.div.style.backgroundPosition = '-320px 0px';
        } else if (getActualPos == '-320') {
          this.div.style.backgroundPosition = '-280px 0px';
        }
      }
  }

  verifDeplacement() {
    this.dir = [];

    if (!(joueur1.div.offsetLeft + move_size == this.div.offsetLeft && joueur1.div.offsetTop == this.div.offsetTop) && ennemie.filter(e => (e.div.offsetLeft + move_size == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop).length == 0)  && bombe.filter(e => (e.div.offsetLeft + move_size == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop).length == 0) && (murs.filter(e => (e.div.offsetLeft + move_size == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop)).length == 0)) if (joueur2 != undefined) {
          if (!(joueur2.div.offsetLeft + move_size == this.div.offsetLeft && joueur2.div.offsetTop == this.div.offsetTop)) this.dir.push("ArrowRight");
    } else this.dir.push("ArrowLeft");

    if (!(joueur1.div.offsetLeft - move_size == this.div.offsetLeft && joueur1.div.offsetTop == this.div.offsetTop) && ennemie.filter(e => (e.div.offsetLeft - move_size == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop).length == 0) && bombe.filter(e => (e.div.offsetLeft - move_size == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop).length == 0) && (murs.filter(e => (e.div.offsetLeft - move_size == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop)).length == 0)) if (joueur2 != undefined) {
      if (!(joueur2.div.offsetLeft - move_size == this.div.offsetLeft && joueur2.div.offsetTop == this.div.offsetTop)) this.dir.push("ArrowLeft");
    } else this.dir.push("ArrowRight");

    if (!(joueur1.div.offsetLeft == this.div.offsetLeft && joueur1.div.offsetTop + move_size == this.div.offsetTop) && ennemie.filter(e => (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop + move_size == this.div.offsetTop).length == 0) && bombe.filter(e => (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop + move_size == this.div.offsetTop).length == 0) && (murs.filter(e => (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop + move_size == this.div.offsetTop)).length == 0)) if (joueur2 != undefined) {
      if (!(joueur2.div.offsetLeft == this.div.offsetLeft && joueur2.div.offsetTop + move_size == this.div.offsetTop)) this.dir.push("ArrowBottom");
    } else this.dir.push("ArrowUp");

    if (!(joueur1.div.offsetLeft == this.div.offsetLeft && joueur1.div.offsetTop - move_size == this.div.offsetTop) && ennemie.filter(e => (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop - move_size == this.div.offsetTop).length == 0) && bombe.filter(e => (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop - move_size == this.div.offsetTop).length == 0) && (murs.filter(e => (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop - move_size == this.div.offsetTop)).length == 0)) if (joueur2 != undefined) {
      if (!(joueur2.div.offsetLeft == this.div.offsetLeft && joueur2.div.offsetTop - move_size == this.div.offsetTop)) this.dir.push("ArrowUp");
    } else this.dir.push("ArrowBottom");
  }
}
