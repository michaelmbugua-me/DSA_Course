# Find the path between given vertices in a directed graph

> Source: https://www.techiedelight.com/find-path-between-vertices-directed-graph/

Given a directed graph and two vertices (say source and destination vertex), determine if the destination vertex is reachable from the source vertex or not. If a path exists from the source vertex to the destination vertex, print it.

For example, there exist two paths `[0—3—4—6—7]` and `[0—3—5—6—7]` from vertex `0` to vertex `7` in the following graph. In contrast, there is no path from vertex `7` to any other vertex.

> 

We can use the [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) algorithm to check the connectivity between any two vertices in the graph efficiently. The idea is to start the BFS routine from the source vertex and check if the destination vertex is reached during the traversal. If the destination vertex is not encountered at any point, we can say that it’s not reachable from the source vertex.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
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
    // a vector of vectors to represent an adjacency list in C++
    vector<vector<int>> adjList;

    // Graph Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements each of type `vector<int>`
        adjList.resize(n);

        // add edges to the directed graph
        for (auto &edge: edges) {
            adjList[edge.src].push_back(edge.dest);
        }
    }
};

// Function to perform BFS traversal from a given source vertex in a graph to
// determine if a destination vertex is reachable from the source or not
bool isReachable(Graph const &graph, int src, int dest)
{
    // get the total number of nodes in the graph
    int n = graph.adjList.size();

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // create a queue for doing BFS
    queue<int> q;

    // mark the source vertex as discovered
    discovered[src] = true;

    // enqueue source vertex
    q.push(src);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and print it
        int v = q.front();
        q.pop();

        // if destination vertex is found
        if (v == dest) {
            return true;
        }

        // do for every edge (v, u)
        for (int u: graph.adjList[v])
        {
            if (!discovered[u])
            {
                // mark it as discovered and enqueue it
                discovered[u] = true;
                q.push(u);
            }
        }
    }

    return false;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 3}, {1, 0}, {1, 2}, {1, 4}, {2, 7}, {3, 4},
        {3, 5}, {4, 3}, {4, 6}, {5, 6}, {6, 7}
    };

    // total number of nodes in the graph (labeled from 0 to 7)
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    // source and destination vertex
    int src = 0, dest = 7;

    // perform BFS traversal from the source vertex to check the connectivity
    if (isReachable(graph, src, dest)) {
        cout << "Path exists from vertex " << src << " to vertex " << dest;
    }
    else {
        cout << "No path exists between vertices " << src << " and " << dest;
    }

    return 0;
}
```

**Output:** Path exists from vertex 0 to vertex 7

##

```java
import java.util.*;

// A class to store a graph edge
class Edge
{
    public final int source, dest;

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
        for (Edge edge: edges) {
            adjList.get(edge.source).add(edge.dest);
        }
    }
}

class Main
{
    // Function to perform BFS traversal from a given source vertex in a graph to
    // determine if a destination vertex is reachable from the source or not
    public static boolean isReachable(Graph graph, int src, int dest)
    {
        // get the total number of nodes in the graph
        int n = graph.adjList.size();

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // create a queue for doing BFS
        Queue<Integer> q = new ArrayDeque<>();

        // mark the source vertex as discovered
        discovered[src] = true;

        // enqueue source vertex
        q.add(src);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and print it
            int v = q.poll();

            // if destination vertex is found
            if (v == dest) {
                return true;
            }

            // do for every edge (v, u)
            for (int u: graph.adjList.get(v))
            {
                if (!discovered[u])
                {
                    // mark it as discovered and enqueue it
                    discovered[u] = true;
                    q.add(u);
                }
            }
        }

        return false;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(Edge.of(0, 3), Edge.of(1, 0),
                                Edge.of(1, 2), Edge.of(1, 4), Edge.of(2, 7),
                                Edge.of(3, 4), Edge.of(3, 5), Edge.of(4, 3),
                                Edge.of(4, 6), Edge.of(5, 6), Edge.of(6, 7));

        // total number of nodes in the graph (labeled from 0 to 7)
        int n = 8;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // source and destination vertex
        int src = 0, dest = 7;

