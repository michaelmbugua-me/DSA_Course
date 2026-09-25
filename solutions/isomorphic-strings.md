# Isomorphic Strings

> Source: https://www.techiedelight.com/isomorphic-strings/

[String](https://www.techiedelight.com/Category/String/)

Given two strings, determine whether they are isomorphic. Two strings, `X` and `Y`, are called isomorphic if all occurrences of each character in `X` can be replaced with another character to get `Y` and vice-versa.

For example, consider strings `ACAB` and `XCXY`. They are isomorphic as we can map `'A' —> 'X'`, `'B' —> 'Y'` and `'C' —> 'C'`.

Note that mapping from a character to itself is allowed, but the same character may not replace two characters.

> 

A naive solution would be to check if every character in the first string is mapped to the same character in the second string for all its occurrences. But even then, two characters in the first string might still be mapped to the same character in the second string. So, we have to repeat the process for the second string as well, i.e., check if every character in the second string is mapped to the same character in the first string for all its occurrences.

The time complexity of this solution is O(n2), where `n` is the length of each string. We can improve time complexity to linear by using O(n) space.

The idea is to use [hashing](https://techiedelight.com/hashing-in-data-structure/). The following solution uses a map to store a mapping from characters of string `X` to string `Y` and a set to store already mapped characters of string `Y`; the rest of the code is pretty much straightforward:

Following is a TypeScript implementation of the idea:

```ts
// Find if strings 'X' and 'Y' are Isomorphic or not
function isIsomorphic(X: string, Y: string): boolean {

    // if 'X' and 'Y' have different lengths, they cannot be isomorphic
    if (X.length !== Y.length) {
        return false;
    }

    // use a map to store a mapping from characters of string 'X' to string 'Y'
    const map = new Map<string, string>();

    // use set to store a pool of already mapped characters
    const set = new Set<string>();

    for (let i = 0; i < X.length; i++) {
        const x = X[i];
        const y = Y[i];

        // if 'x' is seen before
        if (map.has(x)) {
            // return false if the first occurrence of `x` is mapped to a
            // different character
            if (map.get(x) !== y) {
                return false;
            }
        }

        // if 'x' is seen for the first time (i.e., it isn't mapped yet)
        else {
            // return false if 'y' is already mapped to some other char in 'X'
            if (set.has(y)) {
                return false;
            }

            // map 'y' to 'x' and mark it as mapped
            map.set(x, y);
            set.add(y);
        }
    }

    return true;
}

const X = 'ACAB';
const Y = 'XCXY';

if (isIsomorphic(X, Y)) {
    console.log(`${X} and ${Y} are Isomorphic`);
} else {
    console.log(`${X} and ${Y} are not Isomorphic`);
}
```

**Output:** ACAB and XCXY are Isomorphic

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 195

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
