export default class Omok {
  
  plate;
  xSize = 15;
  ySize = 15;
  turn = false;

  constructor(plate, xSize, ySize) {
    this.plate = plate;
    if((typeof xSize) == "number") this.xSize = xSize;
    if((typeof ySize) == "number") this.ySize = ySize;
    this.initUI();
  }
  
  initUI() {
    let bindThis = this;
    for(let i = 0; i < this.ySize; i++) {
      let tr = document.createElement("tr");
      for(let j = 0; j < this.xSize; j++) {
        let td = document.createElement("td");
        td.setAttribute("data-x", j);
        td.setAttribute("data-y", i);
        td.onclick = function() {
          bindThis.putStone(this);
        }
        tr.appendChild(td);
      }
      (this.plate).appendChild(tr);
    }
  }
  
  putStone(element) {
    showStone(element);

  }

  showStone(element) {
    let stoneElement = document.createElement("div");
    stoneElement.setAttribute("class", this.turn ? "white":"black");
    element.appendChild(stoneElement);
    this.turn = !this.turn;
  }

  ruleCheck() {
    
  }

}