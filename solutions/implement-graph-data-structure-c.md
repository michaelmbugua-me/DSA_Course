# Implement Graph Data Structure in C

> Source: https://www.techiedelight.com/implement-graph-data-structure-c/

This post will cover [graph data structure](https://techiedelight.com/terminology-and-representations-of-graphs/) implementation in TypeScript using an adjacency list. The post will cover both weighted and unweighted implementation of directed and undirected graphs.

In the graph’s adjacency list representation, each vertex in the graph is associated with the collection of its neighboring vertices or edges, i.e., every vertex stores a list of adjacent vertices.

For example, for the above graph, below is its adjacency list pictorial representation:

## 1\. Directed Graph Implementation

Following is the TypeScript implementation of a directed graph using an adjacency list:

```ts
// Data structure to store adjacency list nodes of the graph
class Node {
    dest: number;
    next: Node | null = null;
    constructor(dest: number, next: Node | null = null) {
        this.dest = dest;
        this.next = next;
    }
}

// Data structure to store a graph edge
class Edge {
    src: number;
    dest: number;
    constructor(src: number, dest: number) {
        this.src = src;
        this.dest = dest;
    }
}

// A class to represent a graph object
class Graph {
    // An array of pointers to Node to represent an adjacency list
    head: (Node | null)[];

    // Function to create an adjacency list from specified edges
    constructor(edges: Edge[], n: number) {
        // initialize head pointer for all vertices
        this.head = new Array(n).fill(null);

        // add edges to the directed graph one by one
        for (const edge of edges) {
            // get the source and destination vertex
            const src = edge.src;
            const dest = edge.dest;

            // allocate a new node of adjacency list from src to dest
            const newNode = new Node(dest);

            // point new node to the current head
            newNode.next = this.head[src];

            // point head pointer to the new node
            this.head[src] = newNode;
        }
    }
}

// Function to print adjacency list representation of a graph
function printGraph(graph: Graph, n: number): void {
    for (let i = 0; i < n; i++) {
        // print current vertex and all its neighbors
        let ptr = graph.head[i];
        while (ptr !== null) {
            process.stdout.write(`(${i} —> ${ptr.dest})\t`);
            ptr = ptr.next;
        }

        console.log();
    }
}

(function main() {
    // input array containing edges of the graph (as per the above diagram)
    // (x, y) pair in the array represents an edge from x to y
    const edges = [
        new Edge(0, 1), new Edge(1, 2), new Edge(2, 0), new Edge(2, 1),
        new Edge(3, 2), new Edge(4, 5), new Edge(5, 4)
    ];

    // calculate the total number of edges
    const n = edges.length;

    // construct a graph from the given edges
    const graph = new Graph(edges, n);

    // Function to print adjacency list representation of a graph
    printGraph(graph, n);
})();
```

**Output:** (0 —> 1) (1 —> 2) (2 —> 1) (2 —> 0) (3 —> 2) (4 —> 5) (5 —> 4)

As evident from the above code, in a directed graph, we only create an edge from `src` to `dest` in the adjacency list. Now, if the graph is undirected, we also need to create an edge from `dest` to `src` in the adjacency list, as shown below:

```ts
// Data structure to store adjacency list nodes of the graph
class Node {
    dest: number;
    next: Node | null = null;
    constructor(dest: number, next: Node | null = null) {
        this.dest = dest;
        this.next = next;
    }
}

// Data structure to store a graph edge
class Edge {
    src: number;
    dest: number;
    constructor(src: number, dest: number) {
        this.src = src;
        this.dest = dest;
    }
}

// A class to represent a graph object
class Graph {
    // An array of pointers to Node to represent an adjacency list
    head: (Node | null)[];

    // Function to create an adjacency list from specified edges
    constructor(edges: Edge[], n: number) {
        // initialize head pointer for all vertices
        this.head = new Array(n).fill(null);

        // add edges to the undirected graph one by one
        for (const edge of edges) {
            // get the source and destination vertex
            const src = edge.src;
            const dest = edge.dest;

            // 1. allocate a new node of adjacency list from src to dest

            let newNode = new Node(dest);

            // point new node to the current head
            newNode.next = this.head[src];

            // point head pointer to the new node
            this.head[src] = newNode;

            // 2. allocate a new node of adjacency list from `dest` to `src`

            newNode = new Node(src);

            // point new node to the current head
            newNode.next = this.head[dest];

            // change head pointer to point to the new node
            this.head[dest] = newNode;
        }
    }
}

// Function to print adjacency list representation of a graph
function printGraph(graph: Graph, n: number): void {
    for (let i = 0; i < n; i++) {
        // print current vertex and all its neighbors
        let ptr = graph.head[i];
        while (ptr !== null) {
            process.stdout.write(`(${i} —> ${ptr.dest})\t`);
            ptr = ptr.next;
        }

        console.log();
    }
}

(function main() {
    // input array containing edges of the graph (as per the above diagram)
    // (x, y) pair in the array represents an edge from x to y
    const edges = [
        new Edge(0, 1), new Edge(1, 2), new Edge(2, 0), new Edge(2, 1),
        new Edge(3, 2), new Edge(4, 5), new Edge(5, 4)
    ];

    // calculate the total number of edges
    const n = edges.length;

    // construct a graph from the given edges
    const graph = new Graph(edges, n);

    // Function to print adjacency list representation of a graph
    printGraph(graph, n);
})();
```

**Output:** (0 —> 2) (0 —> 1) (1 —> 2) (1 —> 2) (1 —> 0) (2 —> 3) (2 —> 1) (2 —> 0) (2 —> 1) (3 —> 2) (4 —> 5) (4 —> 5) (5 —> 4) (5 —> 4)

## 2\. Weighted Directed Graph Implementation

In a weighted graph, each edge will have weight (or cost) associated with it, as shown below:

Following is the implementation of a weighted directed graph in TypeScript using the adjacency list. The implementation is similar to that of an unweighted directed graph, except we are also storing weight info along with every edge.

```ts
// Data structure to store adjacency list nodes of the graph
class Node {
    dest: number;
    weight: number;
    next: Node | null = null;
    constructor(dest: number, weight: number, next: Node | null = null) {
        this.dest = dest;
        this.weight = weight;
        this.next = next;
    }
}

// Data structure to store a graph edge
class Edge {
    src: number;
    dest: number;
    weight: number;
    constructor(src: number, dest: number, weight: number) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }
}

// A class to represent a graph object
class Graph {
    // An array of pointers to Node to represent an adjacency list
    head: (Node | null)[];

    // Function to create an adjacency list from specified edges
    constructor(edges: Edge[], n: number) {
        // initialize head pointer for all vertices
        this.head = new Array(n).fill(null);

        // add edges to the directed graph one by one
        for (const edge of edges) {
            // get the source and destination vertex
            const src = edge.src;
            const dest = edge.dest;
            const weight = edge.weight;

            // allocate a new node of adjacency list from src to dest
            const newNode = new Node(dest, weight);

            // point new node to the current head
            newNode.next = this.head[src];

            // point head pointer to the new node
            this.head[src] = newNode;
        }
    }
}

// Function to print adjacency list representation of a graph
function printGraph(graph: Graph, n: number): void {
    for (let i = 0; i < n; i++) {
        // print current vertex and all its neighbors
        let ptr = graph.head[i];
        while (ptr !== null) {
            process.stdout.write(`${i} —> ${ptr.dest} (${ptr.weight})\t`);
            ptr = ptr.next;
        }

        console.log();
    }
}

(function main() {
    // input array containing edges of the graph (as per the above diagram)
    // (x, y, w) tuple represents an edge from x to y having weight `w`
    const edges = [
        new Edge(0, 1, 6), new Edge(1, 2, 7), new Edge(2, 0, 5), new Edge(2, 1, 4),
        new Edge(3, 2, 10), new Edge(4, 5, 1), new Edge(5, 4, 3)
    ];

    // calculate the total number of edges
    const n = edges.length;

    // construct a graph from the given edges
    const graph = new Graph(edges, n);

    // Function to print adjacency list representation of a graph
    printGraph(graph, n);
})();
```

**Output:** 0 —> 1 (6) 1 —> 2 (7) 2 —> 1 (4) 2 —> 0 (5) 3 —> 2 (10) 4 —> 5 (1) 5 —> 4 (3)

For weighted undirected graphs (as seen before for unweighted undirected graphs), create a path from `dest` to `src` as well in the adjacency list. The complete implementation can be seen [here](https://techiedelight.com/compiler/?run=fSq47Y).

**Also see:**

> [Graph Implementation in C++ (without using STL)](https://techiedelight.com/graph-implementation-c-without-using-stl/)

> [Graph Implementation in C++ using STL](https://techiedelight.com/graph-implementation-using-stl/)

> [Graph Implementation in Java using Collections](https://techiedelight.com/graph-implementation-java-using-collections/)

> [Graph Implementation in Python](https://techiedelight.com/graph-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 281

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
