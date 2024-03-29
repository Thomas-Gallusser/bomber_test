class c_player1 {
  constructor() {
    this.life = 1;
    this.canBomb = true;
    this.nextMove = true;

    let divJoueur = document.createElement("div");
    divJoueur.style.width = "40px";
    divJoueur.style.height = "40px";
    divJoueur.style.left = "40px";
    divJoueur.style.top = "40px";
    divJoueur.style.position = "absolute";
    divJoueur.style.backgroundSize = "cover";
    divJoueur.style.backgroundPosition = '0px 0px';
    divJoueur.style.zIndex = 500;
    divJoueur.style.backgroundImage = "url('img/perso.png')";
    terrain.appendChild(divJoueur);
    joueur1 = this;
    this.div = divJoueur;

    let that = this;
    this.loop = setInterval(function(){
      var newX = that.div.offsetLeft;
      var newY = that.div.offsetTop;
      that.startAnim(lastKeyJ1);

      if (lastKeyJ1 == hautJ1) newY -= move_size;
      if (lastKeyJ1 == basJ1) newY += move_size;
      if (lastKeyJ1 == droiteJ1) newX += move_size;
      if (lastKeyJ1 == gaucheJ1) newX -= move_size;

      let j2 = false;
      if (joueur2 != undefined) j2 = that.verifCollisionP(that.div,newX,newY,joueur2.div);
      if (!that.verifCollision(that.div,newX,newY,murs) && !that.verifCollision(that.div,newX,newY,bombe) && !that.verifCollision(that.div,newX,newY,ennemie) && !j2) {
        that.div.style.left = newX + 'px';
        that.div.style.top = newY + 'px';
      }
    }, 200);
  }

  getDamage() {
    this.life -= 1;
    if (this.life == 0) this.gameOver();
  }

  gameOver() {
    let that = this;
    audio.pause();
    hurt.cloneNode(true).play();
      var xhr = new XMLHttpRequest();

    if (joueur2 == undefined) {
      xhr.open("POST", './score.php', true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send('score='+score+'&pseudo='+pseudo);
    }

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
    xhr.send('get');

    start = false;
    this.div.style.display = 'none';
    if (joueur2 == null) gameover.play(); else win.play();

    let loser = document.createElement("p");
    loser.style.position = "absolute";
    if (joueur2 == null) loser.innerText = "Perdu !"; else  loser.innerText = "Joueur 2 à gagné !";
    loser.style.padding = "10px 15px 10px 15px";
    loser.style.borderRadius= "5px";
    loser.style.backgroundColor = 'white';
    loser.style.zIndex = 999;
    loser.style.fontWeight = "bold";
    loser.style.fontSize = "21px";
    terrain.appendChild(loser);
    loser.style.left = (terrain.offsetWidth / 2) - (loser.offsetWidth / 2) + 'px';
    loser.style.top = (terrain.offsetHeight / 2) - (loser.offsetHeight) + 'px';

    let reMultiBtn = document.createElement("button");
    let restartBtn = document.createElement("button");
    restartBtn.style.position = "absolute";
    restartBtn.innerText = "Solo"
    restartBtn.style.zIndex = 999;
    terrain.appendChild(restartBtn);
    restartBtn.style.left = (terrain.offsetWidth / 2) - (restartBtn.offsetWidth / 2) + 'px';
    restartBtn.style.top = (terrain.offsetHeight / 2) - (restartBtn.offsetHeight) + 60 + 'px';
    restartBtn.onclick = function() {
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
      tPseudo.remove();
      iPseudo.remove();
      tableScore.remove();
      that.div.remove();
      clearInterval(that.loop);
      if (joueur2 != undefined) {
        clearInterval(joueur2.loop);
        joueur2.div.remove();
        joueur2 = undefined;
      }
      pseudo = iPseudo.value;
      spawn(1);
      restartBtn.remove();
      reMultiBtn.remove();
    };

    reMultiBtn.style.position = "absolute";
    reMultiBtn.innerText = "Multijoueur"
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
      that.div.remove();
      clearInterval(that.loop);
      if (joueur2 != undefined) {
        joueur2.div.remove();
        joueur2 = undefined;
      }
      pseudo = iPseudo.value;
      spawn(2);
      tableScore.remove();
      tPseudo.remove();
      iPseudo.remove();
      restartBtn.remove();
      reMultiBtn.remove();
    };

    let tPseudo = document.createElement("p");
    tPseudo.style.position = "absolute";
    tPseudo.innerText = "Pseudo:";
    tPseudo.style.padding = "5px 10px 5px 10px";
    tPseudo.style.borderRadius= "5px";
    tPseudo.style.backgroundColor = 'white';
    tPseudo.style.zIndex = 999;
    tPseudo.style.fontWeight = "bold";
    tPseudo.style.fontSize = "16px";
    terrain.appendChild(tPseudo);
    tPseudo.style.left = (terrain.offsetWidth / 2) - (tPseudo.offsetWidth / 2) + 'px';
    tPseudo.style.top = (terrain.offsetHeight / 2) - (tPseudo.offsetHeight) - 90 + 'px';

    let iPseudo = document.createElement("input");
    iPseudo.setAttribute('type','text')
    iPseudo.style.position = "absolute";
    iPseudo.style.zIndex = 999;
    iPseudo.value = pseudo;
    terrain.appendChild(iPseudo);
    iPseudo.style.left = (terrain.offsetWidth / 2) - (iPseudo.offsetWidth / 2) + 'px';
    iPseudo.style.top = (terrain.offsetHeight / 2) - (iPseudo.offsetHeight) - 40 + 'px';

  }

  startAnim(code) {
      var getActualPos = this.div.style.backgroundPosition.split('px')[0];

      if (code == hautJ1) {
        if (getActualPos != '-280' && getActualPos != '-320') {
          this.div.style.backgroundPosition = '-280px 0px';
        } else if (getActualPos == '-280') {
          this.div.style.backgroundPosition = '-320px 0px';
        } else if (getActualPos == '-320') {
          this.div.style.backgroundPosition = '-280px 0px';
        }
      }
      if (code == basJ1) {
        if (getActualPos != '-40' && getActualPos != '-80') {
          this.div.style.backgroundPosition = '-40px 0px';
        } else if (getActualPos == '-40') {
          this.div.style.backgroundPosition = '-80px 0px';
        } else if (getActualPos == '-80') {
          this.div.style.backgroundPosition = '-40px 0px';
        }

      }
      if (code == droiteJ1) {
        if (getActualPos != '-120' && getActualPos != '-160') {
          this.div.style.backgroundPosition = '-120px 0px';
        } else if (getActualPos == '-120') {
          this.div.style.backgroundPosition = '-160px 0px';
        } else if (getActualPos == '-160') {
          this.div.style.backgroundPosition = '-120px 0px';
        }

      }
      if (code == gaucheJ1) {
        if (getActualPos != '-200' && getActualPos != '-240') {
          this.div.style.backgroundPosition = '-200px 0px';
        } else if (getActualPos == '-200') {
          this.div.style.backgroundPosition = '-240px 0px';
        } else if (getActualPos == '-240') {
          this.div.style.backgroundPosition = '-200px 0px';
        }
      }
  }

  verifCollision(objet,verifX, verifY, tableau) {
    if ((tableau.filter(e => verifX < e.div.offsetLeft + e.div.offsetWidth && verifX + objet.offsetWidth > e.div.offsetLeft && verifY < e.div.offsetTop + e.div.offsetHeight && objet.offsetHeight + verifY > e.div.offsetTop)).length > 0) {
         return true;
    }
    return false;
  }
  verifCollisionP(objet,verifX, verifY, pl) {
    if (verifX < pl.offsetLeft + pl.offsetWidth && verifX + objet.offsetWidth > pl.offsetLeft && verifY < pl.offsetTop + pl.offsetHeight && objet.offsetHeight + verifY > pl.offsetTop) {
         return true;
    }
    return false;
  }

}
