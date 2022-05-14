import { mapData, Weights } from '../interfaces';
import { availableTiles, getHexHash, HexHashToOffset } from './drawGridHelpers';
import { Graph, Vertex } from './graph';
import { getNeighbors } from './hexHelper';
import { hexDistance, offsetToCube } from './hexLogic';

export function mapToGraph(map: mapData, weights: Weights) {
  // create new Graph
  const graph = new Graph();
  // store all airports
  const airports: string[] = [];
  // add all necessary tiles from map to Graph
  addVerteces(map, graph, airports);
  // add all existing edges between verteces
  addAllEdges(graph, map, weights, airports);
  return graph;
}

function addVerteces(map: mapData, graph: Graph, airports: string[]) {
  // loop over all map entries
  Object.entries(map).forEach(([key, value]) => {
    // get current tile
    const tile = availableTiles[+value];
    // if rails and street in same tile we need to create two verteces for each transportation
    if (tile.category === 'railsAndStreet') {
      graph.addVertex(
        'R:' + key,
        'rails',
        tile.railConnections,
        undefined,
        tile.airport,
        tile.shipping,
        key
      );
      graph.addVertex(
        'S:' + key,
        'street',
        undefined,
        tile.streetConnections,
        tile.airport,
        tile.shipping,
        key
      );
    } else if (tile.shipping || tile.category !== 'nature') {
      graph.addVertex(
        `${tile.category[0].toLocaleUpperCase()}:` + key,
        tile.category,
        tile.railConnections,
        tile.streetConnections,
        tile.airport,
        tile.shipping,
        key
      );
      if (tile.airport) airports.push(`C:${key}`);
    }
  });
}

function addAllEdges(
  graph: Graph,
  map: mapData,
  weights: Weights,
  airports: string[]
) {
  // loop over all verteces of the graph
  graph.getVerteces().forEach((vertex, key) => {
    // get existing neighbors for each vertex
    const neighbors = checkNeighbors(vertex, map, graph);
    // add neighbors as edge in graph
    neighbors.forEach((neighbor) => {
      graph.addEdge(
        key,
        neighbor.hash,
        weights[neighbor.type as keyof typeof weights],
        neighbor.type
      );
    });

    // connect airports
    if (vertex.airport) {
      airports.forEach((airport) => {
        // calculate distance between airports to calculate weight
        const distance = hexDistance(vertexToCube(key), vertexToCube(airport));
        if (!(key === airport))
          graph.addEdge(key, airport, weights.flight * distance, 'flight');
      });
    }
  });
}

function checkNeighbors(vertex: Vertex, map: mapData, graph: Graph) {
  //
  const connectedNeighbors: { hash: string; type: string }[] = [];
  const offsetHex = HexHashToOffset(vertex.hash);
  const neighbors = getNeighbors(offsetHex);

  neighbors.forEach((neighbor, index) => {
    const hash = getHexHash(neighbor);
    const tileNum = map[hash];
    if (!tileNum) return;

    const neighborTile = availableTiles[+tileNum];
    if (neighborTile.category === 'railsAndStreet') {
      const railTile = graph.getVertex('R:' + hash);
      const streetTile = graph.getVertex('S:' + hash);
      if (!railTile) return;
      const railConnection = checkStreetOrRailConnection(
        'rail',
        vertex,
        index,
        railTile
      );
      if (railConnection) {
        connectedNeighbors.push({ hash: 'R:' + hash, type: 'rail' });
        return;
      }
      if (!streetTile) return;
      const streetConnection = checkStreetOrRailConnection(
        'street',
        vertex,
        index,
        railTile
      );
      if (streetConnection) {
        connectedNeighbors.push({ hash: 'S:' + hash, type: 'street' });
        return;
      }
      return;
    }
    const updatedTile = graph.getVertex(
      neighborTile.category[0].toLocaleUpperCase() + ':' + hash
    );
    if (!updatedTile) return;
    const streetConnection = checkStreetOrRailConnection(
      'street',
      vertex,
      index,
      updatedTile
    );
    if (streetConnection) {
      connectedNeighbors.push({
        hash: neighborTile.category[0].toLocaleUpperCase() + ':' + hash,
        type: 'street',
      });
      return;
    }
    const railConnection = checkStreetOrRailConnection(
      'rail',
      vertex,
      index,
      updatedTile
    );
    if (railConnection) {
      connectedNeighbors.push({
        hash: neighborTile.category[0].toLocaleUpperCase() + ':' + hash,
        type: 'rail',
      });
      return;
    }
    const shippingConnection = checkShippingConnection(vertex, updatedTile);
    if (shippingConnection) {
      connectedNeighbors.push({
        hash: neighborTile.category[0].toLocaleUpperCase() + ':' + hash,
        type: 'shipping',
      });
      return;
    }
  });
  return connectedNeighbors;
}

function checkStreetOrRailConnection(
  type: 'rail' | 'street',
  tile: Vertex,
  neighborDirection: number,
  neighbor: Vertex
) {
  const tileConnections =
    type === 'street' ? tile.streetConnections : tile.railConnections;
  const neighborConnections =
    type === 'street' ? neighbor.streetConnections : neighbor.railConnections;

  if (tileConnections && neighborConnections) {
    if (tileConnections.includes(neighborDirection)) {
      return neighborConnections.some(
        (direction) => Math.abs(neighborDirection - direction) === 3
      );
    }
  }

  return false;
}

function checkShippingConnection(tile: Vertex, neighbor: Vertex) {
  if (tile.category === 'nature' && tile.shipping && neighbor.shipping) {
    return true;
  }

  if (
    tile.shipping &&
    tile.category !== 'nature' &&
    neighbor.shipping &&
    neighbor.category === 'nature'
  ) {
    return true;
  }

  return false;
}

function vertexToCube(vertex: string) {
  return offsetToCube(HexHashToOffset(vertex.slice(2)));
}
