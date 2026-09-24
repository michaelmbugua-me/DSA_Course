# Wildcard Pattern Matching

> Source: https://www.techiedelight.com/wildcard-pattern-matching/

Wildcard Pattern Matching: Given a string and a pattern containing wildcard characters, i.e., `*` and `?`, where `?` can match to any single character in the string and `*` can match to any number of characters including zero characters, design an efficient algorithm to check if the pattern matches with the complete string or not.

For example,

**Input:** string = “xyxzzxy”, pattern = “x***y” **Output:** Match **Input:** string = “xyxzzxy”, pattern = “x***x” **Output:** No Match **Input:** string = “xyxzzxy”, pattern = “x***x?” **Output:** Match **Input:** string = “xyxzzxy”, pattern = “*” **Output:** Match

> 

The idea is to use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. If we carefully analyze the problem, we can see that it can easily be further divided into subproblems. Let’s take the top-bottom approach to solve this problem.

For a given `pattern[0…m]` and `word[0…n]`,

  * If `pattern[m] == '*'`, if `*` matches the current character in the input string, move to the next character in the string; otherwise, ignore `*` and move to the next character in the pattern.
  * If `pattern[m] == '?'`, ignore current characters of both string and pattern and check if `pattern[0…m-1]` matches `word[0…n-1]`.
  * If the current character in the pattern is not a wildcard character, it should match the current character in the input string.

Special care has to be taken to handle base conditions:

  * If both the input string and pattern reach their end, return true.
  * If the only pattern reaches its end, return false.
  * If only the input string reaches its end, return true only if the remaining characters in the pattern are all `*`.

Following is the top-down DP solution in C++, Java, and Python using memoization:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Function that matches an input string with a given wildcard pattern
bool isMatch(string word, string pattern, int n, int m, auto &lookup)
{
    // If both the input string and pattern reach their end,
    // return true
    if (m < 0 && n < 0) {
        return true;
    }

    // If only the pattern reaches its end, return false
    else if (m < 0) {
        return false;
    }

    // If only the input string reaches its end, return true
    // if the remaining characters in the pattern are all '*'
    else if (n < 0)
    {
        for (int i = 0; i <= m; i++)
        {
            if (pattern[i] != '*') {
                return false;
            }
        }

        return true;
    }

    // If the subproblem is encountered for the first time
    if (!lookup[m][n])
    {
        if (pattern[m] == '*')
        {
            // 1. '*' matches with current characters in the input string.
            // Here, we will move to the next character in the string.

            // 2. Ignore '*' and move to the next character in the pattern
            lookup[m][n] = isMatch(word, pattern, n - 1, m, lookup) ||
                        isMatch(word, pattern, n, m - 1, lookup);
        }
        else {
            // If the current character is not a wildcard character, it
            // should match the current character in the input string
            if (pattern[m] != '?' && pattern[m] != word[n]) {
                lookup[m][n] = 0;
            }
            // check if pattern[0…m-1] matches word[0…n-1]
            else {
                lookup[m][n] = isMatch(word, pattern, n - 1, m - 1, lookup);
            }
        }
    }

    return lookup[m][n];
}

// Wildcard Pattern Matching Implementation in C++
int main()
{
    string word = "xyxzzxy";
    string pattern = "x***x?";

    int n = word.length();
    int m = pattern.length();

    // Create a DP lookup table
    vector<vector<bool>> lookup(m + 1, vector<bool>(n + 1, false));

    if (isMatch(word, pattern, n - 1, m - 1, lookup)) {
        cout << "Match";
    }
    else {
        cout << "No Match";
    }

    return 0;
}
```

Output: Match

##

```java
class Main
{
    // Function that matches the input string with a given wildcard pattern
    public static boolean isMatch(char[] chars, char[] pattern, int n, int m,
                                    boolean[][] lookup)
    {
        // If both the input string and pattern reach their end,
        // return true
        if (m < 0 && n < 0) {
            return true;
        }

        // If only the pattern reaches its end, return false
        else if (m < 0) {
            return false;
        }

        // If only the input string reaches its end, return true
        // if the remaining characters in the pattern are all '*'
        else if (n < 0)
        {
            for (int i = 0; i <= m; i++)
            {
                if (pattern[i] != '*') {
                    return false;
                }
            }

            return true;
        }

        // If the subproblem is encountered for the first time
        if (!lookup[n][m])
        {
            if (pattern[m] == '*')
            {
                // 1. '*' matches with current characters in the input string.
                // Here, we will move to the next character in the string.

                // 2. Ignore '*' and move to the next character in the pattern
                lookup[n][m] = isMatch(chars, pattern, n - 1, m, lookup) ||
                        isMatch(chars, pattern, n, m - 1, lookup);
            }
            else {
                // If the current character is not a wildcard character, it
                // should match the current character in the input string
                if (pattern[m] != '?' && pattern[m] != chars[n]) {
                    lookup[n][m] = false;
                }
                // check if pattern[0…m-1] matches word[0…n-1]
                else {
                    lookup[n][m] = isMatch(chars, pattern, n - 1, m - 1, lookup);
                }
            }
        }

        return lookup[n][m];
    }

