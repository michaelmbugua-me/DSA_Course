# Shortest Common Supersequence Problem using LCS

> Source: https://www.techiedelight.com/shortest-common-supersequence-using-lcs/

The Shortest Common Supersequence (SCS) is finding the shortest supersequence `Z` of given sequences `X` and `Y` such that both `X` and `Y` are subsequences of `Z`.

For example,

Consider the two following sequences, X and Y: X: ABCBDAB Y: BDCABA The length of the SCS is 9 SCS are ABCBDCABA, ABDCABDAB, and ABDCBDABA

> 

## 1\. Finding Length of Shortest Common Supersequence

The shortest common supersequence problem is closely related to the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) problem. The length of the shortest common supersequence of two subsequences can be easily derived from the length of their longest common subsequence. For given two sequences `X` and `Y` of length `m` and `n`, respectively, the relation is:

SCSLength(X, Y) = m + n – LCSLength(X, Y)

This relation works as LCS detects common characters present in the string, and in order for a common supersequence to be of minimal length, the common characters should be present in it only once. So, the length of SCS is equal to the sum of both strings minus their LCS length. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

// Function to find the length of LCS of substring `X[0…m-1]` and `Y[0…n-1]`
int LCSLength(string X, string Y, int m, int n, auto &lookup)
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
        // if the last character of `X` and `Y` matches
        if (X[m - 1] == Y[n - 1]) {
            lookup[key] = LCSLength(X, Y, m - 1, n - 1, lookup) + 1;
        }
        else {
            // otherwise, if the last character of `X` and `Y` don't match
            lookup[key] = max(LCSLength(X, Y, m, n - 1, lookup),
                            LCSLength(X, Y, m - 1, n, lookup));
        }
    }

    // return the subproblem solution from the map
    return lookup[key];
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA";
    int m = X.length(), n = Y.length();

    // create a map to store solutions to subproblems
    unordered_map<string, int> lookup;

    // find the length of the longest common subsequence (LCS)
    int len = LCSLength(X, Y, m, n, lookup);

    // length of the shortest common supersequence of two strings
    // is equal to the sum of both strings minus the length of
    // their longest common subsequence

    cout << "The length of the shortest common supersequence is "
         << m + n - len;

    return 0;
}
```

**Output:** The length of the shortest common supersequence is 9

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to find the length of LCS of substring `X[0…m-1]` and `Y[0…n-1]`
    public static int LCSLength(String X, String Y, int m, int n,
                                Map<String, Integer> lookup)
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
            // if the last character of `X` and `Y` matches
            if (X.charAt(m - 1) == Y.charAt(n - 1)) {
                lookup.put(key, LCSLength(X, Y, m - 1, n - 1, lookup) + 1);
            }
            else {
                // otherwise, if the last character of `X` and `Y` don't match
                int max = Integer.max(LCSLength(X, Y, m, n - 1, lookup),
                                    LCSLength(X, Y, m - 1, n, lookup));
                lookup.put(key, max);
            }
        }

        // return the subproblem solution from the map
        return lookup.get(key);
    }

    public static void main(String[] args)
    {
        String X = "ABCBDAB", Y = "BDCABA";

        int m = X.length(), n = Y.length();

        // create a map to store solutions to subproblems
        Map<String, Integer> lookup = new HashMap<>();

        // find the length of the longest common subsequence (LCS)
        int len = LCSLength(X, Y, m, n, lookup);

        // length of the shortest common supersequence of two strings
        // is equal to the sum of both strings minus the length of
        // their longest common subsequence

        System.out.println("The length of the shortest common supersequence is "
                        + (m + n - len));
    }
}
```

##

```python3
# Function to find the length of LCS of substring `X[0…m-1]` and `Y[0…n-1]`
def LCSLength(X, Y, m, n, lookup):

    # return if the end of either string is reached
    if m == 0 or n == 0:
        return 0

    # construct a unique key from dynamic elements of the input
    key = (m, n)

    # if the subproblem is seen for the first time, solve it and
    # store its result in a dictionary
    if key not in lookup:
        # if the last character of `X` and `Y` matches
        if X[m - 1] == Y[n - 1]:
            lookup[key] = LCSLength(X, Y, m - 1, n - 1, lookup) + 1
        else:
            # otherwise, if the last character of `X` and `Y` don't match
            lookup[key] = max(LCSLength(X, Y, m, n - 1, lookup),
                            LCSLength(X, Y, m - 1, n, lookup))

    # return the subproblem solution from the dictionary
    return lookup[key]

if __name__ == '__main__':

    X = 'ABCBDAB'
    Y = 'BDCABA'

    m = len(X)
    n = len(Y)

    # create a dictionary to store solutions to subproblems
    lookup = {}

    # find the length of the longest common subsequence (LCS)
    length = LCSLength(X, Y, m, n, lookup)

    # length of the shortest common supersequence of two strings
    # is equal to the sum of both strings minus the length of
    # their longest common subsequence

    print('The length of the shortest common supersequence is', (m + n - length))
```

