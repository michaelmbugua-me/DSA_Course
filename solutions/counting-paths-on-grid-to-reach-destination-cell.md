# Count the number of paths in a matrix with a given cost to reach the destination cell

> Source: https://www.techiedelight.com/counting-paths-on-grid-to-reach-destination-cell/

Given an `M × N` integer matrix where each cell has a non-negative cost associated with it, count the number of paths to reach the last cell `(M-1, N-1)` of the matrix from its first cell `(0, 0)` such that the path has given cost. We can only move one unit right or one unit down from any cell, i.e., from cell `(i, j)`, we can move to `(i, j+1)` or `(i+1, j)`.

For example, consider the following `4 × 4` matrix where cost is 25. Two paths are having a cost of 25.

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. We can recursively define the problem as follows:

path(m, n, cost) = path(m, n – 1, cost – M[m][n]) (if m == 0) = path(m – 1, n, cost – M[m][n]) (if n == 0) = path(m – 1, n, cost – M[m][n]) \+ path(m, n – 1, cost – M[m][n]) (otherwise) path(0, 0, cost) = 1 (if M[m][n] == cost) = 0 (otherwise)

Here, `path(m, n, cost)` represents the total number of paths to reach cell `(m, n)` from cell `(0, 0)` of the matrix `M`, and each path has cost `cost`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Recursive top-down function to count the total number of paths
// to reach cell (m, n) from cell (0, 0) and has given the cost
int countPaths(vector<vector<int>> const &mat, int m, int n, int cost)
{
    // base case
    if (cost < 0) {
        return 0;
    }

    // if we are at the first cell (0, 0)
    if (m == 0 && n == 0)
    {
        if (mat[0][0] - cost == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }

    // if we are at the first row, we can only go left
    if (m == 0) {
        return countPaths(mat, 0, n - 1, cost - mat[m][n]);
    }

    // if we are at the first column, we can only go up
    if (n == 0) {
        return countPaths(mat, m - 1, 0, cost - mat[m][n]);
    }

    // recur to count total paths by going both left and top
    return countPaths(mat, m - 1, n, cost - mat[m][n]) +
            countPaths(mat, m, n - 1, cost - mat[m][n]);
}

int countPaths(vector<vector<int>> const &mat, int cost)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    return countPaths(mat, M - 1, N - 1, cost);
}

int main()
{
    vector<vector<int>> mat =
    {
        { 4, 7, 1, 6 },
        { 5, 7, 3, 9 },
        { 3, 2, 1, 2 },
        { 7, 1, 6, 3 }
    };

    int cost = 25;

    cout << "Total paths with cost " << cost << " are " << countPaths(mat, cost);

    return 0;
}
```

**Output:** Total paths with cost 25 are 2

##

```java
class Main
{
    // Naive recursive top-down function to count the total number of paths
    // to reach cell (m, n) from cell (0, 0) and has given the cost
    public static int countPaths(int mat[][], int m, int n, int cost)
    {
        // base case
        if (cost < 0) {
            return 0;
        }

        // if we are at the first cell (0, 0)
        if (m == 0 && n == 0) {
            return (mat[0][0] - cost == 0) ? 1: 0;
        }

        // if we are at the first row, we can only go left
        if (m == 0) {
            return countPaths(mat, 0, n - 1, cost - mat[m][n]);
        }

        // if we are at the first column, we can only go up
        if (n == 0) {
            return countPaths(mat, m - 1, 0, cost - mat[m][n]);
        }

        // recur to count total paths by going both left and top
        return countPaths(mat, m - 1, n, cost - mat[m][n]) +
                countPaths(mat, m, n - 1, cost - mat[m][n]);
    }

    public static int countPaths(int[][] mat, int cost)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        return countPaths(mat, mat.length-1, mat[0].length-1, cost);
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 4, 7, 1, 6 },
            { 5, 7, 3, 9 },
            { 3, 2, 1, 2 },
            { 7, 1, 6, 3 }
        };

        int cost = 25;

        System.out.println("Total paths with cost " + cost + " are " +
                countPaths(mat, cost));
    }
}
```

##

```python3
# Recursive top-down function to count the total number of paths
# to reach cell (m, n) from cell (0, 0) and has given the cost
def countPaths(mat, m, n, cost):

    # base case
    if cost < 0:
        return 0

    # if we are at the first cell (0, 0)
    if m == 0 and n == 0:
        return 1 if (mat[0][0] == cost) else 0

    # if we are at the first row, we can only go left
    if m == 0:
        return countPaths(mat, 0, n - 1, cost - mat[m][n])

    # if we are at the first column, we can only go up
    if n == 0:
        return countPaths(mat, m - 1, 0, cost - mat[m][n])

    # recur to count total paths by going both left and top
    return countPaths(mat, m - 1, n, cost - mat[m][n]) + \
        countPaths(mat, m, n - 1, cost - mat[m][n])

if __name__ == '__main__':

    mat = [
        [4, 7, 1, 6],
        [5, 7, 3, 9],
        [3, 2, 1, 2],
        [7, 1, 6, 3]
    ]

    cost = 25

    print(f'Total paths with cost {cost} are',
        countPaths(mat, len(mat) - 1, len(mat[0]) - 1, cost))
