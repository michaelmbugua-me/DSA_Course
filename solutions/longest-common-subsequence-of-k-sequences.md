# Longest Common Subsequence of k–sequences

> Source: https://www.techiedelight.com/longest-common-subsequence-of-k-sequences/

The Longest Common Subsequence (LCS) problem is finding the longest subsequence present in given two sequences in the same order, i.e., find the longest sequence which can be obtained from the first original sequence by deleting some items and from the second original sequence by deleting other items.

The problem differs from the problem of finding the [longest common substring](https://techiedelight.com/longest-common-substring-problem/). Unlike substrings, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original string.

**Prerequisite:**

> [Longest Common Subsequence Problem](https://techiedelight.com/longest-common-subsequence/)

In the [previous post](https://techiedelight.com/longest-common-subsequence/), we have discussed the longest common subsequence of two sequences. In this post, we will extend the solution to three sequences. The proposed solution can be easily generalized to handle more than three sequences as well.

For example, consider the three following sequences `X`, `Y`, and `Z`:

X: ABCBDAB Y: BDCABA Z: BADACB The length of the LCS is 4, and the LCS is BDAB.

> 

We have seen in the previous post, LCS problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure), which means that the main problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler subproblems.

1\. Let’s consider given sequences `X`, `Y`, and `Z` of length `i`, `j`, and `k` that both end in the same element. To find their LCS, shorten each sequence by removing the last element, find the LCS of the shortened sequences, and to that LCS append the removed element. So, if `X[i] = Y[j] = Z[k]`, we can say that,

LCS(X[1…i], Y[1…j], Z[1…k]) = LCS(X[1…i-1], Y[1…j-1], Z[1…k-1]) + X[i]

2\. Now, suppose that the given sequences do not end in the same symbol. Then the LCS of `X`, `Y`, and `Z` is the longest of the given sequences.

LCS(X[1…i-1], Y[1…j], Z[1…k]), LCS(X[1…i], Y[1…j-1], Z[1…k]), and LCS(X[1…i], Y[1…j], Z[1…k-1])

The following solution in C++, Java, and Python finds the length of LCS of sequences `X[0…m-1], Y[0…n-1]`, and `Z[0…o-1]` recursively by using the optimal substructure property of LCS problem:

```cpp
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

// Function to return the maximum of three integers
int max(int a, int b, int c) {
    return max(max(a, b), c);
}

// Function to find the length of the longest common subsequence of
// sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
int LCSLength(string X, string Y, string Z, int m, int n, int o)
{
    // return if the end of either sequence is reached
    if (m == 0 || n == 0 || o == 0) {
        return 0;
    }

    // if the last character of `X`, `Y`, and `Z` matches
    if (X[m - 1] == Y[n - 1] && Y[n - 1] == Z[o - 1]) {
        return LCSLength(X, Y, Z, m - 1, n - 1, o - 1) + 1;
    }

    // otherwise, if the last character of `X`, `Y` and `Z` doesn't match
    return max(LCSLength(X, Y, Z, m - 1, n, o),
                LCSLength(X, Y, Z, m, n - 1, o),
                LCSLength(X, Y, Z, m, n, o - 1));
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA", Z = "BADACB";

    cout << "The length of the LCS is " <<
            LCSLength(X, Y, Z, X.length(), Y.length(), Z.length());

    return 0;
}
```

**Output:** The length of the LCS is 4

##

```java
class Main
{
    // Function to return the maximum of three integers
    public static int max(int a, int b, int c) {
        return Integer.max(Integer.max(a, b), c);
    }

    // Function to find the length of the longest common subsequence of
    // sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
    public static int LCSLength(String X, String Y, String Z, int m, int n, int o)
    {
        // return if the end of either sequence is reached
        if (m == 0 || n == 0 || o == 0) {
            return 0;
        }

        // if the last character of `X`, `Y`, and `Z` matches
        if (X.charAt(m - 1) == Y.charAt(n - 1) &&
                Y.charAt(n - 1) == Z.charAt(o - 1)) {
            return LCSLength(X, Y, Z, m - 1, n - 1, o - 1) + 1;
        }

        // otherwise, if the last character of `X`, `Y` and `Z` doesn't match
        return max(LCSLength(X, Y, Z, m - 1, n, o),
                LCSLength(X, Y, Z, m, n - 1, o),
                LCSLength(X, Y, Z, m, n, o - 1));
    }

    public static void main(String[] args)
    {
        String X = "ABCBDAB", Y = "BDCABA", Z = "BADACB";

        System.out.println("The length of the LCS is " +
                LCSLength(X, Y, Z, X.length(), Y.length(), Z.length()));
    }
}
```

##

```python3
# Function to find the length of the longest common subsequence of
# sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
def LCSLength(X, Y, Z, m, n, o):

    # return if the end of either sequence is reached
    if m == 0 or n == 0 or o == 0:
        return 0

    # if the last character of `X`, `Y`, and `Z` matches
    if X[m - 1] == Y[n - 1] and Y[n - 1] == Z[o - 1]:
        return LCSLength(X, Y, Z, m - 1, n - 1, o - 1) + 1

    # otherwise, if the last character of `X`, `Y` and `Z` doesn't match
    return max(LCSLength(X, Y, Z, m - 1, n, o),
            LCSLength(X, Y, Z, m, n - 1, o),
            LCSLength(X, Y, Z, m, n, o - 1))

if __name__ == '__main__':

    X = 'ABCBDAB'
    Y = 'BDCABA'
    Z = 'BADACB'

    print('The length of the LCS is', LCSLength(X, Y, Z, len(X), len(Y), len(Z)))
```

The worst-case time complexity of the above solution is O(3(m+n+o)), where `m`, `n`, and `o` is the length of `X`, `Y`, and `Z`, respectively. The worst case happens when there is no common subsequence present in `X`, `Y`, `Z` (i.e., LCS length is 0), and each recursive call ends up in three recursive calls.

The LCS problem exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). A problem is said to have overlapping subproblems if the recursive algorithm for the problem solves the same subproblem repeatedly rather than generating new subproblems. We know that problems having optimal substructure and overlapping subproblems can be solved by dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. This method can be implemented as follows in C++, Java, and Python:

Following is the memoized implementation in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
#include <string>
#include <unordered_map>
using namespace std;

// Function to return the maximum of three integers
int max(int a, int b, int c) {
    return max(max(a, b), c);
}

// Function to find the length of the longest common subsequence of
// sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
int LCSLength(string X, string Y, string Z, int m, int n, int o, auto &lookup)
{
    // return if the end of either sequence is reached
    if (m == 0 || n == 0 || o == 0) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(m) + "|" + to_string(n) + "|" + to_string(o);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // if the last character of `X`, `Y`, and `Z` matches
        if (X[m - 1] == Y[n - 1] && Y[n - 1] == Z[o - 1]) {
            lookup[key] = LCSLength(X, Y, Z, m - 1, n - 1, o - 1, lookup) + 1;
        }
        else {
            // otherwise, if the last character of `X`, `Y` and `Z` doesn't match
            lookup[key] = max(LCSLength(X, Y, Z, m - 1, n, o, lookup),
                            LCSLength(X, Y, Z, m, n - 1, o, lookup),
                            LCSLength(X, Y, Z, m, n, o - 1, lookup));
        }
    }

    // return the subproblem solution from the map
    return lookup[key];
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA", Z = "BADACB";

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    cout << "The length of the LCS is " <<
            LCSLength(X, Y, Z, X.length(), Y.length(), Z.length(), lookup);

    return 0;
}
```

**Output:** The length of the LCS is 4

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to return the maximum of three integers
    public static int max(int a, int b, int c) {
        return Integer.max(Integer.max(a, b), c);
    }

    // Function to find the length of the longest common subsequence of
    // sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
    public static int LCSLength(String X, String Y, String Z, int m, int n, int o,
                            Map<String, Integer> lookup)
    {
        // return if the end of either sequence is reached
        if (m == 0 || n == 0 || o == 0) {
            return 0;
        }

        // construct a unique map key from dynamic elements of the input
        String key = m + "|" + n + "|" + o;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // if the last character of `X`, `Y`, and `Z` matches
            if (X.charAt(m - 1) == Y.charAt(n - 1) &&
                    Y.charAt(n - 1) == Z.charAt(o - 1)) {
                int lcs = LCSLength(X, Y, Z, m - 1, n - 1, o - 1, lookup);
                lookup.put(key, lcs + 1);
            }
            else {
                // otherwise, if the last character of `X`, `Y` and `Z` doesn't match
                lookup.put(key, max(LCSLength(X, Y, Z, m - 1, n, o, lookup),
                                    LCSLength(X, Y, Z, m, n - 1, o, lookup),
                                    LCSLength(X, Y, Z, m, n, o - 1, lookup)));
            }
        }

        // return the subproblem solution from the map
        return lookup.get(key);
    }

    public static void main(String[] args)
    {
        String X = "ABCBDAB", Y = "BDCABA", Z = "BADACB";

        // create a map to store solutions to subproblems
        Map<String, Integer> lookup = new HashMap<>();

        System.out.println("The length of the LCS is " +
            LCSLength(X, Y, Z, X.length(), Y.length(), Z.length(), lookup));
    }
}
```

