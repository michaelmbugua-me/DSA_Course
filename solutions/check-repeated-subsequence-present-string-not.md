# Check if a repeated subsequence is present in a string or not

> Source: https://www.techiedelight.com/check-repeated-subsequence-present-string-not/

[String](https://www.techiedelight.com/Category/String/)

Given a string, check if a repeated subsequence is present in it or not. The repeated subsequence should have a length of 2 or more.

For example,

String XYBAXB has XB(XBXB) as a repeated subsequence String XBXAXB has XX(XXX) as a repeated subsequence String ABCA doesn’t have any repeated subsequence String XYBYAXBY has XB(XBXB), XY(XYXY), YY(YYY), YB(YBYB), and YBY(YBYBY) as repeated subsequences.

> 

The idea is simple. If we discard all non-repeating elements from the string (having frequency of `1`), and the resulting string is non-palindrome, then the string contains a repeated subsequence. If the resulting string is a palindrome and doesn’t have any character with frequency three or more, the string cannot have a repeated subsequence.

Following is a TypeScript implementation of the idea:

```ts
// Recursive function to check if `s[low…high]` is a palindrome or not
const isPalindrome = (s: string): boolean => {

    let [low, high] = [0, s.length - 1];

    while (low < high) {
        if (s[low] !== s[high]) {
            return false;
        }
        low = low + 1;
        high = high - 1;
    }

    return true;
};

// Function to checks if repeated subsequence is present in a string
const hasRepeatedSubsequence = (s: string): boolean => {

    // base case
    if (s.length === 0) {
        return false;
    }

    // map to store the frequency of each distinct character of a given string
    const freq = new Map<string, number>();

    // update map with frequency
    for (const c of s) {
        // if the frequency of any character becomes 3, we have found a
        // repeated subsequence
        freq.set(c, (freq.get(c) ?? 0) + 1);
        if (freq.get(c)! >= 3) {
            return true;
        }
    }

    // consider all repeated elements (frequency 2 or more)
    // and discard all non-repeating elements (frequency 1)
    const repeated = s.split('').filter(c => freq.get(c)! >= 2).join('');

    // return false if it is a palindrome
    return !isPalindrome(repeated);
};

// demo

const s = 'XYBYAXB';        // 'XB' and 'YB' are repeated subsequences

if (hasRepeatedSubsequence(s)) {
    console.log('Repeated subsequence is present');
} else {
    console.log('No repeated subsequence is present');
}
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
