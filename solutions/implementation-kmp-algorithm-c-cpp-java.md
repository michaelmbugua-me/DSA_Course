# Implementation of KMP Algorithm – C, C++, Java, and Python

> Source: https://www.techiedelight.com/implementation-kmp-algorithm-c-cpp-java/

This post will implement the KMP algorithm in C, C++, Java, and Python programming language.

We have seen that the [naive algorithm](https://techiedelight.com/introduction-pattern-matching/) for pattern matching runs in O(n.m) time, where `n` is the length of the text and `m` is the length of the pattern. This is because the algorithm doesn’t remember any information about the past matched characters. It basically matches a character with a different pattern character over and over again.

The [KMP Algorithm](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) (or _Knuth, Morris, and Pratt_ string searching algorithm) cleverly uses the previous comparison data. It can search for a pattern in O(n) time as it never re-compares a text symbol that has matched a pattern symbol. However, it uses a partial match table to analyze the pattern structure. Construction of a partial match table takes O(m) time. Therefore, the overall time complexity of the KMP algorithm is O(m + n).

Please refer to the following link for a detailed explanation of the KMP algorithm, one of the best explanations available on the web:

> [The Knuth–Morris–Pratt Algorithm in my own words](http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/)

> [Practice this algorithm](https://techiedelight.com/?problem=ImplementStrstrFunction)

The algorithm can be implemented as follows in C, C++, Java, and Python:

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Function to implement the KMP algorithm
void KMP(const char* text, const char* pattern, int m, int n)
{
    // base case 1: pattern is NULL or empty
    if (*pattern == '\0' || n == 0) {
        printf("The pattern occurs with shift 0");
    }

    // base case 2: text is NULL, or text's length is less than that of pattern's
    if (*text == '\0' || n > m) {
        printf("Pattern not found");
    }

    // next[i] stores the index of the next best partial match
    int next[n + 1];

    for (int i = 0; i < n + 1; i++) {
        next[i] = 0;
    }

    for (int i = 1; i < n; i++)
    {
        int j = next[i];

        while (j > 0 && pattern[j] != pattern[i]) {
            j = next[j];
        }

        if (j > 0 || pattern[j] == pattern[i]) {
            next[i + 1] = j + 1;
        }
    }

    for (int i = 0, j = 0; i < m; i++)
    {
        if (*(text + i) == *(pattern + j))
        {
            if (++j == n) {
                printf("The pattern occurs with shift %d\n", i - j + 1);
            }
        }
        else if (j > 0)
        {
            j = next[j];
            i--;    // since `i` will be incremented in the next iteration
        }
    }
}

// Program to implement the KMP algorithm in C
int main(void)
{
    char* text = "ABCABAABCABAC";
    char* pattern = "CAB";

    int n = strlen(text);
    int m = strlen(pattern);

    KMP(text, pattern, n, m);

    return 0;
}
```

**Output:** The pattern occurs with shift 2 The pattern occurs with shift 8

##

```cpp
#include <iostream>
using namespace std;

// Function to implement the KMP algorithm
void KMP(string text, string pattern)
{
    int m = text.length();
    int n = pattern.length();

    // if pattern is an empty string
    if (n == 0)
    {
        cout << "The pattern occurs with shift 0";
        return;
    }

    // if text's length is less than that of pattern's
    if (m < n)
    {
        cout << "Pattern not found";
        return;
    }

    // next[i] stores the index of the next best partial match
    int next[n + 1];

    for (int i = 0; i < n + 1; i++) {
        next[i] = 0;
    }

    for (int i = 1; i < n; i++)
    {
        int j = next[i];

        while (j > 0 && pattern[j] != pattern[i]) {
            j = next[j];
        }

        if (j > 0 || pattern[j] == pattern[i]) {
            next[i + 1] = j + 1;
        }
    }

    for (int i = 0, j = 0; i < m; i++)
    {
        if (text[i] == pattern[j])
        {
            if (++j == n) {
                cout << "The pattern occurs with shift " << i - j + 1 << endl;
            }
        }
        else if (j > 0)
        {
            j = next[j];
            i--;    // since `i` will be incremented in the next iteration
        }
    }
}

// Program to implement the KMP algorithm in C++
int main()
{
    string text = "ABCABAABCABAC";
    string pattern = "CAB";

    KMP(text, pattern);

    return 0;
}
```

##

```java
class Main
{
    // Function to implement the KMP algorithm
    public static void KMP(String text, String pattern)
    {
        // base case 1: pattern is null or empty
        if (pattern == null || pattern.length() == 0)
        {
            System.out.println("The pattern occurs with shift 0");
            return;
        }

        // base case 2: text is NULL, or text's length is less than that of pattern's
        if (text == null || pattern.length() > text.length())
        {
            System.out.println("Pattern not found");
            return;
        }

        char[] chars = pattern.toCharArray();

        // next[i] stores the index of the next best partial match
        int[] next = new int[pattern.length() + 1];
        for (int i = 1; i < pattern.length(); i++)
        {
            int j = next[i];

            while (j > 0 && chars[j] != chars[i]) {
                j = next[j];
            }

            if (j > 0 || chars[j] == chars[i]) {
                next[i + 1] = j + 1;
            }
        }

        for (int i = 0, j = 0; i < text.length(); i++)
        {
            if (j < pattern.length() && text.charAt(i) == pattern.charAt(j))
            {
                if (++j == pattern.length()) {
                    System.out.println("The pattern occurs with shift " + (i - j + 1));
                }
            }
            else if (j > 0)
            {
                j = next[j];
                i--;    // since `i` will be incremented in the next iteration
            }
        }
    }

    // Program to implement the KMP algorithm in Java
    public static void main(String[] args)
    {
        String text = "ABCABAABCABAC";
        String pattern = "CAB";

        KMP(text, pattern);
    }
}
```

##

```python3
# Function to implement the KMP algorithm
def KMP(text, pattern):

    # base case 1: pattern is empty
    if not pattern:
        print('The pattern occurs with shift 0')
        return

    # base case 2: text is empty, or text's length is less than that of pattern's
    if not text or len(pattern) > len(text):
        print('Pattern not found')
        return

    chars = list(pattern)

    # next[i] stores the index of the next best partial match
    next = [0] * (len(pattern) + 1)

    for i in range(1, len(pattern)):
        j = next[i]

        while j > 0 and chars[j] is not chars[i]:
            j = next[j]

        if j > 0 or chars[j] == chars[i]:
            next[i + 1] = j + 1

    i, j = 0, 0
    while i < len(text):
        if j < len(pattern) and text[i] == pattern[j]:
            j = j + 1
            if j == len(pattern):
                print('Pattern occurs with shift', (i - j + 1))
        elif j > 0:
            j = next[j]
            i = i - 1        # since `i` will be incremented in the next iteration
        i = i + 1

# Program to implement the KMP algorithm in Python
if __name__ == '__main__':

    text = 'ABCABAABCABAC'
    pattern = 'CAB'

    KMP(text, pattern)
```

Also See:

> [Introduction to Pattern Matching](https://www.techiedelight.com/introduction-pattern-matching/ "Introduction to Pattern Matching")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.4/5. Vote count: 166

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
