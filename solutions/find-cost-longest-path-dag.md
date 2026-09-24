# Find the longest path in a Directed Acyclic Graph (DAG)

> Source: https://www.techiedelight.com/find-cost-longest-path-dag/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a weighted directed acyclic graph (DAG) and a source vertex, find the cost of the longest path from the source vertex to all other vertices present in the graph. If the vertex can’t be reached from the given source vertex, print its distance as infinity.

For example, consider the following DAG,

The longest distance of source vertex 7 to every other vertex is:

dist(7, 0) = 7 **(7 — > 3 —> 0)** dist(7, 1) = -1 **(7 — > 1)** dist(7, 2) = -5 **(7 — > 1 —> 2)** dist(7, 3) = 4 **(7 — > 3)** dist(7, 4) = 9 **(7 — > 3 —> 4)** dist(7, 5) = -4 **(7 — > 5)** dist(7, 6) = 9 **(7 — > 3 —> 0 —> 6)**

> 

**Prerequisite:**

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/)

We can easily solve this problem by following the above logic as well. The idea is to consider the edges’ negative weights and find the longest path from a given source in the graph. The cost of the longest path is just negative of its cost of the shortest path for any given vertex.

Here’s what [Wikipedia](https://en.wikipedia.org/wiki/Longest_path_problem) has to say for Acyclic graphs:

_The longest path between two given vertices`s` and `t` in a weighted graph `G` is the same thing as the shortest path in a graph `-G` derived from `G` by changing every weight to its negation. Therefore, if shortest paths can be found in `-G`, then longest paths can also be found in `G`. For most graphs, this transformation is not useful because it creates cycles of negative length in `-G`. But if `G` is a directed acyclic graph, then no negative cycles can be created, and the longest path in `G` can be found in linear time by applying a linear time algorithm for shortest paths in `-G`, which is also a directed acyclic graph._

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <iomanip>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest, weight;
};

// A class to represent a graph object
class Graph
{
public:
    // a vector of vectors to represent an adjacency list
    vector<vector<Edge>> adjList;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type vector<Edge>
        adjList.resize(n);

        // add edges to the directed graph
        for (Edge const &edge: edges) {
            adjList[edge.src].push_back(edge);
        }
    }
};

// Perform DFS on the graph and set the departure time of all
// vertices of the graph
int DFS(Graph const &graph, int v, vector<bool> &discovered,
        vector<int> &departure, int &time)
{
    // mark the current node as discovered
    discovered[v] = true;

    // set arrival time – not needed
    // time++;

    // do for every edge (v, u)
    for (Edge e: graph.adjList[v])
    {
        int u = e.dest;
        // if `u` is not yet discovered
        if (!discovered[u]) {
            DFS(graph, u, discovered, departure, time);
        }
    }

    // ready to backtrack
    // set departure time of vertex `v`
    departure[time] = v;
    time++;
}

