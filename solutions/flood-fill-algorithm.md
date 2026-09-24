# Flood Fill Algorithm

> Source: https://www.techiedelight.com/flood-fill-algorithm/

Flood fill (also known as seed fill) is an algorithm that determines the area connected to a given node in a multi-dimensional array.

It is used in the “bucket” fill tool of a paint program to fill connected, similarly colored areas with a different color and in games such as Go and Minesweeper for determining which pieces are cleared. When applied on an image to fill a particular bounded area with color, it is also known as boundary fill.

The flood fill algorithm takes three parameters: a start node, a target color, and a replacement color.

Consider the following matrix to the left – if the start node is `(3, 9)`, target color is **“BLACK”** and replacement color is **“GREY”** , the algorithm looks for all nodes in the matrix that are connected to the start node by a path of the target color and changes them to the replacement color.

_Note that each cell of the matrix represents one pixel._

> 

## Approach 1: (Using BFS)

A [queue](https://techiedelight.com/circular-queue-implementation-c/)-based implementation using [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) is shown below in pseudocode.

**BFS (starting-pixel, replacement-color):**

  1. Create an empty queue.
  2. Enqueue starting pixel and mark it as processed.
  3. Loop till queue is empty

     1. Dequeue the front node and process it.
     2. Replace the color of the current pixel (popped node) with that of the replacement.
     3. Process all eight adjacent pixels of the current pixel and enqueue each valid pixel that has the same color as that of the current pixel.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <queue>
#include <iomanip>
using namespace std;

// Below arrays detail all eight possible movements
int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 };
int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 };

// check if it is possible to go to pixel (x, y) from the
// current pixel. The function returns false if the pixel
// has a different color, or it's not a valid pixel
bool isSafe(vector<vector<char>> const &mat, int x, int y, char target)
{
    return (x >= 0 && x < mat.size()) && (y >= 0 && y < mat[0].size())
        && mat[x][y] == target;
}

// Flood fill using BFS
void floodfill(vector<vector<char>> &mat, int x, int y, char replacement)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // create a queue and enqueue starting pixel
    queue<pair<int, int>> q;
    q.push({x, y});

    // get the target color
    char target = mat[x][y];

    // target color is same as replacement
    if (target == replacement) {
        return;
    }

    // break when the queue becomes empty
    while (!q.empty())
    {
        // dequeue front node and process it
        pair<int, int> node = q.front();
        q.pop();

        // (x, y) represents the current pixel
        int x = node.first, y = node.second;

        // replace the current pixel color with that of replacement
        mat[x][y] = replacement;

        // process all eight adjacent pixels of the current pixel and
        // enqueue each valid pixel
        for (int k = 0; k < 8; k++)
        {
            // if the adjacent pixel at position (x + row[k], y + col[k]) is
            // is valid and has the same color as the current pixel
            if (isSafe(mat, x + row[k], y + col[k], target))
            {
                // enqueue adjacent pixel
                q.push({x + row[k], y + col[k]});
            }
        }
    }
}

// Utility function to print a matrix
void printMatrix(vector<vector<char>> const &mat)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[0].size(); j++) {
            cout << setw(3) << mat[i][j];
        }
        cout << endl;
    }
}

