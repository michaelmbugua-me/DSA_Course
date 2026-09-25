# Remove all adjacent duplicates from a string

> Source: https://www.techiedelight.com/in-place-remove-all-adjacent-duplicates-from-string/

[String](https://www.techiedelight.com/Category/String/)

Given a string, remove all adjacent duplicates from it. The algorithm should continue removing adjacent duplicates from the string till no duplicate is present in the result.

For example,

` The input string is 'DBAABDAB' The string left after the removal of all adjacent duplicates is 'AB' 'DBAABDAB' —> 'D B ~~AA~~ B D A B' —> 'D ~~BB~~ D A B' —> '~~DD~~ A B' —> 'AB' The input string is 'ABADB' The string left after the removal of all adjacent duplicates is 'ABADB' 'ABADB' —> 'ABADB' The input string is 'ABDAADBDAABB' The string left after the removal of all adjacent duplicates is 'AD' 'ABDAADBDAABB' —> 'A B D ~~AA~~ D B D ~~AA~~ ~~BB~~ ' —> 'A B ~~DD~~ B D' —> 'A ~~BB~~ D' —> 'AD' `

The idea is to recursively remove all adjacent duplicates in the string until no duplicates are left. This idea is inspired by Schlemiel painter’s algorithm and implemented below in TypeScript:

```ts
// Function to remove all adjacent duplicates from the given string
function removeAdjDup(s: string): string {

    const chars = [...s];
    const n = s.length;

    // `k` maintains the index of the next free location in the result
    let k = 0;

    // `i` maintains the current index of the string
    let i = 1;

    // start from the second character
    while (i < n) {
        // if the current character is not the same as the
        // previous character, add it to the result
        if (chars[i - 1] !== chars[i]) {
            chars[k] = chars[i - 1];
            k = k + 1;
        } else {
            // remove adjacent duplicates
            while (i < chars.length && chars[i - 1] === chars[i]) {
                i = i + 1;
            }
        }
        i = i + 1;
    }

    // add the last character to the result
    chars[k] = chars[i - 1];
    k = k + 1;

    // construct a string with the first `k` chars
    s = chars.slice(0, k).join('');

    // start again if any duplicate is removed
    if (k !== n) {
        return removeAdjDup(s);   // Schlemiel painter’s algorithm
    }

    // if the algorithm didn't change the input string, that means
    // all the adjacent duplicates are removed
    return s;
}

const s = 'DBAABDAB';
console.log('The string left after removal of all adjacent duplicates is', removeAdjDup(s));
```

The time complexity of the above solution is O(n2) since it might require `(n+1)/2` passes in the worst case, where `n` is the length of the input string. The auxiliary space required by the program is O(n) for recursion (call stack).

Also See:

> [Remove all occurrences of `AB` and `C` from a string](https://www.techiedelight.com/inplace-remove-all-occurrences-ab-c-string/ "Remove all occurrences of `AB` and `C` from a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.42/5. Vote count: 76

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
