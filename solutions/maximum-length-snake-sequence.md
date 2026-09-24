# Maximum Length Snake Sequence

> Source: https://www.techiedelight.com/maximum-length-snake-sequence/

Given a square matrix, print the maximum length snake sequence in it. A snake sequence is defined as a sequence of numbers where each new number, which can only be located to the right or down of the current number, is either plus or minus one.

For example, we can either move right from any cell in the matrix (if that number is `±1`) or move down (if that number is `±1`). The problem is finding the longest path (snake sequence) through the matrix, keeping in mind that we can only move to a new cell whose value is `±1` concerning the current cell.

For example, the maximum length snake sequence of the following matrix is `5 — 4 — 5 — 6 — 7 — 8 — 7 — 6` as highlighted below:

Please note that multiple maximum length snake sequences can exist in the matrix. For example, `3 — 4 — 5 — 6 — 7 — 8 — 7 — 6` is another maximum length snake sequence in the above matrix.

> 

We can use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. For each matrix cell `(i, j)`, we need to calculate the maximum length of a snake, say `L[i][j]`, which ends in that cell. The recurrence relation for calculating `L[i][j]` will be:

if (abs(M[i][j] – M[i][j – 1]) == 1) L[i][j] = max(L[i][j], L[i][j – 1] + 1) if (abs(M[i][j] – M[i – 1][j]) == 1) L[i][j] = max(L[i][j], L[i – 1][j] + 1)

Now, the cell with the maximum value will correspond to the snake’s tail, and we can easily trace the path back to the snake’s head using the `L[][]` matrix. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
using namespace std;

// Pair to store snake's tail coordinates
typedef pair<int, int> Point;

// Construct maximum length snake sequence from the given tail and `L[]` matrix
vector<Point> constructPath(vector<vector<int>> const &L,
                vector<vector<int>> const &grid, Point tail)
{
    vector<Point> path;
    path.push_back(tail);

    int i = tail.first;
    int j = tail.second;

    // start from snake's tail till snake's head
    while (L[i][j])
    {
        if (i - 1 >= 0 && L[i][j] - L[i - 1][j] == 1 &&
            abs(grid[i - 1][j] - grid[i][j]) == 1)
        {
            path.push_back(make_pair(i - 1, j));
            i--;
        }
        // note that there can be multiple paths – hence we have placed 'else' block
        else if (j - 1 >= 0 && (L[i][j] - L[i][j - 1] == 1) &&
            abs(grid[i][j - 1] - grid[i][j]) == 1)
        {
            path.push_back(make_pair(i, j - 1));
            j--;
        }
    }

    // return vector containing the path
    return path;
}

// Function to find the maximum length of snake sequence in a given matrix
vector<Point> findMaxLengthSnakeSequence(vector<vector<int>> const &grid)
{
    // `N × N` matrix
    int N = grid.size();

    // base case
    if (N == 0) {
        return {};
    }

    // `L[i][j]` stores the maximum length of the snake sequence
    // ending at cell (i, j)
    vector<vector<int>> L(N, vector<int>(N));

    // stores the maximum length of the snake sequence
    int max_so_far = 0;

    // Pair to store coordinates of a snake's tail
    Point tail;

    // process the matrix in a bottom-up fashion
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            // initialize each element by 0
            L[i][j] = 0;

            // compare the current cell with the top cell and check the
            // absolute difference
            if (i - 1 >= 0 && abs(grid[i - 1][j] - grid[i][j]) == 1)
            {
                L[i][j] = L[i - 1][j] + 1;
                if (max_so_far < L[i][j])
                {
                    max_so_far = L[i][j];
                    tail = make_pair(i, j);
                }
            }

            // compare the current cell with the left cell and check the
            // absolute difference
            if (j - 1 >= 0 && abs(grid[i][j - 1] - grid[i][j]) == 1)
            {
                // `L[i][j]` can be non-zero at this point, hence take the maximum
                L[i][j] = max(L[i][j], L[i][j - 1] + 1);

                if (max_so_far < L[i][j])
                {
                    max_so_far = L[i][j];
                    tail = make_pair(i, j);
                }
            }
        }
    }

    // construct the maximum length snake sequence
    return constructPath(L, grid, tail);
}

