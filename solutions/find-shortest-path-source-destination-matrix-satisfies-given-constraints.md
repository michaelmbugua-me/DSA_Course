# Find the shortest path from source to destination in a matrix that satisfies given constraints

> Source: https://www.techiedelight.com/find-shortest-path-source-destination-matrix-satisfies-given-constraints/

Given an `N × N` matrix of positive integers, find the shortest path from the first cell of the matrix to its last cell that satisfies given constraints.

We are allowed to move exactly `k` steps from any cell in the matrix where `k` is the cell’s value, i.e., from a cell `(i, j)` having value `k` in a matrix `M`, we can move to `(i+k, j)`, `(i-k, j)`, `(i, j+k)`, or `(i, j-k)`. The diagonal moves are not allowed.

For example,

**Input:** [ 7 1 3 5 3 6 1 1 7 5 ] [ 2 3 6 1 1 6 6 6 1 2 ] [ 6 1 7 2 1 4 7 6 6 2 ] [ 6 6 7 1 3 3 5 1 3 4 ] [ 5 5 6 1 5 4 6 1 7 4 ] [ 3 5 5 2 7 5 3 4 3 6 ] [ 4 1 4 3 6 4 5 3 2 6 ] [ 4 4 1 7 4 3 3 1 4 2 ] [ 4 4 5 1 5 2 3 5 3 5 ] [ 3 6 3 5 2 2 6 4 2 1 ] **Output:** The shortest path length is 6 The shortest path is (0, 0) (0, 7) (0, 6) (1, 6) (7, 6) (7, 9) (9, 9) **Input:** [ 4 4 6 5 5 1 1 1 7 4 ] [ 3 6 2 4 6 5 7 2 6 6 ] [ 1 3 6 1 1 1 7 1 4 5 ] [ 7 5 6 3 1 3 3 1 1 7 ] [ 3 4 6 4 7 2 6 5 4 4 ] [ 3 2 5 1 2 5 1 2 3 4 ] [ 4 2 2 2 5 2 3 7 7 3 ] [ 7 2 4 3 5 2 2 3 6 3 ] [ 5 1 4 2 6 4 6 7 3 7 ] [ 1 4 1 7 5 3 6 5 3 4 ] **Output:** The shortest path length is 6 The shortest path is (0, 0) (0, 4) (5, 4) (5, 2) (5, 7) (5, 9) (9, 9)

> 

