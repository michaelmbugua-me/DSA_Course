# Shortest Common Supersequence | Finding all SCS

> Source: https://www.techiedelight.com/shortest-common-supersequence-finding-scs/

The Shortest Common Supersequence (SCS) is finding the shortest supersequence `Z` of given sequences `X` and `Y` such that both `X` and `Y` are subsequences of `Z`.

For example,

Consider the two following sequences, X and Y: X: ABCBDAB Y: BDCABA The length of the SCS is 9 SCS are ABCBDCABA, ABDCABDAB, and ABDCBDABA

> 

## 1\. Finding the Shortest Common Supersequence

The idea is to fill the lookup table of SCS by finding the [length of SCS](https://techiedelight.com/shortest-common-supersequence-introduction-scs-length/) of given sequences, `X[0…m-1]` and `Y[0…n-1]`, in a [bottom-up manner](https://techiedelight.com/introduction-dynamic-programming/#bottom-up) and then recursively find the SCS in a [top-down](https://techiedelight.com/introduction-dynamic-programming/#top-down) manner using values in the lookup table, i.e., follow the path from the bottom-right corner of lookup table to its top-left corner when reading out an SCS.

  * If the current characters of `X` and `Y` are equal, they are part of the SCS, and move diagonally in the lookup table (i.e., recur to find SCS of sequence `X[0…m-2]`, `Y[0…n-2]`).
  * If the current characters of `X` and `Y` are different, go up or left, depending on which cell has a lower number.
    1. If a top cell of the current cell has less value than the left cell, include the current character of sequence `X` in SCS and recur to find SCS of sequence `X[0…m-2]`, `Y[0…n-1]`.
    2. If a left cell of the current cell has less value than the top cell, include the current character of sequence `Y` in SCS and recur to find SCS of sequence `X[0…m-1]`, `Y[0…n-2]`.
  * If the end of either sequence is reached, then the other sequence forms part of the SCS.

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Function to return an SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
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
        // if the top cell of a current cell has less value than the left
        // cell, then include the current character of string `X` in SCS
        // and find SCS of substring `X[0…m-2]` and `Y[0…n-2]`

        if (lookup[m - 1][n] < lookup[m][n - 1]) {
            return SCS(X, Y, m - 1, n, lookup) + X[m-1];
        }

        // if the left cell of a current cell has less value than the top
        // cell, then include the current character of string `Y` in SCS
        // and find SCS of substring `X[0…m-1]` and `Y[0…n-2]`
        else {
            return SCS(X, Y, m, n - 1, lookup) + Y[n-1];
        }
    }
}

// Function to fill the lookup table by finding the length of SCS of
// sequences `X[0…m-1]` and `Y[0…n-1]`
int SCSLength(string X, string Y, int m, int n, auto &lookup)
{
    // initialize the first column of the lookup table
    for (int i = 0; i <= m; i++) {
        lookup[i][0] = i;
    }

    // initialize the first row of the lookup table
    for (int j = 0; j <= n; j++) {
        lookup[0][j] = j;
    }

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
                lookup[i][j] = min(lookup[i - 1][j] + 1,
                lookup[i][j - 1] + 1);
            }
        }
    }
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA";

    int m = X.length(), n = Y.length();

    // lookup table stores solution to already computed subproblems;
    // i.e., lookup[i][j] stores the length of SCS of substring
    // `X[0…i-1]` and `Y[0…j-1]`
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // fill the lookup table in a bottom-up manner
    SCSLength(X, Y, m, n, lookup);

    // find the shortest common supersequence by reading the lookup
    // table in a top-down manner
    cout << "The shortest common supersequence of " << X <<
            " and " << Y << " is " << SCS(X, Y, m, n, lookup);

    return 0;
}
```

**Output:** The shortest common supersequence of ABCBDAB and BDCABA is ABCBDCABA

##

```java
class Main
{
    // Function to return an SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
    public static String SCS(String X, String Y, int m, int n, int[][] lookup)
    {
        // if the end of the first string is reached,
        // return the second string
        if (m == 0) {
            return Y.substring(0, n);
        }

        // if the end of the second string is reached,
        // return the first string
        if (n == 0) {
            return X.substring(0, m);
        }

        // if the last character of `X` and `Y` matches, include it in SSC
        // and recur to find SCS of substring `X[0…m-2]` and `Y[0…n-1]`
        if (X.charAt(m - 1) == Y.charAt(n - 1)) {
            return SCS(X, Y, m - 1, n - 1, lookup) + X.charAt(m - 1);
        }
        // if the last character of `X` and `Y` don't match
        else {

            // if the top cell of a current cell has less value than the left
            // cell, then include the current character of string `X` in SCS
            // and find SCS of substring `X[0…m-2]` and `Y[0…n-2]`

            if (lookup[m - 1][n] < lookup[m][n - 1]) {
                return SCS(X, Y, m - 1, n, lookup) + X.charAt(m - 1);
            }

            // if the left cell of a current cell has less value than the top
            // cell, then include the current character of string `Y` in SCS
            // and find SCS of substring `X[0…m-1]` and `Y[0…n-2]`
            else {
                return SCS(X, Y, m, n - 1, lookup) + Y.charAt(n - 1);
            }
        }
    }

