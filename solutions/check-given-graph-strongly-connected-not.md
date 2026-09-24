# Check if a graph is strongly connected or not

> Source: https://www.techiedelight.com/check-given-graph-strongly-connected-not/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a directed graph, check if it is strongly connected or not. A directed graph is said to be strongly connected if every vertex is reachable from every other vertex.

For example, the following graph is strongly connected as a path exists between all pairs of vertices:

> 

A simple solution is to perform [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) or [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) starting from every vertex in the graph. If each DFS/BFS call visits every other vertex in the graph, then the graph is strongly connected.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

// A class to represent a graph object
class Graph
{
public:

    // a vector of vectors to represent an adjacency list
    vector<vector<int>> adjList;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        adjList.resize(n);

        // add edges to the directed graph
        for (auto &edge: edges) {
            adjList[edge.src].push_back(edge.dest);
        }
    }
};

// Function to perform DFS traversal on the graph on a graph
void DFS(Graph const &graph, int v, vector<bool> &visited)
{
    // mark current node as visited
    visited[v] = true;

    // do for every edge (v, u)
    for (int u: graph.adjList[v])
    {
        // `u` is not visited
        if (!visited[u]) {
            DFS(graph, u, visited);
        }
    }
}

// Function to check if the graph is strongly connected or not
bool isStronglyConnected(Graph const &graph, int n)
{
    // do for every vertex
    for (int i = 0; i < n; i++)
    {
        // to keep track of whether a vertex is visited or not
        vector<bool> visited(n);

        // start DFS from the first vertex
        DFS(graph, i, visited);

        // If DFS traversal doesn't visit all vertices,
        // then the graph is not strongly connected
        if (find(visited.begin(), visited.end(), false) != visited.end()) {
            return false;
        }
    }

    return true;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 4}, {1, 0}, {1, 2}, {2, 1}, {2, 4},
        {3, 1}, {3, 2}, {4, 3}
    };

    // total number of nodes in the graph
    int n = 5;

    // build a graph from the given edges
    Graph graph(edges, n);

    // check if the graph is not strongly connected or not
    if (isStronglyConnected(graph, n)) {
        cout << "The graph is strongly connected";
    }
    else {
        cout << "The graph is not strongly connected";
    }

    return 0;
}
```

**Output:** The graph is strongly connected

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

    // Constructor
    Graph(List<Edge> edges, int n)
    {
        adjList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the directed graph
        for (Edge edge: edges)
        {
            int src = edge.source;
            int dest = edge.dest;

            adjList.get(src).add(dest);
        }
    }
}

class Main
{
    // Function to perform DFS traversal on the graph on a graph
    private static void DFS(Graph graph, int v, boolean[] visited)
    {
        // mark current node as visited
        visited[v] = true;

        // do for every edge (v, u)
        for (int u: graph.adjList.get(v))
        {
            // `u` is not visited
            if (!visited[u]) {
                DFS(graph, u, visited);
            }
        }
    }

    // Check if the graph is strongly connected or not
    public static boolean isStronglyConnected(Graph graph, int n)
    {
        // do for every vertex
        for (int i = 0; i < n; i++)
        {
            // to keep track of whether a vertex is visited or not
            boolean[] visited = new boolean[n];

            // start DFS from the first vertex
            DFS(graph, i, visited);

            // If DFS traversal doesn't visit all vertices,
            // then the graph is not strongly connected
            for (boolean b: visited)
            {
                if (!b) {
                    return false;
                }
            }
        }

        return true;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 4), new Edge(1, 0), new Edge(1, 2), new Edge(2, 1),
                new Edge(2, 4), new Edge(3, 1), new Edge(3, 2), new Edge(4, 3)
        );

        // total number of nodes in the graph
        int n = 5;

        // construct graph
        Graph graph = new Graph(edges, n);

        // check if the graph is not strongly connected or not
        if (isStronglyConnected(graph, n)) {
            System.out.println("The graph is strongly connected");
        }
        else {
            System.out.println("The graph is not strongly connected");
        }
    }
}
```

##

