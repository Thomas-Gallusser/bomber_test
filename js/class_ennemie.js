class c_ennemie {
  constructor(spawnX, spawnY) {
    this.life = 3;

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
        switch (getRnd(4)) {
          case 0:
            that.move("ArrowUp");
            break;
          case 1:
            that.move("ArrowDown");
            break;
          case 2:
            that.move("ArrowRight");
            break;
          case 3:
            that.move("ArrowLeft");
            break;
        }
        that.boucle();
      },500);
  }

  getDamage() {
    this.life -= 1;
    if (this.life == 0) this.gameOver();
  }

  gameOver() {
    clearInterval(this.loop);
    this.div.remove();
  }


  move(code) {
    if (start) {
      var newX = this.div.offsetLeft;
      var newY = this.div.offsetTop;

      if (code == "ArrowUp") newY -= move_size;
      if (code == "ArrowDown") newY += move_size;
      if (code == "ArrowRight") newX += move_size;
      if (code == "ArrowLeft") newX -= move_size;

      if (!this.verifCollision(this.div,newX,newY,murs) && !this.verifCollision(this.div,newX,newY,bombe) && !this.verifCollision(this.div,newX,newY,ennemie) && !this.verifCollisionP(this.div,newX,newY,joueur.div)) {
        this.startAnim(code);
        this.div.style.left = newX + 'px';
        this.div.style.top = newY + 'px';
      } else {
        switch (getRnd(4)) {
          case 1:
            this.move("ArrowUp");
            break;
          case 2:
            this.move("ArrowDown");
            break;
          case 3:
            this.move("ArrowRight");
            break;
          case 4:
            this.move("ArrowLeft");
            break;
        }
      }
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
