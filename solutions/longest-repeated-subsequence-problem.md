# Longest Repeated Subsequence Problem

> Source: https://www.techiedelight.com/longest-repeated-subsequence-problem/

The Longest Repeating Subsequence (LRS) problem is finding the longest subsequences of a string that occurs at least twice.

The problem differs from the problem of finding the longest repeating substring. Unlike substrings, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original string.

For example, consider the sequence `ATACTCGGA`.

The length of the longest repeating subsequence is 4 The longest repeating subsequence is ATCG **A T** A **C** T C **G** G A A T **A** C **T C** G **G** A **Note that repeated characters holds a different index in the input string.**

> 

The longest repeating subsequence problem is a classic variation of the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) problem. The idea is to find the LCS of the given string with itself, i.e., call `LCS(X, X)` and exclude the cases when indexes are the same `(i = j)` since repeated characters hold a different index in the input string.

The LRS problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We can recursively define the problem as:

| 0 (if i = 0 or j = 0) LRS[i][j] = | LRS[i-1][j-1] + 1 (if X[i-1] = X[j-1] & i!=j) | max (LRS[i-1][j], LRS[i][j-1]) (if X[i-1] != X[j-1])

The following implementation in C++, Java, and Python recursively finds the length of the longest repeated subsequence of a sequence using the optimal substructure property of the LRS problem:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to find the length of the longest repeated subsequence
// of substring `X[0…m-1]` and `X[0…n-1]`
int LRSLength(string X, int m, int n)
{
    // return if the end of either string is reached
    if (m == 0 || n == 0) {
        return 0;
    }

    // if characters at index `m` and `n` matches and the index are different
    if (X[m - 1] == X[n - 1] && m != n) {
        return LRSLength(X, m - 1, n - 1) + 1;
    }

    // otherwise, if characters at index `m` and `n` don't match
    return max (LRSLength(X, m, n - 1), LRSLength(X, m - 1, n));
}

int main()
{
    string X = "ATACTCGGA";
    int m = X.length();

    cout << "The length of the longest repeating subsequence is " <<
            LRSLength(X, m, m);

    return 0;
}
```

**Output:** The length of the longest repeating subsequence is 4

##

```java
class Main
{
    // Function to find the length of the longest repeated subsequence
    // of substring `X[0…m-1]` and `X[0…n-1]`
    public static int LRSLength(String X, int m, int n)
    {
        // return if the end of either string is reached
        if (m == 0 || n == 0) {
            return 0;
        }

        // if characters at index `m` and `n` matches and the index are different
        if (X.charAt(m - 1) == X.charAt(n - 1) && m != n) {
            return LRSLength(X, m - 1, n - 1) + 1;
        }

        // otherwise, if characters at index `m` and `n` don't match
        return Integer.max(LRSLength(X, m, n - 1),
                LRSLength(X, m - 1, n));
    }

    public static void main(String[] args)
    {
        String X = "ATACTCGGA";
        int m = X.length();

        System.out.println("The length of the longest repeating subsequence is " +
                LRSLength(X, m, m));
    }
}
```

##

```python3
# Function to find the length of the longest repeated subsequence
# of substring `X[0…m-1]` and `X[0…n-1]`
def LRSLength(X, m, n):

    # return if the end of either string is reached
    if m == 0 or n == 0:
        return 0

    # if characters at index `m` and `n` matches and the index are different
    if X[m - 1] == X[n - 1] and m != n:
        return LRSLength(X, m - 1, n - 1) + 1

    # otherwise, if characters at index `m` and `n` don't match
    return max(LRSLength(X, m, n - 1), LRSLength(X, m - 1, n))

if __name__ == '__main__':

    X = 'ATACTCGGA'
    m = len(X)

    print('The length of the longest repeating subsequence is', LRSLength(X, m, m))
