# Introduction to Pattern Matching

> Source: https://www.techiedelight.com/introduction-pattern-matching/

[String](https://www.techiedelight.com/Category/String/)

Given a text, find all occurrences of a given pattern in it.

For example,

1\. For text T = “ABCABAABCABAC” and pattern P = “ABAA”, The pattern occurs only once in the text, starting from index 3 (“ABC**ABAA** BCABAC”). 2\. For text T = “ABCABAABCABAC” and pattern P = “CAB”, The pattern occurs twice in the text, starting from index 2 and 8 (“AB**CAB** AABCABAC” and “ABCABAAB**CAB** AC”).

## Overview

The pattern matching is a widespread real-life problem that frequently arises in text-editing programs such as MS Word, notepad, notepad++, etc. String pattern matching algorithms are also used to search for particular patterns in DNA sequences.

The goal is to find all occurrences of pattern `P[1…m]` of length `m` in the given text `T[1…n]` of length `n`. This post will discuss the naive string-matching algorithm.

> 

The naive algorithm finds all occurrences of a pattern by using a loop that checks the condition `P[1…m] = T[s+1…s+m]` for each of the `n-m+1` possible values of `s`. Following is the pseudocode for the algorithm:

**Naive-Pattern-Matching(T, P)** n = length[T] m = length[P] **for** s = 0 to n – m **do** **if** P[1 … m] = T[s+1 … s+m] **do** **print** “Pattern is found at position s” **end-if** **end-for**

## Implementation

The algorithm can be implemented as follows in C, C++, Java, and Python:

```c
#include <stdio.h>
#include <string.h>

// Function to find all occurrences of a pattern of length `m`
// in the given text of length `n`
void find(const char* text, const char* pattern, int n, int m)
{
    // base case 1: text is NULL or empty
    if (*pattern == '\0' || m == 0) {
        printf("The pattern occurs with shift 0");
    }

    // base case 2: text is NULL, or text length is less than that of pattern
    if (*text == '\0' || m > n) {
        printf("Pattern not found");
    }

    for (int i = 0; i <= n - m; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (text[i + j] != pattern[j]) {
                break;
            }

            if (j == m - 1) {
                printf("The pattern occurs with shift %d\n", i);
            }
        }
    }
}

int main(void)
{
    char* text = "ABCABAABCABAC";
    char* pattern = "CAB";

    int n = strlen(text);
    int m = strlen(pattern);

    find(text, pattern, n, m);

    return 0;
}
```

**Output:** The pattern occurs with shift 2 The pattern occurs with shift 8

##

```cpp
#include <iostream>
using namespace std;

// Function to find all occurrences of a pattern of length `m`
// in the given text of length `n`
void find(string text, string pattern)
{
    int n = text.length();
    int m = pattern.length();

    // if text is an empty string
    if (m == 0)
    {
        cout << "The pattern occurs with shift 0";
        return;
    }

    // if text length is less than that of pattern
    if (n < m)
    {
        cout << "Pattern not found";
        return;
    }

    for (int i = 0; i <= n - m; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (text[i + j] != pattern[j]) {
                break;
            }

            if (j == m - 1) {
                cout << "The pattern occurs with shift " << i << endl;
            }
        }
    }
}

int main()
{
    string text = "ABCABAABCABAC";
    string pattern = "CAB";

    find(text, pattern);

    return 0;
}
```

##

```java
class Main
{
    // Function to find all occurrences of a pattern of length `m`
    // in the given text of length `n`
    public static void find(String text, String pattern)
    {
        int n = text.length();
        int m = pattern.length();

        // base case 1: text is null or empty
        if (pattern == null || pattern.length() == 0)
        {
            System.out.println("The pattern occurs with shift 0");
            return;
        }

        // base case 2: text is null, or text length is less than that of pattern
        if (text == null || pattern.length() > text.length())
        {
            System.out.println("Pattern not found");
            return;
        }

        int i = 0;
        while (i <= n - m)
        {
            for (int j = 0; j < m; j++)
            {
                if (text.charAt(i + j) != pattern.charAt(j)) {
                    break;
                }

                if (j == m - 1) {
                    System.out.println("The pattern occurs with shift " + i);
                }
            }
            i++;
        }
    }

    public static void main(String[] args)
    {
        String text = "ABCABAABCABAC";
        String pattern = "CAB";

        find(text, pattern);
    }
}
```

##

```python3
# Function to find all occurrences of a pattern of length `m`
# in a given text of length `n`
def find(text, pattern):

    n = len(text)
    m = len(pattern)

    # base case 1: text is empty
    if not pattern:
        print('The pattern occurs with shift 0')
        return

    # base case 2: text is None, or text length is less than that of pattern
    if not text or len(pattern) > len(text):
        print('Pattern not found')
        return

    i = 0
    while i <= n - m:
        for j in range(m):
            if text[i + j] is not pattern[j]:
                break
            if j == m - 1:
                print('Pattern occurs with shift', i)
        i = i + 1

if __name__ == '__main__':

    text = 'ABCABAABCABAC'
    pattern = 'CAB'

    find(text, pattern)
```

## Performance

The time complexity of the above solution is O(n.m), where `n` is the length of the text and `m` is the length of the pattern. When the length of the pattern and text are roughly the same, the algorithm runs in the quadratic time.

One worst case is that text `T` has `n` number of `A's` and the pattern `P` has `m-1` number of `A's` followed by a single `B`. It will result in maximum comparisons, i.e.,

`T = AAAAAAAAAA, P = AAAB`

The best case happens when the first character of the pattern `P` is not present in the text. It will result in minimum comparisons, i.e.,

`T = ABCDEFGHIJKLMNO, P = ZOOM`

There are many efficient string searching algorithms that perform way better than the naive algorithm discussed above. Following are some famous algorithms:

  * [Knuth–Morris–Pratt algorithm](https://techiedelight.com/implementation-kmp-algorithm-c-cpp-java/) The KMP pattern matching algorithm has a worst-case time complexity of O(n + m).
  * [Rabin–Karp algorithm](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm) The worst-case running time of the Rabin–Karp algorithm is O((n – m) × m), but it has a good average-case running time. A practical application of this algorithm is detecting plagiarism. Given the source text, the algorithm can rapidly search through a paper for instances of sentences from the source.
  * [Boyer–Moore algorithm](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm) If the pattern `P` is relatively long and the text is reasonably large, this algorithm is likely to be the most efficient string-matching algorithm. It has a worst-case running time of O(n + m) only if the pattern does not appear in the text. Otherwise, it runs in O(n.m) time in the worst case.

**References:** <http://staff.ustc.edu.cn/~csli/graduate/algorithms/book6/chap34.htm>

Also See:

> [Implementation of KMP Algorithm – C, C++, Java, and Python](https://www.techiedelight.com/implementation-kmp-algorithm-c-cpp-java/ "Implementation of KMP Algorithm – C, C++, Java, and Python")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
