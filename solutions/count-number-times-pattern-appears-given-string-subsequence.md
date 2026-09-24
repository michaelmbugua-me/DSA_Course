# Count the number of times a pattern appears in a given string as a subsequence

> Source: https://www.techiedelight.com/count-number-times-pattern-appears-given-string-subsequence/

Given a string, count the number of times a given pattern appears in it as a subsequence.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example,

**Input:** string = “subsequence” pattern = “sue” **Output:** 7 subsequence subsequence subsequence subsequence subsequence subsequence subsequence

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. If we compare the last character of the string `X[0…m]` with the last character of pattern `Y[0…n]`, there are two possibilities:

  1. If the string’s last character is the same as the last character of the pattern, recur for the remaining substring `X[0…m-1] and Y[0…n-1]`. Since we want all possible combinations, also consider the case when the string’s current character does not form part of the solution, i.e., ignore the last character of the string and recur for the remaining substring `X[0…m-1]`.
  2. If the last character of the string is different from the last character of the pattern, ignore the last character of the string and recur for the remaining substring `X[0…m-1]`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Function to count the number of times pattern `Y[0…n)`
// appears in a given string `X[0…m)` as a subsequence
int count(string X, string Y, int m, int n)
{
    // Base case 1: if only one character is left
    if (m == 1 && n == 1) {
        return (X[0] == Y[0]);
    }

    // Base case 2: if the input string `X` reaches its end
    if (m == 0) {
        return 0;
    }

    // Base case 3: if pattern `Y` reaches its end, we have found subsequence
    if (n == 0) {
        return 1;
    }

    // Optimization: the solution is not possible if the number of characters
    // in the string is less than the number of characters in the pattern
    if (n > m) {
        return 0;
    }

    /*
      If the last character of both string and pattern matches,
        1. Exclude the last character from both string and pattern
        2. Exclude only the last character from the string.

      Otherwise, if the last character of the string and pattern do not match,
      recur by excluding only the last character in the string
    */

    return ((X[m - 1] == Y[n - 1]) ? count(X, Y, m - 1, n - 1) : 0) +
        count(X, Y, m - 1, n);
}

int main()
{
    string X = "subsequence";   // input string
    string Y = "sue";           // pattern

    cout << count(X, Y, X.size(), Y.size());

    return 0;
}
```

**Output:** 7

##

```java
class Main
{
    // Function to count the number of times pattern `Y[0…n)`
    // appears in a given string `X[0…m)` as a subsequence
    public static int count(String X, String Y, int m, int n)
    {
        // Base case 1: if only one character is left
        if (m == 1 && n == 1) {
            return (X.charAt(0) == Y.charAt(0)) ? 1: 0;
        }

        // Base case 2: if the input string `X` reaches its end
        if (m == 0) {
            return 0;
        }

        // Base case 3: if pattern `Y` reaches its end, we have found
        // subsequence
        if (n == 0) {
            return 1;
        }

        // Optimization: the solution is not possible if the number of characters
        // in the string is less than the number of characters in the pattern
        if (n > m) {
            return 0;
        }

        /*
          If the last character of both string and pattern matches,
            1. Exclude the last character from both string and pattern
            2. Exclude only the last character from the string.

          Otherwise, if the last character of the string and pattern do not match,
          recur by excluding only the last character in the string
        */

        return ((X.charAt(m - 1) == Y.charAt(n - 1)) ? count(X, Y, m - 1, n - 1) : 0)
                + count(X, Y, m - 1, n);
    }

    public static void main(String[] args)
    {
        String X = "subsequence";   // input string
        String Y = "sue";           // pattern

        System.out.print(count(X, Y, X.length(), Y.length()));
    }
}
```

##

```python3
# Function to count the number of times pattern `Y[0…n)`
# appears in a given string `X[0…m)` as a subsequence
def count(X, Y, m, n):

    # Base case 1: if only one character is left
    if m == 1 and n == 1:
        return 1 if (X[0] == Y[0]) else 0

    # Base case 2: if the input string `X` reaches its end
    if m == 0:
        return 0

    # Base case 3: if pattern `Y` reaches its end, we have found subsequence
    if n == 0:
        return 1

    # Optimization: the solution is not possible if the number of characters
    # in the string is less than the number of characters in the pattern
    if n > m:
        return 0

    '''
      If the last character of both string and pattern matches,
        1. Exclude the last character from both string and pattern
        2. Exclude only the last character from the string.

      Otherwise, if the last character of the string and pattern do not match,
      recur by excluding only the last character in the string
    '''

    return (count(X, Y, m - 1, n - 1) if X[m - 1] == Y[n - 1] else 0)\
        + count(X, Y, m - 1, n)