```

The worst-case time complexity of the above solution is O(2n) and occupies space in the call stack, where `n` is the length of the input string. The worst case happens when there is no repeated character present in `X` (i.e., LRS length is 0), and each recursive call will end up in two recursive calls.

The LRS problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). Let’s consider the recursion tree for a sequence of length 5 having all distinct characters whose LRS length is 0.

As we can see above, the same subproblems (highlighted in the same color) are getting computed repeatedly. Since both optimal substructure and overlapping subproblems properties of dynamic programming are satisfied, we can save subproblem solutions in memory rather than computed them repeatedly.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <unordered_map>
using namespace std;

// Function to find the length of the longest repeated subsequence
// of substring `X[0…m-1]` and `X[0…n-1]`
int LRSLength(string X, int m, int n, auto &lookup)
{
    // return if the end of either string is reached
    if (m == 0 || n == 0) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(m) + "|" + to_string(n);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // if characters at index `m` and `n` matches and the index are different
        if (X[m - 1] == X[n - 1] && m != n) {
            lookup[key] = LRSLength(X, m - 1, n - 1, lookup) + 1;
        }
        else {
            // otherwise, if characters at index `m` and `n` don't match
            lookup[key] = max (LRSLength(X, m, n - 1, lookup),
                            LRSLength(X, m - 1, n, lookup));
        }
    }

    // return the subproblem solution from the map
    return lookup[key];
}

int main()
{
    string X = "ATACTCGGA";
    int m = X.length();

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    cout << "The length of the longest repeating subsequence is " <<
            LRSLength(X, m, m, lookup);

    return 0;
}
```

**Output:** The length of the longest repeating subsequence is 4

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find the length of the longest repeated subsequence
    // of substring `X[0…m-1]` and `X[0…n-1]`
    public static int LRSLength(String X, int m, int n, Map<String, Integer> lookup)
    {
        // return if the end of either string is reached
        if (m == 0 || n == 0) {
            return 0;
        }

        // construct a unique map key from dynamic elements of the input
        String key = m + "|" + n;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // if characters at index `m` and `n` matches and the index are different
            if (X.charAt(m - 1) == X.charAt(n - 1) && m != n) {
                lookup.put(key, LRSLength(X, m - 1, n - 1, lookup) + 1);
            }
            else {
                // otherwise, if characters at index `m` and `n` don't match
                lookup.put(key, Integer.max(LRSLength(X, m, n - 1, lookup),
                                            LRSLength(X, m - 1, n, lookup)));
            }
        }

        // return the subproblem solution from the map
        return lookup.get(key);
    }

    public static void main(String[] args)
    {
        String X = "ATACTCGGA";
        int m = X.length();

        // create a map to store solutions to subproblems
        Map<String, Integer> lookup = new HashMap<>();

        System.out.println("The length of the longest repeating subsequence is " +
                LRSLength(X, m, m, lookup));
    }
}
```

##

```python3
# Function to find the length of the longest repeated subsequence
# of substring `X[0…m-1]` and `X[0…n-1]`
def LRSLength(X, m, n, lookup):

    # return if the end of either string is reached
    if m == 0 or n == 0:
        return 0

    # construct a unique key from dynamic elements of the input
    key = (m, n)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # if characters at index `m` and `n` matches and the index are different
        if X[m - 1] == X[n - 1] and m != n:
            lookup[key] = LRSLength(X, m - 1, n - 1, lookup) + 1
        else:
            # otherwise, if characters at index `m` and `n` don't match
            lookup[key] = max(LRSLength(X, m, n - 1, lookup),
                            LRSLength(X, m - 1, n, lookup))

    # return the subproblem solution from the dictionary
    return lookup[key]

if __name__ == '__main__':

    X = 'ATACTCGGA'
    m = len(X)

    # create a dictionary to store solutions to subproblems
    lookup = {}

    print('The length of the longest repeating subsequence is',
        LRSLength(X, m, m, lookup))
```

The time complexity of the above top-down solution is O(n2) and requires O(n2) extra space, where `n` is the length of the input string.

The above _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner by calculating the smaller values of `LRS(i, j)` first and then building larger values from them. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to find the length of the longest repeated subsequence
// of substring `X[0…n-1]`
int LRSLength(string X, int n)
{
    // lookup table stores solution to already computed subproblems;
    // i.e., lookup[i][j] stores the length of LRS of substring
    // `X[0…i-1]` and `X[0…j-1]`
    int lookup[n + 1][n + 1];

    // first column of the lookup table will be all 0
    for (int i = 0; i <= n; i++) {
        lookup[i][0] = 0;
    }

    // first row of the lookup table will be all 0
    for (int j = 0; j <= n; j++) {
        lookup[0][j] = 0;
    }

    // fill the lookup table in a bottom-up manner
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            // if characters at index `i` and `j` matches
            // and the index are different
            if (X[i - 1] == X[j - 1] && i != j) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if characters at index `i` and `j` are different
            else {
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }

    // LRS will be the last entry in the lookup table
    return lookup[n][n];
}

int main()
{
    string X = "ATACTCGGA";

    int n = X.length();

    cout << "The length of the longest repeating subsequence is " <<
            LRSLength(X, n);

    return 0;
}
```

**Output:** The length of the longest repeating subsequence is 4
