# Compute the least cost path in a weighted digraph using BFS

> Source: https://www.techiedelight.com/least-cost-path-weighted-digraph-using-bfs/

Consider a directed graph where the weight of its edges can be one of `x`, `2x`, or `3x` (`x` is a positive integer), efficiently compute the least-cost path from source to destination.

For example, consider the following graph:

If the source is `1` and destination is `3`, the least-cost path from source to destination is `[1, 4, 3]` having cost `2`.

If the source is `0` and destination is `2`, the least-cost path from source to destination is `[0, 4, 2]` having cost `3`.

> 

We know that [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) can be used to find the shortest path in an unweighted graph or a weighted graph having the same cost of all its edges. BFS runs in O(E + V) time, where `E` is the total number of the edges and `V` is the total number of vertices in the graph. But if the edges in the graph are weighted with different costs, then the recommended algorithm is [Dijkstra’s Algorithm](https://techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/), which takes O(E.log(V)) time.

Can we use BFS?

The idea is to modify the input graph so that all its edges have the same weight. For edges having weight `3x`, split them into three edges of weight `x` each. Similarly, edges having weight `2x` gets split into two edges of weight `x` each. Nothing needs to be done for edges already having weight `x`. Special care has to be taken while introducing new edges in the graph such that no new routes are introduced into the graph. To split an edge of weight `3x`, create two new vertices in the graph instead of using existing vertices. Similarly, to split edge having weight `2x`, create one new vertex. Let’s illustrate this with the help of a diagram.

Split edge (v, u) having weight `3x` into three edges `(v, v+n)`, `(v+n, v+2N)`, and `(v+2N, u)` each having weight `x`.

Split edge (v, u) having weight `2x` into two edges `(v, v+n)` and `(v+n, u)` each having weight `x`.

Following is a TypeScript implementation of the idea:

```ts
// A class to represent a graph object
class Graph {
  adjList: number[][];

  // Constructor
  constructor(edges: number[][], x: number, n: number) {
    this.adjList = Array.from({ length: 3 * n }, () => []);

    // add edges to the directed graph
    for (const [v, u, weight] of edges) {
      // Create two new vertices, `v+n` and `v+2×n`, if the edge's weight is `3x`.
      // Also, split edge (v, u) into (v, v+n), (v+n, v+2N) and (v+2N, u),
      // each having weight `x`.
      if (weight === 3 * x) {
        this.adjList[v].push(v + n);
        this.adjList[v + n].push(v + 2 * n);
        this.adjList[v + 2 * n].push(u);
      }

      // create one new vertex `v+n` if the weight of the edge is `2x`.
      // Also, split edge (v, u) into (v, v+n), (v+n, u) each having weight `x`
      else if (weight === 2 * x) {
        this.adjList[v].push(v + n);
        this.adjList[v + n].push(u);
      }

      // no splitting is needed if the edge weight is `1x`
      else {
        this.adjList[v].push(u);
      }
    }
  }
}

// Recursive function to print the path of a given vertex `v` from the source vertex
function printPath(predecessor: number[], v: number, cost: number, n: number): number {
  if (v >= 0) {
    cost = printPath(predecessor, predecessor[v], cost, n);
    cost = cost + 1;

    // only consider the original nodes present in the graph
    if (v < n) {
      process.stdout.write(`${v} `);
    }
  }

  return cost;
}

// Perform BFS on the graph starting from vertex source
function findLeastPathCost(graph: Graph, source: number, dest: number, n: number): void {
  // stores vertex is discovered in BFS traversal or not
  const discovered: boolean[] = Array(3 * n).fill(false);

  // mark the source vertex as discovered
  discovered[source] = true;

  // `predecessor` stores predecessor information. It is used to trace
  // the least-cost path from the destination back to the source.
  const predecessor: number[] = Array(3 * n).fill(-1);

  // create a queue for doing BFS and enqueue source vertex
  const q: number[] = [];
  q.push(source);

  // loop till queue is empty
  while (q.length > 0) {
    // dequeue front node and print it
    const curr = q.shift()!;

    // if destination vertex is reached
    if (curr === dest) {
      process.stdout.write(`The least-cost path between ${source} and ${dest} is `);
      console.log('having cost', printPath(predecessor, dest, -1, n));
    }

    // do for every adjacent edge of the current vertex
    for (const v of graph.adjList[curr]) {
      if (!discovered[v]) {
        // mark it as discovered and enqueue it
        discovered[v] = true;
        q.push(v);

        // set `curr` as the predecessor of vertex `v`
        predecessor[v] = curr;
      }
    }
  }
}

const x = 1;

// List of graph edges as per the above diagram
const edges = [
  [0, 1, 3 * x], [0, 4, 1 * x], [1, 2, 1 * x], [1, 3, 3 * x],
  [1, 4, 1 * x], [4, 2, 2 * x], [4, 3, 1 * x]
];

// total number of nodes in the graph
const n = 5;

// given the source and destination vertex
const source = 0, dest = 2;

// build a graph from the given edges
const graph = new Graph(edges, x, n);

// Perform BFS traversal from the given source
findLeastPathCost(graph, source, dest, n);
```

**Output:** The least-cost path between 0 and 2 is 0 4 2 having cost 3

Also See:

> [Least cost path in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/least-cost-path-digraph-source-destination-m-edges/ "Least cost path in a digraph from a given source to a destination having exactly `m` edges")

> [Find maximum cost path in a graph from a given source to a given destination](https://www.techiedelight.com/maximum-cost-path-graph-source-destination/ "Find maximum cost path in a graph from a given source to a given destination")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.35/5. Vote count: 81

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
