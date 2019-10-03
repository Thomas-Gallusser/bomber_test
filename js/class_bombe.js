//audio.cloneNode(true).play()

class c_bomb {
  constructor(poseur) {
    this.poseur = poseur;
    this.x = poseur.div.offsetLeft
    this.y = poseur.div.offsetTop;
    this.div = "";
    this.placeBomb();
  }

  placeBomb() {
    this.poseur.canBomb = false;
    let newBomb = document.createElement("div");
    newBomb.style.width = "40px";
    newBomb.style.height = "40px";
    newBomb.style.left = this.x + "px";
    newBomb.style.top = this.y + "px";
    newBomb.style.position = "absolute";
    newBomb.style.backgroundSize = "cover";
    newBomb.style.backgroundPosition = '0px 0px';
    newBomb.style.backgroundImage = "url('img/bomb.png')";
    newBomb.style.zIndex = 800;
    terrain.appendChild(newBomb);
    bombe.push(this);
    this.div = newBomb;

    var that = this;
    setTimeout(function() {
      newBomb.style.backgroundPosition = "0px -40px";
      setTimeout(function() {
        newBomb.style.backgroundPosition = "0px -80px";
        setTimeout(function() {
          that.poseur.canBomb = true;
          let bm = boom.cloneNode(true);
          bm.volume = 0.4;
          bm.play();
          that.breakAll();

          newBomb.style.width = "120px";
          newBomb.style.height = "120px";
          newBomb.style.left = (that.x- move_size) + "px";
          newBomb.style.top = (that.y - move_size) + "px";
          newBomb.style.backgroundPosition = "0px 0px";
          newBomb.style.backgroundImage = "url('img/explo.png')";
          setTimeout(function() {
            newBomb.remove();
            bombe = bombe.filter(e => e.offsetParent != null);
           }, 200);
        }, 700);
      }, 700);
    }, 700);
  }

  breakAll() {
    let allWall = [];
    allWall.push(this.verifCollisionAll(joueur1.div, this.x+move_size, this.y, murs));
    allWall.push(this.verifCollisionAll(joueur1.div, this.x-move_size, this.y, murs));
    allWall.push(this.verifCollisionAll(joueur1.div, this.x, this.y+move_size, murs));
    allWall.push(this.verifCollisionAll(joueur1.div, this.x, this.y-move_size, murs));
    allWall = allWall.filter(e => e.length > 0 && e[0].breakable > 0);
    allWall.forEach(function(element) {
      element[0].div.remove();
    });

    if (this.verifPlayer()) joueur1.getDamage();
    if (joueur2 != undefined) if (this.verifPlayer2()) joueur2.getDamage();
    this.verifEnemy().forEach(function(element) { element.getDamage(); });
  }

  verifCollisionAll(objet,verifX, verifY, tableau) {
    let mursRetour = tableau.filter(e => verifX < e.div.offsetLeft + e.div.offsetWidth && verifX + objet.offsetWidth > e.div.offsetLeft && verifY < e.div.offsetTop + e.div.offsetHeight && objet.offsetHeight + verifY > e.div.offsetTop);

    return mursRetour;
  }

  verifPlayer() {
    if ((joueur1.div.offsetLeft + move_size == this.div.offsetLeft && joueur1.div.offsetTop == this.div.offsetTop) ||
        (joueur1.div.offsetLeft - move_size == this.div.offsetLeft && joueur1.div.offsetTop == this.div.offsetTop) ||
        (joueur1.div.offsetLeft == this.div.offsetLeft && joueur1.div.offsetTo + move_size == this.div.offsetTop) ||
        (joueur1.div.offsetLeft == this.div.offsetLeft && joueur1.div.offsetTop - move_size == this.div.offsetTop) ||
        (joueur1.div.offsetLeft == this.div.offsetLeft && joueur1.div.offsetTop == this.div.offsetTop))
          return true;
    else
          return false;
  }

  verifPlayer2() {
      if ((joueur2.div.offsetLeft + move_size == this.div.offsetLeft && joueur2.div.offsetTop == this.div.offsetTop) ||
          (joueur2.div.offsetLeft - move_size == this.div.offsetLeft && joueur2.div.offsetTop == this.div.offsetTop) ||
          (joueur2.div.offsetLeft == this.div.offsetLeft && joueur2.div.offsetTo + move_size == this.div.offsetTop) ||
          (joueur2.div.offsetLeft == this.div.offsetLeft && joueur2.div.offsetTop - move_size == this.div.offsetTop) ||
          (joueur2.div.offsetLeft == this.div.offsetLeft && joueur2.div.offsetTop == this.div.offsetTop))
            return true;
      else
            return false;
  }

  verifEnemy() {
    return ennemie.filter(e => (e.div.offsetLeft + move_size == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop) ||
        (e.div.offsetLeft - move_size == this.div.offsetLeft && this.div.offsetTop == this.div.offsetTop) ||
        (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTo + move_size == this.div.offsetTop) ||
        (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop - move_size == this.div.offsetTop) ||
        (e.div.offsetLeft == this.div.offsetLeft && e.div.offsetTop == this.div.offsetTop));
  }
}