## 2\. Finding the Shortest Common Supersequence

For two input sequences, an SCS can be easily formed from the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence-finding-lcs/) problem. The idea is to construct an SCS by considering the non-lcs characters while preserving the character order.

For example, consider two sequences `abcbdab` and `bdcaba` having LCS equal to `bcba`. By inserting the non-lcs characters and preserving the character order, we get the string `abdcabdab`, our SCS.

### How can we achieve this?

The idea is to fill the lookup table of LCS by finding the length of LCS of given sequences, `X[0…m-1]` and `Y[0…n-1]` in a [bottom-up manner](https://techiedelight.com/introduction-dynamic-programming/#bottom-up). Then recursively find the SCS in a top-down manner using values in the lookup table, i.e., follow the path from the bottom-right corner of the lookup table to its top-left corner when reading out an SCS.

  * If the current characters of `X` and `Y` are equal, they are part of the SCS, and we move diagonally in the lookup table (i.e., recur to find SCS of sequence `X[0…m-2]`, `Y[0…n-2]`).
  * If the current characters of `X` and `Y` are different, go up or left, depending on which cell has a higher number.
    1. If a top cell of the current cell has more value than the left cell, include the current character of sequence `X` in SCS and recur to find SCS of sequence `X[0…m-2]`, `Y[0…n-1]`.
    2. If a left cell of the current cell has more value than the top cell, include the current character of sequence `Y` in SCS and recur to find SCS of sequence `X[0…m-1]`, `Y[0…n-2]`.
  * If the end of either sequence is reached, then the other sequence forms part of the SCS.

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Function to return shortest common supersequence (SCS)
// of substrings `X[0…m-1]`, `Y[0…n-1]`
string SCS(string X, string Y, int m, int n, auto &lookup)
{
    // if the end of the first string is reached,
    // return the second string
    if (m == 0) {
        return Y.substr(0, n);
    }

    // if the end of the second string is reached,
    // return the first string
    else if (n == 0) {
        return X.substr(0, m);
    }

    // if the last character of `X` and `Y` matches, include it in SSC
    // and recur to find SCS of substring `X[0…m-2]` and `Y[0…n-1]`
    if (X[m - 1] == Y[n - 1]) {
        return SCS(X, Y, m - 1, n - 1, lookup) + X[m - 1];
    }

    // if the last character of `X` and `Y` don't match
    else {
        // if a top cell of the current cell has more value than the left
        // cell, then include the current character of string `X` in SCS
        // and find SCS of substring `X[0…m-2]` and `Y[0…n-1]`

        if (lookup[m - 1][n] > lookup[m][n - 1]) {
            return SCS(X, Y, m - 1, n, lookup) + X[m - 1];
        }

        // if a left cell of the current cell has more value than the top
        // cell, then include the current character of string `Y` in SCS
        // and find SCS of substring `X[0…m-1]` and `Y[0…n-2]`
        else {
            return SCS(X, Y, m, n - 1, lookup) + Y[n - 1];
        }
    }
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X[0…m-1]` and `Y[0…n-1]`
void LCS(string X, string Y, int m, int n, auto &lookup)
{
    // first row and first column of the lookup table are already 0

    // fill the lookup table in a bottom-up manner
    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            // if the current character of `X` and `Y` matches
            if (X[i - 1] == Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current character of `X` and `Y` don't match
            else {
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA";

    int m = X.length(), n = Y.length();

    // `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // fill the lookup table by finding LCS of `X` and `Y`
    LCS(X, Y, m, n, lookup);

    // find the shortest common supersequence by reading the lookup
    // table of LCS in a top-down manner
    cout << "The shortest common supersequence of " << X << " and " << Y <<
            " is " << SCS(X, Y, m, n, lookup);

    return 0;
}
```

**Output:** The shortest common supersequence of ABCBDAB and BDCABA is ABCBDCABA

##

```java
class Main
{
    // Function to return shortest common supersequence (SCS)
    // of substrings `X[0…m-1]`, `Y[0…n-1]`
    public static String SCS(String X, String Y, int m, int n, int[][] lookup)
    {
        // if the end of the first string is reached,
        // return the second string
        if (m == 0) {
            return Y.substring(0, n);
        }

        // if the end of the second string is reached,
        // return the first string
        else if (n == 0) {
            return X.substring(0, m);
        }

        // if the last character of `X` and `Y` matches, include it in SSC
        // and recur to find SCS of substring `X[0…m-2]` and `Y[0…n-1]`
        if (X.charAt(m - 1) == Y.charAt(n - 1)) {
            return SCS(X, Y, m - 1, n - 1, lookup) + X.charAt(m - 1);
        }
        // if the last character of `X` and `Y` don't match
        else {
            // if a top cell of the current cell has more value than the left
            // cell, then include the current character of string `X` in SCS
            // and find SCS of substring `X[0…m-2]` and `Y[0…n-2]`

            if (lookup[m - 1][n] > lookup[m][n - 1]) {
                return SCS(X, Y, m - 1, n, lookup) + X.charAt(m - 1);
            }

            // if a left cell of the current cell has more value than the top
            // cell, then include the current character of string `Y` in SCS
            // and find SCS of substring `X[0…m-1]` and `Y[0…n-2]`
            else {
                return SCS(X, Y, m, n - 1, lookup) + Y.charAt(n - 1);
            }
        }
    }

    // Function to fill the lookup table by finding the length of LCS
    // of substring `X[0…m-1]` and `Y[0…n-1]`
    public static void LCS(String X, String Y, int m, int n, int[][] lookup)
    {
        // Fill the lookup table in a bottom-up manner.
        // the first row and first column of the lookup table are already 0.
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                // if the current character of `X` and `Y` matches
                if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                    lookup[i][j] = lookup[i - 1][j - 1] + 1;
                }
                // otherwise, if the current character of `X` and `Y` don't match
                else {
                    lookup[i][j] = Integer.max(lookup[i - 1][j], lookup[i][j - 1]);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        String X = "ABCBDAB", Y = "BDCABA";
        int m = X.length(), n = Y.length();

        // `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
        int[][] lookup = new int[m + 1][n + 1];

        // fill the lookup table by finding LCS of `X` and `Y`
        LCS(X, Y, m, n, lookup);

        // find the shortest common supersequence by reading the lookup
        // table of LCS in a top-down manner
        System.out.println("The shortest common supersequence of " + X +
                " and " + Y + " is " + SCS(X, Y, m, n, lookup));
    }
}
```

##

```python3
# Function to return shortest common supersequence (SCS)
# of substrings `X[0…m-1]`, `Y[0…n-1]`
def SCS(X, Y, m, n, lookup):

    # if the end of the first string is reached,
    # return the second string
    if m == 0:
        return Y[:n]

    # if the end of the second string is reached,
    # return the first string
    elif n == 0:
        return X[:m]

    # if the last character of `X` and `Y` matches, include it in SSC
    # and recur to find SCS of substring `X[0…m-2]` and `Y[0…n-1]`
    if X[m - 1] == Y[n - 1]:
        return SCS(X, Y, m - 1, n - 1, lookup) + X[m - 1]

    # if the last character of `X` and `Y` don't match
    else:

        # if a top cell of the current cell has more value than the left
        # cell, then include the current character of string `X` in SCS
        # and find SCS of substring `X[0…m-2]` and `Y[0…n-2]`

        if lookup[m - 1][n] > lookup[m][n - 1]:
            return SCS(X, Y, m - 1, n, lookup) + X[m - 1]

        # if a left cell of the current cell has more value than the top
        # cell, then include the current character of string `Y` in SCS
        # and find SCS of substring `X[0…m-1]` and `Y[0…n-2]`
        else:
            return SCS(X, Y, m, n - 1, lookup) + Y[n - 1]

# Function to fill the lookup table by finding the length of LCS
# of substring `X[0…m-1]` and `Y[0…n-1]`
def LCS(X, Y, m, n, lookup):

    # Fill the lookup table in a bottom-up manner.
    # the first row and first column of the lookup table are already 0.
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # if the current character of `X` and `Y` matches
            if X[i - 1] == Y[j - 1]:
                lookup[i][j] = lookup[i - 1][j - 1] + 1
            # otherwise, if the current character of `X` and `Y` don't match
            else:
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1])

