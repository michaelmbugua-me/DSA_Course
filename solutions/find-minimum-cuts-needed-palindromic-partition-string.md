# Find minimum cuts needed for the palindromic partition of a string

> Source: https://www.techiedelight.com/find-minimum-cuts-needed-palindromic-partition-string/

Given a string, find the minimum cuts needed to partition it such that each partition is a palindrome.

For example,

  1. `BABABCBADCD` – The minimum cuts required are 2 as `BAB|ABCBA|DCD`.
  2. `ABCBA` – The minimum cuts required are 0 as `ABCBA` is already a palindrome.
  3. `ABCD` – The minimum cuts required are 3 as `A|B|C|D`.

> 

We can break the problem into a set of related subproblems that partition the given string to yield the lowest total cuts. Following is the recursive algorithm to find the minimum cuts:

  1. Separate the given string into two subsequences.
  2. Recursively find the minimum cuts required in each subsequence.
  3. Do this for each possible position at which the string can be cut, and take the minimum over all of them.

For example, if we have string `ABCB`, compute the cuts required to find each of `A|BCB`, `AB|CB`, and `ABC|B`, making recursive calls to find the minimum cuts to compute `BCB`, `AB`, `CB`, and `ABC` to choose the best one.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <climits>
using namespace std;

// Function to check if string `X[i…j]` is a palindrome or not
bool isPalindrome(string X, int i, int j)
{
    while (i <= j)
    {
        if (X[i++] != X[j--]) {
            return false;
        }
    }
    return true;
}

// Recursive function to find the minimum cuts needed in a string
// such that each partition is a palindrome
int findMinCuts(string X, int i, int j)
{
    // base case: if starting index `i` and ending index `j` are equal,
    // or `X[i…j]` is already a palindrome.

    if (i == j || isPalindrome(X, i, j)) {
        return 0;
    }

    // stores the minimum number of cuts needed to partition `X[i…j]`
    int min = INT_MAX;

    // take the minimum over each possible position at which the
    // string can be cut

    for (int k = i; k <= j - 1; k++)
    {
        // recur to get minimum cuts required in `X[i…k]` and `X[k+1…j]`
        int count = 1 + findMinCuts(X, i, k) + findMinCuts(X, k + 1, j);

        if (count < min) {
            min = count;
        }
    }

    // return the minimum cuts required
    return min;
}

// Wrapper over findMinCuts() function
int findMinimumCuts(string X)
{
    int n = X.length();

    // base case
    if (n == 0) {
        return 0;
    }

    return findMinCuts(X, 0, n - 1);
}

int main()
{
    string X = "BABABCBADCD";       // BAB|ABCBA|DCD

    cout << "The minimum cuts required are " << findMinimumCuts(X);

    return 0;
}
```

**Output:** The minimum cuts required are 2

##

```java
class Main
{
    // Function to check if string `X[i…j]` is a palindrome or not
    public static boolean isPalindrome(String X, int i, int j)
    {
        while (i <= j)
        {
            if (X.charAt(i++) != X.charAt(j--)) {
                return false;
            }
        }
        return true;
    }

    // Recursive function to find the minimum cuts needed in a string
    // such that each partition is a palindrome
    public static int findMinCuts(String X, int i, int j)
    {
        // base case: if starting index `i` and ending index `j` are equal,
        // or `X[i…j]` is already a palindrome.

        if (i == j || isPalindrome(X, i, j)) {
            return 0;
        }

        // stores the minimum number of cuts needed to partition `X[i…j]`
        int min = Integer.MAX_VALUE;

        for (int k = i; k <= j - 1; k++)
        {
            // recur to get minimum cuts required in `X[i…k]` and `X[k+1…j]`
            int count = 1 + findMinCuts(X, i, k) +
                        findMinCuts(X, k + 1, j);

            if (count < min) {
                min = count;
            }
        }

        // return the minimum cuts required
        return min;
    }

    public static int findMinimumCuts(String X)
    {
        // base case
        if (X == null || X.length() == 0) {
            return 0;
        }

        return findMinCuts(X, 0, X.length() - 1);
    }

