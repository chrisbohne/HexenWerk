import { Graph } from './graph';

export function dijkstra(graph: Graph, startVertex: string, endVertex: string) {
  // for keeping track of distance for each vertex to startVertex
  const distances: {
    [key: string]: number;
  } = {};
  distances[endVertex] = Infinity;

  // track paths
  const parents: {
    [key: string]: { parent: string | undefined; type: string };
  } = { endVertex: { parent: undefined, type: 'destination' } };

  // add children of startVertex to distances and tracking
  graph.getVertex(startVertex)?.edges.forEach((child) => {
    parents[child.value] = { parent: startVertex, type: 'start' };
    distances[child.value] = child.weight;
  });

  const visited: string[] = [];
  let vertex = cheapestVertex(distances, visited);

  while (vertex) {
    const distance = distances[vertex];
    const detail = graph.getVertex(vertex);

    detail?.edges?.forEach((child) => {
      if (child.value !== startVertex) {
        const newDistance = distance + child.weight;
        if (!distances[child.value] || distances[child.value] > newDistance) {
          distances[child.value] = newDistance;
          if (detail.category === 'city')
            parents[child.value] = { parent: vertex, type: 'city' };
          else parents[child.value] = { parent: vertex, type: child.type };
        }
      }
    });

    visited.push(vertex);
    vertex = cheapestVertex(distances, visited);
  }

  const shortestPath = [{ tile: endVertex, type: 'destination' }];
  let parent = parents[endVertex];
  while (parent) {
    shortestPath.push({ tile: parent.parent || '', type: parent.type });
    parent = parents[parent.parent || ''];
  }
  shortestPath.reverse();

  const results = {
    distance: distances[endVertex],
    path: shortestPath,
  };

  return results;
}

function cheapestVertex(
  distances: {
    [key: string]: number;
  },
  visited: string[]
) {
  let shortest = '';

  for (const vertex in distances) {
    const isCheapest = !shortest || distances[vertex] < distances[shortest];
    if (isCheapest && !visited.includes(vertex)) {
      shortest = vertex;
    }
  }

  return shortest;
}
