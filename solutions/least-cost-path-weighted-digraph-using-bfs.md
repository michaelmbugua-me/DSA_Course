# Compute the least cost path in a weighted digraph using BFS

> Source: https://www.techiedelight.com/least-cost-path-weighted-digraph-using-bfs/

Consider a directed graph where the weight of its edges can be one of `x`, `2x`, or `3x` (`x` is a positive integer), efficiently compute the least-cost path from source to destination.

For example, consider the following graph:

If the source is `1` and destination is `3`, the least-cost path from source to destination is `[1, 4, 3]` having cost `2`.

If the source is `0` and destination is `2`, the least-cost path from source to destination is `[0, 4, 2]` having cost `3`.

> 

We know that [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) can be used to find the shortest path in an unweighted graph or a weighted graph having the same cost of all its edges. BFS runs in O(E + V) time, where `E` is the total number of the edges and `V` is the total number of vertices in the graph. But if the edges in the graph are weighted with different costs, then the recommended algorithm is [Dijkstra’s Algorithm](https://techiedelight.com/single-source-shortest-paths-dijkstras-algorithm/), which takes O(E.log(V)) time.

Can we use BFS?

The idea is to modify the input graph so that all its edges have the same weight. For edges having weight `3x`, split them into three edges of weight `x` each. Similarly, edges having weight `2x` gets split into two edges of weight `x` each. Nothing needs to be done for edges already having weight `x`. Special care has to be taken while introducing new edges in the graph such that no new routes are introduced into the graph. To split an edge of weight `3x`, create two new vertices in the graph instead of using existing vertices. Similarly, to split edge having weight `2x`, create one new vertex. Let’s illustrate this with the help of a diagram.

Split edge (v, u) having weight `3x` into three edges `(v, v+n)`, `(v+n, v+2N)`, and `(v+2N, u)` each having weight `x`.

Split edge (v, u) having weight `2x` into two edges `(v, v+n)` and `(v+n, u)` each having weight `x`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int source, dest, weight;
};

// A class to represent a graph object
class Graph
{
public:
    // a vector of vectors to represent an adjacency list
    vector<vector<int>> adjList;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int x, int n)
    {
        // resize the vector to `3×n` elements of type `vector<int>`
        adjList.resize(3*n);

        // add edges to the directed graph
        for (auto &edge: edges)
        {
            int v = edge.source;
            int u = edge.dest;
            int weight = edge.weight;

            // create two new vertices, `v+n` and `v+2×n`, if the edge's weight is `3x`
            // Also, split edge (v, u) into (v, v+n), (v+n, v+2N) and (v+2N, u),
            // each having weight `x`.
            if (weight == 3*x)
            {
                adjList[v].push_back(v + n);
                adjList[v + n].push_back(v + 2*n);
                adjList[v + 2*n].push_back(u);
            }

            // create one new vertex `v+n` if the weight of the edge is `2x`.
            // Also, split edge (v, u) into (v, v+n), (v+n, u) each having weight `x`
            else if (weight == 2*x)
            {
                adjList[v].push_back(v + n);
                adjList[v + n].push_back(u);
            }

            // no splitting is needed if the edge weight is `1x`
            else {
                adjList[v].push_back(u);
            }
        }
    }
};

// Recursive function to print the path of a given vertex `v` from the source vertex
void printPath(vector<int> const &predecessor, int v, int &cost, int n)
{
    if (v < 0) {
        return;
    }

    printPath(predecessor, predecessor[v], cost, n);
    cost++;

    // only consider the original nodes present in the graph
    if (v < n) {
        cout << v << " ";
    }
}

// Perform BFS on the graph starting from vertex source
void findLeastPathCost(Graph const &graph, int source, int dest, int n)
{
    // stores vertex is discovered in BFS traversal or not
    vector<bool> discovered(3*n, false);

    // mark the source vertex as discovered
    discovered[source] = true;

    // `predecessor[]` stores predecessor information. It is used
    // to trace a least-cost path from the destination back to the source.
    vector<int> predecessor(3*n, -1);

    // create a queue for doing BFS and enqueue source vertex
    queue<int> q;
    q.push(source);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and print it
        int curr = q.front();
        q.pop();

        // if destination vertex is reached
        if (curr == dest)
        {
            int cost = -1;
            cout << "The least-cost path between " << source << " and " <<
                dest << " is "; printPath(predecessor, dest, cost, n);
            cout << "having cost " << cost;
        }

        // do for every adjacent edge of the current vertex
        for (int v: graph.adjList[curr])
        {
            if (!discovered[v])
            {
                // mark it as discovered and enqueue it
                discovered[v] = true;
                q.push(v);

                // set `curr` as the predecessor of vertex `v`
                predecessor[v] = curr;
            }
        }
    }
}

