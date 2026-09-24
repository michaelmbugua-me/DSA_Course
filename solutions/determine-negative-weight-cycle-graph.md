# Determine a negative-weight cycle in a graph

> Source: https://www.techiedelight.com/determine-negative-weight-cycle-graph/

Given a directed weighted graph, report a negative-weight cycle in the graph, if any. A negative-weight cycle is a cycle in a graph whose edges sum to a negative value.

For example, consider the following graph:

It has one negative-weight cycle, `1—2—3—1` with sum `-2`.

> 

## Approach 1: Using Bellman–Ford algorithm

[Bellman–Ford algorithm](https://techiedelight.com/single-source-shortest-paths-bellman-ford-algorithm/) is used to compute the shortest paths from a single source vertex to all the other vertices in a given weighted digraph. It can be modified to report any negative-weight cycle in the graph.

To check if the graph contains a negative-weight cycle, run Bellman–Ford once from each vertex. After running the relaxation step in Bellman–Ford `V-1` times, the idea is to perform a final scan of all the edges. If any distance is updated, then a path of length `|V|` edges have been found, which can only occur if at least one negative cycle exists in the graph.

The time complexity of this approach will be O(V2 × E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. If the graph is dense, i.e., `E = V2`, then the time complexity becomes O(V4).

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

// Define infinity as the maximum value of the integer
#define INF INT_MAX

// Data structure to store a graph edge
struct Edge
{
    // edge from `source` to `dest` having a weight equal to `weight`
    int source, dest, weight;
};

// Function to run the Bellman–Ford algorithm from a given source
bool bellmanFord(vector<Edge> const &edges, int source, int n)
{
    // cost[] stores shortest path information
    int cost[n];

    // Initially, all vertices except the source vertex weight infinity
    fill_n(cost, n, INF);
    cost[source] = 0;

    int u, v, w, k = n;

    // Relaxation step (run V-1 times)
    while (--k)
    {
        for (Edge edge: edges)
        {
            // edge from `u` to `v` having weight `w`
            u = edge.source;
            v = edge.dest;
            w = edge.weight;

            // if the cost to destination `u` can be shortened by taking edge (u, v)
            if (cost[u] != INF && cost[u] + w < cost[v])
            {
                // update cost to the new lower value
                cost[v] = cost[u] + w;
            }
        }
    }

    // Run relaxation step once more for n'th time to check for negative-weight cycles
    for (Edge edge: edges)
    {
        // edge from `u` to `v` having weight `w`
        u = edge.source;
        v = edge.dest;
        w = edge.weight;

        // if the cost to destination `u` can be shortened by taking edge (u, v)
        if (cost[u] != INF && cost[u] + w < cost[v]) {
            return true;
        }
    }

    return false;
}

bool hasNegativeWeightCycle(vector<vector<int>> &adjMatrix)
{
    // create a vector to store graph edges
    vector<Edge> edges;

    // total number of nodes in the graph
    int n = adjMatrix.size();

    // base case
    if (n == 0) {
        return false;
    }

    for (int v = 0; v < n; v++)
    {
        for (int u = 0; u < n; u++)
        {
            if (adjMatrix[v][u] && adjMatrix[v][u] != INF) {
                edges.push_back({v, u, adjMatrix[v][u]});
            }
        }
    }

    // Run Bellman–Ford algorithm from each vertex as the source
    // and check for any negative-weight cycle
    for (int i = 0; i < n; i++) {
        if (bellmanFord(edges, i, n)) {
            return true;
        }
    }

    return false;
}

int main()
{
    // given adjacency representation of the matrix
    vector<vector<int>> adjMatrix =
    {
        { 0,   INF, -2,   INF },
        { 4,   0,    -3,   INF },
        { INF, INF,  0,      2 },
        { INF, -1,   INF, 0 }
    };

    bool result = hasNegativeWeightCycle(adjMatrix);
    if (result) {
        cout << "Negative-weight cycle found";
    } else {
        cout << "Negative-weight cycle doesn't exist";
    }

    return 0;
}
```

**Output:** Negative-weight cycle found

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

// A class to store a graph edge
class Edge
{
    // edge from `source` to `dest` having a weight equal to `weight`
    int source, dest, weight;

    Edge(int source, int dest, int weight)
    {
        this.source = source;
        this.dest = dest;
        this.weight = weight;
    }
}

class Main
{
    // Define infinity as the maximum value of the integer
    private static final int INF = Integer.MAX_VALUE;

    // Function to run the Bellman–Ford algorithm from a given source
    public static boolean bellmanFord(List<Edge> edges, int source, int n)
    {
        // cost[] stores shortest path information
        int[] cost = new int[n];

        // Initially, all vertices except the source vertex weight infinity
        Arrays.fill(cost, INF);
        cost[source] = 0;

        int u, v, w;

        // Relaxation step (run V-1 times)
        for (int k = 1; k < n; k++)
        {
            for (Edge e: edges)
            {
                // edge from `u` to `v` having weight `w`
                u = e.source;
                v = e.dest;
                w = e.weight;

                // if the cost to destination `u` can be
                // shortened by taking edge (u, v)
                if (cost[u] != INF && cost[u] + w < cost[v])
                {
                    // update cost to the new lower value
                    cost[v] = cost[u] + w;
                }
            }
        }

        // Run relaxation step once more for n'th time to
        // check for negative-weight cycles
        for (Edge e: edges)
        {
            // edge from `u` to `v` having weight `w`
            u = e.source;
            v = e.dest;
            w = e.weight;

            // if the cost to destination `u` can be shortened by taking edge (u, v)
            if (cost[u] != INF && cost[u] + w < cost[v]) {
                return true;
            }
        }

        return false;
    }

    public static boolean hasNegativeWeightCycle(int[][] adjMatrix)
    {
        // base case
        if (adjMatrix == null || adjMatrix.length == 0) {
            return false;
        }

        // create a list to store graph edges
        List<Edge> edges = new ArrayList<>();

        // total number of nodes in the graph
        int n = adjMatrix.length;

        for (int v = 0; v < n; v++)
        {
            for (int u = 0; u < n; u++)
            {
                if (adjMatrix[v][u] != 0 && adjMatrix[v][u] != INF) {
                    edges.add(new Edge(v, u, adjMatrix[v][u]));
                }
            }
        }

        // Run Bellman–Ford algorithm from each vertex as the source
        // and check for any negative-weight cycle
        if (IntStream.range(0, n).anyMatch(i -> bellmanFord(edges, i, n))) {
            return true;
        }

        return false;
    }

    public static void main(String[] args)
    {
        // adjacency representation of the matrix
        int[][] adjMatrix =
        {
            { 0,   INF, -2,   INF },
            { 4,   0,    -3,   INF },
            { INF, INF,  0,      2 },
            { INF, -1,   INF, 0 }
        };

        boolean result = hasNegativeWeightCycle(adjMatrix);
        if (result) {
            System.out.println("Negative-weight cycle found");
        } else {
            System.out.println("Negative-weight cycle doesn't exist");
        }
    }
}
```

##

```python3
import sys

# define infinity as the maximum value of the integer
INF = sys.maxsize

# Function to run the Bellman–Ford algorithm from a given source
def bellmanFord(edges, source, n):

    # `cost` stores the shortest path information
    cost = [INF] * n

    # Initially, all vertices except the source vertex weight infinity
    cost[source] = 0

    # Relaxation step (run V-1 times)
    for _ in range(n - 1):
        # consider all edges from `u` to `v` having weight `w`
        for (u, v, w) in edges:
            # if the cost to destination `u` can be shortened by taking edge (u, v)
            if cost[u] != INF and cost[u] + w < cost[v]:
                # update cost to the new lower value
                cost[v] = cost[u] + w

    # Run relaxation step once more for n'th time to check for negative-weight cycles
    for (u, v, w) in edges:
        # if the cost to destination `u` can be shortened by taking edge (u, v)
        if cost[u] != INF and cost[u] + w < cost[v]:
            return True

    return False

def hasNegativeWeightCycle(adjMatrix):

    # base case
    if not adjMatrix:
        return False

    # total number of nodes in the graph
    n = len(adjMatrix)

    # create a list to store graph edges
    edges = []

    for v in range(n):
        for u in range(n):
            if adjMatrix[v][u] and adjMatrix[v][u] != INF:
                # edge from source `v` to dest `u` having specified weight
                edges.append((v, u, adjMatrix[v][u]))

    # Run Bellman–Ford algorithm from each vertex as the source
    # and check for any negative-weight cycle
    for i in range(n):
        if bellmanFord(edges, i, n):
            return True

    return False

if __name__ == '__main__':

    # given adjacency representation of the matrix
    adjMatrix = [
        [0,   INF, -2,  INF],
        [4,   0,   -3,  INF],
        [INF, INF, 0,   2],
        [INF, -1,  INF, 0]
    ]

    result = hasNegativeWeightCycle(adjMatrix)
    if result:
        print('Negative-weight cycle found')
    else:
        print('Negative-weight cycle doesn\'t exist')
```

## Approach 2: Using Floyd–Warshall Algorithm

[Floyd–Warshall algorithm](https://techiedelight.com/pairs-shortest-paths-floyd-warshall-algorithm/) is an algorithm for finding the shortest paths in a weighted graph with positive or negative edge weights. It can easily be modified to report any negative-weight cycle in the graph.

To detect negative cycles using the Floyd–Warshall algorithm, check the cost matrix’s diagonal for any negative number as it indicates that the graph contains at least one negative cycle. The Floyd–Warshall algorithm iteratively revises path lengths between all pairs of vertices `(i, j)`, including where `i = j`. Initially, the length of the path `(i, i)` is zero. A path `[i, k…i]` can only improve upon this if it has a length less than zero, i.e., denotes a negative cycle. Thus, `(i, i)` will be negative if there exists a negative-length path from `i` back to `i`. The time complexity of this approach is O(V3), where `V` is the total number of vertices in the graph.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Define infinity as the maximum value of the integer
#define INF INT_MAX

// Function to run the Floyd–Warshall algorithm
void floydWarshall(vector<vector<int>> &adjMatrix)
{
    // total number of nodes in the graph
    int n = adjMatrix.size();

    // base case
    if (n == 0) {
        return;
    }

    // cost[] stores shortest path information
    int cost[n][n];

    // initialize `cost[]` matrix
    for (int v = 0; v < n; v++)
    {
        for (int u = 0; u < n; u++)
        {
            // Initially, the cost would be the same as the weight of the edge
            cost[v][u] = adjMatrix[v][u];
        }
    }

    // Run Floyd–Warshall
    for (int k = 0; k < n; k++)
    {
        for (int v = 0; v < n; v++)
        {
            for (int u = 0; u < n; u++)
            {
                // If vertex `k` is on the shortest path from `v` to `u`,
                // then update the value of cost[v][u]

                if (cost[v][k] != INF && cost[k][u] != INF
                        && cost[v][k] + cost[k][u] < cost[v][u]) {
                    cost[v][u] = cost[v][k] + cost[k][u];
                }
            }

            // If diagonal elements become negative, the
            // graph contains a negative-weight cycle
            if (cost[v][v] < 0)
            {
                cout << "Negative-weight cycle found";
                return;
            }
        }
    }

    cout << "Negative-weight cycle doesn't exist";
}

int main()
{
    // given adjacency representation of the matrix
    vector<vector<int>> adjMatrix =
    {
        { 0,   INF, -2,   INF },
        { 4,   0,    -3,   INF },
        { INF, INF,  0,      2 },
        { INF, -1,   INF, 0 }
    };

    // Run Floyd–Warshall algorithm
    floydWarshall(adjMatrix);

    return 0;
}
```

**Output:** Negative-weight cycle found

##

```java
class Main
{
    // Define infinity as the maximum value of the integer
    private static final int INF = Integer.MAX_VALUE;

    // Function to run the Floyd–Warshall algorithm
    public static void floydWarshall(int[][] adjMatrix)
    {
        // base case
        if (adjMatrix ==null || adjMatrix.length == 0) {
            return;
        }

        // total number of vertices in the adjacency matrix
        int n = adjMatrix.length;

        // cost[] stores shortest path information
        int[][] cost = new int[n][n];

        // initialize `cost[]` matrix
        for (int v = 0; v < n; v++)
        {
            for (int u = 0; u < n; u++)
            {
                // Initially, the cost would be the same as the weight of the edge
                cost[v][u] = adjMatrix[v][u];
            }
        }

        // Run Floyd–Warshall
        for (int k = 0; k < n; k++)
        {
            for (int v = 0; v < n; v++)
            {
                for (int u = 0; u < n; u++)
                {
                    // If vertex `k` is on the shortest path from `v` to `u`,
                    // then update the value of cost[v][u]

                    if (cost[v][k] != INF && cost[k][u] != INF
                            && cost[v][k] + cost[k][u] < cost[v][u]) {
                        cost[v][u] = cost[v][k] + cost[k][u];
                    }
                }

                // If diagonal elements become negative, the
                // graph contains a negative-weight cycle
                if (cost[v][v] < 0)
                {
                    System.out.println("Negative-weight cycle found");
                    return;
                }
            }
        }

        System.out.println("Negative-weight cycle doesn't exist");
    }

    public static void main(String[] args)
    {
        // given adjacency representation of the matrix
        int[][] adjMatrix =
        {
            { 0,   INF, -2,  INF },
            { 4,   0,    -3,  INF },
            { INF, INF, 0,     2 },
            { INF, -1,  INF, 0 }
        };

        // Run Floyd–Warshall algorithm
        floydWarshall(adjMatrix);
    }
}
```

##

```python3
import sys

# define infinity as the maximum value of the integer
INF = sys.maxsize

# Function to run the Floyd–Warshall algorithm
def floydWarshall(adjMatrix):

    # base case
    if not adjMatrix:
        return

    # total number of vertices in the adjacency matrix
    n = len(adjMatrix)

    # `cost` stores the shortest path information
    # Initially, the cost would be the same as the weight of the edge
    cost = [[adjMatrix[v][u] for u in range(n)] for v in range(n)]

    # Run Floyd–Warshall
    for k in range(n):
        for v in range(n):
            for u in range(n):
                # If vertex `k` is on the shortest path from `v` to `u`,
                # then update the value of cost[v][u]
                if (cost[v][k] != INF and cost[k][u] != INF
                        and cost[v][k] + cost[k][u] < cost[v][u]):
                    cost[v][u] = cost[v][k] + cost[k][u]

            # If diagonal elements become negative, the
            # graph contains a negative-weight cycle
            if cost[v][v] < 0:
                print('Negative-weight cycle found')
                return

    print('Negative-weight cycle doesn\'t exist')

if __name__ == '__main__':

    # given adjacency representation of the matrix
    adjMatrix = [
        [0, INF, -2, INF],
        [4, 0, -3, INF],
        [INF, INF, 0, 2],
        [INF, -1, INF, 0]
    ]

    # Run Floyd–Warshall algorithm
    floydWarshall(adjMatrix)
```
