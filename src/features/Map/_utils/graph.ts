export interface Vertex {
  edges: Edge[];
  category: string;
  railConnections: undefined | number[];
  streetConnections: undefined | number[];
  airport: boolean;
  shipping: boolean;
  hash: string;
}

export interface Edge {
  value: string;
  weight: number;
  distance: number;
  type: string;
}

export class Graph {
  public verteces;

  constructor() {
    this.verteces = new Map<string, Vertex>();
  }

  getVerteces() {
    return this.verteces;
  }

  getVertex(value: string) {
    return this.verteces.get(value);
  }

  addVertex(
    value: string,
    category: string,
    railConnections: undefined | number[],
    streetConnections: undefined | number[],
    airport: boolean,
    shipping: boolean,
    hash: string
  ) {
    this.verteces.set(value, {
      category,
      edges: [],
      railConnections,
      streetConnections,
      airport,
      shipping,
      hash,
    });
  }

  addEdge(
    value1: string,
    value2: string,
    weight = 1,
    type: string,
    distance = 1
  ): void {
    const vertex1 = this.getVertex(value1);
    const vertex2 = this.getVertex(value2);
    if (!vertex1 || !vertex2) return;

    if (!vertex1.edges.some((e) => e.value === value2)) {
      vertex1.edges.push({ value: value2, weight, type, distance });
      vertex2.edges.push({ value: value1, weight, type, distance });
    }
  }
}
