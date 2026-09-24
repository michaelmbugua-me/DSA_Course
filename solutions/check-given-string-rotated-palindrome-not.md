# Check if a string is a rotated palindrome or not

> Source: https://www.techiedelight.com/check-given-string-rotated-palindrome-not/

[String](https://www.techiedelight.com/Category/String/)

Given a string, check if it is a rotated palindrome or not.

For example,

`CBAABCD` is a rotated palindrome as it is a rotation of palindrome `ABCDCBA`. `BAABCC` is a rotated palindrome as it is a rotation of palindrome `ABCCBA`.

> 

## Approach 1

A naive solution is to consider all rotations of the given string and check if any rotation is a palindrome or not. If we have found a rotation that is a palindrome, return true; otherwise, return false.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Recursive function to check if `str[low…high]` is a palindrome or not
bool isPalindrome(string str, int low, int high)
{
    return (low >= high) || (str[low] == str[high] &&
            isPalindrome(str, low + 1, high - 1));
}

// Function to check if a given string is a rotated palindrome or not
bool isRotatedPalindrome(string str)
{
    // length of the given string
    int n = str.length();

    // check for all rotations of the given string if it
    // is palindrome or not
    for (int i = 0; i < n; i++)
    {
        // in-place rotate the string by 1 unit
        rotate(str.begin(), str.begin() + 1, str.end());
        // rotate(str.rbegin(), str.rbegin() + 1, str.rend());

        // return true if the rotation is a palindrome
        if (isPalindrome(str, 0, n - 1)) {
            return true;
        }
    }

    // return false if no rotation is a palindrome
    return false;
}

int main()
{
    // palindromic string
    string str = "ABCDCBA";

    // rotate it by 2 units
    rotate(str.begin(), str.begin() + 2, str.end());

    if (isRotatedPalindrome(str)) {
        cout << "The string is a rotated palindrome";
    }
    else {
        cout << "The string is not a rotated palindrome";
    }

    return 0;
}
```

**Output:** The string is a rotated palindrome

##

```java
class Main
{
    // Recursive function to check if `str[low…high]` is a palindrome or not
    public static boolean isPalindrome(String str, int low, int high)
    {
        return (low >= high) || (str.charAt(low) == str.charAt(high) &&
                                isPalindrome(str, low + 1, high - 1));
    }

    // Function to check if a given string is a rotated palindrome or not
    public static boolean isRotatedPalindrome(String str)
    {
        // base case
        if (str == null) {
            return false;
        }

        // length of the given string
        int n = str.length();

        // check for all rotations of the given string if it
        // is palindrome or not
        for (int i = 0; i < n; i++)
        {
            // in-place rotate the string by 1 unit
            str = str.substring(1) + str.charAt(0);

            // return true if the rotation is a palindrome
            if (isPalindrome(str, 0, n - 1)) {
                return true;
            }
        }

        // return false if no rotation is a palindrome
        return false;
    }

    public static void main(String[] args)
    {
        // palindromic string
        String str = "ABCDCBA";

        // rotate it by 2 units
        str = str.substring(2) + str.substring(0, 2);

        if (isRotatedPalindrome(str)) {
            System.out.println("The string is a rotated palindrome");
        }
        else {
            System.out.println("The string is not a rotated palindrome");
        }
    }
}
```

##

```python3
# Recursive function to check if `s[low…high]` is a palindrome or not
def isPalindrome(s, low, high):
    return (low >= high) or (s[low] == s[high] and
                            isPalindrome(s, low + 1, high - 1))

# Function to check if a given string is a rotated palindrome or not
def isRotatedPalindrome(s):

    # length of the given string
    n = len(s)

    # check for all rotations of the given string if it
    # is palindrome or not
    for i in range(n):

        # in-place rotate the string by 1 unit
        s = s[1:] + s[0]

        # return true if the rotation is a palindrome
        if isPalindrome(s, 0, n - 1):
            return True

    # return false if no rotation is a palindrome
    return False

if __name__ == '__main__':

    # palindromic string
    s = 'ABCDCBA'

    # rotate it by 2 units
    s = s[2:] + s[:2]

    if isRotatedPalindrome(s):
        print('The string is a rotated palindrome')
    else:
        print('The string is not a rotated palindrome')
```

## Approach 2

The problem is similar to finding the [Longest Palindromic Substring](https://techiedelight.com/longest-palindromic-substring-non-dp-space-optimized-solution/) problem. Let the given string be `S` of length `n`. The idea is to concatenate the string with itself, i.e., `(S = S + S)`, and find a palindromic substring of length `n` in the modified string `(S + S)`. If a palindromic substring of length `n` exists in the modified string, return true; otherwise, return false.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Expand in both directions of `low` and `high` to find
// palindrome of length `k`
bool expand(string str, int low, int high, int k)
{
    // run till `str[low.high]` is not a palindrome
    while (low >= 0 && high < str.length() && (str[low] == str[high]))
    {
        // return true palindrome of length `k` is found
            if (high - low + 1 == k) {
                return true;
            }

        // Expand in both directions
        low--, high++;
    }

    // return false if palindrome of length `k` is not found
    return false;
}

// Function to check if a palindromic substring of length `k` exists or not
bool longestPalindromicSubstring(string str, int k)
{
    for (int i = 0; i < str.length() - 1; i++)
    {
        // check if odd or even length palindrome of length `k` exists,
        // which have `str[i]` as its midpoint
        if (expand(str, i, i, k) || expand(str, i, i + 1, k)) {
            return true;
        }
    }

    return false;
}

// Function to check if a given string is a rotated palindrome or not
bool isRotatedPalindrome(string str)
{
    // length of the given string
    int n = str.length();

    // return true if the longest palindromic substring of length `n`
    // exists in the string `str + str`
    return longestPalindromicSubstring(str + str, n);
}

int main()
{
    // palindromic string
    string str = "ABCCBA";

    // rotate it by 2 units
    rotate(str.begin(), str.begin() + 2, str.end());

    if (isRotatedPalindrome(str)) {
        cout << "The string is a rotated palindrome";
    }
    else {
        cout << "The string is not a rotated palindrome";
    }

    return 0;
}
```

**Output:** The string is a rotated palindrome

##

```java
class Main
{
    // Expand in both directions of `low` and `high` to find
    // palindrome of length `k`
    private static boolean expand(String str, int low, int high, int k)
    {
        while (low >= 0 && high < str.length() &&
            (str.charAt(low) == str.charAt(high)))
        {
            // return true palindrome of length `k` is found
            if (high - low + 1 == k) {
                return true;
            }

            // Expand in both directions
            low--;
            high++;
        }

        // return false if palindrome of length `k` is not found
        return false;
    }

    // Function to check if a palindromic substring of length `k` exists or not
    private static boolean longestPalindromicSubstring(String str, int k)
    {
        for (int i = 0; i < str.length() - 1; i++)
        {
            // check if odd or even length palindrome of length `k`
            // having `str[i]` as its midpoint exists
            if (expand(str, i, i, k) || expand(str, i, i + 1, k)) {
                return true;
            }
        }

        return false;
    }

    // Function to check if a given string is a rotated palindrome or not
    public static boolean isRotatedPalindrome(String str)
    {
        // base case
        if (str == null) {
            return false;
        }

        // length of the given string
        int n = str.length();

        // return true if the longest palindromic substring of length `n`
        // exists in the string `str + str`
        return longestPalindromicSubstring(str + str, n);
    }

    public static void main(String[] args)
    {
        // palindromic string
        String str = "ABCCBA";

        // rotate it by 2 units
        str = "CCBAAB";

        if (isRotatedPalindrome(str)) {
            System.out.println("The string is a rotated palindrome");
        }
        else {
            System.out.println("The string is not a rotated palindrome");
        }
    }
}
```

##

```python3
# Expand in both directions of `low` and `high` to find
# palindrome of length `k`
def expand(s, low, high, k):

    while low >= 0 and high < len(s) and s[low] == s[high]:

        # return true palindrome of length `k` is found
        if high - low + 1 == k:
            return True

        # Expand in both directions
        low = low - 1
        high = high + 1

    # return false if palindrome of length `k` is not found
    return False

# Function to check if a palindromic substring of length `k` exists or not
def longestPalindromicSubstring(s, k):

    for i in range(len(s) - 1):
        # check if odd or even length palindrome of length `k`
        # having `s[i]` as its midpoint exists
        if expand(s, i, i, k) or expand(s, i, i + 1, k):
            return True

    return False

# Function to check if a given string is a rotated palindrome or not
def isRotatedPalindrome(s):

    # length of the given string
    n = len(s)

    # return true if the longest palindromic substring of length `n`
    # exists in the string `s + s`
    return longestPalindromicSubstring(s + s, n)

if __name__ == '__main__':

    # palindromic string
    s = 'ABCCBA'

    # rotate it by 2 units
    s = s[2:] + s[:2]

    if isRotatedPalindrome(s):
        print('The string is a rotated palindrome')
    else:
        print('The string is not a rotated palindrome')
```

The time complexity of both above-discussed methods is O(n2), where `n` is the length of the input string and doesn’t require any extra space.
