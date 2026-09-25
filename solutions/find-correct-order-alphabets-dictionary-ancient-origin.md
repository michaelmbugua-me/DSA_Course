# Find correct order of alphabets in a given dictionary of ancient origin

> Source: https://www.techiedelight.com/find-correct-order-alphabets-dictionary-ancient-origin/

Given a dictionary of ancient origin where the words are arranged alphabetically, find the correct order of alphabets in the ancient language.

For example,

**Input:** Ancient dictionary { ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß } **Output:** The correct order of alphabets in the ancient language is {¥ € ‰ ð ± ß}. Since the input is small, more than one ordering is possible. Another such ordering is {¥ € ð ± ß ‰}. **Input:** Ancient dictionary { ÿ€±š, €€€ß, €€‰ð, ðß, ±ß¥š } **Output:** The correct order of alphabets in the ancient language is {ÿ € ‰ ð ±}. The alphabets {š, ß, ¥} are not included in the order as they are not properly defined.

If we carefully analyze the problem, we can see that it is a variation of [Topological sorting](https://techiedelight.com/topological-sorting-dag/) of a DAG. A topological sorting of a directed acyclic graph is a linear ordering of its vertices such that for every directed edge `(u —> v)` from vertex `u` to vertex `v`, `u` comes before `v` in the ordering.

For example, consider the dictionary `{ ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß }` of ancient words. For each of the edges `(x —> y)` shown below, `x` should appear before `y` in the final ordering.

¥ ——> € € ——> ð, ‰ ± ——> ß ð ——> ±

If we perform topological sorting on the above graph, we get the correct order of alphabets in the ancient language: `{¥ € ‰ ð ± ß}` or `{¥ € ð ± ß ‰}`.

The idea is to iterate through the complete dictionary and compare adjacent words for a character mismatch. If a mismatch between adjacent words is seen, insert such a pair into a graph. The resultant graph is a DAG since all words in the dictionary are arranged alphabetically. Since the graph has no directed cycles, perform topological sorting on it, resulting in the correct order of alphabets in the ancient language.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to represent a graph object
class Graph {
    adj: number[][];

    constructor(N: number) {
        this.adj = Array.from({ length: N }, () => []);
    }
}

// Perform DFS on the graph and set the departure time of all vertices of the graph
function DFS(graph: Graph, v: number, discovered: boolean[], departure: number[], time: number): number {

    // mark the current node as discovered
    discovered[v] = true;

    // set the arrival time of vertex `v`
    time = time + 1;

    // do for every edge `v —> u`
    for (const u of graph.adj[v]) {
        // if `u` is not yet discovered
        if (!discovered[u]) {
            time = DFS(graph, u, discovered, departure, time);
        }
    }

    // ready to backtrack
    // set departure time of vertex `v`
    departure[time] = v;
    return time + 1;
}

// Utility function to performs topological sort on a given DAG
function doTopologicalSort(graph: Graph, d: Map<number, string>, N: number): void {

    // `departure[]` stores the vertex number using departure time as an index
    const departure = new Array(2 * N).fill(-1);

    /* If we had done it the other way around, i.e., fill the array
        with departure time using vertex number as an index, we would
        need to sort it later */

    // to keep track of whether a vertex is discovered or not
    const discovered: boolean[] = new Array(N).fill(false);
    let time = 0;

    // perform DFS on all undiscovered connected vertices
    for (let i = 0; i < N; i++) {
        if (!discovered[i] && graph.adj[i].length) {
            time = DFS(graph, i, discovered, departure, time);
        }
    }

    console.log('\nThe correct order of alphabets in the ancient language is', ' ');

    // Print the vertices in order of their decreasing
    // departure time in DFS, i.e., in topological order
    for (let i = 2 * N - 1; i >= 0; i--) {
        if (departure[i] !== -1) {
            process.stdout.write(`${d.get(departure[i]) as string} `);
        }
    }
}

// Utility function to print adjacency list representation of a graph
function printGraph(graph: Graph, d: Map<number, string>, N: number): void {

    for (let i = 0; i < N; i++) {
        // ignore vertices with no outgoing edges
        if (graph.adj[i].length) {
            // print current vertex and all neighboring vertices of a vertex `i`
            console.log(d.get(i), '—>', graph.adj[i].map((v) => d.get(v)));
        }
    }
}

// Function to find the correct order of alphabets in a given dictionary of
// ancient origin. This function assumes that the input is correct.
function findAlphabetsOrder(dictionary: string[][], N: number): void {

    // create a map to map each non-ASCII character present in the
    // given dictionary with a unique integer
    const d = new Map<string, number>();

    let k = 0;

    // do for each word
    for (const word of dictionary) {
        // do for each non-ASCII character of the word
        for (const s of word) {
            // if the current character is not present in the map, insert it
            if (!d.has(s)) {
                d.set(s, k);
            }
            k = k + 1;
        }
    }

    // create a graph containing `N` nodes
    const graph = new Graph(N);

    // iterate through the complete dictionary and compare adjacent words
    // for character mismatch
    for (let i = 1; i < dictionary.length; i++) {

        // previous word in the dictionary
        const prev = dictionary[i - 1];

        // current word in the dictionary
        const curr = dictionary[i];

        // iterate through both `prev` and `curr` simultaneously and find the
        // first mismatching character
        let j = 0;
        while (j < prev.length && j < curr.length) {

            // mismatch found
            if (prev[j] !== curr[j]) {

                // add an edge from the current character of `prev` to the
                // current character of `curr` in the graph
                graph.adj[d.get(prev[j]) as number].push(d.get(curr[j]) as number);
                break;
            }

            j = j + 1;
        }
    }

    // create a reverse map
    const reverse = new Map<number, string>();
    for (const [key, val] of d) {
        reverse.set(val, key);
    }

    printGraph(graph, reverse, N);

    // perform a topological sort on the above graph
    doTopologicalSort(graph, reverse, N);
}

// define the maximum number of alphabets in the ancient dictionary
const N = 100;

// an ancient dictionary containing words ¥€±, €±€, €±‰ð, ðß, ±±ð, ±ßß
// individual characters of each word are stored as a string since they
// are non-ASCII
const dictionary = [
    ["¥", "€", "±"],
    ["€", "±", "€"],
    ["€", "±", "‰", "ð"],
    ["ð", "ß"],
    ["±", "±", "ð"],
    ["±", "ß", "ß"]
];

findAlphabetsOrder(dictionary, N);
```

The time complexity of the above solution is O(N.M), where `N` is the dictionary size and `M` is the maximum length of a word in the dictionary.

Also See:

> [Topological Sort Algorithm for DAG](https://www.techiedelight.com/topological-sorting-dag/ "Topological Sort Algorithm for DAG")

> [Arrival and departure time of vertices in DFS](https://www.techiedelight.com/arrival-departure-time-vertices-dfs/ "Arrival and departure time of vertices in DFS")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 62

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
