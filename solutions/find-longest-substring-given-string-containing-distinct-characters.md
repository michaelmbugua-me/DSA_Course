# Find the longest substring of a string containing distinct characters

> Source: https://www.techiedelight.com/find-longest-substring-given-string-containing-distinct-characters/

[String](https://www.techiedelight.com/Category/String/)

Given a string, find the longest substring containing distinct characters.

The problem differs from the problem of finding the longest subsequence with distinct characters. Unlike subsequences, [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) are required to occupy consecutive positions within the original string.

For example,

**Input:** findlongestsubstring **Output:** The longest substring with all distinct characters is dlongest or ubstring **Input:** longestsubstr **Output:** The longest substring with all distinct characters is longest **Input:** abbcdafeegh **Output:** The longest substring with all distinct characters is bcdafe **Input:** aaaaaa **Output:** The longest substring with all distinct characters is a

> 

A simple solution would be to generate all the given string substrings and return the longest substring containing all distinct characters. The time complexity of this solution is O(n3) since it takes O(n2) time to generate all substrings for a string of length `n` and O(n) time to process each substring.

We can easily solve this problem in O(n) time. The idea is to use a [sliding window](https://techiedelight.com/sliding-window-problems/) technique. In the sliding window technique, a window is maintained that satisfies the problem constraints. The window is unstable if it violates the problem constraints, and it tries to stabilize by increasing or decreasing its size.

So for the current problem, the window (substring) is stable if it contains all distinct characters at any point. If the window includes duplicates characters, it shrinks by removing characters from the left till it becomes stable again. A steady window tends to increase its size by adding characters to it until it becomes unstable again. The process continues until the window reaches the last character in the string. At each point the window size changes, update the maximum window size.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Define the character range
#define CHAR_RANGE 128

// Function to find the longest substring containing all distinct
// characters in it using a sliding window
string findLongestSubstring(string str, int n)
{
    // boolean array to mark characters present in the current window
    vector<bool> window(CHAR_RANGE);

    // stores the longest substring boundaries
    int begin = 0, end = 0;

    // `[low…high]` maintain the sliding window boundaries
    for (int low = 0, high = 0; high < n; high++)
    {
        // if the current character is present in the current window
        if (window[str[high]])
        {
            // remove characters from the left of the window till
            // we encounter the current character
            while (str[low] != str[high]) {
                window[str[low++]] = false;
            }

            low++;        // remove the current character
        }
        else {
            // if the current character is not present in the current
            // window, include it
            window[str[high]] = true;

            // update the maximum window size if necessary
            if (end - begin < high - low)
            {
                begin = low;
                end = high;
            }
        }
    }

    // return the longest substring found at `str[begin…end]`
    return str.substr(begin, end - begin + 1);
}

int main()
{
    string str = "abbcdafeegh";
    int n = str.length();

    cout << findLongestSubstring(str, n);

    return 0;
}
```

**Output:** bcdafe

##

```java
class Main
{
    // Define the character range
    private static final int CHAR_RANGE = 128;

    // Function to find the longest substring with all
    // distinct characters using a sliding window
    public static String findLongestSubstring(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return str;
        }

        // boolean array to mark characters present in the current window
        boolean[] window = new boolean[CHAR_RANGE];

        // stores the longest substring boundaries
        int begin = 0, end = 0;

        // `[low…high]` maintain the sliding window boundaries
        for (int low = 0, high = 0; high < str.length(); high++)
        {
            // if the current character is present in the current window
            if (window[str.charAt(high)])
            {
                // remove characters from the left of the window till
                // we encounter the current character
                while (str.charAt(low) != str.charAt(high))
                {
                    window[str.charAt(low)] = false;
                    low++;
                }

                low++;        // remove the current character
            }
            else {
                // if the current character is not present in the current
                // window, include it
                window[str.charAt(high)] = true;

                // update the maximum window size if necessary
                if (end - begin < high - low)
                {
                    begin = low;
                    end = high;
                }
            }
        }

        // return the longest substring found at `str[begin…end]`
        return str.substring(begin, end + 1);
    }

    public static void main(String[] args)
    {
        String str = "abbcdafeegh";

        System.out.print(findLongestSubstring(str));
    }
}
```

##

```python3
# Function to find the longest substring with all
# distinct characters using a sliding window
def findLongestSubstring(s):

    # list to mark characters present in the current window
    window = {}

    # stores the longest substring boundaries
    begin = end = 0

    # `[low…high]` maintain the sliding window boundaries
    low = high = 0

    while high < len(s):

        # if the current character is present in the current window
        if window.get(s[high]):

            # remove characters from the left of the window till
            # we encounter the current character
            while s[low] != s[high]:
                window[s[low]] = False
                low = low + 1

            low = low + 1        # remove the current character
        else:
            # if the current character is not present in the current
            # window, include it
            window[s[high]] = True

            # update the maximum window size if necessary
            if end - begin < high - low:
                begin = low
                end = high

        high = high + 1

    # return the longest substring found at `s[begin…end]`
    return s[begin:end + 1]

if __name__ == '__main__':

    s = 'abbcdafeegh'
    print(findLongestSubstring(s))
```

The time complexity of the above solution is O(n) as it does two traversals of the given string of length `n`.

Also See:

> [Find the longest substring of a string containing `k` distinct characters](https://www.techiedelight.com/find-longest-substring-containing-k-distinct-characters/ "Find the longest substring of a string containing `k` distinct characters")

> [Longest Palindromic Substring Problem](https://www.techiedelight.com/longest-palindromic-substring-non-dp-space-optimized-solution/ "Longest Palindromic Substring Problem")

> [Find all substrings containing exactly `k` distinct characters](https://www.techiedelight.com/find-all-substrings-containing-exactly-k-distinct-characters/ "Find all substrings containing exactly `k` distinct characters")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.76/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
