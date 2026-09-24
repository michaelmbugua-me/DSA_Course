# All-Pairs Shortest Paths – Floyd Warshall Algorithm

> Source: https://www.techiedelight.com/pairs-shortest-paths-floyd-warshall-algorithm/

Given a set of vertices `V` in a weighted graph where its edge weights `w(u, v)` can be negative, find the shortest path weights `d(s, v)` from every source `s` for all vertices `v` present in the graph. If the graph contains a negative-weight [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/), report it.

For example, consider the following graph:

The adjacency matrix containing the shortest distance is: 0 -1 -2 0 4 0 2 4 5 1 0 2 3 -1 1 0 The shortest path from: • vertex 0 to vertex 1 is [0 —> 2 —> 3 —> 1] • vertex 0 to vertex 2 is [0 —> 2] • vertex 0 to vertex 3 is [0 —> 2 —> 3] • vertex 1 to vertex 0 is [1 —> 0] • vertex 1 to vertex 2 is [1 —> 0 —> 2] • vertex 1 to vertex 3 is [1 —> 0 —> 2 —> 3] • vertex 2 to vertex 0 is [2 —> 3 —> 1 —> 0] • vertex 2 to vertex 1 is [2 —> 3 —> 1] • vertex 2 to vertex 3 is [2 —> 3] • vertex 3 to vertex 0 is [3 —> 1 —> 0] • vertex 3 to vertex 1 is [3 —> 1] • vertex 3 to vertex 2 is [3 —> 1 —> 0 —> 2]

