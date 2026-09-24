# Find the longest even-length palindromic sum substring of a string

> Source: https://www.techiedelight.com/longest-even-length-palidromic-sum-substring/

[String](https://www.techiedelight.com/Category/String/)

Find the length of the longest contiguous substring of a given string, such that the length of the substring is `2×n` digits and the sum of the leftmost `n` digits is equal to the sum of the rightmost `n` digits. If there is no such substring, return `0`.

The problem differs from the problem of finding the longest even-length palindromic sum subsequence. Unlike subsequences, [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) are required to occupy consecutive positions within the original string.

For example,

**Input:** 13267224 The length of the longest palindromic sum substring is 6. **326722** = (3 + 2 + 6) = (7 + 2 + 2) = 11 **Input:** 546374 The length of the longest palindromic sum substring is 4. **4637** = (4 + 6) = (3 + 7) = 10

> 

The idea is to consider every even length substring present in the string and calculate the sum of digits of their left and right half. Then, return the maximum length among the length of all substrings that have an equal sum in the left and right half.

The algorithm can be implemented as follows in C++, Java, and Python. To calculate the sum of the left and right half in constant time, a sum array is maintained.

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find the maximum length of a substring with an equal sum
// of left and right half
int longestPalindrome(string str)
{
    int n = str.length();

    // `sum[i]` stores sum of digits of a substring `str[0…i-1]`
    int sum[n + 1] = {0};

    for (int i = 1; i <= n; i++) {
        sum[i] = sum[i - 1] + (str[i - 1] - '0');   // '0' is subtracted to
    }                                                // convert char to int

    // stores the maximum length of a substring with an equal sum
    // of left and right half
    int max = 0;

    // consider even length substring from index `i` to `j`
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j += 2)
        {
            // calculate the length of the substring
            int range = j - i + 1;

            // find the middle index of the substring
            int mid = i + range / 2;

            // if the sum of the left and right half is the same as the length of
            // the substring is more than the maximum length found so far
            if ((sum[mid] - sum[i] == sum[j + 1] - sum[mid]) && max < range) {
                max = range;
            }
        }
    }

    return max;
}

int main()
{
    string str = "13267224";

    cout << "The length of the longest palindromic sum substring is "
         << longestPalindrome(str);

    return 0;
}
```

**Output:** The length of the longest palindromic sum substring is 6

##

```java
class Main
{
    // Function to find the maximum length of a substring with an equal sum
    // of left and right half
    public static int longestPalindrome(String str)
    {
        // base case
        if (str == null) {
            return 0;
        }

        // `sum[i]` stores sum of digits of a substring `str[0…i-1]`
        int[] sum = new int[str.length() + 1];

        for (int i = 1; i <= str.length(); i++)
        {
            // 0 is subtracted to convert char to an integer
            sum[i] = sum[i - 1] + (str.charAt(i - 1) - '0');
        }

        // stores the maximum length of a substring with an equal sum
        // of left and right half
        int max = 0;

        // consider even length substring from index `i` to `j`
        for (int i = 0; i < str.length() - 1; i++)
        {
            for (int j = i+1; j < str.length(); j += 2)
            {
                // calculate the length of the substring
                int range = j - i + 1;

                // find the middle index of the substring
                int mid = i + range / 2;

                // if the sum of the left and right half is the same as the length of
                // the substring is more than the maximum length found so far
                if ((sum[mid] - sum[i] == sum[j+1] - sum[mid])
                        && max < range) {
                    max = range;
                }
            }
        }

        return max;
    }

    public static void main(String[] args)
    {
        String str = "13267224";

        System.out.println("The length of the longest palindromic sum substring is "
                + longestPalindrome(str));
    }
}
```

##

```python3
# Function to find the maximum length of a substring with an equal sum
# of left and right half
def longestPalindrome(s):

    # `total[i]` stores sum of digits of a substring `s[0…i-1]`
    total = [0] * (len(s) + 1)

    for i in range(1, len(s) + 1):
        total[i] = total[i - 1] + int(s[i - 1])

    # stores the maximum length of a substring with an equal sum
    # of left and right half
    max = 0

    # consider even length substring from index `i` to `j`
    for i in range(len(s) - 1):
        for j in range(i + 1, len(s), 2):
            # calculate the length of the substring
            length = j - i + 1

            # find the middle index of the substring
            mid = i + length // 2

            # if the sum of the left and right half is the same as the length of
            # the substring is more than the maximum length found so far
            if total[mid] - total[i] == total[j + 1] - total[mid] and max < length:
                max = length

    return max