        // perform BFS traversal from the source vertex to check the connectivity
        if (isReachable(graph, src, dest)) {
            System.out.println("Path exists from vertex " + src + " to vertex " + dest);
        }
        else {
            System.out.println("No path exists between vertices " + src +
                    " and " + dest);
        }
    }
}
```

##

```python3
from collections import deque

# A class to represent a graph object
class Graph:
    # Constructor
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the directed graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)

# Function to perform BFS traversal from a given source vertex in a graph to
# determine if a destination vertex is reachable from the source or not
def isReachable(graph, src, dest):

    # get the total number of nodes in the graph
    n = len(graph.adjList)

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # create a queue for doing BFS
    q = deque()

    # mark the source vertex as discovered
    discovered[src] = True

    # enqueue source vertex
    q.append(src)

    # loop till queue is empty
    while q:

        # dequeue front node and print it
        v = q.popleft()

        # if destination vertex is found
        if v == dest:
            return True

        # do for every edge (v, u)
        for u in graph.adjList[v]:
            if not discovered[u]:
                # mark it as discovered and enqueue it
                discovered[u] = True
                q.append(u)

    return False

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        (0, 3), (1, 0), (1, 2), (1, 4), (2, 7), (3, 4),
        (3, 5), (4, 3), (4, 6), (5, 6), (6, 7)
    ]

    # total number of nodes in the graph (labeled from 0 to 7)
    n = 8

    # build a graph from the given edges
    graph = Graph(edges, n)

    # source and destination vertex
    (src, dest) = (0, 7)

    # perform BFS traversal from the source vertex to check the connectivity
    if isReachable(graph, src, dest):
        print(f'Path exists from vertex {src} to vertex {dest}')
    else:
        print(f'No path exists between vertices {src} and {dest}')
```

How to print the complete path?

The idea is to store the complete path between the source and destination vertex in an array using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We can easily achieve this if using [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to determine the path between the vertices. This is demonstrated below in C++, Java, and Python:

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
    // a vector of vectors to represent an adjacency list in C++
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

// Function to perform DFS traversal in a directed graph to find the
// complete path between source and destination vertices
bool isReachable(Graph const &graph, int src, int dest,
        vector<bool> &discovered, vector<int> &path)
{
    // mark the current node as discovered
    discovered[src] = true;

    // include the current node in the path
    path.push_back(src);

    // if destination vertex is found
    if (src == dest) {
        return true;
    }

    // do for every edge (src, i)
    for (int i: graph.adjList[src])
    {
        // if `u` is not yet discovered
        if (!discovered[i])
        {
            // return true if the destination is found
            if (isReachable(graph, i, dest, discovered, path)) {
                return true;
            }
        }
    }

    // backtrack: remove the current node from the path
    path.pop_back();

    // return false if destination vertex is not reachable from src
    return false;
}

// Utility function to print a path
void printPath(vector<int> const &path)
{
    for (int i: path) {
        cout << i << ' ';
    }
    cout << endl;
}

int main()
{
    // vector of graph edges as per the above diagram
    vector<Edge> edges = {
        {0, 3}, {1, 0}, {1, 2}, {1, 4}, {2, 7}, {3, 4},
        {3, 5}, {4, 3}, {4, 6}, {5, 6}, {6, 7}
    };

    // total number of nodes in the graph (labeled from 0 to 7)
    int n = 8;

    // build a graph from the given edges
    Graph graph(edges, n);

    // to keep track of whether a vertex is discovered or not
    vector<bool> discovered(n);

    // source and destination vertex
    int src = 0, dest = 7;

    // vector to store the complete path between source and destination
    vector<int> path;

    // perform DFS traversal from the source vertex to check the connectivity
    // and store path from the source vertex to the destination vertex
    if (isReachable(graph, src, dest, discovered, path))
    {
        cout << "Path exists from vertex " << src << " to vertex " << dest;
        cout << "\nThe complete path is "; printPath(path);
    }
    else {
        cout << "No path exists between vertices " << src << " and " << dest;
    }

    return 0;
}
```

**Output:** Path exists from vertex 0 to vertex 7 The complete path is 0 3 4 6 7

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