##

```python3
# Function to find the length of the longest common subsequence of
# sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
def LCSLength(X, Y, Z, m, n, o, lookup):

    # return if the end of either sequence is reached
    if m == 0 or n == 0 or o == 0:
        return 0

    # construct a unique key from dynamic elements of the input
    key = (m, n, o)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # if the last character of `X`, `Y`, and `Z` matches
        if X[m - 1] == Y[n - 1] and Y[n - 1] == Z[o - 1]:
            lookup[key] = LCSLength(X, Y, Z, m - 1, n - 1, o - 1, lookup) + 1
        else:
            # otherwise, if the last character of `X`, `Y` and `Z` doesn't match
            lookup[key] = max(LCSLength(X, Y, Z, m - 1, n, o, lookup),
                                LCSLength(X, Y, Z, m, n - 1, o, lookup),
                                LCSLength(X, Y, Z, m, n, o - 1, lookup))

    # return the subproblem solution from the dictionary
    return lookup[key]

if __name__ == '__main__':

    X = 'ABCBDAB'
    Y = 'BDCABA'
    Z = 'BADACB'

    # create a dictionary to store solutions to subproblems
    lookup = {}

    print('The length of the LCS is',
        LCSLength(X, Y, Z, len(X), len(Y), len(Z), lookup))
```

