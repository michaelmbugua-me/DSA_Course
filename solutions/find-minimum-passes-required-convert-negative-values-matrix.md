# Find minimum passes required to convert all negative values in a matrix

> Source: https://www.techiedelight.com/find-minimum-passes-required-convert-negative-values-matrix/

Given an `M × N` matrix of integers whose each cell can contain a negative, zero, or a positive value, determine the minimum number of passes required to convert all negative values in the matrix positive.

Only a non-zero positive value at cell `(i, j)` can convert negative values present at its adjacent cells `(i-1, j)`, `(i+1, j)`, `(i, j-1)`, and `(i, j+1)`, i.e., up, down, left and right.

For example, the following matrix needs 3 passes, as demonstrated:

> 

The idea is to use [Breadth–first Search](https://techiedelight.com/breadth-first-search/) as it is the shortest path problem. The algorithm can be implemented as follows:

  1. Create a [queue](https://techiedelight.com/circular-queue-implementation-c/) `Q` and enqueue cell coordinates of all positive numbers in the matrix. Create another queue `q` to separate the positive numbers involved in the previous pass from the positive numbers in the current pass.
  2. Do till first queue `Q` is empty
     1. Copy contents of the original queue `Q` to the second queue `q` and empty the original queue.
     2. Do till second queue `q` is empty
        1. Remove the front node from queue `q` and check all four adjacent cells of the current cell.
        2. If any of the four adjacent cells is negative, make its value positive and enqueue it into queue `Q`.
     3. Increment number of passes by 1.
  3. If all the nodes in the queue are processed, return the total number of passes.

We can find all the adjacent cells of the given cell by storing the relative position of movement from any cell in an array. For example, if the current cell is `(x, y)`, we can move to `(x + row[k], y + col[k])` cell for `0 <= k < 4` using the following arrays:

row[] = { -1, 0, 0, 1 } col[] = { 0, -1, 1, 0 } So, from any position `(x, y)`, we can move to: (x – 1, y) (x, y – 1) (x, y + 1) (x + 1, y)

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <algorithm>
#include <queue>
using namespace std;

// Data structure to store the cell coordinates of the matrix
struct Point {
    int x, y;
};

// Function to check whether given coordinates is a valid cell or not
bool isValid(int i, int j, vector<vector<int>> &mat) {
    return (i >= 0 && i < mat.size()) && (j >= 0 && j < mat[0].size());
}

// Below arrays detail all four possible movements from a cell
// (top, right, bottom, and left)
int row[] = { -1, 0, 0, 1 };
int col[] = { 0, -1, 1, 0 };

// Returns true if the matrix contains at least one negative value
bool hasNegative(vector<vector<int>> &mat)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[0].size(); j++)
        {
            if (mat[i][j] < 0) {
                return true;
            }
        }
    }
    return false;
}

// Find the minimum number of passes required to convert all negative values
// in the given matrix to positive
int findMinPasses(vector<vector<int>> &mat)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // create a queue to store cell coordinates of positive integers
    queue<Point> Q;

    // enqueue cell coordinates of all positive numbers in the matrix
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[0].size(); j++)
        {
            if (mat[i][j] > 0) {
                Q.push({i, j});
            }
        }
    }

    // to keep track of the time taken to make all numbers positive
    int passes = 0;

    // loop till all reachable negative numbers in the matrix are processed
    while (!Q.empty())
    {
        // use two queues to separate positive numbers involved in the
        // previous pass with positive numbers involved in the current pass
        queue<Point> q;

        // copy contents of the original queue `Q` to another queue `q` and
        // empty the original queue
        swap(Q, q);

        /* Start of the current pass */

        // process all cells in the queue
        while (!q.empty())
        {
            // pop front node and process it
            int x = q.front().x;
            int y = q.front().y;
            q.pop();

            // check all four adjacent cells of the current cell
            for (int k = 0; k < 4; k++)
            {
                // if the current adjacent cell is valid and has a negative value
                if (isValid(x + row[k], y + col[k], mat) &&
                    mat[x + row[k]][y + col[k]] < 0)
                {
                    // make the value positive
                    mat[x + row[k]][y + col[k]] = -mat[x + row[k]][y + col[k]];

                    // enqueue adjacent cell
                    Q.push({x + row[k], y + col[k]});
                }
            }
        }

        /* End of the current pass */

        // increment number of passes by 1
        passes++;
    }

    // return number of passes or
    // -1 if the matrix has an unreachable cell which is negative
    return hasNegative(mat) ? -1 : (passes - 1);
}

