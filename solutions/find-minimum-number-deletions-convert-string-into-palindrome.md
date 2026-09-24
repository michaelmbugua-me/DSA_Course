# Find the minimum number of deletions required to convert a string into a palindrome

> Source: https://www.techiedelight.com/find-minimum-number-deletions-convert-string-into-palindrome/

Given a string, find the minimum number of deletions required to convert it into a palindrome.

For example, consider string `ACBCDBAA`. The minimum number of deletions required is 3.

`**A C B C D B A A or A C B C D B A A ——> A B C B A**`

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to compare the last character of the string `X[i…j]` with its first character. There are two possibilities:

  1. If the string’s last character is the same as the first character, no deletion is needed, and we recur for the remaining substring `X[i+1, j-1]`.
  2. If the last character of the string is different from the first character, return one plus the minimum of the two values we get by:
     * Deleting the last character and recursing for the remaining substring `X[i, j-1]`.
     * Deleting the first character and recursing for the remaining substring `X[i+1, j]`.

This yields the following recursive relation:

T[i…j] = | T[i+1…j-1] (if X[i] = X[j]) | 1 + min (T[i+1…j], T[i…j-1]) (if X[i] != X[j])

The algorithm can be implemented as follows in C++, Java, and Python. It finds the minimum number of deletions required to convert a sequence `X` into a palindrome recursively using the above relations.

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find out the minimum number of deletions required to
// convert a given string `X[i…j]` into a palindrome
int minDeletions(string X, int i, int j)
{
    // base condition
    if (i >= j) {
        return 0;
    }

    // if the last character of the string is the same as the first character
    if (X[i] == X[j]) {
        return minDeletions(X, i + 1, j - 1);
    }

    // otherwise, if the last character of the string is different from the
    // first character

    // 1. Remove the last character and recur for the remaining substring
    // 2. Remove the first character and recur for the remaining substring

    // return 1 (for remove operation) + minimum of the two values

    return 1 + min (minDeletions(X, i, j - 1), minDeletions(X, i + 1, j));
}

int main()
{
    string X = "ACBCDBAA";
    int n = X.length();

    cout << "The minimum number of deletions required is " <<
        minDeletions(X, 0, n - 1);

    return 0;
}
```

**Output:** The minimum number of deletions required is 3

##

```java
class Main
{
    // Function to find out the minimum number of deletions required to
    // convert a given string `X[i…j]` into a palindrome
    public static int minDeletions(String X, int i, int j)
    {
        // base condition
        if (i >= j) {
            return 0;
        }

        // if the last character of the string is the same as the first character
        if (X.charAt(i) == X.charAt(j)) {
            return minDeletions(X, i + 1, j - 1);
        }

        // otherwise, if the last character of the string is different from the
        // first character

        // 1. Remove the last character and recur for the remaining substring
        // 2. Remove the first character and recur for the remaining substring

        // return 1 (for remove operation) + minimum of the two values

        return 1 + Math.min(minDeletions(X, i, j - 1), minDeletions(X, i + 1, j));
    }

    public static void main(String[] args)
    {
        String X = "ACBCDBAA";
        int n = X.length();

        System.out.print("The minimum number of deletions required is " +
                                minDeletions(X, 0, n - 1));
    }
}
```

##

```python3
def minDeletions(X, i, j):

    # base condition
    if i >= j:
        return 0

    # if the last character of the string is the same as the first character
    if X[i] == X[j]:
        return minDeletions(X, i + 1, j - 1)

    # otherwise, if the last character of the string is different from the
    # first character

    # 1. Remove the last character and recur for the remaining substring
    # 2. Remove the first character and recur for the remaining substring

    # return 1 (for remove operation) + minimum of the two values

    return 1 + min(minDeletions(X, i, j - 1), minDeletions(X, i + 1, j))

if __name__ == '__main__':

    X = 'ACBCDBAA'
    n = len(X)

    print('The minimum number of deletions required is', minDeletions(X, 0, n - 1))
