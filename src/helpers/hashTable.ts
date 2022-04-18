interface GridPos {
  row: number;
  col: number;
}

export class GridHashTable {
  private size: number;
  private values: {
    [key: string]: number;
  };
  constructor() {
    this.size = 0;
    this.values = {};
  }

  hash(gridPos: GridPos) {
    return '' + gridPos.row + gridPos.col;
  }

  add(gridPos: GridPos, value: number) {
    const id = this.hash(gridPos);
    if (!Object.prototype.hasOwnProperty.call(this.values, id)) {
      this.values[id] = value;
      this.size++;
    } else {
      this.values[id] = value;
    }
  }

  get(gridPos: GridPos) {
    const id = this.hash(gridPos);
    const value = this.values[id];
    if (value) return value;
    return undefined;
  }

  remove(gridPos: GridPos) {
    const id = this.hash(gridPos);
    if (Object.prototype.hasOwnProperty.call(this.values, id)) {
      delete this.values[id];
      this.size--;
    }
  }

  getValues() {
    return this.values;
  }

  getSize() {
    return this.size;
  }
}
