# Single-Source Shortest Paths – Dijkstra’s Algorithm

> Source: https://www.techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/

Given a source vertex `s` from a set of vertices `V` in a weighted digraph where all its edge weights `w(u, v)` are non-negative, find the shortest path weights `d(s, v)` from source `s` for all vertices `v` present in the graph.

For example,

Vertex Minimum Cost Route A —> B 4 A —> E —> B A —> C 6 A —> E —> B —> C A —> D 5 A —> E —> D A —> E 3 A —> E

> 

We know that the [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) can be used to find the shortest path in an unweighted graph or even in a weighted graph having the same cost of all its edges. But if edges in the graph are weighted with different costs, then BFS generalizes to _uniform-cost search_. Instead of expanding nodes to their depth from the root, uniform-cost search expands the nodes in order of their cost from the root. A variant of this algorithm is known as Dijkstra’s algorithm.

Dijkstra’s Algorithm is an algorithm for finding the shortest paths between nodes in a graph. For a given source node in the graph, the algorithm finds the shortest path between that node and every other node. It can also be used for finding the shortest paths from a single node to a single destination node by stopping the algorithm once the fastest route to the destination node has been determined.

Dijkstra’s Algorithm is based on the principle of relaxation, in which more accurate values gradually replace an approximation to the correct distance until the shortest distance is reached. The approximate distance to each vertex is always an overestimate of the true distance and is replaced by the minimum of its old value with the length of a newly found path. It uses a [priority queue](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/) to greedily select the closest vertex that has not yet been processed and performs this relaxation process on all of its outgoing edges.

Following is pseudocode for Dijkstra’s Algorithm as per [Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm).

function Dijkstra(Graph, source) dist[source] = 0 // Initialization create vertex set Q for each vertex v in Graph { if v != source { dist[v] = INFINITY // Unknown distance from source to v prev[v] = UNDEFINED // Predecessor of v } Q.add_with_priority(v, dist[v]) } while Q is not empty { u = Q.extract_min() // Remove minimum for each neighbor v of u that is still in Q { alt = dist[u] + length(u, v) if alt < dist[v] { dist[v] = alt prev[v] = u Q.decrease_priority(v, alt) } } } return dist[], prev[]

For instance, consider the following graph. We will start with vertex `A`, So vertex `A` has a distance 0, and the remaining vertices have an undefined (infinite) distance from the source. Let `S` be the set of vertices whose shortest path distances from the source are already calculated.

Initially, `S` contains the source vertex. `S = {A}`.

We start from source vertex `A` and start relaxing `A's` neighbors. Since vertex `B` can be reached from a direct edge from vertex `A`, update its distance to `10` (weight of edge `A–B`). Similarly, we can reach vertex `E` through a direct edge from `A`, so we update its distance from `INFINITY` to `3`.

After processing all outgoing edges of `A`, we next consider a vertex having minimum distance. `B` has a distance of `10`, `E` has distance `3`, and all remaining vertices have distance `INFINITY`. So, we choose `E` and push it into set `S`. Now our set becomes `S = {A, E}`. Next, we relax with `E's` neighbors. `E` has 2 neighbors `B` and `C`. We have already found one route to vertex `B` through vertex `A` having cost `10`. But if we visit a vertex `B` through vertex `E`, we are getting an even cheaper route, i.e., (cost of edge `A–E` \+ cost of edge `E–B`) = `3 + 1 = 4 < 10` (cost of edge `A–B`).

We repeat the process till we have processed all the vertices, i.e., Set `S` becomes full.

The algorithm can be implemented as follows in TypeScript:

