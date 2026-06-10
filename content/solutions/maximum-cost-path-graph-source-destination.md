# Find maximum cost path in a graph from a given source to a given destination

> Source: https://www.techiedelight.com/maximum-cost-path-graph-source-destination/

Given a weighted undirected graph, find the maximum cost path from a given source to any other vertex in the graph which is greater than a given cost. The path should not contain any cycles.

For example, consider the following graph,

Let `source = 0` and `cost = 50`.

The maximum cost route from source vertex 0 is `0—6—7—1—2—5—3—4`, having cost `51`, which is more than cost `50`. The solution should return `51`.

> 

The idea is to do a [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) traversal. BFS is generally used to find the shortest paths in graphs/matrices, but we can modify normal BFS to meet our requirements. By modifying BFS, we don’t mean using a [priority queue](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/) that picks up the maximum weighted edge at every step, as that approach will fail. A low-weight edge can also be involved in the maximum cost path as there might be higher weight edges connected through it.

So, how can we use BFS?

Usually, BFS doesn’t explore already discovered vertices again, but here we do the opposite. To cover all possible paths from a given source, remove this check from BFS. But if the graph contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/), removing this check will cause the program to go into an infinite loop. We can easily handle that if we maintain a list of nodes visited so far in the current path for a node in a queue. Basically, we maintain three things in the BFS queue node:

  * The current vertex number.
  * The cost of the current path chosen so far.
  * The set of nodes visited so far in the current path.

Whenever we encounter any node whose cost of a path is more, update the result. The BFS will terminate when we have explored every path that doesn’t result in a cycle.

This is demonstrated below in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // adjacency list: `adjList[v]` is a list of `[dest, weight]` pairs
    adjList: Map<number, [number, number][]> = new Map();

    // Graph Constructor
    constructor(edges: [number, number, number][], n: number) {
        // resize the list to `n` elements
        for (let i = 0; i < n; i++) {
            this.adjList.set(i, []);
        }

        // add edges to the undirected graph
        for (const [src, dest, weight] of edges) {
            this.adjList.get(src)!.push([dest, weight]);
            this.adjList.get(dest)!.push([src, weight]);
        }
    }
}

// Perform BFS on graph `graph` starting from vertex `v`
function findMaxCost(graph: Graph, src: number, k: number): number {

    // create a queue for doing BFS
    const q: [number, number, Set<number>][] = [];

    // add source vertex to set and enqueue it
    const vertices = new Set<number>([src]);

    // (current vertex, current path cost, set of nodes visited so far in
    // the current path)
    q.push([src, 0, vertices]);

    // stores maximum cost of a path from the source
    let maxcost = Number.NEGATIVE_INFINITY;

    // loop till queue is empty
    while (q.length > 0) {

        // dequeue front node
        const [v, cost, vertices] = q.shift()!;

        // if the destination is reached and BFS depth is equal to `m`,
        // update the minimum cost calculated so far
        if (cost > k) {
            maxcost = Math.max(maxcost, cost);
        }

        // do for every adjacent edge of `v`
        for (const [dest, weight] of graph.adjList.get(v)!) {

            // check for a cycle
            if (!vertices.has(dest)) {

                // add current node to the path
                const s = new Set(vertices);
                s.add(dest);

                // push every vertex (discovered or undiscovered) into
                // the queue with a cost equal to the
                // parent's cost plus the current edge's weight
                q.push([dest, cost + weight, s]);
            }
        }
    }

    // return max-cost
    return maxcost;
}

// List of graph edges as per the above diagram
const edges: [number, number, number][] = [
    [0, 6, 11], [0, 1, 5], [1, 6, 3], [1, 5, 5], [1, 2, 7], [2, 3, -8], [3, 4, 10],
    [5, 2, -1], [5, 3, 9], [5, 4, 1], [6, 5, 2], [7, 6, 9], [7, 1, 6]
];

// total number of nodes in the graph (labelled from 0 to 7)
const n = 8;

// build a graph from the given edges
const graph = new Graph(edges, n);

const src = 0;
const cost = 50;

// Start modified BFS traversal from source vertex `src`
const max_cost = findMaxCost(graph, src, cost);

if (max_cost !== Number.NEGATIVE_INFINITY) {
    console.log(max_cost);
} else {
    console.log(`All paths from source have their costs < ${cost}`);
}
```

**Output:** 51

The time complexity of the above solution is O(V.E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**Exercise:** Extend the solution to print the maximum cost path from source to destination.

Also See:

> [Least cost path in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/least-cost-path-digraph-source-destination-m-edges/ "Least cost path in a digraph from a given source to a destination having exactly `m` edges")

> [Compute the least cost path in a weighted digraph using BFS](https://www.techiedelight.com/least-cost-path-weighted-digraph-using-bfs/ "Compute the least cost path in a weighted digraph using BFS")

> [Total paths in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/total-paths-in-digraph-from-source-to-destination-m-edges/ "Total paths in a digraph from a given source to a destination having exactly `m` edges")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.57/5. Vote count: 283

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
