# Construct the longest palindrome by shuffling or deleting characters from a string

> Source: https://www.techiedelight.com/construct-longest-palindrome-string/

[String](https://www.techiedelight.com/Category/String/)

Write an efficient algorithm to construct the longest palindrome by shuffling or deleting characters from a given string.

For example,

**Input:** ABBDAB **Output:** The longest palindrome is BABAB (or BADAB or ABBBA or ABDBA) **Input:** ABCDD **Output:** The longest palindrome is DAD (or DBD or DCD)

> 

We know that the left and right half of a palindrome contains the same set of characters in reverse order, and optionally a middle character, which can be anything. The idea is to find all even occurring characters and construct the left half of the palindrome using half their count. Their ordering doesn’t matter as shuffling is permitted. Then we can easily build the right half from the left half by reversing it. All odd occurring characters are ignored except the one, which forms the resultant palindromic string’s middle character.

Following is a TypeScript implementation based on the above idea:

```ts
// Construct the longest palindrome by shuffling or deleting
// characters from a given string
function longestPalindrome(s: string): string {

    // base case
    if (!s) {
        return '';
    }

    // create a dictionary for characters of a given string
    const freq: Record<string, number> = {};

    for (const ch of s) {
        freq[ch] = (freq[ch] || 0) + 1;
    }

    let left = '';              // stores left substring
    let mid = '';               // stores odd character

    // iterate through the frequency dictionary
    for (const [ch, count] of Object.entries(freq)) {

        // if the current character's frequency is odd,
        // update mid to current (and discard the old one)
        if (count % 2 === 1) {
            mid = ch;            // stores odd character
        }

        // append half of the characters to the left substring
        // (the other half goes to the right substring in reverse order)
        left += ch.repeat(Math.floor(count / 2));
    }

    // the right substring will be the reverse of the left substring
    const right = left.split('').reverse().join('');

    // return formed by the left substring, mid-character (if any),
    // and the right substring
    return left + mid + right;
}

const s = 'ABBDAB';
console.log(`The longest palindrome is ${longestPalindrome(s)}`);
```

**Output:** The longest palindrome is BABAB

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input string.

Also See:

> [Find length of the longest palindrome possible from a string](https://www.techiedelight.com/find-length-longest-palindrome-possible-from-string/ "Find length of the longest palindrome possible from a string")

> [Find all palindromic permutations of a string](https://www.techiedelight.com/find-palindromic-permutations-string/ "Find all palindromic permutations of a string")

> [Find the longest substring of a string containing `k` distinct characters](https://www.techiedelight.com/find-longest-substring-containing-k-distinct-characters/ "Find the longest substring of a string containing `k` distinct characters")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.76/5. Vote count: 270

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
