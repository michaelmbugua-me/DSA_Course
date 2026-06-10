# Kruskal’s Algorithm for finding Minimum Spanning Tree

> Source: https://www.techiedelight.com/kruskals-algorithm-for-finding-minimum-spanning-tree/

Given a connected and weighted undirected graph, construct a minimum spanning tree out of it using Kruskal’s Algorithm.

A **Minimum Spanning Tree** is a spanning tree of a connected, undirected graph. It connects all the vertices with minimal total weighting for its edges.

For example, consider the above graph. Its minimum spanning tree will be the following tree with exactly `n-1` edges where `n` is the total number of vertices in the graph, and the sum of weights of edges is as minimum as possible:

> 

**Prerequisite:**

> [Union–Find Algorithm for cycle detection in a graph](https://techiedelight.com/union-find-algorithm-cycle-detection-graph/)

We can use **Kruskal’s Minimum Spanning Tree** algorithm, a [greedy algorithm](https://techiedelight.com/greedy-algorithm-problems/) to find a minimum spanning tree for a connected weighted graph. Kruskal’s Algorithm works by finding a subset of the edges from the given graph covering every vertex present in the graph such that they form a tree (called MST), and the sum of weights of edges is as minimum as possible.

Let `G = (V, E)` be the given graph. Initially, our MST contains only vertices of the given graph with no edges. In other words, initially, MST has `V` [connected components](https://techiedelight.com/check-given-graph-strongly-connected-not/), with each vertex acting as one connected component. The goal is to add minimum weight edges to our MST such that we are left with a single connected component that comprises all the graph’s vertices. Following is the complete algorithm:

sort all edges in graph `G` in order of their increasing weights; repeat V-1 times // as MST contains `V-1` edges { select the next edge with minimum weight from graph `G`; if (no cycle is formed by adding the edge in MST, i.e., the edge connects two different connected components in MST) add the edge to MST; }

Let’s illustrate this by taking the example of the above graph. Initially, our MST consists of only the vertices of the given graph with no edges. We start by considering the smallest weighted edge `0–3` having weight `5`. As no cycle is formed, include it in our MST.

We next consider the smallest weighted edge `2–4` also having weight `5`. As no cycle is formed, include it in our MST.

We next consider the smallest weighted edge `3–5` having weight `6`. As no cycle is formed, include it in our MST.

We next consider the smallest weighted edge `0–1` having weight `7`. As no cycle is formed, include it in our MST.

We next consider the smallest weighted edge `1–4` also having weight `7`. As no cycle is formed, include it in our MST.

We next consider the smallest weighted edge 5–4 having weight `8`. But including this edge in MST will result in a cycle `0—1—4—5—3—0`, so we discard it.

We next consider the smallest weighted edge 1–2 also having weight `8`. But including this edge in MST will result in a cycle `1—2—4—1`, so we discard it.

We next consider the smallest weighted edge 3–1 also having weight `9`. But including this edge in MST will result in a cycle `0—1—3—0`, so we discard it.

Finally, consider the next smallest weighted edge, `4–6`, also weighting `9`. As no cycle is formed, include it in our MST.

MST is now connected (containing `V-1` edges). So, we discard all remaining edges.

Following is the pseudocode of Kruskal’s Algorithm as per [Wikipedia](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm). It uses a disjoint–set data structure.

KRUSKAL(graph G) MST = {} for each vertex `v` belonging G.V: MAKE-SET(v) for each (u, v) in G.E ordered by weight(u, v), increasing: if FIND-SET(u) != FIND-SET(v): add {(u, v)} to set MST UNION(u, v) return MST

Please note that if the graph is not connected, Kruskal’s Algorithm finds a **Minimum Spanning Forest** , a minimum spanning tree for each connected component of the graph.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a disjoint set
class DisjointSet {
    parent: Map<number, number> = new Map();

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
        return this.find(this.parent.get(k)!);
    }

    // Perform Union of two subsets
    union(a: number, b: number): void {
        // find the root of the sets in which elements `x` and `y` belongs
        const x = this.find(a);
        const y = this.find(b);

        this.parent.set(x, y);
    }
}

// Function to construct MST using Kruskal’s algorithm
function runKruskalAlgorithm(edges: [number, number, number][], n: number): [number, number, number][] {

    // stores the edges present in MST
    const MST: [number, number, number][] = [];

    // Initialize `DisjointSet` class.
    // Create a singleton set for each element of the universe.
    const ds = new DisjointSet();
    ds.makeSet(n);

    let index = 0;

    // sort edges by increasing weight
    edges.sort((a, b) => a[2] - b[2]);

    // MST contains exactly `V-1` edges
    while (MST.length !== n - 1) {

        // consider the next edge with minimum weight from the graph
        const [src, dest, weight] = edges[index];
        index = index + 1;

        // find the root of the sets to which two endpoints
        // vertices of the next edge belongs
        const x = ds.find(src);
        const y = ds.find(dest);

        // if both endpoints have different parents, they belong to
        // different connected components and can be included in MST
        if (x !== y) {
            MST.push([src, dest, weight]);
            ds.union(x, y);
        }
    }

    return MST;
}

// (u, v, w) triplet represent undirected edge from
// vertex `u` to vertex `v` having weight `w`
const edges: [number, number, number][] = [
    [0, 1, 7], [1, 2, 8], [0, 3, 5], [1, 3, 9], [1, 4, 7], [2, 4, 5],
    [3, 4, 15], [3, 5, 6], [4, 5, 8], [4, 6, 9], [5, 6, 11]
];

// total number of nodes in the graph (labelled from 0 to 6)
const n = 7;

// construct graph
const e = runKruskalAlgorithm(edges, n);

console.log(e);
```

**Output:** (2, 4, 5) (0, 3, 5) (3, 5, 6) (1, 4, 7) (0, 1, 7) (4, 6, 9)

The time complexity of the above solution is O(n2), where `n` is the total number of vertices in the graph. The time complexity can be improved to O(n.log(n)) by using the [optimized implementation of _Union_ and _Find_ operations](https://techiedelight.com/disjoint-set-data-structure-union-find-algorithm/).

**References:**

1\. <https://en.wikipedia.org/wiki/Kruskal%27s_algorithm>

2\. <http://lcm.csa.iisc.ernet.in/dsa/node184.html>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 279

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Hard](https://www.techiedelight.com/Tags/hard/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
