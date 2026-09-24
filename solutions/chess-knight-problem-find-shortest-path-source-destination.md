# Chess Knight Problem | Find the shortest path from source to destination

> Source: https://www.techiedelight.com/chess-knight-problem-find-shortest-path-source-destination/

Given a chessboard, find the shortest distance (minimum number of steps) taken by a knight to reach a given destination from a given source.

For example,

**Input:** N = 8 (8 × 8 board) Source = (7, 0) Destination = (0, 7) **Output:** Minimum number of steps required is 6

The knight’s movement is illustrated in the following figure:

> 

The idea is to use [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) as it is the shortest path problem. Following is the complete algorithm:

  1. Create an empty queue and enqueue the source cell having a distance of 0 from the source (itself).
  2. Loop till queue is empty:
     1. Dequeue next unvisited node.
     2. If the popped node is the destination node, return its distance.
     3. Otherwise, we mark the current node as visited. For each of eight possible movements for a knight, enqueue each valid movement with `+1` distance (minimum distance of a given node from the source is one more than the minimum distance of parent from source).

A knight can move in eight possible directions from a given cell, as illustrated in the following figure:

We can find all the possible locations the knight can move to from the given location by using the array that stores the relative position of knight movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <= 7` using the following array:

row[] = [ 2, 2, -2, -2, 1, 1, -1, -1 ] col[] = [ -1, 1, 1, -1, 2, -2, 2, -2 ]

So, from position `(x, y)` knight’s can move to:

(x + 2, y – 1) (x + 2, y + 1) (x – 2, y + 1) (x – 2, y – 1) (x + 1, y + 2) (x + 1, y – 2) (x – 1, y + 2) (x – 1, y – 2)

Note that in BFS, all cells having the shortest path as 1 are visited first, followed by their adjacent cells having the shortest path as 1 + 1 = 2 and so on… so if we reach any node in BFS, its shortest path = shortest path of parent + 1. So, the destination cell’s first occurrence gives us the result, and we can stop our search there.**The shortest path cannot exist from some other cell for which we haven’t reached the given node yet. If any such path were possible, we would have already explored it.**

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <set>
#include <queue>
#include <climits>
using namespace std;

// Below arrays detail all eight possible movements
// for a knight
int row[] = { 2, 2, -2, -2, 1, 1, -1, -1 };
int col[] = { -1, 1, 1, -1, 2, -2, 2, -2 };

// Check if (x, y) is valid chessboard coordinates.
// Note that a knight cannot go out of the chessboard
bool isValid(int x, int y, int N) {
    return (x >= 0 && x < N) && (y >= 0 && y < N);
}

// A queue node used in BFS
struct Node
{
    // (x, y) represents chessboard coordinates
    // `dist` represents its minimum distance from the source
    int x, y, dist;

    // Node constructor
    Node(int x, int y, int dist = 0): x(x), y(y), dist(dist) {}

    // As we are using struct as a key in a `std::set`,
    // we need to overload `<` operator.
    // Alternatively, we can use `std::pair<int, int>` as a key
    // to store the matrix coordinates in the set.

    bool operator<(const Node& o) const {
        return x < o.x || (x == o.x && y < o.y);
    }
};

// Find the minimum number of steps taken by the knight
// from the source to reach the destination using BFS
int findShortestDistance(int N, Node src, Node dest)
{
    // set to check if the matrix cell is visited before or not
    set<Node> visited;

    // create a queue and enqueue the first node
    queue<Node> q;
    q.push(src);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and process it
        Node node = q.front();
        q.pop();

        int x = node.x;
        int y = node.y;
        int dist = node.dist;

        // if the destination is reached, return distance
        if (x == dest.x && y == dest.y) {
            return dist;
        }

        // skip if the location is visited before
        if (!visited.count(node))
        {
            // mark the current node as visited
            visited.insert(node);

            // check for all eight possible movements for a knight
            // and enqueue each valid movement
            for (int i = 0; i < 8; i++)
            {
                // get the knight's valid position from the current position on
                // the chessboard and enqueue it with +1 distance
                int x1 = x + row[i];
                int y1 = y + col[i];

                if (isValid(x1, y1, N)) {
                    q.push({x1, y1, dist + 1});
                }
            }
        }
    }

    // return infinity if the path is not possible
    return INT_MAX;
}

int main()
{
    // N x N matrix
    int N = 8;

    // source coordinates
    Node src = {0, 7};

    // destination coordinates
    Node dest = {7, 0};

    cout << "The minimum number of steps required is " <<
            findShortestDistance(N, src, dest);

    return 0;
}
```

**Output:** The minimum number of steps required is 6

##