int main()
{
    int x = 1;

    // vector of graph edges as per the above diagram
    vector<Edge> edges =
    {
        {0, 1, 3*x}, {0, 4, 1*x}, {1, 2, 1*x}, {1, 3, 3*x},
        {1, 4, 1*x}, {4, 2, 2*x}, {4, 3, 1*x}
    };

    // total number of nodes in the graph
    int n = 5;

    // given the source and destination vertex
    int source = 0, dest = 2;

    // build a graph from the given edges
    Graph graph(edges, x, n);

    // Perform BFS traversal from the given source
    findLeastPathCost(graph, source, dest, n);

    return 0;
}
```

**Output:** The least-cost path between 0 and 2 is 0 4 2 having cost 3

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    int source, dest, weight;

    public Edge(int source, int dest, int weight)
    {
        this.source = source;
        this.dest = dest;
        this.weight = weight;
    }
}

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    List<List<Integer>> adjList = null;

    // Constructor
    Graph(List<Edge> edges, int x, int n)
    {
        adjList = new ArrayList<>(3*n);

        for (int i = 0; i < 3*n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the directed graph
        for (Edge edge: edges)
        {
            int v = edge.source;
            int u = edge.dest;
            int weight = edge.weight;

            // create two new vertices, `v+n` and `v+2×n`, if the edge's weight is `3x`
            // Also, split edge (v, u) into (v, v+n), (v+n, v+2N) and (v+2N, u),
            // each having weight `x`.
            if (weight == 3*x)
            {
                adjList.get(v).add(v + n);
                adjList.get(v + n).add(v + 2*n);
                adjList.get(v + 2*n).add(u);
            }

            // create one new vertex `v+n` if the weight of the edge is `2x`.
            // Also, split edge (v, u) into (v, v+n), (v+n, u) each having weight `x`
            else if (weight == 2*x)
            {
                adjList.get(v).add(v + n);
                adjList.get(v + n).add(u);
            }

            // no splitting is needed if the edge weight is `1x`
            else {
                adjList.get(v).add(u);
            }
        }
    }
}

class Main
{
    // Recursive function to print the path of a given vertex `v` from
    // the source vertex
    private static int printPath(int[] predecessor, int vertex, int cost, int n)
    {
        if (vertex >= 0)
        {
            cost = printPath(predecessor, predecessor[vertex], cost, n);
            cost++;

            // only consider the original nodes present in the graph
            if (vertex < n) {
                System.out.print(vertex + " ");
            }
        }
        return cost;
    }

    // Perform BFS on the graph starting from vertex source
    public static void findLeastPathCost(Graph graph, int source, int dest, int n)
    {
        // stores vertex is discovered in BFS traversal or not
        boolean[] discovered = new boolean[3*n];

        // mark the source vertex as discovered
        discovered[source] = true;

        // `predecessor[]` stores predecessor information. It is used
        // to trace a least-cost path from the destination back to the source.
        int[] predecessor = new int[3*n];
        Arrays.fill(predecessor, -1);

        // create a queue for doing BFS and enqueue source vertex
        Queue<Integer> q = new ArrayDeque<>();
        q.add(source);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and print it
            int curr = q.poll();

            // if destination vertex is reached
            if (curr == dest)
            {
                System.out.print("The least-cost path between " + source
                        + " and " + dest + " is ");
                System.out.println("having cost " +
                        printPath(predecessor, dest, -1, n));
            }

            // do for every adjacent edge of the current vertex
            for (int v: graph.adjList.get(curr))
            {
                if (!discovered[v])
                {
                    // mark it as discovered and enqueue it
                    discovered[v] = true;
                    q.add(v);

                    // set `curr` as the predecessor of vertex `v`
                    predecessor[v] = curr;
                }
            }
        }
    }

    public static void main(String[] args)
    {
        int x = 1;

        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 1, 3*x), new Edge(0, 4, 1*x), new Edge(1, 2, 1*x),
                new Edge(1, 3, 3*x), new Edge(1, 4, 1*x), new Edge(4, 2, 2*x),
                new Edge(4, 3, 1*x)
        );

        // total number of nodes in the graph
        int n = 5;

        // given the source and destination vertex
        int source = 0, dest = 2;

        // build a graph from the given edges
        Graph graph = new Graph(edges, x, n);

        // Perform BFS traversal from the given source
        findLeastPathCost(graph, source, dest, n);
    }
}
```