    public static void main(String[] args)
    {
        String X = "BABABCBADCD";

        System.out.println("The minimum cuts required are " + findMinimumCuts(X));
    }
}
```

##

```python3
import sys

# Function to check if string `X[i…j]` is a palindrome or not
def isPalindrome(X, i, j):

    while i <= j:
        if X[i] != X[j]:
            return False
        i = i + 1
        j = j - 1

    return True

# Recursive function to find the minimum cuts needed in a string
# such that each partition is a palindrome
def findMinCuts(X, i, j):

    # base case: if starting index `i` and ending index `j` are equal,
    # or `X[i…j]` is already a palindrome.
    if i == j or isPalindrome(X, i, j):
        return 0

    # stores the minimum number of cuts needed to partition `X[i…j]`
    min = sys.maxsize

    # take the minimum over each possible position at which the
    # string can be cut

    '''
        (X[i]) | (X[i+1…j])
        (X[i…i+1]) | (X[i+2…j])
        (X[i…i+2]) | (X[i+3…j])
        …
        …
        (X[i…j-1]) | (X[j])
    '''

    for k in range(i, j):

        # recur to get minimum cuts required in `X[i…k]` and `X[k+1…j]`
        count = 1 + findMinCuts(X, i, k) + findMinCuts(X, k + 1, j)

        if count < min:
            min = count

    # return the minimum cuts required
    return min

def findMinimumCuts(X):

    # base case
    if not X:
        return 0

    return findMinCuts(X, 0, len(X) - 1)

if __name__ == '__main__':

    X = 'BABABCBADCD'
    print('The minimum cuts required are', findMinimumCuts(X))
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed. Since both optimal substructure and overlapping subproblems properties of dynamic programming are satisfied, we can save subproblem solutions in memory rather than computed them repeatedly.

We can further optimize the above recursive solution by removing the `isPalindrome()` function, which takes linear time in the worst case. Instead, the idea is to preprocess the string and maintain a lookup table to check if the substring starting at index `i` and ending at index `j` is a palindrome or not in constant time. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits>
using namespace std;

// Bottom-up DP function to mark if string `X[i…j]` is a palindrome
// or not for all possible values of `i` and `j`
bool findAllPalindromes(string X, int n, auto &isPalindrome)
{
    for (int i = n - 1; i >= 0; i--)
    {
        for (int j = i; j < n; j++)
        {
            if (i == j) {
                isPalindrome[i][j] = true;
            }
            else if (X[i] == X[j]) {
                isPalindrome[i][j] = ((j - i == 1) ? true: isPalindrome[i + 1][j - 1]);
            }
            else {
                isPalindrome[i][j] = false;
            }
        }
    }
}

// Recursive function to find the minimum cuts needed in a string
// such that each partition is a palindrome
int findMinCuts(int i, int j, auto &lookup, auto &isPalindrome)
{
    // base case: if starting index `i` and ending index `j` are equal,
    // or `X[i…j]` is already a palindrome

    if (i == j || isPalindrome[i][j]) {
        return 0;
    }

    // Construct a unique map key from dynamic elements of the input.
    // lookup[key] stores the minimum number of cuts needed to partition `X[i…j]`

    string key = to_string(i) + "|" + to_string(j);

    // if the subproblem is seen for the first time, solve it and
    // store its result in a map

    if (lookup.find(key) == lookup.end())
    {
        // take the minimum over each possible position at which the
        // string can be cut

        lookup[key] = INT_MAX;
        for (int k = i; k <= j - 1; k++)
        {
            // recur to get minimum cuts required in `X[i…k]` and `X[k+1…j]`
            int count = 1 + findMinCuts(i, k, lookup, isPalindrome) +
                        findMinCuts(k + 1, j, lookup, isPalindrome);

            if (count < lookup[key]) {
                lookup[key] = count;
            }
        }
    }

    // return the minimum cuts required
    return lookup[key];
}