int main()
{
    // matrix showing portion of the screen having different colors
    vector<vector<char>> mat =
    {
        { 'Y', 'Y', 'Y', 'G', 'G', 'G', 'G', 'G', 'G', 'G' },
        { 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'G', 'X', 'X', 'X' },
        { 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'X', 'X', 'X' },
        { 'W', 'W', 'W', 'W', 'W', 'G', 'G', 'G', 'G', 'X' },
        { 'W', 'R', 'R', 'R', 'R', 'R', 'G', 'X', 'X', 'X' },
        { 'W', 'W', 'W', 'R', 'R', 'G', 'G', 'X', 'X', 'X' },
        { 'W', 'B', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'X' },
        { 'W', 'B', 'B', 'B', 'B', 'R', 'R', 'X', 'X', 'X' },
        { 'W', 'B', 'B', 'X', 'B', 'B', 'B', 'B', 'X', 'X' },
        { 'W', 'B', 'B', 'X', 'X', 'X', 'X', 'X', 'X', 'X' }
    };

    // start node
    int x = 3, y = 9;    // having target color `X`

    // replacement color
    char replacement = 'C';

    // replace the target color with a replacement color
    floodfill(mat, x, y, replacement);

    // print the colors after replacement
    printMatrix(mat);

    return 0;
}
```

**Output:** Y Y Y G G G G G G G Y Y Y Y Y Y G C C C G G G G G G G C C C W W W W W G G G G C W R R R R R G C C C W W W R R G G C C C W B W R R R R R R C W B B B B R R C C C W B B C B B B B C C W B B C C C C C C C

##

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Queue;

class Pair
{
    int x, y;

    public Pair(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}

class Main
{
    // Below arrays detail all eight possible movements
    private static final int[] row = { -1, -1, -1, 0, 0, 1, 1, 1 };
    private static final int[] col = { -1, 0, 1, -1, 1, -1, 0, 1 };

    // check if it is possible to go to pixel (x, y) from the
    // current pixel. The function returns false if the pixel
    // has a different color, or it's not a valid pixel
    public static boolean isSafe(char[][] mat, int x, int y, char target)
    {
        return x >= 0 && x < mat.length && y >= 0 && y < mat[0].length
                && mat[x][y] == target;
    }

    // Flood fill using BFS
    public static void floodfill(char[][] mat, int x, int y, char replacement)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // create a queue and enqueue starting pixel
        Queue<Pair> q = new ArrayDeque<>();
        q.add(new Pair(x, y));

        // get the target color
        char target = mat[x][y];

        // target color is same as replacement
        if (target == replacement) {
            return;
        }

        // break when the queue becomes empty
        while (!q.isEmpty())
        {
            // dequeue front node and process it
            Pair node = q.poll();

            // (x, y) represents the current pixel
            x = node.x;
            y = node.y;

            // replace the current pixel color with that of replacement
            mat[x][y] = replacement;

            // process all eight adjacent pixels of the current pixel and
            // enqueue each valid pixel
            for (int k = 0; k < row.length; k++)
            {
                // if the adjacent pixel at position (x + row[k], y + col[k]) is
                // is valid and has the same color as the current pixel
                if (isSafe(mat,x + row[k], y + col[k], target))
                {
                    // enqueue adjacent pixel
                    q.add(new Pair(x + row[k], y + col[k]));
                }
            }
        }
    }

    public static void main(String[] args)
    {
        // matrix showing portion of the screen having different colors
        char[][] mat = {
                "YYYGGGGGGG".toCharArray(),
                "YYYYYYGXXX".toCharArray(),
                "GGGGGGGXXX".toCharArray(),
                "WWWWWGGGGX".toCharArray(),
                "WRRRRRGXXX".toCharArray(),
                "WWWRRGGXXX".toCharArray(),
                "WBWRRRRRRX".toCharArray(),
                "WBBBBRRXXX".toCharArray(),
                "WBBXBBBBXX".toCharArray(),
                "WBBXXXXXXX".toCharArray()
        };

        // start node
        int x = 3, y = 9;    // having target color `X`

        // replacement color
        char replacement = 'C';

        // replace the target color with a replacement color
        floodfill(mat, x, y, replacement);

        // print the colors after replacement
        for (char[] row: mat) {
            System.out.println(Arrays.toString(row));
        }
    }
}
```

##

```python3
from collections import deque

# Below lists detail all eight possible movements
row = [-1, -1, -1, 0, 0, 1, 1, 1]
col = [-1, 0, 1, -1, 1, -1, 0, 1]

# check if it is possible to go to pixel (x, y) from the
# current pixel. The function returns false if the pixel
# has a different color, or it's not a valid pixel
def isSafe(mat, x, y, target):
    return 0 <= x < len(mat) and 0 <= y < len(mat[0]) and mat[x][y] == target

# Flood fill using BFS
def floodfill(mat, x, y, replacement):

    # base case
    if not mat or not len(mat):
        return

    # create a queue and enqueue starting pixel
    q = deque()
    q.append((x, y))

    # get the target color
    target = mat[x][y]

    # target color is same as replacement
    if target == replacement:
        return

    # break when the queue becomes empty
    while q:

        # dequeue front node and process it
        x, y = q.popleft()

        # replace the current pixel color with that of replacement
        mat[x][y] = replacement

        # process all eight adjacent pixels of the current pixel and
        # enqueue each valid pixel
        for k in range(len(row)):
            # if the adjacent pixel at position (x + row[k], y + col[k]) is
            # is valid and has the same color as the current pixel
            if isSafe(mat, x + row[k], y + col[k], target):
                # enqueue adjacent pixel
                q.append((x + row[k], y + col[k]))

if __name__ == '__main__':

    # matrix showing portion of the screen having different colors
    mat = [
            ['Y', 'Y', 'Y', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
            ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'G', 'X', 'X', 'X'],
            ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'X', 'X', 'X'],
            ['W', 'W', 'W', 'W', 'W', 'G', 'G', 'G', 'G', 'X'],
            ['W', 'R', 'R', 'R', 'R', 'R', 'G', 'X', 'X', 'X'],
            ['W', 'W', 'W', 'R', 'R', 'G', 'G', 'X', 'X', 'X'],
            ['W', 'B', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'X'],
            ['W', 'B', 'B', 'B', 'B', 'R', 'R', 'X', 'X', 'X'],
            ['W', 'B', 'B', 'X', 'B', 'B', 'B', 'B', 'X', 'X'],
            ['W', 'B', 'B', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
    ]

    # start node
    x = 3
    y = 9

    # having target color `X`
    # replacement color
    replacement = 'C'

    # replace the target color with a replacement color
    floodfill(mat, x, y, replacement)

    # print the colors after replacement
    for r in mat:
        print(r)
```

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

