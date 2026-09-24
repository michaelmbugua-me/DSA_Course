# Determine whether a string is a palindrome or not

> Source: https://www.techiedelight.com/determine-given-string-is-palindrome-not/

Write a program to determine whether a given string is palindrome. A palindromic string is a string that remains the same with its characters reversed. Like `ABCBA`, for example, is “symmetrical”.

> 

A simple solution would be to reverse the string and compare if the original string is equal to the reversed string or not. If strings are found to be equal, we can say that the given string is a palindrome. This solution, though concise and straightforward, is not [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/). Also, the comparison function might end up iterating till the end of the string. This solution is linear on paper, but we can still do better.

We can easily check for palindromic string in-place without using extra string and without iterating through the complete string. The idea is to take two pointers that point at the beginning and end of the string and start comparing characters pointed by them. The first iteration will check if the first and last characters are the same, and the next iteration will compare the next pair and so on. If a mismatch happens at any point, we can say that the given string is not a palindrome.

## Iterative Version

The iterative implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Iterative function to check if the given string is a palindrome or not
bool isPalindrome(string str)
{
    int low = 0;
    int high = str.length() - 1;

    while (low < high)
    {
        // if a mismatch happens
        if (str[low] != str[high]) {
            return false;
        }

        low++;
        high--;
    }

    return true;
}

int main()
{
    string str = "XYXYX";

    if (isPalindrome(str)) {
        cout << "Palindrome";
    }
    else {
        cout << "Not Palindrome";
    }

    return 0;
}
```

**Output:** Palindrome

##

```java
class Main
{
    public static boolean isPalindrome(String str)
    {
        if (str == null) {
            return false;
        }

        for (int i = 0, j = str.length() - 1; i < j; i++, j--)
        {
            if (str.charAt(i) != str.charAt(j)) {
                return false;
            }
        }

        return true;
    }

    public static void main (String[] args)
    {
        String str = "XYBYBYX";

        if (isPalindrome(str)) {
            System.out.println("Palindrome");
        }
        else {
            System.out.println("Not Palindrome");
        }
    }
}
```

##

```python3
def isPalindrome(s):

    i = 0
    j = len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return False
        i = i + 1
        j = j - 1

    return True

if __name__ == '__main__':

    s = 'XYBYBYX'

    if isPalindrome(s):
        print('Palindrome')
    else:
        print('Not Palindrome')
```

## Recursive Version

The recursive implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Recursive function to check if `str[low…high]` is a palindrome or not
bool isPalindrome(string str, int low, int high)
{
    // base case
    if (low >= high) {
        return true;
    }

    // return false if mismatch happens
    if (str[low] != str[high]) {
        return false;
    }

    // move to the next pair
    return isPalindrome(str, low + 1, high - 1);
}

int main()
{
    string str = "XYBYBYX";
    int len = str.length();

    if (isPalindrome(str, 0, len - 1)) {
        cout << "Palindrome";
    }
    else {
        cout << "Not Palindrome";
    }

    return 0;
}
```

**Output:** Palindrome

##

```java
class Main
{
    // Recursive function to check if `str[low…high]` is a palindrome or not
    public static boolean isPalindrome(String str, int low, int high)
    {
        // base case
        if (low >= high) {
            return true;
        }

        // return false if mismatch happens
        if (str.charAt(low) != str.charAt(high)) {
            return false;
        }

        // move to the next pair
        return isPalindrome(str, low + 1, high - 1);
    }

    public static void main(String[] args)
    {
        String str = "XYBYBYX";

        if (isPalindrome(str, 0, str.length() - 1)) {
            System.out.print("Palindrome");
        }
        else {
            System.out.print("Not Palindrome");
        }
    }
}
```

##

```python3
# Recursive function to check if `s[low…high]` is a palindrome or not
def isPalindrome(s, low, high):

    # base case
    if low >= high:
        return True

    # return false if mismatch happens
    if s[low] != s[high]:
        return False

    # move to the next pair
    return isPalindrome(s, low + 1, high - 1)

if __name__ == '__main__':

    s = 'XYBYBYX'

    if isPalindrome(s, 0, len(s) - 1):
        print('Palindrome')
    else:
        print('Not Palindrome')
```

We can also rewrite the above recursive code in a single line (remember, an interviewer can ask this as a follow-up question or even start with this problem itself).

```cpp
#include <iostream>
using namespace std;

// Recursive function to check if `str[low…high]` is a palindrome or not
bool isPalindrome(string str, int low, int high)
{
    return (low >= high) || (str[low] == str[high] &&
                isPalindrome(str, low + 1, high - 1));
}

int main()
{
    string str = "XYBYBYX";
    int len = str.length();

    if (isPalindrome(str, 0, len - 1)) {
        cout << "Palindrome";
    }
    else {
        cout << "Not Palindrome";
    }

    return 0;
}
```

**Output:** Palindrome
