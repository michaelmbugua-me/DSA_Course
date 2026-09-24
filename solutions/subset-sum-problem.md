# Subset Sum Problem – Dynamic Programming Solution

> Source: https://www.techiedelight.com/subset-sum-problem/

Given a set of positive integers and an integer `k`, check if there is any non-empty subset that sums to `k`.

For example,

**Input:** A = { 7, 3, 2, 5, 8 } k = 14 **Output:** Subset with the given sum exists Subset { 7, 2, 5 } sums to 14

> 

A naive solution would be to cycle through [all subsets of `n` numbers](https://techiedelight.com/generate-power-set-given-set/) and, for every one of them, check if the subset sums to the right number. The running time is of order O(2n.n) since there are `2n` subsets, and to check each subset, we need to sum at most `n` elements.

A better exponential-time algorithm uses [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). Subset sum can also be thought of as a special case of the [0–1 Knapsack problem](https://techiedelight.com/0-1-knapsack-problem/). For each item, there are two possibilities:

  1. Include the current item in the subset and recur for the remaining items with the remaining total.
  2. Exclude the current item from the subset and recur for the remaining items.

Finally, return true if we get a subset by including or excluding the current item; otherwise, return false. The recursion’s base case would be when no items are left, or the sum becomes negative. Return true when the sum becomes 0, i.e., the subset is found.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Returns true if there exists a subsequence of `A[0…n]` with the given sum
bool subsetSum(vector<int> const &A, int n, int k)
{
    // return true if the sum becomes 0 (subset found)
    if (k == 0) {
        return true;
    }

    // base case: no items left, or sum becomes negative
    if (n < 0 || k < 0) {
        return false;
    }

    // Case 1. Include the current item `A[n]` in the subset and recur
    // for the remaining items `n-1` with the remaining total `k-A[n]`
    bool include = subsetSum(A, n - 1, k - A[n]);

    // Case 2. Exclude the current item `A[n]` from the subset and recur for
    // the remaining items `n-1`
    bool exclude = subsetSum(A, n - 1, k);

    // return true if we can get subset by including or excluding the
    // current item
    return include || exclude;
}

// Subset Sum Problem
int main()
{
    // Input: a set of items and a sum
    vector<int> A = { 7, 3, 2, 5, 8 };
    int k = 14;

    // total number of items
    int n = A.size();

    if (subsetSum(A, n - 1, k)) {
        cout << "Subsequence with the given sum exists";
    }
    else {
        cout << "Subsequence with the given sum does not exist";
    }

    return 0;
}
```

**Output:** Subsequence with the given sum exists

##

```java
class Main
{
    // Returns true if there exists a subsequence of `A[0…n]` with the given sum
    public static boolean subsetSum(int[] A, int n, int k)
    {
        // return true if the sum becomes 0 (subset found)
        if (k == 0) {
            return true;
        }

        // base case: no items left, or sum becomes negative
        if (n < 0 || k < 0) {
            return false;
        }

        // Case 1. Include the current item `A[n]` in the subset and recur
        // for the remaining items `n-1` with the remaining total `k-A[n]`
        boolean include = subsetSum(A, n - 1, k - A[n]);

        // Case 2. Exclude the current item `A[n]` from the subset and recur for
        // the remaining items `n-1`
        boolean exclude = subsetSum(A, n - 1, k);

        // return true if we can get subset by including or excluding the
        // current item
        return include || exclude;
    }

    // Subset Sum Problem
    public static void main(String[] args)
    {
        // Input: a set of items and a sum
        int[] A = { 7, 3, 2, 5, 8 };
        int k = 14;

        if (subsetSum(A, A.length - 1, k)) {
            System.out.print("Subsequence with the given sum exists");
        }
        else {
            System.out.print("Subsequence with the given sum does not exist");
        }
    }
}
```

##

```python3
# Returns true if there exists a subsequence of `A[0…n]` with the given sum
def subsetSum(A, n, k):

    # return true if the sum becomes 0 (subset found)
    if k == 0:
        return True

    # base case: no items left, or sum becomes negative
    if n < 0 or k < 0:
        return False

    # Case 1. Include the current item `A[n]` in the subset and recur
    # for the remaining items `n-1` with the remaining total `k-A[n]`
    include = subsetSum(A, n - 1, k - A[n])

    # Case 2. Exclude the current item `A[n]` from the subset and recur for
    # the remaining items `n-1`
    exclude = subsetSum(A, n - 1, k)

    # return true if we can get subset by including or excluding the
    # current item
    return include or exclude

# Subset Sum Problem
if __name__ == '__main__':

    # Input: a set of items and a sum
    A = [7, 3, 2, 5, 8]
    k = 14

    if subsetSum(A, len(A) - 1, k):
        print('Subsequence with the given sum exists')
    else:
        print('Subsequence with the given sum does not exist')
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are getting computed repeatedly.

We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, where subproblem solutions are _memo_ ized rather than computed again and again. Following is the _memo_ ized implementation in C++, Java, and Python, which follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Returns true if there exists a subsequence of `A[0…n]` with the given sum
bool subsetSum(vector<int> const &A, int n, int k, auto &lookup)
{
    // return true if the sum becomes 0 (subset found)
    if (k == 0) {
        return true;
    }

    // base case: no items left, or sum becomes negative
    if (n < 0 || k < 0) {
        return false;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(n) + "|" + to_string(k);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // Case 1. Include the current item `A[n]` in the subset and recur
        // for the remaining items `n-1` with the remaining total `k-A[n]`
        bool include = subsetSum(A, n - 1, k - A[n], lookup);

        // Case 2. Exclude the current item `A[n]` from the subset and recur for
        // the remaining items `n-1`
        bool exclude = subsetSum(A, n - 1, k, lookup);

        // assign true if we can get subset by including or excluding the
        // current item
        lookup[key] = include || exclude;
    }

    // return solution to the current subproblem
    return lookup[key];
}

// Subset Sum Problem
int main()
{
    // Input: a set of items and a sum
    vector<int> A = { 7, 3, 2, 5, 8 };
    int k = 14;

    // total number of items
    int n = A.size();

    // create a map to store solutions to subproblems
    unordered_map<string, bool> lookup;

    if (subsetSum(A, n - 1, k, lookup)) {
        cout << "Subsequence with the given sum exists";
    }
    else {
        cout << "Subsequence with the given sum does not exist";
    }

    return 0;
}
```

**Output:** Subsequence with the given sum exists

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Returns true if there exists a subsequence of `A[0…n]` with the given sum
    public static boolean subsetSum(int[] A, int n, int k, Map<String, Boolean> lookup)
    {
        // return true if the sum becomes 0 (subset found)
        if (k == 0) {
            return true;
        }

        // base case: no items left, or sum becomes negative
        if (n < 0 || k < 0) {
            return false;
        }

        // construct a unique map key from dynamic elements of the input
        String key = n + "|" + k;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // Case 1. Include the current item `A[n]` in the subset and recur
            // for the remaining items `n-1` with the decreased total `k-A[n]`
            boolean include = subsetSum(A, n - 1, k - A[n], lookup);

            // Case 2. Exclude the current item `A[n]` from the subset and recur for
            // the remaining items `n-1`
            boolean exclude = subsetSum(A, n - 1, k, lookup);

            // assign true if we get subset by including or excluding
            // current item
            lookup.put(key, include || exclude);
        }

        // return solution to the current subproblem
        return lookup.get(key);
    }

    public static void main(String[] args)
    {
        // Input: a set of items and a sum
        int[] A = { 7, 3, 2, 5, 8 };
        int k = 14;

        // create a map to store solutions to subproblems
        Map<String, Boolean> lookup = new HashMap<>();

        if (subsetSum(A, A.length - 1, k, lookup)) {
            System.out.println("Subsequence with the given sum exists");
        }
        else {
            System.out.println("Subsequence with the given sum does not exist");
        }
    }
}
```

##

```python3
# Returns true if there exists a subsequence of `A[0…n]` with the given sum
def subsetSum(A, n, k, lookup):

    # return true if the sum becomes 0 (subset found)
    if k == 0:
        return True

    # base case: no items left, or sum becomes negative
    if n < 0 or k < 0:
        return False

    # construct a unique key from dynamic elements of the input
    key = (n, k)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # Case 1. Include the current item `A[n]` in the subset and recur
        # for the remaining items `n-1` with the decreased total `k-A[n]`
        include = subsetSum(A, n - 1, k - A[n], lookup)

        # Case 2. Exclude the current item `A[n]` from the subset and recur for
        # the remaining items `n-1`
        exclude = subsetSum(A, n - 1, k, lookup)

        # assign true if we get subset by including or excluding the current item
        lookup[key] = include or exclude

    # return solution to the current subproblem
    return lookup[key]

if __name__ == '__main__':

    # Input: a set of items and a sum
    A = [7, 3, 2, 5, 8]
    k = 14

    # create a dictionary to store solutions to subproblems
    lookup = {}

    if subsetSum(A, len(A) - 1, k, lookup):
        print('Subsequence with the given sum exists')
    else:
        print('Subsequence with the given sum does not exist')
```

The time complexity of the above solution is O(n × sum) and requires O(n × sum) extra space, where `n` is the size of the input and `sum` is the sum of all elements in the input.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `T[i][j]`, for each `1 <= i <= n` and `1 <= j <= sum`, which is true if subset with sum `j` can be found using items up to first `i` items. It uses the value of smaller values `i` and `j` already computed. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Returns true if there exists a subsequence of `A` with the given sum
bool subsetSum(vector<int> const &A, int k)
{
    // total number of items
    int n = A.size();

    // `T[i][j]` stores true if subset with sum `j` can be attained
    // using items up to first `i` items
    bool T[n + 1][k + 1];

    // if 0 items in the list and the sum is non-zero
    for (int j = 1; j <= k; j++) {
        T[0][j] = false;
    }

    // if the sum is zero
    for (int i = 0; i <= n; i++) {
        T[i][0] = true;
    }

    // do for i'th item
    for (int i = 1; i <= n; i++)
    {
        // consider all sum from 1 to sum
        for (int j = 1; j <= k; j++)
        {
            // don't include the i'th element if `j-A[i-1]` is negative
            if (A[i - 1] > j) {
                T[i][j] = T[i - 1][j];
            }
            else {
                // find the subset with sum `j` by excluding or including the i'th item
                T[i][j] = T[i - 1][j] || T[i - 1][j - A[i - 1]];
            }
        }
    }

    // return maximum value
    return T[n][k];
}

// Subset Sum Problem
int main()
{
    // Input: a set of items and a sum
    vector<int> A = { 7, 3, 2, 5, 8 };
    int k = 18;

    if (subsetSum(A, k)) {
        cout << "Subsequence with the given sum exists";
    }
    else {
        cout << "Subsequence with the given sum does not exist";
    }

    return 0;
}
```

**Output:** Subsequence with the given sum exists
