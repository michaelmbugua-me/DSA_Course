# Find the longest substring of a string containing `k` distinct characters

> Source: https://www.techiedelight.com/find-longest-substring-containing-k-distinct-characters/

[String](https://www.techiedelight.com/Category/String/)

Given a string and a positive number `k`, find the longest substring of the string containing `k` distinct characters. If `k` is more than the total number of distinct characters in the string, return the whole string.

The problem differs from the problem of finding the longest subsequence with `k` distinct characters. Unlike subsequences, [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) are required to occupy consecutive positions within the original string.

For example, consider string `abcbdbdbbdcdabd`.

For k = 2, o/p is ‘bdbdbbd’ For k = 3, o/p is ‘bcbdbdbbdcd’ For k = 5, o/p is ‘abcbdbdbbdcdabd’

> 

A simple solution would be to generate all substrings of the given string and return the longest substring containing `k` distinct characters. The time complexity of this solution is O(n3) since it takes O(n2) time to generate all substrings for a string of length `n` and O(n) time to process each substring.

We can easily solve this problem in O(n) time and O(n) space. The idea is to use a [sliding window](https://techiedelight.com/sliding-window-problems/) technique. In the sliding window technique, a window is maintained that satisfies the problem constraints. The window is unstable if it violates the problem constraints, and it tries to stabilize by increasing or decreasing its size.

The window (substring) is stable for the current problem if it contains `k` distinct characters at any point. If the window has less than `k` distinct characters, it expands by adding characters to it from the right; otherwise, if the window contains more than `k` distinct characters, it shrinks by removing characters from the left until it becomes stable again. The steady-state window tends to increase its size by adding characters to it until it becomes unstable again. We continue this process until the window reaches the last character in the string. At each point the window size changes, update the maximum window size.

The algorithm can be implemented as follows in TypeScript:

```ts
// define the character range
const CHAR_RANGE = 128;

// Function to find the longest substring of a given containing
// `k` distinct characters using a sliding window
function findLongestSubstring(s: string, k: number): string {

    // stores the longest substring boundaries
    let end = 0, begin = 0;

    // set to store distinct characters in a window
    const window = new Set<string>();

    // `freq` stores the frequency of characters present in the
    // current window. We can also use a dictionary instead.

    const freq: number[] = new Array(CHAR_RANGE).fill(0);

    // `[low…high]` maintains the sliding window boundaries
    let low = 0, high = 0;

    while (high < s.length) {

        window.add(s[high]);
        freq[s.charCodeAt(high)] += 1;

        // if the window size is more than `k`, remove characters from the left
        while (window.size > k) {

            // If the leftmost character's frequency becomes 0 after
            // removing it in the window, remove it from the set as well
            freq[s.charCodeAt(low)] -= 1;
            if (freq[s.charCodeAt(low)] === 0) {
                window.delete(s[low]);
            }

            low = low + 1;        // reduce window size
        }

        // update the maximum window size if necessary
        if (end - begin < high - low) {
            end = high;
            begin = low;
        }

        high = high + 1;
    }

    // return the longest substring found at `s[begin…end]`
    return s.slice(begin, end + 1);
}

const s = 'abcbdbdbbdcdabd';
const k = 2;

console.log(findLongestSubstring(s, k));
```

The time complexity of the above solution is O(n) as it does two traversals of the given string of length `n`.

Also See:

> [Find the longest substring of a string containing distinct characters](https://www.techiedelight.com/find-longest-substring-given-string-containing-distinct-characters/ "Find the longest substring of a string containing distinct characters")

> [Construct the longest palindrome by shuffling or deleting characters from a string](https://www.techiedelight.com/construct-longest-palindrome-string/ "Construct the longest palindrome by shuffling or deleting characters from a string")

> [Check if a repeated subsequence is present in a string or not](https://www.techiedelight.com/check-repeated-subsequence-present-string-not/ "Check if a repeated subsequence is present in a string or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 211

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