    // Function to fill the lookup table by finding the length of SCS of
    // sequences `X[0…m-1]` and `Y[0…n-1]`
    public static void SCSLength(String X, String Y, int m, int n, int[][] lookup)
    {
        // initialize the first column of the lookup table
        for (int i = 0; i <= m; i++) {
            lookup[i][0] = i;
        }

        // initialize the first row of the lookup table
        for (int j = 0; j <= n; j++) {
            lookup[0][j] = j;
        }

        // fill the lookup table in a bottom-up manner
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
                    lookup[i][j] = Integer.min(lookup[i - 1][j] + 1, lookup[i][j - 1] + 1);
                }
            }
        }
    }

    public static void main(String[] args)
    {
        String X = "ABCBDAB", Y = "BDCABA";

        int m = X.length(), n = Y.length();

        // lookup table stores solution to already computed subproblems
        // lookup[i][j] stores the length of SCS of substring `X[0…i-1]` and `Y[0…j-1]`
        int[][] lookup = new int[m + 1][n + 1];

        // fill the lookup table in a bottom-up manner
        SCSLength(X, Y, m, n, lookup);

        // find the shortest common supersequence by reading the lookup
        // table in a top-down manner
        System.out.print("The shortest common supersequence of " + X +
                " and " + Y + " is " + SCS(X, Y, m, n, lookup));
    }
}
```

##

```python3
# Function to return an SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
def SCS(X, Y, m, n, lookup):

    # if the end of the first string is reached,
    # return the second string
    if m == 0:
        return Y[:n]

    # if the end of the second string is reached,
    # return the first string
    if n == 0:
        return X[:m]

    # if the last character of `X` and `Y` matches, include it in SSC
    # and recur to find SCS of substring `X[0…m-2]` and `Y[0…n-1]`
    if X[m - 1] == Y[n - 1]:
        return SCS(X, Y, m - 1, n - 1, lookup) + X[m - 1]
    else:
        # if the last character of `X` and `Y` don't match

        # if the top cell of a current cell has less value than the left
        # cell, then include the current character of string `X` in SCS
        # and find SCS of substring `X[0…m-2]` and `Y[0…n-2]`

        if lookup[m - 1][n] < lookup[m][n - 1]:
            return SCS(X, Y, m - 1, n, lookup) + X[m - 1]

        # if the left cell of a current cell has less value than the top
        # cell, then include the current character of string `Y` in SCS
        # and find SCS of substring `X[0…m-1]` and `Y[0…n-2]`
        else:
            return SCS(X, Y, m, n - 1, lookup) + Y[n - 1]

# Function to fill the lookup table by finding the length of SCS of
# sequences `X[0…m-1]` and `Y[0…n-1]`
def SCSLength(X, Y, m, n, lookup):

    # initialize the first column of the lookup table
    for i in range(m + 1):
        lookup[i][0] = i

    # initialize the first row of the lookup table
    for j in range(n + 1):
        lookup[0][j] = j

    # fill the lookup table in a bottom-up manner
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # if the current character of `X` and `Y` matches
            if X[i - 1] == Y[j - 1]:
                lookup[i][j] = lookup[i - 1][j - 1] + 1
            # otherwise, if the current character of `X` and `Y` don't match
            else:
                lookup[i][j] = min(lookup[i - 1][j] + 1, lookup[i][j - 1] + 1)

