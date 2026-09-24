# Find the longest sequence formed by adjacent numbers in the matrix

> Source: https://www.techiedelight.com/find-longest-sequence-formed-adjacent-numbers-matrix/

Given an `N × N` matrix where each cell has a distinct value in the 1 to `N × N`. Find the longest sequence formed by adjacent numbers in the matrix such that for each number, the number on the adjacent neighbor is `+1` in its value.

If we are at location `(x, y)` in the matrix, we can move to `(x, y+1)`, `(x, y-1)`, `(x+1, y)`, or `(x-1, y)` if the value at the destination cell is one more than the value at source cell. For example, the longest sequence formed by adjacent numbers in the following matrix is `[2, 3, 4, 5, 6, 7]`:

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. We can recursively define the problem as:

The longest path starting from cell (i, j) = M[i][j] + | longest path starting from cell (i-1, j) (if M[i][j] + 1 = M[i-1][j]) | longest path starting from cell (i, j-1) (if M[i][j] + 1 = M[i][j-1]) | longest path starting from cell (i, j+1) (if M[i][j] + 1 = M[i][j+1]) | longest path starting from cell (i+1, j) (if M[i][j] + 1 = M[i+1][j])

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

// Function to check if a cell (i, j) is valid or not
bool isValid(int i, int j, int N) {
    return (i >= 0 && i < N && j >= 0 && j < N);
}

// Find the longest path starting from cell (i, j) formed by adjacent
// numbers in a matrix
vector<int> findLongestPath(vector<vector<int>> const &mat, int i, int j)
{
    // string to store path starting (i, j)
    vector<int> path;

    // `N × N` matrix
    int N = mat.size();

    // if the cell is invalid
    if (!isValid (i, j, N)) {
        return path;
    }

    // Since the matrix contains all distinct elements,
    // there is only one path possible from the current cell

    // recur top cell if its value is +1 of value at (i, j)
    if (i > 0 && mat[i - 1][j] - mat[i][j] == 1) {
        path = findLongestPath(mat, i - 1, j);
    }

    // recur right cell if its value is +1 of value at (i, j)
    if (j + 1 < N && mat[i][j + 1] - mat[i][j] == 1) {
        path = findLongestPath(mat, i, j + 1);
    }

    // recur bottom cell if its value is +1 of value at (i, j)
    if (i + 1 < N && mat[i + 1][j] - mat[i][j] == 1) {
        path = findLongestPath(mat, i + 1, j);
    }

    // recur left cell if its value is +1 of value at (i, j)
    if (j > 0 && mat[i][j - 1] - mat[i][j] == 1) {
        path = findLongestPath(mat, i, j - 1);
    }

    // return path starting from (i, j)
    path.push_back(mat[i][j]);
    return path;
}

vector<int> findLongestPath(vector<vector<int>> const &mat)
{
    // stores the longest path found so far
    vector<int> longest_path;

    // from each cell (i, j), find the longest path starting from it
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat.size(); j++)
        {
            vector<int> path = findLongestPath(mat, i, j);

            // update result if a longer path is found
            if (path.size() > longest_path.size()) {
                longest_path = path;
            }
        }
    }

    reverse(longest_path.begin(), longest_path.end());
    return longest_path;
}

template <typename T>
void printVector(vector<T> const &input)
{
    cout << "[";
    int n = input.size();
    for (int i = 0; i < n; i++) {
        cout << input[i];
        if (i < n - 1) {
            cout << ", ";
        }
    }
    cout << "]";
}

