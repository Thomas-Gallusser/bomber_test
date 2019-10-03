let terrain = document.createElement("div");
terrain.style.width = "600px";
terrain.style.height = "600px";
terrain.style.position = "relative";
terrain.style.backgroundRepeat = "repeat";
terrain.style.backgroundSize = "10% 10%";
terrain.style.backgroundImage = "url('img/ground.svg')";
document.body.appendChild(terrain);

let startBtn = document.createElement("button");
startBtn.style.position = "absolute";
startBtn.innerText = "Lancer la partie !"
terrain.appendChild(startBtn);
startBtn.style.left = (terrain.offsetWidth / 2) - (startBtn.offsetWidth / 2) + 'px';
startBtn.style.top = (terrain.offsetHeight / 2) - (startBtn.offsetHeight) + 'px';
startBtn.onclick = function() {
  spawn();
  startBtn.remove();
};
