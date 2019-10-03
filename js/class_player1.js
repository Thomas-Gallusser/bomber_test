class c_player1 {
  constructor() {
    this.life = 1;
    this.canBomb = true;
    this.nextMove = true;
    this.haut = "ArrowUp";
    this.bas = "ArrowDown";
    this.droite = "ArrowRight";
    this.gauche = "ArrowLeft";
    this.bombe = "Space";

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
    let lastKey = "";
    setInterval(function(){
      var newX = that.div.offsetLeft;
      var newY = that.div.offsetTop;
      that.startAnim(lastKey);

      if (lastKey == that.haut) newY -= move_size;
      if (lastKey == that.bas) newY += move_size;
      if (lastKey == that.droite) newX += move_size;
      if (lastKey == that.gauche) newX -= move_size;

      let j2 = false;
      if (joueur2 != undefined) j2 = that.verifCollisionP(that.div,newX,newY,joueur2.div);
      if (!that.verifCollision(that.div,newX,newY,murs) && !that.verifCollision(that.div,newX,newY,bombe) && !that.verifCollision(that.div,newX,newY,ennemie) && !j2) {
        that.div.style.left = newX + 'px';
        that.div.style.top = newY + 'px';
      }
    }, 200);

    document.addEventListener("keydown", event => { if (start && (event.code == that.haut || event.code == that.bas || event.code == that.droite || event.code == that.gauche)) lastKey = event.code; }, false);

    document.addEventListener("keyup", event => {
      if (event.code == lastKey) {
        this.div.style.backgroundPosition = '0px 0px';
        lastKey = '';
      }
    }, false);
    document.addEventListener("keypress", event => {
      if (event.code == that.bombe && this.canBomb) new c_bomb(this);
    }, false);
  }

  getDamage() {
    this.life -= 1;
    if (this.life == 0) this.gameOver();
  }

  gameOver() {
    audio.pause();
    hurt.cloneNode(true).play();

    start = false;
    this.div.style.display = 'none';
    if (joueur2 == null)  gameover.play(); else win.play();

    let loser = document.createElement("p");
    loser.style.position = "absolute";
    if (joueur2 == null) loser.innerText = "Perdu !"; else  loser.innerText = "Joueur 2 à gagner !";
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
      restartBtn.remove();
      reMultiBtn.remove();
      joueur1.div.remove();
      if (joueur2 != undefined) {
        joueur2.div.remove();
        joueur2 = undefined;
      }
      spawn(1);
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

  startAnim(code) {
      var getActualPos = this.div.style.backgroundPosition.split('px')[0];

      if (code == this.haut) {
        if (getActualPos != '-280' && getActualPos != '-320') {
          this.div.style.backgroundPosition = '-280px 0px';
        } else if (getActualPos == '-280') {
          this.div.style.backgroundPosition = '-320px 0px';
        } else if (getActualPos == '-320') {
          this.div.style.backgroundPosition = '-280px 0px';
        }
      }
      if (code == this.bas) {
        if (getActualPos != '-40' && getActualPos != '-80') {
          this.div.style.backgroundPosition = '-40px 0px';
        } else if (getActualPos == '-40') {
          this.div.style.backgroundPosition = '-80px 0px';
        } else if (getActualPos == '-80') {
          this.div.style.backgroundPosition = '-40px 0px';
        }

      }
      if (code == this.droite) {
        if (getActualPos != '-120' && getActualPos != '-160') {
          this.div.style.backgroundPosition = '-120px 0px';
        } else if (getActualPos == '-120') {
          this.div.style.backgroundPosition = '-160px 0px';
        } else if (getActualPos == '-160') {
          this.div.style.backgroundPosition = '-120px 0px';
        }

      }
      if (code == this.gauche) {
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
