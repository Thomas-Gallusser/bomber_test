let terrain = document.createElement("div");
terrain.style.width = "600px";
terrain.style.height = "600px";
terrain.style.position = "relative";
terrain.style.margin = "0 auto";
terrain.style.backgroundRepeat = "repeat";
terrain.style.backgroundSize = "10% 10%";
terrain.style.backgroundImage = "url('img/ground.svg')";
document.body.appendChild(terrain);

let startBtn = document.createElement("button");
startBtn.style.position = "absolute";
startBtn.innerText = "Solo";
terrain.appendChild(startBtn);
startBtn.style.left = (terrain.offsetWidth / 2) - (startBtn.offsetWidth / 2) + 'px';
startBtn.style.top = (terrain.offsetHeight / 2) - (startBtn.offsetHeight) + 'px';
startBtn.onclick = function() {
  pseudo = iPseudo.value;
  spawn(1);
  tableScore.remove();
  tPseudo.remove();
  iPseudo.remove();
  startBtn.remove();
  multiBtn.remove();
};
let multiBtn = document.createElement("button");
multiBtn.style.position = "absolute";
multiBtn.innerText = "Multijoueur";
terrain.appendChild(multiBtn);
multiBtn.style.left = (terrain.offsetWidth / 2) - (multiBtn.offsetWidth / 2) + 'px';
multiBtn.style.top = (terrain.offsetHeight / 2) - (multiBtn.offsetHeight) + 40 + 'px';
multiBtn.onclick = function() {
  pseudo = iPseudo.value;
  spawn(2);
  tableScore.remove();
  tPseudo.remove();
  iPseudo.remove();
  startBtn.remove();
  multiBtn.remove();
};


let tableScore = document.createElement("table");
var xhr = new XMLHttpRequest();
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
iPseudo.value = "";
terrain.appendChild(iPseudo);
iPseudo.style.left = (terrain.offsetWidth / 2) - (iPseudo.offsetWidth / 2) + 'px';
iPseudo.style.top = (terrain.offsetHeight / 2) - (iPseudo.offsetHeight) - 40 + 'px';