if __name__ == '__main__':

    X = 'ABCBDAB'
    Y = 'BDCABA'

    m = len(X)
    n = len(Y)

    # lookup table stores solution to already computed subproblems
    # lookup[i][j] stores the length of SCS of substring `X[0…i-1]` and `Y[0…j-1]`
    lookup = [[0 for x in range(n + 1)] for y in range(m + 1)]

    # fill the lookup table in a bottom-up manner
    SCSLength(X, Y, m, n, lookup)

    # find the shortest common supersequence by reading the lookup
    # table in a top-down manner
    print(f'The shortest common supersequence of {X} and {Y} is',
        SCS(X, Y, m, n, lookup))
```

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` is the length of the first string and `n` is the length of the second string.

## 2\. Finding All Shortest Common Supersequence

The shortest common supersequence for two strings is not unique, and the above code doesn’t generate all SCS of the given sequences. It will always print one SCS. The problem with the above code is when the last characters of `X` and `Y` are different, it either goes up or left in the lookup table depending upon which side has a smaller value.

### How can we modify the code, so it prints all possible SCS?

The idea remains the same except if the top cell is equal to the left cell, consider both top and left directions; otherwise, go in the direction of smaller value.

In other words, if the last characters of `X` and `Y` are not the same, then SCS can be constructed from either the top side or from the left side of the lookup table, depending upon which side has a smaller value. If both the values are equal, then SCS can be constructed from both directions in the lookup table. So, we go in the direction of a smaller value or go in both directions if the values are equal.

Following is the C++, Java, and Python implementation based on the above idea:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <set>
#include <iterator>
using namespace std;

// Function to return all SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
vector<string> SCS(string X, string Y, int m, int n, auto &lookup)
{
    // if the end of the first string is reached, create a vector
    // containing the second substring and return
    if (m == 0)    {
        return {Y.substr(0, n)};
    }

    // if the end of the second string is reached, create a vector
    // containing the first substring and return
    else if (n == 0)    {
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

    // if the top cell of a current cell has less value than the left cell,
    // then append the current character of string `X` to all SCS of
    // substring `X[0…m-2]`, `Y[0…n-1]`

    if (lookup[m - 1][n] < lookup[m][n - 1])
    {
        vector<string> scs = SCS(X, Y, m - 1, n, lookup);

        for (string &str: scs) {        // don't remove `&`
            str.push_back(X[m - 1]);
        }

        return scs;
    }

    // if the left cell of a current cell has less value than the top cell,
    // then append the current character of string `Y` to all SCS of
    // substring `X[0…m-1]`, `Y[0…n-2]`

    if (lookup[m][n - 1] < lookup[m - 1][n])
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

// Function to fill the lookup table by finding the length of SCS of
// sequences `X[0…m-1]` and `Y[0…n-1]`
int SCSLength(string X, string Y, int m, int n, auto &lookup)
{
    // initialize the first column of the lookup table
    for (int i = 0; i <= m; i++) {
        lookup[i][0] = i;
    }

    // initialize the first row of the lookup table
    for (int j = 0; j <= n; j++) {
        lookup[0][j] = j;
    }

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
                lookup[i][j] = min(lookup[i - 1][j] + 1, lookup[i][j - 1] + 1);
            }
        }
    }
}

// Function to find all shortest common supersequence of string `X` and `Y`
set<string> SCS(string X, string Y)
{
    int m = X.length(), n = Y.length();

    // lookup table stores solution to already computed subproblems;
    // i.e., lookup[i][j] stores the length of SCS of substring
    // `X[0…i-1]` and `Y[0…j-1]`
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // fill lookup table
    SCSLength(X, Y, m, n, lookup);

    // find all shortest common supersequence
    vector<string> v = SCS(X, Y, m, n, lookup);

    // since a vector can contain duplicates, "copy" the vector to set
    set<string> scs(v.begin(), v.end());

    // to "convert" a vector to use a set
    /* set<string> scs(make_move_iterator(v.begin()),
                    make_move_iterator(v.end())); */

    // return set containing all SCS
    return scs;
}

