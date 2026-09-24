# Longest Increasing Subsequence using LCS

> Source: https://www.techiedelight.com/longest-increasing-subsequence-using-lcs/

The longest increasing subsequence problem is to find a subsequence of a given sequence in which the subsequence’s elements are in sorted order, lowest to highest, and in which the subsequence is as long as possible. This subsequence is not necessarily contiguous or unique.

For example, the longest increasing subsequence is `[0, 2, 6, 9, 11, 15]` in the following subsequence:

`[0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]`

This subsequence has length 6; the input sequence has no 7–member increasing subsequences. The longest increasing subsequence in this example is not unique. For instance, `[0, 4, 6, 9, 11, 15]` or `[0, 4, 6, 9, 13, 15]` are other increasing subsequences of equal length in the same input sequence.

> 

We have discussed a [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution to solve the longest increasing subsequence problem in the [previous post](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/). In this post, another interesting DP solution is discussed in which we reduce the Longest Increasing Subsequence (LIS) to the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/). Following is the complete algorithm:

  * Create a copy of the original array.
  * Sort the copy of the original array.
  * Remove all the duplicates from the copy.
  * Perform LCS of original sequence with its modified copy.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
#include <algorithm>
using namespace std;

// Function to find the length of the longest common subsequence of
// array `X[0…m-1]` and `Y[0…n-1]`
int LCSLength(vector<int> const &X, vector<int> const &Y, int m, int n,
        unordered_map<string, int> &lookup)
{
    // return if the end of either array is reached
    if (m == 0 || n == 0) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(m) + "|" + to_string(n);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // if the last element of `X` and `Y` matches
        if (X[m - 1] == Y[n - 1]) {
            lookup[key] = LCSLength(X, Y, m - 1, n - 1, lookup) + 1;
        }
        else {
            // otherwise, if the last element of `X` and `Y` don't match
            lookup[key] = max(LCSLength(X, Y, m, n - 1, lookup),
                            LCSLength(X, Y, m - 1, n, lookup));
        }
    }

    // return the subproblem solution from the map
    return lookup[key];
}

// Function to remove duplicates from a sorted array
int removeDuplicates(vector<int> &Y)
{
    int k = 0;
    for (int i = 1; i < Y.size(); i++)
    {
        if (Y[i] != Y[k]) {
            Y[++k] = Y[i];
        }
    }

    // return length of subarray containing all distinct characters
    return k + 1;
}

// Iterative function to find the length of the longest increasing subsequence (LIS)
// of a given array using the longest common subsequence (LCS)
int findLIS(vector<int> const &X)
{
    int n = X.size();

    // base case
    if (n == 0) {
        return 0;
    }

    // create a copy of the original array
    vector<int> Y(X);

    // sort the copy of the original array
    sort(Y.begin(), Y.end());

    // remove all the duplicates from `Y`
    int m = removeDuplicates(Y);

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    // return LCS of both
    return LCSLength(X, Y, n, m, lookup);
}

int main()
{
    vector<int> X = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

    cout << "The length of the LIS is " << findLIS(X);

    return 0;
}
```

**Output:** The length of the LIS is 6

##

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find the length of the longest common subsequence of
    // array `X[0…m-1]` and `Y[0…n-1]`
    public static int LCSLength(int[] X, int[] Y, int m, int n,
                                Map<String, Integer> lookup)
    {
        // return if the end of either array is reached
        if (m == 0 || n == 0) {
            return 0;
        }

        // construct a unique map key from dynamic elements of the input
        String key = m + "|" + n;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // if the last element of `X` and `Y` matches
            if (X[m - 1] == Y[n - 1]) {
                lookup.put(key, LCSLength(X, Y, m - 1, n - 1, lookup) + 1);
            }
            // otherwise, if the last element of `X` and `Y` don't match
            else {
                lookup.put(key, Integer.max(LCSLength(X, Y, m, n - 1, lookup),
                        LCSLength(X, Y, m - 1, n, lookup)));
            }
        }

        // return the subproblem solution from the map
        return lookup.get(key);
    }

    // Function to remove duplicates from a sorted array
    public static int removeDuplicates(int[] Y)
    {
        int k = 0;
        for (int i = 1; i < Y.length; i++)
        {
            if (Y[i] != Y[k]) {
                Y[++k] = Y[i];
            }
        }

        // return length of subarray containing all distinct characters
        return k + 1;
    }

    // Iterative function to find the length of the longest increasing subsequence
    // of a given array using the longest common subsequence
    public static int findLIS(int[] X)
    {
        // base case
        if (X == null || X.length == 0) {
            return 0;
        }

        // create a map to store solutions to subproblems
        Map<String, Integer> lookup = new HashMap<>();

        // create a copy of the original array and sort it
        int[] Y = Arrays.copyOf(X, X.length);
        Arrays.sort(Y);

        int n = X.length;
        int m = removeDuplicates(Y);        // remove all the duplicates from `Y`

        // return LCS of both
        return LCSLength(X, Y, n, m, lookup);
    }

    public static void main(String[] args)
    {
        int[] X = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

        System.out.println("The length of the LIS is " + findLIS(X));
    }
}
```