int findMinimumCuts(string X)
{
    int n = X.length();

    // base case
    if (n == 0) {
        return 0;
    }

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    // isPalindrome[i][j] stores if substring X[i][j] is palindrome or not
    vector<vector<bool>> isPalindrome(n + 1, vector<bool>(n + 1));

    // find all substrings of `X` that are palindromes
    findAllPalindromes(X, n, isPalindrome);

    return findMinCuts(0, n - 1, lookup, isPalindrome);
}

int main()
{
    string X = "BABABCBADCD";

    cout << "The minimum cuts required are " << findMinimumCuts(X);

    return 0;
}
```

**Output:** The minimum cuts required are 2

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Bottom-up DP function to mark if string `X[i…j]` is a palindrome
    // or not for all possible values of `i` and `j`
    public static void findAllPalindromes(String X, boolean[][] isPalin)
    {
        for (int i = X.length() - 1; i >= 0; i--)
        {
            for (int j = i; j < X.length(); j++)
            {
                if (i == j) {
                    isPalin[i][j] = true;
                }
                else if (X.charAt(i) == X.charAt(j)) {
                    isPalin[i][j] = ((j-i == 1)? true: isPalin[i+1][j-1]);
                }
                else {
                    isPalin[i][j] = false;
                }
            }
        }
    }

    // Recursive function to find the minimum cuts needed in a string
    // such that each partition is a palindrome
    public static int findMinCuts(int i, int j, boolean[][] isPalin,
                                Map<String, Integer> lookup)
    {
        // base case: if starting index `i` and ending index `j` are equal,
        // or `X[i…j]` is already a palindrome.

        if (i == j || isPalin[i][j]) {
            return 0;
        }

        // Construct a unique map key from dynamic elements of the input.
        // lookup[key] stores the minimum number of cuts needed to partition `X[i…j]`

        String key = i + "|" + j;

        // if the subproblem is seen for the first time, solve it and
        // store its result in a map

        if (!lookup.containsKey(key))
        {
            // take the minimum over each possible position at which the
            // string can be cut

            /*
                (X[i]) | (X[i+1…j])
                (X[i…i+1]) | (X[i+2…j])
                (X[i…i+2]) | (X[i+3…j])
                …
                …
                (X[i…j-1]) | (X[j])
            */

            lookup.put(key, Integer.MAX_VALUE);
            for (int k = i; k <= j - 1; k++)
            {
                // recur to get minimum cuts required in `X[i…k]` and
                // `X[k+1…j]`

                int count = 1 + findMinCuts(i, k, isPalin, lookup) +
                        findMinCuts(k + 1, j, isPalin, lookup);

                if (count < lookup.get(key)) {
                    lookup.put(key, count);
                }
            }
        }

        // return the minimum cuts required
        return lookup.get(key);
    }

    public static int findMinimumCuts(String X)
    {
        // base case
        if (X == null || X.length() == 0) {
            return 0;
        }

        // create a map to store solutions to subproblems
        Map<String, Integer> lookup = new HashMap<>();

        // isPalin[i][j] stores if substring `X[i][j]` is palindrome or not
        boolean[][] isPalin = new boolean[X.length() + 1][X.length() + 1];

        // find all substrings of `X` that are palindromes
        findAllPalindromes(X, isPalin);

        return findMinCuts(0, X.length() - 1, isPalin, lookup);
    }

    public static void main(String[] args)
    {
        String X = "BABABCBADCD";

        System.out.println("The minimum cuts required are " + findMinimumCuts(X));
    }
}
```

##

