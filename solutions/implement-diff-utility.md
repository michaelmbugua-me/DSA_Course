# Implement Diff Utility

> Source: https://www.techiedelight.com/implement-diff-utility/

Implement your [diff utility](https://techiedelight.com/tools/difftool), i.e., given two similar strings, efficiently list out all differences between them.

The diff utility is a data comparison tool that calculates and displays the differences between the two texts. It tries to determine the smallest set of deletions and insertions and create one text from the other. Diff is line-oriented rather than character-oriented, unlike [edit distance](https://techiedelight.com/levenshtein-distance-edit-distance-problem/).

For example,

**Input:** string X = XMJYAUZ string Y = XMJAATZ **Output:** X M J -Y A -U +A +T Z (- indicates that character is deleted from Y but it was present in X) (+ indicates that character is inserted in Y but it was not present in X)

We can use the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) to solve this problem. The idea is to find the longest sequence of characters present in both original sequences in the same order. From the longest common subsequence, it is only a small step to get the diff-like output:

  * If a character is absent in the subsequence but present in the first original sequence, it must have been deleted (indicated by the `-` marks).
  * If it is absent in the subsequence but present in the second original sequence, it must have been inserted (indicated by the `+` marks).

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Function to display the differences between two strings
void diff(string X, string Y, int m, int n, auto &lookup)
{
    // if the last character of `X` and `Y` matches
    if (m > 0 && n > 0 && X[m - 1] == Y[n - 1])
    {
        diff(X, Y, m - 1, n - 1, lookup);
        cout << " " << X[m - 1];
    }

    // if the current character of `Y` is not present in `X`
    else if (n > 0 && (m == 0 || lookup[m][n - 1] >= lookup[m - 1][n]))
    {
        diff(X, Y, m, n - 1, lookup);
        cout << " +" << Y[n - 1];
    }

    // if the current character of `X` is not present in `Y`
    else if (m > 0 && (n == 0 || lookup[m][n - 1] < lookup[m - 1][n]))
    {
        diff(X, Y, m - 1, n, lookup);
        cout << " -" << X[m - 1];
    }
}

// Function to fill the lookup table by finding the length of LCS of substring
vector<vector<int>> findLCS(string X, string Y, int m, int n)
{
    // lookup[i][j] stores the length of LCS of substring X[0…i-1] and Y[0…j-1]
    vector<vector<int>> lookup(m + 1, vector<int>(n + 1));

    // first column of the lookup table will be all 0
    for (int i = 0; i <= m; i++) {
        lookup[i][0] = 0;
    }

    // first row of the lookup table will be all 0
    for (int j = 0; j <= n; j++) {
        lookup[0][j] = 0;
    }

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

    return lookup;
}

// Implement diff utility in C++
int main()
{
    string X = "ABCDFGHJQZ";
    string Y = "ABCDEFGIJKRXYZ";

    int m = X.length(), n = Y.length();

    // fill lookup table
    vector<vector<int>> lookup = findLCS(X, Y, m, n);

    // find difference by reading the lookup table in a top-down manner
    diff(X, Y, m, n, lookup);

    return 0;
}
```

**Output:** A B C D +E F G -H +I J -Q +K +R +X +Y Z

##

```java
class Main
{
    // Function to display the differences between two strings
    public static void diff(String X, String Y, int m, int n, int[][] lookup)
    {
        // if the last character of `X` and `Y` matches
        if (m > 0 && n > 0 && X.charAt(m - 1) == Y.charAt(n - 1))
        {
            diff(X, Y, m - 1, n - 1, lookup);
            System.out.print(" " + X.charAt(m - 1));
        }

        // if the current character of `Y` is not present in `X`
        else if (n > 0 && (m == 0 || lookup[m][n - 1] >= lookup[m - 1][n]))
        {
            diff(X, Y, m, n - 1, lookup);
            System.out.print(" +" + Y.charAt(n - 1));
        }

        // if the current character of `X` is not present in `Y`
        else if (m > 0 && (n == 0 || lookup[m][n - 1] < lookup[m - 1][n]))
        {
            diff(X, Y, m - 1, n, lookup);
            System.out.print(" -" + X.charAt(m - 1));
        }
    }

    // Function to fill the lookup table by finding the length of LCS
    // of substring X[0…m-1] and Y[0…n-1]
    public static int[][] findLCS(String X, String Y, int m, int n)
    {
        // lookup[i][j] stores the length of LCS of substring X[0…i-1] and Y[0…j-1]
        int[][] lookup = new int[X.length() + 1][Y.length() + 1];

        // first column of the lookup table will be all 0
        for (int i = 0; i <= m; i++) {
            lookup[i][0] = 0;
        }

        // first row of the lookup table will be all 0
        for (int j = 0; j <= n; j++) {
            lookup[0][j] = 0;
        }

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

        return lookup;
    }

    // Implement diff utility in Java
    public static void main(String[] args)
    {
        String X = "ABCDFGHJQZ";
        String Y = "ABCDEFGIJKRXYZ";

        // lookup[i][j] stores the length of LCS of substring X[0…i-1] and Y[0…j-1]
        int[][] lookup = findLCS(X, Y, X.length(), Y.length());

        // find the difference
        diff(X, Y, X.length(), Y.length(), lookup);
    }
}
```

##

```python3
# Function to display the differences between two strings
def diff(X, Y, m, n, lookup):

    # if the last character of `X` and `Y` matches
    if m > 0 and n > 0 and X[m - 1] == Y[n - 1]:
        diff(X, Y, m - 1, n - 1, lookup)
        print('', X[m - 1], end='')

    # if the current character of `Y` is not present in `X`
    elif n > 0 and (m == 0 or lookup[m][n - 1] >= lookup[m - 1][n]):
        diff(X, Y, m, n - 1, lookup)
        print(' +' + Y[n - 1], end='')

    # if the current character of `X` is not present in `Y`
    elif m > 0 and (n == 0 or lookup[m][n - 1] < lookup[m - 1][n]):
        diff(X, Y, m - 1, n, lookup)
        print(' -' + X[m - 1], end='')

# Function to fill the lookup table by finding the length of LCS
# of substring X[0…m-1] and Y[0…n-1]
def findLCS(X, Y, m, n):

    # lookup[i][j] stores the length of LCS of substring X[0…i-1] and Y[0…j-1]
    lookup = [[0 for x in range(len(Y) + 1)] for y in range(len(X) + 1)]

    # first column of the lookup table will be all 0
    for i in range(m + 1):
        lookup[i][0] = 0

    # first row of the lookup table will be all 0
    for j in range(n + 1):
        lookup[0][j] = 0

    # fill the lookup table in a bottom-up manner
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # if current character of `X` and `Y` matches
            if X[i - 1] == Y[j - 1]:
                lookup[i][j] = lookup[i - 1][j - 1] + 1
                # otherwise, if the current character of `X` and `Y` don't match
            else:
                lookup[i][j] = max(lookup[i - 1][j], lookup[i][j - 1])

    return lookup

# Implement diff utility in Python
if __name__ == '__main__':

    X = 'ABCDFGHJQZ'
    Y = 'ABCDEFGIJKRXYZ'

    # lookup[i][j] stores the length of LCS of substring X[0…i-1] and Y[0…j-1]
    lookup = findLCS(X, Y, len(X), len(Y))

    # find the difference
    diff(X, Y, len(X), len(Y), lookup)
```

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` is the length of the first string and `n` is the length of the second string.

**Exercise:** Modify above solution to find differences by reading the lookup table in a [bottom-up manner](https://techiedelight.com/introduction-dynamic-programming/#bottom-up).

**References:** <https://en.wikipedia.org/wiki/Diff_utility>

Also See:

> [Longest Common Subsequence | Finding all LCS](https://www.techiedelight.com/longest-common-subsequence-finding-lcs/ "Longest Common Subsequence | Finding all LCS")

> [Longest Common Subsequence Problem](https://www.techiedelight.com/longest-common-subsequence/ "Longest Common Subsequence Problem")

> [Longest Palindromic Subsequence using Dynamic Programming](https://www.techiedelight.com/longest-palindromic-subsequence-using-dynamic-programming/ "Longest Palindromic Subsequence using Dynamic Programming")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 192

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Top-down](https://www.techiedelight.com/Tags/Memoization/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
