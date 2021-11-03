import { WIDTH, HEIGHT, ROWS, COLS, TOTAL_MINES } from "./constants";

class GameNode {
  constructor(x, y, hasMine = false) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.hasMine = hasMine;
    this.neighborCount = 0;
  }
}

class GameState {
  constructor({ width, height, rows, cols, totalMines }) {
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.rowSize = width / rows;
    this.colSize = height / cols;
    this.totalMines = totalMines;
    this.minedNodes = [];
    this.grid = this.initGrid();
  }

  generateRandomCoords() {
    const x = Math.floor(Math.random() * this.rows);
    const y = Math.floor(Math.random() * this.cols);
    return [x, y];
  }

  initGrid() {
    this.grid = Array.from(Array(this.rows), () => Array(this.cols));

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        this.generateRandomCoords();
        this.grid[x][y] = new GameNode(x, y);
      }
    }

    for (let i = 0; i < this.totalMines; i++) {
      let [x, y] = this.generateRandomCoords();
      this.minedNodes.push({ x, y });
      this.grid[x][y].hasMine = true;
    }

    return this.grid;
  }

  getCellNeighbors(cell) {
    const neighbors = [];
    const top = cell.y - 1;
    const left = cell.x - 1;
    const right = cell.x + 1;
    const bottom = cell.y + 1;

    if (top >= 0) {
      const topCell = this.grid[cell.x][top];
      if (topCell && !topCell.visited) {
        neighbors.push(topCell);
      }
    }

    if (bottom < this.cols) {
      const bottomCell = this.grid[cell.x][bottom];
      if (bottomCell && !bottomCell.visited) {
        neighbors.push(bottomCell);
      }
    }

    if (left >= 0) {
      const leftCell = this.grid[left][cell.y];
      if (leftCell && !leftCell.visited) {
        neighbors.push(leftCell);
      }
    }

    if (right < this.rows) {
      const rightCell = this.grid[right][cell.y];
      if (rightCell && !rightCell.visited) {
        neighbors.push(rightCell);
      }
    }

    return neighbors;
  }

  getMineNeighborsCount(cell) {
    let neighbors = this.getCellNeighbors(cell);

    return neighbors.reduce((acc, curr) => {
      if (curr.hasMine) return (acc += 1);
      return acc;
    }, 0);
  }

  handleClick(x, y) {
    const node = this.grid[x][y];

    if (node.hasMine) {
      console.log("game over");
      for (let i = 0; i < this.minedNodes.length; i++) {
        const { x, y } = this.minedNodes[i];
        this.grid[x][y].visited = true;
      }
      return;
    }

    if (node.visited) {
      return;
    }

    const neighbors = this.getMineNeighborsCount(node);

    console.log("nei", neighbors);
    if (neighbors) {
      node.visited = true;
      node.neighborCount = neighbors;
      return;
    }

    const queue = [node];

    while (queue.length) {
      const cell = queue.shift();
      cell.visited = true;

      const neighbors = this.getCellNeighbors(cell);

      const filterVisitedAndMinedNeighbors = neighbors.filter(
        (neighboringNode) =>
          !neighboringNode.visited || !neighboringNode.hasMine
      );

      for (let i = 0; i < filterVisitedAndMinedNeighbors.length; i++) {
        const neighborNode = filterVisitedAndMinedNeighbors[i];
        const mineCount = this.getMineNeighborsCount(neighborNode);

        if (mineCount) {
          neighborNode.visited = true;
          neighborNode.neighborCount = mineCount;
        } else {
          queue.push(neighborNode);
        }
      }
    }
  }
}

export const gameState = new GameState({
  width: WIDTH,
  height: HEIGHT,
  rows: ROWS,
  cols: COLS,
  totalMines: TOTAL_MINES,
});
