var nextMove = true;
 function setMove() {
   nextMove = false;
   setTimeout(function() {
    nextMove = true;
  }, 200);
}


document.addEventListener("keydown", event => {
  if (nextMove && start) {
    setMove();
    var newX = joueur.div.offsetLeft;
    var newY = joueur.div.offsetTop;
    startAnim(event.code);

    if (event.code == "ArrowUp") newY -= move_size;
    if (event.code == "ArrowDown") newY += move_size;
    if (event.code == "ArrowRight") newX += move_size;
    if (event.code == "ArrowLeft") newX -= move_size;

    if (!verifCollision(joueur.div,newX,newY,murs) && !verifCollision(joueur.div,newX,newY,bombe) && !verifCollision(joueur.div,newX,newY,ennemie)) {
      joueur.div.style.left = newX + 'px';
      joueur.div.style.top = newY + 'px';
    }
  }
}, false);

document.addEventListener("keyup", event => {
  if (event.code == "ArrowUp" || event.code == "ArrowDown" || event.code == "ArrowRight" || event.code == "ArrowLeft") joueur.div.style.backgroundPosition = '0px 0px';
}, false);
document.addEventListener("keypress", event => {
  if (event.code == "Space" && joueur.canBomb) new c_bomb(joueur);
}, false);

function startAnim(code) {
    var getActualPos = joueur.div.style.backgroundPosition.split('px')[0];

    if (code == "ArrowUp") {
      if (getActualPos != '-280' && getActualPos != '-320') {
        joueur.div.style.backgroundPosition = '-280px 0px';
      } else if (getActualPos == '-280') {
        joueur.div.style.backgroundPosition = '-320px 0px';
      } else if (getActualPos == '-320') {
        joueur.div.style.backgroundPosition = '-280px 0px';
      }
    }
    if (code == "ArrowDown") {
      if (getActualPos != '-40' && getActualPos != '-80') {
        joueur.div.style.backgroundPosition = '-40px 0px';
      } else if (getActualPos == '-40') {
        joueur.div.style.backgroundPosition = '-80px 0px';
      } else if (getActualPos == '-80') {
        joueur.div.style.backgroundPosition = '-40px 0px';
      }

    }
    if (code == "ArrowRight") {
      if (getActualPos != '-120' && getActualPos != '-160') {
        joueur.div.style.backgroundPosition = '-120px 0px';
      } else if (getActualPos == '-120') {
        joueur.div.style.backgroundPosition = '-160px 0px';
      } else if (getActualPos == '-160') {
        joueur.div.style.backgroundPosition = '-120px 0px';
      }

    }
    if (code == "ArrowLeft") {
      if (getActualPos != '-200' && getActualPos != '-240') {
        joueur.div.style.backgroundPosition = '-200px 0px';
      } else if (getActualPos == '-200') {
        joueur.div.style.backgroundPosition = '-240px 0px';
      } else if (getActualPos == '-240') {
        joueur.div.style.backgroundPosition = '-200px 0px';
      }
    }
}

function verifCollision(objet,verifX, verifY, tableau) {
  if ((tableau.filter(e => verifX < e.div.offsetLeft + e.div.offsetWidth && verifX + objet.offsetWidth > e.div.offsetLeft && verifY < e.div.offsetTop + e.div.offsetHeight && objet.offsetHeight + verifY > e.div.offsetTop)).length > 0) {
       return true;
  }
  return false;
}
