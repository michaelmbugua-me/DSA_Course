# Depth-First Search (DFS) vs Breadth-First Search (BFS)

> Source: https://www.techiedelight.com/depth-first-search-dfs-vs-breadth-first-search-bfs/

This post will cover the difference between the Depth–first search (DFS) and Breadth–first search (BFS) algorithm used to traverse/search tree or graph data structure.

## 1\. Definition

The [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) algorithm starts at the root of the tree (or some arbitrary node for a graph) and explored as far as possible along each branch before [backtracking](https://techiedelight.com/backtracking-interview-questions/).

The [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) algorithm also starts at the root of the tree (or some arbitrary node of a graph), but unlike DFS, it explores the neighbor nodes first, before moving to the next-level neighbors. In other words, BFS explores vertices in the order of their distance from the source vertex, where distance is the minimum length of a path from the source vertex to the node.

## 2\. Examples

The following graph shows the order in which the nodes are discovered in DFS:

[](https://commons.wikimedia.org/wiki/File%3ADepth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY-SA 3.0 \(https://creativecommons.org/licenses/by-sa/3.0/\)\], via Wikimedia Commons")

The following graph shows the order in which the nodes are discovered in BFS:

[](https://commons.wikimedia.org/wiki/File%3ABreadth-first-tree.svg "By Alexander Drichel \(Own work\) \[GFDL \(http://www.gnu.org/copyleft/fdl.html\) or CC BY 3.0 \(https://creativecommons.org/licenses/by/3.0/\)\], via Wikimedia Commons")

## 3\. Application

Below are the applications of DFS:

  * [Finding connected components in a graph](https://techiedelight.com/check-given-graph-strongly-connected-not/).
  * [Topological sorting](https://techiedelight.com/topological-sorting-dag/) in a DAG(Directed Acyclic Graph).
  * Finding 2/3–(edge or vertex)–connected components.
  * Finding the [bridges of a graph](https://techiedelight.com/2-edge-connectivity-graph/).
  * Finding [strongly connected components](https://techiedelight.com/check-graph-strongly-connected-one-dfs-traversal/).
  * [Solving puzzles with only one solution](https://techiedelight.com/maze-problems-in-data-structures/), such as mazes.
  * Finding biconnectivity in graphs and many more…

Below are the applications of BFS:

  * Copying garbage collection, Cheney’s algorithm.
  * [Finding the shortest path](https://techiedelight.com/lee-algorithm-shortest-path-in-a-maze/) between two nodes `u` and `v`, with path length measured by the number of edges (an advantage over depth–first search).
  * Testing a graph for [bipartiteness](https://techiedelight.com/bipartite-graph/).
  * [Minimum Spanning Tree](https://techiedelight.com/kruskals-algorithm-for-finding-minimum-spanning-tree/) for unweighted graph.
  * Web crawler.
  * Finding nodes in any connected component of a graph.
  * Ford–Fulkerson method for computing the maximum flow in a flow network.
  * Serialization/Deserialization of a [binary tree](https://techiedelight.com/binary-tree-interview-questions/).

## 4\. DFS and BFS for Trees

We may traverse trees in multiple ways in depth–first order or breadth–first order. The depth–first search for trees can be implemented using [preorder](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/), [inorder](https://techiedelight.com/inorder-tree-traversal-iterative-recursive/), and [postorder](https://techiedelight.com/postorder-tree-traversal-iterative-recursive/), while the breadth–first search for trees can be implemented using [level order traversal](https://techiedelight.com/level-order-traversal-binary-tree/).

Beyond these basic traversals, various more complex or hybrid schemes are possible, such as depth-limited searches like [iterative deepening depth–first search](https://en.wikipedia.org/wiki/Iterative_deepening_depth-first_search).

## 5\. Implementation Details

In BFS, we need to maintain a separate data structure for tracking the tree/graph nodes yet to be visited. This is easily done iteratively using the [queue data structure](https://techiedelight.com/queue-implementation-cpp/).

In contrast to BFS, DFS doesn’t need any additional data structure to store the tree/graph nodes. The recursive implementation of DFS uses the [call stack](https://en.wikipedia.org/wiki/Call_stack).

## 6\. Time Complexity

The time complexity of both DFS and BFS traversal is O(V + E), where `V` and `E` are the total number of vertices and edges in the graph, respectively.

Please note that `E` may vary between O(1) and O(V2), depending on how dense the graph is.

## 7\. Memory Requirements

The memory is taken by DFS/BFS heavily depends on the structure of our tree/graph. The maximum memory taken by DFS (i.e., by call stack) is equal to the depth of the tree, and the maximum memory taken by BFS is equal to the width of the tree.

## 8\. When to use DFS and BFS?

If we know the solution lies somewhere deep in a tree or far from the source vertex in the graph, use DFS. If we know the solution is not that far from the source vertex, use BFS.

If our tree is broad, use DFS as BFS will take too much memory. Similarly, if our tree is very deep, choose BFS over DFS.

**Also See:**

> [Depth First Search (DFS) – Interview Questions & Practice Problems](https://techiedelight.com/dfs-interview-questions/)

> [Breadth First Search (BFS) – Interview Questions & Practice Problems](https://techiedelight.com/bfs-interview-questions/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 77

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
