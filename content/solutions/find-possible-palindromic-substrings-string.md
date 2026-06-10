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

Following is the TypeScript implementation of the idea:

```ts
// Expand in both directions of `low` and `high` to find all palindromes
function expand(s: string, low: number, high: number, palindromes: Set<string>): void {

    // run till `s[low.high]` is not a palindrome
    while (low >= 0 && high < s.length && s[low] === s[high]) {

        // push all palindromes into a set
        palindromes.add(s.slice(low, high + 1));

        // Expand in both directions
        low = low - 1;
        high = high + 1;
    }
}

// Function to find all unique palindromic substrings of a given string
function findPalindromicSubstrings(s: string): void {

    // create an empty set to store all unique palindromic substrings
    const palindromes = new Set<string>();

    for (let i = 0; i < s.length; i++) {

        // find all odd length palindrome with `s[i]` as a midpoint
        expand(s, i, i, palindromes);

        // find all even length palindrome with `s[i]` and `s[i+1]`
        // as its midpoints
        expand(s, i, i + 1, palindromes);
    }

    // print all unique palindromic substrings
    console.log([...palindromes].join(' '));
}

const s = 'google';
findPalindromicSubstrings(s);
```

**Output:** e l g o oo goog

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
