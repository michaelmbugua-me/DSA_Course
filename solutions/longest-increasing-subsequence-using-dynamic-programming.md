# Longest Increasing Subsequence using Dynamic Programming

> Source: https://www.techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/

The longest increasing subsequence problem is to find a subsequence of a given sequence in which the subsequence’s elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible. This subsequence is not necessarily contiguous or unique.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example, the longest increasing subsequence of `[0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]` is `[0, 2, 6, 9, 11, 15]`.

This subsequence has length 6; the input sequence has no 7–member increasing subsequences. The longest increasing subsequence in this example is not unique.

For instance, `[0, 4, 6, 9, 11, 15]` or `[0, 4, 6, 9, 13, 15]` are other increasing subsequences of equal length in the same input sequence.

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For each item, there are two possibilities:

  1. Include the current item in LIS if it is greater than the previous element in LIS and recur for the remaining items.
  2. Exclude the current item from LIS and recur for the remaining items.

Finally, return the maximum value we get by including or excluding the current item. The base case of the recursion would be when no items are left. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <climits>
using namespace std;

// Function to find the length of the longest increasing subsequence
int LIS(int arr[], int i, int n, int prev)
{
    // Base case: nothing is remaining
    if (i == n) {
        return 0;
    }

    // case 1: exclude the current element and process the
    // remaining elements
    int excl = LIS(arr, i + 1, n, prev);

    // case 2: include the current element if it is greater
    // than the previous element in LIS
    int incl = 0;
    if (arr[i] > prev) {
        incl = 1 + LIS(arr, i + 1, n, arr[i]);
    }

    // return the maximum of the above two choices
    return max(incl, excl);
}

int main()
{
    int arr[] = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "The length of the LIS is " << LIS(arr, 0, n, INT_MIN);

    return 0;
}
```

**Output:** The length of the LIS is 6

##

```java
class Main
{
    // Function to find the length of the longest increasing subsequence
    public static int LIS(int[] arr, int i, int n, int prev)
    {
        // Base case: nothing is remaining
        if (i == n) {
            return 0;
        }

        // case 1: exclude the current element and process the
        // remaining elements
        int excl = LIS(arr, i + 1, n, prev);

        // case 2: include the current element if it is greater
        // than the previous element in LIS
        int incl = 0;
        if (arr[i] > prev) {
            incl = 1 + LIS(arr, i + 1, n, arr[i]);
        }

        // return the maximum of the above two choices
        return Integer.max(incl, excl);
    }

    public static void main(String[] args)
    {
        int[] arr = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

        System.out.print("The length of the LIS is "
                        + LIS(arr, 0, arr.length, Integer.MIN_VALUE));
    }
}
```

##

```python3
import sys

# Function to find the length of the longest increasing subsequence
def LIS(arr, i, n, prev):

    # Base case: nothing is remaining
    if i == n:
        return 0

    # case 1: exclude the current element and process the
    # remaining elements
    excl = LIS(arr, i + 1, n, prev)

    # case 2: include the current element if it is greater
    # than the previous element in LIS
    incl = 0
    if arr[i] > prev:
        incl = 1 + LIS(arr, i + 1, n, arr[i])

    # return the maximum of the above two choices
    return max(incl, excl)

if __name__ == '__main__':

    arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]

    print('The length of the LIS is', LIS(arr, 0, len(arr), -sys.maxsize))
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed. We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, where subproblem solutions are _memo_ ized rather than computed repeatedly. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `L[i]`, for each `0 <= i < n`, which stores the length of the longest increasing subsequence of subarray `arr[0…i]` that ends with `arr[i]`. To calculate `L[i]`, consider LIS of all smaller values of `i` (say `j`) already computed and pick maximum `L[j]`, where `arr[j]` is less than the current element `arr[i]`. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Iterative function to find the length of the longest increasing subsequence
// of a given array
int LIS(vector<int> const &arr)
{
    int n = arr.size();

    // base case
    if (n == 0) {
        return 0;
    }

    // array to store subproblem solution. `L[i]` stores the length
    // of the longest increasing subsequence that ends with `arr[i]`
    int L[n] = { 0 };

    // the longest increasing subsequence ending at `arr[0]` has length 1
    L[0] = 1;

    // start from the second array element
    for (int i = 1; i < n; i++)
    {
        // do for each element in subarray `arr[0…i-1]`
        for (int j = 0; j < i; j++)
        {
            // find the longest increasing subsequence that ends with `arr[j]`
            // where `arr[j]` is less than the current element `arr[i]`

            if (arr[j] < arr[i] && L[j] > L[i]) {
                L[i] = L[j];
            }
        }

        // include `arr[i]` in LIS
        L[i]++;
    }

    // find the longest increasing subsequence (having maximum length)
    int lis = INT_MIN;
    for (int x: L) {
        lis = max(lis, x);
    }

    return lis;
}