// A class to store a graph edge
class Edge
{
    public final int source, dest;

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
        for (Edge edge: edges) {
            adjList.get(edge.source).add(edge.dest);
        }
    }
}

class Main
{
    // Function to perform DFS traversal in a directed graph to find the
    // complete path between source and destination vertices
    public static boolean isReachable(Graph graph, int src, int dest,
                            boolean[] discovered, Stack<Integer> path)
    {
        // mark the current node as discovered
        discovered[src] = true;

        // include the current node in the path
        path.add(src);

        // if destination vertex is found
        if (src == dest) {
            return true;
        }

        // do for every edge (src, i)
        for (int i: graph.adjList.get(src))
        {
            // if `u` is not yet discovered
            if (!discovered[i])
            {
                // return true if the destination is found
                if (isReachable(graph, i, dest, discovered, path)) {
                    return true;
                }
            }
        }

        // backtrack: remove the current node from the path
        path.pop();

        // return false if destination vertex is not reachable from src
        return false;
    }

    public static void main(String[] args)
    {
        // List of graph edges as per the above diagram
        List<Edge> edges = Arrays.asList(
                Edge.of(0, 3), Edge.of(1, 0), Edge.of(1, 2), Edge.of(1, 4),
                Edge.of(2, 7), Edge.of(3, 4), Edge.of(3, 5), Edge.of(4, 3),
                Edge.of(4, 6), Edge.of(5, 6), Edge.of(6, 7));

        // total number of nodes in the graph (labeled from 0 to 7)
        int n = 8;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        // to keep track of whether a vertex is discovered or not
        boolean[] discovered = new boolean[n];

        // source and destination vertex
        int src = 0, dest = 7;

        // To store the complete path between source and destination
        Stack<Integer> path = new Stack<>();

        // perform DFS traversal from the source vertex to check the connectivity
        // and store path from the source vertex to the destination vertex
        if (isReachable(graph, src, dest, discovered, path))
        {
            System.out.println("Path exists from vertex " + src + " to vertex " + dest);
            System.out.println("The complete path is " + path);
        }
        else {
            System.out.println("No path exists between vertices " + src +
                    " and " + dest);
        }
    }
}
```

##

```python3
from collections import deque

# A class to represent a graph object
class Graph:
    # Constructor
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the directed graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)

# Function to perform DFS traversal in a directed graph to find the
# complete path between source and destination vertices
def isReachable(graph, src, dest, discovered, path):

    # mark the current node as discovered
    discovered[src] = True

    # include the current node in the path
    path.append(src)

    # if destination vertex is found
    if src == dest:
        return True

    # do for every edge (src, i)
    for i in graph.adjList[src]:

        # if `u` is not yet discovered
        if not discovered[i]:
            # return true if the destination is found
            if isReachable(graph, i, dest, discovered, path):
                return True

    # backtrack: remove the current node from the path
    path.pop()

    # return false if destination vertex is not reachable from src
    return False

if __name__ == '__main__':

    # List of graph edges as per the above diagram
    edges = [
        (0, 3), (1, 0), (1, 2), (1, 4), (2, 7), (3, 4),
        (3, 5), (4, 3), (4, 6), (5, 6), (6, 7)
    ]

    # total number of nodes in the graph (labeled from 0 to 7)
    n = 8

    # build a graph from the given edges
    graph = Graph(edges, n)

    # to keep track of whether a vertex is discovered or not
    discovered = [False] * n

    # source and destination vertex
    (src, dest) = (0, 7)

    # List to store the complete path between source and destination
    path = deque()

    # perform DFS traversal from the source vertex to check the connectivity
    # and store path from the source vertex to the destination vertex
    if isReachable(graph, src, dest, discovered, path):
        print(f'Path exists from vertex {src} to vertex {dest}')
        print(f'The complete path is', list(path))
    else:
        print(f'No path exists between vertices {src} and {dest}')
```

The time complexity of the above solutions is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

**Exercise:** Extend the solution to print all paths between given vertices [(solution link)](https://techiedelight.com/compiler/?run=RfcWg8)