We have already discussed a [backtracking](https://techiedelight.com/backtracking-interview-questions/) solution in the [previous post](https://techiedelight.com/find-path-source-destination-matrix-satisfies-given-constraints/). The time complexity of the backtracking solution would be higher since all paths need to be traveled until the destination is reached. However, since it is the shortest path problem, [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) would be an ideal choice. This post proposes the BFS solution.

Following is the complete algorithm:

  1. Create an empty [queue](https://techiedelight.com/circular-queue-implementation-c/) and enqueue the source cell having a distance 0 from source (itself) and mark it as visited.
  2. Loop till queue is empty

     1. Dequeue the front node.
     2. If the popped node is the destination node, return its distance.
     3. Otherwise, for each of four adjacent cells of the current cell, enqueue each of the valid cells with +1 distance and mark them as visited.
  3. If all the queue nodes are processed, and the destination is not reached, then return false.

Note that in BFS, all cells having the shortest path as 1 are visited first, followed by their adjacent cells having the shortest path as 1 + 1 = 2 and so on. So if we reach any node in BFS, its shortest path is one more than the shortest path of the parent. So, the first occurrence of the destination cell gives us the result, and we can stop our search there. _The shortest path cannot possibly exist from some other cell for which we haven’t reached the given node yet. If any such path was possible, we would have already explored it._

Note that we can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k < 4` using the following array:

row[] = { -1, 0, 0, 1 } col[] = { 0, -1, 1, 0 } So, from position (x, y), we can move to: (x – 1, y) (x, y – 1) (x, y + 1) (x + 1, y)

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <set>
#include <queue>
using namespace std;

// A queue node used in BFS
struct Node
{
    // (x, y) represents coordinates of a cell in the matrix
    int x, y;

    // `parent` stores the parent node of the current cell.
    Node* parent;

    Node(int x, int y, Node* parent) {
        this->x = x;
        this->y = y;
        this->parent = parent;
    }

    // As we are using struct as a key in a `std::set`,
    // we need to overload the below operators

    bool const operator==(const Node& ob) const {
        return x == ob.x && y == ob.y;
    }

    bool operator<(const Node& ob) const {
        return x < ob.x || (x == ob.x && y < ob.y);
    }
};

// Below arrays detail all four possible movements from a cell
int row[] = { -1, 0, 0, 1 };
int col[] = { 0, -1, 1, 0 };

// The function returns false if (x, y) is not a valid position
bool isValid(int x, int y, int N) {
    return (x >= 0 && x < N) && (y >= 0 && y < N);
}

// Function to print the complete path from source to destination
void findPath(Node* node, vector<pair<int,int>> &path)
{
    if (node != nullptr) {
        findPath(node->parent, path);
        path.push_back(make_pair(node->x, node->y));
    }
}

// Find the shortest route in a matrix from source cell (x, y) to
// destination cell (N-1, N-1)
vector<pair<int,int>> findPath(vector<vector<int>> const &matrix, int x, int y)
{
    // vector to store the shortest path
    vector<pair<int,int>> path;

    // `N × N` matrix
    int N = matrix.size();

    // base case
    if (N == 0) {
        return path;
    }

    // create a queue and enqueue the first node
    queue<Node*> q;
    Node* src = new Node(x, y, nullptr);
    q.push(src);

    // set to check if the matrix cell is visited before or not
    set<Node*> visited;
    visited.insert(src);

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and process it
        Node* curr = q.front();
        q.pop();

        int i = curr->x;
        int j = curr->y;

        // if the destination is found, print the shortest path and
        // return the shortest path length
        if (i == N - 1 && j == N - 1)
        {
            findPath(curr, path);
            return path;
        }

        // get the value of the current cell
        int n = matrix[i][j];

        // check all four possible movements from the current cell
        // and recur for each valid movement
        for (int k = 0; k < 4; k++)
        {
            // get next position coordinates using the value of the current cell
            int x = i + row[k] * n;
            int y = j + col[k] * n;

            // check if it is possible to go to the next position
            // from the current position
            if (isValid(x, y, N))
            {
                // construct the next cell node
                Node* next = new Node(x, y, curr);

                // if it isn't visited yet
                if (!visited.count(next))
                {
                    // enqueue it and mark it as visited
                    q.push(next);
                    visited.insert(next);
                }
            }
        }
    }

    // we reach here if the path is not possible
    return path;
}

template <typename T>
void printPairs(vector<pair<T,T>> const &input)
{
    int n = input.size();
    for (auto const &p: input) {
        cout << '(' << p.first << ", " << p.second << ')';
        if (--n) {
            cout << ", ";
        }
    }
}

int main()
{
    vector<vector<int>> matrix =
    {
        { 4, 4, 6, 5, 5, 1, 1, 1, 7, 4 },
        { 3, 6, 2, 4, 6, 5, 7, 2, 6, 6 },
        { 1, 3, 6, 1, 1, 1, 7, 1, 4, 5 },
        { 7, 5, 6, 3, 1, 3, 3, 1, 1, 7 },
        { 3, 4, 6, 4, 7, 2, 6, 5, 4, 4 },
        { 3, 2, 5, 1, 2, 5, 1, 2, 3, 4 },
        { 4, 2, 2, 2, 5, 2, 3, 7, 7, 3 },
        { 7, 2, 4, 3, 5, 2, 2, 3, 6, 3 },
        { 5, 1, 4, 2, 6, 4, 6, 7, 3, 7 },
        { 1, 4, 1, 7, 5, 3, 6, 5, 3, 4 }
    };

    // Find a route in the matrix from source cell (0, 0) to
    // destination cell (N-1, N-1)
    vector<pair<int,int>> path = findPath(matrix, 0, 0);

    if (path.size() > 0) {
        cout << "The shortest path is "; printPairs(path);
    }
    else {
        cout << "Destination not possible";
    }

    return 0;
}
```

**Output:** The shortest path is (0, 0) (0, 4) (5, 4) (5, 2) (5, 7) (5, 9) (9, 9)

##

```java
import java.util.*;

// A queue node used in BFS
class Node
{
    // (x, y) represents coordinates of a cell in the matrix
    int x, y;

    // maintain a parent node for printing the final path
    Node parent;

    Node(int x, int y, Node parent)
    {
        this.x = x;
        this.y = y;
        this.parent = parent;
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ')';
    }
}

class Main
{
    // Below arrays detail all four possible movements from a cell
    private static int[] row = { -1, 0, 0, 1 };
    private static int[] col = { 0, -1, 1, 0 };

    // The function returns false if (x, y) is not a valid position
    private static boolean isValid(int x, int y, int N) {
        return (x >= 0 && x < N) && (y >= 0 && y < N);
    }

    // Utility function to find path from source to destination
    private static void findPath(Node node, List<String> path)
    {
        if (node != null) {
            findPath(node.parent, path);
            path.add(node.toString());
        }
    }

    // Find the shortest route in a matrix from source cell (x, y) to
    // destination cell (N-1, N-1)
    public static List<String> findPath(int[][] matrix, int x, int y)
    {
        // list to store shortest path
        List<String> path = new ArrayList<>();

        // base case
        if (matrix == null || matrix.length == 0) {
            return path;
        }

        // `N × N` matrix
        int N = matrix.length;

        // create a queue and enqueue the first node
        Queue<Node> q = new ArrayDeque<>();
        Node src = new Node(x, y, null);
        q.add(src);

        // set to check if the matrix cell is visited before or not
        Set<String> visited = new HashSet<>();

        String key = src.x + "," + src.y;
        visited.add(key);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and process it
            Node curr = q.poll();
            int i = curr.x, j = curr.y;

            // return if the destination is found
            if (i == N - 1 && j == N - 1) {
                findPath(curr, path);
                return path;
            }

            // value of the current cell
            int n = matrix[i][j];

            // check all four possible movements from the current cell
            // and recur for each valid movement
            for (int k = 0; k < row.length; k++)
            {
                // get next position coordinates using the value of the current cell
                x = i + row[k] * n;
                y = j + col[k] * n;

                // check if it is possible to go to the next position
                // from the current position
                if (isValid(x, y, N))
                {
                    // construct the next cell node
                    Node next = new Node(x, y, curr);

                    key = next.x + "," + next.y;

                    // if it isn't visited yet
                    if (!visited.contains(key))
                    {
                        // enqueue it and mark it as visited
                        q.add(next);
                        visited.add(key);
                    }
                }
            }
        }

        // we reach here if the path is not possible
        return path;
    }

    public static void main(String[] args)
    {
        int[][] matrix =
        {
            { 4, 4, 6, 5, 5, 1, 1, 1, 7, 4 },
            { 3, 6, 2, 4, 6, 5, 7, 2, 6, 6 },
            { 1, 3, 6, 1, 1, 1, 7, 1, 4, 5 },
            { 7, 5, 6, 3, 1, 3, 3, 1, 1, 7 },
            { 3, 4, 6, 4, 7, 2, 6, 5, 4, 4 },
            { 3, 2, 5, 1, 2, 5, 1, 2, 3, 4 },
            { 4, 2, 2, 2, 5, 2, 3, 7, 7, 3 },
            { 7, 2, 4, 3, 5, 2, 2, 3, 6, 3 },
            { 5, 1, 4, 2, 6, 4, 6, 7, 3, 7 },
            { 1, 4, 1, 7, 5, 3, 6, 5, 3, 4 }
        };

        // Find a route in the matrix from source cell (0, 0) to
        // destination cell (N-1, N-1)
        List<String> path = findPath(matrix, 0, 0);

        if (path != null && path.size() > 0) {
            System.out.print("The shortest path is " + path);
        } else {
            System.out.println("Destination is not found");
        }
    }
}
```

##

```python3
from collections import deque

# A queue node used in BFS
class Node:
    # (x, y) represents coordinates of a cell in the matrix
    # maintain a parent node for the printing path
    def __init__(self, x, y, parent=None):
        self.x = x
        self.y = y
        self.parent = parent

    def __repr__(self):
        return str((self.x, self.y))

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# Below lists detail all four possible movements from a cell
row = [-1, 0, 0, 1]
col = [0, -1, 1, 0]

# The function returns false if (x, y) is not a valid position
def isValid(x, y, N):
    return (0 <= x < N) and (0 <= y < N)

# Utility function to find path from source to destination
def getPath(node, path=[]):
    if node:
        getPath(node.parent, path)
        path.append(node)

# Find the shortest route in a matrix from source cell (x, y) to
# destination cell (N-1, N-1)
def findPath(matrix, x=0, y=0):
    # base case
    if not matrix or not len(matrix):
        return

    # `N × N` matrix
    N = len(matrix)

    # create a queue and enqueue the first node
    q = deque()
    src = Node(x, y)
    q.append(src)

    # set to check if the matrix cell is visited before or not
    visited = set()

    key = (src.x, src.y)
    visited.add(key)

    # loop till queue is empty
    while q:

        # dequeue front node and process it
        curr = q.popleft()
        i = curr.x
        j = curr.y

        # return if the destination is found
        if i == N - 1 and j == N - 1:
            path = []
            getPath(curr, path)
            return path

        # value of the current cell
        n = matrix[i][j]

        # check all four possible movements from the current cell
        # and recur for each valid movement
        for k in range(len(row)):
            # get next position coordinates using the value of the current cell
            x = i + row[k] * n
            y = j + col[k] * n

            # check if it is possible to go to the next position
            # from the current position
            if isValid(x, y, N):
                # construct the next cell node
                next = Node(x, y, curr)
                key = (next.x, next.y)

                # if it isn't visited yet
                if key not in visited:
                    # enqueue it and mark it as visited
                    q.append(next)
                    visited.add(key)

    # return None if the path is not possible
    return

if __name__ == '__main__':

    matrix = [
        [4, 4, 6, 5, 5, 1, 1, 1, 7, 4],
        [3, 6, 2, 4, 6, 5, 7, 2, 6, 6],
        [1, 3, 6, 1, 1, 1, 7, 1, 4, 5],
        [7, 5, 6, 3, 1, 3, 3, 1, 1, 7],
        [3, 4, 6, 4, 7, 2, 6, 5, 4, 4],
        [3, 2, 5, 1, 2, 5, 1, 2, 3, 4],
        [4, 2, 2, 2, 5, 2, 3, 7, 7, 3],
        [7, 2, 4, 3, 5, 2, 2, 3, 6, 3],
        [5, 1, 4, 2, 6, 4, 6, 7, 3, 7],
        [1, 4, 1, 7, 5, 3, 6, 5, 3, 4]
    ]

    # Find a route in the matrix from source cell (0, 0) to
    # destination cell (N-1, N-1)
    path = findPath(matrix)

    if path:
        print('The shortest path is', path)
    else:
        print('Destination is not found')
```

In the above program, each node in the queue takes extra space as we are storing path information along with it. The space complexity can be improved if we are asked only to find the shortest distance from the source to the destination. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <map>
using namespace std;

// A queue node used in BFS
typedef pair<int, int> Node;

// Below arrays detail all four possible movements from a cell
int row[] = { -1, 0, 0, 1 };
int col[] = { 0, -1, 1, 0 };

// Function to check if it is possible to go to position `pt`
// from the current position. The function returns false if `pt` is
// not in a valid position, or it is already visited
bool isValid(Node pt, map<Node, int> visited, int N)
{
    return (pt.first >= 0) && (pt.first < N) &&
        (pt.second >= 0) && (pt.second < N) && !visited.count(pt);
}

// Find the shortest path length in a matrix from source cell (x, y) to
// destination cell (N-1, N-1)
int findPath(vector<vector<int>> const &mat, int x, int y)
{
    // `N × N` matrix
    int N = mat.size();

    // base case
    if (N == 0) {
        return -1;
    }

    // create a queue and enqueue the first node
    queue<Node> q;
    Node src = {x, y};
    q.push(src);

    // map to check if the matrix cell is visited before or not. It also
    // stores the shortest distance info, i.e., the value corresponding
    // to a node in the map represents its shortest distance from the source
    map<Node, int> visited;
    visited[src] = 0;

    // loop till queue is empty
    while (!q.empty())
    {
        // dequeue front node and process it
        Node node = q.front();
        q.pop();

        int i = node.first;
        int j = node.second;
        int dist = visited[node];

        // if the destination is found, return true
        if (i == N - 1 && j == N - 1) {
            return dist;
        }

        // value of the current cell
        int n = mat[i][j];

        // check all four possible movements from the current cell
        // and recur for each valid movement
        for (int k = 0; k < 4; k++)
        {
            // get the next position using the value of the current cell
            Node next = {(i + row[k] * n), (j + col[k] * n)};

            // check if it is possible to go to position (x, y)
            // from the current position
            if (isValid(next, visited, N))
            {
                q.push(next);
                visited[next] = dist + 1;
            }
        }
    }

    // return a negative number if the path is not possible
    return -1;
}

int main()
{
    vector<vector<int>> matrix =
    {
        { 7, 1, 3, 5, 3, 6, 1, 1, 7, 5 },
        { 2, 3, 6, 1, 1, 6, 6, 6, 1, 2 },
        { 6, 1, 7, 2, 1, 4, 7, 6, 6, 2 },
        { 6, 6, 7, 1, 3, 3, 5, 1, 3, 4 },
        { 5, 5, 6, 1, 5, 4, 6, 1, 7, 4 },
        { 3, 5, 5, 2, 7, 5, 3, 4, 3, 6 },
        { 4, 1, 4, 3, 6, 4, 5, 3, 2, 6 },
        { 4, 4, 1, 7, 4, 3, 3, 1, 4, 2 },
        { 4, 4, 5, 1, 5, 2, 3, 5, 3, 5 },
        { 3, 6, 3, 5, 2, 2, 6, 4, 2, 1 }
    };

    // Find a route in the matrix from source cell (0, 0) to
    // destination cell (N-1, N-1)
    int len = findPath(matrix, 0, 0);

    if (len != -1) {
        cout << "The shortest path length is " << len;
    }
    else {
        cout << "Destination not possible";
    }

    return 0;
}
```

**Output:** The shortest path length is 6

##

```java
import java.util.ArrayDeque;
import java.util.HashSet;
import java.util.Queue;
import java.util.Set;

// A queue node used in BFS
class Node
{
    // (x, y) represents coordinates of a cell in the matrix
    int x, y;

    // `level` stores the distance of a current node from the source node
    // (i.e., BFS level)
    int level;

    Node(int x, int y, int level)
    {
        this.x = x;
        this.y = y;
        this.level = level;
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ')';
    }
}

class Main
{
    // Below arrays detail all four possible movements from a cell
    private static int[] row = { -1, 0, 0, 1 };
    private static int[] col = { 0, -1, 1, 0 };

    // The function returns false if (x, y) is not a valid position
    private static boolean isValid(int x, int y, int N) {
        return (x >= 0 && x < N) && (y >= 0 && y < N);
    }

    // Find the shortest route in a matrix from source cell (x, y) to
    // destination cell (N-1, N-1)
    public static int findPath(int matrix[][], int x, int y)
    {
        // base case
        if (matrix == null || matrix.length == 0) {
            return -1;
        }

        // `N × N` matrix
        int N = matrix.length;

        // create a queue and enqueue the first node
        Queue<Node> q = new ArrayDeque<>();
        Node src = new Node(x, y, 0);
        q.add(src);

        // set to check if the matrix cell is visited before or not
        Set<String> visited = new HashSet<>();

        String key = src.x + "," + src.y;
        visited.add(key);

        // loop till queue is empty
        while (!q.isEmpty())
        {
            // dequeue front node and process it
            Node curr = q.poll();
            int i = curr.x;
            int j = curr.y;
            int level = curr.level;

            // return if the destination is found
            if (i == N - 1 && j == N - 1) {
                return level;
            }

            // value of the current cell
            int n = matrix[i][j];

            // check all four possible movements from the current cell
            // and recur for each valid movement
            for (int k = 0; k < row.length; k++)
            {
                // get next position coordinates using the value of the current cell
                x = i + row[k] * n;
                y = j + col[k] * n;

                // check if it is possible to go to the next position
                // from the current position
                if (isValid(x, y, N))
                {
                    // construct the next cell node
                    Node next = new Node(x, y, level + 1);

                    key = next.x + "," + next.y;

                    // if it isn't visited yet
                    if (!visited.contains(key))
                    {
                        // enqueue it and mark it as visited
                        q.add(next);
                        visited.add(key);
                    }
                }
            }
        }

        // return a negative number if the path is not possible
        return -1;
    }

    public static void main(String[] args)
    {
        int[][] matrix =
                {
                        { 4, 4, 6, 5, 5, 1, 1, 1, 7, 4 },
                        { 3, 6, 2, 4, 6, 5, 7, 2, 6, 6 },
                        { 1, 3, 6, 1, 1, 1, 7, 1, 4, 5 },
                        { 7, 5, 6, 3, 1, 3, 3, 1, 1, 7 },
                        { 3, 4, 6, 4, 7, 2, 6, 5, 4, 4 },
                        { 3, 2, 5, 1, 2, 5, 1, 2, 3, 4 },
                        { 4, 2, 2, 2, 5, 2, 3, 7, 7, 3 },
                        { 7, 2, 4, 3, 5, 2, 2, 3, 6, 3 },
                        { 5, 1, 4, 2, 6, 4, 6, 7, 3, 7 },
                        { 1, 4, 1, 7, 5, 3, 6, 5, 3, 4 }
                };

        // Find a route in the matrix from source cell (0, 0) to
        // destination cell (N-1, N-1)
        int dist = findPath(matrix, 0, 0);

        if (dist != -1) {
            System.out.println("The shortest path length is " + dist);
        }
        else {
            System.out.println("Destination is not found");
        }
    }
}
```

##

```python3
import sys
from collections import deque

# Below lists detail all four possible movements from a cell
row = [-1, 0, 0, 1]
col = [0, -1, 1, 0]

# The function returns false if (x, y) is not a valid position
def isValid(x, y, N):
    return 0 <= x < N and 0 <= y < N

# Find the shortest route in a matrix from source cell (x, y) to
# destination cell (N-1, N-1)
def findPath(matrix, x=0, y=0, level=0):

    # base case
    if not matrix or not len(matrix):
        return

    # `N × N` matrix
    N = len(matrix)

    # create a queue and enqueue the first node
    q = deque()

    # (x, y) represents coordinates of a cell in the matrix
    # `level` stores the distance of a current node from the source node
    # (i.e., BFS level)

    q.append((x, y, level))

    # set to check if the matrix cell is visited before or not
    visited = set()
    visited.add((x, y))

    # loop till queue is empty
    while q:

        # dequeue front node and process it
        i, j, level = q.popleft()

        # return if the destination is found
        if i == N - 1 and j == N - 1:
            return level

        # value of the current cell
        n = matrix[i][j]

        # check all four possible movements from the current cell
        # and recur for each valid movement
        for k in range(len(row)):
            # get next position coordinates using the value of the current cell
            x = i + row[k] * n
            y = j + col[k] * n

            # check if it is possible to go to the next position
            # from the current position
            if isValid(x, y, N):
                # if it isn't visited yet
                if (x, y) not in visited:

                    # construct the next cell node and enqueue it
                    # and mark it as visited
                    q.append((x, y, level + 1))
                    visited.add((x, y))

    # return a negative number if the path is not possible
    return -1

if __name__ == '__main__':

    matrix = [
        [4, 4, 6, 5, 5, 1, 1, 1, 7, 4],
        [3, 6, 2, 4, 6, 5, 7, 2, 6, 6],
        [1, 3, 6, 1, 1, 1, 7, 1, 4, 5],
        [7, 5, 6, 3, 1, 3, 3, 1, 1, 7],
        [3, 4, 6, 4, 7, 2, 6, 5, 4, 4],
        [3, 2, 5, 1, 2, 5, 1, 2, 3, 4],
        [4, 2, 2, 2, 5, 2, 3, 7, 7, 3],
        [7, 2, 4, 3, 5, 2, 2, 3, 6, 3],
        [5, 1, 4, 2, 6, 4, 6, 7, 3, 7],
        [1, 4, 1, 7, 5, 3, 6, 5, 3, 4]
    ]

    # Find a route in the matrix from source cell (0, 0) to
    # destination cell (N-1, N-1)
    dist = findPath(matrix)

    if dist != -1:
        print("The shortest path length is", dist)
    else:
        print("Destination is not found")
```
