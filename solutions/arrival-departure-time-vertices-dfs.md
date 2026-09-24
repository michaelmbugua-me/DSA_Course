# Arrival and departure time of vertices in DFS

> Source: https://www.techiedelight.com/arrival-departure-time-vertices-dfs/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a graph, find the arrival and departure time of its vertices in DFS. The arrival time is the time at which the vertex was explored for the first time in the DFS, and departure time is the time at which we have explored all the neighbors of the vertex, and we are ready to backtrack.

The following directed graph has two connected components. The right-hand side shows the arrival and departure time of vertices when DFS starts from vertex 0.

The idea is to run [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/). Before exploring any adjacent nodes of any vertex in DFS, note the vertex’s arrival time. After exploring all adjacent nodes of the vertex, note its departure time. After the DFS call is over (i.e., all the graph vertices are discovered), print the vertices’ arrival and departure time.

Please note that the arrival and departure time of vertices may vary depending upon the insertion order of edges in the graph and starting node of DFS. Following is the implementation in C++, Java, and Python based on the above idea:

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
int DFS(Graph const &graph, int v, vector<bool> &discovered,
    vector<int> &arrival, vector<int> &departure, int &time)
{
    // set the arrival time of vertex `v`
    arrival[v] = ++time;

    // mark vertex as discovered
    discovered[v] = true;

    for (int i: graph.adjList[v])
    {
        if (!discovered[i]) {
            DFS(graph, i, discovered, arrival, departure, time);
        }
    }

    // set departure time of vertex `v`
    departure[v] = ++time;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 1}, {0, 2}, {2, 3}, {2, 4}, {3, 1}, {3, 5}, {4, 5}, {6, 7}
    };

    // total number of nodes in the graph (labelled from 0 to 7)
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    // vector to store the arrival time of vertex
    vector<int> arrival(n);

    // vector to store the departure time of vertex
    vector<int> departure(n);

    // mark all the vertices as not discovered
    vector<bool> discovered(n);
    int time = -1;

    // Perform DFS traversal from all undiscovered nodes to
    // cover all unconnected components of a graph
    for (int i = 0; i < n; i++)
    {
        if (!discovered[i]) {
            DFS(graph, i, discovered, arrival, departure, time);
        }
    }

    // print arrival and departure time of each vertex in DFS
    for (int i = 0; i < n; i++) {
        cout << "Vertex " << i << " (" << arrival[i] << ", " << departure[i] << ")\n";
    }

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
        for (Edge edge: edges) {
            adjList.get(edge.source).add(edge.dest);
        }
    }
}

class Main
{
    // Function to perform DFS traversal on the graph on a graph
    public static int DFS(Graph graph, int v, boolean[] discovered,
                    int[] arrival, int[] departure, int time)
    {
        // set the arrival time of vertex `v`
        arrival[v] = ++time;

        // mark vertex as discovered
        discovered[v] = true;

        for (int i: graph.adjList.get(v))
        {
            if (!discovered[i]) {
                time = DFS(graph, i, discovered, arrival, departure, time);
            }
        }

        // set departure time of vertex `v`
        departure[v] = ++time;

        return time;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 1), new Edge(0, 2), new Edge(2, 3), new Edge(2, 4),
                new Edge(3, 1), new Edge(3, 5), new Edge(4, 5), new Edge(6, 7)
        );

        // total number of nodes in the graph (labelled from 0 to 7)
        int n = 8;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // array to store the arrival time of vertex
        int[] arrival = new int[n];

        // array to store the departure time of vertex
        int[] departure = new int[n];

        // mark all the vertices as not discovered
        boolean[] discovered = new boolean[n];
        int time = -1;

        // Perform DFS traversal from all undiscovered nodes to
        // cover all unconnected components of a graph
        for (int i = 0; i < n; i++)
        {
            if (!discovered[i]) {
                time = DFS(graph, i, discovered, arrival, departure, time);
            }
        }

        // print arrival and departure time of each vertex in DFS
        for (int i = 0; i < n; i++)
        {
            System.out.println("Vertex " + i + " (" + arrival[i] + ", " +
                departure[i] + ")");
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
def DFS(graph, v, discovered, arrival, departure, time):

    time = time + 1

    # set the arrival time of vertex `v`
    arrival[v] = time

    # mark vertex as discovered
    discovered[v] = True

    for i in graph.adjList[v]:
        if not discovered[i]:
            time = DFS(graph, i, discovered, arrival, departure, time)

    time = time + 1

    # set departure time of vertex `v`
    departure[v] = time

    return time

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 1), (0, 2), (2, 3), (2, 4), (3, 1), (3, 5), (4, 5), (6, 7)]

    # total number of nodes in the graph (labelled from 0 to 7)
    n = 8

    # build a graph from the given edges
    graph = Graph(edges, n)

    # list to store the arrival time of vertex
    arrival = [None] * n

    # list to store the departure time of vertex
    departure = [None] * n

    # mark all the vertices as not discovered
    discovered = [False] * n
    time = -1

    # Perform DFS traversal from all undiscovered nodes to
    # cover all unconnected components of a graph
    for i in range(n):
        if not discovered[i]:
            time = DFS(graph, i, discovered, arrival, departure, time)

    # print arrival and departure time of each vertex in DFS
    for i in range(n):
        print(f'Vertex {i}', (arrival[i], departure[i]))
```

**Output:** Vertex 0 (0, 11) Vertex 1 (1, 2) Vertex 2 (3, 10) Vertex 3 (4, 7) Vertex 4 (8, 9) Vertex 5 (5, 6) Vertex 6 (12, 15) Vertex 7 (13, 14)

The time complexity of DFS traversal is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

Applications of finding Arrival and Departure Time:

  * [Topological sorting](https://techiedelight.com/topological-sorting-dag/) in a DAG(Directed Acyclic Graph).
  * Finding 2/3–(edge or vertex)–connected components.
  * Finding [bridges in graphs](https://techiedelight.com/2-edge-connectivity-graph/).
  * Finding biconnectivity in graphs.
  * Detecting cycle in directed graphs.
  * Tarjan’s algorithm to find [strongly connected components](https://techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/), and many more…

We have covered all these topics in separate posts.

Also See:

> [Check if a graph is strongly connected or not using one DFS Traversal](https://www.techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/ "Check if a graph is strongly connected or not using one DFS Traversal")

> [Types of edges involved in DFS and relation between them](https://www.techiedelight.com/types-edges-involved-dfs-relation/ "Types of edges involved in DFS and relation between them")

> [Check if a digraph is a DAG (Directed Acyclic Graph) or not](https://www.techiedelight.com/check-given-digraph-dag-directed-acyclic-graph-not/ "Check if a digraph is a DAG \(Directed Acyclic Graph\) or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 144

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Easy](https://www.techiedelight.com/Tags/easy/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