if __name__ == '__main__':

    X = 'subsequence'   # Input string
    Y = 'sue'           # Pattern

    print(count(X, Y, len(X), len(Y)))
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The idea is to use dynamic programming to solve this problem. The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the recursion tree of the solution, we can see that the same subproblems are getting computed repeatedly.

We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, in which subproblem solutions are memoized rather than computed repeatedly. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values. We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them.

The algorithm can be implemented as follows in C++, Java, and Python, where `T[][]` is filled in a bottom-up fashion.

```cpp
#include <iostream>
using namespace std;

// Function to count the number of times pattern `Y[0…n)`
// appears in a given string `X[0…m)` as a subsequence
int count(string X, string Y)
{
    int m = X.size();
    int n = Y.size();

    // `T[i][j]` stores number of times pattern `Y[0…j)`
    // appears in a given string `X[0…i)` as a subsequence
    int T[m + 1][n + 1];

    // if pattern `Y` is empty, we have found subsequence
    for (int i = 0; i <= m; i++) {
        T[i][0] = 1;
    }

    // if the input string `X` is empty
    for (int j = 1; j <= n; j++) {
        T[0][j] = 0;
    }

    /*
      If the current character of both string and pattern matches,
        1. Exclude current character from both string and pattern
        2. Exclude only the current character from the string

      Otherwise, if the current character of the string and pattern do not match,
      exclude the current character from the string
    */

    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++) {
            T[i][j] = ((X[i - 1] == Y[j - 1]) ? T[i - 1][j - 1] : 0) + T[i - 1][j];
        }
    }

    // return last entry in the lookup table
    return T[m][n];
}

int main()
{
    string X = "subsequence";   // input string
    string Y = "sue";           // pattern

    cout << count(X, Y) << endl;

    return 0;
}
```

**Output:** 7

##

```java
class Main
{
    // Function to count the number of times pattern `Y[0…n)`
    // appears in a given string `X[0…m)` as a subsequence
    public static int count(String X, String Y)
    {
        int m = X.length();
        int n = Y.length();

        // `T[i][j]` stores number of times pattern `Y[0…j)`
        // appears in a given string `X[0…i)` as a subsequence
        int[][] T = new int[m + 1][n + 1];

        // if pattern `Y` is empty, we have found subsequence
        for (int i = 0; i <= m; i++) {
            T[i][0] = 1;
        }

        /*
          If the current character of both string and pattern matches,
            1. Exclude current character from both string and pattern
            2. Exclude only the current character from the string

          Otherwise, if the current character of the string and pattern do not match,
          exclude the current character from the string
        */

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                T[i][j] = ((X.charAt(i - 1) == Y.charAt(j - 1)) ? T[i - 1][j - 1] : 0)
                            + T[i - 1][j];
            }
        }

        // return last entry in the lookup table
        return T[m][n];
    }

    public static void main(String[] args)
    {
        String X = "subsequence";   // input string
        String Y = "sue";           // pattern

        System.out.print(count(X, Y));
    }
}
```

##

```python3
# Function to count the number of times pattern `Y[0…n)`
# appears in a given string `X[0…m)` as a subsequence
def count(X, Y):

    (m, n) = (len(X), len(Y))

    # `T[i][j]` stores number of times pattern `Y[0…j)`
    # appears in a given string `X[0…i)` as a subsequence
    T = [[0 for x in range(n + 1)] for y in range(m + 1)]

    # if pattern `Y` is empty, we have found subsequence
    for i in range(m + 1):
        T[i][0] = 1

    '''
      If the current character of both string and pattern matches,
        1. Exclude current character from both string and pattern
        2. Exclude only the current character from the string

      Otherwise, if the current character of the string and pattern do not match,
      exclude the current character from the string
    '''

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            T[i][j] = (T[i - 1][j - 1] if (X[i - 1] == Y[j - 1]) else 0) + T[i - 1][j]

    # return last entry in the lookup table
    return T[m][n]

if __name__ == '__main__':

    X = 'subsequence'   # Input string
    Y = 'sue'           # Pattern

    print(count(X, Y))
```

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` is the length of the first string and `n` is the length of the second string.
