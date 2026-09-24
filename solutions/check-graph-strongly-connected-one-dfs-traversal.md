# Check if a graph is strongly connected or not using one DFS Traversal

> Source: https://www.techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a directed graph, check if it is strongly connected or not. A directed graph is said to be strongly connected if every vertex is reachable from every other vertex.

For example, the following graph is strongly connected as a path exists between all pairs of vertices:

**Prerequisite:**

> [Arrival and departure time of vertices in DFS](https://techiedelight.com/arrival-departure-time-vertices-dfs/)

> [Types of edges involved in DFS and relation between them](https://techiedelight.com/types-edges-involved-dfs-relation/)

> 

In the [previous post](https://techiedelight.com/check-given-graph-strongly-connected-not/), we have discussed a solution that requires two [DFS](https://techiedelight.com/depth-first-search/) traversals of a graph. We can check if the graph is strongly connected or not by doing only **one DFS traversal on the graph**.

When we do a DFS from a vertex `v` in a directed graph, there could be many edges going out of its subtree. When we say subtree rooted at `v`, we mean all `v's` descendants, including the vertex itself. The edges going out of the subtree will either be a back edge or a cross edge. Forward edges cannot be going out of the subtree as they can only be coming into the subtree, or if it starts from within the subtree, it will go within the subtree only.

**We can say that the graph is strongly connected if and only if for every edge`u —> v` in the graph, there is at least one back-edge or cross-edge that is going out of the subtree rooted at `v`.**

How should we modify DFS so that we can check if there is an out-edge going out of every subtree?

We can modify DFS such that `DFS(v)` returns the smallest arrival time to which there is an out-edge from the subtree rooted at `v`. For example, let `arrival(v)` be the arrival time of vertex `v` in the DFS. Then if there is an edge out of the subtree rooted at `v`, it is to something visited before `v` and therefore with a smaller arrival value.

Remember for a back edge or a cross edge, `u —> v`, `arrival[u] > arrival[v]`.

Suppose there are four edges going out of the subtree rooted at `v` to vertex `a`, `b`, `c`, and `d` with arrival time `arrival(a)`, `arrival(b)`, `arrival(c)`, and `arrival(d)`, respectively. We look at their arrival times and consider the smallest among them. That will be the value returned by `DFS(v)`, i.e., `DFS(v)` returns minimum `min` of `arrival(a), arrival(b), arrival(c)` and `arrival(d)`. But before returning, we have to check that `min` is less than the `arrival(v)`. If `min` is less than the `arrival(v)`, then that means that at least one back-edge or cross edge is going out of the subtree rooted at `v`. If not, then we can stop the procedure and say that the graph is not strongly connected.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Data structure to store a graph edge
struct Edge {
    int src, dest;
};

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

// Perform DFS on the graph starting from vertex `v`
int DFS(Graph const &graph, int v, vector<bool> &discovered,
    vector<int> &arrival, bool &isSC, int &time)
{
    // terminate the search if the graph is not strongly connected
    if (!isSC) {
        return 0;
    }

    // set the arrival time of vertex `v`
    arrival[v] = ++time;

    // mark vertex as discovered
    discovered[v] = true;

    // initialize `arr` to the arrival time of vertex `v`
    int arr = arrival[v];

    // do for every edge (v, w)
    for (int w: graph.adjList[v])
    {
        // vertex `w` is not yet explored
        if (!discovered[w]) {
            arr = min(arr, DFS(graph, w, discovered, arrival, isSC, time));
        }
        // vertex `w` is explored before
        else {
            // If the vertex is `w` is already discovered, there must be
            // either a cross edge or a back edge starting from `v`.
            // Note that the arrival time is already defined for `w`.
            arr = min(arr, arrival[w]);
        }
    }

    // if `v` is not a root node and the value of `arr` didn't
    // change, i.e., it is still set to the arrival time of
    // vertex `v`, the graph is not strongly connected
    if (v != 0 && arr == arrival[v]) {
        isSC = false;
    }

    // we return the minimum arrival time
    return arr;
}

// Function to check if the graph is strongly connected or not
bool isStronglyConnected(Graph const &graph, int n)
{
    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // array to store the arrival time of vertex
    vector<int> arrival(n);

    // flag to determine if a graph is strongly connected or not
    bool isSC = true;
    int time = -1;

    // Perform DFS traversal starting from the first vertex.
    DFS(graph, 0, discovered, arrival, isSC, time);

    // If DFS traversal doesn't visit all vertices,
    // then the graph is not strongly connected
    for (int i = 0; i < n; i++)
    {
        if (discovered[i] == false) {
            isSC = false;
        }
    }

    return isSC;
}

// Check if the given graph is strongly connected or not
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
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

// A class to store a graph edge
class Edge
{
    public int source, dest;

    private Edge(int source, int dest)
    {
        this.source = source;
        this.dest = dest;
    }

    // Factory method for creating an immutable instance of `Edge`
    public static Edge of(int a, int b) {
        return new Edge(a, b);        // calls private constructor
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
    // Perform DFS on the graph starting from vertex `v`
    public static int DFS(Graph graph, int v, boolean[] discovered,
                        int[] arrival, AtomicBoolean isSC, AtomicInteger time)
    {
        // terminate the search if the graph is not strongly connected
        if (!isSC.get()) {
            return 0;
        }

        // set the arrival time of vertex `v`
        arrival[v] = time.incrementAndGet();

        // mark vertex as discovered
        discovered[v] = true;

        // initialize `arr` to the arrival time of vertex `v`
        int arr = arrival[v];

        // do for every edge (v, w)
        for (int w: graph.adjList.get(v))
        {
            // vertex `w` is not yet explored
            if (!discovered[w]) {
                arr = Math.min(arr, DFS(graph, w, discovered, arrival, isSC, time));
            }
            // vertex `w` is explored before
            else {
                // If the vertex is `w` is already discovered, there must
                // be either a cross edge or a back edge starting from `v`.
                // Note that the arrival time is already defined for `w`.
                arr = Math.min(arr, arrival[w]);
            }
        }

        // if `v` is not a root node and the value of `arr` didn't
        // change, i.e., it is still set to the arrival time of
        // vertex `v`, the graph is not strongly connected
        if (v != 0 && arr == arrival[v]) {
            isSC.set(false);
        }

        // we return the minimum arrival time
        return arr;
    }

    // Check if the graph is strongly connected or not
    public static boolean isStronglyConnected(Graph graph, int n)
    {
        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // array to store the arrival time of vertex
        int[] arrival = new int[n];

        // flag to determine if a graph is strongly connected or not
        AtomicBoolean isSC = new AtomicBoolean(true);
        AtomicInteger time = new AtomicInteger(-1);

        // Perform DFS traversal starting from the first vertex.
        DFS(graph, 0, discovered, arrival, isSC, time);

        // If DFS traversal doesn't visit all vertices,
        // then the graph is not strongly connected
        for (int i = 0; i < n; i++)
        {
            if (!discovered[i]) {
                isSC.set(false);
            }
        }

        return isSC.get();
    }

    // Check if the given graph is strongly connected or not
    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(Edge.of(0, 4), Edge.of(1, 0),
                        Edge.of(1, 2), Edge.of(2, 1), Edge.of(2, 4),
                        Edge.of(3, 1), Edge.of(3, 2), Edge.of(4, 3)
                    );

        // total number of nodes in the graph
        int n = 5;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

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

# Perform DFS on the graph starting from vertex `v`
def DFS(graph, v, discovered, arrival, isSC, time):

    # terminate the search if the graph is not strongly connected
    if not isSC:
        return 0, isSC, time

    time = time + 1

    # set the arrival time of vertex `v`
    arrival[v] = time

    # mark vertex as discovered
    discovered[v] = True

    # initialize list to the arrival time of vertex `v`
    arr = arrival[v]

    # do for every edge (v, w)
    for w in graph.adjList[v]:

        # vertex `w` is not yet explored
        if not discovered[w]:
            _arr, isSC, time = DFS(graph, w, discovered, arrival, isSC, time)
            arr = min(arr, _arr)
        # vertex `w` is explored before
        else:
            # If the vertex is `w` is already discovered, there must be
            # either a cross edge or a back edge starting from `v`.
            # Note that the arrival time is already defined for `w`
            arr = min(arr, arrival[w])

    # if `v` is not a root node and the value of `arr` didn't change,
    # i.e., it is still set to the arrival time of vertex `v`,
    # the graph is not strongly connected
    if v and arr == arrival[v]:
        isSC = False

    # we return the minimum arrival time
    return arr, isSC, time

# Check if the graph is strongly connected or not
def isStronglyConnected(graph, n):

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # list to store the arrival time of vertex
    arrival = [0] * n

    # flag to determine if a graph is strongly connected or not
    isSC = True
    time = -1

    # Perform DFS traversal starting from the first vertex
    isSC = DFS(graph, 0, discovered, arrival, isSC, time)[1]

    # If DFS traversal doesn't visit all vertices,
    # then the graph is not strongly connected
    for i in range(n):
        if not discovered[i]:
            isSC = False

    return isSC

# Check if the given graph is strongly connected or not
if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 4), (1, 0), (1, 2), (2, 1), (2, 4), (3, 1), (3, 2), (4, 3)]

    # total number of nodes in the graph
    n = 5

    # build a graph from the given edges
    graph = Graph(edges, n)

    if isStronglyConnected(graph, n):
        print('The graph is strongly connected')
    else:
        print('The graph is not strongly connected')
```

The time complexity of the above solution is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively. Please note that O(E) may vary between O(1) and O(V2), depending on how dense the graph is.

**Reference:** [Dr. Naveen Garg, IIT–D (Lecture – 30 Applications of DFS in Directed Graphs)](https://www.youtube.com/watch?v=o6YWEsLslKs)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
