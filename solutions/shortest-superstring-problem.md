# Shortest Superstring Problem

> Source: https://www.techiedelight.com/shortest-superstring-problem/

[String](https://www.techiedelight.com/Category/String/)

Given a list of strings where no string is a substring of another, find the shortest string that contains each string in the list as a substring.

For example,

**Input:** [CATGC, CTAAGT, GCTA, TTCA, ATGCATC] **Output:** The shortest superstring is GCTAAGTTCATGCATC GCTAAGTTCATGCATC is the shortest possible string such that it contains every string in the input list as its substring. GCTAAGTT**CATGC** ATC G**CTAAGT** TCATGCATC **GCTA** AGTTCATGCATC GCTAAG**TTCA** TGCATC GCTAAGTTC**ATGCATC**

The shortest superstring problem is [NP-Hard](https://en.wikipedia.org/wiki/NP-hardness). But the following [greedy approach](https://techiedelight.com/greedy-algorithm-problems/) to this problem can result in a **“near-optimal” solution**.

**Input:** A set of strings S T = S while |T| > 1 do Let a and b be the most overlapping strings of T Replace a and b with the string obtained by overlapping and b T contains the shortest superstring of S

For example,

S = T = {**CATGC** , CTAAGT, GCTA, TTCA, **ATGCATC**} T = {CATGCATC, **CTAAGT** , **GCTA** , TTCA} T = {**CATGCATC** , GCTAAGT, **TTCA**} T = {**TTCATGCATC** , **GCTAAGT**} T = {GCTAAGTTCATGCATC}

Now how to find the most overlapping strings of T?

The above greedy algorithm looks simple, but the real difficulty lies in finding the most overlapping strings in a given set of strings. Following is the naive algorithm that does that:

Check maximum overlap for each pair of strings s1 and s2 by:

  1. Checking if the suffix of s1 matches with a prefix of s2 by comparing the last i character in s1 with the first i character in s2.
  2. Checking if the prefix of s1 matches with a suffix of s2 by comparing the first i character in s1 with the last i character in s2.

Return s1 and s2 involved in the maximum overlap.

Following is the C++ and Java program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <climits>
using namespace std;

// Function to calculate the maximum overlap in two given strings
int findOverlappingPair(string s1, string s2, string &str)
{
    // `max` will store the maximum overlap, i.e., the maximum length
    // of the matching prefix and suffix
    int max = INT_MIN;
    int m = s1.length();
    int n = s2.length();

    // check if the suffix of `s1` matches with the prefix of `s2`
    for (int i = 1; i <= min(m, n); i++)
    {
        // compare the last `i` characters in `s1` with the first
        // `i` characters in `s2`
        if (s1.compare(m - i, i, s2, 0, i) == 0)
        {
            if (max < i)
            {
                // update `max` and `str`
                max = i;
                str = s1 + s2.substr(i);
            }
        }
    }

    // check if the prefix of `s1` matches with the suffix of `s2`
    for (int i = 1; i <= min(m, n); i++)
    {
        // compare the first `i` characters in `s1` with the last
        // `i` characters in `s2`
        if (s1.compare(0, i, s2, n - i, i) == 0)
        {
            if (max < i)
            {
                // update `max` and `str`
                max = i;
                str = s2 + s1.substr(i);
            }
        }
    }

    return max;
}

// Function to calculate the smallest string that contains
// each string in a given set as a substring
string findShortestSuperstring(vector<string> words)    // no-ref, no-const
{
    int n = words.size();

    // run `n-1` times to consider every pair
    while (n != 1)
    {
        // to keep track of the maximum overlap
        int max = INT_MIN;

        // to store an array index of strings involved in the maximum overlap
        int p, q;

        // keep track of the resultant string after maximum overlap
        string res_str;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                string str;

                // `r` will store the maximum length of the matching prefix, and
                // suffix `str` will store the resultant string after maximum overlap
                // of words[i] and words[j] if any
                int r = findOverlappingPair(words[i], words[j], str);

                // check for the maximum overlap
                if (max < r)
                {
                    max = r;
                    res_str.assign(str);
                    p = i, q = j;
                }
            }
        }

        // ignore the last element in the next cycle
        n--;

        // if there is no overlap, append the value of words[n] to words[0]
        if (max == INT_MIN) {
            words[0] += words[n];
        }
        else {
            // copy the resultant string to index `p`
            words[p] = res_str;

            // copy the string at last index to index `q`
            words[q] = words[n];
        }
    }

    return words[0];
}

