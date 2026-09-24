# Kahn’s Topological Sort Algorithm

> Source: https://www.techiedelight.com/kahn-topological-sort-algorithm/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given a directed acyclic graph (DAG), print it in Topological order using Kahn’s topological sort algorithm. If the DAG has more than one topological ordering, print any of them. If the graph is not DAG, report that as well.

A [Topological sort](https://techiedelight.com/topological-sorting-dag/) or Topological ordering of a directed graph is a linear ordering of its vertices such that for every directed edge `uv` from vertex `u` to vertex `v`, `u` comes before `v` in the ordering. Topological order is possible if and only if the graph has no directed cycles, i.e. if the graph is DAG.

For example, consider the following graph:

The above graph has many valid topological ordering of vertices like,

7 5 3 1 4 2 0 6 7 5 1 2 3 4 0 6 5 7 3 1 0 2 6 4 3 5 7 0 1 2 6 4 5 7 3 0 1 4 6 2 7 5 1 3 4 0 6 2 5 7 1 2 3 0 6 4 3 7 0 5 1 4 2 6 … and many more

Note that for every directed edge `u —> v`, `u` comes before `v` in the ordering. For example, the pictorial representation of the topological order `[7, 5, 3, 1, 4, 2, 0, 6]` is:

> 

In the [previous post](https://techiedelight.com/topological-sorting-dag/), we have seen how to print the topological order of a graph using the [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) algorithm. In this post, Kahn’s topological sort algorithm is introduced, which provides an efficient way to print the topological order.

Kahn’s topological sort algorithm works by finding vertices with no incoming edges and removing all outgoing edges from these vertices. Following is a pseudocode for Kahn’s topological sort algorithm taken from [Wikipedia](https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm):

**Kahn’s–Algorithm (graph)** L —> An empty list that will contain the sorted elements S —> A set of all vertices with no incoming edges (i.e., having indegree 0) while S is non-empty do remove a vertex n from S add n to tail of L for each vertex m with an edge e from n to m do remove edge e from the graph if m has no other incoming edges, then insert m into S insert m into S if graph has edges then return report “graph has at least one cycle” else return L “a topologically sorted order”

Note that a DAG has at least one such vertex which has no incoming edges.

How can we remove an edge from the graph or check if a vertex has no other incoming edge in _constant_ time?

The idea is to maintain in-degree information of all graph vertices in a map or an array , say `indegree[]`, for constant-time operations. Here, `indegree[m]` will store the total number of incoming edges to vertex `m`.

  * If vertex `m` has no incoming edge and is ready to get processed, its indegree will be 0, i.e., `indegree[m] = 0`.
  * To remove an edge from `n` to `m` from the graph, we decrement `indegree[m]` by 1.

Following is the C++, Java, and Python implementation of Kahn’s topological sort algorithm:

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

    // stores indegree of a vertex
    vector<int> indegree;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        adjList.resize(n);

        // initialize indegree
        vector<int> temp(n, 0);
        indegree = temp;

        // add edges to the directed graph
        for (auto &edge: edges)
        {
            // add an edge from source to destination
            adjList[edge.src].push_back(edge.dest);

            // increment in-degree of destination vertex by 1
            indegree[edge.dest]++;
        }
    }
};