int main()
{
    vector<vector<int>> mat =
    {
        { 10, 13, 14, 21, 23 },
        { 11, 9, 22, 2, 3 },
        { 12, 8, 1, 5, 4 },
        { 15, 24, 7, 6, 20 },
        { 16, 17, 18, 19, 25 }
    };

    vector<int> output = findLongestPath(mat);
    printVector(output);

    return 0;
}
```

**Output:** [2, 3, 4, 5, 6, 7]

##

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Main
{
    // Function to check if a cell (i, j) is valid or not
    public static boolean isValid(int[][] mat, int i, int j) {
        return (i >= 0 && i < mat.length && j >= 0 && j < mat.length);
    }

    // Find the longest path starting from cell (i, j) formed by adjacent
    // numbers in a matrix
    public static List<Integer> findLongestPath(int[][] mat, int i, int j)
    {
        // string to store path starting (i, j)
        List<Integer> path = new ArrayList<>();

        // if the cell is invalid
        if (!isValid (mat, i, j)) {
            return path;
        }

        // Since the matrix contains all distinct elements,
        // there is only one path possible from the current cell

        // recur top cell if its value is +1 of value at (i, j)
        if (i > 0 && mat[i - 1][j] - mat[i][j] == 1) {
            path = findLongestPath(mat, i - 1, j);
        }

        // recur right cell if its value is +1 of value at (i, j)
        if (j + 1 < mat.length && mat[i][j + 1] - mat[i][j] == 1) {
            path = findLongestPath(mat, i, j + 1);
        }

        // recur bottom cell if its value is +1 of value at (i, j)
        if (i + 1 < mat.length && mat[i + 1][j] - mat[i][j] == 1) {
            path = findLongestPath(mat, i + 1, j);
        }

        // recur left cell if its value is +1 of value at (i, j)
        if (j > 0 && mat[i][j - 1] - mat[i][j] == 1) {
            path = findLongestPath(mat, i, j - 1);
        }

        // return path starting from (i, j)
        path.add(mat[i][j]);

        return path;
    }

    public static List<Integer> findLongestPath(int[][] mat)
    {
        // stores the longest path found so far
        List<Integer> longest_path = new ArrayList<>();

        // base case
        if (mat == null || mat.length == 0) {
            return longest_path;
        }

        // from each cell (i, j), find the longest path starting from it
        for (int i = 0; i < mat.length; i++)
        {
            for (int j = 0; j < mat.length; j++)
            {
                // find current path
                List<Integer> path = findLongestPath(mat, i, j);

                // update result if a longer path is found
                if (longest_path == null || path.size() > longest_path.size()) {
                    longest_path = path;
                }
            }
        }

        Collections.reverse(longest_path);
        return longest_path;
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 10, 13, 14, 21, 23 },
            { 11, 9, 22, 2, 3 },
            { 12, 8, 1, 5, 4 },
            { 15, 24, 7, 6, 20 },
            { 16, 17, 18, 19, 25 }
        };

        // find and print the longest path
        System.out.println(findLongestPath(mat));
    }
}
```

##

```python3
# Function to check if a cell (i, j) is valid or not
def isValid(mat, i, j):
    return 0 <= i < len(mat) and 0 <= j < len(mat)

# Find the longest path starting from cell (i, j) formed by adjacent
# numbers in a matrix
def findLongestPath(mat, i, j):

    # if the cell is invalid
    if not isValid(mat, i, j):
        return []

    # string to store path starting (i, j)
    path = []

    # Since the matrix contains all distinct elements,
    # there is only one path possible from the current cell

    # recur top cell if its value is +1 of value at (i, j)
    if i > 0 and mat[i - 1][j] - mat[i][j] == 1:
        path = findLongestPath(mat, i - 1, j)

    # recur right cell if its value is +1 of value at (i, j)
    if j + 1 < len(mat) and mat[i][j + 1] - mat[i][j] == 1:
        path = findLongestPath(mat, i, j + 1)

    # recur bottom cell if its value is +1 of value at (i, j)
    if i + 1 < len(mat) and mat[i + 1][j] - mat[i][j] == 1:
        path = findLongestPath(mat, i + 1, j)

    # recur left cell if its value is +1 of value at (i, j)
    if j > 0 and mat[i][j - 1] - mat[i][j] == 1:
        path = findLongestPath(mat, i, j - 1)

    # return path starting from (i, j)
    path.insert(0, mat[i][j])
    return path

def longestPath(mat):

    # base case
    if not mat or not len(mat):
        return []

    # stores the longest path found so far
    longest_path = []

    # from each cell (i, j), find the longest path starting from it
    for i in range(len(mat)):
        for j in range(len(mat)):
            # store current path
            path = findLongestPath(mat, i, j)

            # update result if a longer path is found
            if len(path) > len(longest_path):
                longest_path = path  # update the longest path found so far

    # print the path
    return longest_path

if __name__ == '__main__':

    mat = [
            [10, 13, 14, 21, 23],
            [11, 9, 22, 2, 3],
            [12, 8, 1, 5, 4],
            [15, 24, 7, 6, 20],
            [16, 17, 18, 19, 25]
        ]

    # find and print the longest path
    print(longestPath(mat))
```

