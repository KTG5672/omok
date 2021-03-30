export default class Player {
  status = [];
  color = "";
  xSize = 15;
  ySize = 15;
  
  constructor(color ,xSize, ySize) {
    this.color = color;
    if((typeof xSize) == "number") this.xSize = xSize;
    if((typeof ySize) == "number") this.ySize = ySize;
    this.resetPlate();
  }

  /* 상황 초기화 */
  resetPlate() {
    this.status = Array(this.ySize).fill(0).map(x => Array(this.xSize).fill(0));
  }
  /* 판에 돌 놓기 */
  setStone(x, y) {
    this.status[y][x] = 1;
  }
  /* 현재상황 get */
  get status() {
    return this.status;
  }
  /* 색깔 get */
  get color() {
    return this.color;
  }
}