```java
import java.util.*;

// A queue node used in BFS
class Node
{
    // (x, y) represents chessboard coordinates
    // `dist` represents its minimum distance from the source
    int x, y, dist;

    public Node(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public Node(int x, int y, int dist)
    {
        this.x = x;
        this.y = y;
        this.dist = dist;
    }

    // As we are using the class object as a key in a `HashMap`,
    // we need to implement `hashCode()` and `equals()`

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Node node = (Node) o;
        return x == node.x &&
                y == node.y &&
                dist == node.dist;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, dist);
    }
}

class Main
{
    // Below arrays detail all eight possible movements for a knight
    private static int[] row = { 2, 2, -2, -2, 1, 1, -1, -1 };
    private static int[] col = { -1, 1, 1, -1, 2, -2, 2, -2 };

    // Check if (x, y) is valid chessboard coordinates.
    // Note that a knight cannot go out of the chessboard
    private static boolean isValid(int x, int y, int N) {
        return (x >= 0 && x < N) && (y >= 0 && y < N);
    }

    // Find the minimum number of steps taken by the knight
    // from the source to reach the destination using BFS
    public static int findShortestDistance(Node src, Node dest, int N)
    {
        // set to check if the matrix cell is visited before or not
        Set<Node> visited = new HashSet<>();

        // create a queue and enqueue the first node
        Queue<Node> q = new ArrayDeque<>();
        q.add(src);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and process it
            Node node = q.poll();

            int x = node.x;
            int y = node.y;
            int dist = node.dist;

            // if the destination is reached, return distance
            if (x == dest.x && y == dest.y) {
                return dist;
            }

            // skip if the location is visited before
            if (!visited.contains(node))
            {
                // mark the current node as visited
                visited.add(node);

                // check for all eight possible movements for a knight
                // and enqueue each valid movement
                for (int i = 0; i < row.length; i++)
                {
                    // get the knight's valid position from the current position on
                    // the chessboard and enqueue it with +1 distance
                    int x1 = x + row[i];
                    int y1 = y + col[i];

                    if (isValid(x1, y1, N)) {
                        q.add(new Node(x1, y1, dist + 1));
                    }
                }
            }
        }

        // return infinity if the path is not possible
        return Integer.MAX_VALUE;
    }

    public static void main(String[] args)
    {
        // N x N matrix
        int N = 8;

        // source coordinates
        Node src = new Node(0, 7);

        // destination coordinates
        Node dest = new Node(7, 0);

        System.out.println("The minimum number of steps required is " +
                findShortestDistance(src, dest, N));
    }
}
```

##

```python3
import sys
from collections import deque

# A queue node used in BFS
class Node:
    # (x, y) represents chessboard coordinates
    # `dist` represents its minimum distance from the source
    def __init__(self, x, y, dist=0):
        self.x = x
        self.y = y
        self.dist = dist

    # As we are using `Node` as a key in a dictionary,
    # we need to override the `__hash__()` and `__eq__()` function
    def __hash__(self):
        return hash((self.x, self.y, self.dist))

    def __eq__(self, other):
        return (self.x, self.y, self.dist) == (other.x, other.y, other.dist)

# Below lists detail all eight possible movements for a knight
row = [2, 2, -2, -2, 1, 1, -1, -1]
col = [-1, 1, 1, -1, 2, -2, 2, -2]

# Check if (x, y) is valid chessboard coordinates.
# Note that a knight cannot go out of the chessboard
def isValid(x, y, N):
    return not (x < 0 or y < 0 or x >= N or y >= N)

# Find the minimum number of steps taken by the knight
# from the source to reach the destination using BFS
def findShortestDistance(src, dest, N):

    # set to check if the matrix cell is visited before or not
    visited = set()

    # create a queue and enqueue the first node
    q = deque()
    q.append(src)

    # loop till queue is empty
    while q:

        # dequeue front node and process it
        node = q.popleft()

        x = node.x
        y = node.y
        dist = node.dist

        # if the destination is reached, return distance
        if x == dest.x and y == dest.y:
            return dist

        # skip if the location is visited before
        if node not in visited:
            # mark the current node as visited
            visited.add(node)

            # check for all eight possible movements for a knight
            # and enqueue each valid movement
            for i in range(len(row)):
                # get the knight's valid position from the current position on
                # the chessboard and enqueue it with +1 distance
                x1 = x + row[i]
                y1 = y + col[i]

                if isValid(x1, y1, N):
                    q.append(Node(x1, y1, dist + 1))

    # return infinity if the path is not possible
    return sys.maxsize

if __name__ == '__main__':

    N = 8                # N x N matrix
    src = Node(0, 7)    # source coordinates
    dest = Node(7, 0)   # destination coordinates

    print("The minimum number of steps required is",
          findShortestDistance(src, dest, N))
```

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**Exercise:** Extend the solution to print the paths as well.

Also See:

> [Find the shortest path from source to destination in a matrix that satisfies given constraints](https://www.techiedelight.com/find-shortest-path-source-destination-matrix-satisfies-given-constraints/ "Find the shortest path from source to destination in a matrix that satisfies given constraints")

> [Shortest path in a maze – Lee Algorithm](https://www.techiedelight.com/lee-algorithm-shortest-path-in-a-maze/ "Shortest path in a maze – Lee Algorithm")

> [Find the shortest safe route in a field with sensors present](https://www.techiedelight.com/find-shortest-safe-route-field-sensors-present/ "Find the shortest safe route in a field with sensors present")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 87

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