The implementation that involves only finding the length of the longest sequence can be seen [here](https://techiedelight.com/compiler/?run=EOO3Gy).

The time complexity of the proposed solution is exponential as we are doing a lot of redundant work. As we are calculating the longest path starting from each cell (i, j) of the matrix. Therefore,

The longest path starting from 2 is (2 — **3 — 4 — 5 — 6 — 7**) The longest path starting from 3 is (**3 — 4 — 5 — 6 — 7**) The longest path starting from 5 is (5 — 6 — 7) The longest path starting from 4 is (4 — 5 — 6 — 7) The longest path starting from 6 is (6 — 7)

The longest path starting from 2 is (2 — 3 — **4 — 5 — 6 — 7**) The longest path starting from 3 is (3 — **4 — 5 — 6 — 7**) The longest path starting from 5 is (5 — 6 — 7) The longest path starting from 4 is (**4 — 5 — 6 — 7**) The longest path starting from 6 is (6 — 7)

The longest path starting from 2 is (2 — 3 — 4 — **5 — 6 — 7**) The longest path starting from 3 is (3 — 4 — **5 — 6 — 7**) The longest path starting from 5 is (**5 — 6 — 7**) The longest path starting from 4 is (4 — **5 — 6 — 7**) The longest path starting from 6 is (6 — 7)

The longest path starting from 2 is (2 — 3 — 4 — 5 — **6 — 7**) The longest path starting from 3 is (3 — 4 — 5 — **6 — 7**) The longest path starting from 5 is (5 — **6 — 7**) The longest path starting from 4 is (4 — 5 — **6 — 7**) The longest path starting from 6 is (**6 — 7**)

As we can see, the same subproblems are getting computed repeatedly. As the recursion grows deeper, more and more of this type of unnecessary repetition occurs. We know that problems having optimal substructure and [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) can be solved by dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. Now each time we compute the longest path starting from cell (i, j), save it. If we are ever asked to compute it again, give the saved answer and do not recompute it.

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <climits>
#include <unordered_map>
#include <algorithm>
using namespace std;

// create a map to store solutions to subproblems
unordered_map<string, string> lookup;

// Function to check if a cell (i, j) is valid or not
bool isValid(int i, int j, int N) {
    return (i >= 0 && i < N && j >= 0 && j < N);
}

// Find the longest path starting from cell (i, j) formed by adjacent
// numbers in a matrix
string findLongestPath(vector<vector<int>> const &mat, int i, int j)
{
    // get size of the matrix
    int N = mat.size();

    // if the cell is invalid
    if (!isValid(i, j, N)) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(i) + "|" + to_string(j);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // string to store path starting (i, j)
        string path;

        // recur top cell if its value is +1 of value at (i, j)
        if (i > 0 && mat[i - 1][j] - mat[i][j] == 1) {
            path = findLongestPath(mat, i - 1, j);
        }

        // recur right cell if its value is +1 of value at (i, j)
        if (j + 1 < N && mat[i][j + 1] - mat[i][j] == 1) {
            path = findLongestPath(mat, i, j + 1);
        }

        // recur bottom cell if its value is +1 of value at (i, j)
        if (i + 1 < N && mat[i + 1][j] - mat[i][j] == 1) {
            path = findLongestPath(mat, i + 1, j);
        }

        // recur left cell if its value is +1 of value at (i, j)
        if (j > 0 && mat[i][j - 1] - mat[i][j] == 1) {
            path = findLongestPath(mat, i, j - 1);
        }

        // note that as the matrix contains all distinct elements,
        // there is only one path possible from the current cell

        if (path.size() > 0) {
            lookup[key] = to_string(mat[i][j]) + ", " + path;
        } else {
            lookup[key] = to_string(mat[i][j]);
        }
    }

    // return path starting from (i, j)
    return lookup[key];
}

string longestPath(vector<vector<int>> const &mat)
{
    string result;              // stores the longest path found so far
    string str;                 // stores current path
    int res_size = INT_MIN;     // stores number of elements in `result`

    // from each cell (i, j), find the longest path starting from it
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat.size(); j++)
        {
            // `path` would be like `1, 2, 3, 4, 5, 6, 7`
            string path = findLongestPath(mat, i, j);

            // find the number of elements involved in the current path
            int size = count(path.begin(), path.end(), ',');

            // update result if a longer path is found
            if (size > res_size) {
                result = path, res_size = size;
            }
        }
    }

    // return the path
    return result;
}

