# Break a string into all possible combinations of non-overlapping substrings

> Source: https://www.techiedelight.com/break-string-non-overlapping-substrings/

[String](https://www.techiedelight.com/Category/String/)

Given a string, break it into all possible combinations of non-overlapping substrings enclosed within curly brackets.

Please note that the problem specifically targets [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

**Input:** ABC **Output:** {ABC} {AB}{C} {A}{BC} {A}{B}{C} **Input:** ABCD **Output:** {ABCD} {ABC}{D} {AB}{CD} {AB}{C}{D} {A}{BCD} {A}{BC}{D} {A}{B}{CD} {A}{B}{C}{D}

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to maintain two parameters – the index of the next character to be processed and the result string so far. We start from the index of the next character to be processed, append the substring formed by the unprocessed string to the result string and recur on the remaining string until the whole string is processed.

The following diagram represents a recursion tree for string `abc`. In each tree node, the processed part is shown by the green color, and the red color shows the unprocessed string.

Following is the C++, Java, and Python implementation based on the above idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to break a string into all possible combinations of
// non-overlapping substrings enclosed within parenthesis
void recur(string s, int i, string result)
{
    int n = s.length();
    if (i == n) {
        cout << result << endl;
    }

    // consider each substring S[i, j]
    for (int j = n - 1; j >= i; j--)
    {
        // substr(pos, n) returns a substring of length `n` that starts at
        // position pos of the current string
        string substr = "{" + s.substr(i, j - i + 1) + "}";

        // append the substring to the result and recur with an index of the
        // next character to be processed and the result string
        recur(s, j + 1, result + substr);
    }
}

int main()
{
    // input string
    string s = "ABCD";

    int starting_index = 0;
    string empty_string = "";

    recur(s, starting_index, empty_string);

    return 0;
}
```

##

```java
class Main
{
    private static final String OPEN_BRACKET = "{";
    private static final String CLOSED_BRACKET = "}";
    private static final String EMPTY_STRING = "";

    // Function to break a string into all possible combinations of
    // non-overlapping substrings enclosed within parenthesis
    public static void recur(String s, int i, String out)
    {
        // base case
        if (s == null || s.length() == 0) {
            return;
        }

        if (i == s.length()) {
            System.out.println(out);
        }

        // consider each substring S[i, j]
        for (int j = s.length() - 1; j >= i; j--)
        {
            String substr = OPEN_BRACKET + s.substring(i, j + 1) + CLOSED_BRACKET;

            // append the substring to the result and recur with an index of
            // the next character to be processed and the result string
            recur(s, j + 1, out + substr);
        }
    }

    public static void main(String[] args)
    {
        // input string
        String s = "ABCD";

        int starting_index = 0;
        recur(s, starting_index, EMPTY_STRING);
    }
}
```

##

```python3
OPEN_BRACKET = '{'
CLOSED_BRACKET = '}'
EMPTY_STRING = ''

# Function to break a string into all possible combinations of
# non-overlapping substrings enclosed within parenthesis
def recur(s, i=0, out=EMPTY_STRING):
    if i == len(s):
        print(out)

    # consider each substring S[i, j]
    for j in reversed(range(i, len(s))):
        substr = OPEN_BRACKET + s[i:j+1] + CLOSED_BRACKET

        # append the substring to the result and recur with an index of the
        # next character to be processed and the result string
        recur(s, j + 1, out + substr)

if __name__ == '__main__':
    s = 'ABCD'    # input string
    recur(s)
```

**Output:** {ABCD} {ABC}{D} {AB}{CD} {AB}{C}{D} {A}{BCD} {A}{BC}{D} {A}{B}{CD} {A}{B}{C}{D}

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Also See:

> [Find all combinations of non-overlapping substrings of a string](https://www.techiedelight.com/find-combinations-non-overlapping-substrings-string/ "Find all combinations of non-overlapping substrings of a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 230

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
