# Find all possible palindromic substrings of a string

> Source: https://www.techiedelight.com/find-possible-palindromic-substrings-string/

[String](https://www.techiedelight.com/Category/String/)

Given a string, find all possible palindromic substrings in it.

The problem differs from the problem of finding the possible palindromic subsequence. Unlike subsequences, [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) are required to occupy consecutive positions within the original string.

For example,

**Input:** str = google **Output:** e l g o oo goog

> 

A simple solution would be to generate all substrings of the given string and print substrings that are palindromes. The time complexity of this solution would be O(n3), where `n` is the length of the input string.

We can solve this problem in O(n2) time and O(1) space. The idea is inspired by the [Longest Palindromic Substring](https://techiedelight.com/longest-palindromic-substring-non-dp-space-optimized-solution/) problem. For each character in the given string, consider it as the midpoint of a palindrome and expand in both directions to find all palindromes that have it as midpoint. For an even length palindrome, consider every adjacent pair of characters as the midpoint. We use a set to store all unique palindromic substrings.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

// Expand in both directions of `low` and `high` to find all palindromes
void expand(string str, int low, int high, auto &set)
{
    // run till `str[low.high]` is not a palindrome
    while (low >= 0 && high < str.length() && str[low] == str[high])
    {
        // push all palindromes into a set
        set.insert(str.substr(low, high - low + 1));

        // Expand in both directions
        low--, high++;
    }
}

// Function to find all unique palindromic substrings of a given string
void findPalindromicSubstrings(string str)
{
    // create an empty set to store all unique palindromic substrings
    unordered_set<string> set;

    for (int i = 0; i < str.length(); i++)
    {
        // find all odd length palindrome with `str[i]` as a midpoint
        expand(str, i, i, set);

        // find all even length palindrome with `str[i]` and `str[i+1]` as
        // its midpoints
        expand(str, i, i + 1, set);
    }

    // print all unique palindromic substrings
    for (auto i: set) {
        cout << i << " ";
    }
}

int main()
{
    string str = "google";

    findPalindromicSubstrings(str);

    return 0;
}
```

**Output:** e l g o oo goog

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    // Expand in both directions of `low` and `high` to find all palindromes
    public static void expand(String str, int low, int high, Set<String> set)
    {
        // run till `str[low.high]` is not a palindrome
        while (low >= 0 && high < str.length()
                && str.charAt(low) == str.charAt(high))
        {
            // push all palindromes into a set
            set.add(str.substring(low, high + 1));

            // Expand in both directions
            low--;
            high++;
        }
    }

    // Function to find all unique palindromic substrings of a given string
    public static void findPalindromicSubstrings(String str)
    {
        // base case
        if (str == null) {
            return;
        }

        // create an empty set to store all unique palindromic substrings
        Set<String> set = new HashSet<>();

        for (int i = 0; i < str.length(); i++)
        {
            // find all odd length palindrome with `str[i]` as a midpoint
            expand(str, i, i, set);

            // find all even length palindrome with `str[i]` and `str[i+1]`
            // as its midpoints
            expand(str, i, i + 1, set);
        }

        // print all unique palindromic substrings
        System.out.print(set);
    }

    public static void main(String[] args)
    {
        String str = "google";

        findPalindromicSubstrings(str);
    }
}
```

##

```python3
# Expand in both directions of `low` and `high` to find all palindromes
def expand(s, low, high, palindromes):

    # run till `s[low.high]` is not a palindrome
    while low >= 0 and high < len(s) and s[low] == s[high]:

        # push all palindromes into a set
        palindromes.add(s[low: high + 1])

        # Expand in both directions
        low = low - 1
        high = high + 1

# Function to find all unique palindromic substrings of a given string
def findPalindromicSubstrings(s):

    # create an empty set to store all unique palindromic substrings
    palindromes = set()

    for i in range(len(s)):

        # find all odd length palindrome with `s[i]` as a midpoint
        expand(s, i, i, palindromes)

        # find all even length palindrome with `s[i]` and `s[i+1]`
        # as its midpoints
        expand(s, i, i + 1, palindromes)

    # print all unique palindromic substrings
    print(palindromes, end='')

if __name__ == '__main__':

    s = 'google'
    findPalindromicSubstrings(s)
```

Also See:

> [Longest Palindromic Substring Problem](https://www.techiedelight.com/longest-palindromic-substring-non-dp-space-optimized-solution/ "Longest Palindromic Substring Problem")

> [Check if a string is a rotated palindrome or not](https://www.techiedelight.com/check-given-string-rotated-palindrome-not/ "Check if a string is a rotated palindrome or not")

> [Find the longest even-length palindromic sum substring of a string](https://www.techiedelight.com/longest-even-length-palidromic-sum-substring/ "Find the longest even-length palindromic sum substring of a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.51/5. Vote count: 194

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
