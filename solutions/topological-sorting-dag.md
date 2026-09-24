# Topological Sort Algorithm for DAG

> Source: https://www.techiedelight.com/topological-sorting-dag/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a Directed Acyclic Graph (DAG), print it in topological order using topological sort algorithm. If the graph has more than one topological ordering, output any of them. Assume valid Directed Acyclic Graph (DAG).

A [Topological sort](https://techiedelight.com/topological-sorting-dag/) or Topological ordering of a directed graph is a linear ordering of its vertices such that for every directed edge `uv` from vertex `u` to vertex `v`, `u` comes before `v` in the ordering. A topological ordering is possible if and only if the graph has no directed cycles, i.e. if the graph is DAG.

For example, consider the following graph:

The graph has many valid topological ordering of vertices like,

5 7 3 1 0 2 6 4 3 5 7 0 1 2 6 4 5 7 3 0 1 4 6 2 7 5 1 3 4 0 6 2 5 7 1 2 3 0 6 4 3 7 0 5 1 4 2 6 … etc.

Note that for every directed edge `u —> v`, `u` comes before `v` in the ordering.

> 

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to implement topological sort algorithm. _The idea is to order the vertices in order of their decreasing[departure time of vertices in DFS](https://techiedelight.com/arrival-departure-time-vertices-dfs/), and we will get our desired topological sort._

How does it work?

We have already discussed the relationship between all four types of edges involved in the DFS in the [previous post](https://techiedelight.com/types-edges-involved-dfs-relation/). Following is the relationship we have seen between the departure time for different types of edges involved in a DFS of the directed graph:

Tree edge (u, v): departure[u] > departure[v] Back edge (u, v): departure[u] < departure[v] Forward edge (u, v): departure[u] > departure[v] Cross edge (u, v): departure[u] > departure[v]

As we can see that for a tree edge, forward edge, or cross edge `(u, v)`, `departure[u]` is more than `departure[v]`. But only for the back edge, relationship `departure[u] < departure[v]` is true. So, it is guaranteed that if an edge `(u, v)` has `departure[u] > departure[v]`, it’s not a back-edge.

We know that **in a DAG, no back-edge is present**. So if we order the vertices in order of their decreasing departure time, we will get the topological order of the graph (**every edge going from left to right**).

Following is the C++, Java, and Python implementation of the topological sort algorithm:

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

// Perform DFS on the graph and set the departure time of all
// vertices of the graph
void DFS(Graph const &graph, int v, vector<bool>
    &discovered, vector<int> &departure, int &time)
{
    // mark the current node as discovered
    discovered[v] = true;

    // set the arrival time of vertex `v`
    time++;

    // do for every edge (v, u)
    for (int u: graph.adjList[v])
    {
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

// Function to perform a topological sort on a given DAG
void doTopologicalSort(Graph const &graph, int n)
{
    // departure[] stores the vertex number using departure time as an index
    vector<int> departure(2*n, -1);

    /* If we had done it the other way around, i.e., fill the array
       with departure time using vertex number as an index, we would
       need to sort it later */

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

    // Print the vertices in order of their decreasing
    // departure time in DFS, i.e., in topological order
    for (int i = 2*n - 1; i >= 0; i--)
    {
        if (departure[i] != -1) {
            cout << departure[i] << " ";
        }
    }
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges =
    {
        {0, 6}, {1, 2}, {1, 4}, {1, 6}, {3, 0}, {3, 4}, {5, 1}, {7, 0}, {7, 1}
    };

    // total number of nodes in the graph (labelled from 0 to 7)
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    // perform topological sort
    doTopologicalSort(graph, n);

    return 0;
}
```

**Output:** 7 5 3 1 4 2 0 6

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
        // allocate memory
        adjList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the directed graph
        for (Edge edge: edges)
        {
            int src = edge.source;
            int dest = edge.dest;

            // add an edge from source to destination
            adjList.get(src).add(dest);
        }
    }
}

class Main
{
    // Perform DFS on the graph and set the departure time of all
    // vertices of the graph
    static int DFS(Graph graph, int v, boolean[] discovered,
                   int[] departure, int time)
    {
        // mark the current node as discovered
        discovered[v] = true;

        // set the arrival time of vertex `v`
        time++;

        // do for every edge (v, u)
        for (int u: graph.adjList.get(v))
        {
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

    // Function to perform a topological sort on a given DAG
    public static void doTopologicalSort(Graph graph, int n)
    {
        // departure[] stores the vertex number using departure time as an index
        int[] departure = new int[2*n];
        Arrays.fill(departure, -1);

        /* If we had done it the other way around, i.e., fill the array
           with departure time using vertex number as an index, we would
           need to sort it later */

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

        // Print the vertices in order of their decreasing
        // departure time in DFS, i.e., in topological order
        for (int i = 2*n - 1; i >= 0; i--)
        {
            if (departure[i] != -1) {
                System.out.print(departure[i] + " ");
            }
        }
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                new Edge(0, 6), new Edge(1, 2), new Edge(1, 4),
                new Edge(1, 6), new Edge(3, 0), new Edge(3, 4),
                new Edge(5, 1), new Edge(7, 0), new Edge(7, 1)
        );

        // total number of nodes in the graph (labelled from 0 to 7)
        int n = 8;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // perform topological sort
        doTopologicalSort(graph, n);
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

            # add an edge from source to destination
            self.adjList[src].append(dest)

# Perform DFS on the graph and set the departure time of all
# vertices of the graph
def DFS(graph, v, discovered, departure, time):

    # mark the current node as discovered
    discovered[v] = True

    # set the arrival time of vertex `v`
    time = time + 1

    # do for every edge (v, u)
    for u in graph.adjList[v]:
        # if `u` is not yet discovered
        if not discovered[u]:
            time = DFS(graph, u, discovered, departure, time)

    # ready to backtrack
    # set departure time of vertex `v`
    departure[time] = v
    time = time + 1

    return time

# Function to perform a topological sort on a given DAG
def doTopologicalSort(graph, n):

    # departure[] stores the vertex number using departure time as an index
    departure = [-1] * 2 * n

    ''' If we had done it the other way around, i.e., fill the array
        with departure time using vertex number as an index, we would
        need to sort it later '''

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n
    time = 0

    # perform DFS on all undiscovered vertices
    for i in range(n):
        if not discovered[i]:
            time = DFS(graph, i, discovered, departure, time)

    # Print the vertices in order of their decreasing
    # departure time in DFS, i.e., in topological order
    for i in reversed(range(2*n)):
        if departure[i] != -1:
            print(departure[i], end=' ')

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 6), (1, 2), (1, 4), (1, 6), (3, 0), (3, 4), (5, 1), (7, 0), (7, 1)]

    # total number of nodes in the graph (labelled from 0 to 7)
    n = 8

    # build a graph from the given edges
    graph = Graph(edges, n)

    # perform topological sort
    doTopologicalSort(graph, n)
```

The time complexity of the above implementation is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**Also See:**

> [Kahn’s Topological Sort Algorithm](https://techiedelight.com/kahn-topological-sort-algorithm/)

**References:**

1\. [Topological sorting – Wikipedia](https://en.wikipedia.org/wiki/Topological_sorting)

2\. [Dr. Naveen Garg, IIT–D (Lecture – 29 DFS in Directed Graphs)](https://www.youtube.com/watch?v=Lw5rRctO9js)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