int main()
{
    vector<string> words = { "CATGC", "CTAAGT", "GCTA", "TTCA", "ATGCATC" };

    cout << "The shortest superstring is " << findShortestSuperstring(words);

    return 0;
}
```

**Output:** The shortest superstring is GCTAAGTTCATGCATC

##

```java
class Main
{
    // Function to calculate the maximum overlap in two given strings
    private static int findOverlappingPair(String s1, String s2, StringBuilder sb)
    {
        // `max` will store the maximum overlap, i.e., the maximum length
        // of the matching prefix and suffix
        int max = Integer.MIN_VALUE;

        // consider minimum length
        int n = Integer.min(s1.length(), s2.length());

        // check if the suffix of `s1` matches with the prefix of `s2`
        for (int i = 1; i <= n; i++)
        {
            // compare the last `i` characters in `s1` with the first `i`
            // characters in `s2`
            if (s1.substring(s1.length() - i).equals(s2.substring(0, i)))
            {
                if (max < i)
                {
                    // update `max` and `str`
                    max = i;
                    sb.setLength(0);
                    sb.append(s1).append(s2.substring(i));
                }
            }
        }

        // check if the prefix of `s1` matches with the suffix of `s2`
        for (int i = 1; i <= n; i++)
        {
            // compare the first `i` characters in `s1` with the last `i`
            // characters in `s2`
            if (s1.substring(0, i).equals(s2.substring(s2.length() - i)))
            {
                if (max < i)
                {
                    // update `max` and `str`
                    max = i;
                    sb.setLength(0);
                    sb.append(s2).append(s1.substring(i));
                }
            }
        }

        return max;
    }

    // Function to calculate the smallest string that contains
    // each string in a given set as a substring
    public static String findShortestSuperstring(String[] words)
    {
        int n = words.length;

        // run `n-1` times to consider every pair
        while (n != 1)
        {
            // to keep track of the maximum overlap
            int max = Integer.MIN_VALUE;

            // stores index of strings involved in the maximum overlap
            int p = -1, q = -1;

            // keep track of the resultant string after maximum overlap
            String res_str = "";

            for (int i = 0; i < n; i++)
            {
                for (int j = i + 1; j < n; j++)
                {
                    StringBuilder sb = new StringBuilder();

                    // `r` will store the maximum length of the matching prefix,
                    // and suffix `sb` will store the resultant string after
                    // maximum overlap of words[i] and words[j] if any
                    int r = findOverlappingPair(words[i], words[j], sb);

                    // check for the maximum overlap
                    if (max < r)
                    {
                        max = r;
                        res_str = sb.toString();
                        p = i;
                        q = j;
                    }
                }
            }

            // ignore the last element in the next cycle
            n--;

            // if there is no overlap, append the value of words[n] to words[0]
            if (max == Integer.MIN_VALUE) {
                words[0] = words[0] + words[n];
            }
            else {
                // copy the resultant string to index `p`
                words[p] = res_str;

                // copy the string at last index to index `q`
                words[q] = words[n];
            }
        }

        return words[0];
    }

    // The shortest superstring problem
    public static void main(String[] args)
    {
        String[] words = { "CATGC", "CTAAGT", "GCTA", "TTCA", "ATGCATC" };

        System.out.println("The shortest superstring is "
                + findShortestSuperstring(words));
    }
}
```

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 85

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