// The function performs the topological sort on a given DAG and then finds
// the longest distance of all vertices from a given source by running one pass
// of the Bellman–Ford algorithm
void findLongestDistance(Graph const &graph, int source, int n)
{
    // departure[] stores vertex number having its departure
    // time equal to the index of it
    vector<int> departure(n, -1);

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);
    int time = 0;

    // perform DFS on all undiscovered vertices
    for (int i = 0; i < n; i++)
    {
        if (!discovered[i]) {
            DFS(graph, i, discovered, departure, time);
        }
    }

    vector<int> cost(n, INT_MAX);
    cost[source] = 0;

    // Process the vertices in topological order, i.e., in order
    // of their decreasing departure time in DFS
    for (int i = n - 1; i >= 0; i--)
    {
        // for each vertex in topological order,
        // relax the cost of its adjacent vertices
        int v = departure[i];
        for (Edge e: graph.adjList[v])
        {
            // edge `e` from `v` to `u` having weight `w`
            int u = e.dest;
            int w = e.weight * -1;        // make edge weight negative

            // if the distance to destination `u` can be shortened by
            // taking edge (v, u), then update cost to the new lower value
            if (cost[v] != INT_MAX && cost[v] + w < cost[u]) {
                cost[u] = cost[v] + w;
            }
        }
    }

    // print the longest paths
    for (int i = 0; i < n; i++)
    {
        cout << "dist(" << source << ", " << i << ") = " << setw(2) << cost[i] * -1;
        cout << endl;
    }
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges =
    {
        {0, 6, 2}, {1, 2, -4}, {1, 4, 1}, {1, 6, 8}, {3, 0, 3}, {3, 4, 5},
        {5, 1, 2}, {7, 0, 6}, {7, 1, -1}, {7, 3, 4}, {7, 5, -4}
    };

    // total number of nodes in the graph (labelled from 0 to 7)
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    // source vertex
    int source = 7;

    // find the longest distance of all vertices from a given source
    findLongestDistance(graph, source, n);

    return 0;
}
```

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
    List<List<Edge>> adjList = null;

    // Constructor
    Graph(List<Edge> edges, int n)
    {
        adjList = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the directed graph
        for (Edge edge: edges) {
            adjList.get(edge.source).add(edge);
        }
    }
}

class Main
{
    // Perform DFS on the graph and set the departure time of all
    // vertices of the graph
    private static int DFS(Graph graph, int v, boolean[] discovered,
                           int[] departure, int time)
    {
        // mark the current node as discovered
        discovered[v] = true;

        // set arrival time – not needed
        // time++;

        // do for every edge (v, u)
        for (Edge e: graph.adjList.get(v))
        {
            int u = e.dest;

            // if `u` is not yet discovered
            if (!discovered[u]) {
                time = DFS(graph, u, discovered, departure, time);
            }
        }

        // ready to backtrack
        // set departure time of vertex `v`
        departure[time] = v;
        time++;

        return time;
    }

    // The function performs the topological sort on a given DAG and then finds
    // the longest distance of all vertices from a given source by running
    // one pass of the Bellman–Ford algorithm
    public static void findLongestDistance(Graph graph, int source, int n)
    {
        // departure[] stores vertex number having its departure
        // time equal to the index of it
        int[] departure = new int[n];
        Arrays.fill(departure, -1);

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];
        int time = 0;

        // perform DFS on all undiscovered vertices
        for (int i = 0; i < n; i++)
        {
            if (!discovered[i]) {
                time = DFS(graph, i, discovered, departure, time);
            }
        }

        int[] cost = new int[n];
        Arrays.fill(cost, Integer.MAX_VALUE);

        cost[source] = 0;

        // Process the vertices in topological order, i.e., in order
        // of their decreasing departure time in DFS
        for (int i = n - 1; i >= 0; i--)
        {
            // for each vertex in topological order,
            // relax the cost of its adjacent vertices
            int v = departure[i];
            for (Edge e: graph.adjList.get(v))
            {
                // edge `e` from `v` to `u` having weight `w`
                int u = e.dest;
                int w = e.weight * -1;        // make edge weight negative

                // if the distance to destination `u` can be shortened by
                // taking edge (v, u), then update cost to the new lower value
                if (cost[v] != Integer.MAX_VALUE && cost[v] + w < cost[u]) {
                    cost[u] = cost[v] + w;
                }
            }
        }

        // print the longest paths
        for (int i = 0; i < n; i++) {
            System.out.printf("dist(%d, %d) = %2d\n", source, i, cost[i] * -1);
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 6, 2), new Edge(1, 2, -4), new Edge(1, 4, 1),
                new Edge(1, 6, 8), new Edge(3, 0, 3), new Edge(3, 4, 5),
                new Edge(5, 1, 2), new Edge(7, 0, 6), new Edge(7, 1, -1),
                new Edge(7, 3, 4), new Edge(7, 5, -4)
        );

        // total number of nodes in the graph (labelled from 0 to 7)
        int n = 8;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // source vertex
        int source = 7;

        // find the longest distance of all vertices from a given source
        findLongestDistance(graph, source, n);
    }
}
```

##

```python3
import sys

# A class to represent a graph object
class Graph:
    # Constructor
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the directed graph
        for (source, dest, weight) in edges:
            self.adjList[source].append((dest, weight))

# Perform DFS on the graph and set the departure time of all
# vertices of the graph
def DFS(graph, v, discovered, departure, time):

    # mark the current node as discovered
    discovered[v] = True

    # set arrival time – not needed
    # time = time + 1

    # do for every edge (v, u)
    for (u, w) in graph.adjList[v]:
        # if `u` is not yet discovered
        if not discovered[u]:
            time = DFS(graph, u, discovered, departure, time)

    # ready to backtrack
    # set departure time of vertex `v`
    departure[time] = v
    time = time + 1

    return time

# The function performs the topological sort on a given DAG and then finds
# the longest distance of all vertices from a given source by running
# one pass of the Bellman–Ford algorithm
def findLongestDistance(graph, source, n):

    # `departure` stores vertex number having its departure
    # time equal to the index of it
    departure = [-1] * n

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n
    time = 0

    # perform DFS on all undiscovered vertices
    for i in range(n):
        if not discovered[i]:
            time = DFS(graph, i, discovered, departure, time)

    cost = [sys.maxsize] * n
    cost[source] = 0

    # Process the vertices in topological order, i.e., in order
    # of their decreasing departure time in DFS
    for i in reversed(range(n)):

        # for each vertex in topological order,
        # relax the cost of its adjacent vertices
        v = departure[i]

        # edge from `v` to `u` having weight `w`
        for (u, w) in graph.adjList[v]:
            w = -w     # make edge weight negative

            # if the distance to destination `u` can be shortened by
            # taking edge (v, u), then update cost to the new lower value
            if cost[v] != sys.maxsize and cost[v] + w < cost[u]:
                cost[u] = cost[v] + w

    # print the longest paths
    for i in range(n):
        print(f'dist ({source}, {i}) = {-cost[i]}')

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        (0, 6, 2), (1, 2, -4), (1, 4, 1),(1, 6, 8), (3, 0, 3), (3, 4, 5),
        (5, 1, 2), (7, 0, 6), (7, 1, -1), (7, 3, 4), (7, 5, -4)
    ]

    # total number of nodes in the graph (labelled from 0 to 7)
    n = 8

    # build a graph from the given edges
    graph = Graph(edges, n)

    # source vertex
    source = 7

    # find the longest distance of all vertices from a given source
    findLongestDistance(graph, source, n)
```

**Output:** dist(7, 0) = 7 dist(7, 1) = -1 dist(7, 2) = -5 dist(7, 3) = 4 dist(7, 4) = 9 dist(7, 5) = -4 dist(7, 6) = 9 dist(7, 7) = 0

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.49/5. Vote count: 167

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