##

```python3
from collections import deque

# A class to represent a graph object
class Graph:

    # Constructor
    def __init__(self, edges, x, n):
        self.adjList = [[] for _ in range(3*n)]

        # add edges to the directed graph
        for (v, u, weight) in edges:

            # Create two new vertices, `v+n` and `v+2×n`, if the edge's weight is `3x`.
            # Also, split edge (v, u) into (v, v+n), (v+n, v+2N) and (v+2N, u),
            # each having weight `x`.
            if weight == 3*x:
                self.adjList[v].append(v + n)
                self.adjList[v + n].append(v + 2*n)
                self.adjList[v + 2*n].append(u)

            # create one new vertex `v+n` if the weight of the edge is `2x`.
            # Also, split edge (v, u) into (v, v+n), (v+n, u) each having weight `x`
            elif weight == 2*x:
                self.adjList[v].append(v + n)
                self.adjList[v + n].append(u)

            # no splitting is needed if the edge weight is `1x`
            else:
                self.adjList[v].append(u)

# Recursive function to print the path of a given vertex `v` from the source vertex
def printPath(predecessor, v, cost, n):

    if v >= 0:
        cost = printPath(predecessor, predecessor[v], cost, n)
        cost = cost + 1

        # only consider the original nodes present in the graph
        if v < n:
            print(v, end=' ')

    return cost

# Perform BFS on the graph starting from vertex source
def findLeastPathCost(graph, source, dest, n):

    # stores vertex is discovered in BFS traversal or not
    discovered = [False] * 3 * n

    # mark the source vertex as discovered
    discovered[source] = True

    # `predecessor` stores predecessor information. It is used to trace
    # the least-cost path from the destination back to the source.
    predecessor = [-1] * 3 * n

    # create a queue for doing BFS and enqueue source vertex
    q = deque()
    q.append(source)

    # loop till queue is empty
    while q:

        # dequeue front node and print it
        curr = q.popleft()

        # if destination vertex is reached
        if curr == dest:
            print(f'The least-cost path between {source} and {dest} is ', end='')
            print('having cost', printPath(predecessor, dest, -1, n))

        # do for every adjacent edge of the current vertex
        for v in graph.adjList[curr]:
            if not discovered[v]:
                # mark it as discovered and enqueue it
                discovered[v] = True
                q.append(v)

                # set `curr` as the predecessor of vertex `v`
                predecessor[v] = curr

if __name__ == '__main__':

    x = 1

    # List of graph edges as per the above diagram
    edges = [
        (0, 1, 3*x), (0, 4, 1*x), (1, 2, 1*x), (1, 3, 3*x),
        (1, 4, 1*x), (4, 2, 2*x), (4, 3, 1*x)
    ]

    # total number of nodes in the graph
    n = 5

    # given the source and destination vertex
    source = 0
    dest = 2

    # build a graph from the given edges
    graph = Graph(edges, x, n)

    # Perform BFS traversal from the given source
    findLeastPathCost(graph, source, dest, n)
```

Also See:

> [Least cost path in a digraph from a given source to a destination having exactly `m` edges](https://www.techiedelight.com/least-cost-path-digraph-source-destination-m-edges/ "Least cost path in a digraph from a given source to a destination having exactly `m` edges")

> [Find maximum cost path in a graph from a given source to a given destination](https://www.techiedelight.com/maximum-cost-path-graph-source-destination/ "Find maximum cost path in a graph from a given source to a given destination")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.35/5. Vote count: 81

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
