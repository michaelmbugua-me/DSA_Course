# Check if a string is k–palindrome or not

> Source: https://www.techiedelight.com/check-given-string-k-palindrome-not/

Write an efficient algorithm to check if a given string is k–palindrome or not. A string is k–palindrome if it becomes a palindrome on removing at most `k` characters from it.

For example,

**Input:** ABCDBA, k = 1 **Output:** k–palindrome **Explanation:** The string becomes a palindrome by removing either C or D from it. **Input:** ABCDECA, k = 1 **Output:** Not a k–palindrome **Explanation:** The string needs at least 2–removals from it to become a palindrome.

> 

By carefully analyzing the problem, we can see that it is a variation of the classic [Edit Distance Problem](https://techiedelight.com/levenshtein-distance-edit-distance-problem/), where we need to convert the given string to its reverse by removing at most `k` characters from it (i.e., only delete operation is allowed).

Please note that we need to perform at most `n` deletions from the original string and `n` deletions from the reverse string to make the original string and its reverse equal. Therefore, the expression `2×n <= 2×k` is satisfied if the string is k–palindrome.

This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to check if the given string is k–palindrome or not
int isKPalindrome(string X, int m, string Y, int n)
{
    // if either string is empty, remove all characters from the other string
    if (m == 0 || n == 0) {
        return n + m;
    }

    // ignore the last characters of both strings if they are the same
    // and recur for the remaining characters
    if (X[m - 1] == Y[n - 1]) {
        return isKPalindrome(X, m - 1, Y, n - 1);
    }

    // if the last character of both strings is different

    // remove the last character from the first string and recur
    int x = isKPalindrome(X, m - 1, Y, n);

    // remove the last character from the second string and recur
    int y = isKPalindrome(X, m, Y, n - 1);

    // return one more than the minimum of the above two operations
    return 1 + min(x, y);
}

int main()
{
    string s = "CABCBC";
    int k = 2;

    // get reverse of s
    string rev = s;
    reverse(rev.begin(), rev.end());

    if (isKPalindrome(s, s.length(), rev, s.length()) <= 2*k) {
        cout << "The string is k–palindrome";
    }
    else {
        cout << "The string is not a k–palindrome";
    }

    return 0;
}
```

**Output:** The string is k–palindrome

##

```java
class Main
{
    // Function to check if the given string is k–palindrome or not
    public static int isKPalindrome(String X, int m, String Y, int n)
    {
        // if either string is empty, remove all characters from the other string
        if (m == 0 || n == 0) {
            return n + m;
        }

        // ignore the last characters of both strings if they are the same
        // and recur for the remaining characters
        if (X.charAt(m - 1) == Y.charAt(n - 1)) {
            return isKPalindrome(X, m - 1, Y, n - 1);
        }

        // if the last character of both strings is different

        // remove the last character from the first string and recur
        int x = isKPalindrome(X, m - 1, Y, n);

        // remove the last character from the second string and recur
        int y = isKPalindrome(X, m, Y, n - 1);

        // return one more than the minimum of the above two operations
        return 1 + Integer.min(x, y);
    }

    public static void main(String[] args)
    {
        String s = "CABCBC";
        int k = 2;

        // get reverse of s
        String rev = new StringBuilder(s).reverse().toString();

        if (isKPalindrome(s, s.length(), rev, s.length()) <= 2*k) {
            System.out.println("The string is k–palindrome");
        }
        else {
            System.out.println("The string is not a k–palindrome");
        }
    }
}
```

##

```python3
# Function to check if the given string is k–palindrome or not
def isKPalindrome(X, m, Y, n):

    # if either string is empty, remove all characters from the other string
    if m == 0 or n == 0:
        return n + m

    # ignore the last characters of both strings if they are the same
    # and recur for the remaining characters
    if X[m - 1] == Y[n - 1]:
        return isKPalindrome(X, m - 1, Y, n - 1)

    # if the last character of both strings is different

    # remove the last character from the first string and recur
    x = isKPalindrome(X, m - 1, Y, n)

    # remove the last character from the second string and recur
    y = isKPalindrome(X, m, Y, n - 1)

    # return one more than the minimum of the above two operations
    return 1 + min(x, y)

if __name__ == '__main__':

    s = 'CABCBC'
    k = 2

    # get reverse of s
    rev = s[::-1]

    if isKPalindrome(s, len(s), rev, len(s)) <= 2*k:
        print('k-palindrome')
    else:
        print('Not a k–palindrome')
```

The worst-case time complexity of the above solution is O(2n), where `n` is the length of the input string. The worst case happens when the string contains all different characters. It also requires additional space for the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). Since both dynamic programming properties are satisfied, we can save subproblem solutions in memory rather than computing them repeatedly. The dynamic programming is demonstrated below in C++, Java, and Python, which runs in O(n2) time:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to check if the given string is k–palindrome or not
bool isKPalindrome(string X, int k)
{
    // 'Y' is a reverse of 'X'
    string Y = X;
    reverse(Y.begin(), Y.end());

    int m = X.length();
    int n = m;

    // lookup table to store solution of already computed subproblems
    int T[m + 1][n + 1];

    // fill the lookup table `T[][]` in a bottom-up manner
    for (int i = 0; i <= m; i++)
    {
        for (int j = 0; j <= n; j++)
        {
            // if either string is empty, remove all characters from the
            // other string
            if (i == 0 || j == 0) {
                T[i][j] = i + j;
            }

            // ignore the last characters of both strings if they are the same
            // and process the remaining characters
            else if (X[i - 1] == Y[j - 1]) {
                T[i][j] = T[i - 1][j - 1];
            }

            // if the last character of both strings is different, consider
            // minimum by removing the last character from 'X' and 'Y'
            else {
                T[i][j] = 1 + min(T[i - 1][j], T[i][j - 1]);
            }
        }
    }

    return T[m][n] <= 2*k;
}

int main()
{
    string s = "CABCBC";
    int k = 2;

    if (isKPalindrome(s, k)) {
        cout << "The string is k–palindrome";
    }
    else {
        cout << "The string is not a k–palindrome";
    }

    return 0;
}
```

**Output:** The string is k–palindrome

##

```java
class Main
{
    // Function to check if the given string is k–palindrome or not
    public static boolean isKPalindrome(String X, int k)
    {
        // 'Y' is a reverse of 'X'
        String Y = new StringBuilder(X).reverse().toString();

        int n = X.length();

        // lookup table to store solution of already computed subproblems
        int[][] T = new int[n + 1][n + 1];

        // fill the lookup table `T[][]` in a bottom-up manner
        for (int i = 0; i <= n; i++)
        {
            for (int j = 0; j <= n; j++)
            {
                // if either string is empty, remove all characters from the
                // other string
                if (i == 0 || j == 0) {
                    T[i][j] = i + j;
                }

                // ignore the last characters of both strings if they are the same
                // and process the remaining characters
                else if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                    T[i][j] = T[i - 1][j - 1];
                }

                // if the last character of both strings is different, consider
                // minimum by removing the last character from 'X' and 'Y'
                else {
                    T[i][j] = 1 + Integer.min(T[i - 1][j], T[i][j - 1]);
                }
            }
        }

        return T[n][n] <= 2*k;
    }

    public static void main(String[] args)
    {
        String s = "CABCBC";
        int k = 2;

        if (isKPalindrome(s, k)) {
            System.out.println("The string is k–palindrome");
        }
        else {
            System.out.println("The string is not a k–palindrome");
        }
    }
}
```

##

```python3
# Function to check if the given string is k–palindrome or not
def isKPalindrome(X, K):

    # 'Y' is a reverse of 'X'
    Y = X[::-1]

    n = len(X)

    # lookup table to store solution of already computed subproblems
    T = [[0 for x in range(n + 1)] for y in range((n + 1))]

    # fill the lookup table `T[][]` in a bottom-up manner
    for i in range(n + 1):
        for j in range(n + 1):
            # if either string is empty, remove all characters from the
            # other string
            if i == 0 or j == 0:
                T[i][j] = i + j

            # ignore the last characters of both strings if they are the same
            # and process the remaining characters
            elif X[i - 1] == Y[j - 1]:
                T[i][j] = T[i - 1][j - 1]

            # if the last character of both strings is different, consider
            # minimum by removing the last character from 'X' and 'Y'
            else:
                T[i][j] = 1 + min(T[i - 1][j], T[i][j - 1])

    return T[n][n] <= 2*k

if __name__ == '__main__':

    s = 'CABCBC'
    k = 2

    if isKPalindrome(s, k):
        print('The string is k–palindrome')
    else:
        print('The string is not a k–palindrome')
```

We can also solve this problem by finding the [Longest Palindromic Subsequence (LPS)](https://techiedelight.com/longest-palindromic-subsequence-using-dynamic-programming/) of a string. To make a string palindrome, the characters that don’t contribute to the LPS should be removed. Therefore, a string is k–palindrome if the difference between the length of LPS and the original string’s length is less than equal to `k`.

For example, the LPS of string `CABCBC` is `CBCBC`, and on removing `A` from it, the string becomes a palindrome. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to check if the given string is k–palindrome or not
bool isKPalindrome(string X, int k)
{
    // 'Y' is a reverse of 'X'
    string Y = X;
    reverse(Y.begin(), Y.end());

    int m = X.length();
    int n = m;

    // lookup table to store solution of already computed subproblems
    // T[i][j] stores the length of LCS of X[0…i-1] and Y[0…j-1]
    int T[m + 1][n + 1];

    // fill the lookup table in a bottom-up manner
    for (int i = 0; i <= m; i++)
    {
        for (int j = 0; j <= n; j++)
        {
            // special case: first row or first column of the lookup table
            if (i == 0 || j == 0) {
                T[i][j] = 0;
            }

            // if the current character of 'X' and 'Y' matches
            else if (X[i - 1] == Y[j - 1]) {
                T[i][j] = T[i - 1][j - 1] + 1;
            }

            // if the current character of 'X' and 'Y' don't match
            else {
                T[i][j] = max(T[i - 1][j], T[i][j - 1]);
            }
        }
    }

    // T[m][n] contains the length of LCS for 'X' and 'Y'
    // (or longest palindromic subsequence)

    // For the string to be k–palindrome, the difference between the length of
    // longest palindromic subsequence and the string should be <= k
    return (n - T[m][n] <= k);
}

int main()
{
    string s = "CABCBC";
    int k = 2;

    if (isKPalindrome(s, k)) {
        cout << "The string is k–palindrome";
    }
    else {
        cout << "The string is not a k–palindrome";
    }

    return 0;
}
```

**Output:** The string is k–palindrome