if __name__ == '__main__':

    X = 'ABCBDAB'
    Y = 'BDCABA'

    m = len(X)
    n = len(Y)

    # `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    lookup = [[0 for x in range(n + 1)] for y in range(m + 1)]

    # fill the lookup table by finding LCS of `X` and `Y`
    LCS(X, Y, m, n, lookup)

    # find the shortest common supersequence by reading the lookup
    # table of LCS in a top-down manner
    print(f'The shortest common supersequence of {X} and {Y} is',
            SCS(X, Y, m, n, lookup))
```

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` is the length of the first string and `n` is the length of the second string.

## 3\. Finding All Shortest Common Supersequence

The shortest common supersequence for two strings is not unique, and the above code doesn’t generate all SCS of the given sequences. It will always print one SCS. The problem with the above code is when the last characters of `X` and `Y` are different, we either go up or left in the lookup table depending upon which side has a larger value.

### How can we modify the code so it prints all possible SCS?

The idea remains the same except if the top cell is equal to the left cell, consider both top and left directions; otherwise, go in the direction of greater value.

In other words, if the last characters of `X` and `Y` are not the same, then SCS can be constructed from either the top side or from the left side of the lookup table, depending upon which side has a larger value. If both the values are equal, then SCS can be constructed from both directions in the lookup table. So, we go in the direction of a larger value or go in both directions if the values are equal.