```python3
import sys

# Bottom-up DP function to mark if string `X[i…j]` is a palindrome
# or not for all possible values of `i` and `j`
def findAllPalindromes(X, isPalin):

    for i in reversed(range(len(X))):
        for j in range(i, len(X)):
            if i == j:
                isPalin[i][j] = True
            elif X[i] == X[j]:
                isPalin[i][j] = True if (j - i == 1) else isPalin[i + 1][j - 1]
            else:
                isPalin[i][j] = False

# Recursive function to find the minimum cuts needed in a string
# such that each partition is a palindrome
def findMinCuts(i, j, isPalin, lookup):

    # base case: if starting index `i` and ending index `j` are equal,
    # or `X[i…j]` is already a palindrome.
    if i == j or isPalin[i][j]:
        return 0

    # construct a unique key from dynamic elements of the input.
    # lookup[key] stores the minimum number of cuts needed to partition `X[i…j]`
    key = (i, j)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:

        # take the minimum over each possible position at which they can be cut

        '''
            (X[i])     | (X[i+1…j])
            (X[i…i+1]) | (X[i+2…j])
            (X[i…i+2]) | (X[i+3…j])
            …
            …
            (X[i…j-1]) | (X[j])
        '''

        lookup[key] = sys.maxsize
        for k in range(i, j):
            # recur to get minimum cuts required in `X[i…k]` and `X[k+1…j]`
            count = 1 + findMinCuts(i, k, isPalin, lookup) + \
                    findMinCuts(k + 1, j, isPalin, lookup)

            if count < lookup[key]:
                lookup[key] = count

    # return the minimum cuts required
    return lookup[key]

def findMinimumCuts(X):

    # base case
    if not X:
        return 0

    # create a dictionary to store solutions to subproblems
    lookup = {}

    # isPalin[i][j] stores if substring X[i][j] is palindrome or not
    isPalin = [[False for x in range(len(X) + 1)] for y in range(len(X) + 1)]

    # find all substrings of `X` that are palindromes
    findAllPalindromes(X, isPalin)

    return findMinCuts(0, len(X) - 1, isPalin, lookup)

if __name__ == '__main__':

    X = 'BABABCBADCD'

    print('The minimum cuts required are', findMinimumCuts(X))
```

The time complexity of the above top-down solution is O(n3) and requires O(n2) extra space, where `n` is the length of the input string.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. It has the “less” asymptotic runtime and requires no recursion. The approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Bottom-up DP function to mark if string `X[i…j]` is a palindrome
// or not for all possible values of `i` and `j`
bool findAllPalindromes(string X, auto &isPalindrome)
{
    int n = X.length();

    for (int i = n - 1; i >= 0; i--)
    {
        for (int j = i; j < n; j++)
        {
            if (i == j) {
                isPalindrome[i][j] = true;
            }
            else if (X[i] == X[j]) {
                isPalindrome[i][j] = ((j - i == 1) ? true: isPalindrome[i + 1][j - 1]);
            }
            else {
                isPalindrome[i][j] = false;
            }
        }
    }
}

// Iterative function to find the minimum cuts needed in a string
// such that each partition is a palindrome
int findMinCuts(string X, auto &isPalindrome)
{
    int n = X.length();

    // create a lookup table to store solutions to subproblems
    // `lookup[i]` stores the minimum cuts needed in substring `X[i…n)`

    int lookup[n];

    // start from the string's end
    for (int i = n - 1; i >= 0; i--)
    {
        lookup[i] = INT_MAX;

        // if `X[i…n-1]` is a palindrome, the total cuts needed is 0
        if (isPalindrome[i][n-1]) {
            lookup[i] = 0;
        }
        else {
            // otherwise, find lookup[i]
            for (int j = n - 2; j >= i; j--)
            {
                if (isPalindrome[i][j]) {
                    lookup[i] = min(lookup[i], 1 + lookup[j + 1]);
                }
            }
        }
    }

    return lookup[0];
}

// Wrapper over findMinCuts() function
int findMinimumCuts(string X)
{
    int n = X.length();

    // base case
    if (n == 0) {
        return 0;
    }

    // isPalindrome[i][j] stores if substring X[i][j] is palindrome or not
    vector<vector<bool>> isPalindrome(n + 1, vector<bool>(n + 1));

    // find all substrings of `X` that are palindromes
    findAllPalindromes(X, isPalindrome);

    return findMinCuts(X, isPalindrome);
}

int main()
{
    string X = "BABABCBADCEDE";     // BAB|ABCBA|D|C|EDE

    cout << "The minimum cuts required are " << findMinimumCuts(X);

    return 0;
}
```

**Output:** The minimum cuts required are 4