// Function to perform a topological sort on a given DAG
vector<int> doTopologicalSort(Graph const &graph)
{
    vector<int> L;

    // get the total number of nodes in the graph
    int n = graph.adjList.size();

    vector<int> indegree = graph.indegree;

    // Set of all nodes with no incoming edges
    vector<int> S;
    for (int i = 0; i < n; i++)
    {
        if (!indegree[i]) {
            S.push_back(i);
        }
    }

    while (!S.empty())
    {
        // remove node `n` from `S`
        int n = S.back();
        S.pop_back();

        // add `n` at the tail of `L`
        L.push_back(n);

        for (int m: graph.adjList[n])
        {
            // remove an edge from `n` to `m` from the graph
            indegree[m] -= 1;

            // if `m` has no other incoming edges, insert `m` into `S`
            if (!indegree[m]) {
                S.push_back(m);
            }
        }
    }

    // if a graph has edges, then the graph has at least one cycle
    for (int i = 0; i < n; i++)
    {
        if (indegree[i]) {
            return {};
        }
    }

    return L;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges =
    {
        { 0, 6 }, { 1, 2 }, { 1, 4 }, { 1, 6 }, { 3, 0 }, { 3, 4 },
        { 5, 1 }, { 7, 0 }, { 7, 1 }
    };

    // total number of nodes in the graph (labelled from 0 to 7)
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    // Perform topological sort
    vector<int> L = doTopologicalSort(graph);

    // print topological order
    if (L.size()) {
        for (int i: L) {
            cout << i << " ";
        }
    } else {
        cout << "Graph has at least one cycle. Topological sorting is not possible";
    }

    return 0;
}
```

**Output:** 7 5 1 2 3 4 0 6

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    int src, dest;

    public Edge(int src, int dest)
    {
        this.src = src;
        this.dest = dest;
    }
}

// A class to represent a graph object
class Graph
{
    // A list of lists to represent an adjacency list
    List<List<Integer>> adjList = null;

    // stores indegree of a vertex
    List<Integer> indegree = null;

    // Constructor
    Graph(List<Edge> edges, int n)
    {
        adjList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // initialize indegree of each vertex by 0
        indegree = new ArrayList<>(Collections.nCopies(n, 0));

        // add edges to the directed graph
        for (Edge edge: edges)
        {
            int src = edge.src;
            int dest = edge.dest;

            // add an edge from source to destination
            adjList.get(src).add(dest);

            // increment in-degree of destination vertex by 1
            indegree.set(dest, indegree.get(dest) + 1);
        }
    }
}

class Main
{
    // Function to perform a topological sort on a given DAG
    public static List<Integer> doTopologicalSort(Graph graph, int n)
    {
        // list to store the sorted elements
        List<Integer> L = new ArrayList<>();

        // get in-degree information of the graph
        List<Integer> indegree = graph.indegree;

        // Set of all nodes with no incoming edges
        Stack<Integer> S = new Stack<>();
        for (int i = 0; i < n; i++)
        {
            if (indegree.get(i) == 0) {
                S.add(i);
            }
        }

        while (!S.isEmpty())
        {
            // remove node `i` from `S`
            int i = S.pop();

            // add `i` at the tail of `L`
            L.add(i);

            for (int m: graph.adjList.get(i))
            {
                // remove an edge from `n` to `m` from the graph
                indegree.set(m, indegree.get(m) - 1);

                // if `m` has no other incoming edges, insert `m` into `S`
                if (indegree.get(m) == 0) {
                    S.add(m);
                }
            }
        }

        // if a graph has edges, then the graph has at least one cycle
        for (int i = 0; i < n; i++)
        {
            if (indegree.get(i) != 0) {
                return null;
            }
        }

        return L;
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

        // Perform topological sort
        List<Integer> L = doTopologicalSort(graph, n);

        if (L != null) {
            System.out.print(L);    // print topological order
        }
        else {
            System.out.println("Graph has at least one cycle. " +
                    "Topological sorting is not possible");
        }
    }
}
```

##

```python3
from collections import deque

# A class to represent a graph object
class Graph:

    # stores indegree of a vertex
    indegree = None

    # Constructor
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # initialize indegree of each vertex by 0
        self.indegree = [0] * n

        # add edges to the directed graph
        for (src, dest) in edges:

            # add an edge from source to destination
            self.adjList[src].append(dest)

            # increment in-degree of destination vertex by 1
            self.indegree[dest] = self.indegree[dest] + 1

# Function to perform a topological sort on a given DAG
def doTopologicalSort(graph, n):

    # list to store the sorted elements
    L = []

    # get in-degree information of the graph
    indegree = graph.indegree

    # Set of all nodes with no incoming edges
    S = deque([i for i in range(n) if indegree[i] == 0])

    while S:

        # remove node `n` from `S`
        n = S.pop()

        # add `n` at the tail of `L`
        L.append(n)

        for m in graph.adjList[n]:

            # remove an edge from `n` to `m` from the graph
            indegree[m] = indegree[m] - 1

            # if `m` has no other incoming edges, insert `m` into `S`
            if indegree[m] == 0:
                S.append(m)

    # if a graph has edges, then the graph has at least one cycle
    for i in range(n):
        if indegree[i]:
            return None

    return L

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [(0, 6), (1, 2), (1, 4), (1, 6), (3, 0), (3, 4), (5, 1), (7, 0), (7, 1)]

    # total number of nodes in the graph (labelled from 0 to 7)
    n = 8

    # build a graph from the given edges
    graph = Graph(edges, n)

    # Perform topological sort
    L = doTopologicalSort(graph, n)

    if L:
        print(L)    # print topological order
    else:
        print('Graph has at least one cycle. Topological sorting is not possible.')
```

The time complexity of Kahn’s topological sort algorithm is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**References:** <https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm>

Also See:

> [Find all Possible Topological Orderings of a DAG](https://www.techiedelight.com/find-all-possible-topological-orderings-of-dag/ "Find all Possible Topological Orderings of a DAG")

> [Topological Sort Algorithm for DAG](https://www.techiedelight.com/topological-sorting-dag/ "Topological Sort Algorithm for DAG")

> [Find the cost of the shortest path in DAG using one pass of Bellman–Ford](https://www.techiedelight.com/cost-of-shortest-path-in-dag-using-one-pass-of-bellman-ford/ "Find the cost of the shortest path in DAG using one pass of Bellman–Ford")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.39/5. Vote count: 76

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
