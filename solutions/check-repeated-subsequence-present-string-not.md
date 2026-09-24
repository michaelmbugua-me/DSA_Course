# Check if a repeated subsequence is present in a string or not

> Source: https://www.techiedelight.com/check-repeated-subsequence-present-string-not/

[String](https://www.techiedelight.com/Category/String/)

Given a string, check if a repeated subsequence is present in it or not. The repeated subsequence should have a length of 2 or more.

For example,

String XYBAXB has XB(XBXB) as a repeated subsequence String XBXAXB has XX(XXX) as a repeated subsequence String ABCA doesn’t have any repeated subsequence String XYBYAXBY has XB(XBXB), XY(XYXY), YY(YYY), YB(YBYB), and YBY(YBYBY) as repeated subsequences.

> 

The idea is simple. If we discard all non-repeating elements from the string (having frequency of `1`), and the resulting string is non-palindrome, then the string contains a repeated subsequence. If the resulting string is a palindrome and doesn’t have any character with frequency three or more, the string cannot have a repeated subsequence.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

// Recursive function to check if `str[low…high]` is a palindrome or not
bool isPalindrome(string str, int low, int high)
{
    // base case
    if (low >= high) {
        return true;
    }

    return (str[low] == str[high]) &&
        isPalindrome(str, low + 1, high - 1);
}

// Function to checks if repeated subsequence is present
// in the string
bool hasRepeatedSubsequence(string str)
{
    // base case
    if (str.length() == 0) {
        return false;
    }

    // map to store the frequency of each distinct character
    // of a given string
    unordered_map<char, int> freq;

    // update map with frequency
    for (int i = 0; i < str.length(); i++)
    {
        // if the frequency of any character becomes 3,
        // we have found the repeated subsequence
        if (++freq[str[i]] >= 3) {
            return true;
        }
    }

    string temp;

    // consider all repeated elements (frequency 2 or more)
    // and discard all non-repeating elements (frequency 1)
    for (int i = 0; i < str.length(); i++)
    {
        if (freq[str[i]] >= 2) {
            temp += str[i];
        }
    }

    // return false if `temp` is a palindrome
    return !isPalindrome(temp, 0, temp.length() - 1);
}

int main()
{
    string str = "XYBYAXB";        // 'XB' and 'YB' are repeated subsequences

    if (hasRepeatedSubsequence(str)) {
        cout << "Repeated subsequence is present";
    }
    else {
        cout << "No repeated subsequence is present";
    }

    return 0;
}
```

**Output:** Repeated subsequence is present

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Recursive function to check if `str[low…high]` is a palindrome or not
    public static boolean isPalindrome(String str, int low, int high)
    {
        // base case
        if (low >= high) {
            return true;
        }

        return (str.charAt(low) == str.charAt(high)) &&
                isPalindrome(str, low + 1, high - 1);
    }

    // Function to checks if repeated subsequence is present in the string
    public static boolean hasRepeatedSubsequence(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return false;
        }

        // map to store the frequency of each distinct character
        // of a given string
        Map<Character, Integer> freq = new HashMap<>();

        // update map with frequency
        for (char c: str.toCharArray())
        {
            freq.put(c, freq.getOrDefault(c, 0) + 1);

            // if the frequency of any character becomes 3,
            // we have found the repeated subsequence
            if (freq.get(c) >= 3) {
                return true;
            }
        }

        StringBuilder sb = new StringBuilder();

        // consider all repeated elements (frequency 2 or more)
        // and discard all non-repeating elements (frequency 1)
        for (char c: str.toCharArray())
        {
            if (freq.get(c) >= 2) {
                sb.append(c);
            }
        }

        // return false if `sb` is a palindrome
        return !isPalindrome(sb.toString(), 0, sb.length() - 1);
    }

    public static void main(String[] args)
    {
        String str = "XYBYAXB";        // 'XB' and 'YB' are repeated subsequences

        if (hasRepeatedSubsequence(str)) {
            System.out.println("Repeated subsequence is present");
        }
        else {
            System.out.println("No repeated subsequence is present");
        }
    }
}
```

##

```python3
# Recursive function to check if `s[low…high]` is a palindrome or not
def isPalindrome(s):

    (low, high) = (0, len(s) - 1)

    while low < high:
        if s[low] != s[high]:
            return False
        low = low + 1
        high = high - 1

    return True

# Function to checks if repeated subsequence is present in a string
def hasRepeatedSubsequence(s):

    # base case
    if not s:
        return False

    # dictionary to store the frequency of each distinct character of a given string
    freq = {}

    # update dictionary with frequency
    for c in s:
        # if the frequency of any character becomes 3, we have found a
        # repeated subsequence
        freq[c] = freq.get(c, 0) + 1
        if freq.get(c) >= 3:
            return True

    # consider all repeated elements (frequency 2 or more)
    # and discard all non-repeating elements (frequency 1)
    repeated = [c for c in s if freq.get(c) >= 2]

    # return false if it is a palindrome
    return not isPalindrome(repeated)

if __name__ == '__main__':

    s = 'XYBYAXB'        # 'XB' and 'YB' are repeated subsequences

    if hasRepeatedSubsequence(s):
        print('Repeated subsequence is present')
    else:
        print('No repeated subsequence is present')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input string.

The problem can also be solved using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/). It is nothing but a variation of the [Longest Common subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/) problem. However, the time complexity of a dynamic programming solution is O(n2).

Also See:

> [Check if a string is a rotated palindrome or not](https://www.techiedelight.com/check-given-string-rotated-palindrome-not/ "Check if a string is a rotated palindrome or not")

> [Determine whether a string is a palindrome or not](https://www.techiedelight.com/determine-given-string-is-palindrome-not/ "Determine whether a string is a palindrome or not")

> [Find the longest substring of a string containing `k` distinct characters](https://www.techiedelight.com/find-longest-substring-containing-k-distinct-characters/ "Find the longest substring of a string containing `k` distinct characters")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 294

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
