# Union–Find Algorithm for cycle detection in a graph

> Source: https://www.techiedelight.com/union-find-algorithm-cycle-detection-graph/

[Graph](https://www.techiedelight.com/Category/Graphs/)

Given an undirected connected graph, check if it contains any cycle or not using the union–find algorithm.

For example, the following graph contains a [cycle](https://techiedelight.com/check-undirected-graph-contains-cycle-not/) `8—9—11—12—8`.

[](https://commons.wikimedia.org/wiki/File%3ADepth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY-SA 3.0 \(https://creativecommons.org/licenses/by-sa/3.0/\)\], via Wikimedia Commons")

> 

**Prerequisite:**

> [Disjoint–Set Data Structure (Union–Find Algorithm)](https://techiedelight.com/disjoint-set-data-structure-union-find-algorithm/)

We strongly recommend going through the above post to get an understanding of how the union–find algorithm works. You can also watch the first 10 mins of [this](https://www.youtube.com/watch?v=UBY4sF86KEY) video to get a clear picture.

Complete Algorithm:

1\. Create disjoint sets for each vertex of the graph. 2\. For every edge u, v in the graph i) Find the root of the sets to which elements u and v belongs. ii) If both u and v have the same root in disjoint sets, a cycle is found.

Following is the implementation of the above algorithm in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
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

        // add edges to the undirected graph (add each edge once only to avoid
        // detecting cycles among the same edges, say x -> y and y -> x)
        for (auto &edge: edges) {
            adjList[edge.src].push_back(edge.dest);
        }
    }
};

// A class to represent a disjoint set
class DisjointSet
{
    unordered_map<int, int> parent;
public:
    // perform MakeSet operation
    void MakeSet(int n)
    {
        // create `n` disjoint sets (one for each vertex)
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    // Find the root of the set in which element `k` belongs
    int Find(int k)
    {
        // if `k` is root
        if (parent[k] == k) {
            return k;
        }

        // recur for the parent until we find the root
        return Find(parent[k]);
    }

    // Perform Union of two subsets
    void Union(int a, int b)
    {
        // find the root of the sets in which elements `x` and `y` belongs
        int x = Find(a);
        int y = Find(b);

        parent[x] = y;
    }
};

// Returns true if the graph has a cycle
bool findCycle(Graph const &graph, int n)
{
    // initialize Main class
    DisjointSet ds;

    // create a singleton set for each element of the universe
    ds.MakeSet(n);

    // consider every edge (u, v)
    for (int u = 0; u < n; u++)
    {
        // Recur for all adjacent vertices
        for (int v: graph.adjList[u])
        {
            // find the root of the sets to which elements `u` and `v` belongs
            int x = ds.Find(u);
            int y = ds.Find(v);

            // if both `u` and `v` have the same parent, the cycle is found
            if (x == y) {
                return true;
            }
            else {
                ds.Union(x, y);
            }
        }
    }

    return false;
}

// Union–find algorithm for cycle detection in a graph
int main()
{
    // vector of graph edges
    vector<Edge> edges =
    {
        {0, 1}, {0, 6}, {0, 7}, {1, 2}, {1, 5}, {2, 3},
        {2, 4}, {7, 8}, {7, 11}, {8, 9}, {8, 10}, {10, 11}
        // edge (10, 11) introduces a cycle in the graph
    };

    // total number of nodes in the graph (labelled from 0 to 11)
    int n = 12;

    // build a graph from the given edges
    Graph graph(edges, n);

    if (findCycle(graph, n)) {
        cout << "Cycle Found";
    }
    else {
        cout << "No Cycle Found";
    }

    return 0;
}
```

**Output:** Cycle Found

##

```java
import java.util.*;

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
        adjList = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            adjList.add(new ArrayList<>());
        }

        // add edges to the undirected graph (add each edge once only to avoid
        // detecting cycles among the same edges, say x -> y and y -> x)
        for (Edge edge: edges) {
            adjList.get(edge.source).add(edge.dest);
        }
    }
}

// A class to represent a disjoint set
class DisjointSet
{
    private Map<Integer, Integer> parent = new HashMap<>();

    // perform MakeSet operation
    public void makeSet(int n)
    {
        // create `n` disjoint sets (one for each vertex)
        for (int i = 0; i < n; i++) {
            parent.put(i, i);
        }
    }

    // Find the root of the set in which element `k` belongs
    public int find(int k)
    {
        // if `k` is root
        if (parent.get(k) == k) {
            return k;
        }

        // recur for the parent until we find the root
        return find(parent.get(k));
    }

