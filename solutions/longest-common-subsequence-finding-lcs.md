# Longest Common Subsequence | Finding all LCS

> Source: https://www.techiedelight.com/longest-common-subsequence-finding-lcs/

Given two sequences, print all the possible longest common subsequences present in them.

For example,

**Input:** X = XMJYAUZ, Y = MZJAWXU **Output:** MJAU **Input:** X = ABCBDAB, Y = BDCABA **Output:** BCAB, BCBA, BDAB

> 

In the [previous post](https://techiedelight.com/longest-common-subsequence/), we have discussed how to find the length of the longest common subsequence. This post will discuss how to print the longest common subsequence itself.

Let `X` be `XMJYAUZ` and `Y` be `MZJAWXU`. The longest common subsequence between `X` and `Y` is `MJAU`. The table below shows the lengths of the longest common subsequences between prefixes of `X` and `Y`. The `i'th` row and `j'th` column show the LCS’s length of substring `X[0…i-1]` and `Y[0…j-1]`.

The highlighted numbers show the path one should follow from the bottom-right to the top-left corner when reading an LCS. If the current characters in `X` and `Y` are equal (shown in bold), they are part of the LCS, and we move diagonally. If the current characters in `X` and `Y` are different, we go up or left, depending on which cell has a higher number. This corresponds to either taking the LCS between `X[0…i-2], Y[0…j-1]`, or `X[0…i-1], Y[0…j-2]`.

The following C++, Java, and Python implementation fills the lookup table in a [bottom-up manner](https://techiedelight.com/introduction-dynamic-programming/#bottom-up) and then recursively finds LCS in a [top-down](https://techiedelight.com/introduction-dynamic-programming/#top-down) manner using values in the lookup table.

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Recursive function to find the longest common subsequence of
// string `X[0…m-1]` and `Y[0…n-1]`
string LCS(string X, string Y, int m, int n, auto &lookup)
{
    // return an empty string if the end of either sequence is reached
    if (m == 0 || n == 0) {
        return string("");
    }

    // if the last character of `X` and `Y` matches
    if (X[m - 1] == Y[n - 1])
    {
        // append current character (`X[m-1]` or `Y[n-1]`) to LCS of
        // substring `X[0…m-2]` and `Y[0…n-2]`
        return LCS(X, Y, m - 1, n - 1, lookup) + X[m - 1];
    }

    // otherwise, if the last character of `X` and `Y` are different

    // if a top cell of the current cell has more value than the left
    // cell, then drop the current character of string `X` and find LCS
    // of substring `X[0…m-2]`, `Y[0…n-1]`

    if (lookup[m - 1][n] > lookup[m][n - 1]) {
        return LCS(X, Y, m - 1, n, lookup);
    }
    else {
        // if a left cell of the current cell has more value than the top
        // cell, then drop the current character of string `Y` and find LCS
        // of substring `X[0…m-1]`, `Y[0…n-2]`

        return LCS(X, Y, m, n - 1, lookup);
    }
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X[0…m-1]` and `Y[0…n-1]`
void LCSLength(string X, string Y, int m, int n, auto &lookup)
{
    // fill the lookup table in a bottom-up manner
    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            // if current character of `X` and `Y` matches
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

// Function to find all LCS of string `X` and `Y`
string LCS(string X, string Y)
{
    int m = X.length(), n = Y.length();

    // lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // fill lookup table
    LCSLength(X, Y, m, n, lookup);

    // return LCS
    return LCS(X, Y, m, n, lookup);;
}

int main()
{
    string X = "XMJYAUZ", Y = "MZJAWXU";

    // find the longest common subsequence
    cout << LCS(X, Y);

    return 0;
}
```

**Output:** MJAU

##

```java
class Main
{
    // Function to find the longest common subsequence of string `X[0…m-1]`
    // and `Y[0…n-1]`
    public static String LCS(String X, String Y, int m, int n, int[][] lookup)
    {
        // return an empty string if the end of either sequence is reached
        if (m == 0 || n == 0) {
            return new String();
        }

        // if the last character of `X` and `Y` matches
        if (X.charAt(m - 1) == Y.charAt(n - 1))
        {
            // append current character (`X[m-1]` or `Y[n-1]`) to LCS of
            // substring `X[0…m-2]` and `Y[0…n-2]`
            return LCS(X, Y, m - 1, n - 1, lookup) + X.charAt(m - 1);
        }

        // otherwise, if the last character of `X` and `Y` are different

        // if a top cell of the current cell has more value than the left
        // cell, then drop the current character of string `X` and find LCS
        // of substring `X[0…m-2]`, `Y[0…n-1]`

        if (lookup[m - 1][n] > lookup[m][n - 1]) {
            return LCS(X, Y, m - 1, n, lookup);
        }
        else {
            // if a left cell of the current cell has more value than the top
            // cell, then drop the current character of string `Y` and find LCS
            // of substring `X[0…m-1]`, `Y[0…n-2]`

            return LCS(X, Y, m, n - 1, lookup);
        }
    }

    // Function to fill the lookup table by finding the length of LCS
    // of substring `X[0…m-1]` and `Y[0…n-1]`
    public static void LCSLength(String X, String Y, int m, int n, int[][] lookup)
    {
        // fill the lookup table in a bottom-up manner
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                // if current character of `X` and `Y` matches
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
        String X = "XMJYAUZ", Y = "MZJAWXU";
        int m = X.length(), n = Y.length();

        // lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
        int[][] lookup = new int[m + 1][n + 1];

        // fill lookup table
        LCSLength(X, Y, m, n, lookup);

        // find the longest common subsequence
        System.out.println(LCS(X, Y, m, n, lookup));
    }
}
```

##

```python3
# Function to find the longest common subsequence of string `X[0…m-1]` and `Y[0…n-1]`
def LCS(X, Y, m, n, lookup):

    # return an empty string if the end of either sequence is reached
    if m == 0 or n == 0:
        return str()

    # if the last character of `X` and `Y` matches
    if X[m - 1] == Y[n - 1]:
        # append current character (`X[m-1]` or `Y[n-1]`) to LCS of
        # substring `X[0…m-2]` and `Y[0…n-2]`
        return LCS(X, Y, m - 1, n - 1, lookup) + X[m - 1]

    # otherwise, if the last character of `X` and `Y` are different

    # if a top cell of the current cell has more value than the left
    # cell, then drop the current character of string `X` and find LCS
    # of substring `X[0…m-2]`, `Y[0…n-1]`

    if lookup[m - 1][n] > lookup[m][n - 1]:
        return LCS(X, Y, m - 1, n, lookup)
    else:
        # if a left cell of the current cell has more value than the top
        # cell, then drop the current character of string `Y` and find LCS
        # of substring `X[0…m-1]`, `Y[0…n-2]`
        return LCS(X, Y, m, n - 1, lookup)

# Function to fill the lookup table by finding the length of LCS
# of substring `X[0…m-1]` and `Y[0…n-1]`
def LCSLength(X, Y, m, n, lookup):

    # fill the lookup table in a bottom-up manner
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # if current character of `X` and `Y` matches
            if X[i - 1] == Y[j - 1]:
                lookup[i][j] = lookup[i - 1][j - 1] + 1
            # otherwise, if the current character of `X` and `Y` don't match
            else:
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1])

if __name__ == '__main__':

    X = 'XMJYAUZ'
    Y = 'MZJAWXU'

    m = len(X)
    n = len(Y)

    # lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    lookup = [[0 for x in range(n + 1)] for y in range(m + 1)]

    # fill lookup table
    LCSLength(X, Y, m, n, lookup)

    # find the longest common subsequence
    print(LCS(X, Y, m, n, lookup))
```

How can we modify the code so it prints all possible LCS?

The above code doesn’t generate all the longest common subsequences of given sequences. It will always print one LCS. The problem with the above code is when the last character of `X` and `Y` are different, it discards either the last character of `X` or the last character of `Y` based on the top or left cell’s value to the current cell. But what if LCS is also possible with the discarded character?

The idea remains the same except if the top cell is equal to the left cell, consider both characters; otherwise, go in the direction of greater value. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <set>
#include <string>
using namespace std;

// Function to return all LCS of substrings `X[0…m-1]`, `Y[0…n-1]`
vector<string> LCS(string X, string Y, int m, int n, auto &lookup)
{
    // if the end of either sequence is reached
    if (m == 0 || n == 0)
    {
        // create a vector with an empty string and return
        return {""};
    }

    // if the last character of `X` and `Y` matches
    if (X[m - 1] == Y[n - 1])
    {
        // ignore the last characters of `X` and `Y` and find all LCS of substring
        // `X[0…m-2]`, `Y[0…n-2]` and store it in a vector
        vector<string> lcs = LCS(X, Y, m - 1, n - 1, lookup);

        // append current character `X[m-1]` or `Y[n-1]` to all LCS of
        // substring `X[0…m-2]` and `Y[0…n-2]`
        for (string &str: lcs) {        // don't remove `&`
            str.push_back(X[m - 1]);
        }

        return lcs;
    }

    // we reach here when the last character of `X` and `Y` don't match

    // if a top cell of the current cell has more value than the left cell,
    // then ignore the current character of string `X` and find all LCS of
    // substring `X[0…m-2]`, `Y[0…n-1]`

    if (lookup[m - 1][n] > lookup[m][n - 1]) {
        return LCS(X, Y, m - 1, n, lookup);
    }

    // if a left cell of the current cell has more value than the top cell,
    // then ignore the current character of string `Y` and find all LCS of
    // substring `X[0…m-1]`, `Y[0…n-2]`

    if (lookup[m][n - 1] > lookup[m - 1][n]) {
        return LCS(X, Y, m, n - 1, lookup);
    }

    // if the top cell has equal value to the left cell, then consider
    // both characters

    vector<string> top = LCS(X, Y, m - 1, n, lookup);
    vector<string> left = LCS(X, Y, m, n - 1, lookup);

    // merge two vectors and return
    top.insert(top.end(), left.begin(), left.end());
    // copy(left.begin(), left.end(), back_inserter(top));

    return top;
}

// Function to fill the lookup table by finding the length of LCS
// of substring `X[0…m-1]` and `Y[0…n-1]`
void LCSLength(string X, string Y, int m, int n, auto &lookup)
{
    // first row and first column of the lookup table are already 0

    // fill the lookup table in a bottom-up manner
    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            // if current character of `X` and `Y` matches
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

// Function to find all LCS of string `X` and `Y`
set<string> LCS(string X, string Y)
{
    int m = X.length(), n = Y.length();

    // lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // fill lookup table
    LCSLength(X, Y, m, n, lookup);

    // find all the longest common subsequences
    vector<string> v = LCS(X, Y, m, n, lookup);

    // since a vector can contain duplicates, "convert" it to a set
    set<string> lcs(make_move_iterator(v.begin()), make_move_iterator(v.end()));

    // to copy a vector to a set use set<string> lcs(v.begin(), v.end())

    // return set containing all LCS
    return lcs;
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA";

    set<string> lcs = LCS(X, Y);

    // print set elements
    for (string str: lcs) {
        cout << str << endl;
    }

    return 0;
}
```

**Output:** BCAB BCBA BDAB

##

```java
import java.util.*;

class Main
{
    // Function to return all LCS of substrings `X[0…m-1]`, `Y[0…n-1]`
    public static List<String> LCS(String X, String Y, int m, int n, int[][] lookup)
    {
        // if the end of either sequence is reached
        if (m == 0 || n == 0)
        {
            // create a list with one empty string and return
            return new ArrayList<>(Collections.nCopies(1, ""));
        }

        // if the last character of `X` and `Y` matches
        if (X.charAt(m - 1) == Y.charAt(n - 1))
        {
            // ignore the last characters of `X` and `Y` and find all LCS of
            // substring `X[0…m-2]`, `Y[0…n-2]` and store it in a list
            List<String> lcs = LCS(X, Y, m - 1, n - 1, lookup);

            // append current character `X[m-1]` or `Y[n-1]`
            // to all LCS of substring `X[0…m-2]` and `Y[0…n-2]`
            for (int i = 0; i < lcs.size(); i++) {
                lcs.set(i, lcs.get(i) + (X.charAt(m - 1)));
            }

            return lcs;
        }

        // we reach here when the last character of `X` and `Y` don't match

        // if a top cell of the current cell has more value than the left cell,
        // then ignore the current character of string `X` and find all LCS of
        // substring `X[0…m-2]`, `Y[0…n-1]`
        if (lookup[m - 1][n] > lookup[m][n - 1]) {
            return LCS(X, Y, m - 1, n, lookup);
        }

        // if a left cell of the current cell has more value than the top cell,
        // then ignore the current character of string `Y` and find all LCS of
        // substring `X[0…m-1]`, `Y[0…n-2]`
        if (lookup[m][n - 1] > lookup[m - 1][n]) {
            return LCS(X, Y, m, n - 1, lookup);
        }

        // if the top cell has equal value to the left cell,
        // then consider both characters

        List<String> top = LCS(X, Y, m - 1, n, lookup);
        List<String> left = LCS(X, Y, m, n - 1, lookup);

        // merge two lists and return
        top.addAll(left);

        return top;
    }

    // Function to fill the lookup table by finding the length of LCS
    // of substring `X` and `Y`
    public static void LCSLength(String X, String Y, int[][] lookup)
    {
        // fill the lookup table in a bottom-up manner
        for (int i = 1; i <= X.length(); i++)
        {
            for (int j = 1; j <= Y.length(); j++)
            {
                // if current character of `X` and `Y` matches
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

    // Function to find all LCS of string `X[0…m-1]` and `Y[0…n-1]`
    public static Set<String> LCS(String X, String Y, int[][] lookup)
    {
        // fill lookup table
        LCSLength(X, Y, lookup);

        // find all the longest common subsequences
        List<String> lcs = LCS(X, Y, X.length(), Y.length(), lookup);

        // since a list can contain duplicates, "convert" it to a set and return
        return new HashSet<>(lcs);
    }

    public static void main(String[] args)
    {
        String X = "ABCBDAB", Y = "BDCABA";

        // lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
        int[][] lookup = new int[X.length() + 1][Y.length() + 1];

        Set<String> lcs = LCS(X, Y, lookup);

        // print set elements
        System.out.println(lcs);
    }
}
```

##

```python3
# Function to return all LCS of substrings `X[0…m-1]`, `Y[0…n-1]`
def LCS(X, Y, m, n, lookup):

    # if the end of either sequence is reached
    if m == 0 or n == 0:
        # create a list with one empty string and return
        return ['']

    # if the last character of `X` and `Y` matches
    if X[m - 1] == Y[n - 1]:

        # ignore the last characters of `X` and `Y` and find all LCS of substring
        # `X[0…m-2]`, `Y[0…n-2]` and store it in a list
        lcs = LCS(X, Y, m - 1, n - 1, lookup)

        # append current character `X[m-1]` or `Y[n-1]`
        # to all LCS of substring `X[0…m-2]` and `Y[0…n-2]`
        for i in range(len(lcs)):
            lcs[i] = lcs[i] + (X[m - 1])

        return lcs

    # we reach here when the last character of `X` and `Y` don't match

    # if a top cell of the current cell has more value than the left cell,
    # then ignore the current character of string `X` and find all LCS of
    # substring `X[0…m-2]`, `Y[0…n-1]`
    if lookup[m - 1][n] > lookup[m][n - 1]:
        return LCS(X, Y, m - 1, n, lookup)

    # if a left cell of the current cell has more value than the top cell,
    # then ignore the current character of string `Y` and find all LCS of
    # substring `X[0…m-1]`, `Y[0…n-2]`
    if lookup[m][n - 1] > lookup[m - 1][n]:
        return LCS(X, Y, m, n - 1, lookup)

    # if the top cell has equal value to the left cell, then consider both characters

    top = LCS(X, Y, m - 1, n, lookup)
    left = LCS(X, Y, m, n - 1, lookup)

    # merge two lists and return
    return top + left

# Function to fill the lookup table by finding the length of LCS
# of substring `X` and `Y`
def LCSLength(X, Y, lookup):

    # fill the lookup table in a bottom-up manner
    for i in range(1, len(X) + 1):
        for j in range(1, len(Y) + 1):
            # if current character of `X` and `Y` matches
            if X[i - 1] == Y[j - 1]:
                lookup[i][j] = lookup[i - 1][j - 1] + 1

            # otherwise, if the current character of `X` and `Y` don't match
            else:
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1])

# Function to find all LCS of string `X[0…m-1]` and `Y[0…n-1]`
def findLCS(X, Y):

    # lookup[i][j] stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
    lookup = [[0 for x in range(len(Y) + 1)] for y in range(len(X) + 1)]

    # fill lookup table
    LCSLength(X, Y, lookup)

    # find all the longest common subsequences
    lcs = LCS(X, Y, len(X), len(Y), lookup)

    # since a list can contain duplicates, "convert" it to a set and return
    return set(lcs)

if __name__ == '__main__':

    X = 'ABCBDAB'
    Y = 'BDCABA'

    lcs = findLCS(X, Y)
    print(lcs)
```

**References:** <https://en.wikipedia.org/wiki/Longest_common_subsequence_problem>