int main()
{
    string X = "ABCBDAB", Y = "BDCABA";

    // find all shortest common supersequence of string `X` and `Y`
    set<string> scs = SCS(X, Y);

    cout << "The shortest common supersequence of " << X <<
            " and " << Y << " are -" << "\n\n";

    // print all SCS present in the set
    for (string str: scs) {
        cout << str << endl;
    }

    return 0;
}
```

**Output:** The shortest common supersequence of ABCBDAB and BDCABA are: ABCBDCABA ABDCABDAB ABDCBDABA

##

```java
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class Main
{
    // Function to return all SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
    public static Set<String> SCS(String X, String Y, int m, int n, int[][] lookup)
    {
        // if the end of the first string is reached, create a list
        // containing the second substring and return
        if (m == 0) {
            return Stream.of(Y.substring(0, n)).collect(Collectors.toSet());
        }

        // if the end of the second string is reached, create a list
        // containing the first substring and return
        else if (n == 0) {
            return Stream.of(X.substring(0, m)).collect(Collectors.toSet());
        }

        // if the last character of `X` and `Y` is the same, it should occur
        // only one time in SSC
        if (X.charAt(m - 1) == Y.charAt(n - 1))
        {
            // find all SCS of substring `X[0…m-2]` and `Y[0…n-2]`
            Set<String> scs = SCS(X, Y, m - 1, n - 1, lookup);

            // append the current character `X[m-1]` or `Y[n-1]` to all SCS of
            // substring `X[0…m-2]` and `Y[0…n-2]`

            return scs.stream()
                    .map(str -> str + X.charAt(m-1))
                    .collect(Collectors.toSet());
        }

        // we reach here when the last character of `X` and `Y` don't match

        // if the top cell of a current cell has less value than the left cell,
        // then append the current character of string `X` to all SCS of
        // substring `X[0…m-2]`, `Y[0…n-1]`

        if (lookup[m - 1][n] < lookup[m][n - 1])
        {
            Set<String> scs = SCS(X, Y, m - 1, n, lookup);

            return scs.stream()
                    .map(str -> str + X.charAt(m-1))
                    .collect(Collectors.toSet());
        }

        // if the left cell of a current cell has less value than the top cell,
        // then append the current character of string `Y` to all SCS of
        // substring `X[0…m-1]`, `Y[0…n-2]`

        if (lookup[m][n - 1] < lookup[m - 1][n])
        {
            Set<String> scs = SCS(X, Y, m, n - 1, lookup);

            return scs.stream()
                    .map(str -> str + Y.charAt(n - 1))
                    .collect(Collectors.toSet());
        }

        Set<String> result = new HashSet<>();

        // if the top cell value is the same as the left cell, then go in both
        // top and left directions

        // append the current character of string `X` to all SCS of
        // substring `X[0…m-2]`, `Y[0…n-1]`
        Set<String> top = SCS(X, Y, m - 1, n, lookup);
        for (String str: top) {
            result.add(str + X.charAt(m-1));
        }

        // append the current character of string `Y` to all SCS of
        // substring `X[0…m-1]`, `Y[0…n-2]`
        Set<String> left = SCS(X, Y, m, n - 1, lookup);
        for (String str: left) {
            result.add(str + Y.charAt(n - 1));
        }

        return result;
    }

    // Function to fill the lookup table by finding the length of SCS of
    // sequences `X[0…m-1]` and `Y[0…n-1]`
    public static void SCSLength(String X, String Y, int m, int n, int[][] lookup)
    {
        // initialize the first column of the lookup table
        for (int i = 0; i <= m; i++) {
            lookup[i][0] = i;
        }

        // initialize the first row of the lookup table
        for (int j = 0; j <= n; j++) {
            lookup[0][j] = j;
        }

        // fill the lookup table in a bottom-up manner
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                // if the current character of `X` and `Y` matches
                if (X.charAt(i-1) == Y.charAt(j-1)) {
                    lookup[i][j] = lookup[i - 1][j - 1] + 1;
                }
                // otherwise, if the current character of `X` and `Y` don't match
                else {
                    lookup[i][j] = Integer.min(lookup[i - 1][j] + 1,
                            lookup[i][j - 1] + 1);
                }
            }
        }
    }

    // Function to find all shortest common supersequence of string `X` and `Y`
    public static Set<String> SCS(String X, String Y)
    {
        int m = X.length(), n = Y.length();

        // lookup[i][j] stores the length of SCS of substring `X[0…i-1]` and `Y[0…j-1]`
        int[][] lookup = new int[X.length() + 1][Y.length() + 1];

        // fill lookup table
        SCSLength(X, Y, m, n, lookup);

        // find all shortest common supersequence
        return SCS(X, Y, m, n, lookup);
    }

    public static void main(String[] args)
    {
        String X = "ABCBDAB", Y = "BDCABA";

        // find all shortest common supersequence of string `X` and `Y`
        Set<String> scs = SCS(X, Y);

        // print all SCS present in the set
        System.out.println("The shortest common supersequence of " + X +
                " and " + Y + " are: " + scs);
    }
}
```

##

```python3
# Function to return all SCS of substrings `X[0…m-1]`, `Y[0…n-1]`
def SCS(X, Y, m, n, lookup):

    # if the end of the first string is reached, create a list
    # containing the second substring and return
    if m == 0:
        return {Y[:n]}

    # if the end of the second string is reached, create a list
    # containing the first substring and return
    elif n == 0:
        return {X[:m]}

    # if the last character of `X` and `Y` is the same, it should occur
    # only one time in SSC
    if X[m - 1] == Y[n - 1]:

        # find all SCS of substring `X[0…m-2]` and `Y[0…n-2]`
        # and append the current character `X[m-1]` or `Y[n-1]` to all SCS of
        # substring `X[0…m-2]` and `Y[0…n-2]`

        scs = SCS(X, Y, m - 1, n - 1, lookup)
        return {s + X[m - 1] for s in scs}

    # we reach here when the last character of `X` and `Y` don't match

    # if a top cell of the current cell has less value than the left cell,
    # then append the current character of string `X` to all SCS of
    # substring `X[0…m-2]`, `Y[0…n-1]`

    if lookup[m - 1][n] < lookup[m][n - 1]:
        scs = SCS(X, Y, m - 1, n, lookup)
        return {s + X[m - 1] for s in scs}

    # if a left cell of the current cell has less value than the top cell,
    # then append the current character of string `Y` to all SCS of
    # substring `X[0…m-1]`, `Y[0…n-2]`

    if lookup[m][n - 1] < lookup[m - 1][n]:
        scs = SCS(X, Y, m, n - 1, lookup)
        return {s + Y[n - 1] for s in scs}

    # if the top cell value is the same as the left cell, then go in both
    # top and left directions

    # append the current character of string `X` to all SCS of
    # substring `X[0…m-2]`, `Y[0…n-1]`
    top = SCS(X, Y, m - 1, n, lookup)

    # append the current character of string `Y` to all SCS of
    # substring `X[0…m-1]`, `Y[0…n-2]`
    left = SCS(X, Y, m, n - 1, lookup)

    return set([s + X[m - 1] for s in top] + [s + Y[n - 1] for s in left])

