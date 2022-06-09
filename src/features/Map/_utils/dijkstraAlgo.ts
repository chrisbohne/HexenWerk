import { Graph } from './graph';

export function dijkstra(graph: Graph, startVertex: string, endVertex: string) {
  // for keeping track of distance for each vertex to startVertex
  const durations: {
    [key: string]: number;
  } = {};
  durations[endVertex] = Infinity;

  const distances: {
    [key: string]: number;
  } = {};
  distances[endVertex] = Infinity;

  // track paths
  const parents: {
    [key: string]: {
      parent: string | undefined;
      type: string;
      weight: number;
      distance: number;
    };
  } = {
    endVertex: {
      parent: undefined,
      type: 'destination',
      weight: 0,
      distance: 0,
    },
  };

  // add children of startVertex to distances and tracking
  graph.getVertex(startVertex)?.edges.forEach((child) => {
    parents[child.value] = {
      parent: startVertex,
      type: child.type,
      weight: child.weight,
      distance: child.distance,
    };
    durations[child.value] = child.weight;
    distances[child.value] = child.distance;
  });

  const visited: string[] = [];
  let vertex = cheapestVertex(durations, visited);

  while (vertex) {
    const duration = durations[vertex];
    const distance = distances[vertex];
    const detail = graph.getVertex(vertex);

    detail?.edges?.forEach((child) => {
      if (child.value !== startVertex) {
        const newDuration = duration + child.weight;
        const newDistance = distance + child.distance;
        if (!durations[child.value] || durations[child.value] > newDuration) {
          durations[child.value] = newDuration;
          distances[child.value] = newDistance;
          parents[child.value] = {
            parent: vertex,
            type: child.type,
            weight: child.weight,
            distance: child.distance,
          };
        }
      }
    });

    visited.push(vertex);
    vertex = cheapestVertex(durations, visited);
  }

  const shortestPath = [
    { tile: endVertex, type: 'destination', weight: 0, distance: 0 },
  ];
  let parent = parents[endVertex];
  while (parent) {
    shortestPath.push({
      tile: parent.parent || '',
      type: parent.type,
      weight: parent.weight,
      distance: parent.distance,
    });
    parent = parents[parent.parent || ''];
  }
  shortestPath.reverse();

  const results = {
    duration: durations[endVertex],
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