    // Wildcard Pattern Matching Implementation in Java
    public static void main(String[] args)
    {
        char[] word = "xyxzzxy".toCharArray();
        char[] pattern = "x***x?".toCharArray();

        // create a DP lookup table
        boolean[][] lookup = new boolean[word.length + 1][pattern.length + 1];

        if (isMatch(word, pattern, word.length - 1, pattern.length - 1, lookup)) {
            System.out.print("Match");
        }
        else {
            System.out.print("No Match");
        }
    }
}
```

##

```python3
# Function that matches the input string with a given wildcard pattern
def isMatch(word, pattern, n, m, lookup):

    # If both the input string and pattern reach their end,
    # return true
    if m < 0 and n < 0:
        return True

    # If only the pattern reaches its end, return false
    elif m < 0:
        return False

    # If only the input string reaches its end, return true
    # if the remaining characters in the pattern are all '*'
    elif n < 0:
        for i in range(m + 1):
            if pattern[i] != '*':
                return False
        return True

    # If the subproblem is encountered for the first time
    if not lookup[n][m]:
        if pattern[m] == '*':
            # 1. '*' matches with current characters in the input string.
            # Here, we will move to the next character in the string.

            # 2. Ignore '*' and move to the next character in the pattern
            lookup[n][m] = isMatch(word, pattern, n - 1, m, lookup) or \
                        isMatch(word, pattern, n, m - 1, lookup)
        else:
            # If the current character is not a wildcard character, it
            # should match the current character in the input string
            if pattern[m] != '?' and pattern[m] != word[n]:
                lookup[n][m] = False
            # check if pattern[0…m-1] matches word[0…n-1]
            else:
                lookup[n][m] = isMatch(word, pattern, n - 1, m - 1, lookup)

    return lookup[n][m]

# Wildcard Pattern Matching Implementation in Python
if __name__ == '__main__':

    word = 'xyxzzxy'
    pattern = 'x***x?'

    # create a DP lookup table
    lookup = [[False for x in range(len(pattern) + 1)] for y in range(len(word) + 1)]

    if isMatch(word, pattern, len(word) - 1, len(pattern) - 1, lookup):
        print('Match')
    else:
        print('No Match')
```

The time complexity of the above top-down solution is O(m.n) and requires O(m.n) extra space, where `n` is the length of the text and `m` is the length of the pattern.

Following is an iterative C++, Java, and Python implementation of the above code:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function that matches the input string with a given wildcard pattern
bool isMatch(string word, string pattern)
{
    // get the length of string and wildcard pattern
    int n = word.length();
    int m = pattern.length();

    // create a DP lookup table
    // all elements are initialized by false by default
    bool T[n+1][m+1];

    // if both pattern and string are empty: match
    T[0][0] = true;

    // handle empty string case (i == 0)
    for (int j = 1; j <= m; j++)
    {
        if (pattern[j-1] == '*') {
            T[0][j] = T[0][j-1];
        }
    }

    // build a matrix in a bottom-up manner
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= m; j++)
        {
            if (pattern[j-1] == '*') {
                T[i][j] = T[i-1][j] || T[i][j-1];
            }
            else if (pattern[j-1] == '?' || word[i-1] == pattern[j-1]) {
                T[i][j] = T[i-1][j-1];
            }
        }
    }

    // last cell stores the answer
    return T[n][m];
}

// Wildcard Pattern Matching Implementation in C
int main()
{
    string word = "xyxzzxy";
    string pattern = "x***x?";

    if (isMatch(word, pattern)) {
        cout << "Match" << endl;
    }
    else {
        cout << "No Match" << endl;
    }

    return 0;
}
```

Output: Match

##

```java
class Main
{
    // Function that matches an input string with a given wildcard pattern
    public static boolean isMatch(String word, String pattern)
    {
        // get length of string and wildcard pattern
        int n = word.length();
        int m = pattern.length();

        // create a DP lookup table
        boolean[][] T = new boolean[n+1][m+1];

        // if both pattern and string are empty: match
        T[0][0] = true;

        // handle empty string case (i == 0)
        for (int j = 1; j <= m; j++)
        {
            if (pattern.charAt(j - 1) == '*') {
                T[0][j] = T[0][j - 1];
            }
        }

        // build a matrix in a bottom-up manner
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                if (pattern.charAt(j-1) == '*') {
                    T[i][j] = T[i - 1][j] || T[i][j - 1];
                }
                else if (pattern.charAt(j-1) == '?' ||
                        word.charAt(i-1) == pattern.charAt(j-1)) {
                    T[i][j] = T[i - 1][j - 1];
                }
            }
        }

        // last cell stores the answer
        return T[n][m];
    }

    // Wildcard Pattern Matching Implementation in Java
    public static void main(String[] args)
    {
        String word = "xyxzzxy";
        String pattern = "x***x?";

        if (isMatch(word, pattern)) {
            System.out.print("Match");
        }
        else {
            System.out.print("No Match");
        }
    }
}
```

##

```python3
# Function that matches an input string with a given wildcard pattern
def isMatch(word, pattern):

    # get length of string and wildcard pattern
    n = len(word)
    m = len(pattern)

    # create a DP lookup table
    T = [[False for x in range(m + 1)] for y in range(n + 1)]

    # if both pattern and string are empty: match
    T[0][0] = True

    # handle empty string case (i == 0)
    for j in range(1, m + 1):
        if pattern[j - 1] == '*':
            T[0][j] = T[0][j - 1]

    # build a matrix in a bottom-up manner
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if pattern[j - 1] == '*':
                T[i][j] = T[i - 1][j] or T[i][j - 1]
            elif pattern[j - 1] == '?' or word[i - 1] == pattern[j - 1]:
                T[i][j] = T[i - 1][j - 1]

    # last cell stores the answer
    return T[n][m]

# Wildcard Pattern Matching Implementation in Python
if __name__ == '__main__':

    word = 'xyxzzxy'
    pattern = 'x***x?'

    if isMatch(word, pattern):
        print('Match')
    else:
        print('No Match')
```

The time complexity of the above bottom-up solution is O(m.n) and requires O(m.n) extra space, where `n` is the length of the text and `m` is the length of the pattern.
