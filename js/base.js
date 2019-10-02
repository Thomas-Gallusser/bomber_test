let move_size = 40;
let nbrMurs = 90;

let murs = [];
let bombe = [];
let ennemie = [];

let start = false;
let joueur;
let audio;
let gameover;

function spawn() {
  audio = new Audio('sound/boom.wav');
  gameover = new Audio('sound/game_over.mp3');
  startBtn.remove();
  start = true;
  // Je créer mon terrain
  terrain.style.width = "600px";
  terrain.style.height = "600px";
  terrain.style.position = "relative";
  terrain.style.backgroundRepeat = "repeat";
  terrain.style.backgroundSize = "10% 10%";
  terrain.style.overflow = "hidden";
  terrain.style.backgroundImage = "url('img/ground.svg')";

  // Je créer mon joueur
  joueur = new c_player();

  // Je créer mes ennemies
  new c_ennemie('40','520');
  new c_ennemie('520','520');
  new c_ennemie('520','40');

  // Génération terrain
  for (let i = 0; i < terrain.offsetWidth; i+=move_size) new c_mur(i,0, 0).placeWall(); //Mur du haut
  for (let i = 0; i < terrain.offsetWidth; i+=move_size) new c_mur(i,terrain.offsetHeight - move_size, 0).placeWall(); // Mur du bas
  for (let i = move_size; i < terrain.offsetHeight; i+=move_size) new c_mur(0, i, 0).placeWall(); // Mur de gauche
  for (let i = move_size; i < terrain.offsetHeight; i+=move_size) new c_mur(terrain.offsetHeight - move_size, i, 0).placeWall(); // Mur de DROITE

  nbrMurs += murs.length;
  while (murs.length  < nbrMurs) {
    let posMiniX = 40, posMiniY = 80, posMaxX = 560, posMaxY = 520;

    let getX = (posMaxX / move_size) - (posMiniX / move_size);
    let getY = (posMaxY / move_size) - (posMiniY / move_size);

    let rndX = getRnd(getX) * move_size + posMiniX;
    let rndY = getRnd(getY) * move_size + posMiniY;

    if (!verifCollision(joueur.div,rndX,rndY,murs)) new c_mur(rndX, rndY, getRnd(2)).placeWall();
  }
}

function getRnd(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
