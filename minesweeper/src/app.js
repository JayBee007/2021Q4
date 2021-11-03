import { WIDTH, HEIGHT, ROWS, COLS } from "./constants";
import { gameState } from "./gameState";

const CANVAS = document.getElementById("canvas");
const CANVAS_CTX = CANVAS.getContext("2d");

CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;

class Board {
  constructor(ctx, { width, height, rows, cols, gameState }) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.rowSize = width / rows;
    this.colSize = height / cols;
    this.gameState = gameState;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.lineWidth = 0.5;
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const node = this.gameState.grid[x][y];

        const { visited, neighborCount, hasMine } = node;
        if (!visited) {
          this.ctx.beginPath();
          this.ctx.strokeRect(
            this.rowSize * x,
            this.colSize * y,
            this.rowSize,
            this.colSize
          );
          this.ctx.fillStyle = "#c2c2c2";
          this.ctx.fillRect(
            this.rowSize * x,
            this.colSize * y,
            this.rowSize,
            this.colSize
          );

          this.ctx.closePath();
        }

        if (visited && neighborCount !== 0) {
          this.ctx.beginPath();
          this.ctx.fillStyle = "#443322";
          this.ctx.font = "normal 12px sans-serif";
          this.ctx.fillText(
            neighborCount,
            this.rowSize * x + 5,
            this.colSize * y + 15,
            20
          );
          this.ctx.closePath();
        }

        if (visited) {
          this.ctx.beginPath();
          this.ctx.strokeRect(
            this.rowSize * x,
            this.colSize * y,
            this.rowSize,
            this.colSize
          );
          this.ctx.fillStyle = "transparent";
          this.ctx.fillRect(
            this.rowSize * x,
            this.colSize * y,
            this.rowSize,
            this.colSize
          );
          this.ctx.closePath();

          if (hasMine) {
            this.ctx.beginPath();

            this.ctx.fillStyle = "#222222";
            this.ctx.arc(
              this.rowSize * x + 10,
              this.colSize * y + 10,
              5,
              0,
              2 * Math.PI
            );
            this.ctx.stroke();
          }
        }
      }
    }
  }
}

const BOARD_OPTIONS = {
  width: WIDTH,
  height: HEIGHT,
  rows: ROWS,
  cols: COLS,
  gameState,
};
const board = new Board(CANVAS_CTX, BOARD_OPTIONS);

CANVAS.addEventListener("click", (event) => {
  const x = Math.floor((event.clientX - 8) / 20);
  const y = Math.floor((event.clientY - 8) / 20);

  gameState.handleClick(x, y);
  board.draw();
});
