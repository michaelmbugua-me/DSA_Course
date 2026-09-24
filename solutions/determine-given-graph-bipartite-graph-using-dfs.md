# Determine whether a graph is Bipartite using DFS

> Source: https://www.techiedelight.com/determine-given-graph-bipartite-graph-using-dfs/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected graph, determine whether it is bipartite using DFS. A bipartite graph (or bigraph) is a graph whose vertices can be divided into two disjoint sets `U` and `V` such that every edge connects a vertex in `U` to one in `V`.

The following is a bipartite graph as we can divide it into two sets, `U` and `V`, with every edge having one endpoint in set `U` and the other in set `V`:

> 

It is possible to test whether a graph is bipartite or not using a [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) algorithm. There are two ways to check for bipartite graphs:

  1. A graph is bipartite if and only if it is 2–colorable.
  2. A graph is bipartite if and only if it does not contain an odd [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/).

In the [previous post](https://techiedelight.com/bipartite-graph/), we have checked if the graph contains an odd cycle or not using [BFS](https://techiedelight.com/breadth-first-search/). Now using DFS, we will determine if the graph is **2–colorable** or not.

The main idea is to assign each vertex a color that differs from its parent’s color in the [depth–first search](https://techiedelight.com/depth-first-search/) tree. If there exists an edge connecting the current vertex to a previously colored vertex with the same color, then we can say that the graph is not bipartite.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

// A class to represent a graph object
class Graph
{
public:
    // A vector of vectors to represent an adjacency list
    vector<vector<int>> adjList;

    // Total number of nodes in the graph
    int n;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        this->n = n;
        adjList.resize(n);

        // add edges to the undirected graph
        for (auto &edge: edges)
        {
            adjList[edge.src].push_back(edge.dest);
            adjList[edge.dest].push_back(edge.src);
        }
    }
};

// Perform DFS on the graph starting from vertex `v`
bool DFS(Graph const &graph, int v, vector<bool> &discovered, vector<int> &color)
{
    // do for every edge (v, u)
    for (int u: graph.adjList[v])
    {
        // if vertex `u` is explored for the first time
        if (!discovered[u])
        {
            // mark the current node as discovered
            discovered[u] = true;

            // current node has the opposite color of that its parent
            color[u] = !color[v];

            // if DFS on any subtree rooted at `v` returns false
            if (!DFS(graph, u, discovered, color)) {
                return false;
            }
        }

        // if the vertex has already been discovered and the color of the vertex
        // `u` and `v` are the same, then the graph is not bipartite
        else if (color[v] == color[u]) {
            return false;
        }
    }

    return true;
}

// Function to check if a graph is Bipartite using DFS
bool isBipartite(Graph const &graph)
{
    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(graph.n);

    // keep track of the color assigned (0 or 1) to each vertex in DFS
    vector<int> color(graph.n);

    // start from any node as the graph is connected and undirected
    int src = 0;

    // mark the source vertex as discovered and set its color to 0
    discovered[src] = true, color[src] = 0;

    // call DFS procedure
    return DFS(graph, src, discovered, color);
}

int main()
{
    // vector of graph edges
    vector<Edge> edges = {
        {0, 1}, {1, 2}, {1, 7}, {2, 3}, {3, 5}, {4, 6}, {4, 8}, {7, 8}, {1, 3}
        // if we remove (1, 3) edge, the graph becomes bipartite
    };

    // total number of nodes in the graph (0 to 8)
    int n = 9;

    // build a graph from the given edges
    Graph graph(edges, n);

    if (isBipartite(graph)) {
        cout << "Graph is bipartite";
    }
    else {
        cout << "Graph is not bipartite";
    }

    return 0;
}
```

**Output:** Graph is not bipartite

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// A class to store a graph edge
class Edge
{
    int source, dest;

    public Edge(int source, int dest)
    {
        this.source = source;
        this.dest = dest;
    }
}

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    List<List<Integer>> adjList = null;

    // Total number of nodes in the graph
    int n;

    // Constructor
    Graph(List<Edge> edges, int n)
    {
        this.adjList = new ArrayList<>();
        this.n = n;

        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the undirected graph
        for (Edge edge: edges)
        {
            int src = edge.source;
            int dest = edge.dest;

            adjList.get(src).add(dest);
            adjList.get(dest).add(src);
        }
    }
}

class Main
{
    // Perform DFS on the graph starting from vertex `v`
    public static boolean DFS(Graph graph, int v, boolean[] discovered,
                            boolean[] color)
    {
        // do for every edge (v, u)
        for (int u: graph.adjList.get(v))
        {
            // if vertex `u` is explored for the first time
            if (discovered[u] == false)
            {
                // mark the current node as discovered
                discovered[u] = true;
                // current node has the opposite color of that its parent
                color[u] = !color[v];

                // if DFS on any subtree rooted at `v` returns false
                if (DFS(graph, u, discovered, color) == false) {
                    return false;
                }
            }
            // if the vertex has already been discovered and
            // the color of vertex `u` and `v` are the same, then
            // the graph is not bipartite
            else if (color[v] == color[u]) {
                return false;
            }
        }

        return true;
    }

    // Function to check if a graph is Bipartite using DFS
    public static boolean isBipartite(Graph graph)
    {
        int n = graph.n;

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // keep track of the color assigned (0 or 1) to each vertex in DFS
        boolean[] color = new boolean[n];

        // start from any node as the graph is connected and undirected
        int src = 0;

        // mark the source vertex as discovered and set its color to 0
        discovered[src] = true;
        color[src] = false;

        // call DFS procedure
        return DFS(graph, src, discovered, color);
    }

    public static void main(String[] args)
    {
        // List of graph edges
        List<Edge> edges = Arrays.asList(
                new Edge(0, 1), new Edge(1, 2), new Edge(1, 7),
                new Edge(2, 3), new Edge(3, 5), new Edge(4, 6),
                new Edge(4, 8), new Edge(7, 8), new Edge(1, 3)
                // if we remove (1, 3) edge, the graph becomes bipartite
        );

        // total number of nodes in the graph (0 to 8)
        int n = 9;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        if (isBipartite(graph)) {
            System.out.println("Graph is bipartite");
        }
        else {
            System.out.println("Graph is not bipartite");
        }
    }
}
```

##

```python3
# A class to represent a graph object
class Graph:
    # Constructor
    def __init__(self, edges=None, n=0):

        # Total number of nodes in the graph
        self.n = n

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the undirected graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)
            self.adjList[dest].append(src)

# Perform DFS on the graph starting from vertex `v`
def DFS(graph, v, discovered, color):

    # do for every edge (v, u)
    for u in graph.adjList[v]:

        # if vertex `u` is explored for the first time
        if not discovered[u]:

            # mark the current node as discovered
            discovered[u] = True

            # current node has the opposite color of that its parent
            color[u] = not color[v]

            # if DFS on any subtree rooted at `v` returns false
            if not DFS(graph, u, discovered, color):
                return False

        # if the vertex has already been discovered and the color of
        # vertex `u` and `v` are the same, then the graph is not bipartite
        elif color[v] == color[u]:
            return False

    return True

# Function to check if a graph is Bipartite using DFS
def isBipartite(graph):

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * graph.n

    # keep track of the color assigned (0 or 1) to each vertex in DFS
    color = [False] * graph.n

    # start from any node as the graph is connected and undirected
    src = 0

    # mark the source vertex as discovered and set its color to 0 (False)
    discovered[src] = True
    color[src] = False

    # call DFS procedure
    return DFS(graph, src, discovered, color)

if __name__ == '__main__':

    # List of graph edges
    edges = [
        (0, 1), (1, 2), (1, 7), (2, 3), (3, 5), (4, 6), (4, 8), (7, 8), (1, 3)
        # if we remove (1, 3) edge, the graph becomes bipartite
    ]

    # total number of nodes in the graph (0 to 8)
    n = 9

    # build a graph from the given edges
    graph = Graph(edges, n)

    if isBipartite(graph):
        print('Graph is bipartite')
    else:
        print('Graph is not bipartite')
```

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**References:** [Bipartite graph – Wikipedia](https://en.wikipedia.org/wiki/Bipartite_graph)

Also See:

> [Bipartite Graph](https://www.techiedelight.com/bipartite-graph/ "Bipartite Graph")

> [Determine whether an undirected graph is a tree (Acyclic Connected Graph)](https://www.techiedelight.com/determine-undirected-graph-tree-acyclic-connected-graph/ "Determine whether an undirected graph is a tree \(Acyclic Connected Graph\)")

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 264

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
