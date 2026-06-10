# Lexicographically Minimal String Rotation

> Source: https://www.techiedelight.com/find-lexicographically-minimal-string-rotation/

[String](https://www.techiedelight.com/Category/String/)

The lexicographically minimal string rotation (or lexicographically least circular substring) is the problem of finding a string’s rotation possessing the lowest lexicographical order among all possible rotations.

For example, the lexicographically minimal rotation of `bbaaccaadd` is `aaccaaddbb`. A string can have multiple lexicographically minimal rotations, but this doesn’t matter – rotations must be equivalent.

> 

The idea is to iterate through successive rotations of the given string while keeping track of the most lexicographically minimal rotation encountered. Following is a TypeScript implementation of the idea:

```ts
// Function to find the lexicographically minimal string rotation
function findLexicalMinRotation(s: string): string {

    // to store the lexicographic minimum string
    let min = s;

    for (let i = 0; i < s.length; i++) {

        // left-rotate the string by 1 unit
        s = s.slice(1) + s[0];

        // update the result if the rotation is minimum so far
        if (s < min) {
            min = s;
        }
    }

    return min;
}

const str = 'bbaaccaadd';

console.log(`The lexicographically minimal rotation of ${str}` +
    ` is ${findLexicalMinRotation(str)}`);
```

**Output:** The lexicographically minimal rotation of bbaaccaadd is aaccaaddbb

The time complexity of the above solution is O(n2), where `n` is the length of the input string and doesn’t require any extra space.

[Booth’s algorithm](https://en.wikipedia.org/wiki/Lexicographically_minimal_string_rotation#Booth.27s_Algorithm) can solve this problem in O(n) time. The algorithm uses a modified preprocessing function from the [Knuth–Morris–Pratt string searching algorithm](https://techiedelight.com/implementation-kmp-algorithm-c-cpp-java/). The failure function for the string is computed as normal, but the string is rotated during the computation, so some indices must be computed more than once as they wrap around. Once all indices of the failure function have been successfully computed without the string rotating again, the minimal lexicographical rotation is known to be found, and its starting index is returned.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
