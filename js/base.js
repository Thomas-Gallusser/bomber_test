let move_size = 40; // Cases par déplacements

let nbrMurs = 90; // Le nombre de murs à spawn
let nbrMursActuel = 0;

let nbrEnnemies = 5; // Le nombre d'ennemies à spawn
let nbrEnnemiesActuel = 0;

let murs = [];
let bombe = [];
let ennemie = [];
let score = 1;
let pseudo = '';

let start = false;
let joueur1;
let joueur2;
let boom = new Audio('sound/boom.wav');
let audio = new Audio('sound/moonlight_monata.mp3');
let gameover = new Audio('sound/game_over.mp3');
let win = new Audio('sound/won.wav');
let hurt = new Audio('sound/hurt.ogg');

audio.loop = true;

function spawn(multi) {
  score = 0;
  audio.play();
  audio.volume = 0.1;
  gameover.volume = 0.1;
  win.volume = 0.1;

  start = true;

  // Je créer mon joueur
  joueur1 = new c_player1();
  if (multi == 2) joueur2 = new c_player2();

  // Génération terrain
  for (let i = 0; i < terrain.offsetWidth; i+=move_size) new c_mur(i,0, 0).placeWall(); //Mur du haut
  for (let i = 0; i < terrain.offsetWidth; i+=move_size) new c_mur(i,terrain.offsetHeight - move_size, 0).placeWall(); // Mur du bas
  for (let i = move_size; i < terrain.offsetHeight; i+=move_size) new c_mur(0, i, 0).placeWall(); // Mur de gauche
  for (let i = move_size; i < terrain.offsetHeight; i+=move_size) new c_mur(terrain.offsetHeight - move_size, i, 0).placeWall(); // Mur de DROITE

  while (nbrMursActuel < nbrMurs) {
    let posMiniX = 40, posMiniY = 80, posMaxX = 560, posMaxY = 520;

    let getX = (posMaxX / move_size) - (posMiniX / move_size);
    let getY = (posMaxY / move_size) - (posMiniY / move_size);

    let rndX = getRnd(getX) * move_size + posMiniX;
    let rndY = getRnd(getY) * move_size + posMiniY;

    if (!verifCollision(joueur1.div,rndX,rndY,murs)) {
      new c_mur(rndX, rndY, getRnd(4)).placeWall();
      nbrMursActuel++;
    }
  }

  if (multi == 1) {
    while (nbrEnnemiesActuel < nbrEnnemies) {
      let posMiniX = 40, posMiniY = 40, posMaxX = 560, posMaxY = 560;

      let getX = (posMaxX / move_size) - (posMiniX / move_size);
      let getY = (posMaxY / move_size) - (posMiniY / move_size);

      let rndX = getRnd(getX) * move_size + posMiniX;
      let rndY = getRnd(getY) * move_size + posMiniY;

      if (!verifCollision(joueur1.div,rndX,rndY,ennemie) && !verifCollision(joueur1.div,rndX,rndY,murs)) {
        new c_ennemie(rndX, rndY);
        nbrEnnemiesActuel++;
      }
    }
  }
}

function verifCollision(objet,verifX, verifY, tableau) {
  if ((tableau.filter(e => verifX < e.div.offsetLeft + e.div.offsetWidth && verifX + objet.offsetWidth > e.div.offsetLeft && verifY < e.div.offsetTop + e.div.offsetHeight && objet.offsetHeight + verifY > e.div.offsetTop)).length > 0) {
       return true;
  }
  return false;
}

function getRnd(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var hautJ1 = "ArrowUp";
var basJ1 = "ArrowDown";
var droiteJ1 = "ArrowRight";
var gaucheJ1 = "ArrowLeft";
var bombeJ1 = "Space";
var lastKeyJ1 = "";

var hautJ2 = "Numpad8";
var basJ2 = "Numpad2";
var droiteJ2 = "Numpad6";
var gaucheJ2 = "Numpad4";
var bombeJ2 = "Numpad0";
var lastKeyJ2 = "";

document.addEventListener("keydown", event => {
  if (start && (event.code == hautJ1 || event.code == basJ1 || event.code == droiteJ1 || event.code == gaucheJ1)) lastKeyJ1 = event.code;
  if (start && (event.code == hautJ2 || event.code == basJ2 || event.code == droiteJ2 || event.code == gaucheJ2)) lastKeyJ2 = event.code;
}, false);

document.addEventListener("keyup", event => {
  if (event.code == lastKeyJ1) {
    joueur1.div.style.backgroundPosition = '0px 0px';
    lastKeyJ1 = "";
  }
  if (event.code == lastKeyJ2) {
    joueur2.div.style.backgroundPosition = '0px 0px';
    lastKeyJ2 = '';
  }
}, false);

document.addEventListener("keypress", event => {
  if (event.code == bombeJ1 && joueur1.canBomb && joueur1.life > 0) new c_bomb(joueur1);
  if (event.code == bombeJ2 && joueur2.canBomb && joueur2.life > 0) new c_bomb(joueur2);
}, false);