void printSnakeSequence(vector<vector<int>> const &grid, vector<Point> const &path)
{
    // base case
    if (path.size() == 0) {
        return;
    }

    cout << "The maximum length snake sequence is ";

    // use reverse iterator to print the vector (from snake's head to tail)
    auto it = path.rbegin();
    while (it != path.rend()) {
        cout << grid[it->first][it->second];
        if (++it != path.rend()) {
            cout << " — ";
        }
    }

    cout << endl << "The length is " << path.size() - 1;
}

int main()
{
    vector<vector<int>> grid =
    {
        { 7, 5, 2, 3, 1 },
        { 3, 4, 1, 4, 4 },
        { 1, 5, 6, 7, 8 },
        { 3, 4, 5, 8, 9 },
        { 3, 2, 2, 7, 6 }
    };

    vector<Point> path = findMaxLengthSnakeSequence(grid);
    printSnakeSequence(grid, path);

    return 0;
}
```

**Output:** The maximum length snake sequence is 5 — 4 — 5 — 6 — 7 — 8 — 7 — 6 The length is 7

##

```java
import java.util.ArrayList;
import java.util.List;

class Pair
{
    int first, second;

    public Pair(int first, int second)
    {
        this.first = first;
        this.second = second;
    }
}

class Main
{
    // Construct maximum length snake sequence from the given tail and `L[]` matrix
    public static List<Pair> constructPath(int[][] L, int[][] grid, Pair tail)
    {
        List<Pair> path = new ArrayList<>();
        path.add(tail);

        int i = tail.first;
        int j = tail.second;

        // start from snake's tail till snake's head
        while (L[i][j] != 0)
        {
            if (i - 1 >= 0 && L[i][j] - L[i - 1][j] == 1
                    && Math.abs(grid[i - 1][j] - grid[i][j]) == 1)
            {
                path.add(new Pair(i - 1, j));
                i--;
            }
            // note that there can be multiple paths
            else if (j - 1 >= 0 && (L[i][j] - L[i][j - 1] == 1)
                    && Math.abs(grid[i][j - 1] - grid[i][j]) == 1)
            {
                path.add(new Pair(i, j - 1));
                j--;
            }
        }

        return path;
    }

    // Function to find the maximum length of snake sequence in a given matrix
    public static List<Pair> findMaxLengthSnakeSequence(int[][] grid)
    {
        // base case
        if (grid == null || grid.length == 0) {
            return null;
        }

        // `L[i][j]` stores the maximum length of the snake sequence
        // ending at cell (i, j)
        int[][] L = new int[grid.length][grid.length];

        // stores the maximum length of the snake sequence
        int max_so_far = 0;

        // Pair to store coordinates of a snake's tail
        Pair tail = null;

        // process the matrix in a bottom-up fashion
        for (int i = 0; i < grid.length; i++)
        {
            for (int j = 0; j < grid.length; j++)
            {
                // initialize each element by 0
                L[i][j] = 0;

                // compare the current cell with the top cell and check the absolute
                // difference
                if (i-1 >= 0 && Math.abs(grid[i - 1][j] - grid[i][j]) == 1)
                {
                    L[i][j] = L[i - 1][j] + 1;
                    if (max_so_far < L[i][j])
                    {
                        max_so_far = L[i][j];
                        tail = new Pair(i, j);
                    }
                }

                // compare the current cell with the left cell and check the absolute
                // difference
                if (j-1 >= 0 && Math.abs(grid[i][j - 1] - grid[i][j]) == 1)
                {
                    // `L[i][j]` can be non-zero at this point, hence take max
                    L[i][j] = Integer.max(L[i][j], L[i][j - 1] + 1);
                    if (max_so_far < L[i][j])
                    {
                        max_so_far = L[i][j];
                        tail = new Pair(i, j);
                    }
                }
            }
        }

        // construct the maximum length snake sequence
        return constructPath(L, grid, tail);
    }

