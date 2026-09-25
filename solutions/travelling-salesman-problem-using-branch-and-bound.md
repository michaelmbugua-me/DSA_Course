# Travelling Salesman Problem using Branch and Bound

> Source: https://www.techiedelight.com/travelling-salesman-problem-using-branch-and-bound/

Given a set of cities and the distance between every pair of cities, the problem is to find the shortest possible route that visits every city exactly once and returns to the starting point.

For example, consider the following [graph](https://techiedelight.com/terminology-and-representations-of-graphs/). A TSP tour in the graph is `A —> B —> C —> D —> B —> A`. The cost of the tour is `10 + 25 + 40 + 25 + 10 = 100`.

[](https://developers.google.com/optimization/routing/tsp/tsp)

This post discusses the Travelling Salesman Problem using Branch and Bound.

The term _Branch and Bound_ refer to all state-space search methods in which all the children of an E–node are generated before any other live node can become the E–node. E–node is the node, which is being expended. State–space tree can be expended in any method, i.e., [BFS](https://techiedelight.com/breadth-first-search/) or [DFS](https://techiedelight.com/depth-first-search/). Both start with the root node and generate other nodes. A node that has been generated and whose children are not yet been expanded is called a live-node. A node is called a dead node, which has been generated, but it cannot be expanded further. In this method, we expand the most promising node, which means the node which promises that expanding or choosing it will give us the optimal solution. So, we prepare the tree starting from the root and then expand it.

We have a cost matrix defined by:

C(i, j) = W(i, j), if there is a direct path from Ci to Cj = INFINITY, if there is no direct path from Ci to Cj

For example, consider the following cost matrix `M`,

Here, C(0, 2) = 30 C(4, 0) = 16 C(1, 1) = INFINITY

Following is the state-space tree for the above TSP problem, which shows the optimal solution marked in green:

As we can see from the above diagram, every node has a cost associated with it. When we go from the city `i` to city `j`, the cost of a node `j` will be the sum of the parent node `i`, the cost of an edge `(i, j)`, and the lower bound of the path starting at node `j`.

As the root node is the first node to be expanded, it doesn’t have any parent. So, the cost will be only the lower bound of the path starting at the root.

Now, how do we calculate the lower bound of the path starting at any node?

In general, to get the lower bound of the path starting from the node, we reduce each row and column so that there must be at least one zero in each row and Column. We need to reduce the minimum value from each element in each row and column.

**Let’s start from the root node.**

We reduce the minimum value in each row from each element in that row. The minimum in each row of cost matrix `M` is marked by blue `[10 2 2 3 4]` below.

After reducing the row, we get the below reduced matrix.

We then reduce the minimum value in each column from each element in that column. Minimum in each column is marked by blue `[1 0 3 0 0]`. After reducing the column, we get below the reduced matrix. This matrix will be further processed by child nodes of the root node to calculate their lower bound.

The total expected cost at the root node is the sum of all reductions.

Cost = [10 2 2 3 4] + [1 0 3 0 0] = 25

Since we have discovered the root node `C0`, the next node to be expanded can be any node from `C1`, `C2`, `C3`, `C4`. Whichever node has a minimum cost will be expanded further. So, we have to find out the expanding cost of each node.

The parent node `C0` has below reduced matrix:

**Let’s consider an edge from`0 —> 1`.**

1\. As we add an edge `(0, 1)` to our search space, set outgoing edges for city `0` to `INFINITY` and all incoming edges to city `1` to `INFINITY`. We also set `(1, 0)` to `INFINITY`.

So in a reduced matrix of the parent node, change all the elements in row `0` and column `1` and at index `(1, 0)` to `INFINITY` (marked in red).

The resulting cost matrix is:

2\. We try to calculate the lower bound of the path starting at node `1` using the above resulting cost matrix. The lower bound is `0` as the matrix is already in reduced form, i.e., all rows and all columns have zero value.

Therefore, for node 1, the cost will be:

Cost = cost of node 0 + cost of the edge(0, 1) + lower bound of the path starting at node 1 = 25 + 10 + 0 = 35

**Let’s consider an edge from`0 —> 2`**

1\. Change all the elements in row `0` and column `2` and at index `(2, 0)` to `INFINITY` (marked in red).

The resulting cost matrix is:

2\. Now calculate the lower bound of the path starting at node `2` using the approach discussed earlier. The resultant matrix will be:

Therefore, for node 2, the cost will be

Cost = cost of node 0 + cost of the edge(0, 2) + lower bound of the path starting at node 2 = 25 + 17 + 11 = 53

**Let’s consider an edge from`0 —> 3`.**

1\. Change all the elements in row `0` and column `3` and at index `(3, 0)` to `INFINITY` (marked in red).

The resulting cost matrix is:

2\. Now calculate the lower bound of the path starting at node `3` using the approach discussed earlier. The lower bound of the path starting at node `3` is `0` as it is already in reduced form, i.e., all rows and all columns have zero value.

Therefore, for node 3, the cost will be

Cost = cost of node 0 + cost of the edge(0, 3) + lower bound of the path starting at node 3 = 25 + 0 + 0 = 25

Similarly, we calculate the cost of `0 —> 4`. Its cost will be `31`.

Now find a live node with the least estimated cost. Live nodes `1`, `2`, `3`, and `4` have costs `35`, `53`, `25`, and `31`, respectively. The minimum among them is node `3`, having cost `25`. So, node `3` will be expanded further, as shown in the state-space tree diagram. After adding its children to the list of live nodes, find a live node with the least cost and expand it. Continue the search till a leaf is encountered in the space search tree. If a leaf is encountered, then the tour is completed, and we will return to the root node.

Following is a TypeScript implementation of the above idea:

```ts
// `N` is the total number of total nodes on the graph or cities on the map
const N = 5;

// Sentinel value for representing `INFINITY`
const INF = Number.MAX_SAFE_INTEGER;

// State Space Tree nodes
interface Node {
    // stores edges of the state-space tree
    // help in tracing the path when the answer is found
    path: [number, number][];

    // stores the reduced matrix
    reducedMatrix: number[][];

    // stores the lower bound
    cost: number;

    // stores the current city number
    vertex: number;

    // stores the total number of cities visited so far
    level: number;
}

// Function to allocate a new node `(i, j)` corresponds to visiting city `j`
// from city `i`
function newNode(parentMatrix: number[][], path: [number, number][],
            level: number, i: number, j: number): Node
{
    const node: Node = {
        // stores ancestors edges of the state-space tree
        path: [...path],
        reducedMatrix: parentMatrix.map(row => row.slice()),
        cost: 0,
        vertex: 0,
        level: 0
    };

    // skip for the root node
    if (level !== 0)
    {
        // add a current edge to the path
        node.path.push([i, j]);
    }

    // Change all entries of row `i` and column `j` to `INFINITY`
    // skip for the root node
    for (let k = 0; level !== 0 && k < N; k++)
    {
        // set outgoing edges for the city `i` to `INFINITY`
        node.reducedMatrix[i][k] = INF;

        // set incoming edges to city `j` to `INFINITY`
        node.reducedMatrix[k][j] = INF;
    }

    // Set `(j, 0)` to `INFINITY`
    // here start node is 0
    node.reducedMatrix[j][0] = INF;

    // set number of cities visited so far
    node.level = level;

    // assign current city number
    node.vertex = j;

    // return node
    return node;
}

// Function to reduce each row so that there must be at least one zero in each row
function rowReduction(reducedMatrix: number[][], row: number[]): void
{
    // initialize row array to `INFINITY`
    row.fill(INF);

    // `row[i]` contains minimum in row `i`
    for (let i = 0; i < N; i++)
    {
        for (let j = 0; j < N; j++)
        {
            if (reducedMatrix[i][j] < row[i]) {
                row[i] = reducedMatrix[i][j];
            }
        }
    }

    // reduce the minimum value from each element in each row
    for (let i = 0; i < N; i++)
    {
        for (let j = 0; j < N; j++)
        {
            if (reducedMatrix[i][j] !== INF && row[i] !== INF) {
                reducedMatrix[i][j] -= row[i];
            }
        }
    }
}

// Function to reduce each column so that there must be at least one zero
// in each column
function columnReduction(reducedMatrix: number[][], col: number[]): void
{
    // initialize all elements of array `col` with `INFINITY`
    col.fill(INF);

    // `col[j]` contains minimum in col `j`
    for (let i = 0; i < N; i++)
    {
        for (let j = 0; j < N; j++)
        {
            if (reducedMatrix[i][j] < col[j]) {
                col[j] = reducedMatrix[i][j];
            }
        }
    }

    // reduce the minimum value from each element in each column
    for (let i = 0; i < N; i++)
    {
        for (let j = 0; j < N; j++)
        {
            if (reducedMatrix[i][j] !== INF && col[j] !== INF) {
                reducedMatrix[i][j] -= col[j];
            }
        }
    }
}

// Function to get the lower bound on the path starting at the current minimum node
function calculateCost(reducedMatrix: number[][]): number
{
    // initialize cost to 0
    let cost = 0;

    // Row Reduction
    const row: number[] = new Array<number>(N);
    rowReduction(reducedMatrix, row);

    // Column Reduction
    const col: number[] = new Array<number>(N);
    columnReduction(reducedMatrix, col);

    // the total expected cost is the sum of all reductions
    for (let i = 0; i < N; i++)
    {
        cost += (row[i] !== Number.MAX_SAFE_INTEGER) ? row[i] : 0;
        cost += (col[i] !== Number.MAX_SAFE_INTEGER) ? col[i] : 0;
    }

    return cost;
}

// Function to print list of cities visited following least cost
function printPath(list: [number, number][]): void
{
    for (let i = 0; i < list.length; i++) {
        console.log(`${list[i][0] + 1} —> ${list[i][1] + 1}`);
    }
}

// Function to solve the traveling salesman problem using Branch and Bound
function solve(costMatrix: number[][]): number
{
    // Create a priority queue to store live nodes of the search tree
    // min-heap assumed (JS has no builtin heap) — simulated with a plain array
    // by searching for the least-cost node on each pop
    const pq: Node[] = [];

    const v: [number, number][] = [];

    // create a root node and calculate its cost.
    // The TSP starts from the first city, i.e., node 0
    const root = newNode(costMatrix, v, 0, -1, 0);

    // get the lower bound of the path starting at node 0
    root.cost = calculateCost(root.reducedMatrix);

    // Add root to the list of live nodes
    pq.push(root);

    // Finds a live node with the least cost, adds its children to the list of
    // live nodes, and finally deletes it from the list
    while (pq.length > 0)
    {
        // Find a live node with the least estimated cost
        let minIndex = 0;
        for (let idx = 1; idx < pq.length; idx++) {
            if (pq[idx].cost < pq[minIndex].cost) {
                minIndex = idx;
            }
        }
        const min = pq[minIndex];

        // The found node is deleted from the list of live nodes
        pq.splice(minIndex, 1);

        // `i` stores the current city number
        const i = min.vertex;

        // if all cities are visited
        if (min.level === N - 1)
        {
            // return to starting city
            min.path.push([i, 0]);

            // print list of cities visited
            printPath(min.path);

            // return optimal cost
            return min.cost;
        }

        // do for each child of min
        // `(i, j)` forms an edge in a space tree
        for (let j = 0; j < N; j++)
        {
            if (min.reducedMatrix[i][j] !== INF)
            {
                // create a child node and calculate its cost
                const child = newNode(min.reducedMatrix, min.path,
                    min.level + 1, i, j);

                /* Cost of the child =
                    cost of the parent node +
                    cost of the edge(i, j) +
                    lower bound of the path starting at node j
                */

                child.cost = min.cost + min.reducedMatrix[i][j]
                            + calculateCost(child.reducedMatrix);

                // Add a child to the list of live nodes
                pq.push(child);
            }
        }
    }

    return 0;
}

// cost matrix for traveling salesman problem.

/*
const costMatrix: number[][] =
[
    [INF, 5, INF, 6, 5, 4],
    [5, INF, 2, 4, 3, INF],
    [INF, 2, INF, 1, INF, INF],
    [6, 4, 1, INF, 7, INF],
    [5, 3, INF, 7, INF, 3],
    [4, INF, INF, INF, 3, INF]
];
*/

// cost 34
const costMatrix: number[][] =
[
    [ INF, 10, 8, 9, 7 ],
    [ 10, INF, 10, 5, 6 ],
    [ 8, 10, INF, 8, 9 ],
    [ 9, 5, 8, INF, 6 ],
    [ 7, 6, 9, 6, INF ]
];

/*
// cost 16
const costMatrix: number[][] =
[
    [INF, 3, 1, 5, 8],
    [3, INF, 6, 7, 9],
    [1, 6, INF, 4, 2],
    [5, 7, 4, INF, 3],
    [8, 9, 2, 3, INF]
];
*/

/*
// cost 8
const costMatrix: number[][] =
[
    [INF, 2, 1, INF],
    [2, INF, 4, 3],
    [1, 4, INF, 2],
    [INF, 3, 2, INF]
];
*/

/*
// cost 12
const costMatrix: number[][] =
[
    [INF, 5, 4, 3],
    [3, INF, 8, 2],
    [5, 3, INF, 9],
    [6, 4, 3, INF]
];
*/

console.log("\n\nTotal cost is " + solve(costMatrix));
```

**Output:** 1 —> 3 3 —> 4 4 —> 2 2 —> 5 5 —> 1 Total cost is 34

The proposed method, which uses Branch and Bound, is better because it prepares the matrices in different steps. At each step, the cost matrix is calculated. From the initial point, we know that what can be the minimum cost of the tour. The cost of the initial stages is not an exact cost, but it gives some idea because it is the approximated cost. At each step, it gives us a strong reason for which node we should travel the next and which one not. It gives this fact in terms of the cost of expanding a particular node.

**References:**

1\. <https://www.seas.gwu.edu/~bell/csci212/Branch_and_Bound.pdf> 2\. <http://research.ijcaonline.org/volume65/number5/pxc3885866.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 104

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