int main()
{
    vector<vector<int>> mat =
    {
        { -1, -9, 0, -1, 0 },
        { -8, -3, -2, 9, -7 },
        { 2, 0, 0, -6, 0 },
        { 0, -7, -3, 5, -4 }
    };

    int pass = findMinPasses(mat);
    if (pass != -1) {
        cout << "The total number of passes required is " << pass;
    }
    else {
        cout << "Invalid Input";
    }

    return 0;
}
```

**Output:** The total number of passes required is 3

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A class to store the cell coordinates of the matrix
class Point
{
    int x, y;

    Point(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}

class Main
{
    // Function to check whether given coordinates is a valid cell or not
    private static boolean isValid(int i, int j, int M, int N) {
        return (i >= 0 && i < M) && (j >= 0 && j < N);
    }

    // Below arrays detail all four possible movements from a cell
    // (top, right, bottom, and left)
    private static int[] row = { -1, 0, 0, 1 };
    private static int[] col = { 0, -1, 1, 0 };

    // Returns true if the matrix contains at least one negative value
    private static boolean hasNegative(int[][] mat)
    {
        for (int i = 0; i < mat.length; i++)
        {
            for (int j = 0; j < mat[0].length; j++) {
                if (mat[i][j] < 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // Find the minimum number of passes required to convert all negative values
    // in the given matrix to positive
    public static int findMinPasses(int[][] mat)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // `M × N` matrix
        int M = mat.length;
        int N = mat[0].length;

        // create a queue to store cell coordinates of positive integers
        Queue<Point> Q = new ArrayDeque<>();

        // enqueue cell coordinates of all positive numbers in the matrix
        for (int i = 0; i < M; i++)
        {
            for (int j = 0; j < N; j++)
            {
                if (mat[i][j] > 0) {
                    Q.add(new Point(i, j));
                }
            }
        }

        // to keep track of the time taken to make all numbers positive
        int passes = 0;

        // loop till all reachable negative numbers in the matrix are processed
        while (!Q.isEmpty())
        {
            // use two queues to separate positive numbers involved in the
            // previous pass with positive numbers involved in the current pass
            Queue<Point> q;

            // copy contents of the original queue `Q` to another queue `q` and
            // empty the original queue
            q = new ArrayDeque<>(Q);
            Q.clear();

            /* Start of the current pass */

            // process all cells in the queue
            while (!q.isEmpty())
            {
                // pop front node and process it
                int x = q.peek().x;
                int y = q.peek().y;
                q.poll();

                // check all four adjacent cells of the current cell
                for (int k = 0; k < row.length; k++)
                {
                    // if the current adjacent cell is valid and has a negative value
                    if (isValid(x + row[k], y + col[k], M, N) &&
                            mat[x + row[k]][y + col[k]] < 0)
                    {
                        // make the value positive
                        mat[x + row[k]][y + col[k]] = -mat[x + row[k]][y + col[k]];

                        // enqueue adjacent cell
                        Q.add(new Point(x + row[k], y + col[k]));
                    }
                }
            }

            /* End of the current pass */

            // increment number of passes by 1
            passes++;
        }

        // return number of passes or
        // -1 if the matrix has an unreachable cell which is negative
        return hasNegative(mat) ? -1 : (passes - 1);
    }

    public static void main(String[] args)
    {
        int[][] mat =
                {
                        { -1, -9, 0, -1, 0 },
                        { -8, -3, -2, 9, -7 },
                        { 2, 0, 0, -6, 0 },
                        { 0, -7, -3, 5, -4 }
                };

        int pass = findMinPasses(mat);
        if (pass != -1) {
            System.out.print("The total number of passes required is " + pass);
        }
        else {
            System.out.print("Invalid Input");
        }
    }
}
```

