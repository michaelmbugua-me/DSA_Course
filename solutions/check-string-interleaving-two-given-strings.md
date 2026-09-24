# Check if a string is interleaving of two other given strings

> Source: https://www.techiedelight.com/check-string-interleaving-two-given-strings/

Given three strings, return true if the third string is interleaving the first and second strings, i.e., it is formed from all characters of the first and second string, and the order of characters is preserved.

For example,

ACDB is interleaving of AB and CD ADEBCF is interleaving of ABC and DEF ACBCD is interleaving of ABC and CD ACDABC is interleaving of ABC and ACD

> 

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/), as demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Function to check if strings 'X' and 'Y' are interleaving of string 'S' or not
bool isInterleaving(string X, string Y, string S)
{
    // return true if the end of all strings is reached
    if (!X.length() && !Y.length() && !S.length()) {
        return true;
    }

    // return false if the end of string 'S' is reached,
    // but string 'X' or 'Y' is not empty

    if (!S.length()) {
        return false;
    }

    // if string 'X' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring

    if (X.length() && S[0] == X[0]) {
        return isInterleaving(X.substr(1), Y, S.substr(1));
    }

    // if string 'Y' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring

    if (Y.length() && S[0] == Y[0]) {
        return isInterleaving(X, Y.substr(1), S.substr(1));
    }

    return false;
}

int main()
{
    string X = "ABC";
    string Y = "DEF";
    string S = "ADEBCF";

    if (isInterleaving(X, Y, S)) {
        cout << "Interleaving";
    }
    else {
        cout << "Not an Interleaving";
    }

    return 0;
}
```

**Output:** Interleaving

##

```java
class Main
{
    // Function to check if strings 'X' and 'Y' are interleaving of string 'S' or not
    public static boolean isInterleaving(String X, String Y, String S)
    {
        // return true if the end of all strings is reached
        if (X.length() == 0 && Y.length() == 0 && S.length() == 0) {
            return true;
        }

        // return false if the end of string 'S' is reached,
        // but string 'X' or 'Y' is not empty

        if (S.length() == 0) {
            return false;
        }

        // if string 'X' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        if (X.length() != 0 && S.charAt(0) == X.charAt(0)) {
            return isInterleaving(X.substring(1), Y, S.substring(1));
        }

        // if string 'Y' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        if (Y.length() != 0 && S.charAt(0) == Y.charAt(0)) {
            return isInterleaving(X, Y.substring(1), S.substring(1));
        }

        return false;
    }

    public static void main(String[] args)
    {
        String X = "ABC";
        String Y = "DEF";
        String S = "ADEBFC";

        if (isInterleaving(X, Y, S)) {
            System.out.print("Interleaving");
        }
        else {
            System.out.print("Given string is not interleaving of X and Y");
        }
    }
}
```

##

```python3
# Function to check if strings 'X' and 'Y' are interleaving of 'S' or not
def isInterleaving(X, Y, S):

    # return true if the end of all strings is reached
    if not X and not Y and not S:
        return True

    # return false if the end of string 'S' is reached,
    # but 'X' or 'Y' is not empty
    if not S:
        return False

    # if string 'X' is not empty and its first character matches with the
    # first character of 'S', recur for the remaining substring
    if X and S[0] == X[0]:
        return isInterleaving(X[1:], Y, S[1:])

    # if string 'Y' is not empty and its first character matches with the
    # first character of 'S', recur for the remaining substring
    if Y and S[0] == Y[0]:
        return isInterleaving(X, Y[1:], S[1:])

    return False

if __name__ == '__main__':

    X = 'ABC'
    Y = 'DEF'
    S = 'ADEBFC'

    if isInterleaving(X, Y, S):
        print('Interleaving')
    else:
        print('Not an Interleaving')
```

The time complexity of the above solution is O(m + n), where `m` and `n` are the length of the string `X` and `Y`. The auxiliary space required by the program is O(1).

The problem with the above solution is that it doesn’t handle duplicates. Suppose `X = "ABC"` and `Y = "ACD"`, then the above solution will return false for string `S = "ACDABC"`. The reason is that if the current character of `S` matches the current character of both `X` and `Y`, the solution will always pair `S` with `X` and do not check if the solution can be formed by pairing `S` with `Y` or not.

We can easily handle duplicates by pairing `S` with both `X` and `Y` and recursively check if the solution can be formed by either of them or not. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
using namespace std;

// Function to check if strings 'X' and 'Y' are interleaving of string 'S' or not
bool isInterleaving(string X, string Y, string S)
{
    // return true if the end of all strings is reached
    if (!X.length() && !Y.length() && !S.length()) {
        return true;
    }

    // return false if the end of string 'S' is reached,
    // but string 'X' or 'Y' is not empty

    if (!S.length()) {
        return false;
    }

    // if string 'X' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring

    bool x = (X.length() && S[0] == X[0]) &&
            isInterleaving(X.substr(1), Y, S.substr(1));

    // if string 'Y' is not empty and its first character matches with the
    // first character of 'S', recur for the remaining substring

    bool y = (Y.length() && S[0] == Y[0]) &&
            isInterleaving(X, Y.substr(1), S.substr(1));

    return x || y;
}

int main()
{
    string X = "ABC";
    string Y = "ACD";
    string S = "ACDABC";

    if (isInterleaving(X, Y, S)) {
        cout << "Interleaving";
    }
    else {
        cout << "Not an Interleaving";
    }

    return 0;
}
```