int main()
{
    vector<int> arr = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

    cout << "The length of the LIS is " << LIS(arr);

    return 0;
}
```

**Output:** The length of the LIS is 6

##

```java
import java.util.Arrays;

class Main
{
    // Iterative function to find the length of the longest increasing subsequence
    // of a given array
    public static int LIS(int[] arr)
    {
        // base case
        if (arr == null || arr.length == 0) {
            return 0;
        }

        // array to store subproblem solution. `L[i]` stores the length
        // of the longest increasing subsequence that ends with `arr[i]`
        int[] L = new int[arr.length];

        // the longest increasing subsequence ending at `arr[0]` has length 1
        L[0] = 1;

        // start from the second array element
        for (int i = 1; i < arr.length; i++)
        {
            // do for each element in subarray `arr[0…i-1]`
            for (int j = 0; j < i; j++)
            {
                // find the longest increasing subsequence that ends with `arr[j]`
                // where `arr[j]` is less than the current element `arr[i]`
                if (arr[j] < arr[i] && L[j] > L[i]) {
                    L[i] = L[j];
                }
            }
            // include `arr[i]` in LIS
            L[i]++;
        }

        // return longest increasing subsequence (having maximum length)
        return Arrays.stream(L).max().getAsInt();
    }

    public static void main(String[] args)
    {
        int[] arr = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

        System.out.print("The length of the LIS is " + LIS(arr));
    }
}
```

##

```python3
# Iterative function to find the length of the longest increasing subsequence
# of a given list
def LIS(arr):

    # base case
    if not arr:
        return 0

    # list to store subproblem solutions. `L[i]` stores the length
    # of the longest increasing subsequence that ends with `arr[i]`
    L = [0] * len(arr)

    # the longest increasing subsequence ending at `arr[0]` has length 1
    L[0] = 1

    # start from the second element in the list
    for i in range(1, len(arr)):
        # do for each element in sublist `arr[0…i-1]`
        for j in range(i):
            # find the longest increasing subsequence that ends with `arr[j]`
            # where `arr[j]` is less than the current element `arr[i]`
            if arr[j] < arr[i] and L[j] > L[i]:
                L[i] = L[j]

        # include `arr[i]` in LIS
        L[i] = L[i] + 1

    # return longest increasing subsequence (having maximum length)
    return max(L)

if __name__ == '__main__':

    arr = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]
    print('The length of the LIS is', LIS(arr))
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the given sequence.

How to print LIS?

The above-discussed methods only print the length of LIS but do not print LIS itself. To print the LIS, we have to store the longest increasing subsequence in the lookup table instead of storing just the LIS length.

For example, consider array `arr = [ 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]`. The longest increasing subsequence of subarray `arr[0…i]` that ends with `arr[i]` are:

LIS[0] — 0 LIS[1] — 0 8 LIS[2] — 0 4 LIS[3] — 0 8 12 LIS[4] — 0 2 LIS[5] — 0 8 10 LIS[6] — 0 4 6 LIS[7] — 0 8 12 14 LIS[8] — 0 1 LIS[9] — 0 4 6 9 LIS[10] — 0 4 5 LIS[11] — 0 4 6 9 13 LIS[12] — 0 2 3 LIS[13] — 0 4 6 9 11 LIS[14] — 0 4 6 7 LIS[15] — 0 4 6 9 13 15

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Iterative function to find the longest increasing subsequence
// of a given array
void findLIS(vector<int> const &arr)
{
    int n = arr.size();

    // base case
    if (n == 0) {
        return;
    }

    // LIS[i] stores the longest increasing subsequence of subarray
    // `arr[0…i]` that ends with `arr[i]`
    vector<vector<int>> LIS(n, vector<int>{});

    // LIS[0] denotes the longest increasing subsequence ending at `arr[0]`
    LIS[0].push_back(arr[0]);

    // start from the second array element
    for (int i = 1; i < n; i++)
    {
        // do for each element in subarray `arr[0…i-1]`
        for (int j = 0; j < i; j++)
        {
            // find the longest increasing subsequence that ends with `arr[j]`
            // where `arr[j]` is less than the current element `arr[i]`

            if (arr[j] < arr[i] && LIS[j].size() > LIS[i].size()) {
                LIS[i] = LIS[j];
            }
        }

        // include `arr[i]` in `LIS[i]`
        LIS[i].push_back(arr[i]);
    }

    // uncomment the following code to print contents of `LIS`
    /* for (int i = 0; i < n; i++)
    {
        cout << "LIS[" << i << "] — ";
        for (int j: LIS[i]) {
            cout << j << " ";
        }
        cout << endl;
    } */

    // `j` will store the index of LIS
    int j = 0;
    for (int i = 0; i < n; i++)
    {
        if (LIS[j].size() < LIS[i].size()) {
            j = i;
        }
    }

    // print LIS
    for (int i: LIS[j]) {
        cout << i << " ";
    }
}

int main()
{
    vector<int> arr = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

    findLIS(arr);

    return 0;
}
```

**Output:** 0 4 6 9 13 15