```python3
# A class to represent a graph object
class Graph:

    # Constructor
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the directed graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)

# Function to perform DFS traversal on the graph on a graph
def DFS(graph, v, visited):

    # mark current node as visited
    visited[v] = True

    # do for every edge (v, u)
    for u in graph.adjList[v]:
        # `u` is not visited
        if not visited[u]:
            DFS(graph, u, visited)

# Check if the graph is strongly connected or not
def isStronglyConnected(graph, n):

    # do for every vertex
    for i in range(n):

        # to keep track of whether a vertex is visited or not
        visited = [False] * n

        # start DFS from the first vertex
        DFS(graph, i, visited)

        # If DFS traversal doesn't visit all vertices,
        # then the graph is not strongly connected
        for b in visited:
            if not b:
                return False

    return True

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 4), (1, 0), (1, 2), (2, 1), (2, 4), (3, 1), (3, 2), (4, 3)]

    # total number of nodes in the graph
    n = 5

    # construct graph
    graph = Graph(edges, n)

    # check if the graph is not strongly connected or not
    if isStronglyConnected(graph, n):
        print('The graph is strongly connected')
    else:
        print('The graph is not strongly connected')
```

The time complexity of the above solution is O(n × (n + m)), where `n` is the total number of vertices and `m` is the total number of edges in the graph.

Can we do better?

We can say that G is strongly connected if:

  1. `DFS(G, v)` visits all vertices in the graph `G`, then there exists a path from `v` to every other vertex in `G`, and
  2. There exists a path from every other vertex in `G` to `v`.

Proof:

For `G` to be strongly connected, a path from `x —> y` and `y —> x` should exist for any pair of vertices `(x, y)` in the graph.

If points 1 and 2 are true, we can reach `x —> y` by going from vertex `x` to vertex `v` (from pt. 2), and then from vertex `v` to vertex `y` (from pt. 1).

Similarly, we can reach `y —> x` by going from vertex `y` to vertex `v` (from pt. 2), and then from vertex `v` to vertex `x` (from pt. 1).

Complete Algorithm:

  1. Start `DFS(G, v)` from a random vertex `v` of the graph `G`. If `DFS(G, v)` fails to reach every other vertex in the graph `G`, then there is some vertex `u`, such that there is no directed path from `v` to `u`. Thus, `G` is not strongly connected. If it does reach every vertex, then there is a directed path from `v` to every other vertex in the graph `G`.
  2. Reverse the direction of all edges in the directed graph `G`.
  3. Again, run a DFS starting from vertex `v`. If the DFS fails to reach every vertex, then there is some vertex `u`, such that in the original graph, there is no directed path from `u` to `v`. On the other hand, if it does reach every vertex, then there is a directed path from every vertex `u` to `v` in the original graph.

If `G` passes both DFS, it is strongly connected. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

// A class to represent a graph object
class Graph
{
    public:

    // a vector of vectors to represent an adjacency list
    vector<vector<int>> adjList;

    // Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        adjList.resize(n);

        // add edges to the directed graph
        for (auto &edge: edges) {
            adjList[edge.src].push_back(edge.dest);
        }
    }
};

// Function to perform DFS traversal on the graph on a graph
void DFS(Graph const &graph, int v, vector<bool> &visited)
{
    // mark current node as visited
    visited[v] = true;

    // do for every edge (v, u)
    for (int u: graph.adjList[v])
    {
        // `u` is not visited
        if (!visited[u]) {
            DFS(graph, u, visited);
        }
    }
}

