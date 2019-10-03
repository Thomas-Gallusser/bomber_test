class c_player {
  constructor() {
    this.life = 1;
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
    audio.pause();

    start = false;
    this.div.style.display = 'none';
    gameover.cloneNode(true).play();

    let loser = document.createElement("p");
    loser.style.position = "absolute";
    loser.innerText = "Perdu !"
    loser.style.padding = "10px 15px 10px 15px";
    loser.style.borderRadius= "5px";
    loser.style.backgroundColor = 'white';
    loser.style.zIndex = 999;
    loser.style.fontWeight = "bold";
    loser.style.fontSize = "21px";
    terrain.appendChild(loser);
    loser.style.left = (terrain.offsetWidth / 2) - (loser.offsetWidth / 2) + 'px';
    loser.style.top = (terrain.offsetHeight / 2) - (loser.offsetHeight) + 'px';

    let restartBtn = document.createElement("button");
    restartBtn.style.position = "absolute";
    restartBtn.innerText = "Relancer la partie !"
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
      spawn();
      restartBtn.remove();
      this.div.remove();
    };


    // fin de partie
  }
}