if __name__ == '__main__':

    s = '13267224'
    print('The length of the longest palindromic sum substring is',
            longestPalindrome(s))
```

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the length of the input string.

Can we do it with constant space?

We know that an even length palindrome will have two middle points. The idea is to consider every adjacent pair of digits in the string as midpoints and expand in both directions to find the maximum length palindrome. The longest palindromic substring problem inspires the idea.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Expand in both directions of `low` and `high` to find
// maximum length palindrome
void expand(string str, int low, int high, int &max)
{
    int len = str.length();
    int leftsum = 0, rightsum = 0;

    while (low >= 0 && high < len)
    {
        // update sum of the left and right half
        leftsum += str[low] - '0';
        rightsum += str[high] - '0';

        // update the maximum length of palindrome if the sum of the left half
        // becomes the same as the right half
        if (leftsum == rightsum && (high - low + 1) > max) {
            max = high - low + 1;
        }

        // Expand in both directions
        low--, high++;
    }
}

// Function to find the maximum length of a substring with an equal
// sum of left and right half
int longestPalindrome(string str, int n)
{
    // stores the maximum length of a substring with an equal sum
    // of left and right half
    int max = 0;

    // an even length palindrome will have two middle points

    // consider every adjacent pair of digits as midpoints and
    // expand in both directions to find the maximum length palindrome
    for (int i = 0; i < n - 1; i++) {
        expand(str, i, i + 1, max);
    }

    return max;
}

int main()
{
    string str = "546374";
    int n = str.length();

    cout << "The length of the longest palindromic sum substring is "
         << longestPalindrome(str, n);

    return 0;
}
```

**Output:** The length of the longest palindromic sum substring is 4

##

```java
class Main
{
    // Expand in both directions of `low` and `high` to find
    // maximum length palindrome
    public static int expand(String str, int low, int high, int max)
    {
        int leftsum = 0;
        int rightsum = 0;

        while (low >= 0 && high < str.length())
        {
            // update sum of the left and right half
            leftsum += str.charAt(low) - '0';
            rightsum += str.charAt(high) - '0';

            // update the maximum length of palindrome if the sum of the left half
            // becomes the same as the right half
            if (leftsum == rightsum && (high - low + 1) > max) {
                max = high - low + 1;
            }

            // Expand in both directions
            low--;
            high++;
        }

        return max;
    }

    // Function to find the maximum length of a substring with an equal
    // sum of left and right half
    public static int longestPalindrome(String str)
    {
        // stores the maximum length of a substring with an equal sum
        // of left and right half
        int max = 0;

        // an even length palindrome will have two middle points

        // consider every adjacent pair of digits as midpoints and
        // expand in both directions to find the maximum length palindrome
        for (int i = 0; i < str.length() - 1; i++) {
            max = expand(str, i, i + 1, max);
        }

        return max;
    }

    public static void main(String[] args)
    {
        String str = "546374";

        System.out.println("The length of the longest palindromic sum substring is "
                + longestPalindrome(str));
    }
}
```

##

```python3
# Expand in both directions of `low` and `high` to find the maximum length palindrome
def expand(s, low, high, max):

    leftsum = rightsum = 0

    while low >= 0 and high < len(s):

        # update sum of the left and right half
        leftsum += int(s[low])
        rightsum += int(s[high])

        # update the maximum length of palindrome if the sum of the left half
        # becomes the same as the right half
        if leftsum == rightsum and (high - low + 1) > max:
            max = high - low + 1

        # Expand in both directions
        (low, high) = (low - 1, high + 1)

    return max

# Function to find the maximum length of a substring with an equal
# sum of left and right half
def longestPalindrome(s):

    # stores the maximum length of a substring with an equal sum
    # of left and right half
    max = 0

    # an even length palindrome will have two middle points

    # consider every adjacent pair of digits as midpoints and
    # expand in both directions to find the maximum length palindrome
    for i in range(len(s) - 1):
        max = expand(s, i, i + 1, max)

    return max

if __name__ == '__main__':

    s = '546374'
    print('The length of the longest palindromic sum substring is',
            longestPalindrome(s))
```

The time complexity of the above solution is O(n2), where `n` is the length of the input string and doesn’t require any extra space.