##

```python3
# Function to find the length of the longest common subsequence of
# list `X[0…m-1]` and `Y[0…n-1]`
def LCSLength(X, Y, m, n, lookup):

    # return if the end of either list is reached
    if m == 0 or n == 0:
        return 0

    # construct a unique key from dynamic elements of the input
    key = (m, n)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # if the last element of `X` and `Y` matches
        if X[m - 1] == Y[n - 1]:
            lookup[key] = LCSLength(X, Y, m - 1, n - 1, lookup) + 1
        # otherwise, if the last element of `X` and `Y` don't match
        else:
            lookup[key] = max(LCSLength(X, Y, m, n - 1, lookup),
                            LCSLength(X, Y, m - 1, n, lookup))

    # return the subproblem solution from the dictionary
    return lookup[key]

# Function to remove duplicates from a sorted list
def removeDuplicates(Y):

    k = 0
    for i in range(1, len(Y)):
        if Y[i] != Y[k]:
            k = k + 1
            Y[k] = Y[i]

    # return length of sublist containing all distinct characters
    return k + 1

# Iterative function to find the length of the longest increasing subsequence (LIS)
# of a given list using the longest common subsequence (LCS)
def findLIS(X):

    # base case
    if not X:
        return

    # create a copy of the original list and sort it
    Y = X.copy()
    Y.sort()

    n = len(X)
    m = removeDuplicates(Y)        # remove all the duplicates from `Y`

    # create a dictionary to store solutions to subproblems
    lookup = {}

    # return LCS of both
    return LCSLength(X, Y, n, m, lookup)

if __name__ == '__main__':

    X = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]
    print('The length of the LIS is', findLIS(X))
```

How to read out an LIS?

The idea is to read the LCS lookup table and follow the path from the bottom-right to the top-left corner of the table. If the current element in `X` and `Y` are equal, they are part of the LIS, and we move diagonally. If the current element in `X` and `Y` are different, we go up or left, depending on which cell has a higher number.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find LCS of array `X[0…m-1]` and `Y[0…n-1]`
void LCS(vector<int> const &X, vector<int> const &Y, int m, int n, auto &lookup)
{
    // return if the end of either array is reached
    if (m == 0 || n == 0) {
        return;
    }

    // if the last element of `X` and `Y` matches
    if (X[m - 1] == Y[n - 1])
    {
        LCS(X, Y, m - 1, n - 1, lookup);
        cout << X[m - 1] << " ";
        return;
    }

    // otherwise, if the last element of `X` and `Y` don't match

    if (lookup[m - 1][n] > lookup[m][n - 1]) {
        LCS(X, Y, m - 1, n, lookup);
    }
    else {
        LCS(X, Y, m, n - 1, lookup);
    }
}

