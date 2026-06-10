# Total paths in a digraph from a given source to a destination having exactly `m` edges

> Source: https://www.techiedelight.com/total-paths-in-digraph-from-source-to-destination-m-edges/

Given a digraph (directed graph), find the total number of routes to reach the destination from a given source with exactly `m` edges.

For example, consider the following graph:

Let source = 0, destination = 3, number of edges m = 4. The graph has 3 routes from source 0 to destination 3 with 4 edges. The solution should return the total number of routes 3.

0 —> 1 —> 5 —> 2 —> 3 0 —> 1 —> 6 —> 5 —> 3 0 —> 6 —> 5 —> 2 —> 3

> 

The idea is to do a [BFS traversal](https://techiedelight.com/breadth-first-search/) from the given source vertex. BFS is generally used to find the shortest paths in graphs/matrices, but we can modify normal BFS to meet our requirements. Usually, BFS doesn’t explore already discovered vertices again, but here we do the opposite. To cover all possible paths from source to destination, remove this check from BFS. But if the graph contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/), removing this check will cause the program to go into an infinite loop. We can easily handle that if we don’t consider nodes having a BFS depth of more than `m`. Basically, we maintain two things in the BFS queue node:

  * The current vertex number.
  * The current depth of BFS (i.e., how far away from the current node is from the source?).

So, whenever the destination vertex is reached and BFS depth is equal to `m`, we update the result. The BFS will terminate when we have explored every path in the given graph or BFS depth exceeds `m`. Following is a TypeScript implementation based on the above idea:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    constructor(edges: [number, number][], n: number) {
        // A list of lists to represent an adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
        }
    }
}

// Perform BFS on graph `graph` starting from vertex `v`
function findTotalPaths(graph: Graph, src: number, dest: number, m: number): number {
    // create a queue for doing BFS
    const q: [number, number][] = [];

    // enqueue current vertex and the current depth of BFS
    // (how far away the current node is from the source)
    q.push([src, 0]);

    // stores number of paths from source to destination having exactly `m` edges
    let count = 0;

    // loop till queue is empty
    while (q.length > 0) {
        if (q.length === 0) {
            break;
        }

        // dequeue front node
        const [vertex, depth] = q[0];
        q.shift();

        // if the destination is reached and BFS depth is equal to `m`, update count
        if (vertex === dest && depth === m) {
            count++;
        }

        // don't consider nodes having a BFS depth more than `m`.
        // This check will result in optimized code and handle cycles
        // in the graph (otherwise, the loop will never break)
        if (depth > m) {
            break;
        }

        // do for every adjacent vertex `u` of `v`
        for (const u of graph.adjList[vertex]) {
            // enqueue every vertex (discovered or undiscovered)
            q.push([u, depth + 1]);
        }
    }

    // return number of paths from source to destination
    return count;
}

// List of graph edges as per the above diagram
const edges: [number, number][] = [
    [0, 6], [0, 1], [1, 6], [1, 5], [1, 2], [2, 3], [3, 4],
    [5, 2], [5, 3], [5, 4], [6, 5], [7, 6], [7, 1]
];

// total number of nodes in the graph
const n = 8;

// construct graph
const graph = new Graph(edges, n);

const src = 0, dest = 3;
const m = 4;

// Do modified BFS traversal from the source vertex src
console.log(findTotalPaths(graph, src, dest, m));
```

The time complexity of the above solution is O(V.E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Also See:

> [Least cost path in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/least-cost-path-digraph-source-destination-m-edges/ "Least cost path in a digraph from a given source to a destination having exactly `m` edges")

> [Find maximum cost path in a graph from a given source to a given destination](https://www.techiedelight.com/maximum-cost-path-graph-source-destination/ "Find maximum cost path in a graph from a given source to a given destination")

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 183

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