    public static void printSnakeSequence(int[][] grid, List<Pair> path)
    {
        // base case
        if (path == null || path.size() == 0) {
            return;
        }

        System.out.print("The maximum length snake sequence is ");

        // print the list in reverse (from snake's head to tail)
        for (int i = path.size() - 1; i >= 0; i--) {
            System.out.print(grid[path.get(i).first][path.get(i).second]);
            if (i != 0) {
                System.out.print(" — ");
            }
        }

        System.out.println("\nThe length is " + (path.size() - 1));
    }

    public static void main(String[] args)
    {
        int[][] grid =
        {
            { 7, 5, 2, 3, 1 },
            { 3, 4, 1, 4, 4 },
            { 1, 5, 6, 7, 8 },
            { 3, 4, 5, 8, 9 },
            { 3, 2, 2, 7, 6 }
        };

        List<Pair> path = findMaxLengthSnakeSequence(grid);
        printSnakeSequence(grid, path);
    }
}
```

##

```python3
# Construct maximum length snake sequence from the given tail and `L[]` matrix
def constructPath(L, grid, tail):

    (i, j) = tail
    path = [tail]

    # start from snake's tail till snake's head
    while L[i][j]:
        if i - 1 >= 0 and L[i][j] - L[i - 1][j] == 1 and \
                abs(grid[i - 1][j] - grid[i][j]) == 1:
            path.append((i - 1, j))
            i = i - 1
        elif j - 1 >= 0 and L[i][j] - L[i][j - 1] == 1 and \
                abs(grid[i][j - 1] - grid[i][j]) == 1:
            path.append((i, j - 1))
            j = j - 1

    return path

# Function to find the maximum length of snake sequence in a given matrix
def findMaxLengthSnakeSequence(grid):

    # base case
    if not grid or not len(grid):
        return

    # `L[i][j]` stores the maximum length of the snake sequence
    # ending at cell (i, j)
    L = [[0 for x in range(len(grid))] for y in range(len(grid))]

    # stores the maximum length of the snake sequence
    max_so_far = 0

    # Pair to store coordinates of a snake's tail
    tail = None

    # process the matrix in a bottom-up fashion
    for i in range(len(grid)):
        for j in range(len(grid)):
            # compare the current cell with the top cell and check the
            # absolute difference
            if i - 1 >= 0 and abs(grid[i - 1][j] - grid[i][j]) == 1:
                L[i][j] = L[i - 1][j] + 1
                if max_so_far < L[i][j]:
                    max_so_far = L[i][j]
                    tail = (i, j)

            # compare the current cell with the left cell and check the
            # absolute difference
            if j - 1 >= 0 and abs(grid[i][j - 1] - grid[i][j]) == 1:
                # `L[i][j]` can be non-zero at this point, hence take the maximum
                L[i][j] = max(L[i][j], L[i][j - 1] + 1)
                if max_so_far < L[i][j]:
                    max_so_far = L[i][j]
                    tail = (i, j)

    # construct the maximum length snake sequence
    return constructPath(L, grid, tail)

def printSnakeSequence(grid, path):
    # base case
    if not grid or not len(grid):
        return

    print('The maximum length snake sequence ', end='')
    # use reverse range to print the List (from snake's head to tail)
    print(' — '.join([str(grid[x][y]) for x, y in path][::-1]))
    print('The length is', len(path) - 1)

if __name__ == '__main__':

    grid = [
        [7, 5, 2, 3, 1],
        [3, 4, 1, 4, 4],
        [1, 5, 6, 7, 8],
        [3, 4, 5, 8, 9],
        [3, 2, 2, 7, 6]
    ]

    path = findMaxLengthSnakeSequence(grid)
    printSnakeSequence(grid, path)
```

The time complexity of the proposed solution is O(N2) for an `N × N` matrix. The auxiliary space required by the program is O(N2).

**Exercise:** Extend the solution for a rectangular matrix

Also See:

> [Find the length of the longest path in a matrix with consecutive characters](https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/ "Find the length of the longest path in a matrix with consecutive characters")

> [Find the longest possible route in a matrix](https://www.techiedelight.com/find-longest-possible-route-matrix/ "Find the longest possible route in a matrix")

> [Collect maximum value of coins in a matrix](https://www.techiedelight.com/collect-maximum-value-coins-matrix/ "Collect maximum value of coins in a matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 222

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