## Approach 2: (Using DFS)

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to start from the source node in the matrix, replace its color with the replacement color and recursively explore all its valid eight adjacent pixels, and replace their color. Note that we don’t need a visited array here as we are replacing the color of every processed node, and it won’t be considered again next time as it will have a different color.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

// Below arrays detail all eight possible movements
int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 };
int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 };

// check if it is possible to go to pixel (x, y) from the
// current pixel. The function returns false if the pixel
// has a different color, or it's not a valid pixel
bool isSafe(vector<vector<char>> const &mat, int x, int y, char target)
{
    return (x >= 0 && x < mat.size()) && (y >= 0 && y < mat[0].size())
        && mat[x][y] == target;
}

// Flood fill using DFS
void floodfill(vector<vector<char>> &mat, int x, int y, char replacement)
{
    // base case
    if (mat.size() == 0) {
        return;
    }

    // get the target color
    char target = mat[x][y];

    // target color is same as replacement
    if (target == replacement) {
        return;
    }

    // replace the current pixel color with that of replacement
    mat[x][y] = replacement;

    // process all eight adjacent pixels of the current pixel and
    // recur for each valid pixel
    for (int k = 0; k < 8; k++)
    {
        // if the adjacent pixel at position (x + row[k], y + col[k]) is
        // a valid pixel and has the same color as that of the current pixel
        if (isSafe(mat, x + row[k], y + col[k], target)) {
            floodfill(mat, x + row[k], y + col[k], replacement);
        }
    }
}

// Utility function to print a matrix
void printMatrix(vector<vector<char>> const &mat)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[0].size(); j++) {
            cout << setw(3) << mat[i][j];
        }
        cout << endl;
    }
}

int main()
{
    // matrix showing portion of the screen having different colors
    vector<vector<char>> mat =
    {
        { 'Y', 'Y', 'Y', 'G', 'G', 'G', 'G', 'G', 'G', 'G' },
        { 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'G', 'X', 'X', 'X' },
        { 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'X', 'X', 'X' },
        { 'W', 'W', 'W', 'W', 'W', 'G', 'G', 'G', 'G', 'X' },
        { 'W', 'R', 'R', 'R', 'R', 'R', 'G', 'X', 'X', 'X' },
        { 'W', 'W', 'W', 'R', 'R', 'G', 'G', 'X', 'X', 'X' },
        { 'W', 'B', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'X' },
        { 'W', 'B', 'B', 'B', 'B', 'R', 'R', 'X', 'X', 'X' },
        { 'W', 'B', 'B', 'X', 'B', 'B', 'B', 'B', 'X', 'X' },
        { 'W', 'B', 'B', 'X', 'X', 'X', 'X', 'X', 'X', 'X' }
    };

    // start node
    int x = 3, y = 9;    // having a target color `X`

    // replacement color
    char replacement = 'C';

    // replace the target color with a replacement color using DFS
    floodfill(mat, x, y, replacement);

    // print the colors after replacement
    printMatrix(mat);

    return 0;
}
```

**Output:** Y Y Y G G G G G G G Y Y Y Y Y Y G C C C G G G G G G G C C C W W W W W G G G G C W R R R R R G C C C W W W R R G G C C C W B W R R R R R R C W B B B B R R C C C W B B C B B B B C C W B B C C C C C C C

##

```java
import java.util.Arrays;

class Main
{
    // Below arrays detail all eight possible movements
    private static final int[] row = { -1, -1, -1, 0, 0, 1, 1, 1 };
    private static final int[] col = { -1, 0, 1, -1, 1, -1, 0, 1 };