    // Perform Union of two subsets
    public void union(int a, int b)
    {
        // find the root of the sets in which elements `x` and `y` belongs
        int x = find(a);
        int y = find(b);

        parent.put(x, y);
    }
}

class Main
{
    // Returns true if the graph has a cycle
    public static boolean findCycle(Graph graph, int n)
    {
        // initialize `DisjointSet` class
        DisjointSet ds = new DisjointSet();

        // create a singleton set for each element of the universe
        ds.makeSet(n);

        // consider every edge (u, v)
        for (int u = 0; u < n; u++)
        {
            // Recur for all adjacent vertices
            for (int v: graph.adjList.get(u))
            {
                // find the root of the sets to which elements `u` and `v` belongs
                int x = ds.find(u);
                int y = ds.find(v);

                // if both `u` and `v` have the same parent, the cycle is found
                if (x == y) {
                    return true;
                }
                else {
                    ds.union(x, y);
                }
            }
        }

        return false;
    }

    // Union–find algorithm for cycle detection in a graph
    public static void main(String[] args)
    {
        // List of graph edges
        List<Edge> edges = Arrays.asList(
                        new Edge(0, 1), new Edge(0, 6), new Edge(0, 7),
                        new Edge(1, 2), new Edge(1, 5), new Edge(2, 3),
                        new Edge(2, 4), new Edge(7, 8), new Edge(7, 11),
                        new Edge(8, 9), new Edge(8, 10), new Edge(10, 11)
                        // edge (10, 11) introduces a cycle in the graph
                    );

        // total number of nodes in the graph (labelled from 0 to 11)
        int n = 12;

        // construct graph
        Graph graph = new Graph(edges, n);

        if (findCycle(graph, n)) {
            System.out.println("Cycle Found");
        }
        else {
            System.out.println("No Cycle is Found");
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
        self.adjList = [[] for _ in range(n)]

        # add edges to the undirected graph (add each edge once only to avoid
        # detecting cycles among the same edges, say x -> y and y -> x)
        for (src, dest) in edges:
            self.adjList[src].append(dest)

# A class to represent a disjoint set
class DisjointSet:

    parent = {}

    # perform MakeSet operation
    def makeSet(self, n):

        # create `n` disjoint sets (one for each vertex)
        for i in range(n):
            self.parent[i] = i

    # Find the root of the set in which element `k` belongs
    def find(self, k):

        # if `k` is root
        if self.parent[k] == k:
            return k

        # recur for the parent until we find the root
        return self.find(self.parent[k])

    # Perform Union of two subsets
    def union(self, a, b):

        # find the root of the sets in which elements `x` and `y` belongs
        x = self.find(a)
        y = self.find(b)

        self.parent[x] = y

# Returns true if the graph has a cycle
def findCycle(graph, n):

    # initialize `DisjointSet` class
    ds = DisjointSet()

    # create a singleton set for each element of the universe
    ds.makeSet(n)

    # consider every edge (u, v)
    for u in range(n):

        # Recur for all adjacent vertices
        for v in graph.adjList[u]:

            # find the root of the sets to which elements `u` and `v` belongs
            x = ds.find(u)
            y = ds.find(v)

            # if both `u` and `v` have the same parent, the cycle is found
            if x == y:
                return True
            else:
                ds.union(x, y)

    return False

# Union–find algorithm for cycle detection in a graph
if __name__ == '__main__':

    edges = [
        (0, 1), (0, 6), (0, 7), (1, 2), (1, 5), (2, 3),
        (2, 4), (7, 8), (7, 11), (8, 9), (8, 10), (10, 11)
        # edge (10, 11) introduces a cycle in the graph
    ]

    # total number of nodes in the graph (labelled from 0 to 11)
    n = 12

    # construct graph
    graph = Graph(edges, n)

    if findCycle(graph, n):
        print('Cycle Found')
    else:
        print('No Cycle is Found')
```

The time complexity of the Union and Find operation is O(n) in the worst case, where `n` is the total number of vertices in the graph. Please refer to the implementation of Find and Union discussed in the [original post](https://techiedelight.com/disjoint-set-data-structure-union-find-algorithm/) for improving the overall time complexity of the algorithm.

**Also see:**

> [Check if an undirected graph contains a cycle or not](https://techiedelight.com/check-undirected-graph-contains-cycle-not/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 216

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