// Function to check if the graph is strongly connected or not
bool isStronglyConnected(Graph const &graph, int n)
{
    // to keep track of whether a vertex is visited or not
    vector<bool> visited(n);

    // choose a random starting point
    int v = 0;

    // run a DFS starting at `v`
    DFS(graph, v, visited);

    // If DFS traversal doesn't visit all vertices,
    // then the graph is not strongly connected
    if (find(visited.begin(), visited.end(), false) != visited.end()) {
        return false;
    }

    // reset visited vector
    fill(visited.begin(), visited.end(), false);

    // Reverse the direction of all edges in the directed graph
    vector<Edge> edges;
    for (int i = 0; i < n; i++)
    {
        for (int j: graph.adjList[i]) {
            edges.push_back({j, i});
        }
    }

    // Create a graph from reversed edges
    Graph gr(edges, n);

    // Again run a DFS starting at `v`
    DFS(gr, v, visited);

    // If DFS traversal doesn't visit all vertices,
    // then the graph is not strongly connected
    if (find(visited.begin(), visited.end(), false) != visited.end()) {
        return false;
    }

    // if a graph "passes" both DFSs, it is strongly connected
    return true;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 4}, {1, 0}, {1, 2}, {2, 1}, {2, 4}, {3, 1}, {3, 2}, {4, 3}
    };

    // total number of nodes in the graph
    int n = 5;

    // build a graph from the given edges
    Graph graph(edges, n);

    // check if the graph is not strongly connected or not
    if (isStronglyConnected(graph, n)) {
        cout << "The graph is strongly connected";
    }
    else {
        cout << "The graph is not strongly connected";
    }

    return 0;
}
```

**Output:** The graph is strongly connected

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

    // Constructor
    Graph(List<Edge> edges, int n)
    {
        adjList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the directed graph
        for (Edge edge: edges)
        {
            int src = edge.source;
            int dest = edge.dest;

            adjList.get(src).add(dest);
        }
    }
}

class Main
{
    // Function to perform DFS traversal on the graph on a graph
    private static void DFS(Graph graph, int v, boolean[] visited)
    {
        // mark current node as visited
        visited[v] = true;

        // do for every edge (v, u)
        for (int u: graph.adjList.get(v))
        {
            // `u` is not visited
            if (!visited[u]) {
                DFS(graph, u, visited);
            }
        }
    }

    // Function to check if the graph is strongly connected or not
    public static boolean isStronglyConnected(Graph graph, int n)
    {
        // to keep track of whether a vertex is visited or not
        boolean[] visited = new boolean[n];

        // choose a random starting point
        int v = 0;

        // run a DFS starting at `v`
        DFS(graph, v, visited);

        // If DFS traversal doesn't visit all vertices,
        // then the graph is not strongly connected
        for (boolean b: visited)
        {
            if (!b) {
                return false;
            }
        }

        // reset visited array
        Arrays.fill(visited, false);

        // Reverse the direction of all edges in the directed graph
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < n; i++)
        {
            for (int j: graph.adjList.get(i)) {
                edges.add(new Edge(j, i));
            }
        }

        // create a graph from reversed edges
        Graph gr = new Graph(edges, n);

        // Again run a DFS starting at `v`
        DFS(gr, v, visited);

        // If DFS traversal doesn't visit all vertices,
        // then the graph is not strongly connected
        for (boolean b: visited)
        {
            if (!b) {
                return false;
            }
        }

        // if a graph "passes" both DFSs, it is strongly connected
        return true;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 4), new Edge(1, 0), new Edge(1, 2),
                new Edge(2, 1), new Edge(2, 4), new Edge(3, 1),
                new Edge(3, 2) , new Edge(4, 3)
        );

        // total number of nodes in the graph
        int n = 5;

        // construct graph
        Graph graph = new Graph(edges, n);

        // check if the graph is not strongly connected or not
        if (isStronglyConnected(graph, n)) {
            System.out.println("The graph is strongly connected");
        }
        else {
            System.out.println("The graph is not strongly connected");
        }
    }
}
```

##

```python3
# A class to represent a graph object
class Graph:
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the directed graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)

# Function to perform DFS traversal on the graph on a graph
def DFS(graph, v, visited):

    # mark current node as visited
    visited[v] = True

    # do for every edge (v, u)
    for u in graph.adjList[v]:
        # `u` is not visited
        if not visited[u]:
            DFS(graph, u, visited)

# Function to check if the graph is strongly connected or not
def isStronglyConnected(graph, n):

    # to keep track of whether a vertex is visited or not
    visited = [False] * n

    # choose a random starting point
    v = 0

    # run a DFS starting at `v`
    DFS(graph, v, visited)

    # If DFS traversal doesn't visit all vertices,
    # then the graph is not strongly connected
    for b in visited:
        if not b:
            return False

    # reset visited list
    visited = [False] * n

    # Reverse the direction of all edges in the
    # directed graph
    edges = [(j, i) for i in range(n) for j in graph.adjList[i]]

    # Create a graph from reversed edges
    gr = Graph(edges, n)

    # Again run a DFS starting at `v`
    DFS(gr, v, visited)

    # If DFS traversal doesn't visit all vertices,
    # then the graph is not strongly connected
    for b in visited:
        if not b:
            return False

    # if the graph "passes" both DFSs, it is strongly connected
    return True

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 4), (1, 0), (1, 2), (2, 1), (2, 4), (3, 1), (3, 2), (4, 3)]

    # total number of nodes in the graph
    n = 5

    # construct graph
    graph = Graph(edges, n)

    # check if the graph is not strongly connected or not
    if isStronglyConnected(graph, n):
        print('The graph is strongly connected')
    else:
        print('The graph is not strongly connected')
```

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**Reference:** [Dr. Naveen Garg, IIT–D (Lecture – 30 Applications of DFS in Directed Graphs)](https://www.youtube.com/watch?v=o6YWEsLslKs)
