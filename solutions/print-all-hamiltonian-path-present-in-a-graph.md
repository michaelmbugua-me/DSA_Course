# Print all Hamiltonian paths present in a graph

> Source: https://www.techiedelight.com/print-all-hamiltonian-path-present-in-a-graph/

Given an undirected graph, print all Hamiltonian paths present in it. The Hamiltonian path in an undirected or directed graph is a path that visits each vertex exactly once.

For example, the following graph shows a Hamiltonian Path marked in red:

[](https://commons.wikimedia.org/wiki/File%3AHamiltonian_path.svg "By Christoph Sommer \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\), CC-BY-SA-3.0 \(https://creativecommons.org/licenses/by-sa/3.0//\) or CC BY-SA 2.5-2.0-1.0 \(https://creativecommons.org/licenses/by-sa/2.5/deed.en\)\], via Wikimedia Commons")

> 

The idea is to use [backtracking](https://techiedelight.com/backtracking-interview-questions/). We check if every edge starting from an unvisited vertex leads to a solution or not. As a Hamiltonian path visits each vertex exactly once, we take the help of the `visited[]` array in the proposed solution to process only unvisited vertices. Also, we use the `path[]` array to store vertices covered in the current path. If all the vertices are visited, then a Hamiltonian path exists in the graph, and we print the complete path stored in the `path[]` array.

The algorithm can be implemented as follows in C++, Java, and Python:

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

    // Constructor
    Graph(vector<Edge> const &edges, int n)
    {
        // resize the vector to hold `n` elements of type `vector<int>`
        adjList.resize(n);

        // add edges to the undirected graph
        for (Edge edge: edges)
        {
            int src = edge.src;
            int dest = edge.dest;

            adjList[src].push_back(dest);
            adjList[dest].push_back(src);
        }
    }
};

// Utility function to print a path
void printPath(vector<int> const &path)
{
    for (int i: path) {
        cout << i << ' ';
    }
    cout << endl;
}

void hamiltonianPaths(Graph const &graph, int v, vector<bool> &visited,
                    vector<int> &path, int n)
{
    // if all the vertices are visited, then the Hamiltonian path exists
    if (path.size() == n)
    {
        // print the Hamiltonian path
        printPath(path);
        return;
    }

    // Check if every edge starting from vertex `v` leads to a solution or not
    for (int w: graph.adjList[v])
    {
        // process only unvisited vertices as the Hamiltonian
        // path visit each vertex exactly once
        if (!visited[w])
        {
            visited[w] = true;
            path.push_back(w);

            // check if adding vertex `w` to the path leads to the solution or not
            hamiltonianPaths(graph, w, visited, path, n);

            // backtrack
            visited[w] = false;
            path.pop_back();
        }
    }
}

void findHamiltonianPaths(Graph const &graph, int n)
{
    // start with every node
    for (int start = 0; start < n; start++)
    {
        // add starting node to the path
        vector<int> path;
        path.push_back(start);

        // mark the start node as visited
        vector<bool> visited(n);
        visited[start] = true;

        hamiltonianPaths(graph, start, visited, path, n);
    }
}

int main()
{
    // consider a complete graph having 4 vertices
    vector<Edge> edges = {
        {0, 1}, {0, 2}, {0, 3}, {1, 2}, {1, 3}, {2, 3}
    };

    // total number of nodes in the graph (labelled from 0 to 3)
    int n = 4;

    // build a graph from the given edges
    Graph graph(edges, n);

    findHamiltonianPaths(graph, n);

    return 0;
}
```

**Output:** 0 1 2 3 0 1 3 2 0 2 1 3 0 2 3 1 0 3 1 2 0 3 2 1 1 0 2 3 1 0 3 2 1 2 0 3 1 2 3 0 1 3 0 2 1 3 2 0 2 0 1 3 2 0 3 1 2 1 0 3 2 1 3 0 2 3 0 1 2 3 1 0 3 0 1 2 3 0 2 1 3 1 0 2 3 1 2 0 3 2 0 1 3 2 1 0

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
    public static void hamiltonianPaths(Graph graph, int v, boolean[] visited,
                                            List<Integer> path, int n)
    {
        // if all the vertices are visited, then the Hamiltonian path exists
        if (path.size() == n)
        {
            // print the Hamiltonian path
            System.out.println(path);
            return;
        }

        // Check if every edge starting from vertex `v` leads
        // to a solution or not
        for (int w: graph.adjList.get(v))
        {
            // process only unvisited vertices as the Hamiltonian
            // path visit each vertex exactly once
            if (!visited[w])
            {
                visited[w] = true;
                path.add(w);

                // check if adding vertex `w` to the path leads
                // to the solution or not
                hamiltonianPaths(graph, w, visited, path, n);

                // backtrack
                visited[w] = false;
                path.remove(path.size() - 1);
            }
        }
    }

    public static void findHamiltonianPaths(Graph graph, int n)
    {
        // start with every node
        for (int start = 0; start < n; start++)
        {
            // add starting node to the path
            List<Integer> path = new ArrayList<>();
            path.add(start);

            // mark the start node as visited
            boolean[] visited = new boolean[n];
            visited[start] = true;

            hamiltonianPaths(graph, start, visited, path, n);
        }
    }

    public static void main(String[] args)
    {
        // consider a complete graph having 4 vertices
        List<Edge> edges = Arrays.asList(
                new Edge(0, 1), new Edge(0, 2), new Edge(0, 3),
                new Edge(1, 2), new Edge(1, 3), new Edge(2, 3)
        );

        // total number of nodes in the graph (labelled from 0 to 3)
        int n = 4;

        // build a graph from the given edges
        Graph graph = new Graph(edges, n);

        findHamiltonianPaths(graph, n);
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

        # add edges to the undirected graph
        for (src, dest) in edges:
            self.adjList[src].append(dest)
            self.adjList[dest].append(src)

def hamiltonianPaths(graph, v, visited, path, n):

    # if all the vertices are visited, then the Hamiltonian path exists
    if len(path) == n:
        # print the Hamiltonian path
        print(path)
        return

    # Check if every edge starting from vertex `v` leads to a solution or not
    for w in graph.adjList[v]:

        # process only unvisited vertices as the Hamiltonian
        # path visit each vertex exactly once
        if not visited[w]:
            visited[w] = True
            path.append(w)

            # check if adding vertex `w` to the path leads to the solution or not
            hamiltonianPaths(graph, w, visited, path, n)

            # backtrack
            visited[w] = False
            path.pop()

def findHamiltonianPaths(graph, n):

    # start with every node
    for start in range(n):

        # add starting node to the path
        path = [start]

        # mark the start node as visited
        visited = [False] * n
        visited[start] = True

        hamiltonianPaths(graph, start, visited, path, n)

if __name__ == '__main__':

    # consider a complete graph having 4 vertices
    edges = [(0, 1), (0, 2), (0, 3), (1, 2), (1, 3), (2, 3)]

    # total number of nodes in the graph (labelled from 0 to 3)
    n = 4

    # build a graph from the given edges
    graph = Graph(edges, n)

    findHamiltonianPaths(graph, n)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Construct a directed graph from an undirected graph that satisfies given constraints](https://www.techiedelight.com/construct-directed-graph-from-undirected-graph/ "Construct a directed graph from an undirected graph that satisfies given constraints")

> [Check whether an undirected graph is Eulerian](https://www.techiedelight.com/eulerian-path-undirected-graph/ "Check whether an undirected graph is Eulerian")

> [Determine whether an undirected graph is a tree (Acyclic Connected Graph)](https://www.techiedelight.com/determine-undirected-graph-tree-acyclic-connected-graph/ "Determine whether an undirected graph is a tree \(Acyclic Connected Graph\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 165

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