**Output:** Interleaving

##

```java
class Main
{
    // Function to check if strings 'X' and 'Y' are interleaving of string 'S' or not
    public static boolean isInterleaving(String X, String Y, String S)
    {
        // return true if the end of all strings is reached
        if (X.length() == 0 && Y.length() == 0 && S.length() == 0) {
            return true;
        }

        // return false if the end of string 'S' is reached,
        // but string 'X' or 'Y' is not empty

        if (S.length() == 0) {
            return false;
        }

        // if string 'X' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        boolean x = (X.length() != 0 && S.charAt(0) == X.charAt(0)) &&
                isInterleaving(X.substring(1), Y, S.substring(1));

        // if string 'Y' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        boolean y = (Y.length() != 0 && S.charAt(0) == Y.charAt(0)) &&
                isInterleaving(X, Y.substring(1), S.substring(1));

        return x || y;
    }

    public static void main(String[] args)
    {
        String X = "ABC";
        String Y = "DEF";
        String S = "ADEBFC";

        if (isInterleaving(X, Y, S)) {
            System.out.print("Interleaving");
        }
        else {
            System.out.print("Given string is not interleaving of X and Y");
        }
    }
}
```

##

```python3
# Function to check if strings 'X' and 'Y' are interleaving of 'S' or not
def isInterleaving(X, Y, S):

    # return true if the end of all strings is reached
    if not X and not Y and not S:
        return True

    # return false if the end of string 'S' is reached,
    # but 'X' or 'Y' is not empty
    if not S:
        return False

    # if string 'X' is not empty and its first character matches with the
    # first character of 'S', recur for the remaining substring
    x = (len(X) and S[0] == X[0]) and isInterleaving(X[1:], Y, S[1:])

    # if string 'Y' is not empty and its first character matches with the
    # first character of 'S', recur for the remaining substring
    y = (len(Y) and S[0] == Y[0]) and isInterleaving(X, Y[1:], S[1:])

    return x or y

if __name__ == '__main__':

    X = 'ABC'
    Y = 'DEF'
    S = 'ADEBFC'

    if isInterleaving(X, Y, S):
        print('Interleaving')
    else:
        print('Not an Interleaving')
```

The worst-case time complexity of the above solution is exponential and occupies space in the call stack. The worst case happens when all characters of `X` and `Y` are the same. We can use dynamic programming to reduce the worst-case time complexity and space complexity to O(m.n).

The DP solution is discussed below in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to check if strings 'X' and 'Y' are interleaving of string 'S' or not
bool isInterleaving(string X, string Y, string S, auto &T)
{
    // return true if the end of all strings is reached
    if (!X.length() && !Y.length() && !S.length()) {
        return true;
    }

    // return false if the end of string 'S' is reached,
    // but string 'X' or 'Y' is not empty

    if (!S.length()) {
        return false;
    }

    // calculate a unique map key by using delimiter `|`
    string key = (X + "|" + Y + "|" + S);

    // if the subproblem is seen for the first time
    if (T.find(key) == T.end())
    {
        // if string 'X' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        bool x = (X.length() && S[0] == X[0]) &&
                isInterleaving(X.substr(1), Y, S.substr(1), T);

        // if string 'Y' is not empty and its first character matches with the
        // first character of 'S', recur for the remaining substring

        bool y = (Y.length() && S[0] == Y[0]) &&
                isInterleaving(X, Y.substr(1), S.substr(1), T);

        T[key] = x || y;
    }

    return T[key];
}

int main()
{
    string X = "ABC";
    string Y = "ACD";
    string S = "ACDABC";

    // map to store solution to already computed subproblems
    unordered_map<string, bool> T;

    if (isInterleaving(X, Y, S, T)) {
        cout << "Interleaving";
    }
    else {
        cout << "Not an Interleaving";
    }

    return 0;
}
```

**Output:** Interleaving
