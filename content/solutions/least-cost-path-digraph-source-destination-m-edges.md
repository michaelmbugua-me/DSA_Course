# Least cost path in a digraph from a given source to a destination having exactly `m` edges

> Source: https://www.techiedelight.com/least-cost-path-digraph-source-destination-m-edges/

Given a weighted digraph (directed graph), find the least-cost path from a given source to a given destination with exactly `m` edges.

For example, consider the following graph,

Let source = 0, destination = 3, number of edges (m) = 4. The graph has 3 routes from source 0 to destination 3 with 4 edges. 0—1—5—2—3 having cost 17 0—1—6—5—3 having cost 19 0—6—5—2—3 having cost 8 The solution should return the least-cost, i.e., 8.

> 

Whenever we see the term _shortest_ , the first thing we should think about is doing a [BFS traversal](https://techiedelight.com/breadth-first-search/). So, here also, we start BFS traversal from the given source vertex. Usually, BFS doesn’t explore already discovered vertices again, but here we do the opposite. To cover all possible paths from source to destination, remove this check from BFS. But what if the graph contains a cycle? Removing this check will cause the program to go into an infinite loop. We can easily handle that if we don’t consider nodes having a BFS depth of more than `m`.

The solution below maintains the following information in a BFS queue node:

  * The current vertex number.
  * The current depth of BFS (i.e., how far the current node is from the source?).
  * The cost of the current path chosen so far.

Whenever we encounter any node whose cost of a path is more and required BFS depth is reached, update the result. The BFS will terminate when we have explored every path in the given graph or BFS depth exceeds `m`.

Following is a TypeScript implementation of the idea:

```ts
// A class to represent a graph object
class Graph {
  adjList: [number, number][][];

  // Graph Constructor
  constructor(edges: number[][], n: number) {
    // create `n` empty lists
    this.adjList = Array.from({ length: n }, () => []);

    // add edges to the directed graph
    for (const [src, dest, weight] of edges) {
      this.adjList[src].push([dest, weight]);
    }
  }
}

// Perform BFS on graph `g` starting from vertex `v`
function findLeastCost(g: Graph, src: number, dest: number, m: number): number {
  // create a queue for doing BFS
  const q: number[][] = [];

  // enqueue source vertex
  q.push([src, 0, 0]);

  // stores least-cost from source to destination
  let minCost = Number.MAX_VALUE;

  // loop till queue is empty
  while (q.length > 0) {
    // dequeue front node
    const [v, depth, cost] = q.shift()!;

    // if the destination is reached and BFS depth is equal to `m`,
    // update the minimum cost calculated so far
    if (v === dest && depth === m) {
      minCost = Math.min(minCost, cost);
    }

    // don't consider nodes having a BFS depth more than `m`.
    // This check will result in optimized code and handle cycles
    // in the graph (otherwise, the loop will never break)
    if (depth > m) {
      break;
    }

    // do for every adjacent edge of `v`
    for (const [des, weight] of g.adjList[v]) {
      // push every vertex (discovered or undiscovered) into
      // the queue with depth as +1 of parent and cost equal
      // to the cost of parent plus the current edge weight
      q.push([des, depth + 1, cost + weight]);
    }
  }

  // return least-cost
  return minCost;
}

// List of graph edges as per the above diagram
const edges = [
  [0, 6, -1], [0, 1, 5], [1, 6, 3], [1, 5, 5], [1, 2, 7], [2, 3, 8], [3, 4, 10],
  [5, 2, -1], [5, 3, 9], [5, 4, 1], [6, 5, 2], [7, 6, 9], [7, 1, 6]
];

// total number of nodes in the graph (labelled from 0 to 7)
const n = 8;

// build a graph from the given edges
const g = new Graph(edges, n);

const src = 0, dest = 3, m = 4;

// Perform modified BFS traversal from source vertex `src`
console.log(findLeastCost(g, src, dest, m));
```

**Output:** 8

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**Exercise:** Extend the solution to print the least-cost path.

Also See:

> [Find maximum cost path in a graph from a given source to a given destination](https://www.techiedelight.com/maximum-cost-path-graph-source-destination/ "Find maximum cost path in a graph from a given source to a given destination")

> [Total paths in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/total-paths-in-digraph-from-source-to-destination-m-edges/ "Total paths in a digraph from a given source to a destination having exactly `m` edges")

> [Compute the least cost path in a weighted digraph using BFS](https://www.techiedelight.com/least-cost-path-weighted-digraph-using-bfs/ "Compute the least cost path in a weighted digraph using BFS")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 162

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