```

The time complexity of the proposed solution is exponential as we are doing a lot of redundant work as the same subproblems are getting computed repeatedly. As the recursion grows deeper in bigger matrices, more and more unnecessary repetition occurs.

We know that problems having optimal substructure and [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) can be solved by dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. Each time we compute the total number of paths with cost `c` to reach any cell `(i, j)`, save it. If we are ever asked to compute it again, give the saved answer and do not recompute it.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Recursive top-down function to count the total number of paths
// to reach cell (m, n) from cell (0, 0) and has given the cost
int countPaths(vector<vector<int>> const &mat, int m, int n, int cost,
            unordered_map<string,int> &lookup)
{
    // base case
    if (cost < 0) {
        return 0;
    }

    // if we are at the first cell (0, 0)
    if (m == 0 && n == 0)
    {
        if (mat[0][0] - cost == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(m) + "|" + to_string(n) + "|" + to_string(cost);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // if we are at the first row, we can only go left
        if (m == 0) {
            lookup[key] = countPaths(mat, 0, n - 1, cost - mat[m][n], lookup);
        }

        // if we are at the first column, we can only go up
        else if (n == 0) {
            lookup[key] = countPaths(mat, m - 1, 0, cost - mat[m][n], lookup);
        }

        // recur to count total paths by going both left and top
        else {
            lookup[key] = countPaths(mat, m - 1, n, cost - mat[m][n], lookup) +
                countPaths(mat, m, n - 1, cost - mat[m][n], lookup);
        }
    }

    // return the total number of paths to reach cell (m, n)
    return lookup[key];
}

int countPaths(vector<vector<int>> const &mat, int cost)
{
    // base case
    if (mat.size() == 0) {
        return 0;
    }

    // `M × N` matrix
    int M = mat.size();
    int N = mat[0].size();

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    return countPaths(mat, M - 1, N - 1, cost, lookup);
}

int main()
{
    vector<vector<int>> mat =
    {
        { 4, 7, 1, 6 },
        { 5, 7, 3, 9 },
        { 3, 2, 1, 2 },
        { 7, 1, 6, 3 }
    };

    int cost = 25;

    cout << "Total paths with cost " << cost << " are " << countPaths(mat, cost);

    return 0;
}
```

**Output:** Total paths with cost 25 are 2

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Recursive top-down function to count the total number of paths
    // to reach cell (m, n) from cell (0, 0) and has given the cost
    public static int countPaths(int[][] mat, int m, int n, int cost,
                                 Map<String, Integer> lookup)
    {
        // base case
        if (cost < 0) {
            return 0;
        }

        // if we are at the first cell (0, 0)
        if (m == 0 && n == 0)
        {
            if (mat[0][0] - cost == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }

        // construct a unique map key from dynamic elements of the input
        String key = m + "|" + n + "|" + cost;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // if we are at the first row, we can only go left
            if (m == 0)
            {
                lookup.put(key, countPaths(mat, 0, n - 1,
                        cost - mat[m][n], lookup));
            }
            // if we are at the first column, we can only go up
            else if (n == 0)
            {
                lookup.put(key, countPaths(mat, m - 1, 0,
                        cost - mat[m][n], lookup));
            }
            // recur to count total paths by going both left and top
            else {
                lookup.put(key, countPaths(mat, m - 1, n,
                        cost - mat[m][n], lookup) +
                        countPaths(mat, m, n - 1, cost - mat[m][n], lookup));
            }
        }

        // return the total number of paths to reach cell (m, n)
        return lookup.get(key);
    }

    public static int countPaths(int[][] mat, int cost)
    {
        // base case
        if (mat == null || mat.length == 0) {
            return 0;
        }

        // create a map to store solutions to subproblems
        Map<String, Integer> lookup = new HashMap<>();

        return countPaths(mat, mat.length-1, mat[0].length-1, cost, lookup);
    }

    public static void main(String[] args)
    {
        int[][] mat =
        {
            { 4, 7, 1, 6 },
            { 5, 7, 3, 9 },
            { 3, 2, 1, 2 },
            { 7, 1, 6, 3 }
        };

        int cost = 25;

        System.out.println("Total paths with cost " + cost + " are " +
            countPaths(mat, cost));
    }
}
```

##

```python3
# Recursive top-down function to count the total number of paths
# to reach cell (m, n) from cell (0, 0) and has given the cost
def countPaths(mat, m, n, cost, lookup):

    # base case
    if not mat or not len(mat) or cost < 0:
        return 0

    # if we are at the first cell (0, 0)
    if m == 0 and n == 0:
        return int(mat[0][0] - cost == 0)

    # construct a unique key from dynamic elements of the input
    key = (m, n, cost)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # if we are at the first row, we can only go left
        if m == 0:
            lookup[key] = countPaths(mat, 0, n - 1, cost - mat[m][n], lookup)

        # if we are at the first column, we can only go up
        elif n == 0:
            lookup[key] = countPaths(mat, m - 1, 0, cost - mat[m][n], lookup)

        # recur to count total paths by going both left and top
        else:
            lookup[key] = countPaths(mat, m - 1, n, cost - mat[m][n], lookup) + \
                          countPaths(mat, m, n - 1, cost - mat[m][n], lookup)

    # return the total number of paths to reach cell (m, n)
    return lookup[key]

if __name__ == '__main__':

    mat = [
        [4, 7, 1, 6],
        [5, 7, 3, 9],
        [3, 2, 1, 2],
        [7, 1, 6, 3]
    ]

    cost = 25

    # create a dictionary to store solutions to subproblems
    lookup = {}

    print(f'Total paths with cost {cost} are',
        countPaths(mat, len(mat) - 1, len(mat[0]) - 1, cost, lookup))
```

The time complexity of the proposed solution is O(M × N × cost) for an `M × N` matrix. The auxiliary space required by the program is O(M × N × cost) for recursion (call stack).

**Exercise:** Extend the solution to consider diagonal moves as well.