```ts
// min-heap assumed (JS has no builtin heap)
class MinHeap {
    data: { vertex: number; weight: number }[] = [];

    push(node: { vertex: number; weight: number }): void {
        this.data.push(node);
        let i = this.data.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.data[parent].weight <= this.data[i].weight) break;
            [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
            i = parent;
        }
    }

    pop(): { vertex: number; weight: number } {
        const top = this.data[0];
        const last = this.data.pop()!;
        if (this.data.length > 0) {
            this.data[0] = last;
            let i = 0;
            for (;;) {
                const left = 2 * i + 1, right = left + 1;
                let smallest = i;
                if (left < this.data.length && this.data[left].weight < this.data[smallest].weight) smallest = left;
                if (right < this.data.length && this.data[right].weight < this.data[smallest].weight) smallest = right;
                if (smallest === i) break;
                [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                i = smallest;
            }
        }
        return top;
    }

    get size(): number {
        return this.data.length;
    }
}

class Graph {
    // adjacency list of (dest, weight) pairs
    adjList: [number, number][][];

    constructor(edges: [number, number, number][], n: number) {
        // allocate memory for the adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the directed graph
        for (const [source, dest, weight] of edges) {
            this.adjList[source].push([dest, weight]);
        }
    }
}

function getRoute(prev: number[], i: number, route: number[]): void {
    if (i >= 0) {
        getRoute(prev, prev[i], route);
        route.push(i);
    }
}

// Run Dijkstra’s algorithm on a given graph
function findShortestPaths(graph: Graph, source: number, n: number): void {

    // create a min-heap and push source node having distance 0
    const pq = new MinHeap();
    pq.push({ vertex: source, weight: 0 });

    // set initial distance from the source to `v` as infinity
    const dist: number[] = new Array(n).fill(Number.MAX_SAFE_INTEGER);

    // distance from the source to itself is zero
    dist[source] = 0;

    // list to track vertices for which minimum cost is already found
    const done: boolean[] = new Array(n).fill(false);
    done[source] = true;

    // stores predecessor of a vertex (to a print path)
    const prev: number[] = new Array(n).fill(-1);

    // run till min-heap is empty
    while (pq.size > 0) {
        const node = pq.pop();      // Remove and return the best vertex
        const u = node.vertex;      // get the vertex number

        // do for each neighbor `v` of `u`
        for (const [v, weight] of graph.adjList[u]) {
            if (!done[v] && (dist[u] + weight) < dist[v]) {     // Relaxation step
                dist[v] = dist[u] + weight;
                prev[v] = u;
                pq.push({ vertex: v, weight: dist[v] });
            }
        }

        // mark vertex `u` as done so it will not get picked up again
        done[u] = true;
    }

    const route: number[] = [];
    for (let i = 0; i < n; i++) {
        if (i !== source && dist[i] !== Number.MAX_SAFE_INTEGER) {
            getRoute(prev, i, route);
            console.log(`Path (${source} —> ${i}): Minimum cost = ${dist[i]}, Route = [${route.join(', ')}]`);
            route.length = 0;
        }
    }
}

// initialize edges as per the above diagram
// (u, v, w) represent edge from vertex `u` to vertex `v` having weight `w`
const edges: [number, number, number][] = [
    [0, 1, 10], [0, 4, 3], [1, 2, 2], [1, 4, 4], [2, 3, 9], [3, 2, 7],
    [4, 1, 1], [4, 2, 8], [4, 3, 2]
];

// total number of nodes in the graph (labelled from 0 to 4)
const n = 5;

// construct graph
const graph = new Graph(edges, n);

// run the Dijkstra’s algorithm from every node
for (let source = 0; source < n; source++) {
    findShortestPaths(graph, source, n);
}
```

**Output:** Path (0 —> 1): Minimum cost = 4, Route = [0, 4, 1] Path (0 —> 2): Minimum cost = 6, Route = [0, 4, 1, 2] Path (0 —> 3): Minimum cost = 5, Route = [0, 4, 3] Path (0 —> 4): Minimum cost = 3, Route = [0, 4] Path (1 —> 2): Minimum cost = 2, Route = [1, 2] Path (1 —> 3): Minimum cost = 6, Route = [1, 4, 3] Path (1 —> 4): Minimum cost = 4, Route = [1, 4] Path (2 —> 3): Minimum cost = 9, Route = [2, 3] Path (3 —> 2): Minimum cost = 7, Route = [3, 2] Path (4 —> 1): Minimum cost = 1, Route = [4, 1] Path (4 —> 2): Minimum cost = 3, Route = [4, 1, 2] Path (4 —> 3): Minimum cost = 2, Route = [4, 3]

Dijkstra’s algorithm runs in O(E.log(V)) time like Prim’s algorithm. Here, `E` is the total number of edges, and `V` is the graph’s number of vertices.

**References:**

1\. <https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm>

2\. [http://www.cse.unt.edu/~tarau/teaching/AnAlgo/Dijkstra’s%20algorithm.pdf](http://www.cse.unt.edu/~tarau/teaching/AnAlgo/Dijkstra's%20algorithm.pdf)

Also See:

> [Single-Source Shortest Paths – Bellman–Ford Algorithm](https://www.techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/ "Single-Source Shortest Paths – Bellman–Ford Algorithm")

> [All-Pairs Shortest Paths – Floyd Warshall Algorithm](https://www.techiedelight.com/pairs-shortest-paths-floyd-warshall-algorithm/ "All-Pairs Shortest Paths – Floyd Warshall Algorithm")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.58/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Medium](https://www.techiedelight.com/Tags/medium/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
