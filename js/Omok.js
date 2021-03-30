import Player from './Player.js';
export default class Omok {
  
  plate;
  xSize = 15;
  ySize = 15;
  turn = 0;
  players = new Map();

  constructor(plate, xSize, ySize) {
    this.plate = plate;
    if((typeof xSize) == "number") this.xSize = xSize;
    if((typeof ySize) == "number") this.ySize = ySize;
    this.players.set("black", new Player("black", this.xSize, this.ySize));
    this.players.set("white", new Player("white", this.xSize, this.ySize));
    this.initUI();
  }
  
  getTurn() {
    return this.turn % 2 == 0? "black":"white";
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
          /* 하위요소에 돌이 있으면 동작 X */
          let childs = this.childNodes;
          if(childs.length > 0) return false;
          bindThis.putStone(this);
        }
        tr.appendChild(td);
      }
      (this.plate).appendChild(tr);
    }
  }
  
  putStone(element) {
    this.putDisplayStone(element);
    
    let player = this.players.get(this.getTurn());
    let x = element.getAttribute("data-x");
    let y = element.getAttribute("data-y");
    player.setStone(x,y);
    
    let status = player.status;

    let result = this.ruleCheck(status, x, y);
    if(result) {
      alert(this.getTurn() + " 승");
      return;
    }
    this.turn++;
  }

  putDisplayStone(element) {
    let stoneElement = document.createElement("div");
    stoneElement.setAttribute("class", this.getTurn());
    element.appendChild(stoneElement);
  }

  ruleCheck(status, x, y) {
    let cnt = 0;
    /* 가로 */
    cnt = 0;
    cnt += this.check(status, x, y, 1, 0);
    cnt += this.check(status, x, y, -1, 0);
    if(cnt >= 4) return true;
    /* 세로 */
    cnt = 0;
    cnt += this.check(status, x, y, 0, 1);
    cnt += this.check(status, x, y, 0, -1);
    if(cnt >= 4) return true;
    /* 오른쪽 대각선 */
    cnt = 0;
    cnt += this.check(status, x, y, 1, 1);
    cnt += this.check(status, x, y, -1, -1);
    if(cnt >= 4) return true;
    /* 왼쪽 대각선 */
    cnt = 0;
    cnt += this.check(status, x, y, 1, -1);
    cnt += this.check(status, x, y, -1, 1);
    if(cnt >= 4) return true;

    return false;
  }

  check(status, x, y, xIncrease, yIncrease) {
    let cnt = 0;
    while(true) {
      x = Number(x) + Number(xIncrease);
      y = Number(y) + Number(yIncrease);
      if( x < 0 || x >= this.xSize) break; // 판보다 작거나 커지면 break;
      if( y < 0 || y >= this.ySize) break; // 판보다 작거나 커지면 break;
      if(status[y][x] != 1) break; // 돌이 안놓여있을때 break;
      cnt ++;
    }
    return cnt;
  }

}