##

```python3
from collections import deque

# Function to check whether given coordinates is a valid cell or not
def isValid(i, j, M, N):
    return (0 <= i < M) and (0 <= j < N)

# Below lists detail all four possible movements from a cell
# (top, right, bottom, and left)
row = [-1, 0, 0, 1]
col = [0, -1, 1, 0]

# Returns true if the matrix contains at least one negative value
def hasNegative(mat):
    for i in range(len(mat)):
        for j in range(len(mat[0])):
            if mat[i][j] < 0:
                return True
    return False

# Find the minimum number of passes required to convert all negative values
# in the given matrix to positive
def findMinPasses(mat):

    # base case
    if not mat or not len(mat):
        return 0

    # `M × N` matrix
    (M, N) = (len(mat), len(mat[0]))

    # create a queue to store cell coordinates of positive integers
    Q = deque()

    # enqueue cell coordinates of all positive numbers in the matrix
    for i in range(M):
        for j in range(N):
            if mat[i][j] > 0:
                Q.append((i, j))

    # to keep track of the time taken to make all numbers positive
    passes = 0

    # loop till all reachable negative numbers in the matrix are processed
    while Q:

        # use two queues to separate positive numbers involved in the
        # previous pass with positive numbers involved in the current pass

        # copy contents of the original queue `Q` to another queue `q` and
        # empty the original queue
        q = Q.copy()
        Q.clear()

        ''' Start of the current pass '''

        # process all cells in the queue
        while q:

            # pop front node and process it
            x, y = q.popleft()

            # check all four adjacent cells of the current cell
            for k in range(len(row)):
                # if the current adjacent cell is valid and has a negative value
                if isValid(x + row[k], y + col[k], M, N) and \
                        mat[x + row[k]][y + col[k]] < 0:
                    # make the value positive
                    mat[x + row[k]][y + col[k]] = -1 * mat[x + row[k]][y + col[k]]

                    # enqueue adjacent cell
                    Q.append((x + row[k], y + col[k]))

        ''' End of the current pass '''

        # increment number of passes by 1
        passes = passes + 1

    # return number of passes or
    # -1 if the matrix has an unreachable cell which is negative
    return -1 if hasNegative(mat) else (passes - 1)

if __name__ == '__main__':

    mat = [
        [-1, -9, 0, -1, 0],
        [-8, -3, -2, 9, -7],
        [2, 0, 0, -6, 0],
        [0, -7, -3, 5, -4]
    ]

    passes = findMinPasses(mat)
    if passes != -1:
        print("No of passes required is", passes)
    else:
        print("Invalid Input")
```

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space for queue data structure, where `M` and `N` are dimensions of the matrix.

Also See:

> [Find the shortest distance of every cell from a landmine inside a maze](https://www.techiedelight.com/find-shortest-distance-every-cell-landmine-maze/ "Find the shortest distance of every cell from a landmine inside a maze")

> [Replace all occurrences of 0 that are surrounded by 1 in a binary matrix](https://www.techiedelight.com/replace-occurrences-of-0-surrounded-by-1-matrix/ "Replace all occurrences of 0 that are surrounded by 1 in a binary matrix")

> [Find the length of the longest path in a matrix with consecutive characters](https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/ "Find the length of the longest path in a matrix with consecutive characters")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 163

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Breadth-first search](https://www.techiedelight.com/Tags/BFS/), [FIFO](https://www.techiedelight.com/Tags/FIFO/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