Following is the C++, Java, and Python implementation based on the above idea:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <set>
using namespace std;

// Function to return all SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
vector<string> SCS(string X, string Y, int m, int n, auto &lookup)
{
    // if the end of the first string is reached, create a vector
    // containing the second substring and return
    if (m == 0) {
        return {Y.substr(0, n)};
    }

    // if the end of the second string is reached, create a vector
    // containing the first substring and return
    else if (n == 0) {
        return {X.substr(0, m)};
    }

    // if the last character of `X` and `Y` is the same, it should occur
    // only one time in SSC
    if (X[m - 1] == Y[n - 1])
    {
        // find all SCS of substring `X[0…m-2]` and `Y[0…n-2]`
        vector<string> scs = SCS(X, Y, m - 1, n - 1, lookup);

        // append the current character `X[m-1]` or `Y[n-1]` to all SCS of
        // substring `X[0…m-2]` and `Y[0…n-2]`

        for (string &str: scs) {        // don't remove `&`
            str.push_back(X[m - 1]);
        }

        return scs;
    }

    // we reach here when the last character of `X` and `Y` don't match

    // if a top cell of the current cell has more value than the left cell,
    // then append the current character of string `X` to all SCS of
    // substring `X[0…m-2]`, `Y[0…n-1]`

    if (lookup[m - 1][n] > lookup[m][n - 1])
    {
        vector<string> scs = SCS(X, Y, m - 1, n, lookup);

        for (string &str: scs) {        // don't remove `&`
            str.push_back(X[m - 1]);
        }

        return scs;
    }

    // if a left cell of the current cell has more value than the top cell,
    // then append the current character of string `Y` to all SCS of
    // substring `X[0…m-1]`, `Y[0…n-2]`

    if (lookup[m][n - 1] > lookup[m - 1][n])
    {
        vector<string> scs = SCS(X, Y, m, n - 1, lookup);

        for (string &str: scs) {        // don't remove `&`
            str.push_back(Y[n - 1]);
        }

        return scs;
    }

    // if the top cell value is the same as the left cell, then go in both
    // top and left directions

    // append the current character of string `X` to all SCS of
    // substring `X[0…m-2]`, `Y[0…n-1]`
    vector<string> top = SCS(X, Y, m - 1, n, lookup);
    for (string &str: top) {            // don't remove `&`
        str.push_back(X[m - 1]);
    }

    // append the current character of string `Y` to all SCS of
    // substring `X[0…m-1]`, `Y[0…n-2]`
    vector<string> left = SCS(X, Y, m, n - 1, lookup);
    for (string &str: left) {           // don't remove `&`
        str.push_back(Y[n - 1]);
    }

    // merge two vectors and return
    top.insert(top.end(), left.begin(), left.end());
    // copy(left.begin(), left.end(), back_inserter(top));

    return top;
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X[0…m-1]` and `Y[0…n-1]`
void LCS(string X, string Y, int m, int n, auto &lookup)
{
    // first row and first column of the lookup table are already 0

    // fill the lookup table in a bottom-up manner
    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            // if the current character of `X` and `Y` matches
            if (X[i - 1] == Y[j - 1]) {
                lookup[i][j] = lookup[i - 1][j - 1] + 1;
            }
            // otherwise, if the current character of `X` and `Y` don't match
            else {
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1]);
            }
        }
    }
}

// Function to find all shortest common supersequence of string `X` and `Y`
set<string> SCS(string X, string Y)
{
    int m = X.length(), n = Y.length();

    // `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // fill lookup table
    LCS(X, Y, m, n, lookup);

    // find all the longest common sequences
    vector<string> v = SCS(X, Y, m, n, lookup);

    // since a vector can contain duplicates, "convert" the vector to a set
    set<string> scs(make_move_iterator(v.begin()), make_move_iterator(v.end()));

    // to "copy" a vector to a set use
    // set<string> scs(v.begin(), v.end());

    // return set containing all SCS
    return scs;
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA";

    // Find all shortest common supersequence of string `X` and `Y`
    set<string> scs = SCS(X, Y);

    cout << "All shortest common supersequence of " << X <<
            " and " << Y << " are -" << "\n\n";

    // print all SCS present in the set
    for (string str: scs) {
        cout << str << endl;
    }

    return 0;
}
```

**Output:** All shortest common supersequence of ABCBDAB and BDCABA are: ABCBDCABA ABDCABDAB ABDCBDABA