The time complexity of the above top-down solution is O(m.n.o) and requires O(m.n.o) extra space, where `m`, `n`, and `o` is the length of `X`, `Y`, and `Z`, respectively.

The above _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner. In the bottom-up approach, calculate the smaller values of `LCS(i, j, k)` first, then build larger values from them.

| 0 if i == 0 or j == 0 or k == 0 LCS[i][j][k] = | LCS[i-1][j-1][k-1] + 1 if X[i-1] == Y[j-1] == Z[k-1] | longest(LCS[i-1][j][k], otherwise LCS[i][j-1][k], LCS[i][j][k-1])

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <algorithm>
#include <unordered_map>
#include <string>
#include <cstring>
using namespace std;

// Function to return the maximum of three integers
int max(int a, int b, int c) {
    return max(max(a, b), c);
}

// Function to find the length of the longest common subsequence of
// sequences X[0…m-1], Y[0…n-1], and Z[0…o-1]
int LCSLength(string X, string Y, string Z)
{
    int m = X.length(), n = Y.length(), o = Z.length();

    // lookup table stores solution to already computed subproblems;
    // i.e., `lookup[i][j][k]` stores the length of LCS of substring
    // X[0…i-1], Y[0…j-1] and Z[0…k-1]
    int lookup[m + 1][n + 1][o + 1];

    // initialize lookup table with 0
    memset(lookup, 0, sizeof lookup);

    // fill the lookup table in a bottom-up manner
    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            for (int k = 1; k <= o; k++)
            {
                // if the current character of `X`, `Y`, and `Z` matches
                if (X[i - 1] == Y[j - 1] && Y[j - 1] == Z[k - 1]) {
                    lookup[i][j][k] = lookup[i - 1][j - 1][k - 1] + 1;
                }
                // otherwise, if the current character of `X`, `Y`, and `Z`
                // doesn't match
                else {
                    lookup[i][j][k] = max(lookup[i - 1][j][k],
                                        lookup[i][j - 1][k],
                                        lookup[i][j][k - 1]);
                }
            }
        }
    }

    // LCS will be the last entry in the lookup table
    return lookup[m][n][o];
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA", Z = "BADACB";

    cout << "The length of the LCS is " << LCSLength(X, Y, Z);

    return 0;
}
```

**Output:** The length of the LCS is 4