// Function to find the length of the longest common subsequence of
// array `X[0…m-1]` and `Y[0…n-1]`
void findLCS(vector<int> const &X, vector<int> const &Y, int m, int n)
{
    // `lookup[i][j]` stores the length of LCS of subarray `X[0…i-1]` and `Y[0…j-1]`
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // first row and first column of the lookup table is already 0

    // fill the lookup table in a bottom-up manner
    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            // if the current element of `X` and `Y` matches
            if (X[i - 1] == Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current element of `X` and `Y` don't match
            else {
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }

    // find the longest common sequence
    LCS(X, Y, m, n, lookup);
}

// Function to remove duplicates from a sorted array
int removeDuplicates(vector<int> &Y)
{
    int k = 0;
    for (int i = 1; i < Y.size(); i++)
    {
        if (Y[i] != Y[k]) {
            Y[++k] = Y[i];
        }
    }

    // return length of subarray containing all distinct characters
    return k + 1;
}

// Iterative function to find the length of the longest increasing subsequence (LIS)
// of a given array using the longest common subsequence (LCS)
void findLIS(vector<int> const &X)
{
    int n = X.size();

    // base case
    if (n == 0) {
        return;
    }

    // create a copy of the original array
    vector<int> Y(X);

    // sort the copy of the original array
    sort(Y.begin(), Y.end());

    // remove all the duplicates from `Y`
    int m = removeDuplicates(Y);

    // find LCS of both
    findLCS(X, Y, n, m);
}

int main()
{
    vector<int> X = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

    cout << "The LIS is "; findLIS(X);

    return 0;
}
```

**Output:** The LIS is 0 2 6 9 11 15

##

```java
import java.util.Arrays;

class Main
{
    // Function to find LCS of array `X[0…m-1]` and `Y[0…n-1]`
    public static void LCS(int[] X, int[] Y, int m, int n, int[][] lookup)
    {
        // return if the end of either array is reached
        if (m == 0 || n == 0) {
            return;
        }

        // if the last element of `X` and `Y` matches
        if (X[m - 1] == Y[n - 1])
        {
            LCS(X, Y, m - 1, n - 1, lookup);
            System.out.print(X[m - 1] + " ");
            return;
        }
        // otherwise, if the last element of `X` and `Y` don't match
        if (lookup[m - 1][n] > lookup[m][n - 1]) {
            LCS(X, Y, m - 1, n, lookup);
        }
        else {
            LCS(X, Y, m, n - 1, lookup);
        }
    }

    // Function to find the length of the longest common subsequence of
    // array `X[0…m-1]` and `Y[0…n-1]`
    public static void findLCS(int[] X, int[] Y, int m, int n)
    {
        // `lookup[i][j]` stores the length of LCS of subarray `X[0…i-1]` and
        // `Y[0…j-1]`
        int[][] lookup = new int[X.length + 1][X.length + 1];

        // Fill the lookup table in a bottom-up manner.
        // The first row and first column of the lookup table are already 0.
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                // if the current element of `X` and `Y` matches
                if (X[i - 1] == Y[j - 1]) {
                    lookup[i][j] = lookup[i - 1][j - 1] + 1;
                }
                // otherwise, if the current element of `X` and `Y` don't match
                else {
                    lookup[i][j] = Integer.max(lookup[i - 1][j], lookup[i][j - 1]);
                }
            }
        }

        // find the longest common sequence
        LCS(X, Y, m, n, lookup);
    }

    // Function to remove duplicates from a sorted array
    public static int removeDuplicates(int[] Y)
    {
        int k = 0;
        for (int i = 1; i < Y.length; i++)
        {
            if (Y[i] != Y[k]) {
                Y[++k] = Y[i];
            }
        }

        // return length of subarray containing all distinct characters
        return k + 1;
    }

    // Iterative function to find the length of the longest increasing subsequence
    // of a given array using the longest common subsequence
    public static void findLIS(int[] X)
    {
        // base case
        if (X == null || X.length == 0) {
            return;
        }

        // create a copy of the original array
        int[] Y = Arrays.copyOf(X, X.length);

        // sort the copy of the original array
        Arrays.sort(Y);

        int n = X.length;
        int m = removeDuplicates(Y);        // remove all the duplicates from `Y`

        // return LCS of both
        findLCS(X, Y, n, m);
    }

    public static void main(String[] args)
    {
        int[] X = { 0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15 };

        System.out.print("The LIS is ");
        findLIS(X);
    }
}
```

##

```python3
# Function to find LCS of list `X[0…m-1]` and `Y[0…n-1]`
def LCS(X, Y, m, n, lookup):

    # return if the end of either list is reached
    if m == 0 or n == 0:
        return

    # if the last element of `X` and `Y` matches
    if X[m - 1] == Y[n - 1]:
        LCS(X, Y, m - 1, n - 1, lookup)
        print(X[m - 1], end=' ')
        return

    # otherwise, if the last element of `X` and `Y` don't match

    if lookup[m - 1][n] > lookup[m][n - 1]:
        LCS(X, Y, m - 1, n, lookup)
    else:
        LCS(X, Y, m, n - 1, lookup)

# Function to find the length of the longest common subsequence of
# list `X[0…m-1]` and `Y[0…n-1]`
def findLCS(X, Y, m, n):

    # `lookup[i][j]` stores the length of LCS of sublist `X[0…i-1]` and `Y[0…j-1]`
    lookup = [[0 for x in range(len(X) + 1)] for y in range(len(X) + 1)]

    # Fill the lookup table in a bottom-up manner.
    # The first row and first column of the lookup table are already 0.
    for i in range(1, m + 1):
        for j in range(1, n + 1):

            # if the current element of `X` and `Y` matches
            if X[i - 1] == Y[j - 1]:
                lookup[i][j] = lookup[i - 1][j - 1] + 1

            # otherwise, if the current element of `X` and `Y` don't match
            else:
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1])

    # find the longest common sequence
    LCS(X, Y, m, n, lookup)

# Function to remove duplicates from a sorted list
def removeDuplicates(Y):

    k = 0
    for i in range(1, len(Y)):
        if Y[i] != Y[k]:
            k = k + 1
            Y[k] = Y[i]

    # return length of sublist containing all distinct characters
    return k + 1

# Iterative function to find the length of the longest increasing subsequence (LIS)
# of a given list using the longest common subsequence (LCS)
def findLIS(X):

    # base case
    if not X:
        return

    # create a sorted copy of the original list
    Y = sorted(X.copy())

    n = len(X)
    m = removeDuplicates(Y)        # remove all the duplicates from `Y`

    # return LCS of both
    findLCS(X, Y, n, m)

if __name__ == '__main__':

    X = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]

    print('The LIS is ', end='')
    findLIS(X)
```

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the size of the given sequence.