int main()
{
    vector<vector<int>> mat =
    {
        { 10, 13, 14, 21, 23 },
        { 11, 9, 22, 2, 3 },
        { 12, 8, 1, 5, 4 },
        { 15, 24, 7, 6, 20 },
        { 16, 17, 18, 19, 25 }
    };

    cout << longestPath(mat) << endl;

    return 0;
}
```

**Output:** 2, 3, 4, 5, 6, 7

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to check if a cell (i, j) is valid or not
    public static boolean isValid(int[][] mat, int i, int j) {
        return (i >= 0 && i < mat.length) && (j >= 0 && j < mat.length);
    }

    // Find the longest path starting from cell (i, j) formed by adjacent
    // numbers in a matrix
    public static String findLongestPath(int[][] mat, int i, int j,
                                         Map<String, String> lookup)
    {
        // if the cell is invalid
        if (!isValid (mat, i, j)) {
            return null;
        }

        // construct a unique map key from dynamic elements of the input
        String key = i + "|" + j;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // string to store path starting (i, j)
            String path = null;

            // recur top cell if its value is +1 of value at (i, j)
            if (i > 0 && mat[i - 1][j] - mat[i][j] == 1) {
                path = findLongestPath(mat, i - 1, j, lookup);
            }

            // recur right cell if its value is +1 of value at (i, j)
            if (j + 1 < mat.length && mat[i][j + 1] - mat[i][j] == 1) {
                path = findLongestPath(mat, i, j + 1, lookup);
            }

            // recur bottom cell if its value is +1 of value at (i, j)
            if (i + 1 < mat.length && mat[i + 1][j] - mat[i][j] == 1) {
                path = findLongestPath(mat, i + 1, j, lookup);
            }

            // recur left cell if its value is +1 of value at (i, j)
            if (j > 0 && mat[i][j - 1] - mat[i][j] == 1) {
                path = findLongestPath(mat, i, j - 1, lookup);
            }

            // note that as the matrix contains all distinct elements,
            // there is only one path possible from the current cell

            if (path != null) {
                lookup.put(key, mat[i][j] + ", " + path);
            } else {
                lookup.put(key, String.valueOf(mat[i][j]));
            }
        }

        // return path starting from (i, j)
        return lookup.get(key);
    }

    public static String findLongestPath(int[][] mat)
    {
        String result = null;                 // stores the longest path found so far
        String path;                         // stores current path
        long res_size = Long.MIN_VALUE;     // stores number of elements in `result`

        // create a map to store solutions to subproblems
        Map<String, String> lookup = new HashMap<>();

        // from each cell (i, j), find the longest path starting from it
        for (int i = 0; i < mat.length; i++)
        {
            for (int j = 0; j < mat.length; j++)
            {
                // `path` would be like `1, 2, 3, 4, 5, 6, 7`
                path = findLongestPath(mat, i, j, lookup);

                // find the number of elements involved in the current path
                long size = path.chars().filter(ch -> ch == ',').count();

                // update result if a longer path is found
                if (size > res_size) {
                    result = path;
                    res_size = size;
                }
            }
        }

        // return the path
        return result;
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 10, 13, 14, 21, 23 },
            { 11, 9, 22, 2, 3 },
            { 12, 8, 1, 5, 4 },
            { 15, 24, 7, 6, 20 },
            { 16, 17, 18, 19, 25 }
        };

        // find and print the longest path
        System.out.println(findLongestPath(mat));
    }
}
```

##

```python3
import sys

# Function to check if a cell (i, j) is valid or not
def isValid(mat, i, j):
    return 0 <= i < len(mat) and 0 <= j < len(mat)

# Find the longest path starting from cell (i, j) formed by adjacent
# numbers in a matrix
def findLongestPath(mat, i, j, lookup):

    # if the cell is invalid
    if not isValid(mat, i, j):
        return None

    # construct a unique dictionary key from dynamic elements of the input
    key = (i, j)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # string to store path starting (i, j)
        path = None

        # recur top cell if its value is +1 of value at (i, j)
        if i > 0 and mat[i - 1][j] - mat[i][j] == 1:
            path = findLongestPath(mat, i - 1, j, lookup)

        # recur right cell if its value is +1 of value at (i, j)
        if j + 1 < len(mat) and mat[i][j + 1] - mat[i][j] == 1:
            path = findLongestPath(mat, i, j + 1, lookup)

        # recur bottom cell if its value is +1 of value at (i, j)
        if i + 1 < len(mat) and mat[i + 1][j] - mat[i][j] == 1:
            path = findLongestPath(mat, i + 1, j, lookup)

        # recur left cell if its value is +1 of value at (i, j)
        if j > 0 and mat[i][j - 1] - mat[i][j] == 1:
            path = findLongestPath(mat, i, j - 1, lookup)

        # note that as the matrix contains all distinct elements,
        # there is only one path possible from the current cell

        lookup[key] = f'{mat[i][j]}, {path}' if path else str(mat[i][j])

    # return path starting from (i, j)
    return lookup[key]

def longestPath(mat):

    res_size = -sys.maxsize        # stores number of elements in `result`

    # create a dictionary to store solutions to subproblems
    lookup = {}

    # from each cell (i, j), find the longest path starting from it
    for i in range(len(mat)):
        for j in range(len(mat)):
            # store current path (`path` would be like `1, 2, 3, 4, 5, 6, 7`)
            path = findLongestPath(mat, i, j, lookup)

            # find the number of elements involved in the current path
            size = path.count(',')

            # update result if a longer path is found
            if size > res_size:
                result = path            # update the longest path found so far
                res_size = size

    # print the path
    return result

if __name__ == '__main__':

    mat = [
            [10, 13, 14, 21, 23],
            [11, 9, 22, 2, 3],
            [12, 8, 1, 5, 4],
            [15, 24, 7, 6, 20],
            [16, 17, 18, 19, 25]
        ]

    # find and print the longest path
    print(longestPath(mat))
```

The time complexity of the proposed solution is O(N2) for an `N × N` matrix. The auxiliary space required by the program is O(N2).

**Exercise:** Extend the solution to consider diagonal moves as well.
