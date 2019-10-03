class c_mur {
  constructor(x, y, brk) {
    this.posX = x;
    this.posY = y;
    this.breakable = brk;
    this.div = '';
  }

  placeWall() {
    let newMur = document.createElement("div");
    newMur.style.width = "40px";
    newMur.style.height = "40px";
    newMur.style.left = this.posX + "px";
    newMur.style.top = this.posY + "px";
    newMur.style.position = "absolute";
    newMur.style.backgroundSize = "cover";
    newMur.style.zIndex = 900;
    if (this.breakable > 0) newMur.style.backgroundPosition = '0px 0px';
      else newMur.style.backgroundPosition = '-40px 0px';
    newMur.style.backgroundImage = "url('img/mur.png')";
    terrain.appendChild(newMur);
    this.div = newMur;
    murs.push(this);
  }
}