# Function to fill the lookup table by finding the length of SCS of
# sequences `X[0…m-1]` and `Y[0…n-1]`
def SCSLength(X, Y, m, n, lookup):

    # initialize the first column of the lookup table
    for i in range(m + 1):
        lookup[i][0] = i

    # initialize the first row of the lookup table
    for j in range(n + 1):
        lookup[0][j] = j

    # fill the lookup table in a bottom-up manner
    for i in range(1, m + 1):

        for j in range(1, n + 1):
            # if the current character of `X` and `Y` matches
            if X[i - 1] == Y[j - 1]:
                lookup[i][j] = lookup[i - 1][j - 1] + 1
            # otherwise, if the current character of `X` and `Y` don't match
            else:
                lookup[i][j] = min(lookup[i - 1][j] + 1, lookup[i][j - 1] + 1)

# Function to find all shortest common supersequence of string `X` and `Y`
def findAllSCS(X, Y):

    m = len(X)
    n = len(Y)

    # lookup[i][j] stores the length of SCS of substring `X[0…i-1]` and `Y[0…j-1]`
    lookup = [[0 for x in range(n + 1)] for y in range(m + 1)]

    # fill lookup table
    SCSLength(X, Y, m, n, lookup)

    # find and return all shortest common supersequence
    return SCS(X, Y, m, n, lookup)

if __name__ == '__main__':

    X = 'ABCBDAB'
    Y = 'BDCABA'

    # find all shortest common supersequence of string `X` and `Y`
    scs = findAllSCS(X, Y)

    # print all SCS present in the set
    print(f'The shortest common supersequence of {X} and {Y} are:', scs)
```
