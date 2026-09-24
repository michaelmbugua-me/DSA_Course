# Longest Common Subsequence (LCS) | Space optimized version

> Source: https://www.techiedelight.com/longest-common-subsequence-lcs-space-optimized-version/

Write a space-optimized version of the LCS problem.

We have already discussed an [iterative DP version of the LCS problem ](https://techiedelight.com/longest-common-subsequence/) that uses O(m.n) space where `m` and `n` are the length of given strings `X` and `Y`, respectively. If only the length of the LCS is required, the space complexity of the solution can be improved up to O(min(m, n)) since we are only reading from the previous row of the current row.

> 

## Approach 1: (Using two arrays)

The space-optimized algorithm can be implemented as follows in C++, Java, and Python, using two arrays:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Space optimized function to find the length of the longest common subsequence
// of substring `X[0…m-1]` and `Y[0…n-1]`
int LCSLength(string X, string Y)
{
    int m = X.length(), n = Y.length();

    // allocate storage for one-dimensional arrays, `curr` and `prev`
    int curr[n + 1], prev[n + 1];

    // fill the lookup table in a bottom-up manner
    for (int i = 0; i <= m; i++)
    {
        for (int j = 0; j <= n; j++)
        {
            if (i == 0 || j == 0) {
                curr[j] = 0;
            }
            else {
                // if the current character of `X` and `Y` matches
                if (X[i - 1] == Y[j - 1]) {
                    curr[j] = prev[j - 1] + 1;
                }
                // otherwise, if the current character of `X` and `Y` don't match
                else {
                    curr[j] = max(prev[j], curr[j - 1]);
                }
            }
        }

        // replace contents of the previous array with the current array
        for (int i = 0; i <= n; i++) {
            prev[i] = curr[i];
        }
    }

    // LCS will be the last entry in the lookup table
    return curr[n];
}

int main()
{
    string X = "XMJYAUZ", Y = "MZJAWXU";

    cout << "The length of the LCS is " << LCSLength(X, Y);

    return 0;
}
```

**Output:** The length of the LCS is 4

##

```java
class Main
{
    // Space optimized function to find the length of the longest common subsequence
    // of substring `X[0…m-1]` and `Y[0…n-1]`
    public static int LCSLength(String X, String Y)
    {
        int m = X.length(), n = Y.length();

        // allocate storage for one-dimensional arrays, `curr` and `prev`
        int[] curr = new int[n + 1];
        int[] prev = new int[n + 1];

        // fill the lookup table in a bottom-up manner
        for (int i = 0; i <= m; i++)
        {
            for (int j = 0; j <= n; j++)
            {
                if (i > 0 && j > 0)
                {
                    // if the current character of `X` and `Y` matches
                    if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                        curr[j] = prev[j - 1] + 1;
                    }
                    // otherwise, if the current character of `X` and `Y` don't match
                    else {
                        curr[j] = Integer.max(prev[j], curr[j - 1]);
                    }
                }
            }

            // replace contents of the previous array with the current array
            System.arraycopy(curr, 0, prev, 0, n + 1);
        }

        // LCS will be the last entry in the lookup table
        return curr[n];
    }

    public static void main(String[] args)
    {
        String X = "XMJYAUZ", Y = "MZJAWXU";

        System.out.println("The length of the LCS is " + LCSLength(X, Y));
    }
}
```

##

```python3
# Space optimized function to find the length of the longest common subsequence
# of substring `X[0…m-1]` and `Y[0…n-1]`
def LCSLength(X, Y):

    m = len(X)
    n = len(Y)

    # allocate storage for one-dimensional lists, `curr` and `prev`
    curr = [0] * (n + 1)
    prev = [0] * (n + 1)

    # fill the lookup table in a bottom-up manner
    for i in range(m + 1):
        for j in range(n + 1):
            if i > 0 and j > 0:
                # if the current character of `X` and `Y` matches
                if X[i - 1] == Y[j - 1]:
                    curr[j] = prev[j - 1] + 1
                # otherwise, if the current character of `X` and `Y` don't match
                else:
                    curr[j] = max(prev[j], curr[j - 1])

        # replace contents of the previous list with the current list
        prev = curr.copy()

    # LCS will be the last entry in the lookup table
    return curr[n]

if __name__ == '__main__':

    X = 'XMJYAUZ'
    Y = 'MZJAWXU'

    print('The length of the LCS is', LCSLength(X, Y))