```

The worst-case time complexity of the above solution is exponential (O(2n)), where `n` is the length of the input string. The worst case happens when there is no repeated character present in `X`, and each recursive call will end up in two recursive calls. It also requires additional space for the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We have seen that the problem can be broken down into smaller subproblems, which can further be broken down into yet smaller subproblems, and so on. The problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. Let’s consider the recursion tree for a sequence of length 6 having all distinct characters, say `ABCDEF`.

As we can see, the same subproblems (highlighted in the same color) are getting computed repeatedly. We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, where subproblem solutions are _memo_ ized rather than computed and again. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

// Function to find out the minimum number of deletions required to
// convert a given string `X[i…j]` into a palindrome
int minDeletions(string X, int i, int j, auto &lookup)
{
    // base condition
    if (i >= j) {
        return 0;
    }

    // construct a unique map key from dynamic elements of the input
    string key = to_string(i) + "|" + to_string(j);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map
    if (lookup.find(key) == lookup.end())
    {
        // if the last character of the string is the same as the first character
        if (X[i] == X[j]) {
            lookup[key] = minDeletions(X, i + 1, j - 1, lookup);
        }
        else {
            // if the last character of the string is different from the first
            // character

            // 1. Remove the last character and recur for the remaining substring
            // 2. Remove the first character and recur for the remaining substring

            // return 1 (for remove operation) + minimum of the two values

            lookup[key] = 1 + min (minDeletions(X, i, j - 1, lookup),
                            minDeletions(X, i + 1, j, lookup));
        }
    }

    // return the subproblem solution from the map
    return lookup[key];
}

int main()
{
    string X = "ACBCDBAA";
    int n = X.length();

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    cout << "The minimum number of deletions required is " <<
        minDeletions(X, 0, n - 1, lookup);

    return 0;
}
```

**Output:** The minimum number of deletions required is 3

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find out the minimum number of deletions required to
    // convert a given string `X[i…j]` into a palindrome
    public static int minDeletions(String X, int i, int j, Map<String, Integer> lookup)
    {
        // base condition
        if (i >= j) {
            return 0;
        }

        // construct a unique map key from dynamic elements of the input
        String key = i + "|" + j;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map
        if (!lookup.containsKey(key))
        {
            // if the last character of the string is the same as the first character
            if (X.charAt(i) == X.charAt(j)) {
                lookup.put(key, minDeletions(X, i + 1, j - 1, lookup));
            }
            else {
                // if the last character of the string is different from the first
                // character

                // 1. Remove the last character and recur for the remaining substring
                // 2. Remove the first character and recur for the remaining substring

                // return 1 (for remove operation) + minimum of the two values

                int result = 1 + Math.min(minDeletions(X, i, j - 1, lookup),
                                    minDeletions(X, i + 1, j, lookup));
                lookup.put(key, result);
            }
        }

        // return the subproblem solution from the map
        return lookup.get(key);
    }

    public static void main(String[] args)
    {
        String X = "ACBCDBAA";
        int n = X.length();

        // create a map to store solutions to subproblems
        Map<String, Integer> lookup = new HashMap<>();

        System.out.print("The minimum number of deletions required is " +
                                minDeletions(X, 0, n - 1, lookup));
    }
}
```

##

```python3
# Function to find out the minimum number of deletions required to
# convert a given string `X[i…j]` into a palindrome
def minDeletions(X, i, j, lookup):

    # base condition
    if i >= j:
        return 0

    # construct a unique key from dynamic elements of the input
    key = (i, j)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # if the last character of the string is the same as the first character
        if X[i] == X[j]:
            lookup[key] = minDeletions(X, i + 1, j - 1, lookup)
        else:
            # if the last character of the string is different from the first character

            # 1. Remove the last character and recur for the remaining substring
            # 2. Remove the first character and recur for the remaining substring

            # return 1 (for remove operation) + minimum of the two values

            result = 1 + min(minDeletions(X, i, j - 1, lookup),
                                minDeletions(X, i + 1, j, lookup))
            lookup[key] = result

    # return the subproblem solution from the dictionary
    return lookup[key]

if __name__ == '__main__':

    X = 'ACBCDBAA'
    n = len(X)

    # create a dictionary to store solutions to subproblems
    lookup = {}

    print('The minimum number of deletions required is',
        minDeletions(X, 0, n - 1, lookup))
```

The time complexity of the above solution is O(n2) and requires O(n2) extra space, where `n` is the length of the input string.

This problem is also a classic variation of the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) problem. The idea is to find the [Longest Palindromic subsequence](https://techiedelight.com/longest-palindromic-subsequence-using-dynamic-programming/) of the given string. The minimum number of deletions required will be the difference in length of the string and palindromic subsequence. We can easily find the longest palindromic subsequence by taking the longest common subsequence of the given string with its reverse, i.e., call `LCS(X, reverse(X))`.

The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

// Function to find out the minimum number of deletions required to
// convert a given string `X[0…n-1]` into a palindrome
int minDeletions(string X)
{
    // string 'Y' is a reverse of 'X'
    string Y = X;
    reverse(Y.begin(), Y.end());

    int n = X.length();

    // `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
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
            // if current character of 'X' and 'Y' matches
            if (X[i - 1] == Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current character of 'X' and 'Y' don't match
            else {
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }

    // Now, `lookup[n][n]` contains the size of the longest palindromic subsequence.

    // The minimum number of deletions required will be the difference in the size
    // of the string and the size of the palindromic subsequence

    return n - lookup[n][n];
}

int main()
{
    string X = "ACBCDBAA";

    cout << "The minimum number of deletions required is " << minDeletions(X);

    return 0;
}
```

**Output:** The minimum number of deletions required is 3
