# Longest Palindromic Substring Problem

> Source: https://www.techiedelight.com/longest-palindromic-substring-non-dp-space-optimized-solution/

[String](https://www.techiedelight.com/Category/String/)

Given a string, find the maximum length contiguous substring of it that is also a palindrome. For example, the longest palindromic substring of “bananas” is “anana”, and the longest palindromic substring of “abdcbcdbdcbbc” is “bdcbcdb”.

The problem differs from the problem of finding the [longest palindromic subsequence](https://techiedelight.com/longest-palindromic-subsequence-using-dynamic-programming/). Unlike subsequences, [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) are required to occupy consecutive positions within the original string.

Note that the [longest palindromic substring](https://en.wikipedia.org/wiki/Longest_palindromic_substring) is not guaranteed to be unique. For example, there is no palindromic substring in a string `abracadabra` with a length greater than three. Still, there are two palindromic substrings with length three, namely, `aca` and `ada`. If multiple longest palindromic substring exists, return any one of them.

> 

The [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution for this problem takes O(n2) time and O(n2) space. This post will discuss another approach to solve this problem that doesn’t require any extra space.

The idea is simple and effective – for each character in the given string, consider it the midpoint of a palindrome and expand in both directions to find the maximum length palindrome. For an even length palindrome, consider every adjacent pair of characters as the midpoint.

Following is a TypeScript implementation of the idea:

```ts
// Expand in both directions of `low` and `high` to find maximum length palindrome
function expand(s: string, low: number, high: number): string {
    // expand in both directions
    while (low >= 0 && high < s.length && s[low] === s[high]) {
        low--;
        high++;
    }

    // return palindromic substring
    return s.slice(low + 1, high);
}

// Function to find the longest palindromic substring in `O(n²)` time and `O(1)` space
function findLongestPalindromicSubstring(s: string): string {

    // base case
    if (!s) {
        return '';
    }

    // `max_str` stores the maximum length palindromic substring found so far
    let max_str = '';

    // `max_length` stores the maximum length of palindromic
    // substring found so far
    let max_length = 0;

    // consider every character of the given string as a midpoint and expand
    // in both directions to find maximum length palindrome

    for (let i = 0; i < s.length; i++)
    {
        // find the longest odd length palindrome with `s[i]` as a midpoint
        let curr_str = expand(s, i, i);
        let curr_length = curr_str.length;

        // update maximum length palindromic substring if the odd length
        // palindrome has a greater length

        if (curr_length > max_length) {
            max_length = curr_length;
            max_str = curr_str;
        }

        // Find the longest even length palindrome with `s[i]` and `s[i+1]` as
        // midpoints. Note that an even length palindrome has two midpoints.

        curr_str = expand(s, i, i + 1);
        curr_length = curr_str.length;

        // update maximum length palindromic substring if even length
        // palindrome has a greater length

        if (curr_length > max_length) {
            max_length = curr_length;
            max_str = curr_str;
        }
    }

    return max_str;
}

const s = 'ABDCBCDBDCBBC';

console.log(`The longest palindromic substring of ${s} is ${findLongestPalindromicSubstring(s)}`);
```

**Output:** The longest palindromic substring of ABDCBCDBDCBBC is BDCBCDB

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the length of the input string. Note that O(n) solution is also possible for this problem by using [Manacher’s algorithm](https://en.wikipedia.org/wiki/Longest_palindromic_substring#Manacher.27s_algorithm).

Also See:

> [Find all possible palindromic substrings of a string](https://www.techiedelight.com/find-possible-palindromic-substrings-string/ "Find all possible palindromic substrings of a string")

> [Find the longest even-length palindromic sum substring of a string](https://www.techiedelight.com/longest-even-length-palidromic-sum-substring/ "Find the longest even-length palindromic sum substring of a string")

> [Check if a string is a rotated palindrome or not](https://www.techiedelight.com/check-given-string-rotated-palindrome-not/ "Check if a string is a rotated palindrome or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.61/5. Vote count: 301

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