    // check if it is possible to go to pixel (x, y) from the
    // current pixel. The function returns false if the pixel
    // has a different color, or it's not a valid pixel
    public static boolean isSafe(char[][] mat, int x, int y, char target)
    {
        return x >= 0 && x < mat.length && y >= 0 && y < mat[0].length
                && mat[x][y] == target;
    }

    public static void floodfill(char[][] mat, int x, int y, char replacement)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return;
        }

        // get the target color
        char target = mat[x][y];

        // target color is same as replacement
        if (target == replacement) {
            return;
        }

        // replace the current pixel color with that of replacement
        mat[x][y] = replacement;

        // process all eight adjacent pixels of the current pixel and
        // recur for each valid pixel
        for (int k = 0; k < row.length; k++)
        {
            // if the adjacent pixel at position (x + row[k], y + col[k]) is
            // a valid pixel and has the same color as that of the current pixel
            if (isSafe(mat, x + row[k], y + col[k], target)) {
                floodfill(mat, x + row[k], y + col[k], replacement);
            }
        }
    }

    public static void main(String[] args)
    {
        // matrix showing portion of the screen having different colors
        char[][] mat = {
                "YYYGGGGGGG".toCharArray(),
                "YYYYYYGXXX".toCharArray(),
                "GGGGGGGXXX".toCharArray(),
                "WWWWWGGGGX".toCharArray(),
                "WRRRRRGXXX".toCharArray(),
                "WWWRRGGXXX".toCharArray(),
                "WBWRRRRRRX".toCharArray(),
                "WBBBBRRXXX".toCharArray(),
                "WBBXBBBBXX".toCharArray(),
                "WBBXXXXXXX".toCharArray()
        };

        // start node
        int x = 3, y = 9;    // having a target color `X`

        // replacement color
        char replacement = 'C';

        // replace the target color with a replacement color using DFS
        floodfill(mat, x, y, replacement);

        // print the colors after replacement
        for (char[] row: mat) {
            System.out.println(Arrays.toString(row));
        }
    }
}
```

##

```python3
# Below lists detail all eight possible movements
row = [-1, -1, -1, 0, 0, 1, 1, 1]
col = [-1, 0, 1, -1, 1, -1, 0, 1]

# check if it is possible to go to pixel (x, y) from the
# current pixel. The function returns false if the pixel
# has a different color, or it's not a valid pixel
def isSafe(mat, x, y, target):
    return 0 <= x < len(mat) and 0 <= y < len(mat[0]) and mat[x][y] == target

# Flood fill using DFS
def floodfill(mat, x, y, replacement):

    # base case
    if not mat or not len(mat):
        return

    # get the target color
    target = mat[x][y]

    # target color is same as replacement
    if target == replacement:
        return

    # replace the current pixel color with that of replacement
    mat[x][y] = replacement

    # process all eight adjacent pixels of the current pixel and
    # recur for each valid pixel
    for k in range(len(row)):

        # if the adjacent pixel at position (x + row[k], y + col[k]) is
        # a valid pixel and has the same color as that of the current pixel
        if isSafe(mat, x + row[k], y + col[k], target):
            floodfill(mat, x + row[k], y + col[k], replacement)

if __name__ == '__main__':

    # matrix showing portion of the screen having different colors
    mat = [
            ['Y', 'Y', 'Y', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
            ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'G', 'X', 'X', 'X'],
            ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'X', 'X', 'X'],
            ['W', 'W', 'W', 'W', 'W', 'G', 'G', 'G', 'G', 'X'],
            ['W', 'R', 'R', 'R', 'R', 'R', 'G', 'X', 'X', 'X'],
            ['W', 'W', 'W', 'R', 'R', 'G', 'G', 'X', 'X', 'X'],
            ['W', 'B', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'X'],
            ['W', 'B', 'B', 'B', 'B', 'R', 'R', 'X', 'X', 'X'],
            ['W', 'B', 'B', 'X', 'B', 'B', 'B', 'B', 'X', 'X'],
            ['W', 'B', 'B', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
        ]

    # start node
    x, y = (3, 9)   # having a target color `X`

    # replacement color
    replacement = 'C'

    # replace the target color with a replacement color using DFS
    floodfill(mat, x, y, replacement)

    # print the colors after replacement
    for r in mat:
        print(r)
```

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**References:** [Flood Fill – Wikipedia](https://en.wikipedia.org/wiki/Flood_fill)
