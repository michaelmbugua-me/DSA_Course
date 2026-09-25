# Union–Find Algorithm for cycle detection in a graph

> Source: https://www.techiedelight.com/union-find-algorithm-cycle-detection-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected connected graph, check if it contains any cycle or not using the union–find algorithm.

For example, the following graph contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/) `8—9—11—12—8`.

[](https://commons.wikimedia.org/wiki/File%3ADepth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY-SA 3.0 \(https://creativecommons.org/licenses/by-sa/3.0/\)\], via Wikimedia Commons")

> 

**Prerequisite:**

> [Disjoint–Set Data Structure (Union–Find Algorithm)](https://techiedelight.com/disjoint-set-data-structure-union-find-algorithm/)

We strongly recommend going through the above post to get an understanding of how the union–find algorithm works. You can also watch the first 10 mins of [this](https://www.youtube.com/watch?v=UBY4sF86KEY) video to get a clear picture.

Complete Algorithm:

1\. Create disjoint sets for each vertex of the graph. 2\. For every edge u, v in the graph i) Find the root of the sets to which elements u and v belongs. ii) If both u and v have the same root in disjoint sets, a cycle is found.

Following is a TypeScript implementation of the above algorithm:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    constructor(edges: [number, number][], n: number) {
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the undirected graph (add each edge once only to avoid
        // detecting cycles among the same edges, say x -> y and y -> x)
        for (const [src, dest] of edges) {
            this.adjList[src].push(dest);
        }
    }
}

// A class to represent a disjoint set
class DisjointSet {
    private parent = new Map<number, number>();

    // perform MakeSet operation
    makeSet(n: number): void {
        // create `n` disjoint sets (one for each vertex)
        for (let i = 0; i < n; i++) {
            this.parent.set(i, i);
        }
    }

    // Find the root of the set in which element `k` belongs
    find(k: number): number {
        // if `k` is root
        if (this.parent.get(k) === k) {
            return k;
        }

        // recur for the parent until we find the root
        return this.find(this.parent.get(k));
    }

    // Perform Union of two subsets
    union(a: number, b: number): void {
        // find the root of the sets in which elements `x` and `y` belongs
        const x = this.find(a);
        const y = this.find(b);

        this.parent.set(x, y);
    }
}

// Returns true if the graph has a cycle
function findCycle(graph: Graph, n: number): boolean {
    // initialize `DisjointSet` class
    const ds = new DisjointSet();

    // create a singleton set for each element of the universe
    ds.makeSet(n);

    // consider every edge (u, v)
    for (let u = 0; u < n; u++) {
        // Recur for all adjacent vertices
        for (const v of graph.adjList[u]) {
            // find the root of the sets to which elements `u` and `v` belongs
            const x = ds.find(u);
            const y = ds.find(v);

            // if both `u` and `v` have the same parent, the cycle is found
            if (x === y) {
                return true;
            } else {
                ds.union(x, y);
            }
        }
    }

    return false;
}

// List of graph edges
const edges: [number, number][] = [
    [0, 1], [0, 6], [0, 7], [1, 2], [1, 5], [2, 3],
    [2, 4], [7, 8], [7, 11], [8, 9], [8, 10], [10, 11]
    // edge (10, 11) introduces a cycle in the graph
];

// total number of nodes in the graph (labelled from 0 to 11)
const n = 12;

// construct graph
const graph = new Graph(edges, n);

if (findCycle(graph, n)) {
    console.log('Cycle Found');
} else {
    console.log('No Cycle is Found');
}
```

The time complexity of the Union and Find operation is O(n) in the worst case, where `n` is the total number of vertices in the graph. Please refer to the implementation of Find and Union discussed in the [original post](https://techiedelight.com/disjoint-set-data-structure-union-find-algorithm/) for improving the overall time complexity of the algorithm.

**Also see:**

> [Check if an undirected graph contains a cycle or not](https://techiedelight.com/check-undirected-graph-contains-cycle-not/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 216

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
