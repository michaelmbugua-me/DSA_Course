# Snake and Ladder Problem

> Source: https://www.techiedelight.com/min-throws-required-to-win-snake-and-ladder-game/

Find the minimum number of throws required to win a given Snakes and Ladders board game.

For example, the following game requires at least 7 dice throws to win:

[](https://www.shutterstock.com/image-vector/snakes-ladders-board-game-start-finish-163384724)

> 

The idea is to consider the snakes and ladders board as a directed graph and run [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) from the starting node, vertex 0, as per game rules. We construct a directed graph, keeping in mind the following conditions:

  1. For any vertex in graph `v`, we have an edge from `v` to `v+1`, `v+2`, `v+3`, `v+4`, `v+5`, `v+6` as we can reach any of these nodes in one throw of dice from node `v`.
  2. If any of these neighbors of `v` has a ladder or snake, which takes us to position `x`, then `x` becomes the neighbor instead of the base of the ladder or head of the snake.

Now the problem is reduced to finding the shortest path between two nodes in a directed graph problem. We represent the snakes and ladders board using a map.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    // A list of lists to represent an adjacency list
    adjList: number[][];

    // Constructor
    constructor(edges: number[][], n: number) {
        // A list of lists to represent an adjacency list
        this.adjList = Array.from({ length: n }, () => []);

        // add edges to the graph
        for (const [src, dest] of edges) {
            // Please note that the graph is directed
            this.adjList[src].push(dest);
        }
    }
}

// Perform BFS on graph `g` starting from a given source vertex
function BFS(g: Graph, source: number, n: number): number {

    // create a queue for doing BFS
    const q: [number, number][] = [];

    // to keep track of whether a vertex is discovered or not
    const discovered: boolean[] = new Array(n + 1).fill(false);

    // mark the source vertex as discovered
    discovered[source] = true;

    // assign the minimum distance of the source vertex as 0 and
    // enqueue it
    q.push([source, 0]);

    // loop till queue is empty
    while (q.length) {

        // dequeue front node
        const [vertex, min_dist] = q.shift()!;

        // `vertex` stores the number associated with the graph node
        // `min_dist` stores the minimum distance of a node from the starting vertex

        // Stop BFS if the last node is reached
        if (vertex === n) {
            return min_dist;
        }

        // do for every adjacent node of the current node
        for (const u of g.adjList[vertex]) {
            if (!discovered[u]) {
                // mark it as discovered and enqueue it
                discovered[u] = true;

                // assign the minimum distance of the current node
                // one more than the minimum distance of the parent node
                q.push([u, min_dist + 1]);
            }
        }
    }

    return -1;
}

function findMinimumMoves(ladder: Map<number, number>, snake: Map<number, number>): number {

    // total number of nodes in the graph
    const n = 10 * 10;

    // find all edges involved and store them in a list
    const edges: number[][] = [];
    for (let i = 0; i < n; i++) {

        let j = 1;
        while (j <= 6 && i + j <= n) {
            const src = i;

            // update destination if there is any ladder
            // or snake from the current position.

            const _ladder = ladder.get(i + j) ? ladder.get(i + j)! : 0;
            const _snake = snake.get(i + j) ? snake.get(i + j)! : 0;

            let dest;
            if (_ladder || _snake) {
                dest = _ladder + _snake;
            } else {
                dest = i + j;
            }

            // add an edge from src to dest
            edges.push([src, dest]);

            j = j + 1;
        }
    }

    // construct a directed graph
    const g = new Graph(edges, n);

    // Find the shortest path between 1 and 100 using BFS
    return BFS(g, 0, n);
}

// snakes and ladders are represented using a dictionary.
const ladder = new Map<number, number>();
const snake = new Map<number, number>();

// insert ladders into the dictionary
ladder.set(1, 38);
ladder.set(4, 14);
ladder.set(9, 31);
ladder.set(21, 42);
ladder.set(28, 84);
ladder.set(51, 67);
ladder.set(72, 91);
ladder.set(80, 99);

// insert snakes into the dictionary
snake.set(17, 7);
snake.set(54, 34);
snake.set(62, 19);
snake.set(64, 60);
snake.set(87, 36);
snake.set(93, 73);
snake.set(95, 75);
snake.set(98, 79);

console.log(findMinimumMoves(ladder, snake));
```

**Output:** 7

Also See:

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

> [Total paths in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/total-paths-in-digraph-from-source-to-destination-m-edges/ "Total paths in a digraph from a given source to a destination having exactly `m` edges")

> [Bipartite Graph](https://www.techiedelight.com/bipartite-graph/ "Bipartite Graph")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 275

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
