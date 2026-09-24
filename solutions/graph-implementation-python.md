# Graph Implementation in Python

> Source: https://www.techiedelight.com/graph-implementation-python/

Implement weighted and unweighted directed graph data structure in Python.

In an adjacency list representation of the graph, each vertex in the graph stores a list of neighboring vertices. Following is the pictorial representation for the corresponding adjacency list for the above graph:

## 1\. Directed Graph Implementation

Following is the Python implementation of a directed graph using an adjacency list:

```
# A class to represent a graph object
class Graph:
    # Constructor
    def __init__(self, edges, n):
        # allocate memory for the adjacency list
        self.adjList = [[] for _ in range(n)]

        # add edges to the directed graph
        for (src, dest) in edges:
            # allocate node in adjacency list from src to dest
            self.adjList[src].append(dest)

# Function to print adjacency list representation of a graph
def printGraph(graph):
    for src in range(len(graph.adjList)):
        # print current vertex and all its neighboring vertices
        for dest in graph.adjList[src]:
            print(f'({src} —> {dest}) ', end='')
        print()

if __name__ == '__main__':

    # Input: Edges in a directed graph
    edges = [(0, 1), (1, 2), (2, 0), (2, 1), (3, 2), (4, 5), (5, 4)]

    # No. of vertices (labelled from 0 to 5)
    n = 6

    # construct a graph from a given list of edges
    graph = Graph(edges, n)

    # print adjacency list representation of the graph
    printGraph(graph)
```

**Output:** (0 —> 1) (1 —> 2) (2 —> 0) (2 —> 1) (3 —> 2) (4 —> 5) (5 —> 4)

## 2\. Weighted Directed Graph Implementation

In a weighted graph, every edge has a weight or cost associated with it.

Following is the Python implementation of a weighted directed graph using an adjacency list. The implementation is similar to the above implementation, except the weight is now stored in the adjacency list with every edge.

```
# A class to represent a graph object
class Graph:
    # Constructor to construct a graph
    def __init__(self, edges, n):

        # A list of lists to represent an adjacency list
        self.adjList = [None] * n

        # allocate memory for the adjacency list
        for i in range(n):
            self.adjList[i] = []

        # add edges to the directed graph
        for (src, dest, weight) in edges:
            # allocate node in adjacency list from src to dest
            self.adjList[src].append((dest, weight))

# Function to print adjacency list representation of a graph
def printGraph(graph):
    for src in range(len(graph.adjList)):
        # print current vertex and all its neighboring vertices
        for (dest, weight) in graph.adjList[src]:
            print(f'({src} —> {dest}, {weight}) ', end='')
        print()

if __name__ == '__main__':

    # Input: Edges in a weighted digraph (as per the above diagram)
    # Edge (x, y, w) represents an edge from `x` to `y` having weight `w`
    edges = [(0, 1, 6), (1, 2, 7), (2, 0, 5), (2, 1, 4), (3, 2, 10),
            (4, 5, 1), (5, 4, 3)]

    # No. of vertices (labelled from 0 to 5)
    n = 6

    # construct a graph from a given list of edges
    graph = Graph(edges, n)

    # print adjacency list representation of the graph
    printGraph(graph)
```

**Output:** (0 —> 1, 6) (1 —> 2, 7) (2 —> 0, 5) (2 —> 1, 4) (3 —> 2, 10) (4 —> 5, 1) (5 —> 4, 3)

**Also see:**

> [Implement Graph Data Structure in C](https://techiedelight.com/implement-graph-data-structure-c/)

> [Graph Implementation in C++ using STL](https://techiedelight.com/graph-implementation-using-stl/)

> [Graph Implementation in Java using Collections](https://techiedelight.com/graph-implementation-java-using-collections/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 196

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