```

The time complexity of the above solution is O(m.n), where `m` and `n` are the length of given strings `X` and `Y`, respectively. The auxiliary space required by the program is O(n), which is independent of the length of the first string `m`. However, if the second string’s length is much larger than the first string’s length, then the space complexity would be huge. We can optimize the space complexity to O(min(m, n)) by creating a wrapper that always passes a smaller string as a second argument to the `LCSLength` function.

```
int main()
{
    string X = "XMJYAUZ", Y = "MZJAWXU";

    // pass smaller string as a second argument to `LCSLength()`
    if (X.length() > Y.length()) {
        cout << "The length of the LCS is " << LCSLength(X, Y);
    }
    else {
        cout << "The length of the LCS is " << LCSLength(Y, X);
    }

    return 0;
}
```

The program’s auxiliary space now is `2 x min(m, n)`.

## Approach 2: (Using one array)

The above solution uses two arrays. We can further optimize the code to use only a single array and a temporary variable. The implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Space optimized function to find the length of the longest common subsequence
// of substring `X[0…m-1]` and `Y[0…n-1]`
int LCSLength(string X, string Y)
{
    int m = X.length(), n = Y.length();

    // allocate storage for one-dimensional array `curr`
    int curr[n + 1], prev;

    // fill the lookup table in a bottom-up manner
    for (int i = 0; i <= m; i++)
    {
        prev = curr[0];
        for (int j = 0; j <= n; j++)
        {
            int backup = curr[j];

            if (i == 0 || j == 0) {
                curr[j] = 0;
            }
            else {
                // if the current character of `X` and `Y` matches
                if (X[i - 1] == Y[j - 1]) {
                    curr[j] = prev + 1;
                }
                // otherwise, if the current character of `X` and `Y` don't match
                else {
                    curr[j] = max(curr[j], curr[j - 1]);
                }
            }
            prev = backup;
        }
    }

    // LCS will be the last entry in the lookup table
    return curr[n];
}

int main()
{
    string X = "XMJYAUZ", Y = "MZJAWXU";

    // pass smaller string as a second argument to `LCSLength()`
    if (X.length() > Y.length()) {
        cout << "The length of the LCS is " << LCSLength(X, Y);
    }
    else {
        cout << "The length of the LCS is " << LCSLength(Y, X);
    }

    return 0;
}
```

**Output:** The length of the LCS is 4

##

```java
class Main
{
    // Space optimized function to find the length of the longest common subsequence
    // of substring `X[0…m-1]` and `Y[0…n-1]`
    public static int LCSLength(String X, String Y)
    {
        int m = X.length(), n = Y.length();

        // allocate storage for one-dimensional array `curr`
        int[] curr = new int[n + 1];
        int prev;

        // fill the lookup table in a bottom-up manner
        for (int i = 0; i <= m; i++)
        {
            prev = curr[0];
            for (int j = 0; j <= n; j++)
            {
                int backup = curr[j];
                if (i == 0 || j == 0) {
                    curr[j] = 0;
                }
                else {
                    // if the current character of `X` and `Y` matches
                    if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                        curr[j] = prev + 1;
                    }
                    // otherwise, if the current character of `X` and `Y` don't match
                    else {
                        curr[j] = Integer.max(curr[j], curr[j - 1]);
                    }
                }
                prev = backup;
            }
        }

        // LCS will be the last entry in the lookup table
        return curr[n];
    }

    public static void main(String[] args)
    {
        String X = "XMJYAUZ", Y = "MZJAWXU";

        // pass smaller string as a second argument to `LCSLength()`
        if (X.length() > Y.length()) {
            System.out.println("The length of the LCS is " + LCSLength(X, Y));
        }
        else {
            System.out.println("The length of the LCS is " + LCSLength(Y, X));
        }
    }
}
```

##

```python3
# Space optimized function to find the length of the longest common subsequence
# of substring `X[0…m-1]` and `Y[0…n-1]`
def LCSLength(X, Y):

    m = len(X)
    n = len(Y)

    # allocate storage for one-dimensional list `curr`
    curr = [None] * (n + 1)

    # fill the lookup table in a bottom-up manner
    for i in range(m + 1):
        prev = curr[0]
        for j in range(n + 1):
            backup = curr[j]
            if i == 0 or j == 0:
                curr[j] = 0
            else:
                # if the current character of `X` and `Y` matches
                if X[i - 1] == Y[j - 1]:
                    curr[j] = prev + 1
                # otherwise, if the current character of `X` and `Y` don't match
                else:
                    curr[j] = max(curr[j], curr[j - 1])

            prev = backup

    # LCS will be the last entry in the lookup table
    return curr[n]

if __name__ == '__main__':

    X = 'XMJYAUZ'
    Y = 'MZJAWXU'

    # pass smaller string as a second argument to `LCSLength()`
    if len(X) > len(Y):
        print('The length of the LCS is', LCSLength(X, Y))
    else:
        print('The length of the LCS is', LCSLength(Y, X))
```