We have already covered **single-source the shortest paths** in separate posts. We have seen that:

  * For graphs having non-negative edge weights, [Dijkstra’s Algorithm](https://techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/) runs in O(E + V × log(V))
  * For graphs containing negative edge weights, [Bellman–Ford](https://techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/) runs in O(V × E).
  * For a DAG, [one pass of Bellman–Ford](https://techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/) _(called relaxation step)_ is enough that will take O(V + E) time.

Here, `V` is the total number of vertices and `E` is the total number of edges in the graph.

This post will introduce **All-Pairs Shortest Paths** that return the shortest paths between every pair of vertices in the graph containing negative edge weights.

> 

If the graph contains only positive edge weights, a simple solution would be to run Dijkstra’s algorithm `V` times. The time complexity of this solution would be O(V × (E + V × log(V))), i.e., O(V × E + V2.log(V)).

If the graph contains negative edge weights, we can run Bellman–Ford once from each vertex to find all-pairs shortest paths. The time complexity of this approach will be O(V2 × E). If the graph is dense, i.e., `E = V2`, then the time complexity becomes O(V4).

**Floyd–Warshall algorithm** is an algorithm for finding the shortest paths in a weighted graph with positive or negative edge weights (but with no negative cycles). It does so by comparing all possible paths through the graph between each pair of vertices and that too with O(V3) comparisons in a graph.

Following is the pseudocode for Floyd Warshall, as given on Wikipedia. The implementation takes a graph, represented by an adjacency matrix, and fills `dist[]` with shortest path (the least-cost) information:

let dist be `V × V` matrix of minimum distances initialized to INFINITY for each vertex v dist[v][v] = 0 for each edge (u, v) dist[u][v] = weight(u, v) for k from 0 to |V| – 1 for i from 0 to |V| – 1 for j from 0 to |V| – 1 if (dist[i][k] + dist[k][j]) is less than dist[i][j] then dist[i][j] = dist[i][k] + dist[k][j]

Above pseudocode picks up a vertex `k` between 0 and `V-1`, one at a time, and include that vertex as an intermediate vertex in the shortest path between every pair of edges `i—>j` in the graph. It updates the cost matrix whenever a more straightforward path from `i` to `j` through vertex `k` is found. Since, for a given `k`, we have already considered vertices `0…k-1` as intermediate vertices, this approach works.

**Let’s consider the above graph,**

Before the first iteration of the outer loop for `k`, the only known paths correspond to the single edges in the graph.

**At`k = 0`, paths that go through the vertex 0 are found**: in particular, the path `[1, 0, 2]` is found, replacing the path `[1, 2]` which has fewer edges but is costly.

**At`k = 1`, paths going through the vertices `{0, 1}` are found**. The following figure shows how the path `[3, 1, 0, 2]` is assembled from the two known paths `[3, 1]` and `[1, 0, 2]` encountered in previous iterations, with 1 in the intersection. The path `[3, 1, 2]` is not considered because `[1, 0, 2]` is the shortest path encountered so far from `1` to `2`.

**At`k = 2`, paths going through the vertices `{0, 1, 2}` are found.**

**Finally, at`k = 3`, all shortest paths are found.**

The Floyd–Warshall algorithm is simple to code and really efficient traditionally. It can also be used to find the [Transitive Closure of a graph](https://techiedelight.com/transitive-closure-graph/) and [detect negative-weight cycles in the graph](https://techiedelight.com/determine-negative-weight-cycle-graph/).

To detect negative cycles using the Floyd–Warshall algorithm, check the distance matrix’s diagonal for a negative number as it indicates that the graph contains at least one negative cycle.

How does this works?

The Floyd–Warshall algorithm iteratively revises path lengths between all pairs of vertices `(i, j)`, including where `i = j`. Initially, the size of the path `(i, i)` is zero. A path `[i, k…i]` can only improve upon this if it has a length less than zero, i.e., denotes a negative cycle. Thus, after the algorithm, `(i, i)` will be negative if there exists a negative-length path from `i` back to `i`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <iomanip>
using namespace std;

// Recursive function to print path of given vertex `u` from source vertex `v`
void printPath(vector<vector<int>> const &path, int v, int u)
{
    if (path[v][u] == v) {
        return;
    }
    printPath(path, v, path[v][u]);
    cout << path[v][u] << ", ";
}

// Function to print the shortest cost with path information between
// all pairs of vertices
void printSolution(vector<vector<int>> const &cost, vector<vector<int>> const &path)
{
    int n = cost.size();
    for (int v = 0; v < n; v++)
    {
        for (int u = 0; u < n; u++)
        {
            if (u != v && path[v][u] != -1)
            {
                cout << "The shortest path from " << v << " —> " << u << " is ["
                    << v << ", ";
                printPath(path, v, u);
                cout << u << "]" << endl;
            }
        }
    }
}

// Function to run the Floyd–Warshall algorithm
void floydWarshall(vector<vector<int>> const &adjMatrix)
{
    // total number of vertices in the `adjMatrix`
    int n = adjMatrix.size();

    // base case
    if (n == 0) {
        return;
    }

    // cost[] and path[] stores shortest path
    // (shortest cost/shortest route) information
    vector<vector<int>> cost(n, vector<int>(n));
    vector<vector<int>> path(n, vector<int>(n));

    // initialize cost[] and path[]
    for (int v = 0; v < n; v++)
    {
        for (int u = 0; u < n; u++)
        {
            // initially, cost would be the same as the weight of the edge
            cost[v][u] = adjMatrix[v][u];

            if (v == u) {
                path[v][u] = 0;
            }
            else if (cost[v][u] != INT_MAX) {
                path[v][u] = v;
            }
            else {
                path[v][u] = -1;
            }
        }
    }

    // run Floyd–Warshall
    for (int k = 0; k < n; k++)
    {
        for (int v = 0; v < n; v++)
        {
            for (int u = 0; u < n; u++)
            {
                // If vertex `k` is on the shortest path from `v` to `u`,
                // then update the value of cost[v][u] and path[v][u]

                if (cost[v][k] != INT_MAX && cost[k][u] != INT_MAX
                    && cost[v][k] + cost[k][u] < cost[v][u])
                {
                    cost[v][u] = cost[v][k] + cost[k][u];
                    path[v][u] = path[k][u];
                }
            }

            // if diagonal elements become negative, the
            // graph contains a negative-weight cycle
            if (cost[v][v] < 0)
            {
                cout << "Negative-weight cycle found!!";
                return;
            }
        }
    }

    // Print the shortest path between all pairs of vertices
    printSolution(cost, path);
}

int main()
{
    // define infinity
    int I = INT_MAX;

    // given adjacency representation of the matrix
    vector<vector<int>> adjMatrix =
    {
        { 0, I, -2, I },
        { 4, 0, 3, I },
        { I, I, 0, 2 },
        { I, -1, I, 0 }
    };

    // Run Floyd–Warshall algorithm
    floydWarshall(adjMatrix);

    return 0;
}
```

##

```java
import java.util.ArrayList;
import java.util.List;

class Main
{
    // Recursive function to print path of given vertex `u` from source vertex `v`
    private static void printPath(int[][] path, int v, int u, List<Integer> route)
    {
        if (path[v][u] == v) {
            return;
        }
        printPath(path, v, path[v][u], route);
        route.add(path[v][u]);
    }

    // Function to print the shortest cost with path information between
    // all pairs of vertices
    private static void printSolution(int[][] path, int n)
    {
        for (int v = 0; v < n; v++)
        {
            for (int u = 0; u < n; u++)
            {
                if (u != v && path[v][u] != -1)
                {
                    List<Integer> route = new ArrayList<>();
                    route.add(v);
                    printPath(path, v, u, route);
                    route.add(u);
                    System.out.printf("The shortest path from %d —> %d is %s\n",
                        v, u, route);
                }
            }
        }
    }

    // Function to run the Floyd–Warshall algorithm
    public static void floydWarshall(int[][] adjMatrix)
    {
        // base case
        if (adjMatrix ==null || adjMatrix.length == 0) {
            return;
        }

        // total number of vertices in the `adjMatrix`
        int n = adjMatrix.length;

        // cost[] and path[] stores shortest path
        // (shortest cost/shortest route) information
        int[][] cost = new int[n][n];
        int[][] path = new int[n][n];

        // initialize cost[] and path[]
        for (int v = 0; v < n; v++)
        {
            for (int u = 0; u < n; u++)
            {
                // initially, cost would be the same as the weight of the edge
                cost[v][u] = adjMatrix[v][u];

                if (v == u) {
                    path[v][u] = 0;
                }
                else if (cost[v][u] != Integer.MAX_VALUE) {
                    path[v][u] = v;
                }
                else {
                    path[v][u] = -1;
                }
            }
        }

        // run Floyd–Warshall
        for (int k = 0; k < n; k++)
        {
            for (int v = 0; v < n; v++)
            {
                for (int u = 0; u < n; u++)
                {
                    // If vertex `k` is on the shortest path from `v` to `u`,
                    // then update the value of cost[v][u] and path[v][u]

                    if (cost[v][k] != Integer.MAX_VALUE
                            && cost[k][u] != Integer.MAX_VALUE
                            && (cost[v][k] + cost[k][u] < cost[v][u]))
                    {
                        cost[v][u] = cost[v][k] + cost[k][u];
                        path[v][u] = path[k][u];
                    }
                }

                // if diagonal elements become negative, the
                // graph contains a negative-weight cycle
                if (cost[v][v] < 0)
                {
                    System.out.println("Negative-weight cycle found!!");
                    return;
                }
            }
        }

        // Print the shortest path between all pairs of vertices
        printSolution(path, n);
    }

    public static void main(String[] args)
    {
        // define infinity
        int I = Integer.MAX_VALUE;

        // given adjacency representation of the matrix
        int[][] adjMatrix = new int[][]
        {
            { 0, I, -2, I },
            { 4, 0, 3, I },
            { I, I, 0, 2 },
            { I, -1, I, 0 }
        };

        // Run Floyd–Warshall algorithm
        floydWarshall(adjMatrix);
    }
}
```

##

```python3
# Recursive function to print the path of given vertex `u` from source vertex `v`
def printPath(path, v, u, route):
    if path[v][u] == v:
        return
    printPath(path, v, path[v][u], route)
    route.append(path[v][u])

# Function to print the shortest cost with path
# information between all pairs of vertices
def printSolution(path, n):
    for v in range(n):
        for u in range(n):
            if u != v and path[v][u] != -1:
                route = [v]
                printPath(path, v, u, route)
                route.append(u)
                print(f'The shortest path from {v} —> {u} is', route)

# Function to run the Floyd–Warshall algorithm
def floydWarshall(adjMatrix):

    # base case
    if not adjMatrix:
        return

    # total number of vertices in the `adjMatrix`
    n = len(adjMatrix)

    # cost and path matrix stores shortest path
    # (shortest cost/shortest route) information

    # initially, cost would be the same as the weight of an edge
    cost = adjMatrix.copy()
    path = [[None for x in range(n)] for y in range(n)]

    # initialize cost and path
    for v in range(n):
        for u in range(n):
            if v == u:
                path[v][u] = 0
            elif cost[v][u] != float('inf'):
                path[v][u] = v
            else:
                path[v][u] = -1

    # run Floyd–Warshall
    for k in range(n):
        for v in range(n):
            for u in range(n):
                # If vertex `k` is on the shortest path from `v` to `u`,
                # then update the value of cost[v][u] and path[v][u]
                if cost[v][k] != float('inf') and cost[k][u] != float('inf') \
                        and (cost[v][k] + cost[k][u] < cost[v][u]):
                    cost[v][u] = cost[v][k] + cost[k][u]
                    path[v][u] = path[k][u]

            # if diagonal elements become negative, the
            # graph contains a negative-weight cycle
            if cost[v][v] < 0:
                print('Negative-weight cycle found')
                return

    # Print the shortest path between all pairs of vertices
    printSolution(path, n)

if __name__ == '__main__':

    # define infinity
    I = float('inf')

    # given adjacency representation of the matrix
    adjMatrix = [
        [0, I, -2, I],
        [4, 0, 3, I],
        [I, I, 0, 2],
        [I, -1, I, 0]
    ]

    # Run Floyd–Warshall algorithm
    floydWarshall(adjMatrix)
```

**Output:** The shortest path from 0 —> 1 is [0, 2, 3, 1] The shortest path from 0 —> 2 is [0, 2] The shortest path from 0 —> 3 is [0, 2, 3] The shortest path from 1 —> 0 is [1, 0] The shortest path from 1 —> 2 is [1, 0, 2] The shortest path from 1 —> 3 is [1, 0, 2, 3] The shortest path from 2 —> 0 is [2, 3, 1, 0] The shortest path from 2 —> 1 is [2, 3, 1] The shortest path from 2 —> 3 is [2, 3] The shortest path from 3 —> 0 is [3, 1, 0] The shortest path from 3 —> 1 is [3, 1] The shortest path from 3 —> 2 is [3, 1, 0, 2]

The time complexity of the Floyd–Warshall algorithm is O(V3), where `V` is the total number of vertices in the graph.

[Johnson’s algorithm](https://en.wikipedia.org/wiki/Johnson%27s_algorithm) can also be used to find the shortest paths between all pairs of vertices in a sparse, weighted, directed graph. It allows some edge weights to be negative numbers, but no negative-weight cycles may exist. It uses the [Bellman–Ford algorithm](https://techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/) to transform the input graph such that it removes all negative weights from the graph and run Dijkstra’s algorithm on the transformed graph.

**References:**

<https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm> [MIT: Shortest Paths III: All-pairs Shortest Paths, Matrix Multiplication, Floyd–Warshall, Johnson](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-introduction-to-algorithms-sma-5503-fall-2005/video-lectures/lecture-19-shortest-paths-iii-all-pairs-shortest-paths-matrix-multiplication-floyd-warshall-johnson/)

Also See:

> [Determine a negative-weight cycle in a graph](https://www.techiedelight.com/determine-negative-weight-cycle-graph/ "Determine a negative-weight cycle in a graph")

> [Single-Source Shortest Paths – Bellman–Ford Algorithm](https://www.techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/ "Single-Source Shortest Paths – Bellman–Ford Algorithm")

> [Transitive closure of a graph](https://www.techiedelight.com/transitive-closure-graph/ "Transitive closure of a graph")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 207

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Easy](https://www.techiedelight.com/Tags/easy/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
