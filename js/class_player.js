class c_player {
  constructor() {
    this.life = 3;
    this.canBomb = true;

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
    joueur = divJoueur;
    this.div = divJoueur;
  }

  getDamage() {
    this.life -= 1;
    if (this.life == 0) this.gameOver();
  }

  gameOver() {
    start = false;
    this.div.style.display = 'none';
    gameover.cloneNode(true).play();

    let loser = document.createElement("p");
    loser.style.position = "absolute";
    loser.innerText = "Loser !"
    terrain.appendChild(loser);
    loser.style.left = (terrain.offsetWidth / 2) - (loser.offsetWidth / 2) + 'px';
    loser.style.top = (terrain.offsetHeight / 2) - (loser.offsetHeight) + 'px';

    // fin de partie
  }
}
